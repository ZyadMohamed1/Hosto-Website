const express = require('express');
const postsController = require('../controllers/postsController');
const { authenticateToken } = require('../authentication');

const router = express.Router();

router.post('/postQuestion', authenticateToken, postsController.postQuestion);
router.post('/postComment/:postID', authenticateToken, postsController.postComment);

module.exports = router;
