import * as Yup from "yup";

import React from "react";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "../redux/store";
import { editUser, getCurrentUser, changeStatus } from "../redux/slices/user";
import EditModal from "./EditModal";

const EditUserProfile = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // const { user, logIn } = UserAuth();
  const EditSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      nid: user?.nid || "",
      reason: user?.reason || "",
      problems: user?.problems || "",
      insurance: user?.insurance || "",
      medications: user?.medications || "",
      alergies: user?.alergies || "",
    },
    validationSchema: EditSchema,

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await editUser(values);
        setSubmitting(false);
        dispatch(getCurrentUser());
        dispatch(changeStatus(true));
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });
  const { touched, handleSubmit } = formik;
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
            className="w-full flex flex-col py-4"
          >
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-10">
                  Patient Information
                </h3>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      {...formik.getFieldProps("firstName")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {touched.firstName && formik.errors.firstName ? (
                    <p className="p-3 bg-red-100 my-2">
                      {formik.errors.firstName}
                    </p>
                  ) : null}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      {...formik.getFieldProps("lastName")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {touched.lastName && formik.errors.lastName ? (
                    <p className="p-3 bg-red-100 my-2">
                      {formik.errors.lastName}
                    </p>
                  ) : null}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      {...formik.getFieldProps("email")}
                      className="mt-1 h-10 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {touched.email && formik.errors.email ? (
                    <p className="p-3 bg-red-100 my-2">{formik.errors.email}</p>
                  ) : null}
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ID
                    </label>
                    <input
                      type="text"
                      name="nid"
                      id="nid"
                      autoComplete="ID"
                      {...formik.getFieldProps("nid")}
                      className="mt-1 h-10 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="phone"
                      {...formik.getFieldProps("phone")}
                      className="mt-1 h-10 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Appointment Reason{" "}
                    </label>
                    <input
                      type="text"
                      name="reason"
                      id="reason"
                      autoComplete="reason"
                      {...formik.getFieldProps("reason")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Current or past medical problems
                    </label>
                    <input
                      type="text"
                      name="problems"
                      id="problems"
                      autoComplete="problems"
                      {...formik.getFieldProps("problems")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Medical insurance information
                    </label>
                    <input
                      type="text"
                      name="insurance"
                      id="insurance"
                      autoComplete="insurance"
                      {...formik.getFieldProps("insurance")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      List current medications
                    </label>
                    <input
                      type="text"
                      name="medications"
                      id="medications"
                      autoComplete="medications"
                      {...formik.getFieldProps("medications")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      List any Alergies
                    </label>
                    <input
                      type="text"
                      name="alergies"
                      id="alergies"
                      autoComplete="alergies"
                      {...formik.getFieldProps("alergies")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <EditModal />
    </div>
  );
};

export default EditUserProfile;
