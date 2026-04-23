import React from "react";
import { cn } from "../lib/utils";

export const MockNativeAd = ({ className }: { className?: string }) => (
  <div className={cn("rounded-2xl border border-gray-200 bg-white p-3 shadow-sm flex flex-col", className)}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">Ad</span>
      <span className="text-[10px] text-gray-400">Sponsored</span>
    </div>
    <div className="flex gap-3 items-center">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex-shrink-0 flex items-center justify-center">
        <span className="text-xl">🛍️</span>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">Best Shopping App</h4>
        <p className="text-xs text-gray-500 line-clamp-1">Huge discounts today!</p>
      </div>
      <button className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm">
        Install
      </button>
    </div>
  </div>
);

// Ad Services Simulators
export const AdService = {
  showRewarded: (onSuccess: () => void) => {
    // In a real app, this would call AdMob/AppLovin SDK
    const confirmed = window.confirm("🎬 Watch a short video to unlock this premium feature?");
    if (confirmed) {
      setTimeout(() => {
        alert("✅ Reward granted! Item unlocked.");
        onSuccess();
      }, 800);
    }
  },
  
  showInterstitial: (onSuccess: () => void) => {
    // Simulates an interstitial loading before completing an action
    console.log("📊 Pre-loading interstitial ad...");
    setTimeout(() => {
      onSuccess(); // We just pass through after a tiny delay for UX demo
    }, 300);
  }
};
