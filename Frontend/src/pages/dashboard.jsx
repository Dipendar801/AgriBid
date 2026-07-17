import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import CropForm from "../components/CropForm";
import CropList from "../components/CropList";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [crops, setCrops] = useState([]);

  const token = localStorage.getItem("token");

  const fetchMyCrops = async () => {
    try {
      const res = await api.get("/crops/my-crops", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCrops(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyCrops();

    const interval = setInterval(() => {
      fetchMyCrops();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Welcome Section */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back,
            <span className="text-green-700"> {user?.fullName}</span>
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage your crops, start auctions, and monitor your farming
            activities from one place.
          </p>
        </div>

        {/* Statistics */}

        <StatsCards crops={crops} />

        {/* Add Crop */}

        <div className="mt-10">
          <CropForm fetchMyCrops={fetchMyCrops} />
        </div>

        {/* Crop List */}

        <div className="mt-12">
          <CropList crops={crops} fetchMyCrops={fetchMyCrops} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
