
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const uploadVideo = require('../middleware/uploadVideo');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');




router.post('/video/upload', fetchuser, uploadVideo.single("video"), async (req, res)=>{
// router.post('/video/upload', express.raw({type: "*/*"}), async (req, res)=>{
    try {
        
      const user = await User.findById(req.user.id).select("-password");

        const data = await Video.create({
            video: req.file.filename,
            useId:  user._id
        }) 

        res.send(data)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


router.get('/video/get/all', fetchuser, async (req, res)=>{
    try {
        
        const user = await User.findById(req.user.id).select("-password");
        const videos = await Video.find({useId: user._id })

        if(!videos){
            return res.send({msg: "You dont have any video"})
        }else{
            res.send({videos: videos});
        }

    } catch (error) {
        res.status(500).send("Internal server error")
    }

} )


module.exports = router