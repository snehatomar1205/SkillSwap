// src/pages/Explore.jsx
import React, { useEffect, useState } from "react";
import { fetchSkills } from "../services/api";
import SkillCard from "../components/SkillCard";

const Explore = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
      } catch (err) {
        console.error("Failed to load skills:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Explore Skills</h2>
      {loading ? (
        <p>Loading skills...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
