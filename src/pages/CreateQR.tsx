import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/context";
import { AdService } from "../components/AdSense";

export default function CreateQR() {
  const navigate = useNavigate();
  const { addToHistory } = useAppContext();
  const [content, setContent] = useState("https://example.com");

  const saveToHistory = () => {
    AdService.showInterstitial(() => {
        addToHistory({
          id: Date.now().toString(),
          type: "url",
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
        <h1 className="ml-2 text-xl font-semibold text-gray-800">Create QR Code</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Preview Card */}
        <div className="mb-8 flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
          <div className="rounded-xl border-4 border-gray-50 p-2 bg-white flex items-center justify-center">
            <QRCodeSVG 
              value={content || " "} 
              size={200} 
              level="H"
              includeMargin={false}
              fgColor="#1f2937"
            />
          </div>
          <p className="mt-6 text-sm text-gray-500 font-medium break-all text-center max-w-xs w-full">
            {content || "Enter data below"}
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Content Data</label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
              placeholder="Enter URL, Wi-Fi info, or text..."
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
