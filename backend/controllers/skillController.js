const SkillPost = require('../models/SkillPost');

exports.createSkillPost = async (req, res) => {
  const { skillName, description, tags } = req.body;

  if (!req.file) return res.status(400).json({ msg: 'Image is required' });

  try {
    const newPost = new SkillPost({
      userId: req.user, 
      skillName,
      description,
      imageUrl: req.file.path, 
      tags: tags ? tags.split(',') : [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const posts = await SkillPost.find()
      .populate('userId', 'username avatarUrl')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getSingleSkill = async (req, res) => {
  try {
    const post = await SkillPost.findById(req.params.id)
      .populate('userId', 'username avatarUrl');

    if (!post) return res.status(404).json({ msg: 'Skill not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const mongoose = require("mongoose");

exports.getMyPosts = async (req, res) => {
  console.log("User ID from token:", req.user);
  try {
    const posts = await SkillPost.find({
      userId: new mongoose.Types.ObjectId(req.user),
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Error fetching my posts:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteSkill = async (req, res) => {
  try {
    const post = await SkillPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Not found' });

    if (post.userId.toString() !== req.user) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
