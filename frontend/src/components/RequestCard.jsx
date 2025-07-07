// src/components/RequestCard.jsx
import React from "react";
import "../styles/RequestCard.css";

const RequestCard = ({ request, isReceiver, onUpdate }) => {
  const { skillPostId, fromUser, toUser, hoursRequested, status, _id } = request;

  const otherUser = isReceiver ? fromUser : toUser;

  return (
    <div className="request-card">
      <div className="user-info">
        <img src={otherUser.avatarUrl} alt="user" />
        <div>
          <h4>@{otherUser.username}</h4>
          <p>{isReceiver ? "requested your skill" : "you requested"}</p>
        </div>
      </div>

      <div className="skill-info">
        <strong>{skillPostId.skillName}</strong>
        <p>⏱ {hoursRequested} hour(s)</p>
        <p>Status: <b>{status}</b></p>
      </div>

      {isReceiver && status === "pending" && (
        <div className="action-buttons">
          <button onClick={() => onUpdate(_id, "accepted")}>Accept</button>
          <button onClick={() => onUpdate(_id, "declined")}>Decline</button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
