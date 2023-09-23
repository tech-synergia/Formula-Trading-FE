import React, { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import HeaderThree from "../component/header/HeaderThree";
import FooterTwo from "../component/footer/FooterTwo";
// import TabTwo from "../elements/tab/TabTwo";
import ContactOne from "../elements/contact/ContactOne";
import Info from "../component/info";
import Login from "../elements/contact/Login";
import PortfolioList from "../elements/portfolio/PortfolioList";
// import ServiceList from "../elements/service/ServiceList";
// import BlogContent from "../elements/blog/BlogContent";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import video from "../../public/assets/video/intro.mp4";

// const portFolio = {
//   backgroundColor: "linear-gradient(yellow,#000)"
// }

const SlideList = [
  {
    textPosition: "text-left",
    // category: "A journey of Learnings to excel your Earnings",
    // title:
    //   "Welcome to <span>Formula Space</span> & <span>Deep Learning</span> Zone.",
    description: "",
    buttonText: "",
    buttonLink: "",
  },
];
const PortfolioLanding = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const [details, setDetails] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [allMedia, setAllMedia] = useState([]);
  const paymentAmount = 1001;
  // const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
  //   useState("");

  const history = useHistory();

  const fetchLectures = async () => {
    try {
      const response = await axios.get(
        "https://formulabasetrader.com/api/media/publicMedia"
      );

      setDetails(response.data.media[0]);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoggedIn = async () => {
    try {
      const response = await axios.post(
        "https://formulabasetrader.com/api/auth/token",
        {
          accessToken,
        }
      );
      setIsLoggedIn(true);
      setUserDetails(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMedia = async () => {
    try {
      const response = await axios.get(
        "https://formulabasetrader.com/api/media/getAllMedia",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!response.status === 200) {
        throw new Error("You are not subscribed!");
      }
      setIsSubscribed(true);
      setAllMedia(response.data.media);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
    checkLoggedIn();
    getAllMedia();
  }, []);

  const handleBuyNowClick = async () => {
    if (!isSubscribed) {
      try {
        // Make a POST request to your Stripe API to create a PaymentIntent
        const response = await axios.post(
          "https://formulabasetrader.com/api/stripe",
          {
            price: paymentAmount,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // Extract the client secret from the response
        const { clientSecret } = response.data;

        // Store the client secret in state
        // setPaymentIntentClientSecret(clientSecret);

        // Redirect the user to the next page where they can complete the payment
        history.push("/payment", {
          paymentIntentClientSecret: clientSecret,
          paymentAmount,
        });
        window.location.reload();
      } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        alert(error.response.msg);
        // Handle any errors that occur during the API request
      }
    }
  };

  let title = "Rules and Introduction",
    description =
      "We will share here my stock market journey level and my formula of trade. I will teach you how will do profit every day with small capital";

  // let title = details.title,
  //   description = details.description;
  // const PostList = BlogContent.slice(0, 3);
  return (
    <div>
      <Helmet pageTitle="Portfolio Landing" />
      {userDetails !== null && isLoggedIn !== null && (
        <HeaderThree
          homeLink="/"
          logo="symbol-dark"
          color="color-black"
          userDetails={userDetails}
          isLoggedIn={isLoggedIn}
          isSubscribed={isSubscribed}
        />
      )}
      {/* Start Slider Area   */}
      {!isLoggedIn && (
        <div id="home" className="fix">
          <div className="slider-wrapper">
            {/* Start Single Slide */}

            {SlideList.map((value, index) => (
              <div
                className="slide personal-portfolio-slider slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image bg_image--25"
                key={index}
                style={{
                  height: "600px",
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
      {/* Start About Area */}
      {!isSubscribed && (
        <div id="about" className="fix">
          <div className="about-area ptb--120">
            <div className="about-wrapper">
              <div className="container">
                <div className="row row--35 align-items-center">
                  <div className="col-lg-5">
                    <div className="thumbnail">
                      <video
                        muted
                        className="w-100"
                        src={video} // change this
                        alt="intro video"
                        autoPlay
                        controls="true"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="about-inner inner">
                      <div className="section-title">
                        <h2 className="title text-light">{title}</h2>
                        <p className="description">{description}</p>
                      </div>
                    </div>

                    {isLoggedIn ? (
                      <button style={{ border: "none", cursor: "default" }}>
                        <a
                          className="rn-button-style--2 btn-solid"
                          type="submit"
                          value="submit"
                          name="submit"
                          id="mc-embedded-subscribe"
                          style={{ marginTop: "30px" }}
                          onClick={handleBuyNowClick}
                        >
                          Buy Now
                        </a>
                      </button>
                    ) : (
                      <button style={{ border: "none", cursor: "default" }}>
                        <a
                          className="rn-button-style--2 btn-solid"
                          type="submit"
                          value="submit"
                          name="submit"
                          id="mc-embedded-subscribe"
                          style={{ marginTop: "30px" }}
                          href="#register"
                        >
                          Buy Now
                        </a>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End About Area */}
      {/* Regsiter page is here */}
      {/* Start Service Area  */}
      {/* {!isLoggedIn && (
        <div id="register" className="fix">
          <div className="rn-contact-area ptb--120">
            <ContactOne />
          </div>
        </div>
      )} */}
      {/* End Service Area  */}

      {!isLoggedIn && (
        <div id="login" className="fix">
          <div className="rn-contact-area ptb--120">
            <Login />
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div id="login" className="fix">
          <div className="rn-contact-area ptb--120">
            <Info />
          </div>
        </div>
      )}

      {/* Start Portfolio Area */}
      {isSubscribed && (
        <div id="portfolio" className="fix">
          <div
            className="portfolio-area ptb--120 bg_color--1"
            style={{ backgroundColor: "black" }}
          >
            <div className="portfolio-sacousel-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                      <h2 className="title" style={{ color: "white" }}>
                        Deep Learning Zone
                      </h2>
                      {/* <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration.
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="row" style={{ flexDirection: "column" }}>
                  <PortfolioList
                    allMedia={allMedia}
                    styevariation="text-center mt--40"
                    column="col-lg-4 col-md-6 col-sm-6 col-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Portfolio Area */}

      {/* Start Blog Area */}
      {/* <div id="blog" className="fix">
        <div className="rn-blog-area ptb--120 bg_color--5 mb-dec--30">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section-title text-center">
                  <h2>Latest News</h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration.
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt--60 mt_sm--40">
              {PostList.map((value, i) => (
                <div className="col-lg-4 col-md-6 col-12" key={i}>
                  <div className="blog blog-style--1">
                    <div className="thumbnail">
                      <a href="/blog-details">
                        <img
                          className="w-100"
                          src={`/assets/images/blog/blog-${value.images}.jpg`}
                          alt="Blog Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <p className="blogtype">{value.category}</p>
                      <h4 className="title">
                        <a href="/blog-details">{value.title}</a>
                      </h4>
                      <div className="blog-btn">
                        <a className="rn-btn text-white" href="/blog-details">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* End Blog Area */}

      {/* Start COntact Area */}
      {/* <div id="contact" className="fix">
        <div className="rn-contact-area ptb--120 bg_color--1">
          <ContactOne />
        </div>
      </div> */}
      {/* End COntact Area */}

      <FooterTwo />
      {/* Start Back To Top */}
      <div className="backto-top">
        <ScrollToTop showUnder={160}>
          <FiChevronUp />
        </ScrollToTop>
      </div>
      {/* End Back To Top */}
    </div>
  );
};

export default PortfolioLanding;
