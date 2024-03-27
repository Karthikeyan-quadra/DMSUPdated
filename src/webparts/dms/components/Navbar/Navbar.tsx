//Original code
// // import { sp } from "@pnp/sp"
// import { SPFI } from "@pnp/sp";
// import { getSp } from "../../../../helpers/PnPConfig";
// import "@pnp/sp/items"
// import "@pnp/sp/lists"
// import "@pnp/sp/webs"
// import "bootstrap/dist/css/bootstrap.min.css"
// import * as React from "react"
// import User from "../User/User"
// import Qms from "../QMS/Qms"
// import styless from "./navbar.module.scss"
// import Approvers from "../Approvers/Approvers"
// import { Web } from "@pnp/sp/webs"
// import { Pivot, PivotItem, PivotLinkFormat } from "office-ui-fabric-react"

// export default class header extends React.Component<{}, any> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       userArray: [],
//       QMS: "false",
//       Approvers: "false",
//       FileViewer: "false",
//       Fileuploader: "false",
//     }
//   }

//   foo() {}

//   public async componentWillMount() {
//     // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal")
//     const sp:SPFI=getSp()
//     const currentUser = await sp.web.currentUser()
//     console.log(currentUser)

//     let sss = await sp.web.lists
//       .getByTitle("My Docs")
//       .items.getById(11)      
//       .versions()

//       // .versions.get()

//     console.log(sss)

//     const items: any[] = await sp.web.lists.getByTitle("Userdetails").items()
//     console.log(items)
 
//     let userArray = await items.filter(async (i) => {
//       const { Username, EmailID, FileViewer, Fileuploader, QMS, Approver } = i;
//       if (currentUser.Email === EmailID) {
//         userArray.push({
//           Username: Username,
//           EmailID: EmailID,
//           FileViewer: FileViewer,
//           Fileuploader: Fileuploader,
//           QMS: QMS,
//           Approver: Approver,
//         });
//       } 
//       });
//     await console.log(userArray)
//     // let userArray = await newFunction();
//     await this.setState({
//       userArray: userArray,
//       QMS: userArray[0].QMS,
//       Approvers: userArray[0].Approver,
//       FileViewer: userArray[0].FileViewer,
//       Fileuploader: userArray[0].Fileuploader,
//     })
//     // return userArray;
//     console.log(this.state)
//   }

//   public render() {
//     let val = (
//       <img
//         src='https://www.tata.com/etc/designs/tata/publish/assets/img/pages/nav/Tata_Logo2.svg'
//         width='100px'
//         height='100px'
//         style={{ padding: "10px" }}
//       />
//     )

//     return (
//       <div>
//         <div className={styless.header}>
//           <span>
//             <p
//               style={{
//                 fontSize: "30px",
//                 padding: "10px",
//                 color: "white",
//               }}
//             >
//               <img
//                 src='https://m365x44410739.sharepoint.com/:i:/s/DMSportal/EdrtDoWgy7hMkDf20Q6JJl0BEX97dAa9He_h7v47sMJBZw?e=HCcPL3'
//                 width='100px'
//                 height='100px'
//                 style={{ padding: "10px" }}
//               />
//               Quadra
//               <p
//                 style={{
//                   float: "right",
//                   fontSize: "30px",
//                   padding: "20px",
//                   color: "white",
//                 }}
//               >
//                 Document Management System
//               </p>
//             </p>
//           </span>
//         </div>
//         <Pivot linkFormat={PivotLinkFormat.tabs}>
//           <PivotItem linkText='User Dashboard' itemIcon='TemporaryUser'>
//             <User />
//           </PivotItem>

//           <PivotItem linkText='QMS' itemIcon='DocumentManagement'>
//             <Qms />
//           </PivotItem>
//           <PivotItem linkText='Approver Dashboard' itemIcon='DocumentApproval'>
//             <Approvers />
//           </PivotItem>
//         </Pivot>
//       </div>
//     )
//   }
// }

// import { sp } from "@pnp/sp"
import { SPFI } from "@pnp/sp";
import { getSp } from "../../../../helpers/PnPConfig";
import "@pnp/sp/items"
import "@pnp/sp/lists"
import "@pnp/sp/webs"
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from "react"
import User from "../User/User"
import Qms from "../QMS/Qms"
import styless from "./navbar.module.scss"
import Approvers from "../Approvers/Approvers"
import { Web } from "@pnp/sp/webs"
import { Pivot, PivotItem, PivotLinkFormat } from "office-ui-fabric-react"
import { getUserDetails } from "../Data/GetSiteList";

