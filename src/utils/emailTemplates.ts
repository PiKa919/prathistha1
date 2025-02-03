export const REGISTRATION_CONFIRMATION_TEMPLATE = (
    eventName: string,
    teamSize: number,
    paymentReferenceId: string,
    members: Array<{
      fullName: string;
      email: string;
      phone: string;
      prn: string;
      class: string;
      branch: string;
      isTeamLeader: boolean;
    }>
  ) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
    <div style="background: #333; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">AURUM Event Registration Confirmation</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #333;">
      <p>Hello, <strong>Team Leader</strong>!</p>
      <p>Thank you for registering for the <strong>${eventName}</strong> event. Below are the details of your registration:</p>
      
      <h3 style="color: #333; margin-bottom: 10px;">Event Details</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li><strong>Event Name:</strong> ${eventName}</li>
        <li><strong>Team Size:</strong> ${teamSize}</li>
        <li><strong>Payment Reference ID:</strong> ${paymentReferenceId}</li>
      </ul>
  
      <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Team Members</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #333; color: white;">
            <th style="padding: 10px; text-align: left;">Name</th>
            <th style="padding: 10px; text-align: left;">Email</th>
            <th style="padding: 10px; text-align: left;">Phone</th>
            <th style="padding: 10px; text-align: left;">PRN</th>
            <th style="padding: 10px; text-align: left;">Class</th>
            <th style="padding: 10px; text-align: left;">Branch</th>
            <th style="padding: 10px; text-align: left;">Role</th>
          </tr>
        </thead>
        <tbody>
          ${members
            .map(
              (member) => `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px;">${member.fullName}</td>
              <td style="padding: 10px;">${member.email}</td>
              <td style="padding: 10px;">${member.phone}</td>
              <td style="padding: 10px;">${member.prn}</td>
              <td style="padding: 10px;">${member.class}</td>
              <td style="padding: 10px;">${member.branch}</td>
              <td style="padding: 10px;">${member.isTeamLeader ? "Team Leader" : "Member"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
  
      <p style="margin-top: 20px;">We look forward to seeing you at the event! If you have any questions, feel free to contact us.</p>
      <p>Best regards,<br>AURUM Event Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;