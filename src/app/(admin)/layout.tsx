export default function AdminLayout({ children }: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    )
}