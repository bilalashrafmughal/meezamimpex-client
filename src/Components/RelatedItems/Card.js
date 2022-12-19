import React, { Component } from "react";
import "antd/dist/antd.css";
import "../ProductList/productList.css";
import { Card } from "antd";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    return (
      <div className="col-md-4" key={this.props.product._id}>
        <Link to={`/products/${this.props.product._id}`}>
          <Card
            hoverable
            style={{ width: 300, margin: "auto", marginBottom: "20px" }}
            cover={
              <img
                alt="example"
                src={`${process.env.REACT_APP_API_URI}/product/photo/${this.props.product._id}`}
              />
            }
          >
            <div className="product-card-text">
              <h3> {this.props.product.title} </h3>
              {this.props.product.price === null ? (
                <span>Price: Not Specified </span>
              ) : (
                <h5> ${this.props.product.price}.00 </h5>
              )}

              <p> Brand: {this.props.product.brand} </p>
              <p> Product: {this.props.product.productName} </p>
              <span> {this.props.product.description} </span>
            </div>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
