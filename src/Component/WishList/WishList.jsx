import React, { useContext, useEffect, useState } from "react";
import "./WishListModule.css";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function WishList() {
  let { getWishList, clearWishList } = useContext(WishListContext);
  let { addCart, setItemNum } = useContext(CartContext);
  let [myData, setMyData] = useState(null);
  let [loding, setLoding] = useState(false);

  async function getAllWishList() {
    setLoding(true);
    let req = await getWishList().catch((err) => {});
    if (req?.data?.status === "success") {
      setMyData(req);
    }
    setLoding(false);
  }

  async function clearItem(id) {
    let req = await clearWishList(id).catch(() => {});
    if (req?.data.status === "success") {
      getAllWishList();
    }
  }

  useEffect(() => {
    getAllWishList();
  }, []);

  async function addToCart(id) {
    let req = await addCart(id).catch((err) => {
      toast.error("This didn't work.");
    });
    if (req?.data.status === "success") {
      setItemNum(req.data.numOfCartItems);
    }
    toast.success("Successfully added!");
  }

  //   function switche(inf, id) {
  //     if (inf.target.classList.contains("fa-regular")) {
  //       inf.target.classList.replace("fa-regular", "fa-solid");
  //       inf.target.classList.replace("text-dark", "text-danger");
  //       addToWishList(id);
  //     } else {
  //       inf.target.classList.replace("fa-solid", "fa-regular");
  //       inf.target.classList.replace("text-danger", "text-dark");
  //     }
  //   }
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
          <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container myContainer my-5  rounded-3 position-relative">
              {/* <button
                className="btn btn-danger clearCart"
                // onClick={clearAllItems}
              >
                Clear Cart
              </button> */}
              {myData?.data.data.map((el) => {
                return (
                  <div className="row align-items-center mainRow position-relative">
                    <div className="col-md-2">
                      <img src={el.imageCover} className="w-100" alt="" />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center ">
                      <div className="info">
                        {/* <h5>{el.category.name}</h5> */}
                        <p>{el.title}</p>
                        <h6>{el.price + " EGP"}</h6>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            clearItem(el.id);
                          }}
                        >
                          delete
                        </button>
                        <button
                          className="btn btn-success my-2 m-2"
                          onClick={() => {
                            addToCart(el.id);
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                      <i class="fa-solid fa-heart fa-2x z-3 position-absolute top-0 end-0 p-3 mt-2"></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </>
      )}
    </>
  );
}
