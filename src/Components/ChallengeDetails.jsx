import React from "react";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import ChallengesData from "../data/challenges.json";

const ChallengeDetails = () => {
  const now = new Date();
  const navigate = useNavigate();
  const { id } = useParams();
  const challengeData = JSON.parse(localStorage.getItem("challenge") || []);

  const challenge = challengeData.find(
    (challenge) => challenge.id === parseInt(id)
  );

  const status =
    new Date(challenge.startDate) > now
      ? "Upcoming"
      : new Date(challenge.startDate) <= now &&
        new Date(challenge.endDate) > now
      ? "Active"
      : "Past";

  // Handle delete
  const handleDelete = () => {
    const updatedChallenges = challengeData.filter(
      (uc) => uc.id !== parseInt(id)
    );

    localStorage.setItem("challenge", JSON.stringify(updatedChallenges));

    navigate("/");
  };
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
            {challenge.startDate || challenge.endDate}
            (India Standard Time)
          </time>
          <h2>{challenge.name}</h2>
          <p>{challenge.discription}</p>
          <div>
            <span>{status}</span>
          </div>
        </div>
      </section>
      <section className="overview ">
        <div>
          <h3>Overview</h3>
          <hr className="overview-hr" />
        </div>
        <div>
          <Link to={`/edit/${challenge.id}`}>
            <button className="edit">Edit</button>
          </Link>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
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
