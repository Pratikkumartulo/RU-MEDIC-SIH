import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authDocService from "../Appwrite/doctorConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice"; // <-- adjust path as needed
import { useSelector } from "react-redux";
import { setHospital } from "../store/HospitalSlice";
import DocumentService from "../Appwrite/CreateDocument";

const specializations = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Psychiatrist",
  "Orthopedic Surgeon",
];
const genders = ["male", "female", "other"];

export default function DoctorSignup() {
  const hospitalState = useSelector((state) => state.hospital.hospital);
  useEffect(() => {
    // if (!hospitalState) {
    //   alert("Please login as a hospital to register as a doctor.");
    //   navigate("/hospitallogin");
    // }
    // console.log(hospitalState);
  }, [hospitalState]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    // Submit logic here (e.g., API call)
    setError("");
    console.log(data);

    try {
      const userData = await authDocService.createDoctorAccount(data);
      console.log(userData);
      if (userData) {
        console.log(userData);
        const updateHospital = await DocumentService.addDoctorToHospital({
          ahospitalId: hospitalState.$id,
          doctorId: userData.$id,
        });
        dispatch(setHospital(updateHospital));
        navigate('/myhospital'); // Redirect after signup
      }
        console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafcfb] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl border-2 border-[#16a085] shadow p-10">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path fill="#16a085" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="text-2xl font-bold text-[#222] tracking-tight">Medcare.</span>
        </div>
        <h2 className="text-2xl font-bold text-[#16a085] mb-6 text-center">Doctor Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Dr. John Doe"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="doctor@email.com"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+1 234 567 8901"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\s()-]{10,}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
          </div>

          {/* Age and Gender */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-[#222] font-semibold mb-1" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                min="25"
                max="100"
                placeholder="e.g. 35"
                className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 25, message: "Minimum age is 25" },
                  max: { value: 100, message: "Maximum age is 100" },
                })}
              />
              {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
            </div>

            <div className="flex-1">
              <label className="block text-[#222] font-semibold mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="specialization">
              Specialization
            </label>
            <select
              id="specialization"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("specialization", { required: "Specialization is required" })}
            >
              <option value="" disabled>
                Select Specialization
              </option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <span className="text-red-500 text-xs">{errors.specialization.message}</span>
            )}
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="hospital">
              Hospital / Clinic
            </label>
            <input
              type="text"
              id="hospital"
              value={hospitalState ? hospitalState.uniqueId : "***"}
              placeholder="Name of Hospital or Clinic"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("hospital", { required: "Hospital/Clinic is required" })}
              readOnly
            />
            {errors.hospital && <span className="text-red-500 text-xs">{errors.hospital.message}</span>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-[#222] font-semibold mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              placeholder="123 Main Street, City, State, ZIP"
              rows="3"
              className="w-full px-4 py-2 border border-[#16a085] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#16a085] bg-[#fafcfb] text-[#222]"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <input
              type="submit"
              value="Register"
              className="w-full bg-[#16a085] text-white font-semibold py-3 rounded-md shadow hover:bg-[#138d75] transition border-2 border-[#16a085]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
