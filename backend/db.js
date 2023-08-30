
const mongoose = require("mongoose");

const mongoURI = `mongodb+srv://pglgod:pglgod@cluster0.kwrvryc.mongodb.net/?retryWrites=true&w=majority`

const conectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("KORERO Connected");
    }).catch(()=>{
        console.error('Error connecting to KORERO');
    })
}


module.exports = conectToMongo;