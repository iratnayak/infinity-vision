import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* Admin Top Header */}
            <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo Section with your Image */}
                    <Link href="/admin/products/add" className="flex items-center gap-2 group">
                        <div className="relative w-35 h-35">
                            <Image
                                src="/ap-logo.png"
                                alt="Infinity Vision Logo"
                                fill
                                className="object-contain scale-125"
                                priority
                            />
                        </div>
                        <div className="flex flex-col border-l pl-3 border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                - Admin Dashboard
                            </span>
                        </div>
                    </Link>

                    {/* Quick Actions */}
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#1A237E] transition-colors"
                    >
                        <ChevronLeft size={16} />
                        View Storefront
                    </Link>
                </div>
            </header>
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    )
}