import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentService from "../Appwrite/CreateDocument";

const sections = [
  { id: "doctors", label: "Doctors", icon: "👨‍⚕" },
  { id: "patients", label: "Patients", icon: "🏥" },
  { id: "medicines", label: "Medicines", icon: "💊" },
  { id: "appointments", label: "Appointments", icon: "📅" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const HospitalDashboard = () => {
  const [activeSection, setActiveSection] = useState("doctors");
  const [doctors,setDoctors] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const hospitalState = useSelector((state) => state.hospital);
  // If using redux-persist, hospitalState may be {hospital: {...}, ...}
  const hospital = hospitalState?.hospital || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!hospital) {
      navigate("/login");
    }
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    const fetchDoctors = async (doctorIds) => {
      if (doctorIds && doctorIds.length > 0) {
        // Fetch all doctor details in parallel
        const doctorDetails = await Promise.all(
          doctorIds.map((docId) => DocumentService.getDoctorIdDetails(docId))
        );
        setDoctors(doctorDetails);
      } else {
        setDoctors([]); // Clear if no doctors
      }
    };

    fetchDoctors(hospital.doctors);
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [hospital, navigate]);

  // Placeholder handlers for add buttons
  const addDoctor = () =>{
    navigate("/doctsignup");
  };
  const addPatient = () => alert("Add Patient clicked");
  const addMedicine = () => alert("Add Medicine clicked");
  const addAppointment = () => alert("Add Appointment clicked");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] text-white shadow-lg overflow-y-auto z-20">
        <div className="p-5 border-b border-white/20 text-center">
          <h2 className="text-2xl font-bold mb-1">🏥 {hospital.name || "HMS"}</h2>
          <p className="text-sm opacity-80">Hospital Management System</p>
        </div>
        <nav className="mt-5">
          {sections.map(({ id, label, icon }) => (
            <div
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 px-6 py-4 cursor-pointer border-l-4 transition-colors duration-300 ${
                activeSection === id
                  ? "bg-white/20 border-l-[#64b5f6]"
                  : "border-l-transparent hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 md:p-8">
        {/* Hospital Header */}
        <header className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3c72] mb-1 flex items-center gap-2">
              <span>🏥</span> {hospital.name || "Hospital Name"}
            </h1>
            <p className="text-gray-600">
              Reg No: {hospital.uniqueId || hospital.$id || "N/A"}
            </p>
            <p className="text-gray-600">
              Email: {hospital.email || "N/A"}
            </p>
          </div>
          <div className="text-gray-700 mt-4 md:mt-0 text-right">
            <p>📍 {hospital.location || "Location not set"}</p>
            <p>🚑 Emergency: {hospital.contact || "N/A"}</p>
            <p className="mt-1 font-mono">{currentDateTime}</p>
          </div>
        </header>

        {/* Dashboard Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Doctors"
            number={hospital.doctors ? hospital.doctors.length : 0}
            change=""
            borderColor="border-blue-600"
          />
          <StatCard
            title="Departments"
            number={hospital.departments ? hospital.departments.length : 0}
            change={hospital.departments ? hospital.departments.join(", ") : ""}
            borderColor="border-blue-600"
          />
          <StatCard
            title="Beds (Available/Total)"
            number={`${hospital.availableBeds || 0}/${hospital.capacity || 0}`}
            change=""
            borderColor="border-blue-600"
          />
          <StatCard
            title="Pharmacy"
            number={hospital.pharmacy ? "Available" : "Not Available"}
            change=""
            borderColor="border-blue-600"
          />
        </section>

        {/* Sections */}
        <section>
          {activeSection === "doctors" && (
            <ContentPanel
              title="👨‍⚕ Doctors Management"
              onAdd={addDoctor}
              addLabel="+ Add Doctor"
            >
              <DoctorsTable doctors={doctors || []} />
            </ContentPanel>
          )}
          {activeSection === "patients" && (
            <ContentPanel
              title="🏥 Patients Management"
              onAdd={addPatient}
              addLabel="+ Add Patient"
            >
              <PatientsTable />
            </ContentPanel>
          )}
          {activeSection === "medicines" && (
            <ContentPanel
              title="💊 Medicines Management"
              onAdd={addMedicine}
              addLabel="+ Add Medicine"
            >
              <MedicinesTable />
            </ContentPanel>
          )}
          {activeSection === "appointments" && (
            <ContentPanel
              title="📅 Appointments Management"
              onAdd={addAppointment}
              addLabel="+ Schedule Appointment"
            >
              <AppointmentsTable />
            </ContentPanel>
          )}
          {activeSection === "settings" && (
            <ContentPanel title="⚙ Settings">
              <div className="p-6 text-gray-600">
                <div>
                  <strong>Hospital Name:</strong> {hospital.name || "N/A"}
                </div>
                <div>
                  <strong>Unique ID:</strong> {hospital.uniqueId || hospital.$id || "N/A"}
                </div>
                <div>
                  <strong>Email:</strong> {hospital.email || "N/A"}
                </div>
                <div>
                  <strong>Location:</strong> {hospital.location || "N/A"}
                </div>
                <div>
                  <strong>Contact:</strong> {hospital.contact || "N/A"}
                </div>
                <div>
                  <strong>Departments:</strong> {hospital.departments ? hospital.departments.join(", ") : "N/A"}
                </div>
                <div>
                  <strong>Pharmacy:</strong> {hospital.pharmacy ? "Available" : "Not Available"}
                </div>
                <div>
                  <strong>Beds:</strong> {hospital.availableBeds || 0} / {hospital.capacity || 0}
                </div>
              </div>
            </ContentPanel>
          )}
        </section>
      </main>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, number, change, borderColor }) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${borderColor} hover:translate-y-[-5px] transition-transform duration-300`}
  >
    <h3 className="text-gray-600 uppercase tracking-wide text-sm mb-2">{title}</h3>
    <div className="text-4xl font-bold text-[#1e3c72] mb-1">{number}</div>
    {change && <div className="text-green-600 text-sm">{change}</div>}
  </div>
);

// Reusable Content Panel
const ContentPanel = ({ title, onAdd, addLabel, children }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="bg-gradient-to-br from-[#1e3c72] to-[#2a5298] text-white flex items-center p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {onAdd && (
        <button
          onClick={onAdd}
          className="ml-auto bg-green-600 hover:bg-green-700 transition-colors px-5 py-2 rounded-md text-sm font-medium"
          type="button"
        >
          {addLabel}
        </button>
      )}
    </div>
    <div className="p-6 overflow-x-auto">{children}</div>
  </div>
);

// Doctors Table (shows real doctors if available)
const DoctorsTable = ({ doctors }) => (
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-3">Doctor Name</th>
        <th className="px-4 py-3">Speciality</th>
        <th className="px-4 py-3">Status</th>
        <th className="px-4 py-3">Contact</th>
        <th className="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {doctors.length > 0 ? (
        doctors.map((doc, i) => (
          <tr
            key={i}
            className="hover:bg-gray-50 border-b border-gray-200 last:border-none"
          >
            <td className="px-4 py-3">{doc.name || "N/A"}</td>
            <td className="px-4 py-3">{doc.specializations || "N/A"}</td>
            <td className="px-4 py-3">
              <StatusBadge status={doc.status || "available"} />
            </td>
            <td className="px-4 py-3">{doc.contact || "N/A"}</td>
            <td className="px-4 py-3">
              <ActionButtons />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center text-gray-400 py-6">
            No doctors found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

// Patients Table (placeholder)
const PatientsTable = () => (
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-3">Patient ID</th>
        <th className="px-4 py-3">Patient Name</th>
        <th className="px-4 py-3">Age</th>
        <th className="px-4 py-3">Gender</th>
        <th className="px-4 py-3">Condition</th>
        <th className="px-4 py-3">Assigned Doctor</th>
        <th className="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-50 border-b border-gray-200 last:border-none">
        <td className="px-4 py-3">P001</td>
        <td className="px-4 py-3">Ramesh Gupta</td>
        <td className="px-4 py-3">45</td>
        <td className="px-4 py-3">Male</td>
        <td className="px-4 py-3">Hypertension</td>
        <td className="px-4 py-3">Dr. Rajesh Kumar</td>
        <td className="px-4 py-3">
          <ActionButtons />
        </td>
      </tr>
    </tbody>
  </table>
);

// Medicines Table (placeholder)
const MedicinesTable = () => (
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-3">Medicine Name</th>
        <th className="px-4 py-3">Category</th>
        <th className="px-4 py-3">Stock Quantity</th>
        <th className="px-4 py-3">Price</th>
        <th className="px-4 py-3">Expiry Date</th>
        <th className="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-50 border-b border-gray-200 last:border-none">
        <td className="px-4 py-3">Paracetamol</td>
        <td className="px-4 py-3">Pain Relief</td>
        <td className="px-4 py-3">500</td>
        <td className="px-4 py-3">₹5</td>
        <td className="px-4 py-3">Dec 2025</td>
        <td className="px-4 py-3">
          <ActionButtons />
        </td>
      </tr>
    </tbody>
  </table>
);

// Appointments Table (placeholder)
const AppointmentsTable = () => (
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th className="px-4 py-3">Date</th>
        <th className="px-4 py-3">Time</th>
        <th className="px-4 py-3">Patient Name</th>
        <th className="px-4 py-3">Doctor</th>
        <th className="px-4 py-3">Status</th>
        <th className="px-4 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-50 border-b border-gray-200 last:border-none">
        <td className="px-4 py-3">2025-09-07</td>
        <td className="px-4 py-3">10:30 AM</td>
        <td className="px-4 py-3">Ramesh Gupta</td>
        <td className="px-4 py-3">Dr. Rajesh Kumar</td>
        <td className="px-4 py-3">
          <span className="inline-block px-3 py-1 rounded-full text-white bg-green-600 text-xs font-semibold">
            Scheduled
          </span>
        </td>
        <td className="px-4 py-3">
          <ActionButtons />
        </td>
      </tr>
    </tbody>
  </table>
);

// Status Badge
const StatusBadge = ({ status }) => {
  let bgColor = "";
  let textColor = "";
  let label = "";

  switch (status) {
    case "available":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      label = "Available";
      break;
    case "in-operation":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      label = "In Operation";
      break;
    case "unavailable":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      label = "Unavailable";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      label = status;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[90px] text-center ${bgColor} ${textColor}`}
    >
      {label}
    </span>
  );
};

// Action Buttons
const ActionButtons = () => (
  <div className="flex gap-2">
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-transform transform hover:-translate-y-0.5">
      View
    </button>
    <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-semibold transition-transform transform hover:-translate-y-0.5">
      Edit
    </button>
    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold transition-transform transform hover:-translate-y-0.5">
      Delete
    </button>
  </div>
);

export default HospitalDashboard;
