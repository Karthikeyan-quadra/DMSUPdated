import * as React from "react";
import { Web } from "@pnp/sp/presets/all";

import "@pnp/sp/items/get-all";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import "@pnp/sp/webs";
import "@pnp/sp/sharing";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/web";
import "@pnp/sp/folders";
import "@pnp/sp/batching";
import "@pnp/sp/presets/all";

import { folderFromServerRelativePath } from "@pnp/sp/folders";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import ReactTable from "react-table";
// import Navbar from './Navbar/Navbar';
import { ISharingResult, SharingRole, SharingLinkKind } from "@pnp/sp/sharing";
import { Button, Table } from "react-bootstrap";
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  IDialogStyles,
  IStackTokens,
  ITextFieldStyles,
  mergeStyles,
  ProgressIndicator,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TablePagination } from "@material-ui/core";
import { getSitelist } from "../Data/GetSiteList";
import styles from "../User/DmsWebPart.module.scss";
import Logo from "../../../../Images/Illustration.png";

import { getSp } from "../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";

// import styles from "../DmsWebPart.module.scss";
// import styles1 from '../DmsWebPart.module.scss';
var date = new Date();

const options: IDropdownOption[] = [
  { key: "Old Files", text: "Old Files" },
  { key: "New Files", text: "New Files" },
];

const modelProps = {
  isBlocking: false,
};

// const dialogStyles = { main: { maxWidth: 1200 } };

const stackTokens: IStackTokens = { childrenGap: 20 };
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};

const getStyles: IDialogStyles = {
  main: [
    {
      selectors: {
        ["@media (min-width: 480px)"]: {
          maxWidth: "900px",
          minWidth: "800px",
          minHeight: "670px",
          maxHeight: "670px",
        },
      },
    },
  ],
  root: "",
};

// const getStyles: IDialogStyles = {
//   main: [{
//     selectors: {
//       ['@media (min-width: 480px)']: {
//         maxWidth: '700px',
//         minWidth: '700px',
//         minHeight: '150px !important',
//         maxHeight: 700
//       }
//     }
//   }],
//   root: ""
// }

// const styles = {
//   QmsDashboard: 'QmsDashboard_d428dd15',
//   filter: 'filter_d428dd15',
//   list: 'list_d428dd15',
//   Popup: 'Popup_d428dd15',
//   textDialog: 'textDialog_d428dd15',
//   normalDialog: 'normalDialog_d428dd15'
// };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};

const dialogContentProps = {
  type: DialogType.normal,
  title: "Download Template",
};
const dialogContentPropsUpload = {
  type: DialogType.normal,
  title: "Upload File",
};

const options1: IDropdownOption[] = [
  { key: "Manual", text: "Manual" },
  { key: "Policy", text: "Policy" },
  { key: "SOP", text: "SOP" },
  { key: "Work Instruction", text: "Work Instruction"},
  { key: "MSOP", text: "MSOP" },
  { key: "Form", text: "Form" },
];

const choose: IDropdownOption[] = [];

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  // console.log(datum);
  return datum / 1000;
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

