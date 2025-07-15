
const API_BASE = "http://localhost:5000/api";

export const fetchSkills = async () => {
  const res = await fetch(`${API_BASE}/skills`);
  return res.json();
};

export const requestSkillSwap = async (skillPostId, hoursRequested) => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ skillPostId, hoursRequested }),
  });

  if (!res.ok) throw new Error("Failed to send request");
  return res.json();
};


export const fetchMyRequests = async () => {
  const res = await fetch("http://localhost:5000/api/requests/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const updateRequestStatus = async (requestId, status) => {
  const res = await fetch(`http://localhost:5000/api/requests/${requestId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Failed to update request");
  return data;
};

export const fetchMySkills = async () => {
  const res = await fetch("http://localhost:5000/api/skills/mine", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const deleteSkill = async (id) => {
  const res = await fetch(`http://localhost:5000/api/skills/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Deletion failed");
  return data;
};

export const fetchMyProfile = async () => {
  const res = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const createSkillPost = async (formData) => {
  const res = await fetch("http://localhost:5000/api/skills", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Failed to post skill");
  return data;
};

export const getComments = async (postId) => {
  const res = await fetch(`http://localhost:5000/api/comments/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};


export const postComment = async (postId, text) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg);
  return data;
};


export const fetchSingleSkill = async (id) => {
  const res = await fetch(`http://localhost:5000/api/skills/${id}`);
  if (!res.ok) throw new Error("Failed to fetch skill");
  return res.json();
};

export const registerUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    body: formData,
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const error = await res.json();
      throw new Error(error.msg || "Registration failed");
    } else {
      throw new Error("Server error: not a JSON response");
    }
  }

  return res.json(); 
};

