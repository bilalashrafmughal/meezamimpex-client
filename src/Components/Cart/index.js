import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import Modal from "react-bootstrap/Modal";
// import axios from "axios";
import BackdropLoader from "../BackdropLoader";
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      name: "",
      email: "",
      message: "",
      subject: "",
      showModal: false,
      status: 0,
      bdl: { open: false, message: "" },
    };
  }

  componentDidMount() {
    this.setState({
      cart: this.props.cart,
    });

    window.localStorage.removeItem("cart");
    window.localStorage.setItem("cart", JSON.stringify(this.props.cart));

    console.log("env variables,", process.env.REACT_APP_API_URI);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        cart: this.props.cart,
      });

      console.log("cart updated...!");
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  hideModal = () => {
    this.setState((st) => ({
      showModal: !st.showModal,
      name: "",
      subject: "",
      message: "",
      email: "",
      status: 0,
    }));
  };

  cartTemplete = (cart) => {
    var items = "";
    cart.map((item, i) => {
      const { title, price, category, articalCode } = item.product.product;
      const { qty } = item.product;
      var templete = `<div style="
        font-family: 'Poppins', sans-serif;
        padding: 10px;
        border: 1px solid gray;
        display: inline-block;
        ">

    <div style="
            width: 150px;
            height: 150px;
            margin: auto;
            
            ">
        <img style="
                width: 100%;
                height: 100%;
               
                "
            src="${process.env.REACT_APP_API_URI}/product/photo/${item.id}"
            alt="shirt is here" />
    </div>

    <div style="
        font-family:'Poppins', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: rgb(214, 0, 52);
        ">
        <h3 style="
            margin: 0;
            
            ">${title}</h4>
    </div>
    <p style="
        margin: 0;
        color: rgb(95, 90, 90);
        text-transform: capitalize;
        font-size: 14px;
         "> <strong> Category: </strong> ${category} </p>

    <p style="
margin: 0;
color: rgb(95, 90, 90);
text-transform: capitalize;
font-size: 14px;
 "> <strong> Artical Code: </strong> ${articalCode} </p>

    <p style="
margin: 0;
color: rgb(95, 90, 90);
text-transform: capitalize;
font-size: 14px;
 "> <strong> Product Link: </strong> <a target="_blank" href="https://meezamimpex.com/products/${item.id}"> Product Details </a> </p>

    <p style="
margin: 0;
color: rgb(95, 90, 90);
text-transform: capitalize;
font-size: 14px;
 "> <strong> Unit Price: </strong> ${price}$ </p>

    <p style="
margin: 0;
color: rgb(95, 90, 90);
text-transform: capitalize;
font-size: 14px;
 "> <strong> Quantity Required: </strong> ${qty} </p>


</div>
`;
      items = `${items} ${templete}`;
      return item;
    });

    return items;
  };

  senderInfoCart = (senderInfo) => {
    return ` <div style="
           margin-bottom: 20px;
           font-family: 'Poppins', sans-serif;
                padding: 10px;
                color: rgb(95, 90, 90);
         ">
            <h3> Sender Information</h3>
            <p style="
            margin: 0;
            color: rgb(95, 90, 90);
            text-transform: capitalize;
            font-size: 18px;
             "> <strong> Name:  </strong>${senderInfo.name} </p>
            
            <p style="
            margin: 0;
            color: rgb(95, 90, 90);
            text-transform: capitalize;
            font-size: 18px;
             "> <strong> Email: </strong> ${senderInfo.email}  </p>
        
        <p style="
        margin: 0;
        color: rgb(95, 90, 90);
        text-transform: capitalize;
        font-size: 18px;
         "> <strong> Subject: </strong> ${senderInfo.subject}  </p>
        
        <p style="
            margin: 0;
            color: rgb(95, 90, 90);
            text-transform: capitalize;
            font-size: 18px;
             "> <strong> Message </strong> ${senderInfo.message}  </p>
        </div> `;
  };

  sendQuery = async (e) => {
    e.preventDefault();

    this.setState({
      bdl: { open: true, message: "Message is Sending...." },
    });

    this.setState({
      showModal: true,
      status: 200,
      name: "",
      email: "",
      subject: "",
      message: "",
      cart: [],
      bdl: {
        open: true,
        message: "We did not sent email, becuase its portfolio website!",
      },
    });

    setTimeout(() => {
      this.setState({
        bdl: { open: false, message: "" },
      });
    }, 1000);

    // let query = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   message: this.state.message,
    //   subject: this.state.subject,
    // };

    // let cartTemp = this.cartTemplete(this.state.cart);
    // let senderInfo = this.senderInfoCart(query);

    // // const table = this.myFunct(query)
    // query.cart = `${senderInfo} ${cartTemp}`;

    // const { message, name, ...remaining } = query;

    // const config = {
    //   method: "POST",
    //   url: `${process.env.REACT_APP_API_URI}/sendquery`,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify(remaining),
    // };

    // axios(config)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       this.setState({
    //         showModal: true,
    //         status: res.status,
    //         name: "",
    //         email: "",
    //         subject: "",
    //         message: "",
    //         cart: [],
    //         bdl: { open: true, message: "We did not sent email, becuase its portfolio website!" },
    //       });

    //       setTimeout(() => {
    //         this.setState({
    //           bdl: { open: false, message: "" },
    //         });
    //       }, 1000);
    //     } else {
    //       this.setState({
    //         showModal: true,
    //         status: res.status,
    //         bdl: { open: true, message: "Message Failed...!" },
    //       });

    //       setTimeout(() => {
    //         this.setState({
    //           bdl: { open: false, message: "" },
    //         });
    //       }, 1500);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  render() {
    const { cart, bdl } = this.state;
    return (
      <div className="cart">
        <BackdropLoader open={bdl.open} message={bdl.message} />
        <div className="container">
          <div className="row aim-subheading">
            <p>
              {" "}
              your cart is {this.state.cart.length === 0
                ? "empty"
                : "ready"}{" "}
            </p>
          </div>

          <div className="row aim-mainheading">
            <h3> cart </h3>
          </div>
        </div>
        <Container>
          <table id="cart-table" width="100%">
            {this.state.cart.length === 0 ? (
              <Row>
                {" "}
                <div className="cart-empty-quot">
                  {" "}
                  <p>
                    {" "}
                    Please Choose{" "}
                    <Link style={{ color: "var(--main-redish)" }} to="/#catbox">
                      {" "}
                      <b>Items</b>{" "}
                    </Link>{" "}
                    to add in cart{" "}
                  </p>{" "}
                </div>{" "}
              </Row>
            ) : (
              <tr className="cart-header-row">
                <th>
                  {" "}
                  <p>Sr.</p>{" "}
                </th>
                <th>
                  {" "}
                  <p>IMG</p>{" "}
                </th>
                <th>
                  {" "}
                  <p>Title </p>{" "}
                </th>
                <th>
                  {" "}
                  <p> Item# </p>{" "}
                </th>
                <th>
                  {" "}
                  <p> Qty </p>{" "}
                </th>
                <th>
                  {" "}
                  <p> Price </p>{" "}
                </th>
                <th>
                  {" "}
                  <p>Del.</p>{" "}
                </th>
              </tr>
            )}

            {cart.map((item, i) => (
              <CartItem key={i} index={i} item={item} />
            ))}
          </table>

          <div
            className={
              this.props.cart.length === 0
                ? "query-form display-none"
                : "query-form"
            }
          >
            <div className="aim-mainheading">
              <h3> Send Query </h3>
            </div>
            <form onSubmit={this.sendQuery}>
              <Row>
                <Col>
                  <input
                    onChange={this.handleChange}
                    required
                    name="name"
                    type="text"
                    placeholder="Your Nick Name...!"
                  />
                </Col>
                <Col>
                  <input
                    onChange={this.handleChange}
                    required
                    name="email"
                    type="email"
                    placeholder="Your Email Address...!"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    onChange={this.handleChange}
                    required
                    name="subject"
                    type="text"
                    placeholder="Subject"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <textarea
                    onChange={this.handleChange}
                    required
                    name="message"
                    type="text"
                    placeholder="Your Message"
                  />
                </Col>
              </Row>
              <Row>
                <input
                  className="btn extra-large-btn btn-filled"
                  type="submit"
                  value="Send Query"
                />
              </Row>
            </form>
          </div>
        </Container>

        <>
          <Modal
            size="lg"
            show={this.state.showModal}
            onHide={this.hideModal}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {this.state.status === 200
                  ? `Thank you ${this.state.name}...! Email service is off in this portfolio website`
                  : `Sorry ${this.state.name}, Problem in sending, try again...!`}
              </Modal.Title>
            </Modal.Header>
          </Modal>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};
export default connect(mapStateToProps)(Cart);
