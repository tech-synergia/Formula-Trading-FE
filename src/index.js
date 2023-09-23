// React Required
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store"; // Import your
import DisableDevtool from "disable-devtool";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import dotenv from "dotenv";

// Create Import File
import "./index.scss";

import PageScrollTop from "./component/PageScrollTop";

// Admin Panel
import AdminPanel from "./home/AdminPanel";

// Home layout
import PortfolioLanding from "./home/PortfolioLanding";

// Element Layout
// import error404 from "./elements/error404";

// import UserProfile from "./home/UserProfile";
import PaymentPage from "./home/PaymentPage";

// Blocks Layout
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import UserProfile from "./home/UserProfile";
import ForgotPassword from "./blocks/forgot";

const stripePromise = loadStripe(
  "pk_test_51N9P0TSEkU5laW5MYUizMexJFr4MLn3Wuq2drI32ZKLVT02Uf8tBvV6imn6WYiU0jyxgxEwMHf2N1euSt1a38tev00omIlvIW7"
);

// Load environment variables from .env file(s)
// dotenv.config();

// DisableDevtool();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Elements stripe={stripePromise}>
            <BrowserRouter basename={"/"}>
              <PageScrollTop>
                <Switch>
                  {/* <Route exact path={`${process.env.PUBLIC_URL}/`} component={Demo}/> */}
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    component={PortfolioLanding}
                  />
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/adminpanel`}
                    component={AdminPanel}
                  />

                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/payment`}
                    component={PaymentPage}
                  />

                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/profile`}
                    component={UserProfile}
                  />

                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/user/reset-password`}
                    component={ForgotPassword}
                  />

                  {/* <Route component={error404} /> */}
                </Switch>
              </PageScrollTop>
            </BrowserRouter>
          </Elements>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
