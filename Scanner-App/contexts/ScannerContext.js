import { createContext, useContext, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getProducts } from "../hooks/scannerHooks";

export const ScannerContext = createContext({
  scannedCompleted: false,
  isScanning: false,
  hasCameraPermission: null,
  products: [],
  _closeScanner: (scanner) => undefined,
  _openScanner: (scanner) => undefined,
  handleProductInventory: (type, data) => undefined,
  scannedProducts: [],
  inventoryProducts: [],
});

export const ScannerProvider = ({ children }) => {
  /**
   * * scannedCompleted, markerar om den öppnade scanningen är klar
   * * isAddScan, om man har öppet scanningen som lägger till container
   * * isContainerScan, om man har öppet scanning som ger dig data av scanning
   */
  const [scannedCompleted, setScannedCompleted] = useState(false); // Om scanningen är completed
  const [isScanning, setIsScanning] = useState(false);
  const [products, setProducts] = useState([]);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [inventoryProducts, setInventoryProducts] = useState([]);
  // ************************************************************************************************

  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const addScannedProduct = (product) => {
    console.log("data läggs tilll....", product);
    const scannedList = scannedProducts;
    scannedList.push(product);
    setScannedProducts(scannedList);
  };

  const handleProductInventory = ({ type, data }) => {
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
        const updatedInventory = [...inventoryProducts];
        updatedInventory.push(
          products.find((product) => product.data === data)
        );
        setInventoryProducts(updatedInventory);
      } else {
        console.log("produkten finns ej i listan");
      }
    }
  };

  const _openScanner = (scanner) => {
    if (scanner === "data") {
      setIsScanning(true);
    } else return;
  };

  const _closeScanner = (scanner) => {
    if (scanner === "data") {
      setIsScanning(false);
    } else return;
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
        isScanning,
        _openScanner,
        handleProductInventory,
        inventoryProducts,
      }}
    >
      {children}
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => useContext(ScannerContext);
