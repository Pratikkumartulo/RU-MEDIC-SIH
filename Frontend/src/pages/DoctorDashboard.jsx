import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import DocumentService from "../Appwrite/CreateDocument";

import {
  FaCalendarAlt,
  FaClock,
  FaUserFriends,
  FaRegEdit,
  FaSignOutAlt,
  FaEnvelope,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

function mapSlotFromAppwrite(slot, idx) {
  // Parse date to readable string
  const dateObj = new Date(slot.date);
  const dateStr = dateObj.toDateString(); // e.g., "Tue, Jan 16, 2024"

  // Split timeSlot into start and end
  let startTime = "", endTime = "";
  if (slot.timeSlot && slot.timeSlot.includes("-")) {
    [startTime, endTime] = slot.timeSlot.split("-");
  }

  // Determine status
  const status = slot.isFull ? "Full" : "Available";

  return {
    id: slot.$id || idx + 1,
    date: dateStr,
    startTime,
    endTime,
    capacity: slot.capacity,
    booked: slot.booked,
    status,
  };
}

const initialSlots = [
  // {
  //   id: 1,
  //   date: "Mon, Jan 15, 2024",
  //   startTime: "9:00 AM",
  //   endTime: "10:00 AM",
  //   capacity: 5,
  //   booked: 2,
  //   status: "Available",
  // },
  // {
  //   id: 2,
  //   date: "Mon, Jan 15, 2024",
  //   startTime: "10:00 AM",
  //   endTime: "11:00 AM",
  //   capacity: 3,
  //   booked: 3,
  //   status: "Full",
  // },
  // {
  //   id: 3,
  //   date: "Tue, Jan 16, 2024",
  //   startTime: "2:00 PM",
  //   endTime: "3:00 PM",
  //   capacity: 4,
  //   booked: 1,
  //   status: "Available",
  // },
];

const DoctorDashboard = () => {
  const [slots, setSlots] = useState(initialSlots);
  const doctor = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchSlots = async () => {
      const doctorDetails = await DocumentService.getDoctorEmailDetails(doctor.email);
      if (!doctorDetails) return;
      const docSlots = await DocumentService.getDoctorSlots(doctorDetails.$id);
      // docSlots.documents is usually the array from Appwrite
      const mappedSlots = docSlots.documents.map(mapSlotFromAppwrite);
      setSlots(mappedSlots);
    };
    fetchSlots();
    // Add doctor.docId as dependency
  }, [doctor?.docId]);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      capacity: 1,
    },
  });

  const onAddSlot = async (data) => {
    console.log(doctor);
    const doctorDetails = await DocumentService.getDoctorEmailDetails(doctor.email);
    console.log(doctorDetails);
    await DocumentService.addAvailable({ docId: doctorDetails.$id, data });
    // Fetch and update slots after adding
    const docSlots = await DocumentService.getDoctorSlots(doctorDetails.$id);
    const mappedSlots = docSlots.documents.map(mapSlotFromAppwrite);
    setSlots(mappedSlots);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white shadow-md flex flex-row md:flex-col justify-between py-4 md:py-6 px-4 md:px-0">
        <div>
          <div className="flex items-center md:px-6 mb-6 md:mb-10">
            <div className="bg-blue-600 p-2 rounded-lg text-white mr-3">
              <FaCalendarAlt size={24} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">RU-Medic</h1>
              <p className="text-xs md:text-sm text-gray-500">Doctor Portal</p>
            </div>
          </div>
          <ul className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 text-gray-700 text-sm overflow-x-auto">
            <li className="px-3 md:px-6 py-2 md:py-3 bg-blue-100 text-blue-700 rounded flex items-center space-x-2 cursor-pointer">
              <FaCalendarAlt />
              <span>My Slots</span>
            </li>
            <li className="px-3 md:px-6 py-2 md:py-3 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer text-gray-400">
              <FaClipboardList />
              <span>Appointments</span>
            </li>
            <li className="px-3 md:px-6 py-2 md:py-3 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer text-gray-400">
              <FaEnvelope />
              <span>Messages</span>
            </li>
            <li className="px-3 md:px-6 py-2 md:py-3 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer text-gray-400">
              <FaUser />
              <span>Profile</span>
            </li>
          </ul>
        </div>
        <button className="px-3 md:px-6 py-2 md:py-3 text-gray-600 hover:bg-gray-100 flex items-center space-x-2">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">My Slots</h2>
        <p className="text-gray-600 mb-6">
          Manage your availability and appointment slots
        </p>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Add New Slot Form */}
          <section className="bg-white rounded-lg shadow p-4 md:p-6 flex-1 max-w-lg w-full">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center space-x-2">
              <FaCalendarAlt />
              <span>Add New Slot</span>
            </h3>
            <form onSubmit={handleSubmit(onAddSlot)} className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 mb-1 font-semibold"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <span className="text-red-500 text-xs">{errors.date.message}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-1 font-semibold"
                    htmlFor="startTime"
                  >
                    <div className="flex items-center space-x-1">
                      <FaClock />
                      <span>Start Time</span>
                    </div>
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("startTime", { required: "Start time is required" })}
                  />
                  {errors.startTime && (
                    <span className="text-red-500 text-xs">{errors.startTime.message}</span>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    className="block text-gray-700 mb-1 font-semibold"
                    htmlFor="endTime"
                  >
                    <div className="flex items-center space-x-1">
                      <FaClock />
                      <span>End Time</span>
                    </div>
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("endTime", { required: "End time is required" })}
                  />
                  {errors.endTime && (
                    <span className="text-red-500 text-xs">{errors.endTime.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="block text-gray-700 mb-1 font-semibold"
                  htmlFor="capacity"
                >
                  <div className="flex items-center space-x-1">
                    <FaUserFriends />
                    <span>Capacity</span>
                  </div>
                </label>
                <input
                  id="capacity"
                  type="number"
                  min="2"
                  max="5"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("capacity", {
                    required: "Capacity is required",
                    min: { value: 2, message: "Minimum capacity is 2" },
                    max: { value: 5, message: "Maximum capacity is 5" },
                  })}
                />
                {errors.capacity && (
                  <span className="text-red-500 text-xs">{errors.capacity.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold rounded px-4 py-3 hover:bg-blue-700 transition"
              >
                + Add Slot
              </button>
            </form>
          </section>

          {/* Available Slots Table */}
          <section className="flex-1 w-full overflow-x-auto">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center space-x-2">
                <FaCalendarAlt />
                <span>Available Slots</span>
              </h3>
              <p className="text-gray-600 mb-4">
                Manage your appointment availability
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-gray-700 text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 md:py-3 px-2 md:px-4">Date</th>
                      <th className="py-2 md:py-3 px-2 md:px-4">Time</th>
                      <th className="py-2 md:py-3 px-2 md:px-4">
                        <div className="flex items-center gap-1">
                          <FaUserFriends /> Capacity
                        </div>
                      </th>
                      <th className="py-2 md:py-3 px-2 md:px-4">Status</th>
                      <th className="py-2 md:py-3 px-2 md:px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...slots].reverse().map(
                      ({ id, date, startTime, endTime, capacity, booked, status }) => (
                        <tr
                          key={id}
                          className="border-b last:border-0 bg-white hover:bg-gray-50"
                        >
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                              <FaCalendarAlt /> {date}
                            </span>
                          </td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                              <FaClock /> {startTime} - {endTime}
                            </span>
                          </td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FaUserFriends /> {booked}/{capacity}
                            </span>
                          </td>
                          <td className="py-2 md:py-3 px-2 md:px-4">
                            <span
                              className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                                status === "Available"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="py-2 md:py-3 px-2 md:px-4">
                            <button className="text-gray-500 hover:text-blue-600">
                              <FaRegEdit />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                    {slots.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-400">
                          No Slots Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
