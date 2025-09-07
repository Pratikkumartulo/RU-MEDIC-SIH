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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Hospitals Near You
        </h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search hospitals by name, specialty, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center">
              <span className="mr-2">🔍</span>
              Search
            </button>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">📍 Distance</option>
              <option value="1">Within 1 mile</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">⭐ Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">🕐 Availability</option>
              <option value="available">Available Now</option>
              <option value="busy">Busy</option>
              <option value="emergency">Emergency Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">📊 Sort By</option>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {hospitals.length} hospitals
        </p>

        {/* Hospital Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-3 text-center text-gray-500">
              Loading hospitals...
            </div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">{error}</div>
          ) : (
            hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 relative"
              >
                {/* Hospital Type Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      hospital.type === "General Hospital"
                        ? "bg-gray-100 text-gray-700"
                        : hospital.type === "Specialty Center"
                        ? "bg-blue-100 text-blue-700"
                        : hospital.type === "Children's Hospital"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {hospital.type}
                  </span>
                </div>

                {/* Emergency Badge */}
                {hospital.emergency && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-xs rounded flex items-center">
                    🏠 24/7 Emergency
                  </div>
                )}

                {/* Hospital Icon */}
                <div className="flex justify-center mt-8 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏥</span>
                  </div>
                </div>

                {/* Hospital Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">{hospital.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      {renderStars(hospital.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {hospital.rating} ({hospital.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    📍 {hospital.distance}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {hospital.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-center mb-4">
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
                  <p className="text-sm text-gray-600 mb-2">
                    📞 {hospital.phone}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    📍 {hospital.address}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link to={'/bookappointment'} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
                      View Doctors
                    </Link>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 text-sm">
                      Quick book
                    </button>
                  </div>
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