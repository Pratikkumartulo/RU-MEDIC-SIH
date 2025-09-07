import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authServie from '../Appwrite/userConfig';
import { useSelector,useDispatch } from 'react-redux';
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex flex-col items-center justify-start py-12 px-4">
      {/* Heading */}
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Create Your</h1>
      <h2 className="text-xl font-bold text-blue-600 mb-10">RU-MEDIC Account</h2>

      {/* Form container */}
      <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-5" onSubmit={handleSubmit(signup)}>
        {/* Full Name */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.004 9.004 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <input
            {...register("name", { required: "Full Name is required" })}
            type="text"
            placeholder="Full Name"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Email Address */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12v4a4 4 0 01-8 0v-4m4-6v6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l6-6m0 0l-6 6m6-6H6" />
            </svg>
          </span>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            })}
            type="email"
            placeholder="Email Address"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.6 7.59a5 5 0 005 2.41 5 5 0 005-2.41L19 5h2M4 22h16" />
            </svg>
          </span>
          <input
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Must be 10 digits" },
              maxLength: { value: 10, message: "Must be 10 digits" }
            })}
            type="tel"
            maxLength="10"
            placeholder="Phone Number (10 digits)"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </span>
          <input
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
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
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </span>
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: value => value === watch('password') || "Passwords do not match"
            })}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
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
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
        </div>

        {/* Age */}
        <input
          {...register("age", { required: "Age is required", min: { value: 0, message: "Invalid age" } })}
          type="number"
          min="0"
          placeholder="Age"
          className="block w-full py-3 px-4 border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}

        {/* Gender */}
        <fieldset className="flex gap-5 items-center">
          <legend className="sr-only">Gender</legend>
          <label className="text-sm font-semibold text-gray-700">Gender</label>
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
        </fieldset>
        {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}

        {/* Address */}
        <div className="relative">
          <span className="absolute top-3 left-3 text-blue-400">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5H9v5a2 2 0 01-2 2H3a2 2 0 01-2-2V9z" />
            </svg>
          </span>
          <textarea
            {...register("address")}
            rows="3"
            placeholder="Address   (Optional)"
            className="block w-full pl-10 px-4 py-3 border border-gray-200 rounded-md resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={'/login'} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
