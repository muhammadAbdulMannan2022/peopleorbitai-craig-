import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail } from "lucide-react";
import { useForgotPasswordMutation } from "../../store/apiSlice";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    console.log("Confirm email:", email);
    
    try {
      await forgotPassword({ email }).unwrap();
      navigate("/auth/otp", { state: { email, from: 'forgot' } });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.data?.errors?.message || err.data?.message || "Failed to send reset code. Please try again.");
    }
  };

  return (
    <div>
      <div className="max-w-[440px] w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-6 tracking-tight">
          Confirm your email
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm md:text-base mb-10">
          Enter your email address and we’ll send you a verification code
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm font-medium text-left">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-left">
          {/* Email */}
          <div className="mb-10">
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
                className="w-full pl-14 pr-6 py-4 rounded-xl border border-authThem/50
                shadow-sm focus:border-authThem focus:ring-4 focus:ring-authThem/10
                outline-none transition-all placeholder:text-slate-300
                text-slate-600 font-medium"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-authThem hover:bg-[#7c74ed]
            text-white rounded-xl font-bold text-lg
            shadow-xl shadow-indigo-100
            active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
