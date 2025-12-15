const dotenv = require("dotenv");
const transporter = require('../transporter');

const sendSuccessfulApplicationEmail = (email, userFirstName, token) => {
  const options = {
    to: email,
    subject: "Application Successfully Submitted – TELU FC Coach",
    from: "TELU FC <no-reply@telufc.com>",
    replyTo: "no-reply@telufc.com",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">
        
        <p style="margin-bottom: 16px;">Hi ${userFirstName},</p>

        <p style="margin-bottom: 16px;">
          Thank you for applying for the <strong>Coach</strong> position at 
          <strong>TELU FC</strong>. We’re excited to receive your application.
        </p>

        <p style="margin-bottom: 16px;">
          Your application has been submitted successfully. You will receive another
          email once our team has reviewed and approved your details.
        </p>

        <p style="font-weight: bold; margin-top: 24px;">
          Best regards,<br/>
          The TELU FC Management Team
        </p>

      </div>
    `
  };

  transporter.sendMail(options, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Application confirmation email sent successfully");
    }
  });
};

module.exports = sendSuccessfulApplicationEmail;
