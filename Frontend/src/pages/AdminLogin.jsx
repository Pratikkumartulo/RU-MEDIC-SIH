import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Simple hardcoded admin check (replace with real API/auth in production)
    if (data.email === "admin@rumedic.com" && data.password === "admin123") {
      navigate("/admindashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-blue-900 to-gray-900 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-700 text-white rounded-full p-3 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zM12 14v8m0-8a5 5 0 00-5 5v3h10v-3a5 5 0 00-5-5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-gray-700 font-semibold" htmlFor="email">
            Admin Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="admin@rumedic.com"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          <label className="block mb-2 text-gray-700 font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded hover:bg-blue-800 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          &copy; 2024 RU-Medic Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;