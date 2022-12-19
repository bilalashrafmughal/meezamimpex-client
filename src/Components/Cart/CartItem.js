import React, { Component } from "react";
import {
  deleteItemAction,
  qtyAction,
  minusQtyAction,
  addQtyAction,
} from "../ReducersActions/Actions";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      index: null,
    };
  }

  componentDidMount() {
    this.setState({ item: this.props.item, index: this.props.index });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item.product.qty !== this.props.item.product.qty) {
      this.setState({
        item: this.props.item,
      });
    }
  }

  deleteItem = () => {
    const value = window.confirm(" want to delte ...?");
    if (value) {
      this.props.deleteItem(this.props.item);
    }
  };
  minus = () => {
    this.props.minusQty(this.props.item.id);
    this.forceUpdate();
  };
  plus = () => {
    this.props.incQty(this.props.item.id);
    this.forceUpdate();
  };
  handleQty = (e) => {
    const reffObj = {
      id: e.target.id,
      qty: e.target.value === "" ? 1 : parseInt(e.target.value),
    };

    this.props.addQty(reffObj);
    this.forceUpdate();
  };

  render() {
    const { item, index } = this.state;
    console.log("cart item");
    return (
      // <tr width="100%" className="cart-item-row">
      <tr width="100%" className="cart-item-row">
        <td>
          <p style={{ color: "var(--main-redish)" }}> {index + 1} </p>
        </td>
        <td>
          {" "}
          <p>
            {" "}
            <img
              src={`${process.env.REACT_APP_API_URI}/product/photo/${item.id}`}
              alt="item img"
            />{" "}
          </p>{" "}
        </td>
        <td>
          {" "}
          <span>{item.product.product.title} </span>{" "}
        </td>
        <td>
          {" "}
          <p> #{index} </p>{" "}
        </td>
        <td>
          {" "}
          <div
            style={{ textAlign: "center" }}
            className="single-product-counter-panel cart-counter"
          >
            <button
              style={{ margin: 0 }}
              className="btn btn-outlined small-btn"
              onClick={this.minus}
            >
              -
            </button>
            <input
              style={{ margin: 0 }}
              id={item.id}
              type="number"
              name="qty"
              value={item.product.qty}
              onChange={this.handleQty}
            />
            {/* <span> {item.product.qty !== undefined && item.product.qty} </span> */}
            <button
              style={{ margin: 0 }}
              className="btn btn-outlined small-btn"
              onClick={this.plus}
            >
              +
            </button>
          </div>{" "}
        </td>
        {item.product.product.price === null ? (
          <td>
            {" "}
            <p> Not Specified </p>{" "}
          </td>
        ) : (
          <td>
            {" "}
            <p> ${item.product.product.price}.00 </p>{" "}
          </td>
        )}

        <td>
          {" "}
          <p onClick={this.deleteItem}>
            <DeleteIcon htmlColor="rgb(214 0 52)" />
          </p>{" "}
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (product) => dispatch(deleteItemAction(product)),
    incQty: (id) => dispatch(qtyAction(id)),
    minusQty: (id) => dispatch(minusQtyAction(id)),
    addQty: (reffObj) => dispatch(addQtyAction(reffObj)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
