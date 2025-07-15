import React from "react";
import { motion } from "framer-motion";

const MySkillCard = ({ skill, onDelete }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 180 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 shadow-lg rounded-2xl overflow-hidden p-4 flex flex-col gap-3 transition-all"
    >
      <img
        src={skill.imageUrl}
        alt={skill.skillName}
        className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {skill.skillName}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {skill.description}
      </p>

      <button
        onClick={() => onDelete(skill._id)}
        className="mt-auto px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors duration-200"
      >
        Delete
      </button>
    </motion.div>
  );
};

export default MySkillCard;
