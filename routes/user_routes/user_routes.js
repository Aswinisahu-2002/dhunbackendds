const express = require("express")
const { allUser } = require("../../controllers/user_controllers/user_controller")

const user_route = express.Router()

// user_route.get("/userdetails",userdetails)
user_route.get("/alluser",allUser)

module.exports = user_route