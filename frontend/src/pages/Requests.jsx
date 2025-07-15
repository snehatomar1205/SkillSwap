import React, { useEffect, useState } from "react";
import { fetchMyRequests, updateRequestStatus } from "../services/api";
import RequestCard from "../components/RequestCard";
import Tabs from "../components/Tabs";
import { motion } from "framer-motion";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [view, setView] = useState("Received");

  const fetchData = async () => {
    try {
      const data = await fetchMyRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      fetchData(); 
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentUserId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

  const filtered = requests.filter((r) =>
    view === "Received" ? r.toUser._id === currentUserId : r.fromUser._id === currentUserId
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-300">
        My Requests
      </h2>

      <div className="mb-8">
        <Tabs activeTab={view} onChange={setView} tabs={["Received", "Sent"]} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No {view.toLowerCase()} requests.
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <RequestCard
              key={req._id}
              request={req}
              isReceiver={view === "Received"}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Requests;
