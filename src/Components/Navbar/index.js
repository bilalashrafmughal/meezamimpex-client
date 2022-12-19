import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { connect } from "react-redux";
import axios from "axios";

class Navi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: null,
      categories: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      const itemsInCart = this.props.cart.length;
      this.setState({
        itemsInCart: itemsInCart,
      });
    }
  }

  async componentDidMount() {
    // GETTING CATEGORIES...!
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getcategories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response.status === 200
      ? this.setState({ categories: response.data.categories, slider: true })
      : this.state({ categories: [] });

    //  SETTING CART
    const cart = this.props.cart;
    const itemsInCart = cart.length;
    if (itemsInCart > 0) {
      this.setState({
        itemsInCart: itemsInCart,
      });
    } else {
      this.setState({
        itemsInCart: null,
      });
    }
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="navi">
        <Navbar
          fixed="top"
          sticky="top"
          className="nav-bg-color"
          variant="dark"
          expand="lg"
        >
          <Navbar.Brand>
            {" "}
            <Link style={{ color: "white", fontSize: "25px" }} to="/">
              {" "}
              <i className="fas fa-tshirt"></i>{" "}
            </Link>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" nav-center mr-auto">
              <Nav.Link>
                {" "}
                <Link className="nav-link" style={{ padding: "0" }} to="/">
                  Home
                </Link>
              </Nav.Link>
              <NavDropdown
                style={{ padding: 0 }}
                title="Categories"
                id="basic-nav-dropdown"
              >
                {categories.map((category) => (
                  <NavDropdown.Item
                    style={{
                      backgroundColor: "rgb(214, 0, 52)",
                      borderbottom: "rgba(255,255,255,.5)",
                    }}
                    key={category._id}
                  >
                    {" "}
                    <Link
                      className="navbar-dark navbar-nav nav-link"
                      style={{
                        color: "rgba(255,255,255,.5)",
                        textTransform: "capitalize",
                      }}
                      to={`/catagoryid/${category._id}`}
                    >
                      {" "}
                      {category.heading}{" "}
                    </Link>{" "}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {/* <Nav.Link >  <Link className="nav-link" style={{padding: '0'}} to="/">Blogs</Link></Nav.Link>
      <Nav.Link >  <Link className="nav-link" style={{padding: '0'}} to="/">Featured Products</Link></Nav.Link> */}
              <Nav.Link href="#about-footer">
                {" "}
                <a
                  className="nav-link"
                  style={{ padding: "0" }}
                  href="#about-footer"
                >
                  About Us
                </a>
              </Nav.Link>
              <Nav.Link href="#contact-us-footer">
                {" "}
                <a
                  className="nav-link"
                  style={{ padding: "0" }}
                  href="#contact-us-footer"
                >
                  Contact Us
                </a>
              </Nav.Link>
              {/* <Nav.Link href="/admin/categories" > Admin Panel</Nav.Link> */}
            </Nav>
            <Nav>
              <NavLink to="/cart">
                <div className="cart-box">
                  <i className="fas fa-shopping-cart"></i>
                  {this.state.itemsInCart !== null && (
                    <span> {this.state.itemsInCart} </span>
                  )}
                </div>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Navi);
