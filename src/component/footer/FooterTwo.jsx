import React, { useState } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import ReactPlayer from "react-player";
import disclaimer from "../../../public/assets/video/disclaimer.mp4";

const SocialShare = [
  { Social: <FaWhatsapp />, link: "https://wa.me/+918826868121" },
  { Social: <FaYoutube />, link: "https://www.youtube.com/@FBtrader219" },
  { Social: <FaTelegramPlane />, link: "https://t.me/Formulabasetrader" },
  {
    Social: <FaInstagram />,
    link: "https://www.instagram.com/formulabasetrader",
  },
];

const FooterTwo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className="footer-style-2 ptb--30 bg_image bg_image--1"
      data-black-overlay="6"
    >
      <p
        style={{
          textAlign: "center",
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: "bold",
          color: "red",
          fontSize: "18px",
        }}
        onClick={openModal}
      >
        !!! DISCLAIMER !!!
      </p>
      {modalIsOpen && (
        <div
          className="video-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
        >
          <div
            className="video-container"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
            }}
          >
            <ReactPlayer
              url={disclaimer}
              controls
              playing
              width="100%"
              height="100%"
            />
            <button
              className="close-video"
              onClick={closeModal}
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bolder",
                border: "2px solid white",
                borderRadius: "50%",
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="wrapper plr--50 plr_sm--20">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="inner">
              <div className="logo text-center text-sm-left mb_sm--20">
                <a href="/">
                  {/* <img src="/assets/images/logo/logo.png" alt="Logo images" /> */}
                  <img
                    src="/assets/images/logo/logo-bg.png"
                    alt="Logo images"
                    style={{ width: "60px", height: "60px" }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="inner text-center">
              <ul className="social-share rn-lg-size d-flex justify-content-center liststyle">
                {SocialShare.map((val, i) => (
                  <li key={i}>
                    <a href={`${val.link}`}>{val.Social}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="inner text-lg-right text-center mt_md--20 mt_sm--20">
              <div className="text">
                <p>
                  Copyright © 2023 Formula Base Trader. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterTwo;
