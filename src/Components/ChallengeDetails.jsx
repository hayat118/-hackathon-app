import React from "react";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";

// import ChallengesData from "../data/challenges.json";

const ChallengeDetails = () => {
  const { id } = useParams();
  const challengeData = JSON.parse(localStorage.getItem("challenge") || []);

  const challenge = challengeData.find(
    (challenge) => challenge.id === parseInt(id)
  );
  //
  // if (!challenge) {
  //   return <div>Challenge not found</div>;
  // }
  //
  return (
    <>
      <section>
        <div className="header">
          <Header />
        </div>
      </section>
      <section className="detail-hero-sec">
        <div>
          <time>
            {challenge.startDate}
            (India Standard Time)
          </time>
          <h2>{challenge.name}</h2>
          <p>{challenge.discription}</p>
          <div>
            <img />
            <span>{challenge.status}</span>
          </div>
        </div>
      </section>
      <section className="overview ">
        <div>
          <h3>Overview</h3>
        </div>
        <div>
          <Link to={`/edit/${challenge.id}`}>
            <button className="edit">Edit</button>
          </Link>
          <button className="delete">Delete</button>
        </div>
      </section>
      <section className="details-para">
        <p>
          Butterflies are the adult flying stage of certain insects belonging to
          an order or group called Lepidoptera. The word "Lepidoptera" means
          "scaly wings" in Greek. This name perfectly suits the insects in this
          group because their wings are covered with thousands of tiny scales
          overlapping in rows.
        </p>
        <p>
          An agency of the Governmental Wildlife Conservation is planning to
          implement an automated system based on computer vision so that it can
          identify butterflies based on captured images. As a consultant for
          this project, you are responsible for developing an efficient model.
        </p>
        <p>
          Your Task is to build an Image Classification Model using CNN that
          classifies to which class of weather each image belongs to.
        </p>
      </section>
    </>
  );
};

export default ChallengeDetails;
