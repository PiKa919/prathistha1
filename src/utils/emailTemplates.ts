export const REGISTRATION_CONFIRMATION_TEMPLATE = (
  eventName: string,
  teamName: string,
  teamSize: number,
  paymentReferenceId: string,
  paymentTimestamp: string,
  registrationTimestamp: string,
  members: Array<{
    fullName: string;
    email: string;
    phone: string;
    prn: string;
    class: string;
    branch: string;
    isTeamLeader?: boolean;
  }>
) => {
  const teamLeader = members.find((member) => member.isTeamLeader);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .header {
        background: #333;
        padding: 20px;
        text-align: center;
        max-width: 560px;  /* Match content width */
        margin: 0 auto;    /* Center align */
        border-radius: 5px 5px 0 0; /* Rounded corners on top */
      }
      .header h1 {
        color: white;
        margin: 0;
        font-size: 24px;
      }
      .container {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        max-width: 600px;
        margin: 0 auto;
        box-sizing: border-box;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed; /* Ensure consistent column widths */
        word-wrap: break-word;
      }
      th, td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
        word-break: break-word; /* Handles long content */
      }
      th {
        background-color: #333;
        color: white;
      }
      th:nth-child(1), td:nth-child(1) { width: 15%; }  /* Name */
      th:nth-child(2), td:nth-child(2) { width: 20%; }  /* Email */
      th:nth-child(3), td:nth-child(3) { width: 15%; }  /* Phone */
      th:nth-child(4), td:nth-child(4) { width: 10%; }  /* PRN */
      th:nth-child(5), td:nth-child(5) { width: 10%; }  /* Class */
      th:nth-child(6), td:nth-child(6) { width: 15%; }  /* Branch */
    </style>
  </head>
  <body>
    <div class="header">
      <h1>AURUM Event Registration Confirmation</h1>
    </div>

    <div class="container">
      <p>Hello, <strong>${teamLeader ? teamLeader.fullName : "Team Leader"}</strong>!</p>
      <p>Thank you for registering for the <strong>${eventName}</strong> event. Here are your registration details:</p>

      <h3>Event Details</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li><strong>Event Name:</strong> ${eventName}</li>
        <li><strong>Team Name:</strong> ${teamName}</li>
        <li><strong>Team Size:</strong> ${teamSize}</li>
        <li><strong>Payment Reference ID:</strong> ${paymentReferenceId}</li>
        <li><strong>Payment Timestamp:</strong> ${new Date(paymentTimestamp).toLocaleString()}</li>
        <li><strong>Registration Date:</strong> ${new Date(registrationTimestamp).toLocaleString()}</li>
      </ul>

      <h3>Team Members</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>PRN</th>
            <th>Class</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          ${members
            .map(
              (member) => `
            <tr>
              <td>${member.fullName}</td>
              <td>${member.email}</td>
              <td>${member.phone}</td>
              <td>${member.prn}</td>
              <td>${member.class}</td>
              <td>${member.branch}</td>
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
};



  // export const generateEmailContent = (data: {
  //   event: string;
  //   fullName: string;
  //   email: string;
  //   phone: string;
  //   prn: string;
  //   class: string;
  //   branch: string;
  //   payment: {
  //     referenceId: string;
  //     timestamp: string;
  //     screenshot: unknown;
  //   };
  //   status: string;
  //   createdAt: string;
  // }) => {
  //   return `
  //     <html>
  //       <head>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //             background-color: #f0f0f0;
  //             padding: 20px;
  //           }
  //           .container {
  //             background-color: #ffffff;
  //             padding: 20px;
  //             border-radius: 8px;
  //             box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  //           }
  //           h1 {
  //             color: #007bff;
  //           }
  //           p {
  //             font-size: 16px;
  //             color: #333;
  //           }
  //           .event-details {
  //             margin-top: 20px;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="container">
  //           <h1>VERVE Event Registration Confirmation</h1>
  //           <p>Dear ${data.fullName},</p>
  //           <p>Thank you for registering for the VERVE event <strong>${data.event}</strong>.</p>
            
  //           <div class="event-details">
  //             <h2>Event Details:</h2>
  //             <p><strong>Event:</strong> ${data.event}</p>
  //             <p><strong>PRN:</strong> ${data.prn}</p>
  //             <p><strong>Class:</strong> ${data.class}</p>
  //             <p><strong>Branch:</strong> ${data.branch}</p>
  //             <p><strong>Payment Reference ID:</strong> ${data.payment.referenceId}</p>
  //           </div>
  
           
  //           <p>If you have any queries, feel free to contact the event coordinators.</p>
  
  //           <p>Best Regards,</p>
  //           <p>VERVE Event Management</p>
  //         </div>
  //       </body>
  //     </html>
  //   `;
  // };
  

  export const VERVE_REGISTRATION_CONFIRMATION_TEMPLATE = (
    eventName: string,
    fullName: string,
    email: string,               // Added
    phone: string,               // Added
    paymentReferenceId: string,
    paymentTimestamp: string,
    registrationTimestamp: string,
    prn: string,
    className: string,           // Renamed from `class` to `className`
    branch: string
  ) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .header {
            background: #333;
            padding: 20px;
            text-align: center;
            max-width: 560px;
            margin: 0 auto;
            border-radius: 5px 5px 0 0;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
          }
          .container {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 0 auto;
            box-sizing: border-box;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background-color: #333;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>VERVE Event Registration Confirmation</h1>
        </div>
  
        <div class="container">
          <p>Hello, <strong>${fullName}</strong>!</p>
          <p>Thank you for registering for the <strong>${eventName}</strong> event. Here are your registration details:</p>
  
          <h3>Event Details</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Event Name:</strong> ${eventName}</li>
            <li><strong>Payment Reference ID:</strong> ${paymentReferenceId}</li>
            <li><strong>Payment Timestamp:</strong> ${new Date(paymentTimestamp).toLocaleString()}</li>
            <li><strong>Registration Date:</strong> ${new Date(registrationTimestamp).toLocaleString()}</li>
          </ul>
  
          <h3>Participant Details</h3>
          <table>
            <tr><th>Name</th><td>${fullName}</td></tr>
            <tr><th>Email</th><td>${email}</td></tr>
            <tr><th>Phone</th><td>${phone}</td></tr>
            <tr><th>PRN</th><td>${prn}</td></tr>
            <tr><th>Class</th><td>${className}</td></tr>
            <tr><th>Branch</th><td>${branch}</td></tr>
          </table>
  
          <p style="margin-top: 20px;">We look forward to seeing you at the event! If you have any questions, feel free to contact us.</p>
          <p>Best regards,<br>VERVE Event Team</p>
        </div>
  
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `;
  };
  