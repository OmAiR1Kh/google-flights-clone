import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
};

export const airportSlice = createSlice({
  name: "airport",
  initialState,
  reducers: {
    setAirports: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setAirports } = airportSlice.actions;

export default airportSlice.reducer;
