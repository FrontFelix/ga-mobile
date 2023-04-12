import { createContext, useContext, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import AddContainerDialog from "../components/Modals/AddContainerDialog";
import * as Location from "expo-location";
import { updateContainerStatus, getContainers } from "../hooks/scannerHooks";
import { haverSine } from "../hooks/mathHooks";

export const ScannerContext = createContext({
  scannedCompleted: false,
  isScanningData: false,
  isNewContainerScanning: false,
  hasCameraPermission: null,
  hasLocationPermission: null,
  handleUpdateContainerScanning: (type, data) => undefined,
  handleNewContainerScanning: (type, data) => undefined,
  handleNewContainerScan: () => undefined,
  handleScanData: () => undefined,
  handleScanClose: () => undefined,
  handleCloseNewContainer: () => undefined,
  pickedUp: null,
  containers: [],
  generateRoute: async (containers) => undefined,
  routeLines: null,
  polyLineKey: 0,
  handleUpdateRoute: () => undefined,
  handleSelectedContainer: (container) => undefined,
});

export const ScannerProvider = ({ children }) => {
  const [scannedCompleted, setScannedCompleted] = useState(false); // Om scanningen är completed
  const [isNewContainerScanning, setIsNewContainerScanning] = useState(false); // Om den ska scanna
  const [polyLineKey, setPolyLineKey] = useState(0);
  const [pickedUp, setPickedUp] = useState({
    pickedUp: false,
    containerID: "",
  });
  const [isScanningData, setIsScanningData] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [barCodeData, setBarCodeData] = useState(null);
  const [newContainerDialog, setNewContainerDialog] = useState(false);
  const [containers, setContainers] = useState([]);
  const [routeLines, setRouteLines] = useState(null);

  const closeNewContainerDialog = () => {
    setNewContainerDialog(false);
  };

  const handleCloseNewContainer = () => {
    setNewContainerDialog(false);
  };

  const handleNewContainerScan = () => {
    setIsNewContainerScanning(true);
  };

  const handleScanData = () => {
    setIsScanningData(true);
  };

  const handleScanClose = () => {
    setIsScanning(false);
  };

  const handleUpdateRoute = () => {
    setPolyLineKey(polyLineKey + 1);
  };

  const handleSelectedContainer = async (container) => {
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
    let updatedMapList = await generateRoute(mapList);
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

  const handleUpdateContainerScanning = async ({ type, data }) => {
    setIsScanningData(false);
    const containerId = JSON.parse(data).containerID; // Lägg till det container-ID som ska uppdateras här;
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let long = location.coords.longitude;

    const bodyData = {
      container_location: {
        lat: lat,
        long: long,
      },
      container_status: "Out for delivery",
      container_pickedup_by: "1234567",
    };

    const fetchResponse = await updateContainerStatus({
      containerId,
      bodyData,
    });
    setPickedUp({
      containerID: containerId,
      pickedUp: true,
    });
    console.log(fetchResponse);
  };

  const handleNewContainerScanning = async ({ type, data }) => {
    setNewContainerDialog(true);
    if (isScanningData) {
      console.log(JSON.parse(data).containerID);
    }
    setBarCodeData({ type: type, data: data });
    setIsNewContainerScanning(false);
    setIsScanningData(false);
    // Hämta datan för barcodes och locationen...
    // Öppna upp dialogen för att lägga till container...
  };

  const generateRoute = async (containers) => {
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      let { locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === "granted");
      setHasCameraPermission(cameraStatus === "granted");
    };
    const asyncFetch = async () => {
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
    asyncFetch();
    getBarCodeScannerPermissions();
  }, []);

  return (
    <ScannerContext.Provider
      value={{
        isNewContainerScanning,
        isScanningData,
        scannedCompleted,
        hasCameraPermission,
        handleNewContainerScan,
        handleNewContainerScanning,
        handleScanData,
        handleScanClose,
        handleCloseNewContainer,
        handleUpdateContainerScanning,
        containers,
        pickedUp,
        haverSine,
        generateRoute,
        routeLines,
        polyLineKey,
        handleUpdateRoute,
        handleSelectedContainer,
      }}
    >
      {children}
      <AddContainerDialog
        dialogTitle="Ny Container"
        beginButtonTitle="Lägg till"
        endButtonTitle="Stäng"
        dialogOpen={newContainerDialog}
        closeDialogFunction={closeNewContainerDialog}
        size="large"
      ></AddContainerDialog>
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
