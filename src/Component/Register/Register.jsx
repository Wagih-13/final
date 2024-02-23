import React, { useState } from "react";
import "./RegisterModule.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(true);
  let navg = useNavigate();

  async function RegisterForm(Val) {
    setLoding(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", Val)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    setLoding(true);
    if (req.data.message === "success") {
      setErrorMessage("");
      navg("/login");
    }
  }

  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "min char is 3")
      .max(20, "max char is 20"),
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][a-zA-Z!@#$%^&*()_]{6,16}$/, "enter valid passowrd"),
    rePassword: yup
      .string()
      .required("password is required")
      .oneOf([yup.ref("password")], "enter valid passowrd"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[1250][0-9]{8}$/, "enter valid phone"),
  });

  let formValid = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: RegisterForm,
    validationSchema,
  });

  return (
    <>
      <div className="register">
        <div className="container " >
          <div className="overLay"></div>
          <h1 className="mb-3">Register Now .......</h1>
          {errorMessage !== "" ? (
            <div className="alert alert-danger">{errorMessage}</div>
          ) : (
            ""
          )}
          <form onSubmit={formValid.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name"> Name :</label>
              <input
                className="form-control mb-3"
                type="text"
                name="name"
                id="name"
                onChange={formValid.handleChange}
                onBlur={formValid.handleBlur}
                required
              />
              {formValid.errors.name && formValid.touched.name ? (
                <div className="alert alert-danger">
                  {formValid.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email"> Email :</label>
              <input
                className="form-control mb-3"
                type="email"
                name="email"
                id="email"
                onChange={formValid.handleChange}
                onBlur={formValid.handleBlur}
              />
              {formValid.errors.email && formValid.touched.email ? (
                <div className="alert alert-danger">
                  {formValid.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone"> Phone :</label>
              <input
                className="form-control mb-3"
                type="tel"
                name="phone"
                id="phone"
                onChange={formValid.handleChange}
                onBlur={formValid.handleBlur}
              />
              {formValid.errors.phone && formValid.touched.phone ? (
                <div className="alert alert-danger">
                  {formValid.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password"> Password :</label>
              <input
                className="form-control mb-3"
                type="password"
                name="password"
                id="password"
                onChange={formValid.handleChange}
                onBlur={formValid.handleBlur}
              />
              {formValid.errors.password && formValid.touched.password ? (
                <div className="alert alert-danger">
                  {formValid.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="rePassword"> RePassword :</label>
              <input
                className="form-control mb-3"
                type="password"
                name="rePassword"
                id="rePassword"
                onChange={formValid.handleChange}
                onBlur={formValid.handleBlur}
              />
              {formValid.errors.rePassword && formValid.touched.rePassword ? (
                <div className="alert alert-danger">
                  {formValid.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>
            {loding ? (
              <button
                disabled={!(formValid.isValid && formValid.dirty)}
                className="btn btn-success mt-2 "
                type="submit"
              >
                Register
              </button>
            ) : (
              <button className="btn btn-success mt-2" type="button">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
