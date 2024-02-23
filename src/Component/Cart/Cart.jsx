import React, { useContext, useEffect, useState } from "react";
import "./CartModule.css";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  let { clearCart, upDateCart, getCart, clearCartItem, setItemNum } =
    useContext(CartContext);
  let [myData, setMyData] = useState(null);
  let [loding, setLoding] = useState(false);

  async function clearItem(id) {
    let req = await clearCartItem(id);
    if (req?.data.status === "success") {
      setMyData(req);
      setItemNum(req?.data.numOfCartItems);
    }
    if (req?.data.numOfCartItems == 0) {
      clearAllItems();
    }
  }

  async function clearAllItems() {
    let req = await clearCart();
    if (req?.data.message === "success") {
      setMyData(null);
      setItemNum(0);
    }
  }

  async function upDateCartItem(id, num) {
    let req = await upDateCart(id, num);
    if (num === 0) {
      clearItem(id);
    } else {
      if (req?.data.status === "success") {
        setMyData(req);
      }
    }
  }

  useEffect(() => {
    getAllCart();
  }, []);

  async function getAllCart() {
    setLoding(true);
    let req = await getCart().catch((err) => {
      if (err.response.data.statusMsg === "fail") {
        setMyData(null);
        setItemNum(0);
      }
    });
    if (req?.data?.status === "success") {
      setMyData(req);
    }
    setLoding(false);
  }

  return (
    <>
      {loding ? (
        <>
          (
          <div className="loding">
            <span class="loader"></span>
          </div>
          )
        </>
      ) : (
        <>
          {myData != null ? (
            <>
              <div className="container myContainer my-5  rounded-3 position-relative">
                <button
                  className="btn btn-danger clearCart"
                  onClick={clearAllItems}
                >
                  Clear Cart
                </button>
                {myData?.data.data.products.map((el) => {
                  return (
                    <div className="row align-items-center mainRow">
                      <div className="col-md-2">
                        <img
                          src={el.product.imageCover}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="col-md-10 d-flex justify-content-between align-items-center">
                        <div className="info">
                          <h5>{el.product.category.name}</h5>
                          <p>{el.product.title}</p>
                          <h6>{el.price + " EGP"}</h6>
                          <button
                            onClick={() => clearItem(el.product.id)}
                            className="btn btn-danger"
                          >
                            delete
                          </button>
                        </div>
                        <div className="update">
                          <button
                            onClick={() => {
                              upDateCartItem(el.product._id, el.count + 1);
                            }}
                            className="btn btn-success"
                          >
                            +
                          </button>
                          <span className="p-2">{el.count}</span>
                          <button
                            onClick={() => {
                              upDateCartItem(el.product._id, el.count - 1);
                            }}
                            className="btn btn-danger"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="totalPrice p-5 bg-success d-inline-block rounded-3 my-2">
                  <h3>Total Price : {myData?.data.data.totalCartPrice} EGP</h3>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="alert alert-danger"> your cart is empty</div>
            </>
          )}
        </>
      )}
    </>
  );
}
