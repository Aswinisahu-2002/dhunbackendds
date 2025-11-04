const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Databse connected")
    } catch (error) {
        console.log("Db connection faild")
    }
}

module.exports  = {connectDb}