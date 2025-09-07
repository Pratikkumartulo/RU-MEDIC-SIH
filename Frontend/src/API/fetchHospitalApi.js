// utils/fetchHospitals.js
import { haversineDistance } from "../utils/haversine"; // adjust the import based on your project structure

export async function fetchHospitals(lat, lon, radius = 5000) {
  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lon});
      way["amenity"="hospital"](around:${radius},${lat},${lon});
      relation["amenity"="hospital"](around:${radius},${lat},${lon});
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  // transform result into required format
  return data.elements.map((el, index) => {
    const name = el.tags?.name || "Unnamed Hospital";
    const address = el.tags?.["addr:full"] || el.tags?.["addr:street"] || "Address not available";

    return {
      id: index + 1,
      name,
      type: el.tags?.["healthcare"] || "General Hospital",
      rating: (Math.random() * 2 + 3).toFixed(1), // mock rating between 3.0 - 5.0
      reviews: Math.floor(Math.random() * 500), // mock review count
      distance: el.lat && el.lon ? `${haversineDistance(lat, lon, el.lat, el.lon).toFixed(2)} km away` : "Distance not available",
      specialties: ["General Medicine"], // placeholder, OSM doesn’t give specialties
      availability: "Available Now", // placeholder
      waitTime: null,
      phone: el.tags?.phone || "Not Available",
      address,
      emergency: el.tags?.emergency === "yes"
    };
  });
}
