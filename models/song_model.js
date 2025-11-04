const mongoose = require("mongoose")
const songs_schema = require("../schema/songs_shema")

const SONGS = mongoose.model("song",songs_schema)

module.exports = SONGS