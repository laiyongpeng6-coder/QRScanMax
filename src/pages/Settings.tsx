import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Info, ChevronRight, FileDown, LogOut, Star, ChevronLeft } from "lucide-react";
import { useAppContext } from "../lib/context";
import { cn } from "../lib/utils";
import { MockNativeAd, AdService } from "../components/AdSense";

export default function Settings() {
  const { history } = useAppContext();
  const navigate = useNavigate();

  const handleExport = () => {
    AdService.showInterstitial(() => {
        if (history.length === 0) {
          alert("No history to export.");
          return;
        }
        alert("Exporting CSV...");
    });
  };

  const handleRate = () => {
     const score = window.prompt("Rate us! Enter 1-5 stars:", "5");
     if (score && parseInt(score) <= 3) {
        alert("Thank you for your feedback! Opening email client to support@example.com");
     } else if (score && parseInt(score) >= 4) {
        alert("Opening Google Play In-App Review API! (Simulated)");
     }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 p-4 pt-10 text-gray-800 font-sans">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-gray-800 transition-colors">
           <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="ml-2 text-2xl font-semibold text-gray-800">Settings</h1>
      </div>

      <MockNativeAd className="mb-8" />

      <div className="space-y-6 pb-[80px]">
        {/* Settings Group 1 */}
        <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleExport}>
            <div className="flex items-center space-x-3 text-gray-700">
              <FileDown className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-sm">Export History (CSV/Excel)</span>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleRate}>
            <div className="flex items-center space-x-3 text-gray-700">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-medium text-sm">Rate Us</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Settings Group 2 */}
        <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3 text-gray-700">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-medium text-sm">Privacy Policy</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3 text-gray-700">
              <Info className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-sm">About</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">v3.1.0</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
