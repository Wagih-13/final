import React, { useContext, useState } from "react";
import "./HomeModule.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function Home() {
  let [page, setPage] = useState(1);
  let { addCart, setItemNum } = useContext(CartContext);
  let { addToWishList } = useContext(WishListContext);
  let { isLoading, data } = useQuery(["homeProducts", page], getAllProducts);

  function getAllProducts(queryData) {
    return axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products?page=${queryData.queryKey[1]}`
    );
  }

  function getPagination(event) {
    let page = event.target.getAttribute("pageNum");
    setPage(page);
  }

  async function addToCart(id) {
    let req = await addCart(id).catch((err) => {
      toast.error("This didn't work.");
    });
    if (req?.data.status === "success") {
      setItemNum(req.data.numOfCartItems);
    }
    toast.success("Successfully added!");
  }

  function switche(inf, id) {
    if (inf.target.classList.contains("fa-regular")) {
      inf.target.classList.replace("fa-regular", "fa-solid");
      inf.target.classList.replace("text-dark", "text-danger");
      addToWishList(id);
    } else {
      inf.target.classList.replace("fa-solid", "fa-regular");
      inf.target.classList.replace("text-danger", "text-dark");
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? (
        <div className="loding">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          <MainSlider></MainSlider>
          <CategorySlider></CategorySlider>
          <div className="container">
            <div className="cards">
              {data?.data.data.map((el) => {
                return (
                  <>
                    <div className="card position-relative">
                      <i
                        class="fa-regular fa-heart fa-xl z-3 position-absolute top-0 end-0 p-3 mt-2 text-dark"
                        onClick={(inf) => {
                          switche(inf, el.id);
                        }}
                      ></i>
                      <Link to={`/ProductsDetails/${el.id}`}>
                        <img src={el.imageCover} alt="" />
                        <div className="info textColor">
                          <h6 className=" text-success">{el.category.name}</h6>
                          <h3>{el.title.split(" ").slice(0, 3).join(" ")}</h3>
                        </div>
                        <div className="price textColor">
                          <span className="textBold ">
                            {el.price}
                            <span>Egp</span>
                          </span>
                          <span>
                            <i className="fa-solid fa-star "></i>
                            {el.ratingsAverage.toFixed(1)}
                          </span>
                        </div>
                      </Link>
                      <div className="container btnContainer">
                        <button
                          onClick={() => {
                            addToCart(el.id);
                          }}
                          className="btn btn-success w-100"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-lg justify-content-center py-5">
                <li className="page-item">
                  <a className="page-link" href aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    pageNum="1"
                    href
                    onClick={getPagination}
                  >
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href
                    pageNum="2"
                    onClick={getPagination}
                  >
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
