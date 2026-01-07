import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

// Main layout component with Outlet (for routing, e.g., different views in main area)
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-black text-white ">
      {/* Header */}
      <Header onMenuClick={() => toggleSidebar()} />

      {/* Content area: flex row for sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - hidden on mobile, toggled via button */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main area with Outlet - shares space with sidebar */}
        <main className="bg-gray-900 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
