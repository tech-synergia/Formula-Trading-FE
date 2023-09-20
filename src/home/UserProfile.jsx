import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../public/assets/css/userprofile.scss";
import HeaderThree from "../component/header/HeaderThree";
import FooterTwo from "../component/footer/FooterTwo";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";

const UserProfile = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from your backend
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setUserData(response.data.user);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <HeaderThree
        homeLink="/"
        logo="symbol-dark"
        color="color-black"
        isLoggedIn={true}
        isSubscribed={userData.subscription[0].subscribed}
        userDetails={userData}
      />
      <div className="user-profile">
        <h1>User Profile</h1>
        <div className="user-info text-left">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p></p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.phone}
          </p>
          <p>
            <strong>State:</strong> {userData.state}
          </p>
          <p>
            <strong>Subscribed:</strong>{" "}
            {userData.subscription[0].subscribed ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <FooterTwo />
      <div className="backto-top">
        <ScrollToTop showUnder={160}>
          <FiChevronUp />
        </ScrollToTop>
      </div>
    </div>
  );
};

export default UserProfile;
