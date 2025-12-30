"use client";

import { Location } from "@/app/generated/prisma";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for Leaflet marker icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const center: [number, number] =
    itineraries.length > 0
      ? [itineraries[0].lat, itineraries[0].lng]
      : [0, 0];

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {itineraries.map((location, key) => (
          <Marker
            key={key}
            position={[location.lat, location.lng]}
            icon={icon}
          >
            <Popup>
              <div className="font-semibold">{location.locationTitle}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
