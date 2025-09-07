import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import FindHospitals from './pages/FindHospitals.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import BookingAppointment from './pages/BookingAppointment.jsx';
import Home from './pages/Home.jsx';
import SignupForm from './pages/Signup.jsx';
import { Provider } from 'react-redux'
import store, { persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import DoctorLogin from './pages/DoctorLogin.jsx';
import DoctorSignup from './pages/DoctorSignup.jsx';
import HospitalLogin from './pages/HospitalLogin.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Admin from './pages/Admin.jsx';
import AdminAllHospitals from './components/AdminAllHospitals.jsx';
import AdminStatsAndTopHospitals from './components/AdminStatAndTopHospitals.jsx';
import AdminAddNewHospital from './components/AdminAddNewHospital.jsx';
import HospitalDashboard from './pages/HospitalDashboard.jsx';
import UserProfile from './pages/UserProile.jsx';
import About from './pages/About.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/myprofile",
        element:<UserProfile/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:'/signup',
        element:<SignupForm/>
      },
      {
        path:'/hospitalnearby',
        element:<FindHospitals/>
      },
      {
        path:'/bookappointment',
        element:<BookAppointment/>
      },
      {
        path:'/apointment',
        element:<BookingAppointment/>
      },
      {
        path:'/hospitalnearby',
        element:<FindHospitals/>
      },
      {
        path: '/findhospital/params',
        element: <FindHospitals/>
      },
      {
        path:'/doctordash',
        element:<DoctorDashboard/>
      },{
        path:'/doctlogin',
        element:<DoctorLogin/>
      },{
        path:'/doctsignup',
        element:<DoctorSignup/>
      },{
        path:'/hospitallogin',
        element:<HospitalLogin/>
      },{
        path:'/admin',
        element:<Admin/>,
        children:[
          {
            index: true, // default child route
            element: <AdminStatsAndTopHospitals />
          },
          {
            path: 'allhospitals',
            element: <AdminAllHospitals />
          },
          {
            path:'addhospital',
            element:<AdminAddNewHospital/>
          }
        ]
      },
      {
        path:'/hospitallogin',
        element:<HospitalLogin/>
      },
      {
        path:'/myhospital',
        element:<HospitalDashboard/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <RouterProvider router={router}/>
      </StrictMode>
    </PersistGate>
  </Provider>
)
