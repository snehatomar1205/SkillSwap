import React, { useEffect, useState } from "react";
import { fetchSkills } from "../services/api";
import SkillCard from "../components/SkillCard";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-300">
        Explore Skills
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading skills...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Explore;
