import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
};

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setFlightData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setFlightData } = flightsSlice.actions;

export default flightsSlice.reducer;
