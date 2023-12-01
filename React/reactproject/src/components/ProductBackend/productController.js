const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    //destination means where the photos saved
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb ) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg'){
            return cb(res.status(400).end('only jpg,jpeg, png are allowed'), false);
        }
        cb(null, true)
    }
})

//===============================
//          Products
//===============================

router.post("/uploadImage", /* */auth, (req, res) => {

    //get image from client
    //save it inside node server

    //multer library

    upload(req, res, err => {
        if(err) return res.json({success: false,err})
        return res.json({ success: true, image: res.req.file.path, filename: res.req.file.filename})
    })

});

module.exports = router;