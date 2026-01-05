import React from "react";
import { Facebook, Instagram, X, Linkedin } from "lucide-react";
import { Link } from "react-router";
export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 md:px-16 border-t border-gray-100 shadow">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Address Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[#1a1a2e] text-2xl font-bold">HR Manager</h3>{" "}
            {/* Capitalized for consistency */}
            <p className="text-[#64748b] text-sm leading-relaxed max-w-60">
              Villa No. 45, Street 12, Khalifa City,
              <br />
              Abu Dhabi, United Arab Emirates
            </p>
          </div>

          {/* Links Column 1 - Expanded with more relevant links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#1a1a2e] text-lg font-semibold">
              Get Started
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/reviews"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 - Added links for legal sections */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#1a1a2e] text-lg font-semibold">Legal</h4>{" "}
            {/* Updated heading for better organization */}
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Column - Updated Twitter to X and switched to <a> for external links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#1a1a2e] text-lg font-semibold">
              Follow us on
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/hrmanager"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#818cf8]/10 flex items-center justify-center text-[#818cf8] hover:bg-[#818cf8] hover:text-white transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/hrmanager"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#818cf8]/10 flex items-center justify-center text-[#818cf8] hover:bg-[#818cf8] hover:text-white transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.x.com/hrmanager"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#818cf8]/10 flex items-center justify-center text-[#818cf8] hover:bg-[#818cf8] hover:text-white transition-all duration-300"
              >
                <X size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/hrmanager"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#818cf8]/10 flex items-center justify-center text-[#818cf8] hover:bg-[#818cf8] hover:text-white transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Updated email, copyright year, and company name for consistency and current date */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#64748b] text-sm font-medium">
            support@hrmanager.com
          </p>
          <p className="text-[#64748b] text-sm">
            © 2026 HR Manager. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
