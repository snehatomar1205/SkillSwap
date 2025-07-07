const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const auth = require("../middleware/authMiddleware");


router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get("/me", auth, getCurrentUser);

module.exports = router;
