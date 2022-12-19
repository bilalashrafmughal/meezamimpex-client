import React, { Component } from "react";
import { Link } from "react-router-dom";

class Category extends Component {
  render() {
    const { img, slogan, _id, heading } = this.props.category;

    return (
      <div className="item">
        <div className="cat-img-box">
          <img
            src={`${process.env.REACT_APP_API_URI}/category/photo/${_id}`}
            alt="cat-img"
          />
        </div>
        <div className="cat-btn-box">
          <Link className="btn small-btn btn-filled " to={`/catagoryid/${_id}`}>
            {" "}
            {heading}{" "}
          </Link>
          <p> {slogan.substring(0, 17)}... </p>
        </div>
      </div>
    );
  }
}

export default Category;
