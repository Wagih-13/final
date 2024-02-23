import React, { useContext, useState } from "react";
import "./LoginModule.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Login(data) {
  let { setItemNum, getCart } = useContext(CartContext);
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(true);
  let navg = useNavigate();
  let { setUserToken } = useContext(UserContext);

  async function loginForm(Val) {
    setLoding(false);
    let req = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", Val)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    setLoding(true);
    if (req.data.message === "success") {
      setErrorMessage("");
      localStorage.setItem("userToken", req.data.token);
      setUserToken(req.data.token);
      navg("/home");
      getNumCart();
    }
  }

  async function getNumCart() {
    let req = await getCart().catch((err) => {});
    setItemNum(req?.data.numOfCartItems);
  }

  let validationSchema = yup.object({
    email: yup.string().required("email is required").email("enter valid name"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][a-zA-Z!@#$%^&*()_]{6,16}$/, "enter valid passowrd"),
  });

  let formValid = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginForm,
    validationSchema,
  });

  return (
    <>
      <h1>Login...</h1>
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

        <Link className="d-block mb-3 forget" to={"/ForgetPass"}>
          Forget password ?
        </Link>

        {loding ? (
          <button
            disabled={!(formValid.isValid && formValid.dirty)}
            className="btn btn-success mt-2"
            type="submit"
          >
            Login
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
