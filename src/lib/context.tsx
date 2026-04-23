import React, { createContext, useContext, useState, useEffect } from "react";

interface ScannedItem {
  id: string;
  type: string;
  content: string;
  timestamp: number;
  details?: any;
}

interface AppContextType {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (val: boolean) => void;
  history: ScannedItem[];
  addToHistory: (item: ScannedItem) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [history, setHistory] = useState<ScannedItem[]>([]);

  useEffect(() => {
    // Load from local storage if available in a real app, skipped here for simplicity
  }, []);

  const addToHistory = (item: ScannedItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <AppContext.Provider value={{ hasSeenOnboarding, setHasSeenOnboarding, history, addToHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
