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
    try {
      const session = await authDocService.login({
        email: data.doctorId,
        password: data.password,
      });
      const doctorData = await authDocService.getCurrentDoctor();
      dispatch(login(doctorData));
      navigate("/doctordash");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#fafcfb]">
      <div className="w-full max-w-md">
        <div className="bg-white border-2 border-[#16a085] rounded-xl shadow p-8">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path fill="#16a085" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-2xl font-bold text-[#222] tracking-tight">Medcare.</span>
          </div>
          <h2 className="mb-6 text-[#16a085] text-xl font-bold text-center">Doctor Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="block font-semibold mb-1 text-[#222]" htmlFor="doctorId">
                Doctor Email
              </label>
              <input
                type="email"
                id="doctorId"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-[#16a085] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] bg-[#fafcfb] text-[#222]"
                {...register("doctorId", { required: "Email is required" })}
              />
              {errors.doctorId && <span className="text-red-500 text-sm">{errors.doctorId.message}</span>}
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-1 text-[#222]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-[#16a085] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] bg-[#fafcfb] text-[#222]"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#16a085] hover:bg-[#138d75] text-white py-3 rounded-lg text-lg font-semibold transition border-2 border-[#16a085]"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            &copy; 2024 MedDash. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
