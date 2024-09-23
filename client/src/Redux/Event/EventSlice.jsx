import { createSlice } from "@reduxjs/toolkit";
import {
  getEventAction,
  listEventAction,
  updateEventAction,
} from "./EventAction";

// Define the initial state
const initialState = {
  eventData: [],
  pageCount: null,
  loading: false,
  event: {},
};

// Create a slice
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.eventData = [action?.payload?.data?.data, ...state.eventData];
    },
    deleteEventReducer: (state, action) => {
      const event_id = action.payload;
      state.eventData = state.eventData.filter((item) => item.id !== event_id);
    },
    updateEventReducer: (state, action) => {
      const updatedEvent = action.payload;
      state.eventData = state.eventData.map((item) =>
        item.id === updatedEvent.id ? updatedEvent : item
      );
    },
    clearEvent: (state, action) => {
      state.event = {};
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
      })
      .addCase(getEventAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventAction.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action?.payload?.data?.data;
      })
      .addCase(getEventAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEventAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEventAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEventAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
export const { deleteEventReducer, updateEventReducer, clearEvent, addEvent } =
  eventSlice.actions;
