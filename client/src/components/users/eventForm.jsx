// components/Modal.js
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { eventSchema } from "../../validationSchemas/createEventSchema ";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  getEventAction,
  updateEventAction,
} from "../../Redux/Event/EventAction";
import { toast } from "react-toastify";
import moment from "moment";
import { clearEvent } from "../../Redux/Event/EventSlice";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiUrl = import.meta.env.VITE_BASE_URL;

const Modal = ({ isOpen, onClose, mode, eventData }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.event.loading);
  const [files, setFiles] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(eventSchema),
    // defaultValues: eventData || {},
  });

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    reset(); // Reset form on close
  };

  const removeImage = (image, action) => {
    if (action === "new") {
      const filteredImages = imagePreview.filter((img) => img !== image);
      setImagePreview([...filteredImages]);
    }
    const filteredImages = imageNames.filter((img) => img !== image);
    setImageNames(filteredImages);
  };

  const onComplete = (response, action) => {
    if (mode === "create") {
      toast.success(response?.data?.message);
      onClose();
    } else if (action === "updated") {
      toast.success(response?.data?.message);
      getEventData();
      onClose();
    } else {
      Object.keys(response?.data?.data).forEach((key) => {
        if (key === "start_date" || key === "end_date") {
          setValue(key, moment(response?.data?.data[key]).format("YYYY-MM-DD"));
        } else if (key === "images") {
          console.log(response?.data?.data[key], "response?.data?.data[key]");
          setImageNames(response?.data?.data[key] || []);
          setValue(key, response?.data?.data[key]);
        } else {
          setValue(key, response?.data?.data[key]);
        }
      });
    }
  };
  const onError = (response) => {
    toast.error(response?.data?.message);
  };

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

  const onFormSubmit = (data) => {
    const form_data = new FormData();

    Object.keys(data).forEach((key) => {
      form_data.set(key, data[key]);
    });

    files &&
      files[0] &&
      files.forEach((file, index) => {
        form_data.append("event_images", file);
      });

    if (mode === "edit") {
      dispatch(
        updateEventAction({
          functions: {
            onComplete,
            onError,
            formData: form_data,
            params: data?.id,
          },
        })
      );
    } else {
      dispatch(
        createEventAction({
          functions: {
            onComplete,
            onError,
            formData: form_data,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (eventData && eventData !== null) {
      console.log(eventData);
      getEventData();
    }

    return () => dispatch(clearEvent);
  }, [eventData]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    // Create an array of image URLs to preview

    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setImagePreview([...imagePreview, ...imageUrls]);
    // if (e.target.files && e.target.files[0]) {
    //   e.target.files.forEach((img) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       if (reader.readyState === 2) {
    //         setImagePreview([...imagePreview, reader.result]);
    //       }
    //     };
    //     reader.readAsDataURL(img);
    //   });
    // }
  };

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
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Event Images
            </label>

            <div className="mt-1 flex gap-2">
              {imageNames.length > 0 || imagePreview?.length > 0 ? (
                <>
                  {imageNames.map((image, index) => (
                    <div key={index} className="text-gray-700">
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer    text-red-500"
                        onClick={() => removeImage(image)}
                      />
                      <img className="w-10" src={`${apiUrl}/${image}`} />
                    </div>
                  ))}

                  {imagePreview.map((image, index) => (
                    <div key={index} className="text-gray-700">
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer    text-red-500"
                        onClick={() => removeImage(image, "new")}
                      />
                      <img className="w-10" src={imagePreview} />
                    </div>
                  ))}
                </>
              ) : (
                <p>No images.</p>
              )}
            </div>
            {mode !== "view" && (
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={mode === "view"}
              />
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
