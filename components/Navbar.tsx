import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-2 border-b border-gray-200">
      <div className="container mx-auto flex justify-center items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src={"/logo.svg"} alt="logo" width={60} height={60} />
          <span className="text-2xl font-bold text-gray-800">Navora</span>
        </Link>
      </div>
    </nav>
  );
}
