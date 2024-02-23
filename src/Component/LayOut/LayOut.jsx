import React, { useContext, useEffect } from "react";
import "./LayOutModule.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";

export default function LayOut() {
  let { setItemNum, getCart } = useContext(CartContext);
  let { setUserToken, userToken } = useContext(UserContext);

  async function getNumCart() {
    let req = await getCart().catch((err) => {});
    if (req?.data.status === "success") {
      setItemNum(req?.data.numOfCartItems);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== "") {
      setUserToken(localStorage.getItem("userToken"));
      getNumCart();
    }
  }, []);

  return (
    <>
      <div className="LayOut">
        <NavBar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
