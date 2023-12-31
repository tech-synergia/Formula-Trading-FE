import axios from "axios";
import React, { Component } from "react";
// import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
// import { Table, Button } from "antd";
import "../../../public/assets/css/progress.css";

class UploadMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rnTitle: "",
      rnDescription: "",
      rnImage: "",
      rnVideo: "",
      users: [],
      videoUploadProgress: 0,
      imageUploadProgress: 0,
      isVideoUploading: false,
    };
  }

  handleAddMedia = async (e) => {
    e.preventDefault();
    const { rnTitle, rnDescription, rnVideo, rnImage } = this.state;
    // console.log(this.props.accessToken);

    try {
      // Make a POST request to your login API endpoint
      await axios.post(
        "https://formulabasetrader.com/api/media/addMedia",
        {
          title: rnTitle,
          description: rnDescription,
          image: rnImage,
          video: rnVideo,
        },
        { headers: { Authorization: `Bearer ${this.props.accessToken}` } }
      );
      alert("Media added successfully!");
      this.setState({
        rnTitle: "",
        rnDescription: "",
        rnImage: "",
        rnVideo: "",
      });
    } catch (error) {
      console.error("Register error", error);
      alert(error.response.data);
    }
  };

  handleUploadImage = async (e) => {
    this.setState({ imageUploadProgress: 0 });
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://formulabasetrader.com/api/user/uploadImage",
        formData,
        {
          headers: { Authorization: `Bearer ${this.props.accessToken}` },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total);
            this.setState({ imageUploadProgress: progress });
          },
        }
      );
      this.setState({ rnImage: response.data.url });
      alert("Image Uploaded!");
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  handleUploadVideo = async (e) => {
    this.setState({ videoUploadProgress: 0, isVideoUploading: true });
    const videoFile = e.target.files[0];

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "https://formulabasetrader.com/api/user/uploadVideo",
        formData,
        {
          headers: { Authorization: `Bearer ${this.props.accessToken}` },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total);
            this.setState({ videoUploadProgress: progress });
          },
        }
      );
      this.setState({ rnVideo: response.data.url });
      alert("Video Uploaded!");
    } catch (error) {
      console.error("Video upload error:", error);
    }
  };
  componentDidMount() {
    // Call the function that contains the useEffect code
    this.fetchUserData();
  }

  // Function to fetch user data
  fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://formulabasetrader.com/api/user/getAllUsers",
        {
          headers: { Authorization: `Bearer ${this.props.accessToken}` },
        }
      );
      const subscribedUsers = response.data.users.filter(
        (user) => user.subscription[0].subscribed
      );
      this.setState({ users: subscribedUsers });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      users,
      videoUploadProgress,
      // isVideoUploading,
      imageUploadProgress,
    } = this.state;
    const maxRowsBeforeScroll = 10;
    return (
      <div className="contact-form--1" style={{ color: "black" }}>
        <div className="container">
          <div className="row row--35 align-items-start">
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="section-title text-left mb--50">
                <h2 className="title">Add Media</h2>
                <p className="description">Add all your videos from here...</p>
              </div>
              <div className="form-wrapper">
                <form onSubmit={this.handleAddMedia}>
                  <label htmlFor="item01">
                    Title *
                    <input
                      type="text"
                      name="title"
                      id="item01"
                      style={{ color: "black" }}
                      value={this.state.rnTitle}
                      onChange={(e) => {
                        this.setState({ rnTitle: e.target.value });
                      }}
                      placeholder="Video Title *"
                    />
                  </label>

                  <label htmlFor="item02">
                    Description
                    <input
                      type="text"
                      name="description"
                      id="item02"
                      style={{ color: "black" }}
                      value={this.state.rnDescription}
                      onChange={(e) => {
                        this.setState({ rnDescription: e.target.value });
                      }}
                      placeholder="Video Description *"
                    />
                  </label>

                  <label className="noBorder" htmlFor="image">
                    Upload Image
                    <input
                      label="Upload Image here"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={this.handleUploadImage}
                    />
                  </label>
                  {imageUploadProgress > 0 && (
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${imageUploadProgress}%` }}
                      >
                        {imageUploadProgress}%
                      </div>
                    </div>
                  )}

                  <label htmlFor="videoUpload">
                    Upload Video
                    <input
                      type="file"
                      name="video"
                      id="videoUpload"
                      accept="video/*"
                      onChange={this.handleUploadVideo}
                    />
                  </label>
                  {videoUploadProgress > 0 && (
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${videoUploadProgress}%` }}
                      >
                        {videoUploadProgress}%
                      </div>
                    </div>
                  )}

                  <button
                    className="rn-button-style--2 btn-solid"
                    type="submit"
                    value="submit"
                    name="submit"
                    id="mc-embedded-subscribe"
                    // disabled={isVideoUploading}
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="thumbnail mb_md--30 mb_sm--30">
                <h1>Subscribed Users</h1>
                <div
                  className="table-container"
                  style={{
                    maxHeight: "460px",
                    overflowY: "auto",
                    // border: "1px solid #ccc",
                  }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        {/* Add more columns as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        // .slice(0, maxRowsBeforeScroll)
                        .map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}.</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            {/* Add more columns as needed */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {users.length > maxRowsBeforeScroll && (
                  <div
                    className="scroll-hint"
                    style={{ textAlign: "center", fontStyle: "italic" }}
                  >
                    Scroll for more...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UploadMedia;
