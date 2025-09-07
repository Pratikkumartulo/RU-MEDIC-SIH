import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    selectedDoctor: null,
  },
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    clearSelectedDoctor: (state) => {
      state.selectedDoctor = null;
    },
  },
});

export const { setSelectedDoctor, clearSelectedDoctor } = appointmentSlice.actions;
export default appointmentSlice.reducer;