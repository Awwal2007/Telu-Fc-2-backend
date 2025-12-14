const dotenv = require("dotenv")
const transporter = require('./transporter');

const sendSuccessfulApplicationEmail = (email, userFirstName, token)=>{
    const options = {
        to: email,
        subject: "Application Successfull for Telu Fc Coach",
        from: "Telu Fc",
        replyTo: "no-reply@TeluFc.com",
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">
        <p style="margin-bottom: 16px;">Hi ${userFirstName},</p>
      
        <p style="margin-bottom: 16px;">
          Thanks for applying for coach at <strong>TELU FC</strong> — we're thrilled to have you on board!
        </p>
      
        <p style="margin-bottom: 16px;">
          Your application have been submitted successfully. you will receive another mail when the team have approve your details
        </p>
      
      
        <p style="margin-bottom: 16px;">
          Welcome again,
        </p>
      
        <p style="font-weight: bold;">The TELU FC Team</p>
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

module.exports = sendSuccessfulApplicationEmail
