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
    <div className="min-h-screen bg-[#fafcfb] text-[#222] font-sans">
      <header className="bg-white border-b border-[#e0ece7] p-6 flex items-center justify-between shadow-none">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path fill="#16a085" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="text-2xl font-bold text-[#222] tracking-tight">Medcare.</span>
        </div>
        <nav className="hidden md:flex gap-8 text-[#222] font-medium text-lg">
          <a href="#" className="hover:text-[#16a085]">Home</a>
          <a href="#" className="hover:text-[#16a085]">Services</a>
          <a href="#" className="hover:text-[#16a085]">About</a>
          <a href="#" className="hover:text-[#16a085]">Doctors</a>
          <a href="#" className="hover:text-[#16a085]">Book</a>
          <a href="#" className="hover:text-[#16a085]">Review</a>
          <a href="#" className="hover:text-[#16a085]">Blogs</a>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow border border-[#16a085] p-8 flex flex-col sm:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-[#e0ece7] flex items-center justify-center text-[#16a085] text-5xl font-extrabold shadow border-4 border-white">
            {getInitials(userDetail?.name)}
          </div>
          <div className="flex flex-col text-center sm:text-left gap-1">
            <h2 className="text-[#16a085] text-2xl font-bold">{userDetail?.name || "User Name"}</h2>
            <p className="text-[#222] text-sm mt-1">
              <span className="font-semibold">Email:</span> {userDetail?.email || "N/A"}
            </p>
            <p className="text-[#222] text-sm">
              <span className="font-semibold">Phone:</span> {userDetail?.phone || "N/A"}
            </p>
            <p className="text-[#222] text-sm">
              <span className="font-semibold">Gender:</span> {userDetail?.gender || "N/A"}
            </p>
            <p className="text-[#222] text-sm">
              <span className="font-semibold">Age:</span> {userDetail?.age || "N/A"}
            </p>
            <p className="text-[#222] text-sm">
              <span className="font-semibold">Address:</span> {userDetail?.address || "N/A"}
            </p>
            <p className="text-[#222] text-sm">
              <span className="font-semibold">Patient ID:</span> {userDetail?.$id || "N/A"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all duration-300 shadow-none ${
              activeTab === "history"
                ? "bg-[#16a085] text-white border-[#16a085]"
                : "bg-white text-[#16a085] border-[#16a085] hover:bg-[#e0ece7]"
            }`}
            aria-selected={activeTab === "history"}
            role="tab"
            id="tab-history"
            aria-controls="panel-history"
          >
            History
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all duration-300 shadow-none ${
              activeTab === "orders"
                ? "bg-[#16a085] text-white border-[#16a085]"
                : "bg-white text-[#16a085] border-[#16a085] hover:bg-[#e0ece7]"
            }`}
            aria-selected={activeTab === "orders"}
            role="tab"
            id="tab-orders"
            aria-controls="panel-orders"
          >
            Orders
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
          <div className="grid gap-6">
            {appointments.length === 0 ? (
              <div className="text-[#aaa] text-center">No appointment history found.</div>
            ) : (
              appointments.map((appt) => (
                <article
                  key={appt.$id}
                  className="bg-white p-6 rounded-xl shadow border border-[#16a085] hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-[#16a085] font-semibold text-lg">
                    {appt.symptoms || "Appointment"}
                  </h4>
                  <p className="text-[#222] text-sm mt-1">
                    <span className="font-semibold">Date:</span> {formatDate(appt.date)}
                  </p>
                  <p className="text-[#222] text-sm">
                    <span className="font-semibold">Time:</span> {appt.time}
                  </p>
                  <p className="text-[#222] text-sm">
                    <span className="font-semibold">Status:</span> {appt.status}
                  </p>
                  <p className="text-[#222] text-sm">
                    <span className="font-semibold">Doctor Name:</span> {doctor.name}
                  </p>
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
          <div className="flex justify-between items-center p-6 border border-[#16a085] rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
            <div>
              <strong className="block text-[#222]">Paracetamol</strong>
              <small className="text-[#888]">Ordered: 02 Feb 2025</small>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[#16a085] bg-[#e0ece7] font-semibold text-xs border border-[#16a085]">
              Delivered
            </span>
          </div>
          <div className="flex justify-between items-center p-6 border border-[#16a085] rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
            <div>
              <strong className="block text-[#222]">Vitamin B Complex</strong>
              <small className="text-[#888]">Ordered: 20 Jan 2025</small>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[#f39c12] bg-[#fdf6e3] font-semibold text-xs border border-[#f39c12]">
              Pending
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}