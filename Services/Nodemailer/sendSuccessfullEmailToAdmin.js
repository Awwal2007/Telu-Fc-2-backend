const dotenv = require("dotenv")
const transporter = require('./transporter');

const client_domain = process.env.client_domain

const sendSuccessfullEmailToAdmin = (email, userFirstName, token)=>{
    const options = {
        to: "bellomonsuru886@gmail.com",
        subject: "Application Successfull for Telu Fc Coach",
        from: "Telu Fc",
        replyTo: "no-reply@TeluFc.com",
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">
        <p style="margin-bottom: 16px;">Hi Admin,</p>
      
        <p style="margin-bottom: 16px;">
          Mr ${userFirstName} has applied for the coaching job and waiting for your approval
        </p>
      
      
        <a href="${client_domain}" style="margin-bottom: 16px; background: red; padding: 6px 18px; border-radius: 12px; cursor: pointer;">
          Check it out
        </a>
      
        <p style="font-weight: bold;">The Telu FC Team</p>
      </div>
        `
    }
    transporter.sendMail(options, (err, info)=>{
        if(err){
          console.log(err.message)
        }else{
          console.log("Email sent successfully")
          // console.log(info)
        }
    })
}

module.exports = sendSuccessfullEmailToAdmin
