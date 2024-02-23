import React, { useEffect, useState } from "react";
import "./CategorySlider.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

export default function CatigorySlider() {
  let [categoryList, setCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);
  async function getAllCategory() {
    let req = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
    setCategory(req.data.data);
  }
  return (
    <div className="  my-5">
      <OwlCarousel items={7} autoplay={true} loop autoplayTimeout={1500}>
        {categoryList.map((element) => {
          return (
            <div className="item">
              <img
                src={element.image}
                className="CategorySliderImg"
                height={250}
                alt=""
              />
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}
