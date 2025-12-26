import { auth } from "@/auth";
import { Button } from "@/components/ui/Buttons";
import Link from "next/link";
export default async function TripsPage() {
  const session = auth();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign-in
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <h1>Dashboard</h1>
      <Link href="/new">
        <Button>New Trip</Button>
      </Link>
    </div>
  );
}
