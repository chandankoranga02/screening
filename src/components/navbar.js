import React, { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";

function Navbar() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    "Home",
    "Programs",
    "Partners",
    "About Us",
    "Contact",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Sleek, semi-transparent glass pill */}
        <div className="backdrop-blur-md bg-[#0a0f1e]/40 border border-white/5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 md:px-8 py-3 flex items-center justify-between">
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4 min-w-fit">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy6B6H9K5Qyka_jig1AZ8jXrqGsdveoxczHA&s"
                alt="IISPPR Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-white text-lg font-bold tracking-wider">
                IISPPR
              </h1>
              <p className="text-cyan-400/80 text-[10px] uppercase tracking-widest hidden sm:block font-medium">
                Academy
              </p>
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActive(link)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === link
                    ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/80 to-purple-500/80 hover:from-cyan-400 hover:to-purple-400 text-white text-sm font-medium transition-all duration-300 border border-white/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <LogIn size={16} />
              Login
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-zinc-300 hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden mt-4 bg-[#0a0f1e]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setActive(link);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  active === link
                    ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link}
              </button>
            ))}

            <button className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/80 to-purple-500/80 text-white font-medium border border-white/10">
              <LogIn size={18} />
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;