import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router"; // react-router
import { FaX } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

/* ------------------------------------------------------------------ */
/*  Smooth scroll to element by ID                                    */
/* ------------------------------------------------------------------ */
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    // Fallback: if element not found, scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/* ------------------------------------------------------------------ */
/*  Navbar Component                                                  */
/* ------------------------------------------------------------------ */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home"); // Default: home
  const location = useLocation();

  const sections = ["home", "pricing", "faq"]; // Update if you add more

  /* -------------------------------------------------------------- */
  /*  1. Handle hash change (on load, back/forward, link click)    */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    const hash = location.hash.slice(1);

    const timer = setTimeout(() => {
      if (hash && sections.includes(hash)) {
        scrollToId(hash);
        setActiveId(hash);
      } else {
        // No valid hash → go to top (Home)
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveId("home");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  /* -------------------------------------------------------------- */
  /*  2. Track active section on scroll                            */
  /* -------------------------------------------------------------- */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    // If near top → Home is active
    if (scrollY < 100) {
      setActiveId("home");
      return;
    }

    let found = false;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = rect.bottom + scrollY;

        // Activate when section enters top 1/3 of viewport
        if (scrollY + window.innerHeight / 3 >= top && scrollY < bottom) {
          setActiveId(id);
          found = true;
          break;
        }
      }
    }

    // If past all sections, keep last one active
    if (!found) {
      const lastSection = document.getElementById(
        sections[sections.length - 1]
      );
      if (lastSection) {
        const bottom = lastSection.getBoundingClientRect().bottom + scrollY;
        if (scrollY + window.innerHeight >= bottom - 200) {
          setActiveId(sections[sections.length - 1]);
        }
      }
    }
  }, [sections]);

  useEffect(() => {
    handleScroll(); // Run on mount
    const onScroll = () => handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  /* -------------------------------------------------------------- */
  /*  3. Link click handler (close drawer + scroll)                */
  /* -------------------------------------------------------------- */
  const onLinkClick = (id: string) => {
    setIsOpen(false);
    scrollToId(id);
    setActiveId(id);
  };

  /* -------------------------------------------------------------- */
  /*  Reusable NavLink with active state                           */
  /* -------------------------------------------------------------- */
  const NavLink = ({ id, label }: { id: string; label: string }) => (
    <Link
      to={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        onLinkClick(id);
      }}
      className={`block transition-colors text-lg font-open-san 
        ${
          activeId === id
            ? "text-main underline font-bold"
            : "text-navNotActive hover:text-main"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* ========================== NAVBAR ========================== */}
      <nav className="pt-4 px-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-full border border-[#E7E7F0]">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <div className="flex items-center">
              <img src="/logo.svg" className="h-8" alt="Logo" />
            </div>

            {/* DESKTOP: LINKS & BUTTONS */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink id="home" label="Home" />
              <NavLink id="pricing" label="Pricing" />
              <NavLink id="faq" label="FAQ" />

              <div className="flex items-center space-x-3">
                <button className="px-4 font-open-san py-2 text-main font-medium border border-main rounded-lg hover:bg-purple-50 transition-colors hover:cursor-pointer">
                  Login
                </button>
                <button className="px-4 font-open-san py-2 bg-main text-white font-medium border border-main rounded-lg hover:bg-main/90 transition-colors hover:cursor-pointer">
                  Sign Up
                </button>
              </div>
            </div>

            {/* MOBILE: HAMBURGER */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-main p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaX className="h-6 w-6" />
                ) : (
                  <GiHamburgerMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ======================= MOBILE DRAWER ======================= */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-main/10 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 flex flex-col justify-between h-full">
              {/* Logo in drawer */}
              <div>
                <div className="flex items-center">
                  <img src="/logo.svg" className="h-8" alt="Logo" />
                </div>

                {/* Mobile Links */}
                <nav className="space-y-4 mt-8">
                  <NavLink id="home" label="Home" />
                  <NavLink id="pricing" label="Pricing" />
                  <NavLink id="faq" label="FAQ" />
                </nav>
              </div>

              {/* Mobile Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full font-open-san px-4 py-3 text-main font-medium border border-main rounded-lg hover:bg-purple-50 transition-colors hover:cursor-pointer">
                  Login
                </button>
                <button className="w-full font-open-san px-4 py-3 bg-main text-white font-medium rounded-lg hover:bg-main/90 transition-colors hover:cursor-pointer">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
