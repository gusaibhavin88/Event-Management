// components/Modal.js
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { eventSchema } from "../../validationSchemas/createEventSchema ";
import { useDispatch } from "react-redux";
import { getEventAction } from "../../Redux/Event/EventAction";

const Modal = ({ isOpen, onClose, mode, eventData }) => {
  const dispatch = useDispatch();
  console.log(isOpen, onClose, mode, eventData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(eventSchema),
    // defaultValues: eventData || {},
  });

  // React.useEffect(() => {
  //   if (eventData) {
  //     reset(eventData);
  //   }
  // }, [eventData, reset]);

  const handleClose = () => {
    onClose();
    reset(); // Reset form on close
  };

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  const onComplete = (response) => {};
  const onError = (response) => {};

  // Gte Event
  const getEventData = async () => {
    dispatch(
      getEventAction({
        functions: {
          onComplete,
          onError,
          formData: {
            event_id: eventData,
          },
        },
      })
    );
  };

  useEffect(() => {
    if (eventData) {
      console.log(eventData);
      getEventData();
    }
  }, [eventData]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit"
            ? "Edit Event"
            : mode === "view"
            ? "View Event"
            : "Create Event"}
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={mode === "view"}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={mode === "view"}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              {...register("start_date")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={mode === "view"}
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm">
                {errors.start_date.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              {...register("end_date")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={mode === "view"}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm">{errors.end_date.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="totalGuests"
              className="block text-sm font-medium text-gray-700"
            >
              Total Guests
            </label>
            <input
              id="totalGuests"
              type="number"
              {...register("total_guest")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={mode === "view"}
            />
            {errors.total_guest && (
              <p className="text-red-500 text-sm">
                {errors.total_guest.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            {mode !== "view" && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {mode === "edit" ? "Save Changes" : "Create Event"}
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
