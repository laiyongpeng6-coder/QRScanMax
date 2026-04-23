import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ScanLine, Barcode, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useAppContext } from "../lib/context";

const PAGES = [
  {
    id: 1,
    title: "Scan QR Codes",
    subtitle: "Instantly scan and decipher QR codes. Connect to Wi-Fi, open links, and save contacts.",
    icon: <ScanLine className="h-16 w-16 text-blue-600" strokeWidth={1.5} />,
    color: "bg-blue-50 border border-blue-100",
  },
  {
    id: 2,
    title: "Barcode Product Info",
    subtitle: "Scan product barcodes in seconds to instantly retrieve details and search shopping links.",
    icon: <Barcode className="h-16 w-16 text-green-600" strokeWidth={1.5} />,
    color: "bg-green-50 border border-green-100",
  },
  {
    id: 3,
    title: "Generate & Beautify",
    subtitle: "Create your own QR codes and transform them into beautiful gradients with unique icons.",
    icon: <Sparkles className="h-16 w-16 text-pink-600" strokeWidth={1.5} />,
    color: "bg-pink-50 border border-pink-100",
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setHasSeenOnboarding } = useAppContext();

  const handleNext = () => {
    if (step === PAGES.length - 1) {
      setHasSeenOnboarding(true);
      navigate("/app/scanner");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-800 overflow-hidden font-sans">
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Visual Header */}
            <div className={cn("relative mb-12 flex h-56 w-56 items-center justify-center rounded-full shadow-sm", PAGES[step].color)}>
              <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100">
                {PAGES[step].icon}
              </div>
            </div>

            <h2 className="text-3xl font-semibold mb-4 text-gray-800">{PAGES[step].title}</h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
              {PAGES[step].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center pb-12 pt-4 px-6 z-10 w-full max-w-md mx-auto">
        {/* Pagination Dots */}
        <div className="flex gap-2 mb-8">
          {PAGES.map((_, i) => (
            <div
              key={i}
              className={cn("h-1.5 rounded-full transition-all duration-300", i === step ? "w-8 bg-blue-600" : "w-2 bg-gray-200")}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <span className="relative z-10">{step === PAGES.length - 1 ? "Start Scanning" : "Continue"}</span>
          <ChevronRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-6 text-xs text-gray-400 font-medium">
          By continuing, you agree to our <a href="#" className="underline text-gray-500 hover:text-gray-800">Terms</a> and <a href="#" className="underline text-gray-500 hover:text-gray-800">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
