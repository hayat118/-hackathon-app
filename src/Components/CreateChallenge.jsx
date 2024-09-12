import React, { useState } from "react";
import Header from "./Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

const CreateChallenge = ({ challenge, setChallenge }) => {
  const navigate = useNavigate();
  // const [value, setValue] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    name: "",
    description: "",
    image: "",
    level: "easy",
    status: "",
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

  const uploadFile = (e) => {
    setFormData([]);
    setUploading(true);
    const file = e.target.files[0];
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    fileFormData.append("upload_preset", "preset_1"); //  Cloudinary upload preset

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        fileFormData
      )
      .then((response) => {
        setFormData({
          ...formData,
          image: response.data.secure_url,
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  // form handle
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData, "formData");

    // Create a new challenge object
    const newChallenge = {
      id: challenge.length + 1,
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      level: formData.level,
      image: formData.image,
      status: formData.status || "active",
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

    navigate("/");
  };

  // console.log(formData, "formData");
  //

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
        <form onSubmit={handleSubmit} className="challenge-form name">
          <label htmlFor="name ">Challenge Name:</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="date-wrapper">
            <label htmlFor="startDate">Start Date:</label>
            <DatePicker
              selected={formData.startDate}
              onChange={handleStartDateChange}
              placeholderText="Add start date"
              dateFormat="dd/MM/yyyy"
              className="input"
              required
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
              dateFormat="dd/MM/yyyy"
              className="input"
              required
            />
            <img
              className="date-img"
              src="/assets/icons/uil_calender.svg"
              alt="calender"
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
            <label htmlFor="image">Image</label>
            <input
              className="input align file-input"
              type="file"
              id="image"
              name="image"
              onChange={uploadFile}
              accept="image/*"
              required
              placeholder="Upload"
            />
            <label for="image" class="custom-file-upload">
              Upload
            </label>
            <img
              className="upload-img"
              src="/assets/icons/bxs_cloud-upload.svg"
              alt="calender"
            />
            {uploading ? "Uploading..." : ""}
            {formData.image ? `Selected File: ${formData.image}` : ""}
          </div>

          <label htmlFor="level">Level:</label>
          <select
            className="input level"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button className="btn" type="submit">
            Create Challenge
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateChallenge;
