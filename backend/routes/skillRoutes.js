const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const {
  createSkillPost,
  getAllSkills,
  getSingleSkill,
  deleteSkill,
  getMyPosts
} = require('../controllers/skillController');

router.post('/', auth, upload.single('image'), createSkillPost);
router.get('/', getAllSkills);
router.get('/mine', auth, getMyPosts);
router.get('/:id', getSingleSkill);
router.delete('/:id', auth, deleteSkill);
module.exports = router;
