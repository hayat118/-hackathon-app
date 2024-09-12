import React, { useState } from "react";
import Header from "./Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

//
const CreateChallenge = ({ challenge, setChallenge }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    name: "",
    description: "",
    image: "",
    level: "easy",
  });

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle start date change
  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
  };

  // form handle
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new challenge object
    const newChallenge = {
      id: challenge.length + 1,
      name: formData.name,
      startDate: formData.startDate
        ? formData.startDate.toISOString().split("T")[0]
        : "",
      endDate: formData.endDate
        ? formData.endDate.toISOString().split("T")[0]
        : "",
      description: formData.description,
      level: formData.level,
      image: "/assets/cardimage/Group 1000002771.png",
      status: "upcoming",
    };

    setChallenge([...challenge, newChallenge]);
    const existingChallenges = localStorage.getItem("challenge");

    if (existingChallenges) {
      const challengesJSON = JSON.parse(existingChallenges);

      const updatedChallenges = [...challengesJSON, newChallenge];

      localStorage.setItem("challenge", JSON.stringify(updatedChallenges));
    } else {
      localStorage.setItem("challenge", JSON.stringify([newChallenge]));
    }
    // console.log(newChallenge, "new");

    navigate("/");
  };
  //
  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="details">
        <h2>Challenge Details</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="challenge-form">
          {/* <div> */}
          <label htmlFor="name ">Challenge Name:</label>
          <input
            className="input name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* </div> */}

          <div className="date-wrapper">
            <label htmlFor="startDate">Start Date:</label>

            <DatePicker
              selected={formData.startDate}
              onChange={handleStartDateChange}
              placeholderText="Add start date"
              dateFormat="MM/dd/yyyy"
              className="input name"
            />
            <img
              className="date-img"
              src="/assets/icons/uil_calender.svg"
              alt="calender"
            />
          </div>

          <div className="date-wrapper">
            <label htmlFor="endDate ">End Date:</label>
            <DatePicker
              selected={formData.endDate}
              onChange={handleEndDateChange}
              placeholderText="Add end date"
              dateFormat="MM/dd/yyyy"
              className="input name"
            />
            <img
              className="date-img"
              src="/assets/icons/uil_calender.svg"
              alt="calender"
            />
          </div>

          {/* <div> */}
          <label htmlFor="description">Description:</label>
          <textarea
            className="input description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {/* </div> */}

          <div className="upload-wrapper">
            <label htmlFor="image">Image</label>
            <input
              className="input align "
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
              placeholder="Upload"
            />

            <img
              className="upload-img"
              src="/assets/icons/bxs_cloud-upload.svg"
              alt="calender"
            />
          </div>

          {/* <div> */}
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
          {/* </div> */}

          <button className="btn" type="submit">
            Create Challenge
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateChallenge;
