import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

const EditPage = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  //
  const challengeData = JSON.parse(localStorage.getItem("challenge") || []);
  //
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

  //   Populate form data
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

  // Handle start date change
  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
  };

  const uploadFile = (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    fileFormData.append("upload_preset", "preset_1");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedChallenges = challengeData.map((uc) =>
      uc.id === parseInt(id)
        ? {
            ...uc,
            name: formData.name,
            startDate: formData.startDate,
            endDate: formData.endDate,
            description: formData.description,
            image: formData.image,
            level: formData.level,
          }
        : uc
    );
    // Save the updated challenge
    localStorage.setItem("challenge", JSON.stringify(updatedChallenges));
    //

    navigate(`/view/${id}`);

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
        <form onSubmit={handleSubmit} className="challenge-form name">
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

            <DatePicker
              selected={formData.startDate}
              onChange={handleStartDateChange}
              placeholderText="Add start date"
              dateFormat="dd/MM/yyyy"
              className="input name"
            />
            <img
              className="date-img"
              src="/assets/icons/uil_calender.svg"
              alt="calendar"
            />
          </div>

          <div className="date-wrapper">
            <label htmlFor="endDate">End Date:</label>

            <DatePicker
              selected={formData.endDate}
              onChange={handleEndDateChange}
              placeholderText="Add start date"
              dateFormat="dd/MM/yyyy"
              className="input name"
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
              className="input align file-input"
              type="file"
              id="image"
              name="image"
              onChange={uploadFile}
              accept="image/*"
              //   required
              placeholder="Upload"
            />
            <label for="image" class="custom-file-upload">
              Upload
            </label>
            <img
              className="upload-img"
              src="/assets/icons/bxs_cloud-upload.svg"
              alt="upload"
            />
            {uploading ? "Uploading..." : ""}
            {formData.image ? `Selected Image: ${formData.image}` : ""}
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
