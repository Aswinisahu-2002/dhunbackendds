const { USER } = require("../../models/user_model")
const bcrypt = require("bcrypt")
const jwt_token = require("../../utils/tokenGenerator")
const sendEmail = require("../../config/email/email")
const registerController = async (req,res) => {
    const newUser = req.body
    const hashPassword = await bcrypt.hash(newUser.password , 10)
    try {
        const user = await USER.findOne({email:newUser.email})
        if(user) return res.json({message:"Alredy exist"})
        
        await USER.insertOne({...newUser,password:hashPassword,role:"user"})
        // sendmail here
        sendEmail(newUser.email,"Wellcome to dhun")
        res.json({message:"Registration succefully"})
    } catch (error) {
        console.log("Registration faild")
    }
}


const loginController = async (req,res) => {
    const user = req.body
    try {
        const isPresnt = await USER.findOne({email:user.email})
        if(!isPresnt) return res.status(404).json({message:"Register first"})
        const match = await bcrypt.compare(user.password,isPresnt.password)
        if(!match) return res.status(401).json({message:"Invalid Password"})

        //! Generate token
        const token = jwt_token({isPresnt})
        res.status(200).json({message:"Login successfull",token,username:isPresnt.username})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Login faild"})
    }
}


module.exports = {registerController,loginController}