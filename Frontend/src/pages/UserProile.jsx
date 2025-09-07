import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DocumentService from "../Appwrite/CreateDocument";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("history");
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({});
  const userDetail = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const findAppointments = async () => {
      if (userDetail?.$id) {
        const res = await DocumentService.getUserAppointments(userDetail.$id);
        const doctorid = await DocumentService.getDoctorIdDetails(res?.documents[0].doctorId);
        setDoctor(doctorid);
        setAppointments(res?.documents || []);
      }
    };
    findAppointments();
  }, [userDetail]);

  // Helper to get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 text-gray-800 font-sans">
      <header className="bg-gradient-to-br from-blue-700 to-green-500 p-10 text-center text-white shadow-lg">
        <h1 className="text-3xl text-white md:text-4xl font-bold tracking-wide mb-4">RU-MEDIC User Profile</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center gap-8 border border-blue-100">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white text-5xl font-extrabold shadow-lg border-4 border-white">
            {getInitials(userDetail?.name)}
          </div>
          <div className="flex flex-col text-center sm:text-left gap-1">
            <h2 className="text-blue-700 text-2xl font-bold">{userDetail?.name || "User Name"}</h2>
            <p className="text-gray-600 text-sm mt-1">
              <span className="font-semibold">Email:</span> {userDetail?.email || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Phone:</span> {userDetail?.phone || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Gender:</span> {userDetail?.gender || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Age:</span> {userDetail?.age || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Address:</span> {userDetail?.address || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Patient ID:</span> {userDetail?.$id || "N/A"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm ${
              activeTab === "history"
                ? "bg-blue-600 text-white scale-105"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
            aria-selected={activeTab === "history"}
            role="tab"
            id="tab-history"
            aria-controls="panel-history"
          >
            📜 History
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm ${
              activeTab === "orders"
                ? "bg-green-600 text-white scale-105"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
            aria-selected={activeTab === "orders"}
            role="tab"
            id="tab-orders"
            aria-controls="panel-orders"
          >
            🛒 Orders
          </button>
        </div>

        {/* Tab Panels */}
        <section
          id="panel-history"
          role="tabpanel"
          aria-labelledby="tab-history"
          hidden={activeTab !== "history"}
          className="mt-8"
        >
          <div className="relative border-l-4 border-blue-200 pl-6 space-y-6">
            {appointments.length === 0 ? (
              <div className="text-gray-400 text-center">No appointment history found.</div>
            ) : (
              appointments.map((appt) => (
                <article
                  key={appt.$id}
                  className="relative bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-blue-700 font-semibold text-lg">
                    {appt.symptoms || "Appointment"}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="font-semibold">Date:</span> {formatDate(appt.date)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Time:</span> {appt.time}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Status:</span> {appt.status}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Doctor Name:</span> {doctor.name}
                  </p>
                  <span className="absolute -left-7 top-5 w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                </article>
              ))
            )}
          </div>
        </section>

        <section
          id="panel-orders"
          role="tabpanel"
          aria-labelledby="tab-orders"
          hidden={activeTab !== "orders"}
          className="mt-8 space-y-4"
        >
          <div className="flex justify-between items-center p-5 border border-gray-100 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
            <div>
              <strong className="block text-gray-900">Paracetamol</strong>
              <small className="text-gray-500">Ordered: 02 Feb 2025</small>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-green-700 bg-green-100 font-semibold text-xs">
              ✅ Delivered
            </span>
          </div>
          <div className="flex justify-between items-center p-5 border border-gray-100 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
            <div>
              <strong className="block text-gray-900">Vitamin B Complex</strong>
              <small className="text-gray-500">Ordered: 20 Jan 2025</small>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-yellow-700 bg-yellow-100 font-semibold text-xs">
              ⏳ Pending
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}