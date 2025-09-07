import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hospital: null,
  isLoading: false,
  error: null,
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    setHospital(state, action) {
      state.hospital = action.payload;
      state.error = null;
    },
    clearHospital(state) {
      state.hospital = null;
      state.error = null;
    }
  },
});

export const {
  setHospital,
  clearHospital,
  setHospitalLoading,
  setHospitalError,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;