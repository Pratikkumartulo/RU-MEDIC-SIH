import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authServie from '../Appwrite/userConfig';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userData = await authServie.createAccount(data);
      if (userData) {
        await authServie.getCurrentUser();
        dispatch(login(userData));
        navigate('/'); // Redirect after signup
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Card container */}
      <div className="w-full max-w-lg bg-white rounded-xl border-2 border-teal-200 shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <svg
            className="w-8 h-8 text-teal-600 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C10.8954 2 10 2.89543 10 4V6H8V4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4V10C4 16 12 22 12 22C12 22 20 16 20 10V4C20 2.89543 19.1046 2 18 2C16.8954 2 16 2.89543 16 4V6H14V4C14 2.89543 13.1046 2 12 2Z" />
          </svg>
          <span className="font-bold text-2xl text-teal-700">Medcare.</span>
        </div>
        <h1 className="text-2xl font-bold text-teal-700 mb-2 text-center">Create Your Account</h1>
        <p className="mb-6 text-gray-600 text-center">
          Sign up to access rural healthcare services
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(signup)}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              {...register("name", { required: "Full Name is required" })}
              type="text"
              placeholder="Full Name"
              className="block w-full px-4 py-2 border border-teal-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              type="email"
              placeholder="Email Address"
              className="block w-full px-4 py-2 border border-teal-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Phone Number</label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 10, message: "Must be 10 digits" },
                maxLength: { value: 10, message: "Must be 10 digits" }
              })}
              type="tel"
              maxLength="10"
              placeholder="Phone Number (10 digits)"
              className="block w-full px-4 py-2 border border-teal-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="block w-full px-4 py-2 border border-teal-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-teal-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9s1.216-3.916 2.813-5.125M9 9l6 6M15 9l-6 6" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22M12 5c-5 0-9 4-9 9a9.01 9.01 0 001.883 5.923M9 9a3 3 0 014.246 4.246M15 15c1.094-1.094 2-2 2-4 0-1.38-1.12-2.5-2.5-2.5" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: value => value === watch('password') || "Passwords do not match"
                })}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="block w-full px-4 py-2 border border-teal-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-teal-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9s1.216-3.916 2.813-5.125M9 9l6 6M15 9l-6 6" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22M12 5c-5 0-9 4-9 9a9.01 9.01 0 001.883 5.923M9 9a3 3 0 014.246 4.246M15 15c1.094-1.094 2-2 2-4 0-1.38-1.12-2.5-2.5-2.5" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Age</label>
            <input
              {...register("age", { required: "Age is required", min: { value: 0, message: "Invalid age" } })}
              type="number"
              min="0"
              placeholder="Age"
              className="block w-full px-4 py-2 border border-teal-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Gender</label>
            <div className="flex gap-5 items-center">
              <label className="flex items-center text-sm space-x-2">
                <input type="radio" value="male" {...register("gender", { required: "Gender is required" })} />
                <span>Male</span>
              </label>
              <label className="flex items-center text-sm space-x-2">
                <input type="radio" value="female" {...register("gender", { required: "Gender is required" })} />
                <span>Female</span>
              </label>
              <label className="flex items-center text-sm space-x-2">
                <input type="radio" value="other" {...register("gender", { required: "Gender is required" })} />
                <span>Other</span>
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Address <span className="text-gray-400 text-xs">(Optional)</span></label>
            <textarea
              {...register("address")}
              rows="2"
              placeholder="Address"
              className="block w-full px-4 py-2 border border-teal-200 rounded-md resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 border-2 border-teal-500 text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition duration-200"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="text-teal-600 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </form>
        {/* Footer note */}
        <p className="mt-8 text-center text-gray-400 text-xs flex items-center justify-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-teal-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Secure signup with SSL encryption</span>
        </p>
      </div>
    </div>
  );
}
