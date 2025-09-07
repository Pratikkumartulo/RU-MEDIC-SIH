import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authServie from '../Appwrite/userConfig';
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setError("");
    // TODO: Add your login logic here (API call, etc.)
    // Example:
    // try {
    //   await loginUser(data.email, data.password);
    // } catch (err) {
    //   setError("Invalid credentials");
    // }
    try {
      const userData = await authServie.login(data);
      if (userData) {
        await authServie.getCurrentUser();
        dispatch(login(userData));
        navigate('/'); // Redirect after signup
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
    // console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      {/* Centered Login Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <svg
              className="w-7 h-7 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C10.8954 2 10 2.89543 10 4V6H8V4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4V10C4 16 12 22 12 22C12 22 20 16 20 10V4C20 2.89543 19.1046 2 18 2C16.8954 2 16 2.89543 16 4V6H14V4C14 2.89543 13.1046 2 12 2Z" />
            </svg>
            <span className="font-semibold text-xl text-blue-700">
              HealthCare Plus
            </span>
          </div>
          <div className="text-red-600 text-sm font-semibold flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-12.728 12.728M5.636 18.364l12.728-12.728"
              />
            </svg>
            <span>Emergency: 1-800-HEALTH</span>
          </div>
        </header>

        {/* Form Heading */}
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Welcome Back to <br />
          HealthCare Plus
        </h1>
        <p className="mb-6 text-gray-600">
          Sign in to manage your healthcare appointments
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <label className="block mb-1 font-semibold text-gray-700">
            Email Address
          </label>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m0 0L4 8m4 4l4-4"
                />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password input */}
          <label className="block mb-1 font-semibold text-gray-700">
            Password
          </label>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2a2 2 0 004 0v-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2a2 2 0 014 0"
                />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          {/* Sign In button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 mb-6">
            Sign In
          </button>
        </form>

        {/* Sign up links */}
        <p className="text-center text-gray-500 mb-1">
          Don&apos;t have an account?{" "}
          <Link to={'/signup'} className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center text-green-600 cursor-pointer hover:underline">
          Sign up as Doctor
        </p>

        {/* Footer note */}
        <p className="mt-8 text-center text-gray-400 text-xs flex items-center justify-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Secure login with SSL encryption</span>
        </p>

        {/* Bottom copyright */}
        <footer className="mt-8 text-center text-gray-500 text-xs">
          © 2023 HealthCare Plus. All rights reserved.{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            Help
          </a>
        </footer>
      </div>
    </div>
  );
}
