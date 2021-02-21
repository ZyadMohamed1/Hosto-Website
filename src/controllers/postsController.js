require('dotenv').config();
require('firebase/firestore');
const asyncHandler = require('express-async-handler');
const OTPGenerator = require('otp-generator');
const firebase = require('../config/firebaseConfig');

const db = firebase.firestore();

const postsController = {
  postQuestion: asyncHandler(async (req, res) => {
    const { user } = req;
    const post = req.body;
    const snapshot = await db.collection('users').where('email', '==', user.email).get();

    const OTP = OTPGenerator.generate(3, { upperCase: false, specialChars: false });
    const postCreationTime = firebase.firestore.Timestamp.now();

    snapshot.forEach(async (doc) => {
      post.ID = user.userName + postCreationTime + OTP;
      post.created_by = doc.id;
      post.created_at = postCreationTime;
      await db.collection('posts').add(post);
      res.sendStatus(201);
    });
  }),

  postComment: asyncHandler(async (req, res) => {
    const { user } = req;
    const comment = req.body;
    const { postID } = req.params;
    const postSnapshot = await db.collection('posts').where('ID', '==', postID).get();
    const snapshot = await db.collection('users').where('email', '==', user.email).get();

    snapshot.forEach(async (doc) => {
      postSnapshot.forEach(async (postDoc) => {
        if ((user.role !== 1) && (doc.id !== postDoc.data().created_by)) {
          res.sendStatus(403);
          return;
        }

        comment.created_by = doc.id;
        comment.created_at = firebase.firestore.Timestamp.now();
        await db.collection('posts').doc(postDoc.id).collection('comments').add(comment);
        res.sendStatus(201);
      });
    });
  }),

  getAllPosts: asyncHandler(async (req, res) => {
    var snapshot = await db.collection('posts').orderBy('created_at').get();
    const posts = [];
    const postsDoc = [];
    var user = '';

    snapshot.forEach( doc => postsDoc.push(doc) );
    
    for (var i = 0; i < postsDoc.length; i++) {
      snapshot = await db.collection('posts').doc(postsDoc[i].id).collection('comments').orderBy('created_at').get();
      const commentsDoc = [];
      snapshot.forEach( doc => commentsDoc.push(doc) );
      
      const comments = [];
      for (var j = 0; j < commentsDoc.length; j++) {
        user = await db.collection('users').doc(commentsDoc[j].data().created_by).get();
        comments.push({
          created_by: user.data().userName,
          created_at: commentsDoc[j].data().created_at.toDate(),
          body: commentsDoc[j].data().commentBody,
        });
      }

      user = await db.collection('users').doc(postsDoc[i].data().created_by).get();
      posts.push({
        ID: postsDoc[i].data().ID,
        created_by: user.data().userName,
        created_at: postsDoc[i].data().created_at.toDate(),
        body: postsDoc[i].data().questionBody,
        comments: comments,
      });
    }
    
    res.json(posts);
  }),

  getUserPosts: asyncHandler(async (req, res) => {
    
  }),
};

module.exports = postsController;
