import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react"; 
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <div className="border-b bg-white w-full"> 
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    
                    {/* 1. Brand Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-12 w-32">
                            <Image
                                src="/ap-logo.png"
                                alt="Infinity Vision Logo"
                                fill
                                className="object-contain" 
                                priority
                            />
                        </div>
                    </Link>

                    {/* 2. Main Navigation */}
                    <div className="hidden lg:flex items-center gap-x-6">
                        <Link href="/shop" className="text-sm font-medium transition-colors hover:text-black text-neutral-500">
                            Shop Now
                        </Link>
                    </div>

                    {/* 3. Actions (Cart Icon) */}
                    <div className="flex items-center gap-x-4">
                        <Button className="flex items-center rounded-full bg-black px-4 py-2 hover:bg-gray-800">
                            <ShoppingBag size={20} color="white" />
                            <span className="ml-2 text-sm font-medium text-white">
                                0
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;