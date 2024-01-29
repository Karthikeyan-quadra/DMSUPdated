// import { Web } from "@pnp/sp/webs";
import styles from "../Dms.module.scss";
import { DefaultButton, DetailsList, DetailsListLayoutMode, Dialog, DialogFooter, DialogType,IDialogStyles,IStackTokens,Label,mergeStyles, ProgressIndicator, SelectionMode, Stack, TextField, ThemeSettingName } from "office-ui-fabric-react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import * as React from "react";
import { Dropdown, Table } from "react-bootstrap";
import { ITextFieldStyles } from 'office-ui-fabric-react';
import { getSitelist } from "../Data/GetSiteList";
import { Approvalmail,Denymail, UserApprovalmail } from "../Mailtrigger";

import { TablePagination } from '@material-ui/core';
import Logo  from "../../../../Images/Illustration.png";
import { SPFI } from "@pnp/sp";
import { getSp } from "../../../../helpers/PnPConfig";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";


var date = new Date();


const stackTokens: IStackTokens = { childrenGap: 20 };
const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const dialogContentProps = {
    type: DialogType.normal,
    title: "Reject File",
  };

  const modelProps = {
    isBlocking: false,
  }

  const getStyles: IDialogStyles = {
    main: [{
      selectors: {
        ['@media (min-width: 480px)']: {
          maxWidth: '700px',
          minWidth: '700px',
          maxHeight: '360px',
          minHeight: '150px'
        }
      }
    }],
    root: ""
  }

  const dialogContentPropsLoading = {
    type: DialogType.normal,
    title: "Uploading file",
  };

  let columns = [

    {
      key: 'Document No',
      name: 'Document No',
      isIconOnly: false,
      fieldName: 'Filename',
      minWidth: 230,
      data: 'string',
      maxWidth: 230,
      isResizable:true,
      isCollapsible: true,
      isPadded: true
    },
    {
      key: 'Upload status',
      name: 'Upload status',
      fieldName: 'Status',
      minWidth: 70,
      maxWidth: 70,
      data: 'string',
      isPadded: true, isResizable: true,
      isCollapsible: true,
      isIconOnly: false
    },
    {
      key: 'File Title',
      name: 'File Title',
      fieldName: 'FileTitle',
      minWidth: 100,
      maxWidth: 100,
      data: 'string',
      isPadded: true, isResizable: true,
      isCollapsible: true,
      isIconOnly: false
    },
    {
      key: 'File Upload Date',
      name: 'File Upload Date',
      fieldName: 'FileUploadDate',
      minWidth: 80,
      maxWidth: 80,
      isResizable: true,
      isCollapsible: true,
      data: 'string',
      isIconOnly: false,
      isPadded: true,
    },
    {
      key: 'Requester Name',
      name: 'Requester Name',
      fieldName: 'Requester',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      isCollapsible: true,
      data: 'number',
      isIconOnly: false,
      isPadded: true,
    },
    {
      key: 'Approval',
      name: 'Approval',
      fieldName: 'Status',
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isCollapsible: true,
      data: 'number',
      isIconOnly: false,
      isPadded: true,
    },
    {
      key: 'Deny',
      name: 'Deny',
      fieldName: 'Status',
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isCollapsible: true,
      data: 'number',
      isIconOnly: false,
      isPadded: true,
    },

    {
        key: 'Link',
        name: 'Link',
        fieldName: 'Fileurl',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        isIconOnly: false,
        isPadded: true,
      }
  ];

