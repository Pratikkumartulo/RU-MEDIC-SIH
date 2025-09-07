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
    <div
      className="min-h-screen flex items-center justify-center p-5 bg-center bg-cover"
      style={{ backgroundImage: 'url("images/loginBg.jpg")' }}
    >
      <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg max-w-md w-full p-10 text-center">
        <h2 className="flex items-center justify-center gap-3 mb-6 text-[#1e3c72] text-2xl font-semibold">
          <FontAwesomeIcon icon={faHospital} className="text-[#1e3c72] text-3xl" />
          Hospital Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 text-left">
            <label className="block font-semibold mb-1 text-gray-800" htmlFor="hospitalId">
              <FontAwesomeIcon icon={faIdCard} className="mr-2" />
              Hospital ID
            </label>
            <input
              id="hospitalId"
              type="text"
              placeholder="Enter Hospital ID"
              {...register("hospitalId", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition focus:outline-none focus:ring-2 focus:ring-[#1e3c72] focus:border-[#1e3c72]"
            />
            {errors.hospitalId && (
              <span className="text-red-500 text-sm">Hospital ID is required</span>
            )}
          </div>

          <div className="mb-6 text-left">
            <label className="block font-semibold mb-1 text-gray-800" htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition focus:outline-none focus:ring-2 focus:ring-[#1e3c72] focus:border-[#1e3c72]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          {loginError && (
            <div className="mb-4 text-red-600 font-semibold">{loginError}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1e3c72] hover:bg-[#2a5298] text-white py-4 rounded-lg text-lg font-medium transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-700">
          New hospital?{" "}
          <a href="signup.html" className="text-[#1e3c72] font-semibold hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
