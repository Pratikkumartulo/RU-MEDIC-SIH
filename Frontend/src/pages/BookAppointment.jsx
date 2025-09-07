import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedDoctor } from '../store/appointmentSlice';
import DocumentService from '../Appwrite/CreateDocument';

const AVAILABILITY_MAP = {
  NotAvailable: "Not Available Today",
  Available: "Available Now",
  AvailableLater: "Available Later Today"
};

const DOCTOR_IMAGE = "👨‍⚕️"; // You can improve this with gender/role logic

const BookAppointment = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      let allDoctors = await DocumentService.getstarDoctors();
      const docs = allDoctors?.documents || [];
      const grouped = {};
      docs.forEach((doc) => {
        const specialty = doc.specializations || "General";
        if (!grouped[specialty]) grouped[specialty] = [];
        grouped[specialty].push({
          id: doc.$id,
          name: doc.name,
          specialty: doc.specializations,
          availability: AVAILABILITY_MAP[doc.status] || "Not Available Today",
          image: DOCTOR_IMAGE,
        });
      });
      setDoctorsBySpecialty(grouped);
    };
    fetchDoctors();
  }, []);

  // Filter logic
  const filteredDoctorsBySpecialty = {};
  Object.entries(doctorsBySpecialty).forEach(([specialty, doctorsList]) => {
    let filtered = doctorsList;
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSpecialty !== "All Specialties") {
      if (specialty !== selectedSpecialty) filtered = [];
    }
    if (selectedAvailability) {
      filtered = filtered.filter(doc => doc.availability === selectedAvailability);
    }
    if (filtered.length) filteredDoctorsBySpecialty[specialty] = filtered;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Doctor Appointment</h1>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search doctor by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Specialties">All Specialties</option>
              {Object.keys(doctorsBySpecialty).map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select 
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Availability</option>
              <option value="Available Now">Available Now</option>
              <option value="Available Later Today">Available Later Today</option>
              <option value="Not Available Today">Not Available Today</option>
            </select>
          </div>
        </div>

        {/* Doctor Sections by Specialty */}
        {Object.entries(filteredDoctorsBySpecialty).map(([specialty, doctorsList]) => (
          <div key={specialty} className="mb-12">
            {/* Specialty Header */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold text-sm">
                  {specialty === 'Cardiology' ? '❤️' : 
                   specialty === 'Neurology' ? '🧠' : '🏥'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{specialty}</h2>
            </div>

            {/* Doctor Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorsList.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  {/* Doctor Profile */}
                  <div className="flex items-start mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">{doctor.image}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-blue-600 mb-2">{doctor.specialty}</p>
                    </div>
                  </div>
                  {/* Availability Status */}
                  <div className="flex items-center mb-6">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      doctor.availability === 'Available Now'
                        ? 'bg-green-500'
                        : doctor.availability === 'Available Later Today'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      doctor.availability === 'Available Now'
                        ? 'text-green-600'
                        : doctor.availability === 'Available Later Today'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {doctor.availability}
                    </span>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to="/apointment"
                      onClick={() => dispatch(setSelectedDoctor(doctor))}
                      className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${
                        doctor.availability === 'Not Available Today'
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={doctor.availability === 'Not Available Today'}
                    >
                      Book Slot
                    </Link>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookAppointment;