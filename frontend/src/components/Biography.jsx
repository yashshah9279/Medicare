import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          Medicare Hospital is a leading healthcare institution, renowned for its state-of-the-art facilities and commitment to excellence. We provide a wide range of services designed to meet diverse medical needs.
          </p>
          <p>
          Our dedicated team of medical professionals brings extensive expertise and compassionate care to every patient interaction. We focus on delivering personalized treatment plans to ensure the best possible outcomes.</p>
          <p>
          At Medicare Hospital, our mission is to enhance your well-being through innovative healthcare solutions and unwavering support. We are dedicated to fostering a healing environment that prioritizes your health and comfort.</p>

          <p>Where revenue is Happiness of Patients!</p>
          <p>Service to Mankind is Service to God</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
