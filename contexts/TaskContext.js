import { createContext, useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { haverSine } from "../hooks/mathHooks";
import { getContainers } from "../hooks/scannerHooks";
export const TaskContext = createContext({
  markContainerAsEmpty: (container) => undefined,
  confirmRouteWithContainers: async (containers) => undefined,
  onContainerSelected: async (container) => undefined,
  containers: [],
  hasActiveJob: false,
});

export const TaskProvider = ({ children }) => {
  const [containers, setContainers] = useState([]);
  const [hasActiveJob, setActiveJob] = useState(false);

  const markContainerAsEmpty = (container) => {};

  const confirmRouteWithContainers = async (containers) => {};

  const onContainerSelected = async (container) => {
    let updatedList = containers.map((item) => {
      if (item.id === container.id) {
        return container;
      } else {
        return item;
      }
    });
    //console.log("listan från selectedFunction", updatedList);
    let mapList = [];
    let noMapList = [];
    for (item of updatedList) {
      if (item.routeSelected) {
        mapList.push(item);
      } else {
        noMapList.push(item);
      }
    }
    let updatedMapList = await generateRouteWithContainers(mapList);
    for (item of noMapList) {
      const updatedItem = {
        ...item,
        marker: [
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: 0 },
        ],
      };
      updatedMapList.push(updatedItem);
    }
    setContainers(updatedMapList);
  };
  const generateRouteWithContainers = async (containers) => {
    const markersPosition = [];
    const { coords } = await Location.getCurrentPositionAsync({});

    let previousContainer = null; // Håller reda på föregående container

    while (containers.length > 0) {
      let closestContainer = null;
      let closestDistance = null;

      // Loopa igenom containrarna och jämför avstånden för att hitta närmaste
      for (const container of containers) {
        const distance = await haverSine(
          previousContainer ? previousContainer.location.lat : coords.latitude,
          previousContainer
            ? previousContainer.location.long
            : coords.longitude,
          container.location.lat,
          container.location.long
        );

        if (closestContainer === null || distance < closestDistance) {
          closestContainer = container;
          closestDistance = distance;
        }
      }

      // Lägg till den närmaste containern i listan av markörpositioner
      markersPosition.push({
        ...closestContainer,
        marker: [
          {
            latitude: previousContainer
              ? previousContainer.location.lat
              : coords.latitude,
            longitude: previousContainer
              ? previousContainer.location.long
              : coords.longitude,
          },
          {
            latitude: closestContainer.location.lat,
            longitude: closestContainer.location.long,
          },
        ],
      });

      // Uppdatera previousContainer och ta bort den valda containern från listan med containrar
      previousContainer = closestContainer;
      containers = containers.filter(
        (container) => container !== closestContainer
      );
    }

    return markersPosition;
  };

  const loadContainers = async () => {
    const containersFetch = await getContainers();
    const updatedContainers = containersFetch.map((container) => {
      return {
        ...container,
        marker: [
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: 0 },
        ],
        routeSelected: false,
      };
    });
    setContainers(updatedContainers);
  };

  // USEEFFECTS
  useEffect(() => {
    loadContainers();
  }, []);
  return (
    <TaskContext.Provider
      value={{
        confirmRouteWithContainers,
        containers,
        hasActiveJob,
        markContainerAsEmpty,
        onContainerSelected,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
