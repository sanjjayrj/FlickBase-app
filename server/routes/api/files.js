const express = require('express');
const multer = require('multer')
const formidableMiddleware = require('express-formidable');
const path = require('path');
let router = express.Router();
require('dotenv').config();

////////
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dj2zxjlrf',
    api_key: '788769135499146',
    api_secret: `${process.env.CLOUD_API_SECRET}`
});

/////////
// multer configs


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname)
        //cb(null, Date.now() + path.extname(file.originalname))
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        //// let the file be stored.
        cb(null, true)
    } else {
        /// not.
        cb(null, false)
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })
////

router.route("/testupload")
    .post(formidableMiddleware(), async (req, res) => {
        try {
            const upload = await cloudinary.uploader.upload(req.files.file.path,
                {
                    public_id: `${Date.now()}`,
                    folder: 'movie_posters'
                })

            console.log(upload)

            res.status(200).json({url:upload.url})
        } catch (error) {
            res.status(400).json({ error })
        }
    })






module.exports = router;