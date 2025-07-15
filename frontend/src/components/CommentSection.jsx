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
    <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Comments</h3>

      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Post
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="flex items-start gap-4">
              <img
                src={c.userId.avatarUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-gray-400 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  @{c.userId.username}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
