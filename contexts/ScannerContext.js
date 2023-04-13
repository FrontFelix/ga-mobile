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
  routeLines: null,
  polyLineKey: 0,
});

export const ScannerProvider = ({ children }) => {
  const [scannedCompleted, setScannedCompleted] = useState(false); // Om scanningen är completed
  const [isNewContainerScanning, setIsNewContainerScanning] = useState(false); // Om den ska scanna
  const [polyLineKey, setPolyLineKey] = useState(0);
  const [isScanningData, setIsScanningData] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [barCodeData, setBarCodeData] = useState(null);
  const [newContainerDialog, setNewContainerDialog] = useState(false);
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      let { locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === "granted");
      setHasCameraPermission(cameraStatus === "granted");
    };
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
        routeLines,
        polyLineKey,
      }}
    >
      {children}
      <AddContainerDialog
        dialogTitle="Ny Container"
        beginButtonTitle="Lägg till"
        endButtonTitle="Stäng"
        dialogOpen={newContainerDialog}
        closeDialogFunction={closeNewContainerDialog}
        handleCloseNewContainer={handleCloseNewContainer}
        size="large"
      ></AddContainerDialog>
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
