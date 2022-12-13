import * as Yup from "yup";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import useAuth from "../hooks/useAuth";
import { PATH_PAGE } from "../routes/paths";

const Signup = () => {
  const { login, register } = useAuth();
  const [samePas, setSame] = useState(null);
  const navigate = useNavigate();

  // const { user, logIn } = UserAuth();
  const RegisterSchema = Yup.object().shape({
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
    password: Yup.string().required("Password is required").min(5),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
      try {
        await register(values);
        resetForm();
        setSubmitting(false);
        navigate(PATH_PAGE.home);
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
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      className="w-full flex flex-col py-4"
    >
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="../home.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[800px] mx-auto bg-white/75 text-black">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Register</h1>

              <div className="w-full flex flex-col py-4">
                <input
                  type="text"
                  className="block border  bg-gray-100 border-grey-light w-full p-3 rounded mb-4"
                  name="firstName"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {touched.firstName && formik.errors.firstName ? (
                  <p className="p-3 bg-red-300 my-2">
                    {formik.errors.firstName}
                  </p>
                ) : null}
                <input
                  type="text"
                  className="block  bg-gray-100 border border-grey-light w-full p-3 rounded mb-4"
                  name="lastName"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {touched.lastName && formik.errors.lastName ? (
                  <p className="p-3 bg-red-300 my-2">
                    {formik.errors.lastName}
                  </p>
                ) : null}
                <input
                  type="text"
                  className="block  bg-gray-100 border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                {touched.email && formik.errors.email ? (
                  <p className="p-3 bg-red-300 my-2">{formik.errors.email}</p>
                ) : null}
                <input
                  type="password"
                  className="block border  bg-gray-100 border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password (5 characters and above)"
                  {...formik.getFieldProps("password")}
                />
                {touched.password && formik.errors.password ? (
                  <p className="p-3 bg-red-300 my-2">
                    {formik.errors.password}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="bg-red-600 py-3 my-6 rounded font-bold"
                >
                  Register
                </button>

                <p className="py-8">
                  <span className="text-gray-600">If you have an account?</span>{" "}
                  <Link to={PATH_PAGE.login}>Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
