const mongoose = require("mongoose")
const { userSchema } = require("../schema/user_shema")

const USER = mongoose.model("user",userSchema)

module.exports = {USER}