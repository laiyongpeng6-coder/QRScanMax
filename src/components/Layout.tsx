import React from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Scan, History, QrCode } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-800 overflow-hidden max-w-md mx-auto relative font-sans shadow-xl shadow-gray-200/50">
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-32 scrollbar-hide">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 w-full border-t border-gray-200 bg-white pb-safe pt-2 px-6 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between pb-4 relative">
          
          {/* History Tab */}
          <NavLink
            to="/app/history"
            className={({ isActive }) => cn(
              "flex flex-col items-center p-2 text-xs font-semibold transition-colors duration-200 w-1/3",
              location.pathname.startsWith("/app/history") ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <History className={cn("mb-1.5 h-6 w-6 pointer-events-none focus:outline-none", location.pathname.startsWith("/app/history") && "stroke-[2.5px]")} />
            <span>History</span>
          </NavLink>

          {/* Center Big Scan Button */}
          <div className="relative w-1/3 flex justify-center">
            <button
              onClick={() => navigate("/app/scanner")}
              className="absolute -top-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200/50 border-[4px] border-white transition-transform hover:scale-105 active:scale-95 z-20"
            >
              <Scan className="h-8 w-8 !stroke-[2px]" />
            </button>
            <span className={cn(
              "absolute top-8 text-xs font-semibold transition-colors duration-200",
              location.pathname.startsWith("/app/scanner") ? "text-blue-600" : "text-gray-400"
            )}>
              Scan
            </span>
          </div>

          {/* Generator Tab */}
          <NavLink
            to="/app/generator"
            className={({ isActive }) => cn(
              "flex flex-col items-center p-2 text-xs font-semibold transition-colors duration-200 w-1/3",
              location.pathname.startsWith("/app/generator") ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <QrCode className={cn("mb-1.5 h-6 w-6 pointer-events-none focus:outline-none", location.pathname.startsWith("/app/generator") && "stroke-[2.5px]")} />
            <span>Generate</span>
          </NavLink>
          
        </div>
      </nav>
    </div>
  );
}
