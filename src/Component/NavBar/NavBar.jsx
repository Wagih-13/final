import React, { useContext } from "react";
import "./NavBarModule.css";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let { itemNum } = useContext(CartContext);

  function clearToken() {
    setUserToken(null);
    localStorage.setItem("userToken", "");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg myNav ">
        <div className="container-fluid">
          <Link className="navbar-brand logo " to="/home">
            <Logo />
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="products/6439d5b90049ad0b52b90048"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="Brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="WishList"
                  >
                    WishList
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item  minNav">
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-youtube mx-2"></i>
                <i className="fa-brands fa-twitter mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>
                <i className="fa-brands fa-pinterest mx-2"></i>
              </li>
              {userToken == null ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>{" "}
                </>
              ) : (
                <>
                  <Link
                    to="cart"
                    className="nav-item  d-flex align-items-center "
                  >
                    <i className="fa fa-shopping-cart "></i>
                    <span className="translate-middle-y text-white CartAleart">
                      {itemNum}
                    </span>
                  </Link>
                  <li className="nav-item">
                    <Link
                      onClick={clearToken}
                      className="nav-link active"
                      aria-current="page"
                      to="login"
                    >
                      LogOut
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
