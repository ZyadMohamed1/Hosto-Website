const express = require('express');
const postsController = require('../controllers/postsController');
const { authenticateToken } = require('../authentication');

const router = express.Router();

router.post('/postQuestion', authenticateToken, postsController.postQuestion);
router.post('/postComment/:postID', authenticateToken, postsController.postComment);
router.get('/posts', postsController.getAllPosts);
router.get('/userPosts', authenticateToken, postsController.getUserPosts);

module.exports = router;
