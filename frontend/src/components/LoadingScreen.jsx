import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-extrabold text-blue-700">JobConnectLK</span>
      </div>
      <div className="w-16 h-16 mb-4 relative flex items-center justify-center">
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></span>
        <span className="absolute inline-block w-8 h-8 rounded-full bg-blue-200 opacity-60 animate-pulse"></span>
      </div>
      <span className="text-blue-600 font-medium text-lg">Loading...</span>
    </div>
  );
} 