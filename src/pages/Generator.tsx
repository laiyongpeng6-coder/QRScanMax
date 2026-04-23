import React, { useState } from "react";
import { QrCode, Wand2, Barcode, Crown, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

const TABS = ["Hot", "Social", "Business", "AI Art"];

const TEMPLATES = [
  { id: 1, type: "AI Art", premium: true, img: "https://picsum.photos/seed/cyberpunk/400/400" },
  { id: 2, type: "Hot", premium: false, img: "https://picsum.photos/seed/minimal/400/400" },
  { id: 3, type: "Social", premium: false, img: "https://picsum.photos/seed/social/400/400" },
  { id: 4, type: "Business", premium: true, img: "https://picsum.photos/seed/business/400/400" },
  { id: 5, type: "AI Art", premium: true, img: "https://picsum.photos/seed/anime/400/400" },
  { id: 6, type: "Business", premium: false, img: "https://picsum.photos/seed/card/400/400" },
];

import { AdService } from "../components/AdSense";

export default function Generator() {
  const [activeTab, setActiveTab] = useState("Hot");
  const navigate = useNavigate();

  const handleTemplateClick = (t: any) => {
    if (t.premium) {
      AdService.showRewarded(() => {
        navigate("/app/generator/beautify", { state: { template: t } });
      });
    } else {
      navigate("/app/generator/beautify", { state: { template: t } });
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 p-4 pt-10 text-gray-800 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Generator</h1>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 font-medium">Free with Ads</span>
        </div>
      </div>

      {/* Gold Actions (King Kong Area) */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center gap-2">
          <button onClick={() => navigate("/app/generator/create-qr")} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-gray-200 text-blue-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            <QrCode className="h-7 w-7" strokeWidth={2} />
          </button>
          <span className="text-xs font-medium text-gray-600">Create QR</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button onClick={() => navigate("/app/generator/beautify")} className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 shadow-sm transition-all hover:bg-blue-100 active:scale-95">
            <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-yellow-500 drop-shadow-sm" />
            <Wand2 className="h-7 w-7" strokeWidth={2} />
          </button>
          <span className="text-xs font-semibold text-blue-600">Beautify</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button onClick={() => navigate("/app/generator/create-barcode")} className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-gray-200 text-blue-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            <Barcode className="h-7 w-7" strokeWidth={2} />
          </button>
          <span className="text-xs font-medium text-gray-600">Create Barcode</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide py-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "whitespace-nowrap rounded-lg px-5 py-2 text-sm font-medium transition-all",
              activeTab === tab
                ? "bg-white text-blue-600 border border-gray-200 shadow-sm"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-2 gap-4 pb-[80px]">
        {TEMPLATES.filter(t => activeTab === "Hot" || t.type === activeTab).map((t) => (
          <div key={t.id} onClick={() => handleTemplateClick(t)} className="group relative aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm cursor-pointer">
            <img 
              src={t.img} 
              alt="Template" 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-80" />
            
            {t.premium && (
              <div className="absolute right-2 top-2 flex px-2 py-1 items-center justify-center rounded-lg bg-black/50 backdrop-blur-md shadow-sm border border-white/20">
                <div className="w-2 h-2 rounded-sm bg-red-500 mr-1 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Ad to Unlock</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white shadow-sm truncate">
              {t.type} Style
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
