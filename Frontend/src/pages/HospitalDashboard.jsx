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
    <div className="min-h-screen bg-[#fafcfb]">
      {/* Header Bar */}
      <header className="bg-white border-b border-[#e0ece7] p-6 flex items-center justify-between shadow-none fixed w-full z-30 left-0 top-0" style={{height: "80px"}}>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] pb-10">
        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="border-2 border-[#16a085] rounded-xl bg-white p-6 flex flex-col items-start shadow transition hover:shadow-lg">
            <div className="text-3xl text-[#16a085] mb-2">👨‍⚕️</div>
            <div className="text-xl font-bold text-[#222] mb-1">Total Doctors</div>
            <div className="text-[#222] text-2xl font-extrabold mb-2">{hospital.doctors ? hospital.doctors.length : 0}</div>
            <button className="mt-auto ml-0 px-4 py-2 border-2 border-[#16a085] text-[#16a085] rounded-lg font-semibold hover:bg-[#e0ece7] transition" onClick={() => setActiveSection("doctors")}>Learn More <span className="ml-2">&#8594;</span></button>
          </div>
          <div className="border-2 border-[#16a085] rounded-xl bg-white p-6 flex flex-col items-start shadow transition hover:shadow-lg">
            <div className="text-3xl text-[#16a085] mb-2">🏥</div>
            <div className="text-xl font-bold text-[#222] mb-1">Departments</div>
            <div className="text-[#222] text-2xl font-extrabold mb-2">{hospital.departments ? hospital.departments.length : 0}</div>
            <button className="mt-auto ml-0 px-4 py-2 border-2 border-[#16a085] text-[#16a085] rounded-lg font-semibold hover:bg-[#e0ece7] transition" onClick={() => setActiveSection("patients")}>Learn More <span className="ml-2">&#8594;</span></button>
          </div>
          <div className="border-2 border-[#16a085] rounded-xl bg-white p-6 flex flex-col items-start shadow transition hover:shadow-lg">
            <div className="text-3xl text-[#16a085] mb-2">💊</div>
            <div className="text-xl font-bold text-[#222] mb-1">Pharmacy</div>
            <div className="text-[#222] text-2xl font-extrabold mb-2">{hospital.pharmacy ? "Available" : "Not Available"}</div>
            <button className="mt-auto ml-0 px-4 py-2 border-2 border-[#16a085] text-[#16a085] rounded-lg font-semibold hover:bg-[#e0ece7] transition" onClick={() => setActiveSection("medicines")}>Learn More <span className="ml-2">&#8594;</span></button>
          </div>
          <div className="border-2 border-[#16a085] rounded-xl bg-white p-6 flex flex-col items-start shadow transition hover:shadow-lg">
            <div className="text-3xl text-[#16a085] mb-2">🛏️</div>
            <div className="text-xl font-bold text-[#222] mb-1">Beds (Available/Total)</div>
            <div className="text-[#222] text-2xl font-extrabold mb-2">{hospital.availableBeds || 0}/{hospital.capacity || 0}</div>
            <button className="mt-auto ml-0 px-4 py-2 border-2 border-[#16a085] text-[#16a085] rounded-lg font-semibold hover:bg-[#e0ece7] transition" onClick={() => setActiveSection("settings")}>Learn More <span className="ml-2">&#8594;</span></button>
          </div>
          <div className="border-2 border-[#16a085] rounded-xl bg-white p-6 flex flex-col items-start shadow transition hover:shadow-lg">
            <div className="text-3xl text-[#16a085] mb-2">📅</div>
            <div className="text-xl font-bold text-[#222] mb-1">Appointments</div>
            <div className="text-[#222] text-2xl font-extrabold mb-2">--</div>
            <button className="mt-auto ml-0 px-4 py-2 border-2 border-[#16a085] text-[#16a085] rounded-lg font-semibold hover:bg-[#e0ece7] transition" onClick={() => setActiveSection("appointments")}>Learn More <span className="ml-2">&#8594;</span></button>
          </div>
          <div className="border-2 border-[#16a085] rounded-xl bg-white p-6 flex flex-col items-start shadow transition hover:shadow-lg">
            <div className="text-3xl text-[#16a085] mb-2">⚙️</div>
            <div className="text-xl font-bold text-[#222] mb-1">Settings</div>
            <div className="text-[#222] text-2xl font-extrabold mb-2">--</div>
            <button className="mt-auto ml-0 px-4 py-2 border-2 border-[#16a085] text-[#16a085] rounded-lg font-semibold hover:bg-[#e0ece7] transition" onClick={() => setActiveSection("settings")}>Learn More <span className="ml-2">&#8594;</span></button>
          </div>
        </section>

        {/* Section Content */}
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
