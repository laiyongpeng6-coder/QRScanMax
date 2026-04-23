import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-gray-800 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10"
      >
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
          <QrCode className="h-12 w-12 text-white" strokeWidth={2} />
          {/* Shimmer effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 z-20 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
          />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-800 mb-2">
          QR Vision <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">Smart Scanner & Generator</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center w-32"
      >
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
