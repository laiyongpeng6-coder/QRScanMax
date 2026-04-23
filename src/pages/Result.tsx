import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link, MapPin, Search, Copy, Share2, Globe, ShoppingCart, Wifi, FileText, ChevronLeft, ArrowRight, Sparkles, User, Calendar } from "lucide-react";
import { useAppContext } from "../lib/context";
import { MockNativeAd } from "../components/AdSense";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const stateItem = location.state?.item;
  const { history } = useAppContext();
  const item = stateItem || history.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex h-full items-center justify-center text-gray-800">
        Item not found.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(item.content);
    alert("Copied to clipboard!");
  };

  const getIcon = () => {
    switch (item.type) {
      case "url":
      case "social": return <Globe className="h-8 w-8 text-blue-500" />;
      case "barcode":
      case "isbn":
      case "upc": return <ShoppingCart className="h-8 w-8 text-purple-500" />;
      case "wifi": return <Wifi className="h-8 w-8 text-green-500" />;
      case "vcard": return <User className="h-8 w-8 text-indigo-500" />;
      case "event": return <Calendar className="h-8 w-8 text-pink-500" />;
      case "geo": return <MapPin className="h-8 w-8 text-red-500" />;
      case "text": 
      default: return <FileText className="h-8 w-8 text-gray-400" />;
    }
  };

  const handleOpen = () => {
    if (item.type === "url" || item.type === "social") {
      window.open(item.content, "_blank");
    } else if (item.type === "geo" && item.details?.lat && item.details?.lng) {
      window.open(`https://maps.google.com/?q=${item.details.lat},${item.details.lng}`, "_blank");
    } else if (item.type === "barcode" || item.type === "isbn" || item.type === "upc") {
       window.open(`https://www.google.com/search?tbm=shop&q=${item.content}`, "_blank");
    } else if (item.type === "wifi") {
      alert(`WIFI Name: ${item.details?.ssid}\nPassword: ${item.details?.password}\n\n(In a real app, this would trigger device connect API)`);
    } else {
      alert(`Simulated App Action for type: ${item.type}`);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 p-4 pt-8 text-gray-800 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="ml-2 text-xl font-semibold text-gray-800">Result</h1>
        </div>
      </div>

      <div className="flex-1 space-y-6 pb-[80px]">
        {/* Main Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex h-16 w-16 items-center flex-shrink-0 justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
               {getIcon()}
            </div>
            <div className="flex-1 overflow-hidden">
               <h2 className="text-xl font-semibold text-gray-800 truncate capitalize">{item.type}</h2>
               <p className="text-sm text-gray-500 truncate mt-1">Scanned today</p>
            </div>
          </div>

          <p className="text-sm font-medium text-gray-800 break-all mb-6">
            {item.content}
          </p>

          {/* Type-specific details */}
          {item.type === "wifi" && item.details && (
            <div className="mt-4 w-full rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4">
              <p className="text-sm font-medium text-gray-800">SSID: {item.details.ssid}</p>
              <p className="text-sm font-medium text-gray-500">Password: {item.details.password || "None"}</p>
            </div>
          )}
          {item.type === "vcard" && item.details && (
            <div className="mt-4 w-full rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4">
              <p className="text-sm font-medium text-gray-800">Name: {item.details.name}</p>
              <p className="text-sm font-medium text-gray-500">Org: {item.details.org}</p>
              <p className="text-sm font-medium text-gray-500">Tel: {item.details.tel}</p>
            </div>
          )}
           {item.type === "geo" && item.details && (
             <div className="mt-4 w-full rounded-xl bg-gray-50 border border-gray-100 p-4 mb-4">
               <p className="text-sm font-medium text-gray-800">Lat: {item.details.lat}</p>
               <p className="text-sm font-medium text-gray-800">Lng: {item.details.lng}</p>
             </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button onClick={handleOpen} className="col-span-2 flex items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
              Take Action
            </button>
            <button onClick={handleCopy} className="flex items-center justify-center rounded-xl bg-gray-100 border border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <Copy className="mr-2 h-4 w-4" /> Copy
            </button>
            <button className="flex items-center justify-center rounded-xl bg-gray-100 border border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* Mock Ad Display directly under core action */}
        <MockNativeAd className="flex-shrink-0" />

        {/* AI Upsell (To Beautify Workspace) */}
        {(item.type === "url" || item.type === "social" || item.type === "text") && (
          <div className="relative overflow-hidden rounded-2xl bg-blue-50 border border-blue-200 shadow-sm p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="flex items-center text-sm font-bold text-blue-600">
                <Sparkles className="mr-1 h-4 w-4" /> Beautify Workspace
              </span>
              <span className="mt-1 text-xs text-gray-500 font-medium">Add Logos, Colors & Style</span>
            </div>
            <button onClick={() => navigate("/app/generator/beautify")} className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
              Open
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
