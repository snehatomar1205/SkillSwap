import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleSkill, requestSkillSwap } from "../services/api";
import CommentSection from "../components/CommentSection";
import { motion } from "framer-motion";

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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading skill...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">Skill not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center"
    >
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">
          {skill.skillName}
        </h2>

        <img
          src={
            skill.imageUrl.startsWith("http")
              ? skill.imageUrl
              : `http://localhost:5000/${skill.imageUrl}`
          }
          alt={skill.skillName}
          className="w-full h-64 object-cover rounded-xl shadow-md mb-4"
        />

        <p className="mb-2">
          <strong>Description:</strong> {skill.description}
        </p>
        <p className="mb-2">
          <strong>Posted by:</strong> @{skill.userId.username}
        </p>
        <p className="mb-6">
          <strong>Tags:</strong>{" "}
          <span className="text-sm text-indigo-500">
            {skill.tags.join(", ")}
          </span>
        </p>

        {/* Request Box */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md mb-8">
          <h4 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
            Request this skill
          </h4>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-20 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleRequest}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Send Request
            </button>
          </div>
          {msg && (
            <p className="mt-3 text-green-600 dark:text-green-400 font-medium text-sm">
              {msg}
            </p>
          )}
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mb-6" />

        {/* Comment Section */}
        <CommentSection postId={skill._id} />
      </div>
    </motion.div>
  );
};

export default SkillDetails;
