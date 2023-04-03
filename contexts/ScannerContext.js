import { createContext, useContext, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import SapDialog from "../components/SapDialog";

export const ScannerContext = createContext({
  scannedCompleted: false,
  isScanning: false,
  hasCameraPermission: null,
  handleNewContainerScanning: (type, data) => undefined,
  handleScan: () => undefined,
  handleScanClose: () => undefined,
  handleCloseNewContainer: () => undefined,
});

export const ScannerProvider = ({ children }) => {
  const [scannedCompleted, setScannedCompleted] = useState(false); // Om scanningen är completed
  const [isScanning, setIsScanning] = useState(false); // Om den ska scanna
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [barCodeData, setBarCodeData] = useState(null);
  const [newContainerDialog, setNewContainerDialog] = useState(false);

  const closeNewContainerDialog = () => {
    setNewContainerDialog(false);
  };

  const handleCloseNewContainer = () => {
    setNewContainerDialog(false);
  };

  const handleScan = () => {
    setIsScanning(true);
  };

  const handleScanClose = () => {
    setIsScanning(false);
  };

  const handleNewContainerScanning = async ({ type, data }) => {
    setNewContainerDialog(true);
    console.log("type", type);
    console.log("data", data);
    setBarCodeData({ type: type, data: data });
    setIsScanning(false);
    // Hämta datan för barcodes och locationen...
    // Öppna upp dialogen för att lägga till container...
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  return (
    <ScannerContext.Provider
      value={{
        isScanning,
        scannedCompleted,
        hasCameraPermission,
        handleScan,
        handleNewContainerScanning,
        handleScanClose,
        handleCloseNewContainer,
      }}
    >
      {children}
      <SapDialog
        dialogTitle="Ny Container"
        beginButtonTitle="Lägg till"
        endButtonTitle="Stäng"
        dialogOpen={newContainerDialog}
        closeDialogFunction={closeNewContainerDialog}
        size="large"
      ></SapDialog>
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
