import "@pnp/sp/lists";
import { Web, IWeb, IEmailProperties } from "@pnp/sp/presets/all";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";

export async function Approvalmail(Content, level, Sender, Approver1) {
  const emailProps: IEmailProperties = {
    To: [Approver1],
    CC: [Content.RequestorEmail],
    BCC: [],
    Subject: "Request for file upload!",
    Body: `

    <html>

    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <style>
      .button {
          background-color: #0078D4; /* Green */
          border: none;
          color: white;
          padding: 10px 25px;
          border-radius: 3px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }
      </style>
    </head>

    <body>
      <h3 style="text-align: center;">&nbsp;</h3>
      <h3 style="text-align: center;">Your file approve request is approved.</h3>
      <p style="text-align: center;" aria-hidden="true">&nbsp;</p>
      <p style="text-align: center;">
        <img src="https://cdn-icons-png.flaticon.com/512/2489/2489187.png" alt="Success" width="189" height="190">
      </p>
      <h4 style="text-align: center;">&nbsp;</h4>
      <h4 style="text-align: center;">Approval Info</h4>
      <p style="text-align: center;">
        <strong>Approver Level :</strong>&nbsp;${level}</p>
      <p style="text-align: center;">
        <strong>Document Name:</strong>${Content.Filename}</p>
      <p style="text-align: center;">
        <strong>File Name:</strong>${Content.FileTitle}</p>
      <p style="text-align: center;">
        <strong>Requestor:</strong>${Content.Requester}</p>
      <p style="text-align: center;">
        <strong>Date:</strong>${Content.FileUploadDate}</p>

      <p style="text-align: center;">To view the file.<a class="button" href=${Content.Fileurl}>View</a></p>

 
      <p style="text-align: center;">Navigate to DMS Dashboard.<a class="button" href="https://m365x14463464.sharepoint.com/sites/DMS-Quadra">Navigate</a></p>

      <p style="text-align: center;">&nbsp;</p>
      <p style="text-align: center;">&nbsp;</p>
    </body>

    </html>
    `,
  };
  const sp: SPFI = getSp();
  await sp.utility.sendEmail(emailProps);
}

export async function Denymail(Content, Sender, Comment) {
  console.log(Content);

  const emailProps: IEmailProperties = {
    To: [Sender, Content.RequestorEmail],
    CC: [],
    BCC: [],
    Subject: "File Upload request has been Rejected!",
    Body: `<html>

    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <style>
      .button {
          background-color: #0078D4; /* Green */
          border: none;
          color: white;
          padding: 10px 25px;
          border-radius: 3px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }
      </style>
    </head>

    <body>
      <h3 style="text-align: center;">&nbsp;</h3>
      <h3 style="text-align: center;">Your file approve request Denied.</h3>
      <p style="text-align: center;" aria-hidden="true">&nbsp;</p>
      <p style="text-align: center;">
        <img src="https://cdn-icons-png.flaticon.com/512/2489/2489190.png" alt="Denied" width="189" height="190">
      </p>
      <h4 style="text-align: center;">&nbsp;</h4>
      <h4 style="text-align: center;">Approval Info</h4>

      <p style="text-align: center;">
        <strong>Document Name:</strong>${Content.Filename}</p>
      <p style="text-align: center;">
        <strong>File Name:</strong>${Content.FileTitle}</p>
       <p style="text-align: center;">
        <strong>Aproval Level:</strong>QMS</p>

      <p style="text-align: center;">
        <strong>Date:</strong>${Content.FileUploadDate}</p>
        <p style="text-align: center;">
        <strong>Feedback: </strong>${Comment}</p>

      <p style="text-align: center;">To view the file. <a class="button" href=${Content.Fileurl}>View</a></p>
      <p style="text-align: center;">Navigate to DMS Dashboard.<a class="button" href="https://m365x14463464.sharepoint.com/sites/DMS-Quadra">Navigate</a></p>
      <p style="text-align: center;">&nbsp;</p>
      <p style="text-align: center;">&nbsp;</p>
    </body>

    </html>`,
  };
  const sp: SPFI = getSp();
  let a = await sp.utility.sendEmail(emailProps);
  console.log(a);
}
