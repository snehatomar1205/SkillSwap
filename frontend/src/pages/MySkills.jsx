// src/pages/MySkills.jsx
import React, { useEffect, useState } from "react";
import { fetchMySkills, deleteSkill } from "../services/api";
import MySkillCard from "../components/MySkillCard";

const MySkills = () => {
  const [skills, setSkills] = useState([]);

  const loadSkills = async () => {
    try {
      const data = await fetchMySkills();
      if (Array.isArray(data)) {
        setSkills(data);
      } else {
        console.error("Expected array, got:", data);
        setSkills([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
      loadSkills();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Skills</h2>
      {skills.length === 0 ? (
        <p>You haven't posted any skills yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {skills.map((skill) => (
            <MySkillCard key={skill._id} skill={skill} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MySkills;
