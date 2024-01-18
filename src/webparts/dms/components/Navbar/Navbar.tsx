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

export default class header extends React.Component<{}, any> {
  constructor(props) {
    super(props)
    this.state = {
      userArray: [],
      QMS: "false",
      Approvers: "false",
      FileViewer: "false",
      Fileuploader: "false",
    }
  }

  foo() {}

  public async componentWillMount() {
    // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal")
    const sp:SPFI=getSp()
    const currentUser = await sp.web.currentUser()
    console.log(currentUser)

    let sss = await sp.web.lists
      .getByTitle("My Docs")
      .items.getById(11)      
      .versions()

      // .versions.get()

    console.log(sss)

    const items: any[] = await sp.web.lists.getByTitle("Userdetails").items()
    console.log(items)
 
    let userArray = await items.filter(async (i) => {
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
    await this.setState({
      userArray: userArray,
      QMS: userArray[0].QMS,
      Approvers: userArray[0].Approver,
      FileViewer: userArray[0].FileViewer,
      Fileuploader: userArray[0].Fileuploader,
    })
    // return userArray;
    console.log(this.state)
  }

  public render() {
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

          <PivotItem linkText='QMS' itemIcon='DocumentManagement'>
            <Qms />
          </PivotItem>
          <PivotItem linkText='Approver Dashboard' itemIcon='DocumentApproval'>
            <Approvers />
          </PivotItem>
        </Pivot>
      </div>
    )
  }
}
