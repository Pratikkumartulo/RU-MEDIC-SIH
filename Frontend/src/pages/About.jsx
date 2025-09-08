import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-xl border-2 border-teal-200 shadow-sm p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4 text-center">
          About RU-MEDIC
        </h1>
        <p className="text-gray-700 text-lg mb-6 text-center">
          RU-MEDIC is a modern healthcare management platform designed to simplify and enhance the healthcare experience for patients, doctors, hospitals, and administrators.
        </p>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-700">Our Mission</h2>
          <p className="text-gray-600">
            To provide a seamless, secure, and accessible healthcare ecosystem where users can easily book appointments, manage health records, and connect with healthcare providers.
          </p>
          <h2 className="text-xl font-semibold text-teal-700 mt-6">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Find nearby hospitals and doctors</li>
            <li>Book and manage appointments online</li>
            <li>View and update your health profile</li>
            <li>Order medicines and track orders</li>
            <li>Dedicated dashboards for doctors and hospitals</li>
            <li>Admin panel for platform management</li>
          </ul>
          <h2 className="text-xl font-semibold text-teal-700 mt-6">Why Choose RU-MEDIC?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>User-friendly and intuitive interface</li>
            <li>Secure data handling and privacy</li>
            <li>Accessible from anywhere, anytime</li>
            <li>Continuous updates and support</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-full font-semibold">
            Empowering Healthcare, One Click at a Time.
          </span>
        </div>
      </div>
    </div>
  )
};