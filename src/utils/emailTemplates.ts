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

  export const generateEmailContent = (data: {
    event: string;
    fullName: string;
    email: string;
    phone: string;
    prn: string;
    class: string;
    branch: string;
    payment: {
      referenceId: string;
      timestamp: string;
      screenshot: unknown;
    };
    status: string;
    createdAt: string;
  }) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #007bff;
            }
            p {
              font-size: 16px;
              color: #333;
            }
            .event-details {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>VERVE Event Registration Confirmation</h1>
            <p>Dear ${data.fullName},</p>
            <p>Thank you for registering for the VERVE event <strong>${data.event}</strong>.</p>
            
            <div class="event-details">
              <h2>Event Details:</h2>
              <p><strong>Event:</strong> ${data.event}</p>
              <p><strong>PRN:</strong> ${data.prn}</p>
              <p><strong>Class:</strong> ${data.class}</p>
              <p><strong>Branch:</strong> ${data.branch}</p>
              <p><strong>Payment Reference ID:</strong> ${data.payment.referenceId}</p>
            </div>
  
            <P>Join the WhatsApp group for further updates: <a href="https://chat.whatsapp.com/IcfNOgRmtbbFi9hZX9ycXv">Join Group</a></p>
            <p>If you have any queries, feel free to contact the event coordinators.</p>
  
            <p>Best Regards,</p>
            <p>VERVE Event Management</p>
          </div>
        </body>
      </html>
    `;
  };
  

  // export const VERVE_REGISTRATION_CONFIRMATION_TEMPLATE = (
  //   event: string,
  //   fullName: string,
  //   email: string,
  //   phone: string,
  //   prn: string,
  //   className: string,
  //   branch: string,
  //   paymentReferenceId: string,
  //   paymentScreenshot: string // Assuming it's a base64 image
  // ) => `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>VERVE Event Registration Confirmation</title>
  //   </head>
  //   <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  //     <div style="background: #333; padding: 20px; text-align: center;">
  //       <h1 style="color: white; margin: 0;">VERVE Event Registration Confirmation</h1>
  //     </div>
  //     <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #333;">
  //       <p>Hello, <strong>${fullName}</strong>!</p>
  //       <p>Thank you for registering for the <strong>${event}</strong> event. Below are the details of your registration:</p>
        
  //       <h3 style="color: #333; margin-bottom: 10px;">Event Details</h3>
  //       <ul style="list-style-type: none; padding: 0;">
  //         <li><strong>Event Name:</strong> ${event}</li>
  //         <li><strong>Payment Reference ID:</strong> ${paymentReferenceId}</li>
  //       </ul>
    
  //       <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Your Details</h3>
  //       <table style="width: 100%; border-collapse: collapse;">
  //         <thead>
  //           <tr style="background-color: #333; color: white;">
  //             <th style="padding: 10px; text-align: left;">Email</th>
  //             <th style="padding: 10px; text-align: left;">Phone</th>
  //             <th style="padding: 10px; text-align: left;">PRN</th>
  //             <th style="padding: 10px; text-align: left;">Class</th>
  //             <th style="padding: 10px; text-align: left;">Branch</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr style="border-bottom: 1px solid #ddd;">
  //             <td style="padding: 10px;">${email}</td>
  //             <td style="padding: 10px;">${phone}</td>
  //             <td style="padding: 10px;">${prn}</td>
  //             <td style="padding: 10px;">${className}</td>
  //             <td style="padding: 10px;">${branch}</td>
  //           </tr>
  //         </tbody>
  //       </table>
    
  //       <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Payment Screenshot</h3>
  //       <img src="${paymentScreenshot}" alt="Payment Screenshot" style="max-width: 100%; height: auto; border-radius: 5px; margin-bottom: 20px;" />
    
  //       <p style="margin-top: 20px;">Your registration status is <strong>pending</strong> and will be reviewed shortly.</p>
  //       <p>If you have any queries, feel free to contact the event coordinators.</p>
    
  //       <p>Best Regards,</p>
  //       <p>VERVE Event Management</p>
  //     </div>
  //     <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
  //       <p>This is an automated message, please do not reply to this email.</p>
  //     </div>
  //   </body>
  //   </html>
  // `;
  