export default class header extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      overalllist:[],
      rowsPerPage:5,
        page:0,
        CurrentUser:"",
        fileArray: [],
        openDialog: false,
        openDialogUpload: false,
        hiddenDialogUpload: true,
        hiddenDialog: true,
        hiddenDialog1: true,
        CurrentFile: [],
        fileDes: "",
        loading: false,
        error: false,
    };
  }



  // public async componentDidMount() {

  //   // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal");
  //   const sp:SPFI=getSp()

  //   const items: any[] = await sp.web.lists.getByTitle("Approverlist").items();
  //   const filesForApproval: any[] = await sp.web.lists
  //     .getByTitle("User Files")
  //     .items();
  //   console.log(filesForApproval);
  //   let user = await sp.web.currentUser();
  //   console.log(user.Email);
  //   // let userDetails = [];
  //   // let fileArray = [];
  //   // let fileArrayUpdated = [];

  //   let userDetails:any = [];
  //   let fileArray:any = [];
  //   let fileArrayUpdated:any = [];

  //   await filesForApproval.map(async (files) => {
  //     if (files.Approver2 === user.Email && files.ApprovalStatus === "APPROVER 2") {
  //       await userDetails.push(files);
  //     }
  //     if (files.Approver3 === user.Email && files.ApprovalStatus === "APPROVER 3") {
  //       await userDetails.push(files);
  //     }
  //     if (files.Approver4 === user.Email && files.ApprovalStatus === "APPROVER 4") {
  //       await userDetails.push(files);
  //     }
  //   });

  //   await console.log(userDetails);

  //   var uniq = {};
  //   // var arr  = [{"id":"1"},{"id":"1"},{"id":"2"}]
  //   fileArray = userDetails.filter(
  //     (obj) => !uniq[obj.ID] && (uniq[obj.ID] = true)
  //   );

  //   console.log("fileArray", fileArray);

  //   await fileArray.filter(async (files) => {
  //     if (files.Status === "Processing") {
  //       fileArrayUpdated.push(files);
  //     }
  //   });

  //   console.log("fileArrayUpdated", fileArrayUpdated);

  //   this.setState({
  //     value: fileArrayUpdated,
  //     CurrentUser: user.Email
  // },()=>{
  //   this.setState({
  //     count:this.state.value.length,items:this.state.value.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage),
  //     overalllist:this.state.value
  //   })
  // })

  public async componentDidMount() {

  try {
    const sp: SPFI = getSp();
    console.log("Connected to SharePoint");

    const items: any[] = await sp.web.lists.getByTitle("Approverlist").items();
    console.log("Approverlist items:", items);

    const filesForApproval: any[] = await sp.web.lists.getByTitle("User Files").items();
    console.log("User Files items:", filesForApproval);

    let user:any = await sp.web.currentUser();
    console.log("Current user:", user.Email);

    let userDetails: any[] = [];
    let fileArrayUpdated: any[] = [];

    for (const files of filesForApproval) {
      console.log("Processing file:", files);
    
      // Check if the current user's email matches any Approver field
      if (
        (files.Approver2 && files.Approver2.toLowerCase() === user.Email.toLowerCase()) ||
        (files.Approver3 && files.Approver3.toLowerCase() === user.Email.toLowerCase()) ||
        (files.Approver4 && files.Approver4.toLowerCase() === user.Email.toLowerCase())
      ) {
        console.log("Adding file to userDetails:", files);
        userDetails.push(files);
      }
    }
    
    console.log("userDetails:", userDetails);

    this.setState({
      items: userDetails,
      value: userDetails, // Assuming value is another state property you want to update
    });

    var uniq:any = {};
    const fileArray:any = userDetails.filter((obj) => !uniq[obj.ID] && (uniq[obj.ID] = true));

    console.log("fileArray:", fileArray);

    fileArray.forEach((files) => {
      if (files.Status === "Processing") {
        fileArrayUpdated.push(files);
      }
    });

    console.log("fileArrayUpdated:", fileArrayUpdated);

    this.setState(
      {
        value: fileArrayUpdated,
        CurrentUser: user.Email,
        count: fileArrayUpdated.length,
        items: fileArrayUpdated.slice(0, this.state.rowsPerPage),
        overalllist: fileArrayUpdated,
      },
      () => {
        console.log("State updated successfully");
        console.log("this.state.items:", this.state.items);
        console.log("this.state.value:", this.state.value);
      }
    );
  } catch (error) {
    console.error("Error in componentDidMount:", error);
  }
}


  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  public setRowsPerPage=(value)=>{
    this.setState({
      rowsPerPage:value
    })

      }

  public setPage=(value)=>{
    this.setState({
      page:value
    },()=>{
      this.setState({
        items:this.state.value.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
      })
    })
      }

      private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        let val= this.state.overalllist.filter(i => i.FileTitle.toLowerCase().indexOf(text.toLowerCase()) > -1 || i.Status.toLowerCase().indexOf(text.toLowerCase()) > -1)
        let condition=text.toLowerCase() ?val: this.state.overalllist
        this.setState({
          items: text.toLowerCase() ?val.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage) : this.state.overalllist.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage),
        },()=>{
          this.setState({
            count:condition.length,
            value:condition
          })
        });
        console.log(val)
      };

  public render() {
    const Approvemail:any = async (value,ApprovalStatus) => {

      try {
        console.log(value);
      console.log(value.ID);
      console.log(value.RelativeURL)

      this.setState({
        loading: true,
        openDialog: true,
        hiddenDialog1: false,
      })
      let siteUrl  = value.RelativeURL.split("/")
      siteUrl[3] = "Original File";
      console.log(siteUrl);
      // let copy = siteUrl.join("/");
      let copy = siteUrl.join("/");
      console.log(copy)
      console.log(`${value.RelativeURL}${value.Filename}`)
      let ApprovalStatuss = "";
      let ApproverEmail = "";
      let Statuss = "";
      let ApprovedBy = "";
      if(ApprovalStatus ===  "APPROVER 2") {
        ApproverEmail = value.Approver3;
        ApprovedBy = value.Approver2;
        ApprovalStatuss = "APPROVER 3";
        date.setDate(date.getDate() + 3);
        console.log(formatDate(date));
        console.log(date);
        Statuss = "Processing";
        await Approvalmail(
          value,
          ApproverEmail,
          ApprovedBy
        );

      } else if(ApprovalStatus ===  "APPROVER 3") {
        ApproverEmail = value.Approver4;
        ApprovedBy = value.Approver3;
        ApprovalStatuss = "APPROVER 4";
        date.setDate(date.getDate() + 2);
        console.log(formatDate(date));
        console.log(date);
        Statuss = "Processing"
        await Approvalmail(
          value,
          ApproverEmail,
          ApprovedBy
        );

      } else if(ApprovalStatus ===  "APPROVER 4") {
        ApproverEmail = value.RequestorEmail;
        ApprovedBy = value.Approver4;
        ApprovalStatuss = "APPROVER 4";
        Statuss = "Completed"

      const destinationUrl:any = `${copy}`;
        console.log("inside approver 4");
        const sp:SPFI=getSp()
      // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal");

      const buffer :ArrayBuffer = await sp.web.getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`).getBuffer();
      console.log(buffer)
      const blob: Blob = await sp.web.getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`).getBlob();
      console.log(blob)
        console.log(`${destinationUrl}/${value.Filename}`);
      //file upload
      let exists:any = await sp.web.getFileByServerRelativePath(`${destinationUrl}/${value.Filename}`).exists();
      console.log("inside approver 4");

      if (exists === true) {
        const sp:SPFI=getSp()

        const folderPath = `${destinationUrl}/${value.Filename}`;
        
        // Upload the file content to the specified folder
        await sp.web
          .getFolderByServerRelativePath(folderPath)
          .files
          .addChunked(value.Filename, blob, (chunk) => {
            // Called for each chunk
          })
          .then(async (file) => {
            console.log("File Uploaded");
            console.log(`${folderPath}/${value.Filename}`);
            
          let description = "";
          const itemss: any[] = await sp.web.lists.getByTitle("User Files").items.top(1).filter(`Filename eq '${value.Filename}'`)();
        if (itemss.length > 0) {
          console.log(itemss[0]);
          description = itemss[0].Filedescription
         }
        await sp.web.getFileByServerRelativePath(`${destinationUrl}/${value.Filename}`).checkin(description)

        await console.log(`${value.RelativeURL}/${value.Filename}`);
        await sp.web.getFileByServerRelativePath(`${destinationUrl}/${value.Filename}`).checkout();
          await sp.web.getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`).
          recycle().then(function(data){
            console.log(data);
          }).catch((e) => {
            console.log(e);
          });

          console.log(`${destinationUrl}/${value.Filename}`);
          // let fileurl:any = "";
          // await sp.web
          // .getFolderByServerRelativePath(`${destinationUrl}`) // Here comes a folder/subfolder path
          // .files
          // .expand('Files/ListItemAllFields,DocID') // For Metadata extraction
          // .select()              // Fields to retrieve
          // .getAll().then(async (item) => {
          //   console.log(item);
          //   await item.filter((file) => {
          //     // console.log(file);
          //     if(file.Name === value.Filename) {
          //       fileurl = file.LinkingUri;
          //     }
          //   })
          // });

          let fileurl: any = "";

// Declare folderPath here
const folderPathForLinkingUri:any = `${destinationUrl}`;
const folderForLinkingUri:any = sp.web.getFolderByServerRelativePath(folderPathForLinkingUri);

await folderForLinkingUri
  .files
  .expand('Files/ListItemAllFields,DocID') // For Metadata extraction
  .select() // Fields to retrieve
  .get()
  .then(async (files) => {
    await files.filter((file) => {
      if (file.Name === value.Filename) {
        fileurl = file.LinkingUri;
      }
    });
  });


        const items: any[] = await sp.web.lists.getByTitle("User Files").items.top(1).filter(`Filename eq '${value.Filename}'`)();
          console.log(items);
          if (items.length > 0) {
            await sp.web.lists.getByTitle("User Files").items.getById(items[0].Id).update({
           Fileurl: fileurl,
         }).then(i => {
           console.log(i);
         });
           }
        })
      } else {

        //new file
        // await sp.web
        // .getFolderByServerRelativePath(
        //   destinationUrl
        // )
        // .files.add(`${value.Filename}`, blob, true)
        // .then(async (f) => {
        //   console.log("File Uploaded");
        //   console.log(`${destinationUrl}/${value.Filename}`);
        //   await sp.web.getFileByServerRelativePath(`${destinationUrl}/${value.Filename}`).checkout();
        //   await sp.web.getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`).
        //       recycle().then(function(data){
        //         console.log(data);
        //       }).catch((e) => {
        //         console.log(e);
        //       });




        

        //new file
                const sp:SPFI=getSp()
        const fileRelativePath:any= `${destinationUrl}/${value.Filename}`;
        // const fileExists:any = await sp.web.getFileByServerRelativePath(fileRelativePath).exists();
        const fileExists:any = await sp.web.getFileByServerRelativePath(`${destinationUrl}/${value.Filename}`).exists();


        await fileExists.files.add(`${value.Filename}`, blob, true)
        .then(async (f) => {
          console.log("File Uploaded");
          console.log(`${destinationUrl}/${value.Filename}`);
          await sp.web.getFileByServerRelativePath(`${destinationUrl}/${value.Filename}`).checkout();
          await sp.web.getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`).
              recycle().then(function(data){
                console.log(data);
              }).catch((e) => {
                console.log(e);
              });
        

                console.log(`${destinationUrl}/${value.Filename}`);
        //         let fileurl:any = "";
        //       await sp.web
        // .getFolderByServerRelativePath(`${destinationUrl}`) // Here comes a folder/subfolder path
        // .files
        // .expand('Files/ListItemAllFields,DocID') // For Metadata extraction
        // .select()              // Fields to retrieve
        // .getAll().then(async (item) => {
        //    console.log(item);
        //    await item.filter((file) => {
        //       if(file.Name === value.Filename) {
        //         fileurl = file.LinkingUri;
        //       }
        //    })
        // });

        let fileurl: any = "";
        const folder:any = sp.web.getFolderByServerRelativePath(destinationUrl);
        
        await folder.files
          .expand('Files/ListItemAllFields,DocID')
          .select()
          .getAll()
          .then(async (item) => {
            console.log(item);
            await item.filter((file) => {
              if (file.Name === value.Filename) {
                fileurl = file.LinkingUri;
              }
            });
          });





        const items: any[] = await sp.web.lists.getByTitle("User Files").items.top(1).filter(`Filename eq '${value.Filename}'`)();
          console.log(items);
          if (items.length > 0) {
            await sp.web.lists.getByTitle("User Files").items.getById(items[0].Id).update({
           Fileurl: fileurl,
         }).then(i => {
           console.log(i);
         });
           }

        })
      }

      await UserApprovalmail(
        value
      );
      }
      //    update item in an sp list
      // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal");
      const sp:SPFI=getSp()

      await sp.web.lists
        .getByTitle("User Files")
        .items.getById(value.ID)
        .update({
          ApprovalStatus: ApprovalStatuss,
          Status: Statuss,
          Remainder: Statuss === "Completed" ?  "" : formatDate(date),
        })
        .then(async () => {
          // let RefreshData = this.state.overalllist;
          // let LastDate = [];
          let RefreshData:any = this.state.overalllist;
          let LastDate:any = [];
      console.log("overalllist",this.state.overalllist)
          await RefreshData.filter((files) => {
            if (files.ID !== value.ID) {
              LastDate.push(files);
            }
          });
          console.log("LastDate",LastDate);
          await this.setState({
            value: LastDate,
            overalllist: LastDate,
            items:LastDate,
            openDialog: false,
            hiddenDialog: true,
          });
        });

      await this.setState({
        loading: false,
      })
      } catch(e) {

          await this.setState({
            loading: false,
            error: true,
          })
      }
    };

    const handleChangePage = (event, newPage) => {
      this.setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
      console.log(event.target.value)
      this.setRowsPerPage(parseInt(event.target.value, 10));
      this.setPage(0);
    };

    const _renderItemColumn=(item, index: number, column)=> {


      const fieldContent = item[column.fieldName ] as string;
      //  console.log(item)
      switch (column.key) {

        case "Upload status":
          switch (fieldContent) {
            case "Pending":

          return (

            <span
              data-selection-disabled={true}

              className={mergeStyles({
                color: "#4f6bed",
                height: "100%",
                display: "block",
                fontWeight: "bold",
              })}
            >
              {fieldContent}
            </span>
          );
          case "Processing":
          return (

            <span
              data-selection-disabled={true}

              className={mergeStyles({
                color: "#ef6950",
                height: "100%",
                display: "block",
                fontWeight: "bold",
              })}
            >
              {fieldContent}
            </span>
          );

          case "Completed":

          return (

            <span
              data-selection-disabled={true}

              className={mergeStyles({
                color: "#498205",
                height: "100%",
                display: "block",
                fontWeight: "bold",
              })}

            >
              {fieldContent}
            </span>
          );
          case 'Rejected':

          return (

            <span
              data-selection-disabled={true}
              className={mergeStyles({
                color: "#a4262c",
                height: "100%",
                display: "block",
                fontWeight: "bold",
              })}>
              {fieldContent}
            </span>
          );

        default:
          return <span>{fieldContent}</span>;
      }
      case 'Link':
        return(
          <PrimaryButton
          style={{
            backgroundColor: "#0078D4",
          }}
          text='View'
          target="_blank"
          href={fieldContent} />

        )
        case 'Approval':
          switch (fieldContent) {
            case 'Processing':
            return(
              <PrimaryButton
                      style={{
                        backgroundColor: "#0078D4",
                      }}
                      text="Approve"
                      target="_blank"
                      onClick={() => Approvemail(item,item.ApprovalStatus)}
                    />
            )

            default:
          return ;

            }
            case 'Deny':
              switch (fieldContent) {
                case 'Processing':

                return(
                  <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  text="Reject"
                  target="_blank"
                  onClick={() => RejectFunc(item)}
                />
                )

                default:
          return ;
                }

      default:
          return <span>{fieldContent}</span>;
    }

    }

//     const RejectFunc = async (fileDetails)  => {
//       this.setState({
//           openDialog: true,
//           hiddenDialog: false,
//           CurrentFile: fileDetails
//         });
// }

const RejectFunc = async (fileDetails) => {
  try {
    // Display dialog for rejection comments
    this.setState({
      openDialog: true,
      hiddenDialog: false,
      CurrentFile: fileDetails,
    });
  } catch (error) {
    console.error("Error displaying rejection dialog:", error);
    alert("An error occurred. Please check the console for more details.");
  }
}


    const Rejectmail = async (value) => {
      console.log(value);
      console.log(value.ID);

      if(this.state.fileDes.length === 0) {
        alert("Please enter the rejection comments.");
      } else {
        await Denymail(
          value.RequestorEmail,
          value,
          this.state.fileDes
        );

        // let web = Web("https://m365x44410739.sharepoint.com/sites/DMSportal");
        const sp:SPFI=getSp()
        await sp.web.lists
          .getByTitle("User Files")
          .items.getById(value.ID)
          .update({
            Status: "Rejected",
          })
          .then(async () => {
            let RefreshData = this.state.fileArray;
            // let LastDate = [];
            let LastDate:any = [];

            await RefreshData.filter((files) => {
              if (files.ID !== value.ID) {
                LastDate.push(files);
              }
            });
            await this.setState({
              fileArray: LastDate,
              value: LastDate,
              overalllist: LastDate,
              items:LastDate,
              openDialog: false,
            hiddenDialog: true,
            });
          });
        await alert("File has been rejected");
      }


    };

    const changeValueFileDescription = async(e) => {
      console.log(e.target.value);
      await this.setState({
          fileDes: e.target.value,
      })
    }

    const closeHideDialog = () => {
      this.setState({
        openDialog: false,
        hiddenDialog: true,
      });
    };

    const closeHideDialog1 = () => {
      this.setState({
        openDialog: false,
        hiddenDialog1: true,
      });
    };
    return (
      <div className={styles.QmsDashboard}>
        <Dialog
          hidden={this.state.hiddenDialog}
          dialogContentProps={dialogContentProps}
          isBlocking={false}
      >
          <TextField
            label="Reason"
            defaultValue={this.state.fileDes}
            multiline
            rows={3}
            onChange={changeValueFileDescription}
          />
          <DialogFooter>
              <PrimaryButton style={{ backgroundColor: "#0078D4" }} onClick={() =>Rejectmail(this.state.CurrentFile)} text="Reject" />
              <DefaultButton onClick={closeHideDialog} text="Cancel" />
          </DialogFooter>
      </Dialog>
      <Dialog
          hidden={this.state.hiddenDialog1}
          dialogContentProps={dialogContentPropsLoading}
          modalProps={modelProps}
          styles={getStyles}
      >
          {
            this.state.loading === true ?
            <div style={{
              // borderStyle: 'dashed',
              marginTop: '20px'
            }}>
              <ProgressIndicator label="File is uploading" description="It will take some time." />
            </div>
            :

              this.state.error === true ? <div>
              <Label
                style={{
                  margin: "0 auto",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                File not found, please upload again.
              </Label>

              <DialogFooter>
                <DefaultButton onClick={closeHideDialog1} text="Close" />
              </DialogFooter>
            </div> : <div>
              <svg
                width="537"
                style={{ margin: "auto 20px", width: "600px" }}
                height="201"
                viewBox="0 0 537 201"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  x="0.4375"
                  y="0.664062"
                  width="536"
                  height="200"
                  fill="url(#pattern0)"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_6782_329527"
                      transform="translate(0.313433) scale(0.000932836 0.0025)"
                    />
                  </pattern>
                  <image
                    id="image0_6782_329527"
                    width="400"
                    height="400"
                  />
                </defs>
              </svg>
              <Label
                style={{
                  margin: "0 auto",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                File has been approved.
              </Label>

              <DialogFooter>
                <DefaultButton onClick={closeHideDialog1} text="Close" />
              </DialogFooter>
            </div>
            }
      </Dialog>
        <Stack horizontal
        tokens={stackTokens}>
            <TextField underlined
             placeholder="Search"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />

        </Stack>
        <DetailsList
        className={styles.list}
        items={this.state.items}
        compact={false}
        columns={columns}
        onRenderItemColumn={_renderItemColumn}
        selectionMode={SelectionMode.none}
        getKey={this._getKey}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
      />
            {(this.state.overalllist.length === 0)?
            <div style={{
              padding: "70px 0",
              margin: "auto",
              textAlign: "center",
            }}>
              <img style={{
              display: "block",
  margin: "auto",
  padding: "40px",
  width: "40%",
              }} src={Logo}/>
<b style={{fontWeight: "bold"}}>No Pending Request Available</b>
            </div>
      :<div>
      </div>
      }
<TablePagination
rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={this.state.count}
      page={this.state.page}
      onPageChange={handleChangePage}
      rowsPerPage={this.state.rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      </div>
    );


  }
}