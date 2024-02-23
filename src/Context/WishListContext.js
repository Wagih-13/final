import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export function WishListContextProvider({ children }) {
  function addToWishList(productId) {
    let body = {
      productId: productId,
    };
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.post(
      "https://route-ecommerce.onrender.com/api/v1/wishlist",
      body,
      options
    );
  }

  function clearWishList(id) {
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.delete(
      `https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,
      options
    );
  }

  function getWishList() {
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.get(
      "https://route-ecommerce.onrender.com/api/v1/wishlist",
      options
    );
  }

  return (
    <>
      <WishListContext.Provider value={{ getWishList, addToWishList , clearWishList}}>
        {children}
      </WishListContext.Provider>
    </>
  );
}
