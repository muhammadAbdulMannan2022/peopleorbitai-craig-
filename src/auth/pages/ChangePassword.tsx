import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("New password:", password);
    // submit new password here
    navigate("/auth/login");
  };

  return (
    <div>
      <div className="max-w-[440px] w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-6">
          Change password
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm md:text-base mb-14">
          Create a new password for your account
        </p>

        <form onSubmit={handleSubmit} className="text-left">
          {/* New Password */}
          <div className="mb-6">
            <label className="block text-slate-400 font-medium mb-3 text-sm md:text-base">
              New Password
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 rounded-xl border border-authThem/50
                shadow-sm focus:border-authThem focus:ring-4 focus:ring-authThem/10
                outline-none transition-all placeholder:text-slate-300
                text-slate-600 font-medium"
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

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="block text-slate-400 font-medium mb-3 text-sm md:text-base">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-14 pr-14 py-4 rounded-xl border border-authThem/50
                shadow-sm focus:border-authThem focus:ring-4 focus:ring-authThem/10
                outline-none transition-all placeholder:text-slate-300
                text-slate-600 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-authThem transition-colors hover:cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-medium mb-6">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-5 bg-authThem hover:bg-[#7c74ed]
            text-white rounded-xl font-bold text-lg
            shadow-xl shadow-indigo-100
            active:scale-[0.98] transition-all"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
