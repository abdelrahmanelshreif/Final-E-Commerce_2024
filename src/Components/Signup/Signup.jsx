import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post(
        "https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/user/signup",
        values
      )
      .then(({ data }) => {
        if (data.status === "success") {
          navigate("/signin");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else {
          // Handle other errors
          console.error("Error:", err);
        }
        setLoading(true);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      firstName: Yup.string().min(3).max(20).required(),
      lastName: Yup.string().min(3).max(20).required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          "You need Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        )
        .required(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "rePassword doesn't match the password")
        .required(),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .required(),
    });

    return schema;
  }

  let signup = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  return (
    <>
      <div className="container my-5">
        <div className="w-75 mx-auto">
          <h3>Register Now:</h3>
          <form onSubmit={signup.handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              onBlur={signup.handleBlur}
              value={signup.values.firstName}
              onChange={signup.handleChange}
              type="text"
              name="firstName"
              className="form-control mb-3"
              id="firstName"
            />

            {signup.errors.firstName && signup.touched.firstName ? (
              <div className="alert alert-danger">
                {signup.errors.firstName}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="lastName">Last Name:</label>
            <input
              onBlur={signup.handleBlur}
              value={signup.values.lastName}
              onChange={signup.handleChange}
              type="text"
              name="lastName"
              className="form-control mb-3"
              id="lastName"
            />

            {signup.errors.lastName && signup.touched.lastName ? (
              <div className="alert alert-danger">{signup.errors.lastName}</div>
            ) : (
              ""
            )}

            <label htmlFor="email">Email:</label>
            <input
              onBlur={signup.handleBlur}
              value={signup.values.email}
              onChange={signup.handleChange}
              type="email"
              name="email"
              className="form-control mb-3"
              id="email"
            />

            {signup.errors.email && signup.touched.email ? (
              <div className="alert alert-danger">{signup.errors.email}</div>
            ) : (
              ""
            )}

            <label htmlFor="password">Password:</label>
            <input
              onBlur={signup.handleBlur}
              value={signup.values.password}
              onChange={signup.handleChange}
              type="password"
              name="password"
              className="form-control mb-3"
              id="password"
            />

            {signup.errors.password && signup.touched.password ? (
              <div className="alert alert-danger">{signup.errors.password}</div>
            ) : (
              ""
            )}

            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              onBlur={signup.handleBlur}
              value={signup.values.passwordConfirm}
              onChange={signup.handleChange}
              type="password"
              name="passwordConfirm"
              className="form-control mb-3"
              id="passwordConfirm"
            />

            {signup.errors.passwordConfirm && signup.touched.passwordConfirm ? (
              <div className="alert alert-danger">
                {signup.errors.passwordConfirm}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="phoneNumber">Phone:</label>
            <input
              onBlur={signup.handleBlur}
              value={signup.values.phoneNumber}
              onChange={signup.handleChange}
              type="text"
              name="phoneNumber"
              className="form-control mb-3"
              id="phoneNumber"
            />

            {signup.errors.phoneNumber && signup.touched.phoneNumber ? (
              <div className="alert alert-danger">
                {signup.errors.phoneNumber}
              </div>
            ) : (
              ""
            )}

            {errorMsg ? (
              <div className="alert alert-danger">{errorMsg}</div>
            ) : (
              ""
            )}

            <button
              disabled={!(signup.dirty && signup.isValid)}
              type="submit"
              className="btn bg-main text-white"
            >
              {loading ? "Signup" : <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
