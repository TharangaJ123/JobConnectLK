import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-700">JobConnectLK</span>
          </div>
          <span className="text-black text-sm">Empowering Sri Lanka's future workforce</span>
        </div>
      </div>
      <div className="border-t border-blue-100 mt-1 pt-4 text-center text-xs text-black">
        &copy; {new Date().getFullYear()} JobConnectLK By Tharanga Jayawardhana. All rights reserved.
      </div>
    </footer>
  );
} 