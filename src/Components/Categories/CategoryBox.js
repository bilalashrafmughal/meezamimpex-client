import React, { Component } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import "./category.css";
import Category from "./Category";
import BackdropLoader from "../BackdropLoader";

class CategoryBox extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      slider: false,
      itemsInSlider: 4,
      bdl: {
        open: false,
        message: "",
      },
    };
  }

  // items in slider set
  itemsInSliderSet = (e) => {
    let screenWidth;
    if (e) {
      screenWidth = e.target.outerWidth;
    } else {
      screenWidth = window.outerWidth;
    }

    if (screenWidth > 768) {
      this.setState({
        itemsInSlider: 4,
      });
    } else if (screenWidth < 768 && screenWidth > 480) {
      this.setState({
        itemsInSlider: 3,
      });
    } else if (screenWidth > 380 && screenWidth < 768) {
      this.setState({
        itemsInSlider: 2,
      });
    } else if (screenWidth < 380) {
      this.setState({
        itemsInSlider: 1,
      });
    }
  };

  // DID MOUNT

  async componentDidMount() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getcategories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    this.setState({
      bdl: { open: true, message: "Loading..." },
    });

    if (response.status === 200) {
      this.setState({
        categories: response.data.categories,
        slider: true,
        bdl: { open: false, message: "" },
      });
      this.itemsInSliderSet();
      window.addEventListener("resize", this.itemsInSliderSet);
    } else {
      this.state({ categories: [] });
    }
  }

  render() {
    const { itemsInSlider } = this.state;
    const { open, message } = this.state.bdl;
    return (
      <div className="category-box" id="catbox">
        <BackdropLoader open={open} message={message} />
        <div className="container">
          <div className="row aim-subheading">
            <p> We offer our best </p>
          </div>

          <div className="row aim-mainheading">
            <h3> Our Categories </h3>
          </div>

          {this.state.slider && (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              items={itemsInSlider}
              autoplayHoverPause={true}
              autoplay={false}
              autoplaySpeed={500}
              nav
            >
              {this.state.categories.map((item, i) => (
                <Category key={i + "category"} category={item} />
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    );
  }
}

export default CategoryBox;
