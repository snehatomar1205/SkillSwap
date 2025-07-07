// src/components/CommentSection.jsx
import React, { useEffect, useState } from "react";
import { getComments, postComment } from "../services/api";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = async () => {
    try {
      const res = await getComments(postId);
      setComments(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await postComment(postId, text);
      setText("");
      loadComments();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div style={styles.wrapper}>
      <h4>Comments</h4>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>Post</button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul style={styles.list}>
          {comments.map((c) => (
            <li key={c._id} style={styles.comment}>
              <img src={`http://localhost:5000/${c.userId.avatarUrl}`} alt="avatar" style={styles.avatar} />
              <div>
                <strong>{c.userId.username}</strong>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    marginTop: "30px",
    padding: "15px",
    background: "#f8f8f8",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  btn: {
    padding: "8px 16px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  comment: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },
};

export default CommentSection;
