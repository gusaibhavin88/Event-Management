import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../../api/eventRequest";
import { addEvent, updateEventReducer } from "./EventSlice";

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

// Delete Event
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

// Get Event
export const getEventAction = createAsyncThunk(
  "getEventAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await getEvent(formData?.event_id);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Create Event
export const createEventAction = createAsyncThunk(
  "createEventAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const response = await createEvent(formData, config);
      dispatch(addEvent(response));
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Update Event
export const updateEventAction = createAsyncThunk(
  "updateEventAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData, params } = functions;
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      console.log(formData, "lllllllllll");
      const response = await updateEvent(formData, params, config);
      onComplete(response, "updated");
      dispatch(updateEventReducer(formData));
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
