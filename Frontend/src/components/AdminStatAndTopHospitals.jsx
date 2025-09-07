import React from "react";
import { Link, useOutletContext } from "react-router-dom";

function renderStars(rating) {
  // Ensure rating is a number between 0 and 5
  let safeRating = Number(rating);
  if (isNaN(safeRating) || safeRating < 0) safeRating = 0;
  if (safeRating > 5) safeRating = 5;
  const full = Math.floor(safeRating);
  const half = safeRating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <span key={"full" + i} className="text-yellow-400 text-lg">★</span>
      ))}
      {half && <span className="text-yellow-400 text-lg">☆</span>}
      {[...Array(empty)].map((_, i) => (
        <span key={"empty" + i} className="text-gray-300 text-lg">★</span>
      ))}
    </span>
  );
}

export default function AdminStatsAndTopHospitals() {
  const { stats, topHospitals } = useOutletContext();

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow-md p-6 flex items-center gap-4 bg-white hover:shadow-lg transition ${stat.color}`}
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Hospitals */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Top Hospitals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topHospitals.slice(0, 4).map((hosp, idx) => (
            <div
              key={hosp.name}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏥</span>
                <span className="font-semibold text-gray-800">{hosp.name}</span>
              </div>
              <div className="text-sm text-blue-600 mb-1">{hosp.type} Hospital</div>
              <div className="flex items-center gap-2">
                {renderStars(hosp.rating)}
                <span className="text-gray-500 text-xs font-medium">{hosp.rating}</span>
              </div>
              <Link
                to={`/admin/hospitals/${idx + 1}`}
                className="mt-3 inline-block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            to="/admin/allhospitals"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition"
          >
            View All Hospitals
          </Link>
        </div>
      </div>
    </>
  );
}