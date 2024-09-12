import React from "react";
import { useNavigate } from "react-router-dom";

//

function HeroSection() {
  const navigate = useNavigate();
  //
  const handleChallenges = (e) => {
    e.preventDefault();
    navigate("/challenge");
  };

  return (
    <div>
      <section className="herosection-1 ">
        <div>
          <h1>
            Accelerate Innovation
            <br /> with Global AI Challenges
          </h1>
          <p>
            AI Challenges at DPhi simulate real-world problems. It is a <br />{" "}
            great place to put your AI/Data Science skills to test on <br />{" "}
            diverse datasets allowing you to foster learning through <br />{" "}
            competitions.
          </p>
          <button className=" create-btn" onClick={handleChallenges}>
            Create Challenge
          </button>
        </div>
        <div>
          <img src="/assets/icons/PicsArt_04-14-04.42 1.svg" alt="hero-image" />
        </div>
      </section>
      <section className="herosection-2">
        <div className="flex align">
          <div>
            <img src="/assets/icons/Group 1000002515.svg" alt="AI" />
          </div>
          <div className="ai">
            <h3>100k+</h3>
            <p>AI model submissions</p>
          </div>
        </div>
        <div className="flex align">
          <div>
            <img src="/assets/icons/Group 1000002516.svg" alt="data" />
          </div>
          <div className="ai">
            <h3>50k+</h3>
            <p>Data Scientists</p>
          </div>
        </div>
        <div className="flex align">
          <div>
            <img src="/assets/icons/Group 1000002518.svg" alt="AI" />
          </div>
          <div className="ai">
            <h3>100k+</h3>
            <p>AI Challenges hosted</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
