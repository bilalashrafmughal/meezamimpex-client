import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

import slide1 from "../../imgs/slide1.jpg";
import gymWear from "../../imgs/gymWear.jpg";
// import ladiesWear from '../../imgs/ladiesWear.jpg'
import sportswear from "../../imgs/sportswear.jpg";
import leatherWear from "../../imgs/leatherWear.jpg";

import "./header.css";

class Header extends Component {
  render() {
    return (
      <Carousel autoplay={true} loop={true}>
        <Carousel.Item>
          <div className="slide-img-box">
            <img src={slide1} alt="slide" />
          </div>
          <div className="slide-text-box">
            <h1> Welcome To Meezam Impax </h1>
            <h6>
              Customer satisfaction by providing quality products at right price
              with best delivery time.
            </h6>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide-img-box">
            <img src={gymWear} alt="slide-image2" />
          </div>
          <div className="slide-text-box">
            <h1> WE OFFER GYM WAER </h1>
            <h6> QAULITY IS OUR PASSION</h6>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="slide-img-box">
            <img src={sportswear} alt="slide-image3" />
          </div>
          <div className="slide-text-box">
            <h1> We Offer Sportswear </h1>
            <h6> Premium Quality at Low Cost </h6>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="slide-img-box">
            <img src={leatherWear} alt="slide-image3" />
          </div>
          <div className="slide-text-box">
            <h1> We Offer Leather Wear </h1>
            <h6>We Speak In Style</h6>
          </div>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Header;
