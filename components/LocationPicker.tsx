"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";

// Fix for Leaflet marker icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition }: { position: L.LatLng | null; setPosition: (p: L.LatLng) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon} />
  );
}

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (position) {
      // Reverse geocode to get address
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`, {
        headers: {
          "User-Agent": "NavoraApp/1.0",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          onLocationSelect(position.lat, position.lng, data.display_name || "Unknown Location");
        })
        .catch((error) => {
          console.error("Reverse geocoding error:", error);
          onLocationSelect(position.lat, position.lng, "Unknown Location");
        });
    }
  }, [position, onLocationSelect]);

  return (
    <div className="h-64 w-full mb-4 rounded-md overflow-hidden border">
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
