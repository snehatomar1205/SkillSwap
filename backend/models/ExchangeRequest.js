const mongoose = require("mongoose");

const exchangeRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillPost",
    required: true,
  },
  hoursRequested: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
});

module.exports = mongoose.model("ExchangeRequest", exchangeRequestSchema);
