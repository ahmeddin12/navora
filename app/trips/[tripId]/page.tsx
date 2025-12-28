import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import TripDetail from "@/components/TripDetail";
export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();

  if (!session) {
    return <div>Please Sign In</div>;
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
    include: { locations: true },
  });

  if (!trip) {
    return <div>Trip Not Found!</div>;
  }

  return <TripDetail trip={trip} />;
}
