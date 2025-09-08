import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";
import DocumentService from "../Appwrite/CreateDocument";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHospital } from "../store/HospitalSlice";

const HospitalLogin = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const res = await DocumentService.getHospitalLogin({
        id: data.hospitalId,
        password: data.password,
      });
      console.log(res);
      console.log(res.total);
      if (res) {
        // Successful login logic here (e.g., redirect, set redux, etc.)
        // For now, just alert
        console.log(res);
        const hospitalData = res;
        
        dispatch(setHospital(hospitalData));
        alert("Login successful!");
        navigate("/myhospital");
      } else {
        setLoginError("Invalid hospital ID or password.");
      }
    } catch (err) {
      setLoginError("Invalid hospital ID or password.");
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
          <h2 className="mb-6 text-[#16a085] text-xl font-bold text-center">Hospital Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="block font-semibold mb-1 text-[#222]" htmlFor="hospitalId">
                <FontAwesomeIcon icon={faIdCard} className="mr-2 text-[#16a085]" />
                Hospital ID
              </label>
              <input
                id="hospitalId"
                type="text"
                placeholder="Enter Hospital ID"
                {...register("hospitalId", { required: true })}
                className="w-full px-4 py-3 border border-[#16a085] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] bg-[#fafcfb] text-[#222]"
              />
              {errors.hospitalId && (
                <span className="text-red-500 text-sm">Hospital ID is required</span>
              )}
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-1 text-[#222]" htmlFor="password">
                <FontAwesomeIcon icon={faLock} className="mr-2 text-[#16a085]" />
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 border border-[#16a085] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#16a085] focus:border-[#16a085] bg-[#fafcfb] text-[#222]"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">Password is required</span>
              )}
            </div>
            {loginError && (
              <div className="mb-4 text-red-600 font-semibold text-center">{loginError}</div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#16a085] hover:bg-[#138d75] text-white py-3 rounded-lg text-lg font-semibold transition border-2 border-[#16a085]"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-sm text-center text-[#222]">
            New hospital?{" "}
            <a href="signup.html" className="text-[#16a085] font-semibold hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
