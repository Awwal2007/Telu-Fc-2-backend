const transporter = require("../transporter");

const adminNotificationEmail = ( applicantEmail, applicantName, status
) => {
  const isApproved = status === "approved";
  const client_domain = process.env.client_domain

  const options = {
    to: "telufciwo@gmail.com",
    subject: `Coach Application ${isApproved ? "Approved" : "Rejected"} – TELU FC`,
    from: "TELU FC System <no-reply@telufc.com>",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; line-height: 1.6; padding: 20px;">

        <p>Hello Admin,</p>

        <p>
          This is to notify you that a coach application has been 
          <strong>${isApproved ? "approved" : "rejected"}</strong>.
        </p>

        <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Applicant Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${applicantName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${applicantEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">
              ${isApproved ? "Approved" : "Rejected"}
            </td>
          </tr>
        </table>

        ${
          isApproved
            ? `
              <p style="margin-top: 16px;">
                The applicant has been notified of their approval and will receive
                further onboarding instructions.
              </p>
            `
            : `
              <p style="margin-top: 16px;">
                The applicant has been notified of the decision.
              </p>
            `
        }

        <a href="${client_domain}/admin" style="display: inline-block; margin-top: 24px; background: #d32f2f; color: #fff; padding: 8px 20px; border-radius: 12px; text-decoration: none; font-weight: bold;"">
          Please log in to the admin dashboard for more details.
        </a>

        <p style="font-weight: bold;">
          TELU FC System Notification
        </p>

      </div>
    `
  };

  transporter.sendMail(options, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Admin notification email sent successfully");
    }
  });
};

module.exports = adminNotificationEmail;
