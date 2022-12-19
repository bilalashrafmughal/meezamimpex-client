import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  formDiv: {
    position: "absolute",
    width: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  formStyles: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },
  inputFields: {
    width: "100%",
  },
});

const initState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  reEnterPassword: "",
};

export default function Signup() {
  const classes = useStyles();
  const [state, setState] = useState(initState);

  // ========================== FUNCTIONS===========================
  // on form change
  const handleForm = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  // on form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, password, email } = state;

    const response = await axios({
      url: `${process.env.REACT_APP_API_URI}/createadmin`,
      method: "post",
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    console.log({ data: response.data });
    // setState({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   reEnterPassword: "",
    // });
  };

  // ========================== RENDER PART ===========================

  return (
    <div className={classes.root}>
      <div className={classes.formDiv}>
        <div className="container">
          <div style={{ marginBottom: "0" }} className="row aim-mainheading">
            <h3> Create New Admin </h3>
          </div>

          <div className="row aim-subheading">
            <p> You are login with master account </p>
          </div>

          {/* INPUT FIELDS */}

          <form onSubmit={onSubmit} className={classes.formStyles}>
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="text"
              name="firstName"
              value={state.firstName}
              placeholder="First Name"
            />
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="text"
              name="lastName"
              value={state.lastName}
              placeholder="Last Name"
            />
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="email"
              value={state.email}
              name="email"
              placeholder="Email"
            />
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="password"
              name="password"
              value={state.password}
              placeholder="Password"
            />
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="password"
              name="reEnterPassword"
              value={state.reEnterPassword}
              placeholder="Re-Password"
            />
            <input
              style={{ width: "fit-content" }}
              className="btn btn-filled mediam-button"
              type="submit"
              name="submit"
              value="Create Admin"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
