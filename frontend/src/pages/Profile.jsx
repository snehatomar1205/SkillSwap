// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { fetchMyProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error", err);
      }
    };
    loadProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>
      <div style={styles.card}>
        <img src={profile.avatarUrl} alt="avatar" style={styles.avatar} />
        <h3>@{profile.username}</h3>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
        <p><strong>Time Credits:</strong> ⏱ {profile.timeCredits}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    width: "350px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 6px #ccc",
    textAlign: "center",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
};

export default Profile;
