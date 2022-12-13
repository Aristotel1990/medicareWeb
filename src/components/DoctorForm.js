import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "../redux/store";
import { changeStatus, editDoctor, getMyDoctor } from "../redux/slices/user";
import EditModal from "./EditModal";

const DoctorForm = () => {
  const { myDoctor: user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      nid: user?.nid || "",
      nipt: user?.nipt || "",
      profile: user?.profile || "",
      addressText: user?.addressText || "",
      postgraduate: user?.postgraduate || "",
      undergraduate: user?.undergraduate || "",
      hospital: user?.hospital || "",
    },

    onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
      try {
        console.log("🚀 ~ file: DoctorForm.js:45 ~ onSubmit: ~ values", values);

        await editDoctor(values);
        setSubmitting(false);
        dispatch(getMyDoctor());
        dispatch(changeStatus(true));
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });
  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;
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
                  Doctor Information
                </h3>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      {...formik.getFieldProps("name")}
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
                      NIPT
                    </label>
                    <input
                      type="text"
                      name="nipt"
                      id="nipt"
                      autoComplete="nipt"
                      {...formik.getFieldProps("nipt")}
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
                      Address
                    </label>
                    <input
                      type="text"
                      name="addressText"
                      id="addressText"
                      autoComplete="addressText"
                      {...formik.getFieldProps("addressText")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Profile
                    </label>
                    <input
                      type="text"
                      name="profile"
                      id="profile"
                      autoComplete="profile"
                      {...formik.getFieldProps("profile")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Postgraduate
                    </label>
                    <input
                      type="text"
                      name="postgraduate"
                      id="postgraduate"
                      autoComplete="postgraduate"
                      {...formik.getFieldProps("postgraduate")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Undergraduate
                    </label>
                    <input
                      type="text"
                      name="undergraduate"
                      id="undergraduate"
                      autoComplete="undergraduate"
                      {...formik.getFieldProps("undergraduate")}
                      className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Current hospital
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      id="hospital"
                      autoComplete="hospital"
                      {...formik.getFieldProps("hospital")}
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

export default DoctorForm;
