const express = require("express");
const auth = require("../middleware/authMiddleware");
const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");

const router = express.Router();

router.get("/:roomId", auth, async (req, res) => {
  const room = await ChatRoom.findById(req.params.roomId);
  if (!room.participants.includes(req.user)) {
    return res.status(403).json({ msg: "Access denied" });
  }

  const messages = await Message.find({ roomId: room._id })
    .populate("sender", "username avatarUrl");

  res.json(messages);
});

module.exports = router;
