import axios from "axios";
import interceptor from "./interceptor";
const apiUrl = import.meta.env.VITE_BASE_URL;

const baseURL = `${apiUrl}/api/v1/`;

const api = axios.create({
  baseURL,
});
interceptor(api);

export const getEvents = (queryParams) => {
  // Build query string from queryParams
  const queryString = new URLSearchParams(queryParams).toString();
  console.log(queryString);
  return api.get(`/event/list?${queryString}`);
};
export const deleteEvent = (eventId) => {
  return api.delete(`/event/${eventId}`);
};
export const getEvent = (eventId) => {
  return api.get(`/event/${eventId}`);
};
export const createEvent = (formData, config) => {
  return api.post("/event/add", formData, config);
};
export const updateEvent = (formData, eventId, config) => {
  return api.put(`/event/update/${eventId}`, formData, config);
};
