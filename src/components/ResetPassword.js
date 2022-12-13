import * as Yup from "yup";

import React, { useState } from "react";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
  const { resetPassword, error } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  // const { user, logIn } = UserAuth();
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(4, "To short")
      .required("New password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Password mast be the same"
    ),
  });
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await resetPassword(values.oldPassword, values.newPassword);
        setShowAlert(true);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);

        setErrors(error);
      }
    },
  });
  const { touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
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
                    Reset Password
                  </h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Old Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        autoComplete="oldPassword"
                        {...getFieldProps("oldPassword")}
                        className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {touched.oldPassword && formik.errors.oldPassword ? (
                        <p className="p-3 bg-red-400 my-2">
                          {formik.errors.oldPassword}
                        </p>
                      ) : null}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        autoComplete="newPassword"
                        {...getFieldProps("newPassword")}
                        className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {touched.newPassword && formik.errors.newPassword ? (
                        <p className="p-3 bg-red-400 my-2">
                          {formik.errors.newPassword}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm new Password
                      </label>
                      <input
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        autoComplete="confirmNewPassword"
                        {...getFieldProps("confirmNewPassword")}
                        className="mt-1 h-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {touched.confirmNewPassword &&
                      formik.errors.confirmNewPassword ? (
                        <p className="p-3 bg-red-400 my-2">
                          {formik.errors.confirmNewPassword}
                        </p>
                      ) : null}
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
      </div>
      {showAlert ? (
        <div
          className={
            "text-white px-6 py-4 border-0 rounded relative mb-4 bg-pink-500"
          }
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            {error ? error : "Password has been updated!"}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ResetPassword;
