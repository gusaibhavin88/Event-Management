import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteEvent, getEvents } from "../../api/eventRequest";

// List Events
export const listEventAction = createAsyncThunk(
  "listEventAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await getEvents(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
export const deleteEventAction = createAsyncThunk(
  "deleteEventAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await deleteEvent(formData?.event_id);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
