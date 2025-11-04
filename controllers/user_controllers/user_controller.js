const { USER } = require("../../models/user_model")


// const userdetails = async (req,res) => {  
// }

const allUser = async (req,res) => {
    try {
        const users = await USER.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:"Server side error"})
    }
}

module.exports = {allUser}