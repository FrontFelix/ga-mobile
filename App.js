import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useAssets } from 'expo-asset';

export default function App() {
  const [assets, error] = useAssets([require('./assets/container.png')]);
  const [showDialog, setShowDialog] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false)

  const [barList, setBarList] = useState([])
  const [location, setLocation] = useState(null)

  const openDialog = () => {
    console.log("click clack")
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    console.log(barList)
    const getBarCodeScannerPermissions = async () => {
      let { geoStatus } = await Location.requestForegroundPermissionsAsync();
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if(scanned === true) {
      setScanned(false)
      setIsScanning(false)
    }
  }, [scanned])

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log("type", type)
    console.log("data", data)
    if(barList.find(bar => bar.dataInfo === data)) {
      console.log("item finns i listan", barList)
      return
    }
    let newBarList = barList
    newBarList.push({barType: type, dataInfo: data})
    setBarList(newBarList)
    console.log("la till item i listan", barList)

    let regionName = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log("namn", regionName[0].name)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const scannedReady = () => {
    setScanned(false)
    setIsScanning(false)
  }

  return (
    <View style={styles.container}>
      <Button title='Scanna' onPress={() => setIsScanning(true)} />
      {isScanning && (
              <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.test}
            />
      )}
      {scanned && <Button title={'Tap to Scan Again'} onPress={scannedReady} />}
      {location && (
        <View style={{ width: "100%", height: "50%" }}>
            <MapView style={{ width: "100%", height: "50%" }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker onPress={openDialog} coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} >
              <Image style={{height: 50, width: 50}} source={assets[0]} />
            </Marker>
          </MapView>
          <Modal
        animationType="slide"
        transparent={false}
        visible={showDialog}
      >
        <View style={styles.modal}>
          <Text>testnamn</Text>
          <Text>testdata</Text>
          <TouchableOpacity onPress={closeDialog}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
          </View>
          
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    width: "80%",
    height: "50%"
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
