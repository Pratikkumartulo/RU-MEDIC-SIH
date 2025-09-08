import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getLatLong } from "../API/getLatLong";
import { fetchHospitals } from "../API/fetchHospitalApi";

const FindHospitals = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [allHospitals, setAllHospitals] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchTerm = searchParams.get("search")?.trim();
  const locationTerm = searchParams.get("location")?.trim();

  useEffect(() => {
    async function loadHospitals() {
      setLoading(true);
      setError("");
      setHospitals([]);
      setAllHospitals([]);

      try {
        if (locationTerm) {
          const { lat, lon } = await getLatLong(locationTerm);
          let hospitalsList = await fetchHospitals(lat, lon);
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            hospitalsList = hospitalsList.filter(
              (h) =>
                h.name.toLowerCase().includes(searchLower) ||
                h.specialties.some((s) => s.toLowerCase().includes(searchLower))
            );
          }
          setAllHospitals(hospitalsList);
          setHospitals(hospitalsList);
          if (hospitalsList.length === 0) setError("No hospitals found.");
        } else if (searchTerm) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (pos) => {
                const { latitude, longitude } = pos.coords;
                let hospitalsList = await fetchHospitals(latitude, longitude);
                const searchLower = searchTerm.toLowerCase();
                hospitalsList = hospitalsList.filter(
                  (h) =>
                    h.name.toLowerCase().includes(searchLower) ||
                    h.specialties.some((s) => s.toLowerCase().includes(searchLower))
                );
                setAllHospitals(hospitalsList);
                setHospitals(hospitalsList);
                if (hospitalsList.length === 0) setError("No hospitals found.");
                setLoading(false);
              },
              (err) => {
                setError("Could not get your location.");
                setLoading(false);
              }
            );
            return;
          } else {
            setError("Geolocation not supported.");
          }
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (pos) => {
                const { latitude, longitude } = pos.coords;
                const hospitalsList = await fetchHospitals(latitude, longitude);
                setAllHospitals(hospitalsList);
                setHospitals(hospitalsList);
                if (hospitalsList.length === 0) setError("No hospitals found.");
                setLoading(false);
              },
              (err) => {
                setError("Could not get your location.");
                setLoading(false);
              }
            );
            return;
          } else {
            setError("Geolocation not supported.");
          }
        }
      } catch (err) {
        setError("No hospitals found.");
      }
      setLoading(false);
    }

    loadHospitals();
    // eslint-disable-next-line
  }, [location.search]);

  // Apply filters and sorting whenever any filter/sort changes or hospitals are loaded
  useEffect(() => {
    let filtered = [...allHospitals];

    // Specialty filter
    if (selectedSpecialty) {
      filtered = filtered.filter((h) =>
        h.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty))
      );
    }

    // Distance filter (assumes distance is like "2.34 km away")
    if (selectedDistance) {
      filtered = filtered.filter((h) => {
        if (!h.distance) return false;
        const num = parseFloat(h.distance);
        return !isNaN(num) && num <= Number(selectedDistance);
      });
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter(
        (h) => Number(h.rating) >= Number(selectedRating)
      );
    }

    // Availability filter
    if (selectedAvailability) {
      const availMap = {
        available: "Available Now",
        busy: "Busy",
        emergency: "Emergency Only",
      };
      filtered = filtered.filter(
        (h) => h.availability === availMap[selectedAvailability]
      );
    }

    // Sorting
    if (sortBy) {
      if (sortBy === "distance") {
        filtered.sort((a, b) => {
          const aDist = parseFloat(a.distance);
          const bDist = parseFloat(b.distance);
          return (
            (isNaN(aDist) ? Infinity : aDist) -
            (isNaN(bDist) ? Infinity : bDist)
          );
        });
      } else if (sortBy === "rating") {
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
      } else if (sortBy === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    setHospitals(filtered);
  }, [
    selectedSpecialty,
    selectedDistance,
    selectedRating,
    selectedAvailability,
    sortBy,
    allHospitals,
  ]);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Available Now":
        return "text-green-600";
      case "Busy":
        return "text-yellow-600";
      case "Emergency Only":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getAvailabilityDot = (availability) => {
    switch (availability) {
      case "Available Now":
        return "bg-green-500";
      case "Busy":
        return "bg-yellow-500";
      case "Emergency Only":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

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

      <div className="max-w-7xl mx-auto px-4 py-8 pt-[110px]">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-[#222] mb-8">
          Hospitals Near You
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-xl border-2 border-[#16a085] shadow p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="p-3 border border-[#16a085] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            >
              <option value="">🏥 Specialty</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="orthopedics">Orthopedics</option>
            </select>
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="p-3 border border-[#16a085] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            >
              <option value="">📍 Distance</option>
              <option value="1">Within 1 mile</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
            </select>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="p-3 border border-[#16a085] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            >
              <option value="">⭐ Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="p-3 border border-[#16a085] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            >
              <option value="">🕐 Availability</option>
              <option value="available">Available Now</option>
              <option value="busy">Busy</option>
              <option value="emergency">Emergency Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border border-[#16a085] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a085]"
            >
              <option value="">📊 Sort By</option>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-[#16a085] mb-6 font-semibold">
          Showing {hospitals.length} hospitals
        </p>

        {/* Hospital Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {loading ? (
            <div className="col-span-3 text-center text-[#16a085]">
              Loading hospitals...
            </div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">{error}</div>
          ) : (
            hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white border-2 border-[#16a085] rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-between min-h-[410px] h-full w-full"
                style={{ minHeight: "410px", height: "100%" }}
              >
                <div className="w-full p-6 flex flex-col flex-1">
                  {/* Hospital Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-[#e0ece7] rounded-full flex items-center justify-center">
                      <span className="text-2xl text-[#16a085]">🏥</span>
                    </div>
                  </div>
                  {/* Hospital Info */}
                  <div className="text-center mb-2 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-[#222] mb-1">{hospital.name}</h3>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center">
                        {renderStars(hospital.rating)}
                      </div>
                      <span className="ml-2 text-sm text-[#16a085] font-semibold">
                        {hospital.rating}
                      </span>
                    </div>
                    <p className="text-sm text-[#222] mb-2">
                      📍 {hospital.distance}
                    </p>
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {hospital.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#e0ece7] text-[#16a085] text-xs rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    {/* Availability */}
                    <div className="flex items-center justify-center mb-2">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${getAvailabilityDot(
                          hospital.availability
                        )}`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${getAvailabilityColor(
                          hospital.availability
                        )}`}
                      >
                        {hospital.availability}
                      </span>
                      {hospital.waitTime && (
                        <span className="text-sm text-gray-600 ml-2">
                          [{hospital.waitTime}]
                        </span>
                      )}
                    </div>
                    {/* Contact Info */}
                    <p className="text-sm text-[#222] mb-1">
                      📞 {hospital.phone}
                    </p>
                    <p className="text-xs text-[#888] mb-2">
                      📍 {hospital.address}
                    </p>
                  </div>
                </div>
                {/* Action Button */}
                <div className="w-full px-6 pb-6">
                  <Link
                    to={'/bookappointment'}
                    className="inline-block border-2 border-[#16a085] text-[#16a085] px-4 py-2 rounded-lg font-semibold hover:bg-[#e0ece7] transition w-full text-center"
                  >
                    View Doctors
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Interactive Map Showing Hospital Locations
            </h3>
            <p className="text-gray-600 mb-4">
              View all nearby hospitals on an interactive map
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Open Map View
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-gray-600 text-sm">Hospitals Found</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.2</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
            <div className="text-gray-600 text-sm">Immediate Availability</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600 text-sm">With Emergency Services</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHospitals;