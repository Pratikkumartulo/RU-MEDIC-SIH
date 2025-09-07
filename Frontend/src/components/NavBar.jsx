import React from 'react';
import Logoutbtn from './Logoutbtn';
import  {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold text-gray-800">MediCare</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to={'/'} className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to={'/bookappointment'} className="text-gray-700 hover:text-blue-600">Book Appointment</Link>
          <Link to={'/'} className="text-gray-700 hover:text-blue-600">Medicines</Link>
          <Link to={'/about'} className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to={'/'} className="text-gray-700 hover:text-blue-600">Contact</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-red-500 text-sm hidden md:inline">Emergency</span>
          {authStatus ? <Logoutbtn/> : <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
            <Link to={'/login'}>Sign In</Link>
          </button>}
          {/* <Logoutbtn/> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;