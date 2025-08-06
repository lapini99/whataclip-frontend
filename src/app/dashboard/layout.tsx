import { Sidebar } from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-orange-600 selection:text-white">
            <div className="flex">
                <Sidebar />
                <div className="ml-64 p-2 w-full text-slate-900">
                    {children}
                </div>
            </div>
        </div>
    );
}