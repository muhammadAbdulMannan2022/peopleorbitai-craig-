import { useState } from "react";
import { Mail } from "lucide-react";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Confirm email:", email);
    // send OTP / confirmation email here
  };

  return (
    <div>
      <div className="max-w-[440px] w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-6 tracking-tight">
          Confirm your email
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm md:text-base mb-14">
          Enter your email address and we’ll send you a verification code
        </p>

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
            className="w-full py-5 bg-authThem hover:bg-[#7c74ed]
            text-white rounded-xl font-bold text-lg
            shadow-xl shadow-indigo-100
            active:scale-[0.98] transition-all"
          >
            Send Code
          </button>
        </form>
      </div>
    </div>
  );
}
