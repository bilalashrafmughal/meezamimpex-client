import React, { Component } from "react";
import NavLink from "react-router-dom/NavLink";
import "./productList.css";
import ProductCard from "./Card";
import axios from "axios";
import BackdropLoader from "../BackdropLoader";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      bdl: { open: false, message: "" },
    };
  }

  async componentDidMount() {
    this.setState({
      bdl: { open: true, message: "Loading..." },
    });
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getcategories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.status === 200
      ? this.setState({ categories: response.data.categories })
      : this.state({ categories: [] });

    const response2 = await axios.get(
      `${process.env.REACT_APP_API_URI}/productsByCategoryid/${this.props.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response2.status === 200
      ? this.setState({
          products: response2.data.products,
          bdl: { open: false, message: "" },
        })
      : this.state({ products: [] });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        bdl: { open: true, message: "Loading..." },
      });
      const response2 = await axios.get(
        `${process.env.REACT_APP_API_URI}/productsByCategoryid/${this.props.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response2.status === 200
        ? this.setState({
            products: response2.data.products,
            bdl: { open: false, message: "" },
          })
        : this.state({ products: [] });
    }
  }

  render() {
    const { open, message } = this.state.bdl;
    return (
      <div className="products-list">
        <BackdropLoader open={open} message={message} />

        <div className="container-fluid cover-img">
          <div className="hero-text">
            <h1> Our Products </h1>
          </div>
        </div>

        <div className="container">
          {/* Products nav bar to get related */}

          <div className="product-nav">
            {this.state.categories.map((service) => (
              <NavLink
                key={service._id}
                className="btn small-btn btn-outlined"
                activeClassName="link-active"
                to={`/catagoryid/${service._id}`}
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
            {this.state.products.map((product, i) => (
              <ProductCard key={`product-card-${i}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
