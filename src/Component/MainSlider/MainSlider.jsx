import React from "react";
import "./MainSlider.css";
import $ from "jquery";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import img_1 from "../../assets/images/slider-image-1.jpeg";
import img_2 from "../../assets/images/slider-image-2.jpeg";
import img_3 from "../../assets/images/slider-image-3.jpeg";
import img_4 from "../../assets/images/slider-2.jpeg";
import img_5 from "../../assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  return (
    <div className="container my-5">
      <div className="row g-0">
        <div className="col-md-9">
          <OwlCarousel className="owl-theme " items={1} loop>
            <div class="item">
              <img src={img_1} height={500} className="w-100" alt="" />
            </div>
            <div class="item">
              <img src={img_2} height={500} className="w-100" alt="" />
            </div>
            <div class="item">
              <img src={img_3} height={500} className="w-100" alt="" />
            </div>
          </OwlCarousel>
        </div>
        <div className="col-md-3">
          <img src={img_4} className="w-100" height={250} alt="" />
          <img src={img_5} className="w-100" height={250} alt="" />
        </div>
      </div>
    </div>
  );
}
