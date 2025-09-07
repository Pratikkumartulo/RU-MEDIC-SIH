import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authDocService from '../Appwrite/doctorConfig';
import { login } from "../store/AuthSlice";

const DoctorLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const session = await authDocService.login({
        email: data.doctorId,
        password: data.password,
      });
      const doctorData = await authDocService.getCurrentDoctor();
      dispatch(login(doctorData));
      console.log(doctorData);
      navigate("/doctordash");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 text-white rounded-full p-3 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="h-8 w-8" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM12 14v8m0-8a5 5 0 00-5 5v3h10v-3a5 5 0 00-5-5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MedDash Doctor Portal</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-gray-700 font-semibold" htmlFor="doctorId">
            Doctor Email
          </label>
          <input
            type="email"
            id="doctorId"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("doctorId", { required: "Email is required" })}
          />
          {errors.doctorId && <span className="text-red-500 text-xs">{errors.doctorId.message}</span>}

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
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          &copy; 2024 MedDash. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
