import React, { Component } from "react";
// import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "../../../public/assets/css/videoplayer.css";

// const PortfolioListContent = [
//   {
//     image: "image-1",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
//   {
//     image: "image-2",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
//   {
//     image: "image-3",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
//   {
//     image: "image-4",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
//   {
//     image: "image-3",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
//   {
//     image: "image-4",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
//   {
//     image: "image-5",
//     category: "Development",
//     title: "Getting tickets to the big show",
//   },
// ];

class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideoOverlayVisible: false,
      selectedVideo: null,
      isVideoPlaying: false,
    };
  }

  handlePlayClick = (videoUrl) => {
    this.setState({
      isVideoOverlayVisible: true,
      selectedVideo: videoUrl,
      isVideoPlaying: true,
    });
  };

  handleCloseVideo = () => {
    this.setState({
      isVideoOverlayVisible: false,
      selectedVideo: null,
      isVideoPlaying: false,
    });
  };
  render() {
    const { column, styevariation, allMedia } = this.props;
    const list = allMedia;
    const { isVideoOverlayVisible, selectedVideo, isVideoPlaying } = this.state;
    return (
      <React.Fragment>
        {list.map((value, index) => (
          <div className={`${column}`} key={index}>
            <div className={`portfolio ${styevariation}`}>
              <div className="thumbnail-inner">
                <div className={`thumbnail`}>
                  <img
                    src={value.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {/* <div className={`bg-blr-image`}></div> */}
              </div>
              <div className="content">
                <div className="inner">
                  {/* <p>{value.description}</p> */}
                  <h4>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {value.title}
                    </a>
                  </h4>
                  <div className="portfolio-button">
                    <button
                      className="rn-btn"
                      onClick={() => this.handlePlayClick(value.video)}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              {/* <Link className="link-overlay" to="/portfolio-details"></Link> */}
            </div>
          </div>
        ))}
        {isVideoOverlayVisible && (
          <div className="video-overlay">
            <div className="video-container">
              <ReactPlayer
                url={selectedVideo}
                controls
                playing={isVideoPlaying}
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload", // Disable download button
                    },
                  },
                }}
              />
              <button
                className="close-video"
                onClick={this.handleCloseVideo}
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
      </React.Fragment>
    );
  }
}
export default PortfolioList;
