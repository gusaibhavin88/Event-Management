// validationSchema.js
import * as yup from "yup";

export const eventSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  start_date: yup.date().required("Start Date is required"),
  end_date: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("start_date"), "End Date must be after Start Date"),
  total_guest: yup.number().required("Total Guests is required"),
  // .positive("Total Guests must be a positive number"),
  // images: yup
  //   .mixed()
  //   .test(
  //     "required",
  //     "At least one image is required",
  //     (value) => value.length > 0
  //   ),
});
