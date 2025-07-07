// src/pages/SkillDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSingleSkill,
  requestSkillSwap,
} from "../services/api";
import CommentSection from "../components/CommentSection";

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(1);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadSkill = async () => {
      try {
        const data = await fetchSingleSkill(id);
        setSkill(data);
      } catch (err) {
        console.error("Failed to load skill:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSkill();
  }, [id]);

  const handleRequest = async () => {
    try {
      await requestSkillSwap(id, hours);
      setMsg("Request sent successfully!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (loading) return <p>Loading skill...</p>;
  if (!skill) return <p>Skill not found</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>{skill.skillName}</h2>
      <img
        src={`http://localhost:5000/${skill.imageUrl}`}
        alt={skill.skillName}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <p><strong>Description:</strong> {skill.description}</p>
      <p><strong>Posted by:</strong> @{skill.userId.username}</p>
      <p><strong>Tags:</strong> {skill.tags.join(", ")}</p>

      <div style={{ marginTop: "20px" }}>
        <h4>Request this skill</h4>
        <input
          type="number"
          min="1"
          max="5"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={{ width: "50px", marginRight: "10px" }}
        />
        <button onClick={handleRequest}>Send Request</button>
        {msg && <p style={{ marginTop: "10px", color: "green" }}>{msg}</p>}
      </div>

      <hr style={{ margin: "30px 0" }} />

      <CommentSection postId={skill._id} />
    </div>
  );
};

export default SkillDetails;
