import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchChatMessages } from "../services/api";

const socket = io("http://localhost:5000", {
  autoConnect: false
});

export default function Chat() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Load old messages
    fetchChatMessages(roomId).then(setMessages);

    socket.auth = {
      token: localStorage.getItem("token")
    };
    socket.connect();

    socket.emit("join_room", roomId);

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
      socket.off("receive_message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("send_message", { roomId, text });
    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">💬 Chat</h2>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl h-[400px] overflow-y-auto space-y-2">
        {messages.map((m) => (
          <div key={m._id} className="text-sm">
            <b className="text-indigo-600">@{m.sender.username}:</b>{" "}
            <span className="text-gray-800 dark:text-gray-200">
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 rounded-lg border focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
