import React, { useState } from "react";
import "./ResetPassowrdmodule.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassowrd() {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(true);
  let navg = useNavigate();

  async function resetPassowrdForm(Val) {
    setLoding(false);
    let req = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", Val)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    setLoding(true);
    if (req.data.token !== "") {
      setErrorMessage("");
      navg("/login");
    }
  }

  let validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email"),
    newPassword: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][a-zA-Z!@#$%^&*()_]{6,16}$/, "enter valid passowrd"),
  });

  let formValid = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassowrdForm,
    validationSchema,
  });

  return (
    <>
      <h1 className="mb-3">Reset passowrd .......</h1>
      {errorMessage !== "" ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : (
        ""
      )}
      <form onSubmit={formValid.handleSubmit}>
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
            <div className="alert alert-danger">{formValid.errors.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword"> New Password :</label>
          <input
            className="form-control mb-3"
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={formValid.handleChange}
            onBlur={formValid.handleBlur}
          />
          {formValid.errors.newPassword && formValid.touched.newPassword ? (
            <div className="alert alert-danger">
              {formValid.errors.newPassword}
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
            Update passowrd
          </button>
        ) : (
          <button className="btn btn-success mt-2" type="button">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </>
  );
}
