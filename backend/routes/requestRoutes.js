const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createRequest,
  getMyRequests,
  updateRequestStatus
} = require('../controllers/requestController');

router.post('/', auth, createRequest);
router.get('/me', auth, getMyRequests);
router.put('/:id/status', auth, updateRequestStatus);

module.exports = router;
