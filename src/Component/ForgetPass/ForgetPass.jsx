import React, { useState } from "react";
import "./ForgetPass.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(true);
  let [resetCoad, setResetCoad] = useState(false);
  let navg = useNavigate();

  async function forgetForm(Val) {
    setLoding(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", Val)
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
    setLoding(true);

    if (req.data.statusMsg === "success") {
      setResetCoad(true);
    }
  }

  async function resetForm(Val) {
    setLoding(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", Val)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    setLoding(true);
    if (req.data.status === "Success") {
      navg("/ResetPassowrd");
    }
  }

  let validationSchema = yup.object({
    email: yup.string().required("email is required").email("enter valid name"),
  });

  let validationSchema_reset = yup.object({
    resetCode: yup.number().required("reset Code is required"),
  });

  let formValid = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetForm,
    validationSchema,
  });

  let formValid_reset = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: resetForm,
    validationSchema: validationSchema_reset,
  });

  return (
    <>
      <h1 className="mb-3 mt-3">Forget Passowrd....</h1>
      {errorMessage !== "" ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : (
        ""
      )}

      {resetCoad === false ? (
        <form onSubmit={formValid.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Enter your Gmail</label>
            <input
              className="form-control mb-3 mt-1"
              onChange={formValid.handleChange}
              onBlur={formValid.handleBlur}
              type="email"
              name="email"
              id="email"
            />
            {formValid.errors.email && formValid.touched.email ? (
              <div className="alert alert-danger">{formValid.errors.email}</div>
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
              Submit
            </button>
          ) : (
            <button className="btn btn-success mt-2" type="button">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </form>
      ) : (
        <form onSubmit={formValid_reset.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="resetCode">Enter reset code</label>
            <input
              className="form-control mb-3 mt-1"
              onChange={formValid_reset.handleChange}
              onBlur={formValid_reset.handleBlur}
              type="text"
              name="resetCode"
              id="resetCode"
            />
            {formValid_reset.errors.resetCode &&
            formValid_reset.touched.resetCode ? (
              <div className="alert alert-danger">
                {formValid_reset.errors.resetCode}
              </div>
            ) : (
              ""
            )}
          </div>
          {loding ? (
            <button
              disabled={!(formValid_reset.isValid && formValid_reset.dirty)}
              className="btn btn-success mt-2 "
              type="submit"
            >
              Submit
            </button>
          ) : (
            <button className="btn btn-danger mt-2" type="button">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </form>
      )}
    </>
  );
}
