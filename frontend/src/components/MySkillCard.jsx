// src/components/MySkillCard.jsx
import React from "react";
import "../styles/MySkillCard.css";

const MySkillCard = ({ skill, onDelete }) => {
  return (
    <div className="myskill-card">
      <img src={skill.imageUrl} alt="skill" />
      <h3>{skill.skillName}</h3>
      <p>{skill.description}</p>
      <button onClick={() => onDelete(skill._id)}>Delete</button>
    </div>
  );
};

export default MySkillCard;
