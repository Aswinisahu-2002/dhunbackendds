const mongoose = require("mongoose")

const songs_schema = new mongoose.Schema({
    title:String,
    artist:String,
    duration:Number,
    coverUrl:String,
    audioUrl:String,
    isliked:{type:Boolean,default:false}
})

module.exports = songs_schema