let columns = [
  {
    key: "Document No",
    name: "Document No",
    isIconOnly: false,
    fieldName: "Filename",
    minWidth: 170,
    data: "string",
    maxWidth: 170,
    isResizable: true,
    isCollapsible: true,
    isPadded: true,
  },
  {
    key: "Upload status",
    name: "Upload status",
    fieldName: "Status",
    minWidth: 100,
    maxWidth: 100,
    data: "string",
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    isIconOnly: false,
  },
  {
    key: "File Title",
    name: "File Title",
    fieldName: "FileTitle",
    minWidth: 110,
    maxWidth: 110,
    data: "string",
    isPadded: true,
    isResizable: true,
    isCollapsible: true,
    isIconOnly: false,
  },
  {
    key: "File Upload Date",
    name: "File Upload Date",
    fieldName: "FileUploadDate",
    minWidth: 70,
    maxWidth: 70,
    isResizable: true,
    isCollapsible: true,
    data: "string",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Approval Status",
    name: "Approval Status",
    fieldName: "ApprovalStatus",
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
    isCollapsible: true,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Requester Name",
    name: "Requester Name",
    fieldName: "Requester",
    minWidth: 120,
    maxWidth: 120,
    isResizable: true,
    isCollapsible: true,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Link",
    name: "Link",
    fieldName: "Fileurl",
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
    isCollapsible: true,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
];

export default class header extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.filesave = this.filesave.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      openDialog: false,
      openDialogUpload: false,
      fileIDs: "",
      hiddenDialogUpload: true,
      hiddenDialog: true,
      downloadUrl: "",
      filenames: "",
      fileDes: "",
      fileArray: [],
      departmentName: [],
      Documetntype: "",
      documentType: [],
      ProjectName: [],
      searchValue: "",
      SubdepartmentsMain: [],
      Filess: [],
      SubdepartmentsMain1: [],
      SubdepartmentsMain2: [],
      choose: false,
      Subdepartments: [],
      SubfolderState: false,
      SubfolderState1: false,
      SubfoldersMainParent: [],
      SubfoldersParent: [],
      fileUrl: "",
      valueFileType: "Old Files",
      textToCopy: "",
      DocID: "",
      fileNameStruct: "",
      params1: "",
      params11: "",
      Uploading: false,
      DownloadURI: true,
      params22: "",
      params2: "",
      params3: "",
      params4: "",
      params5: "",
      some: [],
      CurrentUser: "",
      filenames1: "",
      rowsPerPage: 5,
      page: 0,
      overalllist: [],
      items: [],
      fileess:[],
    };
  }

  public async componentDidMount() {
    const sp:SPFI=getSp();
    // let ssss = [];
    let user = await sp.web.currentUser();
    console.log("109");
    console.log(user.Email);
    // let sss1 = await web.lists
    //   .getByTitle("User Files")
    //   .items()
    //   console.log(sss1);
    // const max = sss1.reduce(function(prev, current) {

    // // var ts = new Date("2022-04-06T09:21:13Z");
    // // console.log(ts);

    //   return (toTimestamp(prev.y) > toTimestamp(current.y)) ? prev : current
    // })
    // console.log("max",max);
    let sss:any = await sp.web.lists
      .getByTitle("User Files")
      .items.select(
        "File,Filetype,Filename,FileTitle,Filedescription,FileUploadDate,ApprovalStatus,Fileurl,Status,Requester"
      )
      .expand("File")
      .getAll()
      .then(
        async (sss) => {
          console.log("sss", sss);
          var y = [...sss].reverse();
          // await console.log("reversed",y);
          // await this.setState({
          this.setState(
            {
              //items:await getSitelist(),
              value: y,
            },
            () => {
              this.setState({
                count: this.state.value.length,
                items: this.state.value.slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
                ),
                overalllist: this.state.value,
              });
            }
          );
        }
        // })
      );
    const items: any[] = await sp.web.lists.getByTitle("Project List").items();
    console.log(items.length);
    this.setState({
      DocID: items.length,
    });

    // let DepartmentNames = [];
    // let DocumentType = [];
    // let ProjectName = [];
    // let SubDepartments = [];
    // let SubdepartmentsParents = [];
    // let SubDepartments1 = [];
    // let SubdepartmentsMain = [];
    // let SubdepartmentsMain1 = [];
    // let SubdepartmentsMainParents = [];

    let DepartmentNames:any = [];
    let DocumentType:any = [];
    let ProjectName:any = [];
    let SubDepartments:any = [];
    let SubdepartmentsParents:any = [];
    let SubDepartments1:any = [];
    let SubdepartmentsMain:any = [];
    let SubdepartmentsMain1:any = [];
    let SubdepartmentsMainParents:any = [];


    await sp.web.lists
      .getByTitle("Project List")
      .items.select("ProjectName,ProjectID")
      .getAll()
      .then(async (item) => {
        item.map(async (nn) => {
          await ProjectName.push({ Key: nn.ProjectName, text: nn.ProjectID });
        });
      });

    await sp.web.lists
      .getByTitle("Department Names")
      .items.select("Departments,Code")
      .getAll()
      .then(async (item) => {
        console.log(item);
        item.map(async (nn) => {
          await DepartmentNames.push({
            Key: nn.Code,
            text: nn.Departments,
          });
        });
      });
    // console.log(DepartmentNames);
    await sp.web.lists
      .getByTitle("Document Type")
      .items.select("Documents,Code")
      .getAll()
      .then(async (item) => {
        item.map(async (nn) => {
          await DocumentType.push({ Key: nn.Code, text: nn.Documents });
        });
      });
    // // console.log(DocumentType);
    await sp.web.lists
      .getByTitle("Sub departments")
      .items.select("Subfolders,ParentFolder")
      .getAll()
      .then(async (item) => {
        item.map(async (nn) => {
          // console.log(nn)
          // console.log(nn.ParentFolder)
          // await SubDepartments.push({"text":nn.Subfolders,"Key":nn.Subfolders});
          await SubDepartments1.push({
            SubFolders: nn.Subfolders,
            ParentFolders: nn.ParentFolder,
          });0
          await SubdepartmentsParents.push(nn.ParentFolder);
        });

        // await console.log(SubdepartmentsParents)
        let uniqueArray = SubdepartmentsParents.filter(function (
          item,
          pos,
          self
        ) {
          return self.indexOf(item) == pos;
        });
        // await console.log(uniqueArray)

        this.setState({
          SubfoldersParent: uniqueArray,
        });
      });
    // console.log(SubDepartments);
    await sp.web.lists
      .getByTitle("Sub departments Main")
      .items.select("SubFolders,ParentFolders,Code")
      .getAll()
      .then(async (item) => {
        item.map(async (nn) => {
          // await SubdepartmentsMain.push({"text":nn.SubFolders,"Key":nn.SubFolders});
          await SubdepartmentsMain1.push({
            SubFolders: nn.SubFolders,
            ParentFolders: nn.ParentFolders,
            Code: nn.Code,
          });

          // console.log()
          //   SubfoldersMainParent: Pare
          // })
          await SubdepartmentsMainParents.push(nn.ParentFolders);
          // await this.setState({
        });
        // await console.log(SubdepartmentsMainParents)
        let uniqueArray = SubdepartmentsMainParents.filter(function (
          item,
          pos,
          self
        ) {
          return self.indexOf(item) == pos;
        });

        this.setState({
          SubfoldersMainParent: uniqueArray,
        });
      });

    this.setState({
      departmentName: DepartmentNames,
      documentType: DocumentType,
      SubdepartmentsMain: SubdepartmentsMain,
      SubdepartmentsMain2: SubdepartmentsMain1,
      Subdepartments: SubDepartments,
      Subdepartments2: SubDepartments1,
      ProjectName: ProjectName,
      CurrentUser: user.Email,
    });

    console.log(this.state);

    console.log(this.state.items);
  }

  //end componentDIdmount

  private _onFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
    text: string
  ): void => {
    // console.log(event.target.value);
    // this.setState({
    //   searchValue: event.target.value
    // })
    let val = this.state.overalllist.filter(
      (i) =>
        i.FileTitle.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        i.Status.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    console.log(val);
    let condition = text.toLowerCase() ? val : this.state.overalllist;
    this.setState(
      {
        items: text.toLowerCase()
          ? val.slice(
              this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
            )
          : this.state.overalllist.slice(
              this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
            ),
      },
      () => {
        this.setState({
          count: condition.length,
          value: condition,
        });
      }
    );
    console.log(val);
  };

  // private _onFilters = (): void => {
  //   console.log("button pressed");
  //   console.log(this.state.searchValue);
  //   console.log(this.state.overalllist);
  //   console.log(this.state.overalllist[0].FileTitle.toLowerCase());
  //   let val= this.state.overalllist.filter(i => {
  //                           i.FileTitle.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1
  //                           || i.Status.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) > -1
  //   })
  //   console.log(val);
  //   let condition=this.state.searchValue.toLowerCase() ?val: this.state.overalllist
  //   this.setState({
  //     items: this.state.searchValue.toLowerCase() ?val.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage) : this.state.overalllist.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage),
  //   },()=>{
  //     this.setState({
  //       count:condition.length,
  //       value:condition
  //     })
  //   });
  //   console.log(val)
  // };

  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  public setRowsPerPage = (value) => {
    this.setState({
      rowsPerPage: value,
    });
  };

  public setPage = (value) => {
    this.setState(
      {
        page: value,
      },
      () => {
        this.setState({
          items: this.state.value.slice(
            this.state.page * this.state.rowsPerPage,
            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
          ),
        });
      }
    );
  };

  // approverslist
  public render() {
    // var sss = [];
    var sss:any = [];


    const toggleHideDialog = () => {
      this.setState({
        openDialog: true,
        hiddenDialog: false,
        DownloadURI: true,
      });
      console.log(this.state);
    };

    const toggleHideDialogUpload = () => {
      this.setState({
        openDialogUpload: true,
        hiddenDialogUpload: false,
      });
      // console.log(this.state.openDialog)
    };
    // valueFileType
    const changeValueFileType = async (e, value: any) => {
      this.setState({
        valueFileType: value.text,
        SubfolderState: false,
        SubfolderState1: false,
        fileDes: "",
        filenames: "",
        fileUrl: "",
        params1: "",
        params2: "",
        params3: "",
        params4: "",
        params5: "",
        params22: "",
        params11: "",
        Filess: [],
        fileNameStruct: "",
      });

      console.log(this.state);
      console.log(this.context);
    };

    //original code
    // const changeValuedepartmentName = async (e, value: any) => {
    //   console.log(value);
    //   this.setState({
    //     params1: "",
    //     params3: "",
    //     params4: "",
    //     params5: "",
    //   });
    //   console.log(this.state.SubdepartmentsMain);
    //   console.log(this.state.Subdepartments);
    //   await sss.push(value.text);
    //   if (this.state.SubfoldersMainParent.includes(value.text)) {
    //     // let array1 = [];
    //     let array1:any = [];
    //     console.log(this.state.SubdepartmentsMain2);
    //     await this.state.SubdepartmentsMain2.filter((names) => {
    //       console.log(names.ParentFolders)
    //       console.log(names)
    //       if (names.ParentFolders === value.text) {
    //         console.log(names.SubFolders);
    //         array1.push({
    //           text: names.SubFolders,
    //           Key: names.SubFolders,
    //           Code: names.Code,
    //         });
    //       }
    //     });
    //     await console.log(array1);
    //     await this.setState({
    //       SubfolderState: true,
    //       SubdepartmentsMain: array1,
    //       // params1: value.text,
    //       params111: value.Key,
    //       params11: value.text,
    //       some: [value.text],
    //     });
    //   } else {
    //     this.setState({
    //       SubfolderState: false,
    //       // params1: value.Key,
    //       params111: value.Key,
    //       params11: value.text,
    //     });
    //   }

    //   await console.log(this.state.some)
    // };


    const changeValuedepartmentName = async (e, value: any) => {
      console.log("changeValuedepartmentName function called.");
      console.log("Selected department value:", value);
    
      try {
        const sp: SPFI = getSp();
        this.setState({
          params1: "",
          params3: "",
          params4: "",
          params5: "",
        });
    
        const selectedDepartment = value.text;
        console.log("Selected department:", selectedDepartment);
    
        // Check if the selected department has subfolders
        if (this.state.SubfoldersMainParent.includes(selectedDepartment)) {
          console.log("Selected department has subfolders.");
    
          const subfolders = this.state.SubdepartmentsMain2
            .filter((subfolder) => subfolder.ParentFolders === selectedDepartment)
            .map((subfolder) => ({
              text: subfolder.SubFolders,
              Key: subfolder.SubFolders,
              Code: subfolder.Code,
            }));
    
          console.log("SubdepartmentsMain array:", subfolders);
    
          this.setState({
            SubfolderState: true,
            SubdepartmentsMain: subfolders,
            params111: value.Key,
            params11: selectedDepartment,
            some: [selectedDepartment],
          });
        } else {
          console.log("Selected department does not have subfolders.");
    
          this.setState({
            SubfolderState: false,
            params111: value.Key,
            params11: selectedDepartment,
          });
        }
    
        console.log("Updated state:", this.state);
      } catch (error) {
        console.error("Error in changeValuedepartmentName:", error);
      }
    };
    
    
    

    // const changeValuedepartmentName = (e, value) => {
    //   console.log(value);
    //   const sp: SPFI = getSp();
    //   this.setState({
    //     params1: "",
    //     params3: "",
    //     params4: "",
    //     params5: "",
    //   });
    
    //   const sssCopy = [...this.state.sss]; // Assuming sss is an array in your state
    //   sssCopy.push(value.text);
    
    //   if (this.state.SubfoldersMainParent.includes(value.text)) {
    //     const array1 = this.state.SubdepartmentsMain2
    //       .filter((names) => names.ParentFolders === value.text)
    //       .map((names) => ({
    //         text: names.SubFolders,
    //         Key: names.SubFolders,
    //         Code: names.Code,
    //       }));
    
    //     console.log(array1);
    
    //     this.setState({
    //       SubfolderState: true,
    //       SubdepartmentsMain: array1,
    //       params111: value.Key,
    //       params11: value.text,
    //       some: [value.text],
    //     });
    //   } else {
    //     this.setState({
    //       SubfolderState: false,
    //       params111: value.Key,
    //       params11: value.text,
    //     });
    //   }
    //   console.log(this.state.departmentName);
    //   // Update the state with the modified sssCopy array
    //   this.setState({ sss: sssCopy });
    // };
    

    const changeValuedocumentType = async (e, value: any) => {
      console.log(value);
      this.setState({
        params2: value.Key,
        params22: value.text,
      });
    };

    const changeValueProjectName = async (e, value: any) => {
      // console.log(value);
      this.setState({
        params5: value.text,
      });
    };

    const changeValueSubdepartmentsMain = async (e, value: any) => {
      console.log(value);
      // Subfolders ,ParentFolder

      if (this.state.SubfoldersParent.includes(value.text)) {
        // let array1 = [];
        let array1:any = [];

        console.log(this.state.Subdepartments2);

        await this.state.Subdepartments2.filter((names) => {
          // console.log(names.ParentFolders)
          // console.log(names)
          if (names.ParentFolders === value.text) {
            console.log(names.SubFolders);
            array1.push({ text: names.SubFolders, Key: names.SubFolders });
          }
        });
        console.log(array1);
        console.log(value.text);
        console.log(value);
        this.setState({
          SubfolderState1: true,
          Subdepartments: array1,
          params1: value.Code,
          params3: value.text,
        });
      } else {
        this.setState({
          SubfolderState1: false,
          params1: value.Code,
          params3: value.text,
        });
      }

      // await console.log(this.state.some)
    };

    const changeValueSubdepartments = async (e, value: any) => {
      // console.log(value);
      if (this.state.SubfolderState1 === true) {
        await sss.push(...sss, value.text);
      }
      this.setState({
        params4: value.text,
        some: [value.text],
      });
    };

    const changeSalectFilename = async (e, value: any) => {
      console.log(value);
      let testFile = value.text.split(".")[0];

      this.setState({
        fileNameStruct: testFile,
      });
    };

    const changeValueFilename = async (e, value: any) => {
      // console.log(value);
      this.setState({
        filenames: value,
      });
    };

    const changeValueFileDescription = async (e, value: any) => {
      // console.log(value);
      this.setState({
        fileDes: value,
      });
    };

    const downloadFile = async () => {
      //download xl file
      const sp:SPFI=getSp()

      console.log(this.state.downloadUrl);
      console.log(this.state.downloadUrl.split("/")[4]);
      let fileName = this.state.downloadUrl.split("/")[4];

      try {
        await sp.web
          .getFileByServerRelativePath(this.state.downloadUrl)
          .getBuffer()
          .then((buffer: ArrayBuffer) => {
            const blob = new Blob([buffer]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${fileName}`;
            link.click();
            choose.length = 0;
          });

        this.setState({
          openDialog: false,
          hiddenDialog: true,
          downloadUrl: "",
          choose: false,
          DownloadURI: true,
        });
      } catch (e) {
        alert("Something went wrong, Try again later !");
      }
    };


//ORIGINAL CODE
    // const clickGenerate = async () => {
    //   console.log(this.state);
    //   // let somee = [];
    //   // let somee1 = [];
    //   // let somee2 = [];
    //   let somee:any = [];
    //   let somee1:any = [];
    //   let somee2:any = [];


    //   if (this.state.params111.length <= 0) {
    //     alert("Please add Department Name before generating ID!");
    //   } else if (this.state.params2.length <= 0) {
    //     alert("Please add Document Name before generating ID!");
    //   } else if (this.state.params5.length <= 0) {
    //     alert("Please add Project Name before generating ID!");
    //   } else if (
    //     this.state.SubfolderState === true &&
    //     this.state.params3.length <= 0
    //   ) {
    //     alert("Please add Sub Folders Main before generating ID!");
    //   } else if (
    //     this.state.SubfolderState1 === true &&
    //     this.state.params4.length <= 0
    //   ) {
    //     alert("Please add Sub Folders before generating ID!");
    //   } else {
    //     // COMMON-TEPL-EHS-SOP-002.xlsx
    //     // TEPL-COMMON-QL-QM-PR-0002.xlsx
    //     if (this.state.params5.length > 0) {
    //       console.log(this.state.params5);
    //       await somee1.push("TEPL");
    //       // await somee2.push("TEPL");
    //       await somee1.push(this.state.params5);
    //       // await somee2.push(this.state.params5);
    //     }
    //     if (this.state.params111.length > 0) {
    //       console.log(this.state.params1);
    //       await somee.push(this.state.params111);
    //       await somee1.push(this.state.params111);
    //       if (this.state.params1.length > 0) {
    //         await somee1.push(this.state.params1);
    //       }
    //       await somee2.push(this.state.params11);
    //     }
    //     if (this.state.params3.length > 0) {
    //       console.log(this.state.params3);
    //       await somee.push(this.state.params3);
    //       await somee2.push(this.state.params3);
    //       // await somee1.push(this.state.params3);
    //     }
    //     if (this.state.params4.length > 0) {
    //       console.log(this.state.params4);
    //       await somee.push(this.state.params4);
    //       await somee2.push(this.state.params4);
    //       // await somee1.push(this.state.params4);
    //     }

    //     if (this.state.params2.length > 0) {
    //       console.log(this.state.params2);
    //       await somee.push(this.state.params2);
    //       await somee1.push(this.state.params2);
    //       await somee2.push(this.state.params22);
    //     }

    //     console.log(somee);
    //     console.log(somee.join("/"));
    //     console.log(somee1.join("-"));
    //     console.log(somee2.join("/"));
    //     // let lastDigit = "";
    //     let lastDigit:any = "";
    //     let params6;
    //     // let digitArray = [];
    //     let digitArray:any = [];

    //     // console.log(
    //     //   `/sites/DMSportal/Shared Documents/${somee2.join("/")}`
    //     // );
    //     console.log(
    //       `/sites/DMS-TATA/Shared%20Documents1/${somee2.join("/")}`
    //     );
    //     // const sp:SPFI=getSp();
    //     // let somss:any = await sp.web
    //     //   .getFolderByServerRelativePath(
    //     //     `/sites/DMSportal/Original File/${somee2.join("/")}`)
    //     //   .files.getAll()

    //     const sp:SPFI=getSp();
    //     // let folderPath:any = `/sites/DMSportal/Original File/${somee2.join("/")}`;
    //     // let folderPath:any = `/sites/DMS-TATA/Original%20File/${somee2.join("/")}`;

    //     // let folder:any = await sp.web.getFolderByServerRelativePath(folderPath).files;

    //     // let somss:any = await folder.getAll().then(async (s) => {


    //     let folderPath:any = `/sites/DMS-TATA/Original%20File/${somee2.join("/")}`;
    //     let folder:any = await sp.web.getFolderByServerRelativePath(folderPath);
    //     let somss:any = await folder.files.getAll().then(async (s) => {

    //         console.log(s)
    //         if (s.length > 0) {
    //           console.log(s);
    //           s.map((ss) => {
    //             let last = ss.Name.split("-").pop();
    //             console.log(last);
    //             let splitFileEx = last.split(".")[0];
    //             digitArray.push(splitFileEx);
    //             // console.log(Number(splitFileEx) + 1);
    //           });

    //           let sortNumebrs = await digitArray.sort();

    //           let last = await sortNumebrs[sortNumebrs.length - 1];

    //           let returnNumber = String(Number(last) + 1);
    //           console.log(returnNumber);
    //           if (returnNumber.length === 1) {
    //             console.log("00" + returnNumber);
    //             lastDigit = "000" + returnNumber;
    //             // return "00" + returnNumber;
    //           } else if (returnNumber.length === 2) {
    //             console.log("0" + returnNumber);
    //             lastDigit = "00" + returnNumber;
    //             return "0" + last;
    //           } else if (returnNumber.length === 3) {
    //             console.log(returnNumber);
    //             lastDigit = "0" + returnNumber;
    //             // return last;
    //           } else if (returnNumber.length === 4) {
    //             console.log(returnNumber);
    //             lastDigit = returnNumber;
    //             // return last;
    //           }
    //         } else {
    //           lastDigit = "0001";
    //         }

    //         // console.log();
    //       });

    //     await somee1.push(lastDigit);

    //     console.log(lastDigit);
    //     console.log(somee1);
    //     this.setState({
    //       fileUrl: somee2.join("/"),
    //       fileNameStruct: somee1.join("-"),
    //     });

    //     console.log(this.state);
    //   }
    // };


  //  const clickGenerate = async () => {
  //     console.log(this.state);
  //     // let somee = [];
  //     // let somee1 = [];
  //     // let somee2 = [];
  //     let somee:any = [];
  //     let somee1:any = [];
  //     let somee2:any = [];


  //     if (this.state.params111.length <= 0) {
  //       alert("Please add Department Name before generating ID!");
  //     } else if (this.state.params2.length <= 0) {
  //       alert("Please add Document Name before generating ID!");
  //     } else if (this.state.params5.length <= 0) {
  //       alert("Please add Project Name before generating ID!");
  //     } else if (
  //       this.state.SubfolderState === true &&
  //       this.state.params3.length <= 0
  //     ) {
  //       alert("Please add Sub Folders Main before generating ID!");
  //     } else if (
  //       this.state.SubfolderState1 === true &&
  //       this.state.params4.length <= 0
  //     ) {
  //       alert("Please add Sub Folders before generating ID!");
  //     } else {
  //       // COMMON-TEPL-EHS-SOP-002.xlsx
  //       // TEPL-COMMON-QL-QM-PR-0002.xlsx
  //       if (this.state.params5.length > 0) {
  //         console.log(this.state.params5);
  //         await somee1.push("TEPL");
  //         // await somee2.push("TEPL");
  //         await somee1.push(this.state.params5);
  //         // await somee2.push(this.state.params5);
  //       }
  //       if (this.state.params111.length > 0) {
  //         console.log(this.state.params1);
  //         await somee.push(this.state.params111);
  //         await somee1.push(this.state.params111);
  //         if (this.state.params1.length > 0) {
  //           await somee1.push(this.state.params1);
  //         }
  //         await somee2.push(this.state.params11);
  //       }
  //       if (this.state.params3.length > 0) {
  //         console.log(this.state.params3);
  //         await somee.push(this.state.params3);
  //         await somee2.push(this.state.params3);
  //         // await somee1.push(this.state.params3);
  //       }
  //       if (this.state.params4.length > 0) {
  //         console.log(this.state.params4);
  //         await somee.push(this.state.params4);
  //         await somee2.push(this.state.params4);
  //         // await somee1.push(this.state.params4);
  //       }

  //       if (this.state.params2.length > 0) {
  //         console.log(this.state.params2);
  //         await somee.push(this.state.params2);
  //         await somee1.push(this.state.params2);
  //         await somee2.push(this.state.params22);
  //       }

  //       console.log(somee);
  //       console.log(somee.join("/"));
  //       console.log(somee1.join("-"));
  //       console.log(somee2.join("/"));
  //       // let lastDigit = "";
  //       let lastDigit:any = "";
  //       let params6;
  //       // let digitArray = [];
  //       let digitArray:any = [];

  //       // console.log(
  //       //   `/sites/DMSportal/Shared Documents/${somee2.join("/")}`
  //       // );
  //       console.log(
  //         `/sites/DMS-TATA/Shared Documents1/${somee2.join("/")}`
  //       );
  //       // const sp:SPFI=getSp();
  //       // let somss:any = await sp.web
  //       //   .getFolderByServerRelativePath(
  //       //     `/sites/DMSportal/Original File/${somee2.join("/")}`)
  //       //   .files.getAll()
  //       // const sp:SPFI=getSp();
  //       // let folderPath:any = `/sites/DMS-TATA/Original File/${somee2.join("/")}`;
  //       // let folder:any = await sp.web.getFolderByServerRelativePath(folderPath);
  //       // console.log(folder);
  //       // // Use getItemsByCAMLQuery to get all items (files) in the folder
  //       // let somss: any = await folder.files.getAll();
  //       // console.log(folder)
  //       // // Process files
  //       // somss.forEach(async (file: any) => {
  //       //   let last = file.Name.split("-").pop();
  //       //   console.log(last);
        
  //       //   let splitFileEx: any = last.split(".")[0];
  //       //   digitArray.push(splitFileEx);
  //       // });
        


  //       const sp: SPFI = getSp();
  //       let folderPath: string = `/sites/DMS-TATA/Original File/${somee2.join("/")}`;
        
  //       const list = sp.web.lists.getByTitle("Documents"); // Replace "Documents" with your actual document library name
        
  //       // Fetch items from the folder using the CAML query
  //       const items = await list.items.select("FileLeafRef").filter(`FileDirRef eq '${folderPath}'`).getAll();
        
  //       // Process files
  //       items.forEach((item: any) => {
  //         let last = item.FileLeafRef.split("-").pop();
  //         console.log(last);
        
  //         let splitFileEx: any = last.split(".")[0];
  //         digitArray.push(splitFileEx);
  //       });
        
        

        
        
  //       // Calculate lastDigit and update state
  //       if (digitArray.length > 0) {
  //         let sortNumbers = digitArray.sort();
  //         let last = sortNumbers[sortNumbers.length - 1];
  //         let returnNumber = String(Number(last) + 1);
        
  //         if (returnNumber.length === 1) {
  //           lastDigit = "000" + returnNumber;
  //         } else if (returnNumber.length === 2) {
  //           lastDigit = "00" + returnNumber;
  //         } else if (returnNumber.length === 3) {
  //           lastDigit = "0" + returnNumber;
  //         } else if (returnNumber.length === 4) {
  //           lastDigit = returnNumber;
  //         }
  //       } else {
  //         lastDigit = "0001";
  //       }
        
  //       somee1.push(lastDigit);
  //       console.log(lastDigit);
  //       console.log(somee1);
        
  //       this.setState({
  //         fileUrl: somee2.join("/"),
  //         fileNameStruct: somee1.join("-"),
  //       });
        
  //       console.log(this.state);
  //     }
  //   };


    //This code works
  // const clickGenerate = async () => {
  //   // Clear arrays and other relevant state variables
  //   let somee:any = [];
  //   let somee1:any = [];
  //   let somee2:any = [];
  //   let lastDigit:any = "";
  //   let digitArray:any = [];
  
  //   if (this.state.params111.length <= 0) {
  //     alert("Please add Department Name before generating ID!");
  //   } else if (this.state.params2.length <= 0) {
  //     alert("Please add Document Name before generating ID!");
  //   } else if (this.state.params5.length <= 0) {
  //     alert("Please add Project Name before generating ID!");
  //   } else if (this.state.SubfolderState === true && this.state.params3.length <= 0) {
  //     alert("Please add Sub Folders Main before generating ID!");
  //   } else if (this.state.SubfolderState1 === true && this.state.params4.length <= 0) {
  //     alert("Please add Sub Folders before generating ID!");
  //   } else {
  //     if (this.state.params5.length > 0) {
  //       await somee1.push("TEPL");
  //       await somee1.push(this.state.params5);
  //     }
  //     if (this.state.params111.length > 0) {
  //       await somee.push(this.state.params111);
  //       await somee1.push(this.state.params111);
  //       if (this.state.params1.length > 0) {
  //         await somee1.push(this.state.params1);
  //       }
  //       await somee2.push(this.state.params11);
  //     }
  //     if (this.state.params3.length > 0) {
  //       await somee.push(this.state.params3);
  //       await somee2.push(this.state.params3);
  //     }
  //     if (this.state.params4.length > 0) {
  //       await somee.push(this.state.params4);
  //       await somee2.push(this.state.params4);
  //     }
  //     if (this.state.params2.length > 0) {
  //       await somee.push(this.state.params2);
  //       await somee1.push(this.state.params2);
  //       await somee2.push(this.state.params22);
  //     }
  
  //     console.log(somee);
  //     console.log(somee.join("/"));
  //     console.log(somee1.join("-"));
  //     console.log(somee2.join("/"));
  
  //     const sp: SPFI = getSp();
  //     let folderPath: string = `/sites/DMS-TATA/Original File/${somee2.join("/")}`;
  
  //     const list = sp.web.lists.getByTitle("Documents");
  //     const items = await list.items.select("FileLeafRef").filter(`FileDirRef eq '${folderPath}'`).getAll();
  
  //     items.forEach((item: any) => {
  //       let last = item.FileLeafRef.split("-").pop();
  //       console.log(last);
  //       let splitFileEx: any = last.split(".")[0];
  //       digitArray.push(splitFileEx);
  //       console
  //     });
  
  //     if (digitArray.length > 0) {
  //       let sortNumbers = digitArray.sort();
  //       let last = sortNumbers[sortNumbers.length - 1];
  //       let returnNumber = String(Number(last) + 1);
  
  //       if (returnNumber.length === 1) {
  //         lastDigit = "000" + returnNumber;
  //       } else if (returnNumber.length === 2) {
  //         lastDigit = "00" + returnNumber;
  //       } else if (returnNumber.length === 3) {
  //         lastDigit = "0" + returnNumber;
  //       } else if (returnNumber.length === 4) {
  //         lastDigit = returnNumber;
  //       }
  //     } else {
  //       lastDigit = "0001";
  //     }
  
  //     somee1.push(lastDigit);
  //     console.log(lastDigit);
  //     console.log(somee1);
  
  //     this.setState({
  //       fileUrl: somee2.join("/"),
  //       fileNameStruct: somee1.join("-"),
  //     });
  
  //     console.log(this.state);
  //   }
  // };
  


  const clickGenerate = async () => {
    // Clear arrays and other relevant state variables
    let somee:any = [];
    let somee1:any = [];
    let somee2:any = [];
    let lastDigit:any = "";
    let digitArray:any = [];
  
    if (this.state.params111.length <= 0) {
      alert("Please add Department Name before generating ID!");
    } else if (this.state.params2.length <= 0) {
      alert("Please add Document Name before generating ID!");
    } else if (this.state.params5.length <= 0) {
      alert("Please add Project Name before generating ID!");
    } else if (this.state.SubfolderState === true && this.state.params3.length <= 0) {
      alert("Please add Sub Folders Main before generating ID!");
    } else if (this.state.SubfolderState1 === true && this.state.params4.length <= 0) {
      alert("Please add Sub Folders before generating ID!");
    } else {
      if (this.state.params5.length > 0) {
        await somee1.push("TEPL");
        await somee1.push(this.state.params5);
      }
      if (this.state.params111.length > 0) {
        await somee.push(this.state.params111);
        await somee1.push(this.state.params111);
        if (this.state.params1.length > 0) {
          await somee1.push(this.state.params1);
        }
        await somee2.push(this.state.params11);
      }
      if (this.state.params3.length > 0) {
        await somee.push(this.state.params3);
        await somee2.push(this.state.params3);
      }
      if (this.state.params4.length > 0) {
        await somee.push(this.state.params4);
        await somee2.push(this.state.params4);
      }
      if (this.state.params2.length > 0) {
        await somee.push(this.state.params2);
        await somee1.push(this.state.params2);
        await somee2.push(this.state.params22);
      }
  
      console.log(somee);
      console.log(somee.join("/"));
      console.log(somee1.join("-"));
      console.log(somee2.join("/"));
  
      const sp: SPFI = getSp();
      // let folderPath: string = `/sites/DMS-TATA/Original File/${somee2.join("/")}`;
            // let folderPath: string = `/sites/DMS-TATA/Original File/${somee2.join("/")}`;
            let folderPath: string = `/sites/DMS-Quadra/Original File/${somee2.join("/")}`;


  
      const list = sp.web.lists.getByTitle("Original File");
      try {
          const items = await list.items.select('Id,Title,FileRef,FileLeafRef,FileDirRef').filter(`FileDirRef eq '${folderPath}'`).getAll();
          console.log("Fetched items:", items);

    
          if (items.length > 0) {
            console.log('HI')
            items.forEach((item: any) => {
              console.log(item)
              if (item && item.FileLeafRef) {
                console.log("FileLeafRef:", item.FileLeafRef); // Log the full FileLeafRef
          
                // Extract digits using a regular expression
                let extractedDigits = item.FileLeafRef.match(/\d+/g);
          
                if (extractedDigits) {
                  console.log("Extracted Digits:", extractedDigits);
                  digitArray.push(...extractedDigits); // Use spread operator to push individual digits
                } else {
                  console.log("No valid digits found in FileLeafRef:", item.FileLeafRef);
                }
              }
            });
          }


}

 catch (error) {
          console.error("Error fetching items:", error);
      }
      
  
      if (digitArray.length > 0) {
        let sortNumbers = digitArray.map(Number).sort((a, b) => a - b);
        let last = sortNumbers[sortNumbers.length - 1];
        let returnNumber: string = (last + 1).toString().padStart(4, '0');
  
        if (returnNumber.length === 1) {
          lastDigit = "000" + returnNumber;
        } else if (returnNumber.length === 2) {
          lastDigit = "00" + returnNumber;
        } else if (returnNumber.length === 3) {
          lastDigit = "0" + returnNumber;
        } else if (returnNumber.length === 4) {
          lastDigit = returnNumber;
        }
      } else {
        lastDigit = "0001";
      }

      console.log("Digit Array:", digitArray);

      somee1.push(lastDigit);
      console.log(lastDigit);
      console.log(somee1);
  
      this.setState({
        fileUrl: somee2.join("/"),
        fileNameStruct: somee1.join("-"),
      });
  
      console.log(this.state);
    }
  };
  




    const changeValueFileID = async (e, value: any) => {
      // console.log(value);
      this.setState({
        fileNameStruct: this.state.fileNameStruct,
      });
    };

    const clickGenerate1 = async () => {
      console.log(this.state);
      // let somee = [];
      // let somee1 = [];
      let somee:any = [];
      let somee1:any = [];
      console.log(this.state.params4);
      if (this.state.params111.length <= 0) {
        alert("Please add Department Name before generating ID!");
      } else if (this.state.params2.length <= 0) {
        alert("Please add Document Name before generating ID!");
      }
      // else if(this.state.params5.length <= 0) {
      //   alert("Please add Project Name before generating ID!")
      // }
      else if (
        this.state.SubfolderState === true &&
        this.state.params3.length <= 0
      ) {
        alert("Please add Sub Folders Main before generating ID!");
      } else if (
        this.state.SubfolderState1 === true &&
        this.state.params4.length <= 0
      ) {
        alert("Please add Sub Folders before generating ID!");
      }

      if (this.state.params111.length > 0) {
        console.log(this.state.params1);
        // await somee.push(this.state.params1);
        await somee.push(this.state.params11);
      }
      if (this.state.params3.length > 0) {
        console.log(this.state.params3);
        await somee.push(this.state.params3);
        // await somee1.push(this.state.params3);
      }
      if (this.state.params4.length > 0) {
        console.log(this.state.params4);
        await somee.push(this.state.params4);
      }

      if (this.state.params2.length > 0) {
        console.log(this.state.params2);
        await somee.push(this.state.params22);
      }

      console.log(somee);
      console.log(somee.join("/"));
      let fileUrl:any = somee.join("/");
      // console.log(`/sites/DMSportal/Shared Documents/${fileUrl}`);

      // console.log(`/sites/DMS-TATA/Shared Documents1/${fileUrl}`);
      console.log(`/sites/DMS-Quadra/Shared Documents1/${fileUrl}`);
      console.log(`${fileUrl}`);
      
      


      const sp:SPFI=getSp()
      // let filesName = [];
      let filesName:any = [];

//       const folder:any = sp.web.getFolderByServerRelativePath(
//   `/sites/DMSportal/Original File/${fileUrl}`
// );

// const folder:any = sp.web.getFolderByServerRelativePath(
//   `/sites/DMS-TATA/Original File/${fileUrl}`
// );

// const folder:any = sp.web.getFolderByServerRelativePath(
//   `/sites/DMS-Quadra/Original File/${fileUrl}`
// );

const folder:any = sp.web.getFolderByServerRelativePath(
  `/sites/DMS-Quadra/Original File${fileUrl}`
);



const items:any = await folder.files.expand("Files/ListItemAllFields,DocID").select().getAll();

console.log(items);

if (items.length > 0) {
  items.forEach((file) => {
    filesName.push({ key: file.Name, text: file.Name });
  });
} else {
  alert("There is no file inside this folder, please create a new file!");
}

this.setState({
  fileUrl: somee.join("/"),
  Filess: filesName,
});


      this.setState({
        fileUrl: somee.join("/"),
        Filess: filesName,
      });
    };

    const changeValue = async (e, value: any) => {
      // console.log(value.text);
      // { key: 'Work Instruction', text: 'Work Instruction' },
      // { key: 'MSOP', text: 'MSOP' },
      // { key: 'Forms', text: 'Forms' },
      choose.length = 0;
      if (value.text === "Work Instruction") {
        console.log("entyered in WI");
        this.setState({
          choose: true,
          Documetntype: value.text,
        });

        let array = [
          { key: "Work Instruction", text: "Assy Eng" },
          { key: "Work Instruction", text: "CNC Shop Floor" },
          { key: "Work Instruction", text: "Metrology Lab" },
          { key: "Work Instruction", text: "Common" },
          { key: "MSOP", text: "Common MSOP" },
          { key: "MSOP", text: "Cosmetic Visual Inspection" },
          { key: "Form", text: "Excel Form" },
          { key: "Form", text: "Word Form" },
        ];

        array.map((i) => {
          if (i.key === value.text) {
            choose.push(i);
          }
        });
      } else if (value.text === "MSOP") {
        console.log("entyered in MSOP");

        this.setState({
          choose: true,
          Documetntype: value.text,
        });

        let array = [
          { key: "Work Instruction", text: "Assy Eng" },
          { key: "Work Instruction", text: "CNC Shop Floor" },
          { key: "Work Instruction", text: "Metrology Lab" },
          { key: "Work Instruction", text: "Common" },
          { key: "MSOP", text: "Common MSOP" },
          { key: "MSOP", text: "Cosmetic Visual Inspection" },
          { key: "Form", text: "Excel Form" },
          { key: "Form", text: "Word Form" },
        ];

        array.map((i) => {
          if (i.key === value.text) {
            choose.push(i);
          }
        });
        console.log(choose);
      } else if (value.text === "Form") {
        console.log("entyered in Form");

        this.setState({
          choose: true,
          Documetntype: value.text,
        });

        let array = [
          { key: "Work Instruction", text: "Assy Eng" },
          { key: "Work Instruction", text: "CNC Shop Floor" },
          { key: "Work Instruction", text: "Metrology Lab" },
          { key: "Work Instruction", text: "Common" },
          { key: "MSOP", text: "Common MSOP" },
          { key: "MSOP", text: "Cosmetic Visual Inspection" },
          { key: "Form", text: "Excel Form" },
          { key: "Form", text: "Word Form" },
        ];

        array.map((i) => {
          if (i.key === value.text) {
            choose.push(i);
          }
        });
        console.log(choose);
      } else {
        let ID;
        let path;
        console.log("entyered in else");
        this.setState({
          choose: false,
        });
        const sp:SPFI=getSp()
        let somss:any = await sp.web.lists.getByTitle("My Docs").items();
        console.log(somss);
        await somss.filter((file) => {
          if (file.fileType === value.text) {
            ID = file.ID;
          }
        });
        console.log(ID);

        // get relative url of file.
        await sp.web.lists
          .getByTitle("My Docs")
          .items.getById(ID)
          .select("ID,FileRef")()
          .then(async (items: any) => {
            console.log(items.FileRef);
            this.setState({
              downloadUrl: items.FileRef,
              DownloadURI: false,
            });
          });
      }

      console.log(this.state);
    };

    const changeValue1 = async (e, value: any) => {
      console.log(value.text);
      // { key: 'Work Instruction', text: 'Work Instruction' },
      // { key: 'MSOP', text: 'MSOP' },
      // { key: 'Forms', text: 'Forms' },

      let ID;
      let path;
      const sp:SPFI=getSp()
      let somss:any = await sp.web.lists.getByTitle("My Docs").items();
      console.log(somss);
      await somss.filter((file) => {
        if (file.fileType === value.text) {
          ID = file.ID;
        }
      });
      console.log(ID);
      console.log(typeof ID);

      // get relative url of file.

      await sp.web.lists
        .getByTitle("My Docs")
        .items.getById(ID)
        .select("ID,FileRef")()
        .then((items: any) => {
          // console.log(items.FileRef);
          this.setState({
            downloadUrl: items.FileRef,
            DownloadURI: false,
          });
        });
    };

// const handleFileChange=(e)=>{
// console.log(e.target.files);
// this.setState({
//   // files:e.target.files
//     fileess:e.target.files

// })
// }

const handleFileChange = (e) => {
  console.log(e.target.files);
  this.setState({
    fileess: e.target.files,
  });
};

    const closeHideDialog = () => {
      this.setState({
        openDialog: false,
        choose: false,
        hiddenDialog: true,
        downloadUrl: "",
        DownloadURI: true,
      });

      choose.length = 0;
    };

    const closeHideDialogUpload = () => {
      this.setState({
        openDialogUpload: false,
        hiddenDialogUpload: true,
        SubfolderState: false,
        SubfolderState1: false,
        fileUrl: "",
        params1: "",
        params22: "",
        params11: "",
        params2: "",
        params3: "",
        params4: "",
        params5: "",
        filenames: "",
        fileDes: "",
        Filess: [],
        fileNameStruct: "",
        valueFileType: "Old Files",
      });
      // console.log(this.state.openDialog)
    };

    const handleChangePage = (event, newPage) => {
      this.setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      console.log(event.target.value);
      this.setRowsPerPage(parseInt(event.target.value, 10));
      this.setPage(0);
    };

    const _renderItemColumn = (item, index: number, column) => {
      const fieldContent = item[column.fieldName] as string;

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
            case "Rejected":
              return (
                <span
                  data-selection-disabled={true}
                  className={mergeStyles({
                    color: "#a4262c",
                    height: "100%",
                    display: "block",
                    fontWeight: "bold",
                  })}
                >
                  {fieldContent}
                </span>
              );

            default:
              return <span>{fieldContent}</span>;
          }

        case "Link":
          return (
            <PrimaryButton
              style={{
                backgroundColor: "#0078D4",
              }}
              text="View"
              target="_blank"
              href={fieldContent}
            />
          );

        default:
          return <span>{fieldContent}</span>;
      }
    };

    return (
      <div className="container" style={{ marginTop: "10px" }}>
        <div
          style={{
            flex: "1",
            flexDirection: "row",
            //    margin:'2px',
            //    gap:'3px',
            // borderStyle: 'dashed',
            // borderColor: 'black',
            position: "relative",

            columnGap: "2px",
          }}
        >
          <PrimaryButton
            text="Template"
            style={{ backgroundColor: "#0078D4" }}
            onClick={toggleHideDialog}
          />

          <PrimaryButton
            text="Upload"
            style={{
              // borderStyle: 'dashed',
              // borderColor: 'black',
              position: "absolute",
              left: "86%",
              backgroundColor: "#0078D4",
            }}
            onClick={toggleHideDialogUpload}
          />
        </div>

        <Dialog
          hidden={this.state.hiddenDialog}
          // containerClassName={ 'ms-dialogMainOverride ' + styles.textDialog}
          dialogContentProps={dialogContentProps}
          isBlocking={false}
        >
          {/* <p>Download template</p> */}
          <Dropdown
            placeholder="Select an option"
            label="Template"
            options={options1}
            onChange={changeValue}
            styles={dropdownStyles}
          />
          {this.state.choose ? (
            <Dropdown
              placeholder="Select an option"
              label="Sub Section"
              options={choose}
              onChange={changeValue1}
              styles={dropdownStyles}
            />
          ) : (
            <div></div>
          )}
          <DialogFooter>
            {this.state.DownloadURI === true ? (
              <PrimaryButton
                disabled={this.state.DownloadURI}
                style={{ backgroundColor: "#989898" }}
                onClick={downloadFile}
                text="Download"
              />
            ) : (
              <PrimaryButton
                disabled={this.state.DownloadURI}
                style={{ backgroundColor: "#0078D4" }}
                onClick={downloadFile}
                text="Download"
              />
            )}
            <DefaultButton onClick={closeHideDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>

        <Dialog
          hidden={this.state.hiddenDialogUpload}
          containerClassName={"ms-dialogMainOverride " + styles.textDialog}
          dialogContentProps={dialogContentPropsUpload}
          modalProps={modelProps}
          styles={getStyles}
        >
          <div>
            <Dropdown
              placeholder="Old Files"
              label="File type"
              options={options}
              onChange={changeValueFileType}
              styles={dropdownStyles}
            />
          </div>
          {this.state.Uploading === false ? (
            <div>
              {this.state.valueFileType === "Old Files" ? (
                <div
                  style={{
                    marginTop: "30px",
                  }}
                >
                  <div>
                    {/* <PrimaryButton type="file" name="myFile" id="newfile" text="Choose file" style={{ backgroundColor: "#0078D4" }}/> */}
                    <div
                      style={{
                        height: "200px",
                        // borderStyle: 'dashed',
                        // borderColor: 'black',
                        // flexDirection: 'row',
                        position: "relative",
                        // left: '86%',
                        // backgroundColor: "#0078D4"
                      }}
                    >
                      <div
                        style={{
                          left: "0%",
                          position: "absolute",
                          // left: '86%',
                          // backgroundColor: "#0078D4"
                        }}
                      >
                        <Dropdown
                          placeholder="Select an option"
                          label="Department Name"
                          defaultSelectedKey={3}
                          options={this.state.departmentName}
                          onChange={changeValuedepartmentName}
                          styles={dropdownStyles}
                        />
                      </div>
                      <div
                        style={{
                          left: "35%",
                          position: "absolute",
                          // left: '86%',
                          // backgroundColor: "#0078D4"
                        }}
                      >
                        <Dropdown
                          placeholder="Select an option"
                          label="Document Name"
                          options={this.state.documentType}
                          onChange={changeValuedocumentType}
                          styles={dropdownStyles}
                        />
                      </div>
                      {/* <div
                  style={{
                    left: "60%",
                    position: "absolute",
                    // left: '86%',
                    // backgroundColor: "#0078D4"
                  }}
                >
                  <Dropdown
                    placeholder="Select an option"
                    label="Project Name"
                    options={this.state.ProjectName}
                    onChange={changeValueProjectName}
                    styles={dropdownStyles}
                  />
                </div> */}
                      {this.state.SubfolderState === true ? (
                        <div
                          style={{
                            left: "0%",
                            marginTop: "100px",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <Dropdown
                            placeholder="Select an option"
                            label="Sub Folders Main"
                            options={this.state.SubdepartmentsMain}
                            onChange={changeValueSubdepartmentsMain}
                            styles={dropdownStyles}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {this.state.SubfolderState1 === true ? (
                        <div
                          style={{
                            marginTop: "100px",
                            left: "35%",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <Dropdown
                            placeholder="Select an option"
                            label="Sub Folders"
                            options={this.state.Subdepartments}
                            onChange={changeValueSubdepartments}
                            styles={dropdownStyles}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {this.state.SubfolderState1 === false ? (
                        <div
                          style={{
                            marginTop: "130px",
                            left: "35%",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <PrimaryButton
                            text="Search"
                            style={{ backgroundColor: "#0078D4" }}
                            onClick={clickGenerate1}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "130px",
                            left: "70%",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <PrimaryButton
                            text="Search"
                            style={{ backgroundColor: "#0078D4" }}
                            onClick={clickGenerate1}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        marginBottom: "30px",
                        position: "relative",
                      }}
                    >
                      <Dropdown
                        placeholder="Select File"
                        label="Select File"
                        options={this.state.Filess}
                        onChange={changeSalectFilename}
                        style={{
                          width: "50%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "50px",
                      }}
                    >
                      <input type="file" name="myFile" id="newfile" onChange={(e)=>handleFileChange(e)}></input>
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <TextField
                        label="File name"
                        defaultValue={this.state.filenames}
                        onChange={changeValueFilename}
                      />
                      <TextField
                        label="File description"
                        defaultValue={this.state.fileDes}
                        multiline
                        rows={3}
                        onChange={changeValueFileDescription}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <PrimaryButton
                      text="Upload"
                      style={{ backgroundColor: "#0078D4" }}
                      onClick={this.filesave}
                    />
                    <DefaultButton
                      onClick={closeHideDialogUpload}
                      text="Cancel"
                    />
                  </DialogFooter>
                </div>
              ) : (
                // New file
                <div
                  style={{
                    marginTop: "30px",
                  }}
                >
                  <div>
                    {/* <PrimaryButton type="file" name="myFile" id="newfile" text="Choose file" style={{ backgroundColor: "#0078D4" }}/> */}
                    <div
                      style={{
                        height: "200px",
                        // borderStyle: 'dashed',
                        // borderColor: 'black',
                        // flexDirection: 'row',
                        position: "relative",
                        // left: '86%',
                        // backgroundColor: "#0078D4"
                      }}
                    >
                      <div
                        style={{
                          left: "0%",
                          position: "absolute",
                          // left: '86%',
                          // backgroundColor: "#0078D4"
                        }}
                      >
                        <Dropdown
                          placeholder="Select an option"
                          label="Department Name"
                          defaultValue={this.state.params11}
                          options={this.state.departmentName}
                          onChange={changeValuedepartmentName}
                          styles={dropdownStyles}
                        />
                      </div>
                      <div
                        style={{
                          left: "35%",
                          position: "absolute",
                          // left: '86%',
                          // backgroundColor: "#0078D4"
                        }}
                      >
                        <Dropdown
                          placeholder="Select an option"
                          label="Document Name"
                          options={this.state.documentType}
                          onChange={changeValuedocumentType}
                          styles={dropdownStyles}
                        />
                      </div>
                      <div
                        style={{
                          left: "70%",
                          position: "absolute",
                          // left: '86%',
                          // backgroundColor: "#0078D4"
                        }}
                      >
                        <Dropdown
                          placeholder="Select an option"
                          label="Project Name"
                          options={this.state.ProjectName}
                          onChange={changeValueProjectName}
                          styles={dropdownStyles}
                        />
                      </div>
                      {this.state.SubfolderState === true ? (
                        <div
                          style={{
                            left: "0%",
                            marginTop: "100px",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <Dropdown
                            placeholder="Select an option"
                            label="Sub Folders Main"
                            options={this.state.SubdepartmentsMain}
                            onChange={changeValueSubdepartmentsMain}
                            styles={dropdownStyles}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {this.state.SubfolderState1 === true ? (
                        <div
                          style={{
                            marginTop: "100px",
                            left: "35%",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <Dropdown
                            placeholder="Select an option"
                            label="Sub Folders"
                            options={this.state.Subdepartments}
                            onChange={changeValueSubdepartments}
                            styles={dropdownStyles}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {this.state.SubfolderState1 === false ? (
                        <div
                          style={{
                            marginTop: "130px",
                            left: "35%",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <PrimaryButton
                            text="Generate ID"
                            style={{ backgroundColor: "#0078D4" }}
                            onClick={clickGenerate}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "130px",
                            left: "70%",
                            position: "absolute",
                            // left: '86%',
                            // backgroundColor: "#0078D4"
                          }}
                        >
                          <PrimaryButton
                            text="Generate ID"
                            style={{ backgroundColor: "#0078D4" }}
                            onClick={clickGenerate}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        marginBottom: "30px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          // marginTop: "130px",
                          left: "0%",
                          position: "absolute",
                        }}
                      >
                        <TextField
                          label="ID (Please copy the generated ID before uploading)"
                          disabled
                          value={this.state.fileNameStruct}
                          // style={{
                          //   width:"50%",
                          // }}
                          defaultValue={this.state.fileNameStruct}
                          onChange={changeValueFileID}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "31px",
                          left: "45%",
                          position: "absolute",
                        }}
                      >
                        <PrimaryButton
                          text="Copy"
                          style={{ backgroundColor: "#0078D4" }}
                          onClick={async () => {
                            navigator.clipboard.writeText(
                              this.state.fileNameStruct
                            );
                            alert("ID copied successfully!");
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "100px",
                      }}
                    >
                      <input type="file" name="myFile" id="newfile" onChange={(e)=>handleFileChange(e)}></input>
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <TextField
                        label="File name"
                        defaultValue={this.state.filenames}
                        onChange={changeValueFilename}
                      />
                      <TextField
                        label="File description"
                        defaultValue={this.state.fileDes}
                        multiline
                        rows={3}
                        onChange={changeValueFileDescription}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <PrimaryButton
                      text="Upload"
                      style={{ backgroundColor: "#0078D4" }}
                      onClick={this.filesave}
                    />
                    <DefaultButton
                      onClick={closeHideDialogUpload}
                      text="Cancel"
                    />
                  </DialogFooter>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                marginTop: "70px",
                // // borderStyle: "dashed",
                // height: "50px",
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center"
              }}
            >
              {/* <img src="https://cdn-icons-png.flaticon.com/512/892/892311.png" alt="Girl in a jacket" width="200" height="200"></img>
              <div style={{
               margin: "20px",
            }}></div>
              <p style={{
                fontWeight: "bold"
              }}>Please wait while file gets Uploaded.</p> */}
              <ProgressIndicator
                label="File is uploading"
                description="It will take some time."
              />
            </div>
          )}
        </Dialog>

        <div style={{ margin: "35px" }}></div>
        <Stack
          horizontal
          // className={styles.filter}
          tokens={stackTokens}
        >
          {/* <h5>Search:</h5> */}
          <TextField
            underlined
            placeholder="Search"
            onChange={this._onFilter}
            styles={textFieldStyles}
          />
          {/* <PrimaryButton
              text="Search"
              style={{ backgroundColor: "#0078D4" }}
              onClick={this._onFilters}
    /> */}

          {/*<UploadFile></UploadFile>*/}
        </Stack>
        <div style={{ margin: "35px" }}></div>
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
        {this.state.overalllist.length == 0 ? (
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
          count={this.state.count}
          page={this.state.page}
          onPageChange={handleChangePage}
          rowsPerPage={this.state.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  }

  private async filesave() {
    console.log(this.state.filenames.length);
    console.log(this.state.fileDes.length);

      if (Array.isArray(this.state.fileess) && this.state.fileess.length > 0) {

      const fileToUpload:any = this.state.fileess[0]; // Assuming you want to upload the first file in the array

      console.log(fileToUpload);
}
    else if(this.state.filenames.length <= 0) {
      alert("Please give an file name");
    } else if (this.state.fileDes.length <= 0) {
      alert("Please give an file Description");
    } else {
      console.log(this.state.fileNameStruct);
      const fileToUpload:any = this.state.fileess[0]; // Assuming you want to upload the first file in the array
      // let myfile:any = document.querySelector("#newfile") as HTMLInputElement
            let myfile: any = fileToUpload;
      console.log(myfile);
      this.setState({
        Uploading: true,
      });

      let Department:any = "";
      let Subdepartment:any = "";

      if (this.state.params11.length >= 0) {
        Department = this.state.params11;
      } else {
        Department = "";
      }
      if (this.state.fileess.length <= 0) {
          // alert("The file length is 0")
          // this.setState({ fileess: e.target.files });
      }

      if (this.state.params3.length >= 0) {
        Subdepartment = this.state.params3;
      } else {
        Subdepartment = "";
      }

      if (myfile.size <= 10485760) {
        const sp:SPFI=getSp();

        // create item in an sp list
        //       let somss = await web.lists.getByTitle("User Files").items();
        // console.log(somss)
        console.log(myfile.name);

        // let fileexe:any = myfile.name.split(".").pop();
        // // console.log(`/sites/DMSportal/Shared Documents/${this.state.fileUrl}`);
        //         console.log(`/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`);

        // console.log(`${this.state.fileNameStruct}.${fileexe}`);
        // // const folderPath:any = `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`;
        // const folderPath:any = `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`;

        // const folder:any = sp.web.getFolderByServerRelativePath(folderPath);
  
        // await sp.web.getFolderByServerRelativePath("Shared Documents1").files.addUsingPath(`${this.state.fileNameStruct}.${fileexe}`,myfile, { Overwrite: true })
        // .then(async (f) => {
        //     await f.file.getItem().then(async (item) => {
        //       await item
        //         .update({
        //           FileDescription: this.state.fileDes,
        //           FileName: this.state.filenames,
        //           DocID: String(this.state.DocID + 1),
        //         })
        //         .then(async (myupdate) => {
        //           console.log(myupdate);
        //         });
  
        //       });
        //       });
          //     await item.getAll().then(async (myupdate) => {
          //       console.log(myupdate);
          //       this.setState({
          //         fileIDs: myupdate.ID,
          //       });
          //       // console.log("Metadata Updated");
          //     });
          //   });
          // });

       
          //This code works
            let fileexe:any = myfile.name.split(".").pop();
            console.log(fileexe);
          // console.log(`/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`);
          console.log(`/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`);


            console.log(`${this.state.fileNameStruct}.${fileexe}`);
        // const folderPath:any = `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`;
        // const folder:any = sp.web.getFolderByServerRelativePath(folderPath);

        // await sp.web.getFolderByServerRelativePath("Shared Documents1").files.addUsingPath(`${this.state.fileNameStruct}.${fileexe}`,myfile, { Overwrite: true })
        // await sp.web.getFolderByServerRelativePath(`/sites/DMS-TATA/Shared%20Documents1/${this.state.fileUrl}`).files.addUsingPath(folderPath, file, { Overwrite: true });


        // await sp.web.getFolderByServerRelativePath(`/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`).files.addUsingPath(`${this.state.fileNameStruct}.${fileexe}`, myfile, { Overwrite: true })


                await sp.web.getFolderByServerRelativePath(`/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`).files.addUsingPath(`${this.state.fileNameStruct}.${fileexe}`, myfile, { Overwrite: true })


          .then(async (f) => {
            await f.file.getItem().then(async (item) => {
              await item
                .update({
                  FileDescription: this.state.fileDes,
                  FileName: this.state.filenames,
                  DocID: String(this.state.DocID + 1),
                })
                .then(async (myupdate) => {
                  console.log(myupdate);
                });
  
              // await item.get().then(async (myupdate) => {
              //   console.log(myupdate);
              //   this.setState({
              //     fileIDs: myupdate.ID,
              //   });
              //   console.log("Metadata Updated");
              // });

              console.log(item);
            });
          });




        this.state.fileUrl;
        let fileurl:any = "";
        await sp.web
          .getFolderByServerRelativePath(
            // `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`
            // `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`
            `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`


          ) // Here comes a folder/subfolder path
          .files.expand("Files/ListItemAllFields,DocID") // For Metadata extraction
          .select() // Fields to retrieve
          ()
          .then(async (item) => {
            console.log(item);
            item.filter((file) => {
              console.log(file);
              console.log(file.LinkingUri);
              if (file.Name === `${this.state.fileNameStruct}.${fileexe}`) {
                fileurl = file.LinkingUri;
              }
            });
          });

        console.log(this.state.fileIDs);
        date.setDate(date.getDate() + 5);
        let { Title } = await sp.web.currentUser();
        if (this.state.valueFileType === "Old Files") {
          console.log(`${this.state.fileNameStruct}.${fileexe}`);
          // update item in an sp list
          const items: any[] = await sp.web.lists
            .getByTitle("User Files")
            .items.filter(
              `Filename eq '${this.state.fileNameStruct}.${fileexe}'`
            )();
          console.log(items);
          const max = items.reduce(function (prev, current) {
            // var ts = new Date("2022-04-06T09:21:13Z");
            // console.log(ts);

            return toTimestamp(prev.Modified) > toTimestamp(current.Modified)
              ? prev
              : current;
          });
          console.log(max);
          // if (max.length > 0) {
          await sp.web.lists
            .getByTitle("User Files")
            .items.getById(max.Id)
            .update({
              Filename: `${this.state.fileNameStruct}.${fileexe}`,
              FileTitle: this.state.filenames,
              Filetype: this.state.params2,
              Filedescription: this.state.fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              Requester: Title,
              Remainder: formatDate(date),
              RequestorEmail: this.state.CurrentUser,
              Fileurl: fileurl,
              DocID: String(this.state.DocID + 1),
              Status: "Pending",
              // RelativeURL: `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`,
              // RelativeURL: `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`,
              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`,


              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then((i) => {
              console.log(i);
            });
          //  }

          // alert("Updated Successfully");
        } else if (this.state.valueFileType === "New Files") {
          await sp.web.lists
            .getByTitle("User Files")
            .items.add({
              Filename: `${this.state.fileNameStruct}.${fileexe}`,
              FileTitle: this.state.filenames,
              Filetype: this.state.params2,
              Filedescription: this.state.fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              Requester: Title,
              Remainder: formatDate(date),
              RequestorEmail: this.state.CurrentUser,
              Fileurl: fileurl,
              DocID: String(this.state.DocID + 1),
              Status: "Pending",
              // RelativeURL: `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`,
              //  RelativeURL: `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`,
               RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`,



              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then(async (i) => {
              console.log(i);
            });
        }

        //     console.log(this.state);
        //     await web.lists.getById("380").rootFolder.files.get().then(t => {
        // //add your code here if you want to do more after deleting the file
        //     console.log(t);
        //     });

        alert("Created Successfully");
        this.setState({
          Uploading: false,
        });
      } else {
        const sp:SPFI=getSp()
        console.log(myfile.name);
        let fileexe:any = myfile.name.split(".").pop();
        // console.log(`/sites/DMSportal/Shared Documents/${this.state.fileUrl}`);
        // console.log(`/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`);
        console.log(`/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`);

        

        console.log(`${this.state.fileNameStruct}.${fileexe}`);
        // await sp.web
        //   .getFolderByServerRelativePath(
        //     `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`
        //   )
          await sp.web
          .getFolderByServerRelativePath(
            // `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`
            `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`

          )
          .files.addChunked(myfile.name, myfile)
          .then((f) => {
            // console.log("File Uploaded");
            f.file.getItem().then(async (item) => {
              //get item from sp

              await item
                .update({
                  FileDescription: this.state.fileDes,
                  FileName: this.state.filenames,
                  DocID: String(this.state.DocID + 1),
                })
                .then(async (myupdate) => {
                  console.log(myupdate);
                  // console.log("Metadata Updated");
                });

              await item().then(async (myupdate) => {
                console.log(myupdate);
                this.setState({
                  fileIDs: myupdate.ID,
                });
                // console.log("Metadata Updated");
              });
            });
          });
        this.state.fileUrl;
        // let fileurl:any = "";
        // await sp.web
        //   .getFolderByServerRelativePath(
        //     `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`
        //   ) // Here comes a folder/subfolder path
        //   .files.expand("Files/ListItemAllFields,DocID") // For Metadata extraction
        //   .select() // Fields to retrieve
        //   .getAll()
        //   .then(async (item) => {
        //     console.log(item);
        //     await item.filter((file) => {
        //       console.log(file.LinkingUri);
        //       if (file.Name === `${this.state.fileNameStruct}.${fileexe}`) {
        //         fileurl = file.LinkingUri;
        //       }
        //     });
        //   });
        let fileurl: any = "";

        // const folderPath:any = `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`;

        // const folderPath:any = `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`;
        const folderPath:any = `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`;


        const folder:any = sp.web.getFolderByServerRelativePath(folderPath);
        
        const items:any = await folder.files.expand("Files/ListItemAllFields,DocID").select().getAll();
        
        for (const item of items) {
          console.log(item);
          if (item.Name === `${this.state.fileNameStruct}.${fileexe}`) {
            fileurl = item.LinkingUri;
            break;
          }
        }

        console.log(this.state.fileIDs);
        let { Title } = await sp.web.currentUser();
        if (this.state.valueFileType === "Old Files") {
          // update item in an sp list
          const items: any[] = await sp.web.lists
            .getByTitle("User Files")
            .items.top(1)
            .filter(`Filename eq '${this.state.fileNameStruct}.${fileexe}'`)();

          if (items.length > 0) {
            await sp.web.lists
              .getByTitle("User Files")
              .items.getById(items[0].Id)
              .update({
                Filename: `${this.state.fileNameStruct}.${fileexe}`,
                FileTitle: this.state.filenames,
                Filetype: this.state.params2,
                Filedescription: this.state.fileDes,
                FileUploadDate: formatDate(new Date()),
                ApprovalStatus: "QMS",
                RequestorEmail: this.state.CurrentUser,
                Requester: Title,
                Fileurl: fileurl,
                DocID: String(this.state.DocID + 1),
                Status: "Pending",
                // RelativeURL: `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`,
                // RelativeURL: `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`,
                RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`,

                Department: Department,
                SubDepartment: Subdepartment,
              })
              .then((i) => {
                console.log(i);
              });
          }

          // alert("Updated Successfully");
        } else if (this.state.valueFileType === "New Files") {
          await sp.web.lists
            .getByTitle("User Files")
            .items.add({
              Filename: `${this.state.fileNameStruct}.${fileexe}`,
              FileTitle: this.state.filenames,
              Filetype: this.state.params2,
              Filedescription: this.state.fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              RequestorEmail: this.state.CurrentUser,
              Fileurl: fileurl,
              Requester: Title,
              DocID: String(this.state.DocID + 1),
              Status: "Pending",
              // RelativeURL: `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`,
              // RelativeURL: `/sites/DMS-TATA/Shared Documents1/${this.state.fileUrl}`,
              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${this.state.fileUrl}`,


              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then(async (i) => {
              console.log(i);
            });
        }

        alert("Created Successfully");
        this.setState({
          Uploading: false,
        });
      }

      this.setState({
        openDialogUpload: false,
        hiddenDialogUpload: true,
        SubfolderState: false,
        SubfolderState1: false,
        fileUrl: "",
        filenames: "",
        fileDes: "",
        Filess: [],
        params1: "",
        params22: "",
        params11: "",
        params2: "",
        params3: "",
        params4: "",
        params5: "",
        fileNameStruct: "",
        valueFileType: "Old Files",
      });
      console.log(this.state);
    }
  }
}
