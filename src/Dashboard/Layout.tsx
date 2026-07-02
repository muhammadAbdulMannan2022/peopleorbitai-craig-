import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import { useGetProfileQuery } from "../store/apiSlice";
import { useKbSocket } from "../hooks/useKbSocket";

// Main layout component with Outlet (for routing, e.g., different views in main area)
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: profileResponse, error, isLoading } = useGetProfileQuery();
  const navigate = useNavigate();

  const user = profileResponse?.data?.profile;
  useKbSocket(user?.id);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (error) {
      navigate("/auth/login");
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white flex-col gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#8B7EF0]"></div>
        <p className="text-slate-400 text-sm font-medium">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-black text-white ">
      {/* Header */}
      <Header onMenuClick={() => toggleSidebar()} />

      {/* Content area: flex row for sidebar + main */}
      <div className="flex flex-1 overflow-hidden ">
        {/* Left sidebar - hidden on mobile, toggled via button */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main area with Outlet - shares space with sidebar */}
        <main className="bg-gray-900 overflow-y-auto flex-1 h-[calc(100vh-5rem)] mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

