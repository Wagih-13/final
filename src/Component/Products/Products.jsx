import React, { useContext } from "react";
import "./ProductsModule.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  let urlParamiter = useParams();
  let { isLoading, data } = useQuery("product", getAllProducts);
  let { addCart, setItemNum } = useContext(CartContext);

  let filterByCategory = data?.data.data.filter((el) => {
    if (el.brand._id.includes(urlParamiter.id) !== false) {
      return el.brand._id.includes(urlParamiter.id);
    } else {
      return el.category._id.includes(urlParamiter.id);
    }
  });

  function getAllProducts() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
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
  function switche(inf) {
    if (inf.target.classList.contains("fa-regular")) {
      inf.target.classList.replace("fa-regular", "fa-solid");
      inf.target.classList.replace("text-dark", "text-danger");
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
          <div className="cards">
            {filterByCategory.map(function (el) {
              return (
                <>
                  <div className="card">
                    <i
                      class="fa-regular fa-heart fa-xl z-3 position-absolute top-0 end-0 p-3 mt-2 text-dark "
                      onClick={(inf) => {
                        switche(inf);
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
        </>
      )}
    </>
  );
}
