import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./categoryDetails.css";
import ProductCard from "./Card";
import { productsList } from "../../models/productsList";
import { servicesCategories } from "../../models/servicesCategories";

class CategoryDetails extends Component {
  render() {
    console.log("cc props", this.props);
    console.log("cc producs", productsList);

    return (
      <div className="products-list">
        <div className="container-fluid cover-img">
          <div className="hero-text">
            <h1> Our Products </h1>
          </div>
        </div>

        <div className="container">
          {/* Products nav bar to get related */}

          <div className="product-nav">
            {servicesCategories.map((service) => (
              <NavLink
                key={service.heading}
                className="btn small-btn btn-outlined"
                activeClassName="link-active"
                to={`/catagoryid/${service.id}/${service.category}`}
              >
                {" "}
                {service.heading}{" "}
              </NavLink>
            ))}
          </div>

          <div className="row aim-subheading">
            <p> Products </p>
          </div>

          <div className="row aim-mainheading">
            <h3> Quiity is Our Passion </h3>
          </div>
          <div className="row product-list-box">
            {productsList.map(
              (product) =>
                product.category === this.props.params.category && (
                  <ProductCard product={product} />
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryDetails;
