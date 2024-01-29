import "@pnp/sp/lists";
import {Web, IWeb, IEmailProperties } from "@pnp/sp/presets/all";
// import { IEmailProperties } from "@pnp/sp/presets/all";  // Correct import statement

import { getSp } from "../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";



export async function Approvalmail(Content, approverEmail, ApprovedBy) {
  const emailProps: IEmailProperties = {
    To: [approverEmail],
    CC: [Content.RequestorEmail],
    BCC: [],
    Subject: `${Content.Filename}  - File is waiting for approval.`,
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
        <h3 style="text-align: center;">Request for file upload</h3>
        <p style="text-align: center;" aria-hidden="true">&nbsp;</p>
        // <p style="text-align: center;"><img src="https://cdn-icons-png.flaticon.com/512/2489/2489187.png" alt="Girl in a jacket" width="189" height="190" /></p>
        
        <p style="text-align: center;"><img src="https://cdn-icons-png.flaticon.com/512/2489/2489187.png" alt="Girl in a jacket" width="189" height="190" /></p>

        <h4 style="text-align: center;">&nbsp;</h4>
        <h4 style="text-align: center;">Approval Info</h4>
        <p style="text-align: center;"><strong>Approver :</strong>&nbsp;  ${ApprovedBy}</p>
        <p style="text-align: center;"><strong>Approver Level :</strong>&nbsp; ${Content.ApprovalStatus}</p>
        <p style="text-align: center;"><strong>Document Name: </strong>${Content.Filename}</p>
        <p style="text-align: center;"><strong>File Name:</strong> ${Content.FileTitle}</p>
        <p style="text-align: center;"><strong>Requestor:</strong> ${Content.Requester}</p>
        <p style="text-align: center;"><strong>Date:</strong> ${Content.FileUploadDate}</p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center;">To view the request.</p>
        // <p style="text-align: center;"><a class="button" href="https://m365x44410739.sharepoint.com/sites/DMSportal/SitePages/Home.aspx#/Approvers">View</a></p>

        <p style="text-align: center;"><a class="button" href="https://m365b125021.sharepoint.com/sites/DMS-TATA/SitePages/Home.aspx#/Approvers">View</a></p>

        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center;">&nbsp;</p>
        </body>
        </html>`,
  };
  const sp: SPFI = getSp();

  await sp.utility.sendEmail(emailProps);

//   const sp: SPFI = getSp();
// try {
//   let some: any = await sp.utility.sendEmail(emailProps);
//   console.log(some);
// } catch (error) {
//   console.error("Error sending email:", error);
// }


}

export async function UserApprovalmail(Content) {
  const emailProps: IEmailProperties = {
    To: [Content.Requester],
    CC: [],
    BCC: [],
    Subject: `${Content.Filename} - File got uploaded successfully.`,
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
  <h3 style="text-align: center;">Your file approve request is approved.</h3>
  <p style="text-align: center;" aria-hidden="true">&nbsp;</p>
  <p style="text-align: center;"><img src="https://cdn-icons-png.flaticon.com/512/2489/2489187.png" alt="Girl in a jacket" width="189" height="190" /></p>
  <h4 style="text-align: center;">&nbsp;</h4>
  <h4 style="text-align: center;">Approval Info</h4>
  <p style="text-align: center;"><strong>Approver Level :</strong>&nbsp; ${Content.ApprovalStatus}</p>
  <p style="text-align: center;"><strong>Document Name: </strong>${Content.Filename}</p>
  <p style="text-align: center;"><strong>File Name:</strong> ${Content.FileTitle}</p>
  <p style="text-align: center;"><strong>Requestor:</strong> ${Content.Requester}</p>
  <p style="text-align: center;"><strong>Date:</strong> ${Content.FileUploadDate}</p>
  <p style="text-align: center;">&nbsp;</p>
  <p style="text-align: center;">To view the file.</p>
  // <p style="text-align: center;"><a class="button" href="https://m365x44410739.sharepoint.com/sites/DMSportal#/">View</a></p>

  <p style="text-align: center;"><a class="button" href="https://m365b125021.sharepoint.com/sites/DMS-TATA#/">View</a></p>

  <p style="text-align: center;">&nbsp;</p>
  <p style="text-align: center;">&nbsp;</p>
  </body>
      </html>`,
  };
  const sp: SPFI = getSp();
  await sp.utility.sendEmail(emailProps);

  // const sp: SPFI = getSp();
  // try {
  //   let some: any = await sp.utility.sendEmail(emailProps);
  //   console.log(some);
  // } catch (error) {
  //   console.error("Error sending email:", error);
  // }
  


}

export async function Denymail(Sender, Content, Comment) {
  // const sp:SPFI=getSp();
  console.log(Comment);
  const emailProps: IEmailProperties = {
    To: [Sender],
    CC: [],
    BCC: [],
    Subject: "File Upload request has been Rejected!",
    Body: `<html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">


        </head>
        <body>
        <h3 style="text-align: center;">&nbsp;</h3>
<h3 style="text-align: center;">Your file approve request is Rejected.</h3>
<p style="text-align: center;" aria-hidden="true">&nbsp;</p>
<p style="text-align: center;"><img src="https://cdn-icons-png.flaticon.com/512/3285/3285687.png" alt="Girl in a jacket" width="189" height="190" /></p>
<h4 style="text-align: center;">&nbsp;</h4>
<h4 style="text-align: center;">Approval Info</h4>
<p style="text-align: center;"><strong>Approver Level :</strong>&nbsp; ${Content.ApprovalStatus}</p>
<p style="text-align: center;"><strong>Document Name: </strong>${Content.Filename}</p>
<p style="text-align: center;"><strong>File Name:</strong> ${Content.FileTitle}</p>
<p style="text-align: center;"><strong>Requestor:</strong> ${Content.Requester}</p>
<p style="text-align: center;"><strong>Date:</strong> ${Content.FileUploadDate}</p>
<p style="text-align: center;"><strong>Comments:</strong> ${Comment}</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
        </body>
        </html>`,
  };
  const sp:SPFI=getSp();
  let some:any = await sp.utility.sendEmail(emailProps);
  console.log(some);

//   const sp: SPFI = getSp();
// try {
//   let some: any = await sp.utility.sendEmail(emailProps);
//   console.log(some);
// } catch (error) {
//   console.error("Error sending email:", error);
// }


}
