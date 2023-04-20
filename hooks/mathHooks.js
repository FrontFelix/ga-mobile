import * as Location from "expo-location";

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export async function haverSine(lat1, lon1) {
  const { coords } = await Location.getCurrentPositionAsync({}); // Hämtar hem den aktuella mobil positionen

  // Lite matte för att skriva om LAT LONG till radianer ( CHAT GPT HJÄLPTE MIG MED MATTEN <3 )
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

export async function haverSineMarker(lat1, lon1, lat2, lon2) {
  const { coords } = await Location.getCurrentPositionAsync({}); // Hämtar hem den aktuella mobil positionen

  // Lite matte för att skriva om LAT LONG till radianer ( CHAT GPT HJÄLPTE MIG MED MATTEN <3 )
  const lat1_rad = toRadians(lat1);
  const lon1_rad = toRadians(lon1);
  const lat2_rad = toRadians(lat2);
  const lon2_rad = toRadians(lon2);

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
