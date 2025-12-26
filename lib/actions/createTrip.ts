import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const strDateString = formData.get("startDate")?.toString();
  const endDateString = formData.get("endDate")?.toString();

  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Login to create a new trip");
  }

  if (!title || !description || !strDateString || !endDateString) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(strDateString);
  const endDate = new Date(endDateString);

  await prisma.trip.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      userId: session.user.id,
    },
  });

  redirect("/trips");
}
