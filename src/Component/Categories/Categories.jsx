import React from "react";
import "./CategoriesModule.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  let { isLoading, data } = useQuery("categorie", getAllCategories);

  function getAllCategories() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
  }


  return (
    <>
      {isLoading ? (
        <div className="loding">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="cards">
              {data?.data?.data.map((el) => {
                return (
                  <Link to={`/Products/${el?._id}`}>
                    <div className="card">
                      <img className="w-100" src={el.image} alt="" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
