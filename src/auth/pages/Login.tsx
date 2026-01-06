import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="text-center">
        {/* Welcome Text */}
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-8 md:mb-12 tracking-tight">
          Welcome <span className="text-title-2nd">back</span>
        </h1>

        <form onSubmit={handleSubmit} className="text-left">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-slate-400 font-medium mb-3 text-sm md:text-base">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="user@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-xl border border-authThem/50 shadow-sm focus:border-authThem focus:ring-4 focus:ring-authThem/10 outline-none transition-all placeholder:text-slate-300 text-slate-600 font-medium"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="block text-slate-400 font-medium mb-3 text-sm md:text-base">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 rounded-xl border border-authThem/50 shadow-sm focus:border-authThem focus:ring-4 focus:ring-authThem/10 outline-none transition-all placeholder:text-slate-300 text-slate-600 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-authThem transition-colors hover:cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forget Password */}
          <div className="flex justify-end mb-8">
            <Link
              to="/auth/confirm-email"
              className="text-authThem text-[10px] md:text-xs font-bold hover:underline hover:cursor-pointer"
            >
              Forget Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-5 bg-authThem hover:cursor-pointer hover:bg-[#7c74ed] text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all mb-6"
          >
            Sign In
          </button>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-slate-400 text-[10px] md:text-xs font-medium">
              Don't have account?
            </span>
            <Link
              to="/auth/signup"
              className="px-4 py-1.5 border border-authThem rounded-lg hover:cursor-pointer text-authThem text-[10px] md:text-xs font-bold hover:bg-authThem/5 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 border-t border-slate-200 border-dotted"></div>
            <span className="text-slate-400 text-xs md:text-sm whitespace-nowrap">
              Or sign in with
            </span>
            <div className="flex-1 border-t border-slate-200 border-dotted"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full py-4 border border-authThem/30 rounded-xl flex items-center justify-center gap-3 text-slate-500 font-bold hover:bg-slate-50 transition-all active:scale-[0.98] hover:cursor-pointer"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Google
          </button>
        </form>
    </div>
  );
}
