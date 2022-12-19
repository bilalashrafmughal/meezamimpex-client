import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";

class ProductCard extends Component {
  render() {
    return (
      <div className="col-md-4" key={this.props.product.title}>
        <Card
          hoverable
          style={{ width: 300, margin: "auto", marginBottom: "20px" }}
          cover={<img alt="example" src={this.props.product.img} />}
        >
          <div className="product-card-text">
            <h3> {this.props.product.title} </h3>
            <h5> ${this.props.product.price}.00 </h5>
            <p> Brand: {this.props.product.brand} </p>
            <p> Product: {this.props.product.productName} </p>
            <span> {this.props.product.description} </span>
          </div>
        </Card>
      </div>
    );
  }
}

export default ProductCard;
