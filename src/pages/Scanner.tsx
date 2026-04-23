import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { Flashlight, Image as ImageIcon, HelpCircle, Settings as SettingsIcon, ZoomIn, ZoomOut } from "lucide-react";
import { useAppContext } from "../lib/context";
import { parseQRCodeData } from "../lib/qr-parser";
import { cn } from "../lib/utils";

export default function Scanner() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addToHistory } = useAppContext();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const scanDelay = 500;

  const handleScan = useCallback(() => {
    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (video?.readyState === video?.HAVE_ENOUGH_DATA && context) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

          if (code) {
          const parsed = parseQRCodeData(code.data);
          const newItem = {
            id: Date.now().toString(),
            type: parsed.type,
            content: code.data,
            timestamp: Date.now(),
            details: parsed.details
          };
          addToHistory(newItem);
          navigate(`/app/result/${newItem.id}`, { state: { item: newItem } });
          return; // Stop scanning once found
        }
      }
    }
    setTimeout(handleScan, scanDelay);
  }, [addToHistory, navigate]);

  useEffect(() => {
    handleScan();
  }, [handleScan]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        if (!context) return;
        
        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          const parsed = parseQRCodeData(code.data);
          const newItem = {
            id: Date.now().toString(),
            type: parsed.type,
            content: code.data,
            timestamp: Date.now(),
            details: parsed.details
          };
          addToHistory(newItem);
          navigate(`/app/result/${newItem.id}`, { state: { item: newItem } });
        } else {
          alert("No QR code found in the image.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      {/* Hidden Canvas parsing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Bar */}
      <div className="absolute top-0 z-20 flex w-full items-center justify-between p-4 pt-safe-top bg-white/90 backdrop-blur border-b border-gray-200">
        <button onClick={() => navigate("/app/settings")} className="rounded-full bg-gray-100 p-2 text-gray-500 hover:text-gray-800 transition-colors">
          <SettingsIcon className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-gray-800 tracking-wide">Point at a barcode</span>
        <button className="rounded-full bg-gray-100 p-2 text-gray-500 hover:text-gray-800 transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Camera Feed */}
      <div className="relative flex-1 overflow-hidden" 
           style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform 0.2s" }}>
        {/* @ts-expect-error react-webcam missing optional typings in this specific tsconfig context */}
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={{ facingMode: "environment" }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/10 mix-blend-multiply" />
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Scanning Box */}
        <div className="relative h-64 w-64">
          <div className="absolute inset-0 border border-white/60 rounded-3xl" />
          {/* Animated Scanning Line */}
          <div className="absolute left-0 top-0 h-0.5 w-full bg-blue-500 shadow-sm animate-[scan_2.5s_ease-in-out_infinite]" />
          
          {/* Corner Markers */}
          <div className="absolute -left-1 -top-1 h-8 w-8 border-l-4 border-t-4 border-blue-500 rounded-tl-2xl" />
          <div className="absolute -right-1 -top-1 h-8 w-8 border-r-4 border-t-4 border-blue-500 rounded-tr-2xl" />
          <div className="absolute -bottom-1 -left-1 h-8 w-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
          <div className="absolute -bottom-1 -right-1 h-8 w-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
        </div>
      </div>

      {/* Tools sidebar & Zoom */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center space-y-4 bg-white/90 p-2 rounded-full backdrop-blur shadow-sm border border-gray-200">
        <button onClick={() => setZoom(Math.min(zoom + 0.5, 3))} className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors">
          <ZoomIn className="h-5 w-5" />
        </button>
        <div className="w-1 h-24 bg-gray-200 rounded-full relative">
           <div className="absolute bottom-0 w-full bg-blue-600 rounded-full" style={{ height: `${(zoom - 1) * 50}%` }} />
        </div>
        <button onClick={() => setZoom(Math.max(zoom - 0.5, 1))} className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors">
          <ZoomOut className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-28 left-0 right-0 z-20 flex justify-center space-x-12">
        <button 
          onClick={() => setIsFlashOn(!isFlashOn)}
          className={cn(
            "flex h-14 w-14 flex-col items-center justify-center rounded-full backdrop-blur transition-all shadow-sm border",
            isFlashOn ? "bg-blue-600 text-white border-blue-600" : "bg-white/90 text-gray-600 border-gray-200 hover:bg-white"
          )}
        >
          <Flashlight className="h-6 w-6" />
        </button>

        <label className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full bg-white/90 text-gray-600 backdrop-blur shadow-sm border border-gray-200 transition-all hover:bg-white">
          <ImageIcon className="h-6 w-6" />
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>
    </div>
  );
}
