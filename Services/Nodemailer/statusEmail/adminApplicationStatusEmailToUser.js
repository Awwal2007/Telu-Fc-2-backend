const transporter = require("../transporter");


const adminApplicationStatusEmailToUser = (email, userFirstName, status, message) => {
  const isApproved = status === "approved";

  const options = {
    to: email,
    subject: isApproved
      ? "Update on Your TELU FC Coach Application"
      : "Update on Your TELU FC Coach Application",
    from: "TELU FC <no-reply@telufc.com>",
    replyTo: "no-reply@telufc.com",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">

        <p>Dear ${userFirstName},</p>

        <p> ${message } </p>

        <p>
          We appreciate the time and effort you put into your application.
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
      console.error(err.message);
    } else {
      console.log(`Application ${status} email sent successfully`);
    }
  });
};

module.exports = adminApplicationStatusEmailToUser;
