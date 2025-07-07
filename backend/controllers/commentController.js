const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;

  try {
    const newComment = new Comment({
      postId,
      userId: req.user,
      text,
    });

    await newComment.save();

    const populated = await newComment.populate('userId', 'username avatarUrl');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId })
      .populate('userId', 'username avatarUrl')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
