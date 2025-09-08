import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DocumentService from "../Appwrite/CreateDocument";
import AdminStatsAndTopHospitals from "../components/AdminStatAndTopHospitals";

const sidebarLinks = [
  { label: "Dashboard", to: "/admin", icon: <span className="text-xl">📊</span> },
  { label: "Users", to: "/admin/users", icon: <span className="text-xl">👤</span> },
  { label: "Doctors", to: "/admin/doctors", icon: <span className="text-xl">🩺</span> },
  { label: "Hospitals", to: "/admin/hospitals", icon: <span className="text-xl">🏥</span> },
];

export default function Admin() {
  const [stats, setStats] = useState([
    { label: "Total Users", value: 0, icon: "👤", color: "bg-teal-50 text-teal-600" },
    { label: "Total Doctors", value: 0, icon: "🩺", color: "bg-teal-50 text-teal-600" },
    { label: "Total Hospitals", value: 0, icon: "🏥", color: "bg-teal-50 text-teal-600" },
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
        { label: "Total Users", value: totalUsers, icon: "👤", color: "bg-teal-50 text-teal-600" },
        { label: "Total Doctors", value: doctorCount, icon: "🩺", color: "bg-teal-50 text-teal-600" },
        { label: "Total Hospitals", value: hospitalDetails, icon: "🏥", color: "bg-teal-50 text-teal-600" },
      ]);
      setTopHospitals(hospitalCount.documents.slice(0, 3));
    };
    alldetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r-2 border-teal-100 shadow-sm flex flex-col">
        <div className="flex items-center justify-center md:justify-start h-20 px-4 border-b-2 border-teal-100">
          <span className="text-2xl md:text-3xl font-extrabold text-teal-700 tracking-tight">
            Medcare.
          </span>
        </div>
        <nav className="flex-1 flex flex-col gap-2 mt-6 px-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 border-2 border-transparent hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 transition"
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
        <header className="flex items-center justify-between px-4 md:px-8 h-20 border-b-2 border-teal-100 bg-white">
          <h1 className="text-xl md:text-2xl font-bold text-teal-700">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-600 font-medium">Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=14b8a6&color=fff"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-teal-200"
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