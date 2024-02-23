import React, { useContext, useEffect, useState } from "react";
import "./ProductsDetailsModule.css";
import $ from "jquery";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function ProductsDetials() {
  let { addCart, setItemNum } = useContext(CartContext);
  let product = useParams();
  let [productId, setProductId] = useState();
  useEffect(() => {
    setProductId(product.id);
  }, []);
  
  let { isLoading, data } = useQuery(
    ["productDetails", productId],
    getProductDetails
  );

  function getProductDetails(queryData) {
    return axios
      .get(
        `https://route-ecommerce.onrender.com/api/v1/products/${queryData.queryKey[1]}`
      )
      .catch((err) => {});
  }
  function getScr(e) {
    let imagPath = e.target.getAttribute("src");
    document.querySelector("#mainImage").setAttribute("src", imagPath);
  }

  async function addToCart(id) {
    let req = await addCart(id).catch((err) => {
      toast.error("This didn't work.");
    });
    if (req?.data.status === "success") {
      setItemNum(req.data.numOfCartItems);
      toast.success("Successfully added!");
    }
  }
  let pro = data?.data.data;
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <div className="loding">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="container">
          <div className="row align-items-center g-3 my-5 ">
            <div className="pictureSid col-md-4 ">
              <div className="">
                <img
                  src={pro?.imageCover}
                  id="mainImage"
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="minImages">
                <OwlCarousel
                  className="owl-theme "
                  items={4}
                  nav={true}
                  dots={true}
                >
                  {pro?.images.map((el) => {
                    return (
                      <div class="item">
                        <img
                          src={el}
                          className="  images"
                          height={100}
                          onClick={(e) => {
                            getScr(e);
                          }}
                          alt=""
                        ></img>
                      </div>
                    );
                  })}
                </OwlCarousel>
              </div>
            </div>
            <div className="col-md-8 my-5">
              <h2>{pro?.title}</h2>
              <p className="text-muted">{pro?.description}</p>
              <h6>{pro?.category.name}</h6>
              <div className="price textColor">
                <span className="textBold ">
                  {pro?.price}
                  <span>Egp</span>
                </span>
                <span>
                  <i className="fa-solid fa-star "></i>
                  {pro?.ratingsAverage.toFixed(1)}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(pro.id);
                }}
                className="btn btn-success w-100 my-5"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
