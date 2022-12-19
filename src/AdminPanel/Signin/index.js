import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Components/ReducersActions/Actions";

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
  email: "",
  password: "",
};

function Signin() {
  const [state, setState] = useState(initState);
  const [showError, setShowError] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  // ========================== FUNCTIONS===========================
  // on form change
  const handleForm = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  // on form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = state;
    const res = await axios({
      url: `${process.env.REACT_APP_API_URI}/adminsignin`,
      method: "post",
      data: {
        email,
        password,
      },
    });
    if (res.status === 200) {
      window.localStorage.setItem("meezam", JSON.stringify(res.data));
      dispatch(loginAction(res.data));
      window.location.href = "/admin/categories";
      setShowError(false);
    } else {
      console.log("Login error", { err: res.data });
      setShowError(true);
    }
  };

  // ========================== RENDER PART ===========================

  return (
    <div className={classes.root}>
      <div className={classes.formDiv}>
        <div className="container">
          <div style={{ marginBottom: "0" }} className="row aim-mainheading">
            <h3> Signin </h3>
          </div>

          <div className="row aim-subheading">
            <p> Please enter your email and password...! </p>
          </div>
          {/* INPUT FIELDS */}
          <form className={classes.formStyles} onSubmit={onSubmit}>
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
            />
            <input
              onChange={handleForm}
              className={classes.inputFields}
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
            />
            <input
              style={{ width: "fit-content" }}
              className="btn btn-filled mediam-button"
              type="submit"
              name="submit"
              value="login"
            />
          </form>
          <div className="row aim-subheading">
            <p> Email: bilalashraf6233@gmail.com </p>
          </div>
          <div className="row aim-subheading">
            <p> Password: 12345678 </p>
          </div>
          <div className="row aim-subheading">
            <p>
              {" "}
              Note: You can add products and categories in Admin panel but can
              not edit or delete existing Data{" "}
            </p>
          </div>
          <div>
            <Alert
              variant="danger"
              show={showError}
              dismissible
              onClose={() => setShowError(false)}
            >
              {" "}
              Login Failed, please try with correct credentials.{" "}
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
