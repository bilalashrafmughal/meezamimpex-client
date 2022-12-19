import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./singleProduct.css";
import { addToCartAction } from "../ReducersActions/Actions";
import RelatedItem from "../RelatedItems";
import { Alert } from "react-bootstrap";
import BackdropLoader from "../BackdropLoader";
import {
  GlassMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
  MagnifierContainer,
} from "react-image-magnifiers";
import { connect } from "react-redux";
import axios from "axios";

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productValues: {},
      qty: 1,
      cart: [],
      addedToCart: false,
      liked: false,
      bdl: { open: false, message: "" },
    };
  }

  getProduct = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.product) {
      return response.data.product;
    }
    return {};
  };

  async componentDidMount() {
    this.setState({
      bdl: { open: true, message: "Loading..." },
    });

    const product = await this.getProduct(this.props.id);
    this.setState({
      productValues: product,
      bdl: { open: false, message: "" },
    });

    window.scrollTo(0, 0);
    this.setState({
      qty: 1,
    });

    const reduxCart = this.props.cart;

    reduxCart.map((product) =>
      product.id === this.props.id
        ? this.setState({ addedToCart: true })
        : this.setState({ addedToCart: false })
    );

    let liked = JSON.parse(window.localStorage.getItem("likedProducts"));
    if (liked !== null) {
      var found = false;
      liked.map((obj, i) => {
        if (obj.id === this.state.productValues.id) {
          found = true;
        } else {
          found = false;
        }
        return obj;
      });

      if (found) {
        this.setState({
          liked: true,
        });
      } else {
        this.setState({
          liked: false,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.componentDidMount();
  }

  plus = () => {
    this.setState((prevState) => {
      return { qty: prevState.qty + 1 };
    });
  };
  minus = () => {
    this.setState((prevState) => {
      return { qty: prevState.qty - 1 };
    });
  };

  addToCart = () => {
    const product = {
      id: this.props.id,
      product: {
        qty: this.state.qty,
        product: this.state.productValues,
      },
    };
    this.props.addToCart(product);
    this.forceUpdate();
  };

  likeProduct = () => {
    let liked = JSON.parse(window.localStorage.getItem("likedProducts"));
    if (liked === null) {
      window.localStorage.setItem(
        "likedProducts",
        JSON.stringify([this.state.productValues])
      );
    } else {
      var found = false;
      liked.map((obj, i) => {
        if (obj.id === this.state.productValues.id) {
          found = true;
        } else {
          found = false;
        }
        return obj;
      });
      if (!found) {
        this.setState({
          liked: true,
        });
        liked.push(this.state.productValues);
        window.localStorage.setItem("likedProducts", JSON.stringify(liked));
      } else {
        this.setState({
          liked: false,
        });
      }
    }
  };
  handleQty = (e) => {
    if (e.target.value === "") {
      this.setState({
        qty: 1,
      });
    } else {
      this.setState({
        qty: parseInt(e.target.value),
      });
    }
  };

  render() {
    const { qty } = this.state;
    const { open, message } = this.state.bdl;
    return (
      <>
        <BackdropLoader open={open} message={message} />
        <div className="single-product">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="single-product-img">
                  <MagnifierContainer>
                    <GlassMagnifier
                      imageSrc={`${process.env.REACT_APP_API_URI}/product/photo/${this.props.id}`}
                      imageAlt={this.state.productValues.title}
                      largeImageSrc={`${process.env.REACT_APP_API_URI}/product/photo/${this.props.id}`} // Optional
                      mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
                      touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
                      magnifierSize="45%"
                    />
                  </MagnifierContainer>
                </div>
              </div>
              <div className="col-md-6 my-col">
                <div className="single-product-text">
                  <h2> {this.state.productValues.title} </h2>
                  {this.state.productValues.price === null ? (
                    <h4> Price: Not Specified </h4>
                  ) : (
                    <h4> ${this.state.productValues.price}.00 </h4>
                  )}

                  <p> {this.state.productValues.description} </p>
                  <div className="single-product-about">
                    <p>
                      {" "}
                      Product:{" "}
                      <span>{this.state.productValues.productName}</span>{" "}
                    </p>
                    <p>
                      {" "}
                      Category: <span>
                        {this.state.productValues.category}
                      </span>{" "}
                    </p>
                    <p>
                      {" "}
                      Brand: <span>{this.state.productValues.brand}</span>{" "}
                    </p>
                  </div>
                  {this.state.addedToCart ? (
                    <div className="single-product-counter-panel cart-counter">
                      <button
                        disabled
                        style={{ margin: 0 }}
                        className="btn btn-outlined small-btn disabled"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="qty"
                        disabled
                        value={qty}
                        onChange={this.handleQty}
                      />
                      <button
                        disabled
                        style={{ margin: 0 }}
                        className="btn btn-outlined small-btn disabled"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="single-product-counter-panel cart-counter">
                      {qty === 1 ? (
                        <button
                          disabled
                          style={{ margin: 0 }}
                          className="btn btn-outlined small-btn"
                          onClick={this.minus}
                        >
                          -
                        </button>
                      ) : (
                        <button
                          style={{ margin: 0 }}
                          className="btn btn-outlined small-btn"
                          onClick={this.minus}
                        >
                          -
                        </button>
                      )}

                      <input
                        type="number"
                        name="qty"
                        value={qty}
                        onChange={this.handleQty}
                      />
                      <button
                        style={{ margin: 0 }}
                        className="btn btn-outlined small-btn"
                        onClick={this.plus}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <div
                    style={{ marginTop: "40px" }}
                    className="single-product-btn-box"
                  >
                    {this.state.liked ? (
                      <button
                        disabled
                        onClick={this.likeProduct}
                        className="btn btn-outlined medium-btn hide"
                      >
                        {" "}
                        <i className="fas fa-heart"></i> Like{" "}
                      </button>
                    ) : (
                      <button
                        onClick={this.likeProduct}
                        className="btn btn-outlined medium-btn hide"
                      >
                        {" "}
                        <i className="fas fa-heart"></i> Like{" "}
                      </button>
                    )}

                    {this.state.addedToCart === true ? (
                      <button
                        className="btn btn-filled medium-btn disabled"
                        disabled
                      >
                        {" "}
                        <i className="fas fa-shopping-cart"></i> Add To Cart{" "}
                      </button>
                    ) : (
                      <button
                        className="btn btn-filled medium-btn"
                        onClick={this.addToCart}
                      >
                        {" "}
                        <i className="fas fa-shopping-cart"></i> Add To Cart{" "}
                      </button>
                    )}

                    <Alert
                      style={
                        this.state.addedToCart
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      variant="success"
                    >
                      This item is already in the cart, visit{" "}
                      <Link to="/cart">cart</Link> .
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedItem productValues={this.state.productValues} />
      </>
    );
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCartAction(product)),
  };
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, mapDispatchToState)(SingleProduct);
