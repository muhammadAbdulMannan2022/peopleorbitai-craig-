import React, { useEffect, useRef, useState } from "react";
import { Globe, ChevronRight, Menu, Lock, User } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
  userName?: string;
  userAvatar?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  userName = "Cameron",
  userAvatar = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white h-20">
      <div className="h-1.5 bg-dashboardMain w-full" />

      <div className="h-[calc(5rem-0.375rem)] border-b border-gray-100 flex items-center justify-between px-6 md:px-12">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-slate-600"
          >
            <Menu size={24} />
          </button> */}

          <img src="/logo.svg" className="h-8 md:h-10" alt="" />
        </div>

        {/* Right */}
        <div
          className="flex items-center gap-4 md:gap-8 relative"
          ref={dropdownRef}
        >
          {/* Desktop Upgrade */}
          <button className="hidden sm:flex items-center gap-2 bg-dashboardMain text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95">
            <Globe size={18} />
            Upgrade Plan
          </button>

          {/* Profile */}
          <div
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-dashboardMain">
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden md:flex items-center gap-2 text-text-2nd">
              <span className="font-bold text-sm ">{userName}</span>
            </div>
            <ChevronRight
              size={16}
              className={`transition text-text-2nd ${open ? "rotate-90" : ""}`}
            />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in">
              <button className="w-full md:hidden flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium text-text-2nd hover:cursor-pointer">
                <Globe size={18} />
                Upgrade Plan
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium text-text-2nd hover:cursor-pointer">
                <User size={18} />
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-medium text-text-2nd hover:cursor-pointer">
                <Lock size={18} />
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
