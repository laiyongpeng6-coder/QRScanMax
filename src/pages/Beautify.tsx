import React, { useState } from "react";
import { ChevronLeft, Download, Share2, Crown, Sparkles, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useAppContext } from "../lib/context";
import { cn } from "../lib/utils";
import { AdService } from "../components/AdSense";

const TABS = ["Templates", "Colors", "Icons", "Patterns"];

export default function Beautify() {
  const navigate = useNavigate();
  const { addToHistory } = useAppContext();
  
  const [content, setContent] = useState("https://ai.google.com/");
  const [activeTab, setActiveTab] = useState("Colors");

  // QR config states
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isGradient, setIsGradient] = useState(false);
  const [logoImage, setLogoImage] = useState("");

  const handlePremiumAction = (callback: () => void) => {
    AdService.showRewarded(callback);
  };

  const setPremiumColor = (c: string) => {
    handlePremiumAction(() => {
      setFgColor(c);
      setIsGradient(true); // Mocking gradient via state flag
    });
  };

  const setPremiumLogo = (logoBase64: string) => {
    handlePremiumAction(() => {
      setLogoImage(logoBase64);
    });
  }

  const handleGenerate = () => {
    if (!content.trim()) return;
    AdService.showInterstitial(() => {
      addToHistory({
        id: Date.now().toString(),
        type: "url",
        content,
        timestamp: Date.now(),
      });
      alert("Beautified QR generated & saved!");
    });
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 pt-8 text-gray-800 font-sans">
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-800">Beautify Workspace</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4">
          {/* Result Area */}
          <div className="mb-6 rounded-2xl bg-white shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center">
             <div className="relative border-4 border-gray-50 rounded-xl p-4 bg-white shadow-sm overflow-hidden">
                <QRCodeSVG 
                  value={content || " "} 
                  size={200} 
                  level="H" 
                  includeMargin={true}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  imageSettings={
                    logoImage ? {
                      src: logoImage,
                      height: 48,
                      width: 48,
                      excavate: true
                    } : undefined
                  }
                />
             </div>
             <p className="mt-4 text-xs font-medium text-gray-500 max-w-[200px] truncate">{content || "Type content below"}</p>
          </div>

          <input
             type="text"
             className="w-full mb-6 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
             placeholder="Target URL or Text..."
             value={content}
             onChange={(e) => setContent(e.target.value)}
          />

          {/* Configurator Tabs */}
          <div className="flex w-full space-x-1 rounded-xl bg-gray-200 mb-6 p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-xs font-semibold transition-all shadow-sm",
                  activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Colors" && (
          <div className="px-4 grid grid-cols-5 gap-3">
            {/* Free colors */}
            <button onClick={() => setFgColor("#000000")} className="h-12 rounded-xl bg-black shadow-sm" />
            <button onClick={() => setFgColor("#ef4444")} className="h-12 rounded-xl bg-red-500 shadow-sm" />
            <button onClick={() => setFgColor("#3b82f6")} className="h-12 rounded-xl bg-blue-500 shadow-sm" />
            {/* Premium Colors (Rewarded) */}
            <button onClick={() => setPremiumColor("#8b5cf6")} className="relative h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm flex items-center justify-center">
              <span className="h-4 w-4 rounded-sm bg-red-500 border border-white animate-pulse" />
            </button>
            <button onClick={() => setPremiumColor("#f59e0b")} className="relative h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-sm flex items-center justify-center">
              <span className="h-4 w-4 rounded-sm bg-red-500 border border-white animate-pulse" />
            </button>
          </div>
        )}

        {activeTab === "Icons" && (
          <div className="px-4 grid grid-cols-4 gap-4">
             {/* Simple free mock logos or remove to simplify, let's keep one empty to clear */}
             <button onClick={() => setLogoImage("")} className="h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">Clear</button>
             {/* Premium logos */}
             <button onClick={() => setPremiumLogo("https://cdn-icons-png.flaticon.com/512/174/174855.png")} className="relative h-16 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-2">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Insta" className="h-6 w-6 opacity-80" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border border-white" />
             </button>
             <button onClick={() => setPremiumLogo("https://cdn-icons-png.flaticon.com/512/733/733590.png")} className="relative h-16 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-2">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733590.png" alt="Twitter" className="h-6 w-6 opacity-80" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border border-white" />
             </button>
          </div>
        )}

        {(activeTab === "Templates" || activeTab === "Patterns") && (
          <div className="px-4 py-8 text-center text-gray-400 flex flex-col items-center">
             <Wand2 className="h-8 w-8 mb-2 opacity-50" />
             <p className="text-sm font-medium">Coming soon!</p>
          </div>
        )}

        <div className="mt-8 px-4">
          <button 
            onClick={handleGenerate} 
            className="w-full flex items-center justify-center rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            Generate & Download
          </button>
        </div>
      </div>
    </div>
  );
}
