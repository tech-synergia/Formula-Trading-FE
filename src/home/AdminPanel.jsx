import React, { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import HeaderThree from "../component/header/HeaderThree";
import FooterTwo from "../component/footer/FooterTwo";
// import TabTwo from "../elements/tab/TabTwo";
// import ContactOne from "../elements/contact/ContactOne";
// import Login from "../elements/contact/Login";
// import PortfolioList from "../elements/portfolio/PortfolioList";
// import ServiceList from "../elements/service/ServiceList";
// import BlogContent from "../elements/blog/BlogContent";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import UploadMedia from "../elements/contact/UploadMedia";

// const SlideList = [
//   {
//     textPosition: "text-left",
//     category: "A journey of Learnings to excel youn Earnings",
//     title:
//       "Welcome to <span>Formula Space</span> & <span>Deep Learning</span> Zone.",
//     description: "",
//     buttonText: "",
//     buttonLink: "",
//   },
// ];
const AdminPanel = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [existingEmail, setExistingEmail] = useState("");
  const [existingPass, setExistingPass] = useState("");

  const checkLoggedIn = async () => {
    try {
      const response = await axios.post("http://13.235.79.219/api/auth/token", {
        accessToken,
      });
      setIsLoggedIn(true);
      setUserDetails(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  // const handleExistingUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://13.235.79.219/api/auth/existingUser",
  //       { email: existingEmail, password: existingPass }
  //     );
  //     alert(response.data.msg);
  //   } catch (error) {
  //     alert(error.response.data.msg);
  //   }
  // };

  // let title = "Description",
  //   description =
  //     'There are many variations of passages of Lorem Ipsum available, but the majority have suffered <a href="#">alteration</a> in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum,';

  //   let title = details.title,
  //     description = details.description;
  // const PostList = BlogContent.slice(0, 3);
  return (
    <div>
      <Helmet pageTitle="Portfolio Landing" />
      <HeaderThree
        homeLink="/"
        logo="symbol-dark"
        color="color-black"
        isLoggedIn={isLoggedIn}
        userDetails={userDetails}
        isSubscribed={true}
      />
      <div id="home" className="fix">
        <div className="slider-wrapper"></div>
      </div>
      <div id="about" className="fix"></div>
      <div id="register" className="fix">
        <div className="rn-contact-area ptb--120 bg_color--1">
          <UploadMedia accessToken={accessToken} />
        </div>
      </div>
      {/* <div
        id="existingUser"
        className="fix"
        style={{
          backgroundColor: "snow",
          width: "50%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {" "}
        Add Existing User Here!
        <form onSubmit={handleExistingUser}>
          <input
            style={{ margin: "5px 10px" }}
            type="email"
            onChange={(e) => setExistingEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            style={{ margin: "5px 10px" }}
            type="text"
            onChange={(e) => setExistingPass(e.target.value)}
            placeholder="Password"
          />
          <button
            type="submit"
            style={{
              padding: "15px",
              backgroundColor: "orangered",
              margin: "5px 10px",
              color: "white",
            }}
          >
            Submit
          </button>
        </form>
      </div> */}

      <FooterTwo />

      <div className="backto-top">
        <ScrollToTop showUnder={160}>
          <FiChevronUp />
        </ScrollToTop>
      </div>
    </div>
  );
};

export default AdminPanel;
