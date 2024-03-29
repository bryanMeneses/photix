import React, { Component, useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import "./Home.css";
import { createApi } from "unsplash-js";
import { Link } from "react-router-dom";

const unsplash = createApi({
  apiUrl: "https://photix-server.netlify.app/.netlify/functions/index/unsplash",
});

const Home = () => {
  const [randomImages, setRandomImages] = useState([]);
  const [requestError, setRequestError] = useState(false);

  useEffect(() => {
    setRandomImages([]);
    // unsplash.photos
    //   .getRandom({
    //     count: 3,
    //     query: "landscape",
    //   })
    //   .then((result) => {
    //     if (result.errors) {
    //       setRequestError(true);
    //     } else {
    //       setRandomImages(result.response.response);
    //       setRequestError(false);
    //     }
    //   })
    //   .catch((err) => {
    //     setRequestError(true);
    //   });
  }, []);

  if (requestError) {
    return (
      <div>
        <div
          style={{
            width: "100%",
            margin: "auto",
            position: "absolute",
            top: "30%",
          }}
        >
          <h1 className="display-4">:( Whoops...</h1>
          <h3>something went wrong!</h3>
          <h5 className="w-75 my-4 mx-auto">
            There is a limit to how many photos we can request. Please check
            back in a bit!
          </h5>
        </div>
      </div>
    );
  }
  if (!randomImages[0]) {
    return (
      <Spinner
        style={{
          position: "absolute",
          top: "50%",
          bottom: "50%",
          left: "50%",
          right: "50%",
        }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      <div className="animated fadeIn">
        <div className="center text-white">
          <h1 className="display-4">Need new ideas?</h1>
          <p className="Home__small">
            Take a look through our collections and start seeing a new
            perspective.
          </p>
          <Link to="/latest">
            <button className="myBtn myBtn-4 myBtn-4c icon-arrow-right">
              See More
            </button>
          </Link>
        </div>

        <Carousel
          controls={false}
          indicators={false}
          pauseOnHover={false}
          touch={false}
        >
          {randomImages.map((image) => {
            return (
              <Carousel.Item
                key={image.id}
                className="fixedBackground"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${image.urls.regular})`,
                }}
              >
                <div className="carousel-item-style">
                  <p>Taken by {image.user.name}</p>
                  {image.user.portfolio_url ? (
                    <p>
                      <a
                        style={{ color: "white" }}
                        target="blank"
                        href={image.user.portfolio_url}
                      >
                        See Profile
                      </a>
                    </p>
                  ) : null}
                  {image.location.title !== null ? (
                    `Taken in ${image.location.title}`
                  ) : (
                    <i>Taken somewhere on earth</i>
                  )}
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default Home;
