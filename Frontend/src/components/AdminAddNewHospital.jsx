import React from "react";
import { useForm } from "react-hook-form";
import DocumentService from "../Appwrite/CreateDocument";
import { useNavigate } from "react-router-dom";

export default function AdminAddNewHospital() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    // Convert comma-separated strings to arrays
    data.departments = data.departments
      ? data.departments.split(",").map((d) => d.trim())
      : [];
    data.doctors = data.doctors
      ? data.doctors.split(",").map((d) => d.trim())
      : [];
    // Convert pharmacy to boolean
    data.pharmacy = !!data.pharmacy;

    // Call the DocumentService to create a new hospital
    const createdHospital = await DocumentService.CreateNewHospital(data);
    if (!createdHospital) {
      alert("Error adding hospital. Please try again.");
      return;
    }
    navigate("/admin/allhospitals");
    // For demo, just reset the form
    reset();
    alert("Hospital added successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Add New Hospital</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Hospital Name</label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 100 })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter hospital name"
          />
          {errors.name && <span className="text-red-500 text-sm">Name is required (max 100 chars)</span>}
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Location</label>
          <input
            type="text"
            {...register("location", { required: true, maxLength: 100 })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter location"
          />
          {errors.location && <span className="text-red-500 text-sm">Location is required (max 100 chars)</span>}
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Contact</label>
          <input
            type="text"
            {...register("contact", { required: true, maxLength: 20 })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter contact number"
          />
          {errors.contact && <span className="text-red-500 text-sm">Contact is required (max 20 chars)</span>}
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true, maxLength: 100 })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email"
          />
          {errors.email && <span className="text-red-500 text-sm">Valid email is required (max 100 chars)</span>}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1 text-gray-700">Capacity</label>
            <input
              type="number"
              {...register("capacity", { required: true, min: 0 })}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Total beds"
            />
            {errors.capacity && <span className="text-red-500 text-sm">Capacity is required</span>}
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1 text-gray-700">Available Beds</label>
            <input
              type="number"
              {...register("availableBeds", { required: true, min: 0 })}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Available beds"
            />
            {errors.availableBeds && <span className="text-red-500 text-sm">Available beds required</span>}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Departments <span className="text-xs text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            {...register("departments", { maxLength: 100 })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Cardiology, Neurology"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("pharmacy")}
            className="h-5 w-5 text-green-600 border-gray-300 rounded"
          />
          <label className="font-medium text-gray-700">Pharmacy Available</label>
        </div>
        {isSubmitSuccessful && (
          <div className="text-green-600 font-semibold">Hospital added successfully!</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition mt-2"
        >
          {isSubmitting ? "Adding..." : "Add Hospital"}
        </button>
      </form>
    </div>
  );
}