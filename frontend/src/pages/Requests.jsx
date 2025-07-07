import React, { useEffect, useState } from "react";
import { fetchMyRequests, updateRequestStatus } from "../services/api";
import RequestCard from "../components/RequestCard";
import Tabs from "../components/Tabs";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [view, setView] = useState("Received");

  const fetchData = async () => {
    const data = await fetchMyRequests();
    setRequests(data);
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      fetchData(); // reload after update
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
    <div style={{ padding: "30px" }}>
      <h2>My Requests</h2>
      <Tabs
        activeTab={view}
        onChange={setView}
        tabs={["Received", "Sent"]}
      />

      {filtered.length === 0 ? (
        <p>No {view.toLowerCase()} requests.</p>
      ) : (
        filtered.map((req) => (
          <RequestCard
            key={req._id}
            request={req}
            isReceiver={view === "Received"}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default Requests;
