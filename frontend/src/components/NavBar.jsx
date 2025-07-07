import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Job Marketplace", path: "/jobs" },
  { name: "Resume Builder", path: "/resume" },
  { name: "Skill Gap Analyzer", path: "/skills" },
  { name: "Career Chatbot", path: "/chatbot" },
  { name: "Training Programs", path: "/training" },
  { name: "Employer Dashboard", path: "/employer" },
];

export default function NavBar() {
  // Placeholder for active link logic
  return (
    <nav className="w-full bg-white/90 border-b border-blue-100 shadow-sm px-4 md:px-12 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-700">JobConnectLK</span>
          </div>
          <span className="text-black text-xs">Empowering Sri Lanka's future workforce</span>
      </div>
      <div className="hidden md:flex gap-6 text-blue-700 font-medium text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-blue-900 transition px-2 py-1 rounded-lg"
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Mobile menu placeholder */}
    </nav>
  );
} 