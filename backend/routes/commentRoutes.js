const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createComment,
  getCommentsByPost
} = require('../controllers/commentController');

router.post('/:postId', auth, createComment);
router.get('/:postId', getCommentsByPost);

module.exports = router;
