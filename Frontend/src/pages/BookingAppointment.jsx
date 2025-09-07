import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import DocumentService from '../Appwrite/CreateDocument';

const BookingAppointment = () => {
  const doctor = useSelector((state) => state.appointment.selectedDoctor);
  const userdetail = useSelector((state) => state.auth.userData);

  const [doctorDetail, setDoctorDetail] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      age: '',
      gender: 'Male',
      phoneNumber: '',
      email: '',
      address: '',
      reason: ''
    }
  });

  // Fetch doctor details and set available dates/times
  useEffect(() => {
    console.log(userdetail);
    const fetchDoctorDetail = async () => {
      if (!doctor?.id) return;
      const detail = await DocumentService.getDoctorIdDetails(doctor.id);
      console.log(detail);
      setDoctorDetail(detail);
    };
    fetchDoctorDetail();
  }, [doctor]);

  // Parse available dates and slots from doctorDetail
  let availableDates = [];
  let slotsByDate = {};
  if (doctorDetail?.availabity && Array.isArray(doctorDetail.availabity)) {
    doctorDetail.availabity.forEach((slotStr) => {
      // slotStr: "2025-09-18:09:00-10:30"
      const date = slotStr.slice(0, 10);
      const time = slotStr.slice(11);
      if (!slotsByDate[date]) slotsByDate[date] = [];
      slotsByDate[date].push(time);
    });
    availableDates = Object.keys(slotsByDate);
  }

  // Handle form submit
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time Slot:", selectedTimeSlot);
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      patientId: userdetail.$id, // or use a real patient/user id if available
      doctorId: doctorDetail?.$id,
      date: selectedDate,
      time: selectedTimeSlot,
      symptoms: data.reason,
      status: "pending"
    };

    // Create appointment in Appwrite
    try {
      const result = await DocumentService.createAppointment(appointmentData);
      console.log("Appointment Created:", result);
      setSummaryData({
        ...data,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        doctor: {
          name: doctorDetail?.name,
          specialization: doctorDetail?.specializations,
          contact: doctorDetail?.contact,
          email: doctorDetail?.email
        }
      });
      setShowSummary(true);
    } catch (err) {
      alert("Failed to create appointment. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Book Appointment</h1>
          {/* Doctor Info */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl sm:text-2xl">{doctorDetail?.image || "👨‍⚕️"}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{doctorDetail?.name || "Doctor Name"}</h2>
                <p className="text-blue-600 text-sm sm:text-base">{doctorDetail?.specializations || "Specialty"}</p>
                <p className="text-gray-600 text-sm">{doctorDetail?.contact}</p>
                <p className="text-gray-600 text-sm">{doctorDetail?.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  doctorDetail?.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {doctorDetail?.status === "Available" ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details Form */}
        {!showSummary && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-blue-600 mr-2">👤</span>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Patient Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: "Full name is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register('age', { required: "Age is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter age"
                />
                {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('gender', { required: "Gender is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber', { required: "Phone number is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: "Email is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address (Optional)
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit / Symptoms <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('reason', { required: "Reason is required" })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe your symptoms or reason for consultation"
                />
                {errors.reason && <span className="text-red-500 text-xs">{errors.reason.message}</span>}
              </div>
            </div>
          </div>

          {/* Appointment Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-blue-600 mr-2">📅</span>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Appointment Preferences</h2>
            </div>
            {/* Only show available dates */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Date</h3>
              <div className="flex flex-wrap gap-2">
                {availableDates.length === 0 && (
                  <span className="text-gray-400">No available dates</span>
                )}
                {availableDates.map(date => (
                  <button
                    type="button"
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTimeSlot('');
                    }}
                    className={`px-4 py-2 text-sm rounded-lg border ${
                      selectedDate === date
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
            {/* Show time slots for selected date */}
            {selectedDate && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Time Slot</h3>
                <div className="flex flex-wrap gap-2">
                  {slotsByDate[selectedDate]?.map((time, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`px-4 py-2 text-sm rounded-lg border ${
                        selectedTimeSlot === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              type="button"
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => {
                reset();
                setSelectedDate('');
                setSelectedTimeSlot('');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
        )}

        {/* Summary Modal/Section */}
        {showSummary && summaryData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Booking Summary</h2>
            <div className="mb-2"><b>Doctor:</b> {summaryData.doctor.name} ({summaryData.doctor.specialization})</div>
            <div className="mb-2"><b>Contact:</b> {summaryData.doctor.contact}</div>
            <div className="mb-2"><b>Email:</b> {summaryData.doctor.email}</div>
            <div className="mb-2"><b>Patient Name:</b> {summaryData.fullName}</div>
            <div className="mb-2"><b>Age:</b> {summaryData.age}</div>
            <div className="mb-2"><b>Gender:</b> {summaryData.gender}</div>
            <div className="mb-2"><b>Phone:</b> {summaryData.phoneNumber}</div>
            <div className="mb-2"><b>Email:</b> {summaryData.email}</div>
            <div className="mb-2"><b>Address:</b> {summaryData.address}</div>
            <div className="mb-2"><b>Reason:</b> {summaryData.reason}</div>
            <div className="mb-2"><b>Date:</b> {summaryData.date}</div>
            <div className="mb-2"><b>Time Slot:</b> {summaryData.timeSlot}</div>
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowSummary(false)}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingAppointment;