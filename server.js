require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { connectDb } = require("./config/db/db")
const public_route = require("./routes/public_rotes/public_routes")
const user_route = require("./routes/user_routes/user_routes")
const songs_route = require("./routes/songs_route/songs_route")
const { swaggerUi, swaggerSpec } = require("./swagger")

const app = express()

//!Databse connection
connectDb()

//! Set midlleware
app.use(express.json())
app.use(cors())
//!Swagger
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use("/dhun",public_route)
app.use("/dhun",user_route)
app.use("/dhun",songs_route)


/**
 * @openapi
 * /test:
 *   get:
 *     summary: Welcome to demo API
 *     tags: [Demo]
 *     responses:
 *       200:
 *         description: All ok
 */
app.get("/test",(req,res)=>{
    res.json({data:"Wellcome"})
})



app.listen(process.env.PORT,()=>{
    console.log("Server started")
})
