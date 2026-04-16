import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 md:px-16 border-t border-gray-100 shadow">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <h3 className="text-[#1a1a2e] text-2xl font-bold">PeopleOrbitAI</h3>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-60">
              Level 7, 10 Yarra Street, South Yarra, 3141, Vic Australia
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#1a1a2e] text-lg font-semibold">
              Get Started
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/#features"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/#pricing"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#1a1a2e] text-lg font-semibold">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-[#64748b] hover:text-[#818cf8] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#1a1a2e] text-lg font-semibold">
              Follow us on
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/peopleorbit-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#818cf8]/10 flex items-center justify-center text-[#818cf8] hover:bg-[#818cf8] hover:text-white transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/peopleorbit.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#818cf8]/10 flex items-center justify-center text-[#818cf8] hover:bg-[#818cf8] hover:text-white transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#64748b] text-sm font-medium">
            craig@talentflexx.com
          </p>
          <p className="text-[#64748b] text-sm">
            © 2026 PeopleOrbitAI. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
