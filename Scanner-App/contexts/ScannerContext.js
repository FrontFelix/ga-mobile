import { createContext, useContext, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getProducts } from "../hooks/scannerHooks";

export const ScannerContext = createContext({
  scannedCompleted: false,
  isAddScan: false,
  isContainerScan: false,
  hasCameraPermission: null,
  products: [],
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
  const [products, setProducts] = useState([]);
  const [isContainerScan, setIsContainerScan] = useState(false);
  // ************************************************************************************************

  const [hasCameraPermission, setHasCameraPermission] = useState(null);

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

  const loadProducts = async () => {
    const productsFetch = await getProducts();
    console.log("Produkter", productsFetch);
    setProducts(productsFetch);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === "granted");
    };
    getBarCodeScannerPermissions();
    loadProducts();
  }, []);

  return (
    <ScannerContext.Provider
      value={{
        scannedCompleted,
        hasCameraPermission,
        _closeScanner,
        isAddScan,
        isContainerScan,
        _openScanner,
      }}
    >
      {children}
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
