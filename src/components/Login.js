import * as Yup from "yup";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import useAuth from "../hooks/useAuth";
import { PATH_PAGE } from "../routes/paths";

const Login = () => {
  const { login } = useAuth();
  const [err, seterr] = useState(null);

  // const { user, logIn } = UserAuth();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        console.error(error);
        seterr("If you have not an account ,you must register");
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
          <div className="max-w-[450px] h-[600px] mx-auto bg-white/75 text-black">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>

              <div className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-100 rouded"
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                {touched.email && formik.errors.email ? (
                  <p className="p-3 bg-red-400 my-2">{formik.errors.email}</p>
                ) : null}

                <input
                  className="p-3 my-2 bg-gray-100 rouded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                />
                {touched.password && formik.errors.password ? (
                  <p className="p-3 bg-red-400 my-2">
                    {formik.errors.password}
                  </p>
                ) : null}
                {err ? <p className="p-3 bg-red-400 my-2">{err}</p> : null}
                <button
                  type="submit"
                  className="bg-red-600 py-3 my-6 rounded font-bold"
                >
                  Sign In
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    If you dont have an account?
                  </span>{" "}
                  <Link to={PATH_PAGE.register}>Register Now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
