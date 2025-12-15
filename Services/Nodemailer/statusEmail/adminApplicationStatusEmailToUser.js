const transporter = require("../transporter");


const adminApplicationStatusEmailToUser = (email, userFirstName, status) => {
  const isApproved = status === "approved";

  const options = {
    to: email,
    subject: isApproved
      ? "Congratulations! Your TELU FC Coach Application Has Been Approved"
      : "Update on Your TELU FC Coach Application",
    from: "TELU FC <no-reply@telufc.com>",
    replyTo: "no-reply@telufc.com",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; padding: 20px;">

        <p>Dear ${userFirstName},</p>

        ${
          isApproved
            ? `
              <p>
                We are pleased to inform you that your application for the position of
                <strong>Coach at TELU FC</strong> has been <strong>approved</strong>.
              </p>

              <p>
                After reviewing your details, our team believes your experience and passion
                align well with the vision and values of TELU FC.
              </p>

              <p>
                Further instructions and next steps will be shared with you shortly.
                Please keep an eye on your inbox.
              </p>

              <p style="margin-top: 24px;">
                Welcome to the TELU FC family. We look forward to working with you.
              </p>
            `
            : `
              <p>
                Thank you for your interest in the <strong>Coach position at TELU FC</strong>.
              </p>

              <p>
                After careful consideration, we regret to inform you that your application
                was <strong>not approved</strong> at this time.
              </p>

              <p>
                This decision does not reflect your abilities or passion for the game.
                We encourage you to apply again in the future as new opportunities arise.
              </p>
            `
        }

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
