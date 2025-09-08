import React, { useState } from 'react';

const DoctorDetail = () => {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  const doctor = {
    name: "Dr. Ayush Sharma",
    specialty: "Cardiologist",
    hospital: "City General Hospital",
    experience: "12+ years experience",
    rating: 4.8,
    reviews: 246,
    verified: true,
    rightToHeal: true,
    phone: "+91 12356789",
    education: [
      "MBBS - All India Institute of Medical Sciences, New Delhi",
      "MD Cardiology - Post Graduate Institute of Medical Education and Research",
      "Fellowship in Interventional Cardiology - Cleveland Clinic, USA"
    ],
    areasOfExpertise: [
      "Heart Surgery",
      "Cardiac Imaging",
      "Interventional Cardiology", 
      "Echocardiography",
      "Preventive Cardiology",
      "Heart Failure"
    ],
    description: "Dr. Ayush is a senior cardiologist at City General Hospital with 12 years of experience in heart-related treatments. He specializes in interventional cardiology and has performed over 500 successful cardiac procedures. His approach combines cutting-edge technology with compassionate care, ensuring patients receive the best possible treatment for their heart conditions.",
    address: "City General Hospital, 123 Medical Avenue, New Delhi, 110001",
    consultationFee: "₹500 per session",
    cancellationPolicy: "Free cancellation up to 4 hours before appointment. 50% fee applies for later cancellations.",
    preparationInstructions: "Bring previous medical reports, list of current medications, and arrive 15 minutes before appointment time."
  };

  const timeSlots = {
    Today: {
      Morning: ["9:00 AM", "10:30 AM"],
      Afternoon: ["2:00 PM", "3:30 PM", "5:00 PM"],
      Evening: ["6:30 PM", "8:00 PM"]
    },
    Tomorrow: {
      Morning: ["9:00 AM", "10:30 AM", "12:00 PM"],
      Afternoon: ["2:00 PM", "3:30 PM", "5:00 PM"],
      Evening: ["6:30 PM", "8:00 PM", "9:30 PM"]
    },
    "This Week": {
      Morning: ["9:00 AM", "10:30 AM", "12:00 PM"],
      Afternoon: ["2:00 PM", "3:30 PM", "5:00 PM"],
      Evening: ["6:30 PM", "8:00 PM", "9:30 PM"]
    }
  };

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      review: "Dr. Ayush is an excellent cardiologist. He took the time to explain my condition in detail and answered all my questions patiently. The treatment he prescribed has significantly improved my heart health. Highly recommended!"
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      date: "1 month ago",
      review: "After experiencing chest pain, I consulted Dr. Ayush who immediately diagnosed the issue and recommended appropriate treatment. His expertise and calm demeanor helped ease my anxiety. The hospital staff was also very supportive."
    },
    {
      name: "Anita Patel",
      rating: 4,
      date: "2 months ago",
      review: "Dr. Sharma is very knowledgeable and professional. The only reason I'm giving 4 stars instead of 5 is the long waiting time, even with an appointment. However, the quality of care makes up for it."
    }
  ];

  const otherDoctors = [
    {
      name: "Dr. Meera Reddy",
      specialty: "Cardiologist",
      hospital: "City General Hospital"
    },
    {
      name: "Dr. Vikram Singh",
      specialty: "Cardiologist", 
      hospital: "City General Hospital"
    },
    {
      name: "Dr. Anjali Gupta",
      specialty: "Cardiologist",
      hospital: "City General Hospital"
    }
  ];

  const patientAppreciations = [
    "Paid consultation", "Thorough Examination", "On time", "Compassionate",
    "Excellent Follow-up", "Modern Treatment Methods", "Listens Well"
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ));
  };

  const getSlotStatus = (slot, period) => {
    if (selectedDay === 'Today') {
      if (period === 'Morning' && slot === '9:00 AM') return 'booked';
      if (period === 'Afternoon' && slot === '2:00 PM') return 'booked';
      if (period === 'Evening' && slot === '8:00 PM') return 'booked';
    }
    return 'available';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Profile */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <div className="flex items-start">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mr-6 border border-teal-400">
                  <span className="text-3xl text-teal-600">👨‍⚕️</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-teal-600 font-medium mb-1">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-2">{doctor.hospital}</p>
                  <p className="text-gray-600 mb-3">📅 {doctor.experience}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {doctor.rating} ({doctor.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    {doctor.verified && (
                      <div className="flex items-center text-teal-600">
                        <span className="mr-1">✓</span>
                        Verified
                      </div>
                    )}
                    {doctor.rightToHeal && (
                      <div className="flex items-center text-teal-600">
                        <span className="mr-1">🏥</span>
                        Right to Heal
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <span className="mr-1">📞</span>
                      {doctor.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Doctor */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Dr. Ayush Sharma</h2>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Education & Qualifications</h3>
                <ul className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-teal-600 mr-2 mt-1">🎓</span>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.areasOfExpertise.map((area, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 border border-teal-400 bg-white text-teal-700 text-sm rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{doctor.description}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="bg-gray-100 h-40 rounded-lg mb-4 flex items-center justify-center border border-teal-200">
                <span className="text-gray-500">🗺️ Map Location</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-teal-400 mr-3 mt-1">📍</span>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-700">{doctor.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-teal-400 mr-3 mt-1">📞</span>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-700">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-teal-400 mr-3 mt-1">📱</span>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                    <p className="text-gray-700">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-teal-400 mr-3 mt-1">🌐</span>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Website</p>
                    <p className="text-teal-600">www.citygeneralhospital.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1">💰</span>
                  <div>
                    <p className="font-medium text-gray-900">Consultation Fee</p>
                    <p className="text-gray-700">{doctor.consultationFee}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1">🏥</span>
                  <div>
                    <p className="font-medium text-gray-900">Insurance Accepted</p>
                    <p className="text-gray-700">All major health insurance providers including CGHS, Mediclaim, Star Health</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1">🔄</span>
                  <div>
                    <p className="font-medium text-gray-900">Cancellation Policy</p>
                    <p className="text-gray-700">{doctor.cancellationPolicy}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-teal-600 mr-3 mt-1">📋</span>
                  <div>
                    <p className="font-medium text-gray-900">Preparation Instructions</p>
                    <p className="text-gray-700">{doctor.preparationInstructions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Reviews */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Patient Reviews</h2>
                <button className="text-teal-600 hover:text-teal-800 border border-teal-400 px-3 py-1 rounded transition">+ Write a Review</button>
              </div>

              <div className="flex items-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mr-4">4.8</div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-1">
                      <span className="text-sm text-gray-600 w-4">{star}</span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ 
                            width: star === 5 ? '80%' : star === 4 ? '15%' : star === 3 ? '3%' : star === 2 ? '1%' : '1%'
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {star === 5 ? '192' : star === 4 ? '36' : star === 3 ? '7' : star === 2 ? '2' : '1'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What Patients Appreciate Most */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What Patients Appreciate Most</h2>
              <div className="flex flex-wrap gap-2">
                {patientAppreciations.map((appreciation, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 border border-teal-400 bg-white text-teal-700 text-sm rounded-md"
                  >
                    {appreciation}
                  </span>
                ))}
              </div>
            </div>

            {/* Other Cardiologists */}
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Other Cardiologists at City General Hospital</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {otherDoctors.map((doc, index) => (
                  <div key={index} className="text-center p-4 border border-teal-400 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white">
                    <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-teal-400">
                      <span className="text-2xl text-teal-600">👨‍⚕️</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                    <p className="text-sm text-teal-600 mb-1">{doc.specialty}</p>
                    <p className="text-xs text-gray-600">{doc.hospital}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-teal-400 shadow-none p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
              
              {/* Day Selection */}
              <div className="flex mb-6">
                {['Today', 'Tomorrow', 'This Week'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg mr-2 last:mr-0 border border-teal-400 ${
                      selectedDay === day 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-white text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Calendar View */}
              <div className="grid grid-cols-7 gap-1 mb-6 text-center text-sm">
                <div className="text-teal-500 py-2">M</div>
                <div className="text-teal-500 py-2">T</div>
                <div className="text-teal-500 py-2">W</div>
                <div className="text-teal-500 py-2">T</div>
                <div className="text-teal-500 py-2">F</div>
                <div className="text-teal-500 py-2">S</div>
                <div className="text-teal-500 py-2">S</div>
                
                <div className="text-gray-400 py-2">12</div>
                <div className="text-gray-400 py-2">13</div>
                <div className="text-gray-400 py-2">14</div>
                <div className="bg-teal-600 text-white py-2 rounded">{15}</div>
                <div className="text-gray-900 py-2">16</div>
                <div className="text-gray-900 py-2">17</div>
                <div className="text-gray-900 py-2">18</div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4 mb-6">
                {Object.entries(timeSlots[selectedDay]).map(([period, slots]) => (
                  <div key={period}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{period}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {slots.map((slot, index) => {
                        const status = getSlotStatus(slot, period);
                        return (
                          <button
                            key={index}
                            onClick={() => status === 'available' && setSelectedTimeSlot(slot)}
                            className={`p-2 text-xs rounded border text-center border-teal-400 ${
                              status === 'booked' 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-dashed' 
                                : selectedTimeSlot === slot
                                ? 'bg-teal-600 text-white border-teal-600'
                                : 'bg-white text-teal-700 hover:bg-teal-50'
                            }`}
                            disabled={status === 'booked'}
                          >
                            {slot}
                            {status === 'booked' && <div className="text-xs">Booked</div>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Available at Hospital */}
              <div className="flex items-center mb-4 text-teal-600">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                <span className="text-sm">Available at Hospital Today</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 font-medium">
                  📅 Book Appointment
                </button>
                
                <button className="w-full border border-teal-600 text-teal-600 py-3 rounded-lg hover:bg-teal-50 font-medium">
                  💻 Video Consultation
                </button>
                
                <button className="w-full border border-teal-400 text-teal-700 py-3 rounded-lg hover:bg-teal-50">
                  ❤️ Add to Favorites
                </button>
                
                <button className="w-full border border-teal-400 text-teal-700 py-3 rounded-lg hover:bg-teal-50">
                  📄 Share Doctor Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;