export default class header extends React.Component<{}, any> {
  constructor(props) {
    super(props)
    this.state = {
      userArray: [],
      QMS: "false",
      Approvers: "false",
      FileViewer: "false",
      Fileuploader: "false",
      showFirstItem: false, // Define showFirstItem in the state
      showApproverTab: false, // Define showApproverTab in the state
    };
  }

  foo() {}

  public async componentWillMount() {

    const userDetails = await getUserDetails();
    console.log(userDetails);
    const qmsValue = userDetails.length > 0 && userDetails[0].QMS;
    console.log(qmsValue);

    const approverValue = userDetails.length > 0 && userDetails[0].Approver;
    console.log(approverValue);


    
    // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal")
    const sp:SPFI=getSp()
    const currentUser = await sp.web.currentUser()
    console.log(currentUser)


    // let sss = await sp.web.lists
    //   .getByTitle("My Docs")
    //   .items.getById(11)      
    //   .versions()

    //   // .versions.get()

    // console.log(sss)

    const items: any[] = await sp.web.lists.getByTitle("Userdetails").items()
    console.log(items)
 
    let userArray:any = await items.filter(async (i) => {
      const { Username, EmailID, FileViewer, Fileuploader, QMS, Approver } = i;
      if (currentUser.Email === EmailID) {
        userArray.push({
          Username: Username,
          EmailID: EmailID,
          FileViewer: FileViewer,
          Fileuploader: Fileuploader,
          QMS: QMS,
          Approver: Approver,
        });
      } 
      });
    await console.log(userArray)
    // let userArray = await newFunction();

    // try {
    //   const userDetails = await getUserDetails();
    //   console.log(userDetails);
      
    //   const qmsValue = userDetails.length > 0 && userDetails[0].QMS; // Check if QMS column exists and its value
    //   console.log(qmsValue);
      
    //   this.setState({
    //     QMS: qmsValue,
    //     showFirstItem: qmsValue === true ? true : false,
    //   });
    // } catch (error) {
    //   console.error("Error fetching user details:", error);
    // }


    
    await this.setState({
      userArray: userArray,
      QMS: userArray[0].QMS,
      Approvers: userArray[0].Approver,
      FileViewer: userArray[0].FileViewer,
      Fileuploader: userArray[0].Fileuploader,
      showFirstItem: qmsValue === "true", // Convert to boolean
      showApproverTab: approverValue  === "true", // Convert to boolean

    })
    // return userArray;
    await console.log(this.state)
  }

  public render() {
    const {showFirstItem} = this.state; // Access showFirstItem from state
    console.log(showFirstItem);

    const {showApproverTab} = this.state;
    console.log(showApproverTab);


    let val = (
      <img
        src='https://www.tata.com/etc/designs/tata/publish/assets/img/pages/nav/Tata_Logo2.svg'
        width='100px'
        height='100px'
        style={{ padding: "10px" }}
      />
    )

    return (
      <div>
        <div className={styless.header}>
          <span>
            <p
              style={{
                fontSize: "30px",
                padding: "10px",
                color: "white",
              }}
            >
              <img
                src='https://m365x44410739.sharepoint.com/:i:/s/DMSportal/EdrtDoWgy7hMkDf20Q6JJl0BEX97dAa9He_h7v47sMJBZw?e=HCcPL3'
                width='100px'
                height='100px'
                style={{ padding: "10px" }}
              />
              Quadra
              <p
                style={{
                  float: "right",
                  fontSize: "30px",
                  padding: "20px",
                  color: "white",
                }}
              >
                Document Management System
              </p>
            </p>
          </span>
        </div>
        <Pivot linkFormat={PivotLinkFormat.tabs}>
          <PivotItem linkText='User Dashboard' itemIcon='TemporaryUser'>
            <User />
          </PivotItem>

          {showFirstItem && (
  <PivotItem linkText="QMS" itemIcon="DocumentManagement">
    <Qms />
  </PivotItem>
)}

{showApproverTab  && (
          <PivotItem linkText='Approver Dashboard' itemIcon='DocumentApproval'>
            <Approvers />
          </PivotItem>)}
        </Pivot>


      </div>
    )
  }
}