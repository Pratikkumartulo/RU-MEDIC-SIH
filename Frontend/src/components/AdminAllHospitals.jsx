import React from "react";
import { Link, useOutletContext } from "react-router-dom";

// Helper to render stars
function renderStars(rating) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const full = Math.floor(safeRating);
  const half = safeRating % 1 >= 0.5;
  return (
    <span className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ))}
      {half && <span className="text-yellow-400 text-lg">☆</span>}
      {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
        <span key={i} className="text-gray-300 text-lg">★</span>
      ))}
    </span>
  );
}

export default function AdminAllHospitals() {
  const { allHospitals = [] } = useOutletContext();

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white shadow flex items-center justify-between px-2 md:px-6 h-16 rounded-xl mb-8">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-3 py-2 rounded-lg transition"
        >
          <span className="text-xl">⬅</span>
          <span className="hidden sm:inline">Back to Dashboard</span>
        </Link>
        <h1 className="text-base md:text-xl font-bold text-gray-800 text-center flex-1">
          All Hospitals
        </h1>
        <Link
          to="/admin/addhospital"
          className="ml-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg shadow transition"
        >
          <span className="text-xl">➕</span>
          <span className="hidden sm:inline">Add New Hospital</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHospitals.map((hosp) => (
            <div
              key={hosp.$id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col gap-3 border border-blue-100"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏥</span>
                <span className="font-bold text-gray-800 text-lg">{hosp.name}</span>
              </div>
              <div className="text-xs text-gray-400 font-mono mb-1">
                ID: {hosp.uniqueId || hosp.$id}
              </div>
              <div className="text-blue-600 text-sm font-medium">{hosp.type || "Hospital"}</div>
              <div className="text-gray-600 text-sm">{hosp.location || hosp.address}</div>
              <div className="text-gray-600 text-sm">📞 {hosp.contact}</div>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(hosp.rating)}
                <span className="text-gray-500 text-xs font-medium">{hosp.rating}</span>
              </div>
              <div className="mt-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    hosp.availability === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {hosp.availability || "Open"}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/admin/hospitals/${hosp.$id}`}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-3 py-2 rounded-lg transition text-sm text-center"
                >
                  View Details
                </Link>
                <Link
                  to={`/admin/hospitals/${hosp.$id}/edit`}
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-2 rounded-lg transition text-sm text-center"
                >
                  Edit
                </Link>
                <button
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-2 rounded-lg transition text-sm"
                  onClick={() => {/* handle delete */}}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {allHospitals.length === 0 && (
          <div className="text-center text-gray-500 mt-20 text-lg">No hospitals found.</div>
        )}
      </div>
    </div>
  );
}