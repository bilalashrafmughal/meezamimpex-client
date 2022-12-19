import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { Link } from "react-router-dom";
import { footerProps } from "./data";

const useStyles = makeStyles({
  footerMain: {
    backgroundColor: "var(--main-redish)",
    padding: "30px",
  },
  gridBox: {
    "& span": {
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.7)",
      marginBottom: "5px",
      fontSize: "18px",
    },
    "& ul": {
      listStyle: "none",
      paddingLeft: "7px",
    },
    "& ul li": {
      color: "rgba(255, 255, 255, 0.5)",
    },
    "& ul li a": {
      textTransform: "capitalize",
      color: "rgba(255, 255, 255, 0.5)",
    },
    "& p": {
      paddingLeft: "7px",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  iconBox: {
    display: "inline-block",
    padding: "0 8px",
    color: "rgba(255, 255, 255, 0.5)",
    "& i": {
      fontSize: "15px",
    },
  },
  iconText: {
    display: "inline-block",
  },
  socialIcons: {
    textAlign: "center",
    width: "100%",
    "& a i": {
      width: "35px",
      height: "35px",
      lineHeight: "35px",
      borderRadius: "50%",
      border: "1px solid rgba(255, 255, 255, 0.7)",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  copyrightHeading: {
    width: "100%",
    textAlign: "center",
    "& span": {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "14px",
    },
  },
});

export default function Footer() {
  const classes = useStyles();
  let [categories, setCategories] = useState([]);

  // ================================ FUNCTION ==========================
  const getCategories = async () => {
    // GETTING CATEGORIES...!
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}/getcategories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setCategories(response.data.categories);
    } else {
      alert("Could not get categories in footer");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // ================================ RETURN ============================

  return (
    <div className={classes.footerMain}>
      <div className="container">
        <div className="row">
          <div className={`col-md-3`}>
            <div className={classes.gridBox}>
              <span> Categories </span>
              <ul>
                {categories.map((category, i) => (
                  <li key={category._id}>
                    {" "}
                    <Link to={`/catagoryid/${category._id}`}>
                      {category.heading}
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* =================== */}
          <div id="about-footer" className={`col-md-3`}>
            <div className={classes.gridBox}>
              <span> About </span>
              <ul>
                <li>
                  {" "}
                  <a href="#top">Home</a>{" "}
                </li>
                {footerProps.about.map((abt, i) => (
                  <li>
                    {" "}
                    <Link key={abt.link} to={`${abt.link}`}>
                      {abt.name}
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* =================== */}
          <div className={`col-md-3`}>
            <div className={classes.gridBox}>
              <span> {footerProps.company.name} </span>
              <p> {footerProps.company.aboutText.substring(0, 200)}... </p>
            </div>
          </div>
          {/* =================== */}
          <div id="contact-us-footer" className={`col-md-3`}>
            <div className={classes.gridBox}>
              <span> Our Contacts </span>
              <ul>
                {footerProps.contacts.map((contact) => (
                  <li key={contact.value}>
                    {" "}
                    <div className={classes.iconBox}>
                      {" "}
                      <i className={contact.icon}></i>{" "}
                    </div>
                    {contact.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* ================================ */}
        <hr />
        <div className="row">
          <div className={classes.socialIcons}>
            {footerProps.socialButtons.map((btn) => (
              <a href={btn.link} key={btn.link}>
                {" "}
                <i className={btn.icon} />{" "}
              </a>
            ))}
          </div>
        </div>

        {/* ================================ */}
        <hr />
        <div className="row">
          <div className={classes.copyrightHeading}>
            <span> {footerProps.company.name} &copy; 2021 </span>
          </div>
        </div>
      </div>
    </div>
  );
}
