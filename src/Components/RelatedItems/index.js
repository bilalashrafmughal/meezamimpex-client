import React, { Component } from "react";
import "./relateditems.css";
import ProductCard from "./Card";
import axios from "axios";

class RelatedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsList: [],
    };
  }

  getProductByCatId = async (catId) => {
    const response2 = await axios.get(
      `${process.env.REACT_APP_API_URI}/productsByCategoryid/${catId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response2.status === 200) {
      return response2.data.products;
    } else {
      return [];
    }
  };

  async componentDidMount() {
    const products = await this.getProductByCatId(
      this.props.productValues.categoryId
    );
    this.setState({
      productsList: products,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.productValues._id !== prevProps.productValues._id) {
      const products = await this.getProductByCatId(
        this.props.productValues.categoryId
      );
      this.setState({
        productsList: products,
      });
    }
  }

  render() {
    return (
      <div className="products-list">
        <div className="container">
          <div className="message-heading">
            <h5> Related Items </h5>
          </div>

          <div className="row product-list-box">
            {this.state.productsList.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedProducts;
