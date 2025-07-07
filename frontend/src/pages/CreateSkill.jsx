// src/pages/CreateSkill.jsx
import React, { useState } from "react";
import { createSkillPost } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateSkill = () => {
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Image is required");

    const formData = new FormData();
    formData.append("skillName", skillName);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      await createSkillPost(formData);
      alert("Skill posted successfully!");
      navigate("/my-skills");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Post a New Skill</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Submit Skill</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "350px",
  },
};

export default CreateSkill;
