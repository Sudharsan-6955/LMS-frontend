
import React, { useState, useRef } from "react";
import axios from "axios";
import "../assets/css/become-instructor.css";

const BecomeInstructor = () => {
  const [form, setForm] = useState({
    name: "",
    degree: "",
    skill: "",
    resume: null
  });
  const resumeInputRef = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        setStatus("Only PDF files are allowed for resume upload.");
        setForm({ ...form, resume: null });
        return;
      }
      setForm({ ...form, resume: file });
    } else {
      setForm({ ...form, [name]: value });
    }
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!form.resume) {
      setStatus("Please upload your resume as a PDF file.");
      return;
    }
    if (form.resume.type !== "application/pdf") {
      setStatus("Only PDF files are allowed for resume upload.");
      return;
    }
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("degree", form.degree);
      formData.append("skill", form.skill);
      formData.append("resume", form.resume);
      const res = await axios.post(`${apiUrl}/api/authormail`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.status === 201) {
        setStatus("Application sent! We will call you soon.");
        setForm({ name: "", degree: "", skill: "", resume: null });
        if (resumeInputRef.current) resumeInputRef.current.value = "";
      } else {
        setStatus(res.data.message || "Failed to send application.");
      }
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to send application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="become-instructor-bg center-vertical">
      <div className="become-instructor-form-container">
        <h1 className="big-heading">Become an Instructor</h1>
        <form className="become-instructor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree (e.g. M.Sc, Ph.D)"
            value={form.degree}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="skill"
            placeholder="Skill (e.g. English, Math, etc.)"
            value={form.skill}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            required
            ref={resumeInputRef}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
          {status && <div className="form-status">{status}</div>}
        </form>
      </div>
    </div>
  );
};

export default BecomeInstructor;
