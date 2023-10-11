import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setToken, userDetail } from "../../store";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Button } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rnEmail: "",
      rnPassword: "",
      isForgotPasswordModalVisible: false,
      keepMeLoggedIn: false,
      showPassword: false,
    };

    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { rnEmail, rnPassword, keepMeLoggedIn } = this.state;

    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post(
        "https://formulabasetrader.com/api/auth/login",
        {
          email: rnEmail,
          password: rnPassword,
        }
      );

      if (!keepMeLoggedIn) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
      } else {
        this.props.setToken(response.data.accessToken);
        this.props.userDetail({
          username: response.data.user.name,
          userId: response.data.user.userId,
          role: response.data.user.role,
        });
      }

      if (response.data.redirectToRegister) {
        // window.location.href = "/#register"; // Replace with the actual URL of your register page
        const registerForm = document.getElementById("register-form"); // Replace with the actual ID of your register form element
        if (registerForm) {
          registerForm.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
        }
      }
      window.location.reload();
      // window.location.href="/#register"
      // console.log("Login successful", response.data);
    } catch (error) {
      console.error("Login error", error);
      alert(error.response.data.msg);
    }
  };

  toggleForgotPasswordModal = () => {
    this.setState((prevState) => ({
      isForgotPasswordModalVisible: !prevState.isForgotPasswordModalVisible,
    }));
  };

  handleForgotPassword = async () => {
    const { rnEmail } = this.state;
    try {
      const response = await axios.post(
        "https://formulabasetrader.com/api/auth/forgot-password",
        { email: rnEmail }
      );
      alert(response.data.msg);
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { isForgotPasswordModalVisible, keepMeLoggedIn, showPassword } =
      this.state;
    return (
      <div className="contact-form--1">
        <div className="container">
          <div
            className="row row--35 align-items-start"
            style={{ flexDirection: "row-reverse" }}
          >
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--50">
                <h2 className="title text-light">Login</h2>
                <p className="description text-light">Login to your account.</p>
              </div>
              <div className="form-wrapper">
                <form onSubmit={this.handleLogin}>
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

                  <label htmlFor="item05" style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="item05"
                      value={this.state.rnPassword}
                      onChange={(e) => {
                        this.setState({ rnPassword: e.target.value });
                      }}
                      placeholder="Password *"
                    />
                    <button
                      type="button"
                      onClick={this.toggleShowPassword}
                      title={
                        this.state.showPassword
                          ? "Hide password"
                          : "Reveal password"
                      }
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "10px",
                        borderRadius: "10px",
                        color: "white",
                        border: "none",
                      }}
                    >
                      {this.state.showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </label>

                  <label
                    htmlFor="keepMeLoggedIn"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      id="keepMeLoggedIn"
                      checked={keepMeLoggedIn}
                      onChange={(e) => {
                        this.setState({ keepMeLoggedIn: e.target.checked });
                      }}
                      style={{ width: "unset", margin: "0 5px 0 0" }}
                    />
                    Keep me logged in!
                  </label>

                  <button
                    className="rn-button-style--2 btn-solid text-dark"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                  >
                    Login
                  </button>
                  <Button
                    style={{ color: "white", border: "none" }}
                    type="link"
                    onClick={this.toggleForgotPasswordModal}
                  >
                    Forgot Password?
                  </Button>
                </form>
              </div>
            </div>
            <Modal
              title="Forgot Password"
              visible={isForgotPasswordModalVisible}
              onCancel={this.toggleForgotPasswordModal}
              footer={null} // Remove the footer
            >
              <Form>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    onChange={(e) => {
                      this.setState({ rnEmail: e.target.value });
                    }}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleForgotPassword}
                >
                  Send Verification link
                </Button>
              </Form>
            </Modal>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="thumbnail mb_md--30 mb_sm--30">
                <img src="/assets/images/about/login.jpg" alt="trydo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  userDetail: (details) => dispatch(userDetail(details)),
});
export default connect(null, mapDispatchToProps)(Login);
