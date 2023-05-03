import { createContext, useContext, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import AddContainerDialog from "../components/Modals/AddContainerDialog";
import * as Location from "expo-location";
import { updateContainerStatus, getContainers } from "../hooks/scannerHooks";
import { useTaskContext } from "./TaskContext";

export const ScannerContext = createContext({
  scannedCompleted: false,
  isAddScan: false,
  isContainerScan: false,
  hasCameraPermission: null,
  hasLocationPermission: null,
  // _handleDataScan: (type, data) => undefined,
  handleNewContainerScanning: (type, data) => undefined,
  handleNewContainerScan: () => undefined,
  _closeScanner: (scanner) => undefined,
  _openScanner: (scanner) => undefined,
  handleProductInventory: (type, data) => undefined,
});

export const ScannerProvider = ({ children }) => {
  /**
   * * scannedCompleted, markerar om den öppnade scanningen är klar
   * * isAddScan, om man har öppet scanningen som lägger till container
   * * isContainerScan, om man har öppet scanning som ger dig data av scanning
   */
  const [scannedCompleted, setScannedCompleted] = useState(false); // Om scanningen är completed
  const [isAddScan, setIsAddScan] = useState(false);
  const [isContainerScan, setIsContainerScan] = useState(false);
  // ************************************************************************************************

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [barCodeData, setBarCodeData] = useState(null);
  const [newContainerDialog, setNewContainerDialog] = useState(false);

  const { products, scannedProducts, addScannedProduct } = useTaskContext();

  const handleProductInventory = (type, data) => {
    if (type !== "org.gs1.EAN-13") {
      return;
    }
    if (scannedProducts.indexOf(data) !== -1) {
      return;
    } else {
      console.log("finns inte i scannade produkter...");
      addScannedProduct(data);
      if (products.find((product) => product.data === data)) {
        console.log("produkten finns i listan.");
      } else {
        console.log("produkten finns ej i listan");
      }
    }
  };

  const closeNewContainerDialog = () => {
    setNewContainerDialog(false);
  };

  const handleCloseNewContainer = () => {
    setNewContainerDialog(false);
  };

  const _openScanner = (scanner) => {
    if (scanner === "data") {
      setIsContainerScan(true);
    } else if (scanner === "add") {
      setIsAddScan(true);
    } else {
      return;
    }
  };

  const _closeScanner = (scanner) => {
    if (scanner === "data") {
      setIsContainerScan(false);
    } else if (scanner === "add") {
      setIsAddScan(false);
    } else {
      return;
    }
  };

  // const _handleDataScan = async ({ type, data }) => {
  //   _closeScanner("data");
  //   const containerId = JSON.parse(data).containerID; // Lägg till det container-ID som ska uppdateras här;
  //   return containerId;
  //   // !! MÅSTE GÖRAS I TASKCONTEX.JS
  //   // let location = await Location.getCurrentPositionAsync({});
  //   // let lat = location.coords.latitude;
  //   // let long = location.coords.longitude;

  //   // const bodyData = {
  //   //   container_location: {
  //   //     lat: lat,
  //   //     long: long,
  //   //   },
  //   //   container_status: "Out for delivery",
  //   //   container_pickedup_by: "1234567",
  //   // };

  //   // const fetchResponse = await updateContainerStatus({
  //   //   containerId,
  //   //   bodyData,
  //   // });
  //   // !! MÅSTE GÖRAS I TASKCONTEXT.JS
  // };

  const handleNewContainerScanning = async ({ type, data }) => {
    // setNewContainerDialog(true);
    // if (isScanningData) {
    //   console.log(JSON.parse(data).containerID);
    // }
    // setBarCodeData({ type: type, data: data });
    if (products.find((product) => product.data === data)) {
      console.log("produkten finns i listan.");
    }
    _closeScanner("data");
    _closeScanner("add");
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
        scannedCompleted,
        hasCameraPermission,
        handleNewContainerScanning,
        handleCloseNewContainer,
        _closeScanner,
        isAddScan,
        isContainerScan,
        _openScanner,
        // _handleDataScan,
      }}
    >
      {children}
      <AddContainerDialog
        dialogTitle="Ny Container"
        beginButtonTitle="Lägg till"
        endButtonTitle="Stäng"
        dialogOpen={newContainerDialog}
        size="large"
      ></AddContainerDialog>
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
