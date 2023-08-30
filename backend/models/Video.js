
const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoSchema = new Schema({
    video: {
        type: String,
        require: true
    },
    useId:{
        type: String,
        require: true
    }
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;