import React, { useState, useEffect } from "react";
import Header from "./Header";
// import ChallengesData from "../data/challenges.json";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const challengeData = JSON.parse(localStorage.getItem("challenge") || []);
  const { id } = useParams();
  const challenge = challengeData.find(
    (challenge) => challenge.id === parseInt(id)
  );

  const [formData, setFormData] = useState({
    name: challenge.name,
    startDate: challenge.startDate,
    endDate: challenge.endDate,
    description: challenge.description,
    image: challenge.image,
    level: challenge.lavel,
  });

  //   Populate form data on component mount
  useEffect(() => {
    if (challenge) {
      setFormData({
        name: challenge.name || "",
        startDate: challenge.startDate || "",
        endDate: challenge.endDate || "",
        description: challenge.description || "",
        image: challenge.image || null,
        level: challenge.level || "easy",
      });
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormData(challenge);

    console.log("Updated Challenge Data: ", formData);
  };

  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="details">
        <h2> Challenge</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="challenge-form">
          <label htmlFor="name">Challenge Name:</label>
          <input
            className="input name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="date-wrapper">
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="input name"
              //   type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            <img
              className="date-img"
              src="/assets/icons/uil_calender.svg"
              alt="calendar"
            />
          </div>

          <div className="date-wrapper">
            <label htmlFor="endDate">End Date:</label>
            <input
              className="input name"
              //   type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
            <img
              className="date-img"
              src="/assets/icons/uil_calender.svg"
              alt="calendar"
            />
          </div>

          <label htmlFor="description">Description:</label>
          <textarea
            className="input description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="upload-wrapper">
            <label htmlFor="image">Image:</label>
            <input
              className="input align"
              //   type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            <img
              className="upload-img"
              src="/assets/icons/bxs_cloud-upload.svg"
              alt="upload"
            />
          </div>

          <label htmlFor="level">Level:</label>
          <select
            className="input level"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button className="btn" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPage;
