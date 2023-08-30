

const mongoose = require("mongoose");
const { Schema } = mongoose;



const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique  :true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    }

});

const User = mongoose.model("User", UserSchema);
module.exports = User;