// React Required
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store"; // Import your
import DisableDevtool from "disable-devtool";

// Create Import File
import "./index.scss";

import PageScrollTop from "./component/PageScrollTop";

// Admin Panel
import AdminPanel from "./home/AdminPanel";

// Home layout
import PortfolioLanding from "./home/PortfolioLanding";

import PaymentPage from "./home/PaymentPage";

// Blocks Layout
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import UserProfile from "./home/UserProfile";
import ForgotPassword from "./blocks/forgot";

DisableDevtool();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename={"/"}>
            <PageScrollTop>
              <Switch>
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
              </Switch>
            </PageScrollTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
