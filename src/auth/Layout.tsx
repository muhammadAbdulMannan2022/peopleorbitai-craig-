// Layout.tsx
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      {/* Left Panel - Illustration */}
      <div className="hidden md:flex md:w-1/2 sticky top-0 h-screen border-r border-gray-200">
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-[5%] left-0 z-10 bg-white/50 backdrop-blur-xs px-5 py-3 rounded-e-full">
            <img className="h-10" src="/logo.svg" alt="" />
          </div>
          <img
            src="/auth.jpg"
            alt="Auth illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-10 right-10 z-10 px-6 bg-black/30 backdrop-blur-md py-6 rounded-t-full text-center flex flex-col items-center justify-center text-white border border-white/10">
            <h1 className="text-2xl font-bold mb-2">AI Agent</h1>
            <p className="text-sm opacity-90 leading-relaxed max-w-[70%]">
              Empowering hotels and restaurants with AI-driven solutions to
              enhance guest experiences and streamline digital services. Sign in
              to manage your business and connect with customers effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col w-full min-h-screen h-screen overflow-y-auto bg-white md:bg-transparent">
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-[440px] py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
