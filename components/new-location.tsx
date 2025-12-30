"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { Button } from "./ui/Buttons";
import { addLocation } from "@/lib/actions/add-location";

// Dynamically import LocationPicker to avoid SSR issues with Leaflet
const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md mb-4 flex items-center justify-center">Loading Map...</div>
});

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransation] = useTransition();
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationSelect = (lat: number, lng: number, addr: string) => {
    setCoords({ lat, lng });
    setAddress(addr);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Add New Location
          </h1>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Click on the map to select a location</p>
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>

          <form
            className="space-y-6"
            action={(formData: FormData) => {
              startTransation(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            {coords && (
              <>
                <input type="hidden" name="lat" value={coords.lat} />
                <input type="hidden" name="lng" value={coords.lng} />
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address {coords ? "(autofilled from map)" : ""}
              </label>
              <input
                name="address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address or select on map"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <Button type="submit" className="w-full py-3 text-lg font-semibold" disabled={isPending}>
              {isPending ? "Adding..." : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
