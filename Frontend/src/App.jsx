import React from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import Navbar from './components/navbar'
import FindHospitals from './pages/FindHospitals'
import BookAppointment from './pages/BookAppointment'
import DoctorDetail from './pages/DoctorDetail'
import BookingAppointment from './pages/BookingAppointment'
import Login from './pages/Login'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <div className="h-screen w-full">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    </>
    // <div className='h-screen w-full bg-zinc-900'>
    //   <Navbar/>
    //   {/* <Login/> */}
    //   {/* <FindHospitals/> */}
    //   {/* <DoctorDetail/> */}
    //   {/* <BookAppointment/> */}
    //   {/* <BookingAppointment/> */}
    //   {/* <Home/> */}
    //   <Footer/>
    // </div>
  )
}

export default App
