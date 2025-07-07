// src/components/SkillCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/SkillCard.css";

const SkillCard = ({ skill }) => {
  return (
    <Link to={`/skills/${skill._id}`} className="skill-card-link">
      <div className="skill-card">
        <img
          src={`http://localhost:5000/${skill.imageUrl}`}
          alt={skill.skillName}
          className="skill-img"
        />
        <h3>{skill.skillName}</h3>
        <p>{skill.description.substring(0, 100)}...</p>
        <div className="skill-user">
          <img
            src={`http://localhost:5000/${skill.userId.avatarUrl}`}
            alt="user"
          />
          <span>@{skill.userId.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;
