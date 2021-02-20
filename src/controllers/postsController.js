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

};

module.exports = postsController;
