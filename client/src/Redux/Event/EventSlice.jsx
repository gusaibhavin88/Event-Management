import { createSlice } from "@reduxjs/toolkit";
import { listEventAction } from "./EventAction";

// Define the initial state
const initialState = {
  eventData: [],
  pageCount: null,
  loading: false,
};

// Create a slice
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    deleteEventReducer: (state, action) => {
      const event_id = action.payload;
      state.eventData = state.eventData.filter((item) => item.id !== event_id);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(listEventAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(listEventAction.fulfilled, (state, action) => {
        state.loading = false;
        state.eventData = action?.payload?.data?.data?.events;
        state.pageCount = action?.payload?.data?.data?.page_count;
      })
      .addCase(listEventAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
export const { deleteEventReducer } = eventSlice.actions;
