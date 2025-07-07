const ExchangeRequest = require('../models/ExchangeRequest');
const SkillPost = require('../models/SkillPost');
const User = require('../models/User');

exports.createRequest = async (req, res) => {
  const { skillPostId, hoursRequested } = req.body;

  try {
    const post = await SkillPost.findById(skillPostId);
    if (!post) return res.status(404).json({ msg: 'Skill post not found' });

    const toUser = post.userId;
    const fromUser = req.user;

    if (toUser.toString() === fromUser) {
      return res.status(400).json({ msg: 'Cannot request your own skill' });
    }

    const newRequest = new ExchangeRequest({
      fromUser,
      toUser,
      skillPostId,
      hoursRequested
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const myRequests = await ExchangeRequest.find({
      $or: [{ fromUser: req.user }, { toUser: req.user }]
    })
      .populate('fromUser', 'username avatarUrl')
      .populate('toUser', 'username avatarUrl')
      .populate('skillPostId', 'skillName');

    res.json(myRequests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const requestId = req.params.id;

  try {
    const request = await ExchangeRequest.findById(requestId);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    if (request.toUser.toString() !== req.user) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    if (status === 'accepted') {
      const learner = await User.findById(request.fromUser);
      const teacher = await User.findById(request.toUser);

      if (learner.timeCredits < request.hoursRequested) {
        return res.status(400).json({ msg: 'Not enough time credits' });
      }

      learner.timeCredits -= request.hoursRequested;
      teacher.timeCredits += request.hoursRequested;

      await learner.save();
      await teacher.save();
    }

    request.status = status;
    await request.save();

    res.json({ msg: 'Request updated', request });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
