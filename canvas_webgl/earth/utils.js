// Convert lat/lon to cartesian coordinates
export function convertToCartesian(lat, lon, radius) {
  let phi = (lat) * Math.PI / 180;
  let theta = (lon - 180) * Math.PI / 180;
  let x = -(radius) * Math.cos(phi) * Math.cos(theta);
  let y = (radius) * Math.sin(phi);
  let z = (radius) * Math.cos(phi) * Math.sin(theta);
  return [x, y, z];
}

// Fetch data from https://restcountries.com/v3.1/all
export async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}