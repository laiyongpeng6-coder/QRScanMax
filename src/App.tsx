import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./lib/context";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Layout from "./components/Layout";
import Scanner from "./pages/Scanner";
import Generator from "./pages/Generator";
import CreateQR from "./pages/CreateQR";
import CreateBarcode from "./pages/CreateBarcode";
import Beautify from "./pages/Beautify";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Result from "./pages/Result";

function AppRoutes() {
  const { hasSeenOnboarding } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />
      
      {/* App Main Layout */}
      <Route path="/app" element={hasSeenOnboarding ? <Layout /> : <Navigate to="/onboarding" />}>
        <Route path="scanner" element={<Scanner />} />
        
        {/* Generator sub-routes */}
        <Route path="generator">
          <Route index element={<Generator />} />
          <Route path="create-qr" element={<CreateQR />} />
          <Route path="create-barcode" element={<CreateBarcode />} />
          <Route path="beautify" element={<Beautify />} />
        </Route>

        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
        <Route path="result/:id" element={<Result />} />
        <Route index element={<Navigate to="scanner" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
