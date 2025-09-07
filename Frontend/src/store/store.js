import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage
import authReducer from './AuthSlice';
import appointmentReducer from './appointmentSlice';
import hospitalReducer from './HospitalSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const hospitalPersistConfig = {
  key: 'hospital',
  storage,
};

const appointmentPersistConfig = {
  key: 'appointment',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedHospitalReducer = persistReducer(hospitalPersistConfig, hospitalReducer);
const persistedAppointmentReducer = persistReducer(appointmentPersistConfig, appointmentReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    appointment: persistedAppointmentReducer, // <-- persist appointment reducer
    hospital: persistedHospitalReducer,
  },
});

export const persistor = persistStore(store);
export default store;