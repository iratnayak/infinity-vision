import Image from "next/image";
import AddProductPage from "./(admin)/admin/products/add/page";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar/>
    </div>
  );
}
