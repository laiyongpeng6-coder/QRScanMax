import React from "react";
import { History as HistoryIcon, Search } from "lucide-react";
import { useAppContext } from "../lib/context";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { MockNativeAd } from "../components/AdSense";

export default function History() {
  const { history } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-gray-50 p-4 pt-10 text-gray-800 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Scan History</h1>
        <p className="text-sm text-gray-500">Your recent scans and creations</p>
      </div>

      <div className="flex-1 space-y-3 pb-[80px] overflow-y-auto hidden-scrollbar">
        {history.length === 0 ? (
          <div className="flex mt-20 flex-col items-center justify-center text-gray-400">
            <HistoryIcon className="mb-4 h-12 w-12 opacity-50" />
            <p className="font-medium text-sm">No history yet.</p>
          </div>
        ) : (
          history.map((item, idx) => {
            const showAd = idx > 0 && idx % 4 === 0;

            return (
              <React.Fragment key={item.id}>
                {showAd && <MockNativeAd className="my-4" />}
                <div
                  onClick={() => navigate(`/app/result/${item.id}`)}
                  className="relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors shadow-sm border-gray-200 bg-white hover:bg-gray-50 hover:shadow-md"
                >
                  <div className="flex w-full flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold uppercase text-blue-600">{item.type}</span>
                      <span className="text-xs font-medium text-gray-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="truncate font-medium text-gray-800 text-sm">
                      {item.content}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
}
