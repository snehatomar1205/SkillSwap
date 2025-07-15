import React from "react";
import { motion } from "framer-motion";

const RequestCard = ({ request, isReceiver, onUpdate }) => {
  const { skillPostId, fromUser, toUser, hoursRequested, status, _id } = request;
  const otherUser = isReceiver ? fromUser : toUser;

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-lg flex flex-col gap-4"
    >
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={otherUser.avatarUrl}
          alt="user"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">@{otherUser.username}</h4>
          <p className="text-xs text-gray-500">
            {isReceiver ? "requested your skill" : "you requested"}
          </p>
        </div>
      </div>

      {/* Skill Info */}
      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
        <strong className="block text-indigo-600 dark:text-indigo-300">
          {skillPostId.skillName}
        </strong>
        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
          ⏱ {hoursRequested} hour(s)
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Status: <b className="capitalize text-black dark:text-white">{status}</b>
        </p>
      </div>

      {/* Action Buttons */}
      {isReceiver && status === "pending" && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onUpdate(_id, "accepted")}
            className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
          >
            Accept
          </button>
          <button
            onClick={() => onUpdate(_id, "declined")}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
          >
            Decline
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default RequestCard;
