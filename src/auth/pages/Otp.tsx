import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";

export default function OTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  // Auto focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    const newOtp = pasted.split("");
    while (newOtp.length < 4) newOtp.push("");

    setOtp(newOtp);
    setError("");
    inputsRef.current[Math.min(pasted.length - 1, 3)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((d) => !d)) {
      setError("Enter all 4 digits");
      return;
    }

    const code = otp.join("");
    console.log("OTP:", code);

    // If we came from forgot password flow, go to change password
    if (location.state?.from === 'forgot') {
      navigate("/auth/change-password");
    } else {
      // Signup flow: go to login
      navigate("/auth/login");
    }
  };

  return (
    <div className="max-w-[440px] w-full text-center">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-4">
        Verify OTP
      </h1>
      <p className="text-slate-400 text-sm mb-12">
        Enter the 4-digit code sent to <span className="text-authThem font-bold">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* OTP Inputs */}
        <div className="flex justify-center gap-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputsRef.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              placeholder="0"
              className={`w-16 h-16 text-2xl font-black text-center rounded-2xl
                border shadow-lg transition-all outline-none
                focus:ring-4 focus:ring-authThem/20
                ${
                  digit ? "border-authThem bg-authThem/5" : "border-authThem/40"
                }
                ${error ? "border-red-500" : ""}`}
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={otp.some((d) => !d)}
          className="w-full py-5 bg-authThem hover:bg-[#7c74ed]
          text-white rounded-xl font-bold text-lg
          shadow-xl shadow-indigo-100
          active:scale-[0.98] transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm
        </button>

        {/* Resend */}
        <p className="text-slate-400 text-xs">
          Didn’t get the code?{" "}
          <button
            type="button"
            className="text-authThem font-bold hover:underline"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
}
