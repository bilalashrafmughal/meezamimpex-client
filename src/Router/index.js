import React, { Component } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import Navbar from "../Components/Navbar";
import Signin from "../AdminPanel/Signin";
import Signup from "../AdminPanel/Signup";
import PageNotFound from "../Components/PageNotFound";
import Footer from "../Components/Footer";
import {
  loginAction,
  logoutAction,
} from "../Components/ReducersActions/Actions";
import CategoryPanel from "../AdminPanel/CategoryPanel";
import ProductPanel from "../AdminPanel/ProductPanel";

import Home from "../Home/Home";
import ProductList from "../Components/ProductList";
import Cart from "../Components/Cart";
import SingleProduct from "../Components/SingleProduct";
import SidePanel from "../AdminPanel/SidePanel";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthenticate: false,
    };
  }
  getId = () => {
    let { id } = useParams();
    return <ProductList params={useParams()} id={id} />;
  };

  getProductId = () => {
    let { id } = useParams();
    return <SingleProduct params={useParams()} id={id} />;
  };

  authenticatedRoutes = () => {
    return (
      <div>
        <SidePanel />
        <Switch>
          <Route exact path="/admin/categories" component={CategoryPanel} />,
          <Route exact path="/admin/products" component={ProductPanel} />,
          <Redirect to="/admin/categories" />
        </Switch>
      </div>
    );
  };

  publicRoutes = () => {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />,
          <Route exact path={`/catagoryid/:id`} component={this.getId} />
          <Route exact path={`/products/:id`} component={this.getProductId} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/admin/signin" component={Signin} />
          <Route exact path="/admin/signup" component={Signup} />
          <Route path="/pageNotFound" component={PageNotFound} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          {this.props.state.auth
            ? this.authenticatedRoutes()
            : this.publicRoutes()}
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginMethod: (auth) => dispatch(loginAction(auth)),
    logutMethod: () => dispatch(logoutAction()),
  };
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
