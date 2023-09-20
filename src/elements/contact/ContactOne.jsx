import axios from "axios";
import React, { Component } from "react";

class ContactOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rnName: "",
      rnEmail: "",
      rnPhone: "",
      rnState: "",
      rnPassword: "",
      reEnteredPassword: "",
    };
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const { rnName, rnEmail, rnPhone, rnState, rnPassword, reEnteredPassword } =
      this.state;
    if (rnPassword !== reEnteredPassword) {
      alert("Passwords do not match. Please check the password!");
      return;
    }
    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post(
        "http://13.235.79.219/api/auth/register",
        {
          name: rnName,
          email: rnEmail,
          phone: rnPhone,
          state: rnState,
          password: rnPassword,
        }
      );

      console.log("Registered successfully", response.data);
      alert(response.data.msg);
      window.location.hash = "login";
    } catch (error) {
      console.error("Register error", error);
      alert(error.response.data.msg);
    }
  };

  handleReEnterPasswordChange = (e) => {
    this.setState({ reEnteredPassword: e.target.value });
  };

  render() {
    return (
      <div className="contact-form--1" id="register-form">
        <div className="container">
          <div className="row row--35 align-items-start">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--50">
                <h2 className="title text-light">Register</h2>
                <p className="description text-light">
                  Register here to start a new session of your life.
                </p>
              </div>
              <div className="form-wrapper">
                <form onSubmit={this.handleRegister}>
                  <label htmlFor="item01">
                    <input
                      type="text"
                      name="name"
                      id="item01"
                      value={this.state.rnName}
                      onChange={(e) => {
                        this.setState({ rnName: e.target.value });
                      }}
                      placeholder="Your Name *"
                    />
                  </label>

                  <label htmlFor="item02">
                    <input
                      type="text"
                      name="email"
                      id="item02"
                      value={this.state.rnEmail}
                      onChange={(e) => {
                        this.setState({ rnEmail: e.target.value });
                      }}
                      placeholder="Your Email *"
                    />
                  </label>

                  <label htmlFor="item03">
                    <input
                      type="text"
                      name="phone"
                      id="item03"
                      value={this.state.rnPhone}
                      onChange={(e) => {
                        this.setState({ rnPhone: e.target.value });
                      }}
                      placeholder="Phone Number *"
                    />
                  </label>
                  <label htmlFor="item04">
                    <input
                      type="text"
                      name="state"
                      id="item04"
                      value={this.state.rnState}
                      onChange={(e) => {
                        this.setState({ rnState: e.target.value });
                      }}
                      placeholder="State *"
                    />
                  </label>
                  <label htmlFor="item05">
                    <input
                      type="password"
                      name="password"
                      id="item05"
                      value={this.state.rnPassword}
                      onChange={(e) => {
                        this.setState({ rnPassword: e.target.value });
                      }}
                      placeholder="Password *"
                    />
                  </label>
                  <label htmlFor="item06">
                    <input
                      type="password"
                      id="item06"
                      name="password"
                      value={this.state.reEnteredPassword}
                      onChange={this.handleReEnterPasswordChange}
                      placeholder="Re-enter Password *"
                    />
                  </label>
                  <button
                    className="rn-button-style--2 btn-solid text-dark"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="thumbnail mb_md--30 mb_sm--30">
                <img src="/assets/images/about/register.jpg" alt="register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactOne;
