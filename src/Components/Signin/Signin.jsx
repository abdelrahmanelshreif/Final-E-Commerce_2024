import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signin() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  function sendDataToApi(values) {
    setLoading(true);
    axios
      .post(
        "https://e-commerce-2024-lzfv.onrender.com/E-Commerce/api/v1/user/login",
        values
      )
      .then(({ data }) => {
        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.data.user.role); // Store the user role in localStorage
          // Check the user role and navigate accordingly
          if (data.data.user.role === "user") {
            navigate("/home");
          } else if (data.data.user.role === "admin") {
            navigate("/home");
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setLoading(false);
      });
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    return schema;
  }

  let signin = useFormik({
    initialValues: {
      email: "",
      password: "",
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
          <h3>Signin Now:</h3>
          <form onSubmit={signin.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              onBlur={signin.handleBlur}
              value={signin.values.email}
              onChange={signin.handleChange}
              type="email"
              name="email"
              className="form-control mb-3"
              id="email"
            />

            {signin.errors.email && signin.touched.email ? (
              <div className="alert alert-danger">{signin.errors.email}</div>
            ) : (
              ""
            )}

            <label htmlFor="password">Password:</label>
            <input
              onBlur={signin.handleBlur}
              value={signin.values.password}
              onChange={signin.handleChange}
              type="password"
              name="password"
              className="form-control mb-3"
              id="password"
            />

            {signin.errors.password && signin.touched.password ? (
              <div className="alert alert-danger">{signin.errors.password}</div>
            ) : (
              ""
            )}

            {errorMsg ? (
              <div className="alert alert-danger">{errorMsg}</div>
            ) : (
              ""
            )}

            <div className="d-flex flex-column">
              <Link className=" mb-3 fw-bold fp w-25" to="/forgot-password">
                Forget your password?
              </Link>

              <button
                type="submit"
                className="btn bg-main text-white align-self-start"
              >
                {loading ? "Signin" : <i className="fa fa-spinner fa-spin"></i>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
