import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DocumentService from "../Appwrite/CreateDocument";
import AdminStatsAndTopHospitals from "../components/AdminStatAndTopHospitals"; // Import the new component

const sidebarLinks = [
  { label: "Dashboard", to: "/admin", icon: <span className="text-xl">📊</span> },
  { label: "Users", to: "/admin/users", icon: <span className="text-xl">👤</span> },
  { label: "Doctors", to: "/admin/doctors", icon: <span className="text-xl">🩺</span> },
  { label: "Hospitals", to: "/admin/hospitals", icon: <span className="text-xl">🏥</span> },
];

export default function Admin() {
  const [stats, setStats] = useState([
    { label: "Total Users", value: 0, icon: "👤", color: "bg-blue-100 text-blue-600" },
    { label: "Total Doctors", value: 0, icon: "🩺", color: "bg-green-100 text-green-600" },
    { label: "Total Hospitals", value: 0, icon: "🏥", color: "bg-purple-100 text-purple-600" },
  ]);
  const [topHospitals, setTopHospitals] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);

  useEffect(() => {
    const alldetails = async () => {
      const userDetails = await DocumentService.getAllUser();
      const totalUsers = userDetails.documents.length;
      const doctorCount = userDetails.documents.filter(
        (user) => user.role === "doctor"
      ).length;

      const hospitalCount = await DocumentService.getAllHospital();
      setAllHospitals(hospitalCount.documents || []);

      const hospitalDetails = hospitalCount.documents.length;

      setStats([
        { label: "Total Users", value: totalUsers, icon: "👤", color: "bg-blue-100 text-blue-600" },
        { label: "Total Doctors", value: doctorCount, icon: "🩺", color: "bg-green-100 text-green-600" },
        { label: "Total Hospitals", value: hospitalDetails, icon: "🏥", color: "bg-purple-100 text-purple-600" },
      ]);
      // Show only first 3 hospitals for now
      setTopHospitals(hospitalCount.documents.slice(0, 3));
    };
    alldetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="flex items-center justify-center md:justify-start h-20 px-4 border-b">
          <span className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight">
            RU
            <span className="text-green-600">-MEDIC</span>
          </span>
        </div>
        <nav className="flex-1 flex flex-col gap-2 mt-6 px-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              {link.icon}
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          ))}
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 mt-auto transition"
            onClick={() => {/* handle logout */}}
          >
            <span className="text-xl">🚪</span>
            <span className="hidden md:inline">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 h-20 border-b bg-white">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-600 font-medium">Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-200"
            />
          </div>
        </header>

        {/* Dashboard Content or Nested Route */}
        <main className="flex-1 p-4 md:p-8 bg-transparent">
          <Outlet context={{ stats, topHospitals, allHospitals }} />
        </main>
      </div>
    </div>
  );
}