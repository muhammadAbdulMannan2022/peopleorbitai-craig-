import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";

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
        <aside
          className={`bg-green-400 p-5 absolute md:relative top-20 h-[calc(100vh-5rem)] md:bottom-0 left-0  w-[70%] md:w-[20%] md:min-w-[400px] transform transition-transform duration-300 ease-in-out z-10 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block`}
        >
          <h3>Contacts / Channels</h3>
          <p>Placeholder for user list</p>
          <button className="md:hidden mt-4 text-black" onClick={toggleSidebar}>
            Close
          </button>
        </aside>

        {/* Main area with Outlet - shares space with sidebar */}
        <main className="bg-gray-900 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
