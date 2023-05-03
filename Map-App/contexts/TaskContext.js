import { createContext, useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { haverSine } from "../hooks/mathHooks";
import { getContainers, getProducts } from "../hooks/scannerHooks";
export const TaskContext = createContext({
  markContainerAsEmpty: (containerID) => undefined,
  confirmRouteWithContainers: async (containers) => undefined,
  confirmCompletedJob: () => undefined,
  onContainerSelected: async (container, setSpinner) => undefined,
  containers: [],
  routeContainers: [],
  hasActiveJob: false,
  hasCompletedJob: false,
  products: [],
  scannedProducts: [],
  addScannedProduct: (product) => undefined,
});

export const TaskProvider = ({ children }) => {
  const [containers, setContainers] = useState([]);
  const [hasActiveJob, setActiveJob] = useState(false);
  const [hasCompletedJob, setCompletedJob] = useState(false);
  const [routeContainers, setRouteContainers] = useState([]);
  const [products, setProducts] = useState([]);
  const [scannedProducts, setScannedProducts] = useState([]);

  const addScannedProduct = (product) => {
    console.log("data läggs tilll....", product);
    const scannedList = scannedProducts;
    scannedList.push(product);
    setScannedProducts(scannedList);
  };

  const confirmCompletedJob = () => {
    const updatedContainers = containers.map((item) => {
      const updatedItem = {
        ...item,
        marker: [
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: 0 },
        ],
      };
      return updatedItem;
    });
    setContainers(updatedContainers);
    setActiveJob(false);
    setCompletedJob(false);
    setRouteContainers([]);
    console.log("route längd", routeContainers.length);
    console.log("route array", routeContainers);
  };

  const markContainerAsEmpty = (containerID) => {
    const existingContainer = routeContainers.find(
      (item) => item.id === containerID
    );
    if (existingContainer && !existingContainer.empty) {
      const updatedArray = routeContainers.map((container) => {
        if (container.id === containerID) {
          return { ...container, empty: true };
        } else {
          return container;
        }
      });
      setRouteContainers(updatedArray);
    } else {
      if (existingContainer.empty) {
        console.log("Container redan tömd...");
      } else if (!existingContainer) {
        console.log("finns ingen container");
      }
    }
  };

  const confirmRouteWithContainers = async () => {
    const confirmedContainers = routeContainers.map((container) => {
      return { ...container, empty: false };
    });
    setRouteContainers(confirmedContainers);
    setActiveJob(true); // Sätter att man har ett job aktivt.

    // Måste uppdatera varje container till Neptune
  };

  const onContainerSelected = async (container, setSpinner) => {
    if (setSpinner) {
      console.log("spinner aktiv...");
      setSpinner(true);
    }

    console.log("ändrar container", container);

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

    console.log("map containers", updatedMapList);
    setContainers(updatedMapList);
    const selectedContainers = updatedMapList.filter(
      (container) => container.routeSelected === true
    );
    setRouteContainers(selectedContainers);
    console.log("selectade containers", selectedContainers);
    console.log("spinner inte aktiv");
    if (setSpinner) {
      setSpinner(false);
    }
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

  const loadProducts = async () => {
    const productsFetch = await getProducts();
    console.log("Produkter", productsFetch);
    setProducts(productsFetch);
  };

  // USEEFFECTS
  useEffect(() => {
    loadContainers();
    loadProducts();
  }, []);

  useEffect(() => {
    if (
      routeContainers.length &&
      routeContainers.every((item) => item.empty === true)
    ) {
      setCompletedJob(true);
      console.log("alla är tömda", routeContainers);
    }
  }, [routeContainers]);

  return (
    <TaskContext.Provider
      value={{
        confirmRouteWithContainers,
        containers,
        hasActiveJob,
        markContainerAsEmpty,
        onContainerSelected,
        routeContainers,
        hasCompletedJob,
        confirmCompletedJob,
        products,
        addScannedProduct,
        scannedProducts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
