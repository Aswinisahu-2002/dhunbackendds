const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS_KEY
    }
})

const sendEmail = async(email,text)=>{
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Dhun",
        text:text
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Mail send successfully")
        console.log(info)
    } catch (error) {
        console.log("mail not sent")
        console.log(error.message)
    }
}

module.exports = sendEmail