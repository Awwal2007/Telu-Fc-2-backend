const dotenv = require("dotenv");
const transporter = require('../transporter');

const client_domain = process.env.client_domain;

const sendSuccessfulEmailToAdmin = (email, userFirstName, token) => {
  const options = {
    to: "telufciwo@gmail.com",
    subject: "New Coach Application – TELU FC",
    from: "TELU FC <no-reply@telufc.com>",
    replyTo: "no-reply@telufc.com",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">
        
        <p style="margin-bottom: 16px;">Hello Admin,</p>

        <p style="margin-bottom: 16px;">
          Mr. ${userFirstName} has submitted an application for the coaching position
          and is currently awaiting your review and approval.
        </p>

        <a 
          href="${client_domain}/admin" 
          style="display: inline-block; margin-bottom: 16px; background: #d32f2f; color: #fff; padding: 8px 20px; border-radius: 12px; text-decoration: none; font-weight: bold;"
        >
          Review Application
        </a>

        <p style="font-weight: bold; margin-top: 24px;">
          The TELU FC Management Team
        </p>

      </div>
    `
  };

  transporter.sendMail(options, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Admin notification email sent successfully");
    }
  });
};

module.exports = sendSuccessfulEmailToAdmin;
