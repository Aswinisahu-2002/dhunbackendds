const express = require("express")
const { registerController, loginController } = require("../../controllers/public_controllers/public_controller")

const public_route = express.Router()

/**
 * @openapi
 * /demo:
 *   get:
 *     summary: Welcome to demo API
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: All ok
 */
public_route.get("/demo", (req, res) => {
    res.status(200).json({ message: "All ok" });
});


public_route.post("/register",registerController)
public_route.post("/login",loginController)

module.exports = public_route