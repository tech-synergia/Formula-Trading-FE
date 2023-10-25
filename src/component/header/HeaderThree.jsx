import React, { Component } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";
import Scrollspy from "react-scrollspy";
import { persistor } from "../../store";
import { withRouter } from "react-router-dom";
import axios from "axios";

const SocialShare = [
  { Social: <FaWhatsapp />, link: "https://wa.me/+918826868121" },
  { Social: <FaYoutube />, link: "https://www.youtube.com/@FBtrader219" },
  { Social: <FaTelegramPlane />, link: "https://t.me/Formulabasetrader" },
  {
    Social: <FaInstagram />,
    link: "https://www.instagram.com/formulabasetrader",
  },
];
class HeaderThree extends Component {
  constructor(props) {
    super(props);
    this.menuTrigger = this.menuTrigger.bind(this);
    this.CLoseMenuTrigger = this.CLoseMenuTrigger.bind(this);
    this.stickyHeader = this.stickyHeader.bind(this);

    //  this.subMetuTrigger = this.subMetuTrigger.bind(this);

    window.addEventListener("load", function () {
      console.log("All assets are loaded");
    });

    this.handleLogout = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + this.props.accessToken,
        },
      };
      await axios.get("https://formulabasetrader.com/api/auth/logout", config);
      persistor.purge();
      sessionStorage.clear();
      this.props.history.push("/");
      window.location.reload();
    };
  }
  menuTrigger() {
    document.querySelector(".header-wrapper").classList.toggle("menu-open");
  }

  CLoseMenuTrigger() {
    document.querySelector(".header-wrapper").classList.remove("menu-open");
  }

  stickyHeader() {}

  render() {
    window.addEventListener("scroll", function () {
      var value = window.scrollY;
      if (value > 100) {
        document.querySelector(".header--fixed").classList.add("sticky");
      } else {
        document.querySelector(".header--fixed").classList.remove("sticky");
      }
    });

    var elements = document.querySelectorAll(".has-droupdown > a");
    for (var i in elements) {
      if (elements.hasOwnProperty(i)) {
        elements[i].onclick = function () {
          this.parentElement
            .querySelector(".submenu")
            .classList.toggle("active");
          this.classList.toggle("open");
        };
      }
    }
    const {
      logo,
      color = "default-color",
      isLoggedIn,
      userDetails,
      isSubscribed,
    } = this.props;
    let logoUrl;
    if (logo === "light") {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-bg.png"
          alt="Formula Trader"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else if (logo === "dark") {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-bg.png"
          alt="Formula Trader"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else if (logo === "symbol-dark") {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-bg.png"
          alt="Formula Trader"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else if (logo === "symbol-light") {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-bg.png"
          alt="Formula Trader"
          style={{ width: "60px", height: "60px" }}
        />
      );
    } else {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-bg.png"
          alt="Formula Trader"
          style={{ width: "60px", height: "60px" }}
        />
      );
    }

    return (
      <header className={`header-area header-style-two header--fixed ${color}`}>
        <div className="header-wrapper">
          <div className="header-left d-flex align-items-center">
            <div className="logo">
              <a href={this.props.homeLink}>{logoUrl}</a>
            </div>
            <nav className="mainmenunav d-lg-block ml--50">
              <Scrollspy
                className="mainmenu"
                items={[
                  "home",
                  "about",
                  "register",
                  "login",
                  "profile",
                  "adminpanel",
                ]}
                currentClassName="is-current"
                offset={-200}
              >
                <li>
                  <a href="/">Home</a>
                </li>
                {!isSubscribed && (
                  <li>
                    <a href="#about">Membership</a>
                  </li>
                )}
                {!isLoggedIn && (
                  <li>
                    <a href="#register">Register</a>
                  </li>
                )}

                {!isLoggedIn && (
                  <li>
                    <a href="#login">Login</a>
                  </li>
                )}
                {isLoggedIn && userDetails.role === "admin" && (
                  <li>
                    <a href="/adminpanel">Admin Panel</a>
                  </li>
                )}
                {isLoggedIn ? (
                  <li style={{ textTransform: "capitalize" }}>
                    <a href="#">
                      {userDetails.name ? userDetails.name : userDetails.email}
                    </a>
                  </li>
                ) : (
                  <li>
                    <a href="#login">Profile</a>
                  </li>
                )}

                {isLoggedIn && (
                  <li onClick={this.handleLogout}>
                    <a style={{ cursor: "pointer" }}>Logout</a>
                  </li>
                )}
                <button style={{ border: "none", cursor: "default" }}>
                  <a
                    className="rn-button-style--2 btn-solid"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                    style={{
                      marginTop: "5px",
                      backgroundColor: "orangered",
                      borderColor: "orangered",
                      color: "white",
                    }}
                    href="https://formulabasetrader.graphy.com"
                  >
                    Courses
                  </a>
                </button>
              </Scrollspy>
            </nav>
          </div>
          <div className="header-right">
            <div className="social-share-inner">
              <ul className="social-share social-style--2 color-black d-flex justify-content-start liststyle">
                {SocialShare.map((val, i) => (
                  <li key={i}>
                    <a className="text-warning" href={`${val.link}`}>
                      {val.Social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="header-btn">
              <a
                className="rn-btn"
                href="https://themeforest.net/checkout/from_item/25457315?license=regular"
              >
                <span>buy now</span>
              </a>
            </div> */}
            {/* Start Humberger Menu  */}
            <div className="humberger-menu d-block d-lg-none pl--20">
              <span
                onClick={this.menuTrigger}
                className="menutrigger text-white"
              >
                <FiMenu />
              </span>
            </div>
            {/* End Humberger Menu  */}
            <div className="close-menu d-block d-lg-none">
              <span onClick={this.CLoseMenuTrigger} className="closeTrigger">
                <FiX />
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default withRouter(HeaderThree);
