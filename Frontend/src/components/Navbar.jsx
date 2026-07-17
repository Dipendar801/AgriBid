import { useNavigate } from "react-router-dom";
import { FaLeaf, FaUserCircle, FaSignOutAlt, FaTrophy } from "react-icons/fa";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="bg-green-700 p-3 rounded-full text-white text-xl">
            <FaLeaf />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-green-700">
              AgriBid
            </h1>

            <p className="text-gray-500 text-sm">
              Smart Agriculture Bidding Platform
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-6">

          <button
            onClick={() => navigate("/results")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
          >
            <FaTrophy />
            Results
          </button>

          <div className="flex items-center gap-3">

            <FaUserCircle
              className="text-green-700"
              size={42}
            />

            <div>

              <h2 className="font-bold text-gray-800">
                {user?.fullName}
              </h2>

              <p className="text-sm text-gray-500 capitalize">
                {user?.role}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;