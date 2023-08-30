
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "../public/assets/video")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + Date.now().toString() + '.mp4' )
    }
});

const uploadVideo = multer( {storage: storage} );

module.exports = uploadVideo;