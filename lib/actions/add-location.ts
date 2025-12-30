"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}&limit=1`,
    {
      headers: {
        "User-Agent": "NavoraApp/1.0",
      },
    }
  );

  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error("Address not found");
  }
  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const address = formData.get("address")?.toString();
  const latStr = formData.get("lat")?.toString();
  const lngStr = formData.get("lng")?.toString();

  let lat: number;
  let lng: number;

  if (latStr && lngStr) {
    lat = parseFloat(latStr);
    lng = parseFloat(lngStr);
  } else if (address) {
    const coords = await geocodeAddress(address);
    lat = coords.lat;
    lng = coords.lng;
  } else {
    throw new Error("Missing address or coordinates");
  }

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address || `${lat}, ${lng}`,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}
