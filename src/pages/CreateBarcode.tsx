import React, { useState } from "react";
import Barcode from "react-barcode";
import { ChevronLeft, Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/context";
import { AdService } from "../components/AdSense";

export default function CreateBarcode() {
  const navigate = useNavigate();
  const { addToHistory } = useAppContext();
  const [content, setContent] = useState("123456789012");

  const saveToHistory = () => {
    AdService.showInterstitial(() => {
        addToHistory({
          id: Date.now().toString(),
          type: "barcode",
          content,
          timestamp: Date.now(),
        });
        alert("Saved to history!");
    });
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 pt-8 text-gray-800 font-sans">
      <div className="flex items-center mb-6 px-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="ml-2 text-xl font-semibold text-gray-800">Create Barcode</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Preview Card */}
        <div className="mb-8 flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm border border-gray-200 min-h-[220px] overflow-hidden">
          {content.trim() ? (
            <div className="w-full flex justify-center overflow-x-auto overflow-y-hidden pl-4 pr-4">
               {/* @ts-expect-error react-barcode types issue */}
               <Barcode value={content} width={2} height={80} displayValue={true} />
            </div>
          ) : (
             <p className="text-gray-400 font-medium">Enter a numerical ID below</p>
          )}
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Barcode Identity</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-800 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="e.g. 1234567890"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button onClick={saveToHistory} className="col-span-2 flex items-center justify-center rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
            Generate & Save
          </button>
          <button className="flex items-center justify-center rounded-xl bg-gray-100 border border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <Download className="mr-2 h-4 w-4" /> Download
          </button>
          <button className="flex items-center justify-center rounded-xl bg-gray-100 border border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
