import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AuctionResults from "./pages/AuctionResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />

        <Route path="/results" element={<AuctionResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
