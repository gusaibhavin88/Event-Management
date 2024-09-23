import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import data from "../../assets/data.json"; // Static data import
import defaultImage from "../../assets/profileImg.webp";
import {
  deleteEventAction,
  listEventAction,
} from "../../Redux/Event/EventAction";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce"; // Import the debounce function
const apiUrl = import.meta.env.VITE_BASE_URL;
import moment from "moment";
import { deleteEventReducer } from "../../Redux/Event/EventSlice";
import Modal from "./eventForm";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../utility/comonFunction";

const EventList = () => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchKey, setSearchKey] = useState("");
  const [skillName, setSkillName] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const events = useSelector((state) => state?.event?.eventData);
  const eventPage = useSelector((state) => state?.event?.pageCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [eventData, setEventData] = useState(null);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const pageOptions = [5, 10];

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const onComplete = (response, type) => {
    if (type === "delete") toast.success(response.data.message);
  };
  const onError = (response) => {
    toast.error(response.data.message);
  };

  const handleSearchInputChange = (val) => {
    setSearchKey(val);
  };

  // Model Functions

  const openModal = (mode, event = null) => {
    setModalMode(mode);
    setEventData(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventData(null);
  };

  // Delete Event
  const deleteEvent = (event_id) => {
    dispatch(
      deleteEventAction({
        functions: {
          onComplete,
          onError,
          formData: {
            event_id: event_id,
          },
        },
      })
    );

    dispatch(deleteEventReducer(event_id));
  };

  // List EVent
  useEffect(() => {
    dispatch(
      listEventAction({
        functions: {
          onComplete,
          onError,
          formData: {
            page: page,
            items_per_page: sizePerPage,
            sort_field: sortKey,
            sort_order: sortOrder,
            search: searchKey,
            skill_name: skillName,
            gender: gender,
            department: department,
          },
        },
      })
    );
  }, [page, sizePerPage, sortKey, sortOrder, skillName, gender, department]);

  useEffect(() => {
    dispatch(
      listEventAction({
        functions: {
          onComplete,
          onError,
          formData: {
            search: searchKey,
            page: page,
            items_per_page: sizePerPage,
            sort_order: sortOrder,
            sort_field: sortKey,
          },
        },
      })
    );
  }, []);

  // Use debounce to delay the API request
  const debouncedSearch = debounce(
    (searchKey) => {
      dispatch(
        listEventAction({
          functions: {
            onComplete,
            onError,
            formData: {
              page: page,
              items_per_page: sizePerPage,
              sort_field: sortKey,
              sort_order: sortOrder,
              search: searchKey,
            },
          },
        })
      );
    },
    1000 // Delay time in milliseconds
  );

  useEffect(() => {
    debouncedSearch(searchKey);
    return () => debouncedSearch.cancel();
  }, [searchKey]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">{t("EventTitle")}</h3>
        <button
          className="bg-blue-400 text-white p-2 rounded-md  w-50 font-bold"
          onClick={() => changeLanguage("hn")}
        >
          Change Language
        </button>
      </div>

      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <input
          type="text"
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md"
          placeholder="Search..."
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />

        <button
          className="bg-blue-400 text-white p-2 rounded-md  w-32 font-bold"
          onClick={() => openModal("create")}
        >
          Add Event
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            mode={modalMode}
            eventData={eventData}
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full border-b">
              <th
                className="py-2 text-left cursor-pointer"
                onClick={() => handleSort("profile_image")}
              >
                Profile
                {sortKey === "profile_image" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </span>
                )}
              </th>
              <th
                className="py-2 text-left cursor-pointer"
                onClick={() => handleSort("first_name")}
              >
                Name
                {sortKey === "first_name" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </span>
                )}
              </th>
              <th
                className="py-2 text-left cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Description
                {sortKey === "description" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </span>
                )}
              </th>
              <th
                className="py-2 text-left cursor-pointer"
                onClick={() => handleSort("start_date")}
              >
                Start Date
                {sortKey === "start_date" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </span>
                )}
              </th>
              <th
                className="py-2 text-left cursor-pointer"
                onClick={() => handleSort("end_date")}
              >
                End Date
                {sortKey === "end_date" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </span>
                )}
              </th>

              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events[0] &&
              events?.map((event, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">
                    <img
                      src={
                        event?.images
                          ? `${apiUrl}/${event?.images[0]}`
                          : defaultImage
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="py-2">{event.name}</td>
                  <td className="py-2">{event.description}</td>
                  <td className="py-2">
                    {event.start_date
                      ? moment(event.start_date).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td className="py-2">
                    {event.end_date
                      ? moment(event.end_date).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td className="py-2">{event.total_guest}</td>
                  <td className="py-2">
                    <button
                      className="bg-blue-400 text-white py-2 rounded-md   m w-16 font-bold"
                      onClick={() => openModal("view", event?.id)}
                    >
                      View
                    </button>
                  </td>
                  <td className="py-2   ">
                    <button
                      className="bg-blue-400 text-white py-2  rounded-md  ml-3 w-16 font-bold"
                      onClick={() => openModal("edit", event?.id)}
                    >
                      Edit
                    </button>
                  </td>

                  <td className="py-2">
                    <button
                      className="bg-red-500 text-white p-2   w-12 rounded-md"
                      onClick={() => deleteEvent(event?.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <select
          className="p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSizePerPage(e.target.value)}
        >
          {pageOptions.map((option, index) => (
            <option key={index} value={option}>
              {option} per page
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <ul className="flex justify-center space-x-1">
            <li
              className={`${
                page === 1 || events?.length < 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <button
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || events?.length < 1}
              >
                Previous
              </button>
            </li>

            {[...Array(eventPage)].map((_, index) => (
              <li key={index} className="">
                <button
                  className={`px-3 py-2  text-black    bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring ${
                    page === index + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`${
                page === eventPage || events?.length < 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <button
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring"
                onClick={() => handlePageChange(page + 1)}
                disabled={page == eventPage || events?.length < 1}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventList;
