import axios from "axios";
import { createContext, useState } from "react";
export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let [itemNum, setItemNum] = useState(0);

  function getCart() {
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.get(
      "https://route-ecommerce.onrender.com/api/v1/cart",
      options
    );
  }

  function clearCart() {
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.delete(
      "https://route-ecommerce.onrender.com/api/v1/cart",
      options
    );
  }


  function addCart(productId) {
    let body = {
      productId: productId,
    };
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.post(
      "https://route-ecommerce.onrender.com/api/v1/cart",
      body,
      options
    );
  }

  function clearCartItem(id) {
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    return axios.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
      options
    );
  }

  function upDateCart(id, num) {
    let options = {
      headers: { token: localStorage.getItem("userToken") },
    };
    let body = {
      count: num,
    };
    return axios.put(
      `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
      body,
      options
    );
  }

  return (
    <CartContext.Provider
      value={{
        upDateCart,
        clearCartItem,
        addCart,
        itemNum,
        setItemNum,
        getCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
