import React from "react";

const participateData = {
  reasons: [
    {
      imgSrc: "/assets/icons/carbon_notebook-reference.svg",
      imgAlt: "skills",
      heading: "Prove your skills",
      description:
        "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
    },
    {
      imgSrc: "/assets/icons/Vector.svg",
      imgAlt: "community",
      heading: "Learn from community",
      description:
        "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
    },
    {
      imgSrc: "/assets/icons/Robot.svg",
      imgAlt: "challenge",
      heading: "Challenge yourself",
      description:
        "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
    },
    {
      imgSrc: "/assets/icons/IdentificationCard.svg",
      imgAlt: "earn",
      heading: "Earn recognition",
      description:
        "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
    },
  ],
};

function Participate() {
  return (
    <div className="participate">
      <section>
        <div>
          <h2 className="title">
            Why Participate in <span>AI Challenges?</span>
          </h2>
        </div>
      </section>
      <section>
        <div className="participate-box-container">
          {participateData.reasons.map((reason, index) => (
            <div className="participate-box" key={index}>
              <img src={reason.imgSrc} alt={reason.imgAlt} />
              <h3>{reason.heading}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Participate;
