import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSearch = (data) => {
    // Build query string from form data
    const params = new URLSearchParams(data).toString();
    navigate(`/findhospital/params?${params}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header / Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold rounded-full px-3 py-1 mb-4">
            Trusted by 173+ Villages
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            RU-MEDIC: <br />
            <span className="text-blue-600">Your Rural</span>{" "}
            <span className="text-green-600">Healthcare</span>{" "}
            <span className="text-green-700">Companion</span>
          </h1>
          <p className="mb-10 text-gray-700 max-w-xl">
            Book doctors, find medicines, and access quality healthcare anytime,
            anywhere. Bridging the gap between rural communities and modern
            medical care.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/hospitalnearby"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-semibold"
            >
              Find Nearby Hospital
            </Link>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition">
              <Link to={'/bookappointment'}>Book Appointment</Link>
            </button>
          </div>
          <div className="mt-8 flex items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-green-500" />
              24/7 Available
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-blue-500" />
              Verified Doctors
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-green-500" />
              Real-time Updates
            </div>
          </div>
        </div>
        {/* <div className="md:w-1/2 relative">
          <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md mx-auto md:mx-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-green-400 text-white font-bold w-10 h-10 flex items-center justify-center">
                    Dr
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dr. Amit Sharma</div>
                    <div className="text-sm text-gray-600">Available Now - General Medicine</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-400 text-white font-bold w-10 h-10 flex items-center justify-center">
                    💊
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Paracetamol 500mg</div>
                    <div className="text-sm text-gray-600">In Stock - Nearby Pharmacy</div>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-semibold">Available</span>
              </div>
              <div className="flex items-center justify-between bg-purple-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-400 text-white font-bold w-10 h-10 flex items-center justify-center">
                    🏥
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Rural Health Center</div>
                    <div className="text-sm text-gray-600">7 km away - Open 24/7</div>
                  </div>
                </div>
                <span className="text-sm text-red-600 font-semibold">Open</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              +
            </div>
            <div className="absolute bottom-4 left-4 bg-green-500 hover:bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
              ❤️
            </div>
          </div>
        </div> */}
      </section>

      {/* Find What You Need */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-center text-xl font-semibold mb-6">
          Find What You Need
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Search for doctors, hospitals, or medicines in your area
        </p>
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="flex justify-center gap-8 mb-6 text-gray-700 font-semibold">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white cursor-default">
              Hospitals
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
              Doctors
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
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
              className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md focus:outline-blue-600"
              {...register("search")}
            />
            {errors.search && (
              <span className="text-red-500 text-xs w-full text-center">{errors.search.message}</span>
            )}
            <input
              type="text"
              placeholder="Your location"
              className="border border-gray-300 rounded-lg py-2 px-4 w-48 focus:outline-blue-600"
              {...register("location")}
            />
            {errors.location && (
              <span className="text-red-500 text-xs w-full text-center">{errors.location.message}</span>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Search Now
            </button>
            <div className="w-full text-right text-sm mt-2 cursor-pointer text-blue-700 hover:underline">
              Advanced Filters
            </div>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            Popular searches:{" "}
            <span className="bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
              General Doctor
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
              Pediatrician
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
              Emergency Care
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">
              Pharmacy Near Me
            </span>
          </div>
        </div>
      </section>

      {/* Everything You Need for Better Health */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold mb-3">
            Comprehensive Healthcare Solutions
          </span>
          <h2 className="text-3xl font-extrabold mb-3">Everything You Need for Better Health</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our platform brings modern healthcare technology to rural communities, making quality medical care accessible to everyone.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14v-2m-4 0v2m8-2v2M8 10h8m-8 0a4 4 0 004-4v0a4 4 0 00-4 4z"
                  />
                </svg>
              ),
              title: "Online Doctor Consultations",
              desc: "Consult with qualified doctors through secure video calls from the comfort of your home.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 8v4l3 3" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
              ),
              title: "Real-time Doctor Availability",
              desc: "Check which doctors are available right now and book appointments instantly.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 8v4l3 3" />
                  <circle cx={12} cy={12} r={10} />
                </svg>
              ),
              title: "Medicine Stock Updates",
              desc: "Get real-time updates on medicine availability at near-by pharmacies before you travel.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 12h3.75M9 15h3.75M9 18h3.75M15 8h.01M21 12v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                </svg>
              ),
              title: "AI-Powered Symptom Checker",
              desc: "Describe your symptoms and get preliminary guidance on what steps to take next.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M18.364 5.636l-12.728 12.728M6 12h12" />
                </svg>
              ),
              title: "24/7 Emergency Support",
              desc: "Access emergency medical support and ambulance services round the clock.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 12h6M12 9v6" />
                  <circle cx={12} cy={12} r={9} />
                </svg>
              ),
              title: "Secure Health Records",
              desc: "Keep your medical history safe and accessible to authorized healthcare providers only.",
            },
          ].map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-default"
            >
              <div>{icon}</div>
              <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
              <button className="mt-3 text-blue-600 font-semibold text-sm hover:underline">
                Learn more &rarr;
              </button>
            </div>
          ))}
        </div>

        {/* Serving Rural India Stats */}
        <div className="mt-20 bg-gray-50 border rounded-xl max-w-4xl mx-auto p-6 text-center text-gray-700 space-y-3">
          <h4 className="font-semibold text-blue-600 mb-3">Serving Rural India</h4>
          <p className="mb-6 max-w-2xl mx-auto">
            Our network spans across remote villages, ensuring that distance is no longer a barrier to quality healthcare.
          </p>
          <div className="flex justify-center gap-16 text-center text-gray-800 font-bold text-lg">
            <div>
              <div className="text-2xl text-blue-700">173+</div>
              <div>Villages Connected</div>
            </div>
            <div>
              <div className="text-2xl text-green-700">11+</div>
              <div>Qualified Doctors</div>
            </div>
            <div>
              <div className="text-2xl text-blue-700">24/7</div>
              <div>Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access to Healthcare */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
        <h2 className="text-center text-3xl font-extrabold mb-12">
          Quick Access to Healthcare
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
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
              className="flex flex-col items-center justify-center space-y-2 py-6 bg-gray-100 rounded-lg hover:bg-blue-50 transition text-gray-700 font-semibold text-sm cursor-pointer"
            >
              <div className="text-3xl">{icon}</div>
              <div>{title}</div>
              <div className="text-blue-600 text-xs">Access Now &rarr;</div>
            </Link>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl py-10 px-6 text-white text-center max-w-5xl mx-auto shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Need Help Getting Started?
          </h3>
          <p className="mb-6 max-w-xl mx-auto">
            Our support team is here to guide you through using RU-MEDIC for the first time.
          </p>
          <button className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2 mx-auto">
            📞 Contact Support
          </button>
        </div>
      </section>

      {/* Our Impact */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 text-gray-900">
        <h2 className="text-center text-3xl font-extrabold mb-12">
          Our Impact
        </h2>
        <p className="text-center max-w-xl mx-auto text-gray-700 mb-12">
          Making healthcare accessible across rural India
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl shadow-md py-10 px-6">
            <div className="text-3xl font-bold text-blue-700 mb-2">173</div>
            <div className="text-gray-700 font-semibold">Villages Served</div>
          </div>
          <div className="bg-white rounded-xl shadow-md py-10 px-6">
            <div className="text-3xl font-bold text-green-700 mb-2">11+</div>
            <div className="text-gray-700 font-semibold">Doctors Available</div>
          </div>
          <div className="bg-white rounded-xl shadow-md py-10 px-6">
            <div className="text-3xl font-bold text-blue-700 mb-2">24/7</div>
            <div className="text-gray-700 font-semibold">Medicine Tracking</div>
          </div>
        </div>
      </section>

      {/* What Our Community Says */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-3xl font-extrabold mb-6">
          What Our Community Says
        </h2>
        <p className="text-center max-w-3xl mx-auto text-gray-700 mb-14">
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
              className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between"
            >
              <p className="text-gray-700 mb-6 italic">"{feedback}"</p>
              <div className="font-semibold text-blue-700">{name}</div>
              <div className="text-sm text-gray-500">{position}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-14 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-blue-500 text-xl font-bold">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                ></path>
              </svg>
              RU-MEDIC
            </div>
            <p className="text-gray-400 max-w-sm">
              Healthcare for every village. Connecting rural communities with
              quality medical care through technology.
            </p>
            <div className="flex gap-4 mt-6 text-gray-400 text-xl">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12.074C22 6.483 17.517 2 11.926 2 6.484 2 2 6.483 2 12.074 2 17.1 5.657 21.22 10.438 22v-7.019H7.898v-2.907h2.54v-2.22c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.242 0-1.63.771-1.63 1.562v1.894h2.773l-.443 2.906h-2.33V22c4.78-.78 8.437-4.9 8.437-9.926z" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.05 9.05 0 01-2.87 1.1 4.48 4.48 0 00-7.65 4.09 12.72 12.72 0 01-9.25-4.69 4.48 4.48 0 001.39 6A4.48 4.48 0 012 9.7v.06a4.48 4.48 0 003.58 4.41 4.48 4.48 0 01-2.03.07 4.48 4.48 0 004.2 3.12A9 9 0 012 19.53 12.69 12.69 0 008.29 21c7.55 0 11.69-6.28 11.69-11.74 0-.18-.01-.35-.02-.53A8.36 8.36 0 0023 3z" />
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="5"
                    ry="5"
                  ></rect>
                  <path d="M16 11.37a4 4 0 11-4-4 4 4 0 014 4z"></path>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/finddoctors" className="hover:text-white">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="hover:text-white">
                  Hospitals
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="hover:text-white">
                  Medicines
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-white">
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">📞 +91 98765 43210</p>
            <p className="text-gray-400 mb-2">📧 info@rumedic.in</p>
            <p className="text-gray-400">🏥 Rural Health Initiative, India</p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          &copy; 2023 RU-MEDIC. All rights reserved. Healthcare for every village.
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
