import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import {Web, IWeb } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import { ISharingResult, SharingRole } from "@pnp/sp/sharing";
import Logo from "../../../../../Images/Illustration.png";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import { render } from "react-dom";
import {
  getEditSitelist,
  getName,
  Get_departmentusers,
} from "../../Data/GetSiteList";
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  Dropdown,
  FontIcon,
  IDocumentCardPreviewProps,
  IStackTokens,
  Label,
  mergeStyles,
  Modal,
  Persona,
  PersonaSize,
  PrimaryButton,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";

import { TablePagination } from "@material-ui/core";
import { useEffect, useState } from "react";

// import { getSp } from "../../../../../helpers/PnPConfig"
// import { SPFI } from "@pnp/sp";

const stackTokens: IStackTokens = { childrenGap: 20 };
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};
const dialogContentProps = {
  type: DialogType.normal,
  title: "Edit flow",
};
const iconClass = mergeStyles({
  fontSize: 150,
  width: "100%",
  padding: "50px",
  color: "green",
  textAlign: "center",
});
// const sp:SPFI=getSp();
let columns = [
  {
    key: "Document No",
    name: "Document No",
    isIconOnly: false,
    fieldName: "Filename",
    minWidth: 150,
    data: "string",
    maxWidth: 150,
    isResizable: false,
    isCollapsible: false,
    isPadded: true,
  },

  {
    key: "File Title",
    name: "File Title",
    fieldName: "FileTitle",
    minWidth: 100,
    maxWidth: 100,
    data: "string",
    isPadded: true,
    isResizable: false,
    isCollapsible: false,
    isIconOnly: false,
  },
  {
    key: "FileUploadDate",
    name: "FileUploadDate",
    fieldName: "FileUploadDate",
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    isCollapsible: false,
    data: "string",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Requester Name",
    name: "Requester Name",
    fieldName: "Requester",
    minWidth: 130,
    maxWidth: 130,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Department",
    name: "Department",
    fieldName: "Department",
    minWidth: 100,
    maxWidth: 100,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Approval Status",
    name: "Approval Status",
    fieldName: "ApprovalStatus",
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    isCollapsible: false,
    data: "string",
    isIconOnly: false,
    isPadded: true,
  },

  {
    key: "Manage",
    name: "Manage",
    fieldName: "Fileurl",
    minWidth: 50,
    maxWidth: 50,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
];

// export default class QmsDashboard extends React.Component<{}, any> {
  export default function QmsDashboard(props){
  
 
    // this.state = {
    //   items: [],
    //   hideDialog: true,
    //   opendialog: false,
    //   Selecteditem: "",
    //   uploadfile: false,
    //   rowsPerPage: 5,
    //   page: 0,
    //   hideeditDialog: true,
    //   isEdited: true,
    //   Selected_item: {},
    //   overalllist: [],
    //   Approver_list: [],
    //   err_Approvermsg: "",
    //   err_Reviewermsg: "",
    //   Reviewer_name: "",
    //   Approver_name: "",
    // };
    //this.sendApproval= this.sendApproval.bind(this);

    const [items, setItems] = useState([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [opendialog, setOpenDialog] = useState(false); 
  const [selectedItem, setSelectedItem] = useState<any>("");
  const [uploadfile, setUploadFile] = useState(false); 
  const [page, setpage] = useState(0);
  const [hideeditDialog, setHideEditDialog] = useState(true); 
  const [isEdited, setIsEdited] = useState(true);
  const [Selected_item, setSelected_item] = useState<any>({}); 
  const [overalllist, setOverallList] = useState([]);
  const [Approver_list, setApproverList] = useState([]);
  const [err_Approvermsg, setErrApproverMsg] = useState(""); 
  const [err_Reviewermsg, setErrReviewerMsg] = useState(""); 
  const [Reviewer_name, setReviewerName] = useState(""); 
  const [Approver_name, setApproverName] = useState("");
  const [value, setValue] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);


  

  // public async componentDidMount() {
  //   const sp:SPFI=getSp();
  //   console.log(await sp.web.currentUser());
  //   console.log(await (await sp.web.currentUser()).Email);
  //   this.setState(
  //     {
  //       //items:await getEditSitelist(),
  //       value: await getEditSitelist(),
  //     },
  //     () => {
  //       this.setState({
  //         count: this.state.value.length,
  //         items: this.state.value.slice(
  //           this.state.page * this.state.rowsPerPage,
  //           this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
  //         ),
  //         overalllist: this.state.value,
  //       });
  //     }
  //   );

  //   console.log(this.state.items);
  // }

  const fetchData = async () => {
    const sp:SPFI=getSp();
    const currentUser = await sp.web.currentUser();
    console.log(currentUser);
    console.log(await currentUser.Email);
    const sitelist:any = await getEditSitelist();
    
    setValue(sitelist);
    setCount(sitelist.length);
    setItems(sitelist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    setOverallList(sitelist);
  }

  useEffect(()=>{
    fetchData()
  },[page, rowsPerPage])



  // private _getKey(item: any, index?: number): string {
  //   return item.key;
  // }

  function _getKey(item: any, index?: number): string {
    return item.key;
}


  // private _onFilter = (
  //   ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   text: string
  // ): void => {
  //   let val = this.state.overalllist.filter(
  //     (i) =>
  //       i.FileTitle.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  //       i.Status.toLowerCase().indexOf(text.toLowerCase()) > -1
  //   );
  //   let condition = text.toLowerCase() ? val : this.state.overalllist;
  //   this.setState(
  //     {
  //       items: text.toLowerCase()
  //         ? val.slice(
  //             this.state.page * this.state.rowsPerPage,
  //             this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
  //           )
  //         : this.state.overalllist.slice(
  //             this.state.page * this.state.rowsPerPage,
  //             this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
  //           ),
  //     },
  //     () => {
  //       this.setState({
  //         count: condition.length,
  //         value: condition,
  //       });
  //     }
  //   );
  //   console.log(val);
  // };


  const _onFilter = (ev, text) => {
    let val:any = overalllist.filter(
      (i:any) =>
        i.FileTitle.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        i.Status.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    let condition = text.toLowerCase() ? val : overalllist;
    setItems(
      text.toLowerCase()
        ? val.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : overalllist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
    setCount(condition.length);
    setValue(condition);
    console.log(val);
  };

  // public updated = async (isupdated) => {
  //   if (isupdated) {
  //     this.setState(
  //       {
  //         value: await getEditSitelist(),
  //       },
  //       () => {
  //         this.setState({
  //           count: this.state.value.length,
  //           items: this.state.value.slice(
  //             this.state.page * this.state.rowsPerPage,
  //             this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
  //           ),
  //           overalllist: this.state.value,
  //         });
  //       }
  //     );
  //   }
  // };

  const updated = async (isupdated) => {
    if (isupdated) {
      const updatedValue:any = await getEditSitelist();
      setValue(updatedValue);
      setCount(updatedValue.length);
      setItems(updatedValue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      setOverallList(updatedValue);
    }
  };

  // public toggleHideDialog = () => {
  //   this.setState((prevstate) => {
  //     hideDialog: prevstate.hideDialog ? false : true;
  //   });
  //   console.log(this.state.hideDialog);
  // };



  const toggleHideDialog = () => {
    setHideDialog(prevHideDialog => !prevHideDialog);
    console.log(hideDialog); // This will log the previous state, not the updated state due to the asynchronous nature of state updates with useState
  };
  

  // public setRowsPerPage = (value) => {
  //   this.setState({
  //     rowsPerPage: value,
  //   });
  // };



  const setRowsPerPage = (value)=>{
  setrowsPerPage(value);
  }

  // public setPage = (value) => {
  //   this.setState(
  //     {
  //       page: value,
  //     },
  //     () => {
  //       this.setState({
  //         items: this.state.value.slice(
  //           this.state.page * this.state.rowsPerPage,
  //           this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
  //         ),
  //       });
  //     }
  //   );
  // };


  const setPage = (value) => {
    setPage(value);
    setItems(value => value.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ));
  };




  // public toggleeditHideDialog = () => {
  //   console.log(this.state.hideeditDialog);
  //   if (this.state.hideeditDialog)
  //     this.setState({
  //       hideeditDialog: false,
  //     });
  //   else
  //     this.setState({
  //       hideeditDialog: true,
  //       isEdited: true,
  //       Selected_item: {},
  //       err_Approvermsg: "",
  //       err_Reviewermsg: "",
  //       Reviewer_name: "",
  //       Approver_name: "",
  //     });
  // };


  const toggleeditHideDialog = () => {
    console.log(hideeditDialog);
    if (hideeditDialog) {
      setHideEditDialog(false);
    } else {
      setHideEditDialog(true);
      setIsEdited(true);
      setSelected_item({});
      setErrApproverMsg("");
      setErrReviewerMsg("");
      setReviewerName("");
      setApproverName("");
    }
  };


  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      console.log(event.target.value);
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // const SubmitFlow = async () => {
    //   const sp:SPFI=getSp();
    //   if (Selected_item.Approver2 != "") {
    //     if (Selected_item.Approver3 != "") {
    //       const sp:SPFI=getSp();
    //       await sp.web.lists
    //         .getByTitle("User Files")
    //         .items.getById(Selected_item.ID)
    //         .update({
    //           Approver2: Selected_item.Approver2,
    //           Approver3: Selected_item.Approver3,
    //         })
    //         .then(async (res) =>
    //           this.setState(
    //             {
    //               isEdited: false,
    //               value: await getEditSitelist(),
    //             },
    //             () => {
    //               this.setState({
    //                 count: value.length,
    //                 items: value.slice(
    //                   page * rowsPerPage,
    //                   page * rowsPerPage +
    //                     rowsPerPage
    //                 ),
    //                 overalllist: value,
    //               });
    //             }
    //           )
    //         );
    //     } else {
    //       // this.setState({
    //       //   err_Reviewermsg: "Please specify Reviewer",
    //       // });
    //       setErrReviewerMsg("Please specify Reviewer");
    //     }
    //   } else {
    //     // this.setState({
    //     //   err_Approvermsg: "Please specify Approver",
    //     // });
    //     setErrApproverMsg("Please specify Approver")
    //   }
    // };

    const SubmitFlow = async () => {
      const sp:SPFI=getSp();
            if (Selected_item.Approver2 !== "") {
        if (Selected_item.Approver3 !== "") {
          try {
            await sp.web.lists.getByTitle("User Files").items.getById(Selected_item.ID).update({
              Approver2: Selected_item.Approver2,
              Approver3: Selected_item.Approver3
            });
            setIsEdited(false);
            setValue(await getEditSitelist());
            setCount(value.length);
            setItems(value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
            setOverallList(value);
          } catch (error) {
            console.error("Error updating item:", error);
          }
        } else {
          setErrReviewerMsg("Please specify Reviewer");
        }
      } else {
        setErrApproverMsg("Please specify Approver");
      }
    };


    // const editFlow = async (value) => {
    //   console.log(value);
    //   this.setState(
    //     {
    //       hideeditDialog: false,
    //       isEdited: true,
    //       Selected_item: value,
    //     },
    //     async () => {
    //       this.setState({
    //         Approver_list: await Get_departmentusers(value.Department).then(
    //           (res) =>{
    //             console.log(res); 
    //             return res.map((val) => ({
    //               text: val.Name,
    //               key: val.EmailID,
    //             }))}
    //         ),
    //         Reviewer_name: await getName(
    //           Selected_item.Approver2
    //         ).then((res) => { 
    //           console.log(res);
    //           return res[0].Name
    //         }),

    //         Approver_name: await getName(
    //           Selected_item.Approver3
    //         ).then((res) =>{ 
    //           console.log(res);
    //           return res[0].Name}),
    //       });
    //     }
    //   );
    // };


    const editFlow = async (value) => {

      
      console.log(value);
      setHideEditDialog(false);
      setIsEdited(true);
      setSelected_item(value);
      const sp:SPFI=getSp();

      const approverListResult:any = await Get_departmentusers(value.Department);
      console.log(approverListResult);
      const mappedApproverList:any = approverListResult.map((val:any) => ({
        text: val.Name,
        key: val.EmailID,
      }));
      console.log(mappedApproverList);
      setApproverList(mappedApproverList);
  
      const reviewerNameResult:any = await getName(value.Approver2);
      console.log(reviewerNameResult);
      setReviewerName(reviewerNameResult[0].Name);
  
      const approverNameResult:any = await getName(value.Approver3);
      console.log(approverNameResult);
      setApproverName(approverNameResult[0].Name);
    };
  






    const previewOutlookUsingIcon: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewIconProps: {
            iconName: "TextDocument",
            styles: { root: { fontSize: 42, color: "#0078d7" } },
          },
          previewIconContainerClass: "ms-DocumentCardPreview-iconContainer2",
          width: 144,
        },
      ],
    };
    // const ReviewerChange = (event, value) => {
    //   this.setState((prevstate) => ({
    //     Selected_item: { ...prevstate.Selected_item, Approver2: value.key },
    //   }));
    // };

     const ReviewerChange = (event, value) => {
      setSelected_item(prevState => ({
      ...prevState,
      Approver2: value.key
    }));
  }
    // const ApproverChange = (event, value) => {
    //   this.setState((prevstate) => ({
    //     Selected_item: { ...prevstate.Selected_item, Approver3: value.key },
    //   }));
    // };

    const ApproverChange = (event, value) => {
      setSelected_item(prevState => ({
        ...prevState,
        Approver3: value.key
      }));
    };

    const _renderItemColumn = (item, index: number, column) => {
      const fieldContent = item[column.fieldName] as string;

      switch (column.key) {
        case "Manage":
          return (
            <FontIcon
              aria-label="AccountManagement"
              iconName="AccountManagement"
              className={styles.manage}
              style={{ color: "#0078d4" }}
              onClick={() => editFlow(item)}
            />
          );

        default:
          return fieldContent.length <= 150 ? (
            <span>{fieldContent}</span>
          ) : (
            <span>{fieldContent.slice(0, 150)}...</span>
          );
      }
    };
    return (
      <div className={styles.QmsDashboard}>
        <Stack horizontal className={styles.filter} tokens={stackTokens}>
          <TextField
            underlined
            placeholder="Search"
            onChange={_onFilter}
            styles={textFieldStyles}
          />
        </Stack>
        <DetailsList
          className={styles.list}
          items={items}
          compact={false}
          columns={columns}
          onRenderItemColumn={_renderItemColumn}
          selectionMode={SelectionMode.none}
          getKey={_getKey}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
        {overalllist.length == 0 ? (
          <div
            style={{
              // borderStyle:'dashed',
              padding: "70px 0",
              // height: "200px",
              margin: "auto",
              // width: "300px",
              textAlign: "center",
            }}
          >
            <img
              style={{
                // borderStyle:'dashed',
                display: "block",
                margin: "auto",
                padding: "40px",
                width: "40%",
                // height: ""
              }}
              src={Logo}
            />
            <b style={{ fontWeight: "bold" }}>No Pending Request Available</b>
          </div>
        ) : (
          <div></div>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.flowSectionDialog
          }
          hidden={hideeditDialog}
          dialogContentProps={dialogContentProps}
          isBlocking={false}
          onDismiss={toggleeditHideDialog}
        >
          {isEdited ? (
            <div>
              <div style={{ margin: "15px" }}>
                <table>
                  <tr>
                    <td>
                      <Label style={{ color: "darkgrey" }}>
                        Document Number
                      </Label>
                      <Label style={{ fontSize: "18px" }}>
                        {Selected_item.Filename}
                      </Label>
                    </td>
                    <td style={{ width: "200px" }}>
                      <Label style={{ color: "darkgrey" }}>
                        Document Title
                      </Label>
                      <Label style={{ fontSize: "18px" }}>
                        {Selected_item.FileTitle}
                      </Label>
                    </td>
                    <td>
                      <DocumentCard
                        type={DocumentCardType.compact}
                        onClickHref={Selected_item.Fileurl}
                        onClickTarget="_blank"
                      >
                        <DocumentCardPreview {...previewOutlookUsingIcon} />
                        <div className="ms-DocumentCard-details">
                          <DocumentCardTitle
                            title={Selected_item.Filename}
                            shouldTruncate={true}
                          />
                          <DocumentCardActivity
                            activity={
                              "Uploaded Date:" +
                              Selected_item.FileUploadDate
                            }
                            people={[
                              {
                                name: Selected_item.Requester,
                                profileImageSrc: "",
                                initials: Selected_item.Requester,
                              },
                            ]}
                          />
                        </div>
                      </DocumentCard>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "40px" }}>
                      <Persona
                        text={Selected_item.Requester}
                        secondaryText={Selected_item.RequestorEmail}
                        size={PersonaSize.size56}
                        imageAlt={Selected_item.Requester}
                      />
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      <Label style={{ color: "darkgrey" }}>Department</Label>
                      <Label style={{ fontSize: "18px" }}>
                        {Selected_item.Department}
                      </Label>
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      <Label style={{ color: "darkgrey" }}>Section</Label>
                      <Label style={{ fontSize: "18px" }}>
                        {Selected_item.SubDepartment}
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "40px" }}>
                      <div style={{ width: "300px" }}>
                        <Dropdown
                          placeholder={Reviewer_name}
                          label="Document Reviewer"
                          required
                          onChange={ReviewerChange}
                          errorMessage={err_Reviewermsg}
                          options={Approver_list}
                        />
                      </div>
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      <Label style={{ color: "darkgrey" }}>
                        Approval Status
                      </Label>
                      <Label style={{ fontSize: "18px" }}>
                        {Selected_item.ApprovalStatus}
                      </Label>
                    </td>
                    <td style={{ paddingTop: "40px" }}>
                      <div style={{ width: "300px" }}>
                        <Dropdown
                          placeholder={Approver_name}
                          label="Document Approver"
                          required
                          onChange={ApproverChange}
                          errorMessage={err_Approvermsg}
                          options={Approver_list}
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <DialogFooter>
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={SubmitFlow}
                  text="Submit"
                />
                <DefaultButton
                  onClick={toggleeditHideDialog}
                  text="Cancel"
                />
              </DialogFooter>
            </div>
          ) : (
            <div>
              <FontIcon
                aria-label="SkypeCircleCheck"
                iconName="SkypeCircleCheck"
                className={iconClass}
              />
              <Label
                style={{
                  margin: "0 auto",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                Document flow Altered Successfully
              </Label>

              <DialogFooter>
                <DefaultButton
                  onClick={toggleeditHideDialog}
                  text="Close"
                />
              </DialogFooter>
            </div>
          )}
        </Dialog>
      </div>
    );
  
}
