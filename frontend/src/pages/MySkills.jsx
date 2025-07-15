import React, { useEffect, useState } from "react";
import { fetchMySkills, deleteSkill } from "../services/api";
import MySkillCard from "../components/MySkillCard";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900"
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-300 text-center">
        My Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          You haven’t posted any skills yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <MySkillCard key={skill._id} skill={skill} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MySkills;
