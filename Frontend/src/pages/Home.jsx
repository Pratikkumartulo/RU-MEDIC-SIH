import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // GSAP refs
  const cardRefs = useRef([]);
  const pageRef = useRef(null);

  useEffect(() => {
    // Page fade-in
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Cards scroll-in animation
    cardRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const onSearch = (data) => {
    const params = new URLSearchParams(data).toString();
    navigate(`/findhospital/params?${params}`);
  };

  // Card data
  const cardData = [
    {
      icon: (
        <div className="bg-gradient-to-tr from-teal-400 to-teal-600 p-4 rounded-full shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v-2m-4 0v2m8-2v2M8 10h8m-8 0a4 4 0 004-4v0a4 4 0 00-4 4z" />
          </svg>
        </div>
      ),
      title: "Online Doctor Consultations",
      desc: "Consult with qualified doctors through secure video calls from the comfort of your home.",
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-teal-400 to-teal-600 p-4 rounded-full shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 8v4l3 3" />
            <circle cx={12} cy={12} r={10} />
          </svg>
        </div>
      ),
      title: "Real-time Doctor Availability",
      desc: "Check which doctors are available right now and book appointments instantly.",
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-teal-400 to-teal-600 p-4 rounded-full shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 8v4l3 3" />
            <circle cx={12} cy={12} r={10} />
          </svg>
        </div>
      ),
      title: "Medicine Stock Updates",
      desc: "Get real-time updates on medicine availability at near-by pharmacies before you travel.",
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-teal-400 to-teal-600 p-4 rounded-full shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M9 12h3.75M9 15h3.75M9 18h3.75M15 8h.01M21 12v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
          </svg>
        </div>
      ),
      title: "AI-Powered Symptom Checker",
      desc: "Describe your symptoms and get preliminary guidance on what steps to take next.",
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-teal-400 to-teal-600 p-4 rounded-full shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M18.364 5.636l-12.728 12.728M6 12h12" />
          </svg>
        </div>
      ),
      title: "24/7 Emergency Support",
      desc: "Access emergency medical support and ambulance services round the clock.",
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-teal-400 to-teal-600 p-4 rounded-full shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M9 12h6M12 9v6" />
            <circle cx={12} cy={12} r={9} />
          </svg>
        </div>
      ),
      title: "Secure Health Records",
      desc: "Keep your medical history safe and accessible to authorized healthcare providers only.",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header / Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold rounded-full px-3 py-1 mb-4 border border-teal-200">
            Trusted by 173+ Villages
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-800">
            RU-MEDIC: <br />
            <span className="text-teal-600">Your Rural</span>{" "}
            <span className="text-teal-700">Healthcare</span>{" "}
            <span className="text-teal-800">Companion</span>
          </h1>
          <p className="mb-10 text-gray-600 max-w-xl">
            Book doctors, find medicines, and access quality healthcare anytime,
            anywhere. Bridging the gap between rural communities and modern
            medical care.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/hospitalnearby"
              className="px-6 py-3 border-2 border-teal-500 text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              Find Nearby Hospital
            </Link>
            <Link
              to="/bookappointment"
              className="px-6 py-3 border-2 border-teal-500 text-teal-700 rounded-lg font-semibold hover:bg-teal-50 transition"
            >
              Book Appointment
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-teal-500" />
              24/7 Available
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-teal-400" />
              Verified Doctors
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-teal-500" />
              Real-time Updates
            </div>
          </div>
        </div>
      </section>

      {/* Find What You Need */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-center text-xl font-semibold mb-6 text-gray-800">
          Find What You Need
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Search for doctors, hospitals, or medicines in your area
        </p>
        <div className="bg-white border border-teal-200 rounded-xl p-6">
          <div className="flex justify-center gap-8 mb-6 text-gray-700 font-semibold">
            <button className="px-4 py-2 rounded-full border-2 border-teal-500 text-teal-700 bg-white cursor-default">
              Hospitals
            </button>
            <button className="px-4 py-2 rounded-full border-2 border-teal-500 text-teal-700 bg-white hover:bg-teal-50 transition cursor-pointer">
              Doctors
            </button>
            <button className="px-4 py-2 rounded-full border-2 border-teal-500 text-teal-700 bg-white hover:bg-teal-50 transition cursor-pointer">
              Medicines
            </button>
          </div>
          <form
            className="flex flex-wrap gap-4 justify-center items-center"
            onSubmit={handleSubmit(onSearch)}
          >
            <input
              type="text"
              placeholder="Search Hospitals"
              className="border border-teal-300 rounded-lg py-2 px-4 w-full max-w-md focus:outline-teal-500"
              {...register("search")}
            />
            {errors.search && (
              <span className="text-red-500 text-xs w-full text-center">{errors.search.message}</span>
            )}
            <input
              type="text"
              placeholder="Your location"
              className="border border-teal-300 rounded-lg py-2 px-4 w-48 focus:outline-teal-500"
              {...register("location")}
            />
            {errors.location && (
              <span className="text-red-500 text-xs w-full text-center">{errors.location.message}</span>
            )}
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Search Now
            </button>
            <div className="w-full text-right text-sm mt-2 cursor-pointer text-teal-700 hover:underline">
              Advanced Filters
            </div>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            Popular searches:{" "}
            <span className="border border-teal-200 text-teal-700 px-3 py-1 rounded-full cursor-pointer hover:bg-teal-50">
              General Doctor
            </span>
            <span className="border border-teal-200 text-teal-700 px-3 py-1 rounded-full cursor-pointer hover:bg-teal-50">
              Pediatrician
            </span>
            <span className="border border-teal-200 text-teal-700 px-3 py-1 rounded-full cursor-pointer hover:bg-teal-50">
              Emergency Care
            </span>
            <span className="border border-teal-200 text-teal-700 px-3 py-1 rounded-full cursor-pointer hover:bg-teal-50">
              Pharmacy Near Me
            </span>
          </div>
        </div>
      </section>

      {/* Everything You Need for Better Health */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-50 text-teal-600 rounded-full px-4 py-2 text-lg font-semibold mb-3 border border-teal-200 shadow">
            Comprehensive Healthcare Solutions
          </span>
          <h2 className="text-4xl font-extrabold mb-3 text-gray-800 drop-shadow-sm">Everything You Need for Better Health</h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg">
            Our platform brings modern healthcare technology to rural communities, making quality medical care accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {cardData.map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
              ref={el => (cardRefs.current[idx] = el)}
              className="bg-white border-2 border-teal-300 rounded-2xl p-10 flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-300 scale-100 hover:scale-105 cursor-pointer relative overflow-hidden group"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-teal-100 rounded-full opacity-30 blur-2xl group-hover:scale-110 transition-transform duration-300"></div>
              {icon}
              <h3 className="text-2xl font-bold mb-3 text-gray-800 text-center drop-shadow">{title}</h3>
              <p className="text-gray-500 text-center text-lg">{desc}</p>
              <button className="mt-6 text-teal-700 font-semibold text-base flex items-center gap-2 hover:underline hover:text-teal-900 transition">
                Learn More
                <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Serving Rural India Stats */}
      <div className="mt-20 bg-white border border-teal-200 rounded-xl max-w-4xl mx-auto p-6 text-center text-gray-700 space-y-3">
        <h4 className="font-semibold text-teal-700 mb-3">Serving Rural India</h4>
        <p className="mb-6 max-w-2xl mx-auto text-gray-500">
          Our network spans across remote villages, ensuring that distance is no longer a barrier to quality healthcare.
        </p>
        <div className="flex justify-center gap-16 text-center text-gray-800 font-bold text-lg">
          <div>
            <div className="text-2xl text-teal-700">173+</div>
            <div>Villages Connected</div>
          </div>
          <div>
            <div className="text-2xl text-teal-700">11+</div>
            <div>Qualified Doctors</div>
          </div>
          <div>
            <div className="text-2xl text-teal-700">24/7</div>
            <div>Support Available</div>
          </div>
        </div>
      </div>

      {/* Quick Access to Healthcare */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
        <h2 className="text-center text-3xl font-extrabold mb-12 text-gray-800">
          Quick Access to Healthcare
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-500 mb-12">
          Get instant access to the healthcare services you need with just one click
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 max-w-7xl mx-auto">
          {[
            { icon: "🩺", title: "Find Doctors", link: "/finddoctors" },
            { icon: "🏥", title: "View Hospitals", link: "/hospitals" },
            { icon: "💊", title: "Order Medicines", link: "/medicines" },
            { icon: "🩹", title: "Check Symptoms", link: "/symptoms" },
            { icon: "🚨", title: "Emergency Care", link: "/emergency" },
            { icon: "📅", title: "Book Appointment", link: "/bookappointment" },
            { icon: "🏩", title: "Health Centers", link: "/healthcenters" },
            { icon: "👥", title: "Community", link: "/community" },
          ].map(({ icon, title, link }, idx) => (
            <Link
              key={idx}
              to={link}
              className="flex flex-col items-center justify-center space-y-2 py-6 border-2 border-teal-200 bg-white rounded-lg hover:bg-teal-50 transition text-teal-700 font-semibold text-sm cursor-pointer"
            >
              <div className="text-3xl">{icon}</div>
              <div>{title}</div>
              <div className="text-teal-600 text-xs flex items-center gap-1">
                Learn More
                <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-20 bg-white border-2 border-teal-200 rounded-xl py-10 px-6 text-teal-700 text-center max-w-5xl mx-auto shadow-none">
          <h3 className="text-xl font-semibold mb-4">
            Need Help Getting Started?
          </h3>
          <p className="mb-6 max-w-xl mx-auto text-gray-500">
            Our support team is here to guide you through using RU-MEDIC for the first time.
          </p>
          <button className="border-2 border-teal-500 text-teal-700 px-6 py-2 rounded-full font-semibold hover:bg-teal-50 transition inline-flex items-center justify-center gap-2 mx-auto">
            📞 Contact Support
          </button>
        </div>
      </section>

      {/* Our Impact */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white text-gray-900">
        <h2 className="text-center text-3xl font-extrabold mb-12 text-gray-800">
          Our Impact
        </h2>
        <p className="text-center max-w-xl mx-auto text-gray-500 mb-12">
          Making healthcare accessible across rural India
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white border-2 border-teal-200 rounded-xl py-10 px-6">
            <div className="text-3xl font-bold text-teal-700 mb-2">173</div>
            <div className="text-gray-700 font-semibold">Villages Served</div>
          </div>
          <div className="bg-white border-2 border-teal-200 rounded-xl py-10 px-6">
            <div className="text-3xl font-bold text-teal-700 mb-2">11+</div>
            <div className="text-gray-700 font-semibold">Doctors Available</div>
          </div>
          <div className="bg-white border-2 border-teal-200 rounded-xl py-10 px-6">
            <div className="text-3xl font-bold text-teal-700 mb-2">24/7</div>
            <div className="text-gray-700 font-semibold">Medicine Tracking</div>
          </div>
        </div>
      </section>

      {/* What Our Community Says */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-3xl font-extrabold mb-6 text-gray-800">
          What Our Community Says
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-500 mb-14">
          Real stories from real people
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          {[
            {
              name: "Priya Sharma",
              feedback:
                "“RU-MEDIC helped me find a doctor when my child was sick at midnight. The online consultation saved us a trip to the city.”",
              position: "Moradabad Village",
            },
            {
              name: "Rajesh Kumar",
              feedback:
                "“I can now order medicines availability before visiting to the pharmacy. This has made healthcare so much easier for our family.”",
              position: "Bijnor District",
            },
            {
              name: "Sunita Devi",
              feedback:
                "“The symptom checker helped me understand my condition better before visiting the doctor. Very helpful for rural areas like ours.”",
              position: "Sitapur Village",
            },
          ].map(({ name, feedback, position }, i) => (
            <div
              key={i}
              className="bg-white border-2 border-teal-200 p-6 rounded-xl flex flex-col justify-between"
            >
              <p className="text-gray-600 mb-6 italic">"{feedback}"</p>
              <div className="font-semibold text-teal-700">{name}</div>
              <div className="text-sm text-gray-400">{position}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;