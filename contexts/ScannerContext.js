import { createContext, useContext, useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import AddContainerDialog from "../components/Modals/AddContainerDialog";
import * as Location from "expo-location";
import { updateContainerStatus, getContainers } from "../hooks/scannerHooks";

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
  handleCloseScanner: () => undefined,
  pickedUp: null,
  containers: [],
  haverSine: (lat1, lon1) => undefined,
  generateRoute: async (containers) => undefined,
  routeLines: null,
});

export const ScannerProvider = ({ children }) => {
  const [scannedCompleted, setScannedCompleted] = useState(false); // Om scanningen är completed
  const [isNewContainerScanning, setIsNewContainerScanning] = useState(false); // Om den ska scanna
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

  const handleCloseScanner = () => {
    handleScanClose();
  };

  async function haverSine(lat1, lon1) {
    const { coords } = await Location.getCurrentPositionAsync({}); // Hämtar hem den aktuella mobil positionen

    // Lite matte för att skriva om LAT LONG till radianer ( CHAT GPT HJÄLPTE MIG MED MATTEN <3 )
    function toRadians(degrees) {
      return degrees * (Math.PI / 180);
    }
    const lat1_rad = toRadians(lat1);
    const lon1_rad = toRadians(lon1);
    const lat2_rad = toRadians(coords.latitude);
    const lon2_rad = toRadians(coords.longitude);

    // Matte för räkna ut skillnaden mellan avstånden
    const delta_lat = lat2_rad - lat1_rad;
    const delta_lon = lon2_rad - lon1_rad;

    // Räkna ut avståndet på jordens yta med Haversine-formeln ( CHAT GPT HJÄLPTE MIG MED FORMELN <3 )
    const a =
      Math.sin(delta_lat / 2) ** 2 +
      Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(delta_lon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c * 1000; // Räkna om till meter

    // Retunerar avstånden mellan din aktuella position och till containern
    return distance;
  }

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
    let updatedContainers = await Promise.all(
      containers.map(async (container) => {
        // Skriver om objektet då vi inte behöver all information
        const updatedItem = {
          name: container.name,
          location: container.location,
          // använder formeln som skapats för räkna avståndet.
          distance: await haverSine(
            container.location.lat,
            container.location.long
          ),
        };
        // Retunerar det nya objektet till vår lista.
        return updatedItem;
      })
    );

    // Sorterar listan från lägsta avståndet till längsta.
    updatedContainers.sort((a, b) => a.distance - b.distance);
    //Hämtar hem din position
    const { coords } = await Location.getCurrentPositionAsync({});

    const markersPosition = updatedContainers.map((container, index) => {
      // Skriver om objekten till arrays, för det behöver vi sedan i vår "PolyLine" från expo-map

      // Om index är 0 då ska vi först göra kordinaterna från mobilen till närmaste container eftersom vi sorterade listan förut.
      if (index === 0) {
        return [
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          {
            latitude: container.location.lat,
            longitude: container.location.long,
          },
        ];
        // Om index är mer 0 då så räknar vi avståndet från senaste containern till nuvarande container. Därflr vi kör index-1
      } else {
        return [
          {
            latitude: updatedContainers[index - 1].location.lat,
            longitude: updatedContainers[index - 1].location.long,
          },
          {
            latitude: container.location.lat,
            longitude: container.location.long,
          },
        ];
      }
    });
    // Retunerar den nya listan för våra polylines ( routes )
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
      const routes = await generateRoute(containersFetch);
      setRouteLines(routes);
      setContainers(containersFetch);
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
