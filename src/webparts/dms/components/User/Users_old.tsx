// import * as React from "react";
// import { Web } from "@pnp/sp/presets/all";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import "@pnp/polyfill-ie11";
// import "@pnp/sp/webs";
// import "@pnp/sp/sharing";
// import "@pnp/sp/folders/web";
// import "@pnp/sp/files/web";
// import { PrimaryButton } from "@fluentui/react/lib/Button";
// import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
// import {
//   Dropdown,
//   IDropdownStyles,
//   IDropdownOption,
// } from "@fluentui/react/lib/Dropdown";
// import { TextField } from "@fluentui/react/lib/TextField";
// // import ReactTable from "react-table";
// // import Navbar from './Navbar/Navbar';
// import { ISharingResult, SharingRole, SharingLinkKind } from "@pnp/sp/sharing";
// import { Table } from "react-bootstrap";
// import styles from "../User/DmsWebPart.module.scss";
// import { getSp } from "../../../../helpers/PnPConfig";
// import { SPFI } from "@pnp/sp";
// import "@pnp/sp/items/get-all";

// const options: IDropdownOption[] = [
//   { key: "Old Files", text: "Old Files" },
//   { key: "New Files", text: "New Files" },
// ];

// const options1: IDropdownOption[] = [
//   { key: 'Objectives', text: 'Objectives' },
//   { key: 'Policies', text: 'Policies' },
//   { key: 'SOPs', text: 'SOPs' },
//   { key: 'Plans', text: 'Plans' },
// ];

// const templatePopup = () => <div></div>;

// const dropdownStyles: Partial<IDropdownStyles> = {
//   dropdown: { width: 200 },
// };

// const dialogContentProps = {
//   type: DialogType.normal,
//   title: "Download Template",
// };
// const dialogContentPropsUpload = {
//   type: DialogType.normal,
//   title: "Upload File",
// };

// function padTo2Digits(num) {
//   return num.toString().padStart(2, "0");
// }

// function formatDate(date) {
//   return [
//     padTo2Digits(date.getDate()),
//     padTo2Digits(date.getMonth() + 1),
//     date.getFullYear(),
//   ].join("/");
// }

// export default class header extends React.Component<{}, any> {
//   constructor(props) {
//     super(props);
//     this.filesave = this.filesave.bind(this);
//     this.state = {
//       openDialog: false,
//       openDialogUpload: false,
//       fileIDs:'',
//       hiddenDialogUpload: true,
//       hiddenDialog: true,
//       downloadUrl: "",
//       filenames: "",
//       fileDes: "",
//       fileArray: [],
//       departmentName: [],
//       documentType: [],
//       ProjectName: [],
//       SubdepartmentsMain: [],
//       Filess:[],
//       SubdepartmentsMain1: [],
//       SubdepartmentsMain2: [],
//       Subdepartments: [],
//       SubfolderState: false,
//       SubfolderState1: false,
//       SubfoldersMainParent: [],
//       SubfoldersParent: [],
//       fileUrl: "",
//       valueFileType: "Old Files",
//       textToCopy: '',
//       DocID:'',
//       fileNameStruct: "",
//       params1: "",
//       params2: "",
//       params3: "",
//       params4: "",
//       params5: "",
//       some: [],
//       CurrentUser: "",
//       filenames1: "",
//     };
//   }

//   public async componentDidMount() {
//     const sp:SPFI=getSp()
//     // let result = await web.getFileByServerRelativeUrl("/sites/DMSportal/Shared Documents/NewMicrosoftWordDocument.docx").shareWith("i:0#.f|membership|AlexW@M365x022574.OnMicrosoft.com");
//     // let user = await sp.web.currentUser();
//     let user:any = await sp.web.currentUser();

//     await console.log("109");
//     await console.log(user.Email);

//       // const item2 =  await sp.web.getFileByServerRelativePath("/sites/DMSportal/Shared Documents/ADMINISTRATION/GENERAL ADMIN/SOP/PROJECT-TEPL-ADMINISTRATION-SOP-001.xlsx").getItem();
//       const item2:any =  await sp.web.getFileByServerRelativePath("/sites/DMSportal/Shared Documents/ADMINISTRATION/GENERAL ADMIN/SOP/PROJECT-TEPL-ADMINISTRATION-SOP-001.xlsx").getItem();

//         console.log(item2);
//         // let myTarget = JSON.parse(item2)
//         // console.log("113",myTarget);


//       // also supports typing the objects so your type will be a union type
// const item = await sp.web.getFileByServerRelativePath("/sites/DMSportal/Shared Documents/ADMINISTRATION/GENERAL ADMIN/SOP/PROJECT-TEPL-ADMINISTRATION-SOP-001.xlsx").getItem<{ File: number}>("File");

// // You get intellisense and proper typing of the returned object
// console.log(item.File);
// // await web.lists.getByTitle('Documents').rootFolder.files.get().then(t => {
// //   //add your code here if you want to do more after deleting the file
// //       console.log(t);
// //       });

// // const file = web.getFileByUrl("/sites/DMSportal/Shared Documents/ADMINISTRATION/GENERAL ADMIN/SOP/PROJECT-TEPL-ADMINISTRATION-SOP-001.xlsx");
// // console.log(file);
// // // for example
// // const fileContent = await file.getText();
// // console.log(fileContent);

//       const items: any[] = await sp.web.lists.getByTitle("Project List").items();
//       console.log(items.length);
//       await this.setState({
//         DocID:items.length
//       })


//       await sp.web
//         .getFolderByServerRelativePath(
//           "/sites/DMSportal/Shared Documents/ADMINISTRATION/GENERAL ADMIN/SOP/"
//         )
//         .files
//         .getAll()
//         .then(async(ss) =>{
//           console.log(ss);
//           // ss.filter(async(sss) => {
//           //   if(sss.if ===  ) {

//           //   }
//           // })
//         });
//             //     console.log(this.state);

//     // console.log(a);
//     let sss:any = await sp.web.lists
//       .getByTitle("User Files")
//       .items.select(
//         "File,Filetype,Filename,FileTitle,Filedescription,FileUploadDate,ApprovalStatus,Fileurl"
//       )
//       .expand("File")
//       .getAll()
//       .then(
//         async (sss) =>
//           await this.setState({
//             fileArray: sss,
//           })
//       );

//     await console.log(this.state.fileArray);
//     // Filename: `${this.state.fileNameStruct}.${fileexe}`,
//     //       FileTitle: this.state.filenames,
//     //       Filetype: this.state.params2,
//     //       Filedescription: this.state.fileDes,
//     //       FileUploadDate: formatDate(new Date()),
//     //       ApprovalStatus: "QMS",

//     // let DepartmentNames = [];
//     // let DocumentType = [];
//     // let ProjectName = [];
//     // let SubDepartments = [];
//     // let SubdepartmentsParents = [];
//     // let SubDepartments1 = [];
//     // let SubdepartmentsMain = [];
//     // let SubdepartmentsMain1 = [];
//     // let SubdepartmentsMainParents = [];


//     let DepartmentNames:any = [];
//     let DocumentType:any = [];
//     let ProjectName:any = [];
//     let SubDepartments:any = [];
//     let SubdepartmentsParents:any = [];
//     let SubDepartments1:any = [];
//     let SubdepartmentsMain:any = [];
//     let SubdepartmentsMain1:any = [];
//     let SubdepartmentsMainParents:any = [];


//     await sp.web.lists
//       .getByTitle("Project List")
//       .items.select("ProjectName,ProjectID")
//       .getAll()
//       .then(async (item) => {
//         await item.map(async (nn) => {
//           await ProjectName.push({ Key: nn.ProjectName, text: nn.ProjectID });
//         });
//       });

//     await sp.web.lists
//       .getByTitle("Department Names")
//       .items.select("Departments")
//       .getAll()
//       .then(async (item) => {
//         await item.map(async (nn) => {
//           await DepartmentNames.push({
//             Key: nn.Departments,
//             text: nn.Departments,
//           });
//         });
//       });
//     // console.log(DepartmentNames);
//     await sp.web.lists
//       .getByTitle("Document Type")
//       .items.select("Documents")
//       .getAll()
//       .then(async (item) => {
//         await item.map(async (nn) => {
//           await DocumentType.push({ Key: nn.Documents, text: nn.Documents });
//         });
//       });
//     // // console.log(DocumentType);
//     await sp.web.lists
//       .getByTitle("Sub departments")
//       .items.select("Subfolders ,ParentFolder")
//       .getAll()
//       .then(async (item) => {
//         await item.map(async (nn) => {
//           // console.log(nn)
//           // console.log(nn.ParentFolder)

//           // await SubDepartments.push({"text":nn.Subfolders,"Key":nn.Subfolders});
//           await SubDepartments1.push({
//             SubFolders: nn.Subfolders,
//             ParentFolders: nn.ParentFolder,
//           });
//           await SubdepartmentsParents.push(nn.ParentFolder);
//         });

//         // await console.log(SubdepartmentsParents)
//         let uniqueArray = SubdepartmentsParents.filter(function (
//           item,
//           pos,
//           self
//         ) {
//           return self.indexOf(item) == pos;
//         });
//         // await console.log(uniqueArray)

//         await this.setState({
//           SubfoldersParent: uniqueArray,
//         });
//       });
//     // console.log(SubDepartments);
//     await sp.web.lists
//       .getByTitle("Sub departments Main")
//       .items.select("SubFolders,ParentFolders")
//       .getAll()
//       .then(async (item) => {
//         await item.map(async (nn) => {
//           // await SubdepartmentsMain.push({"text":nn.SubFolders,"Key":nn.SubFolders});
//           await SubdepartmentsMain1.push({
//             SubFolders: nn.SubFolders,
//             ParentFolders: nn.ParentFolders,
//           });

//           // console.log()
//           //   SubfoldersMainParent: Pare
//           // })
//           await SubdepartmentsMainParents.push(nn.ParentFolders);
//           // await this.setState({
//         });
//         // await console.log(SubdepartmentsMainParents)
//         let uniqueArray = SubdepartmentsMainParents.filter(function (
//           item,
//           pos,
//           self
//         ) {
//           return self.indexOf(item) == pos;
//         });

//         await this.setState({
//           SubfoldersMainParent: uniqueArray,
//         });

//       });


//     await this.setState({
//       departmentName: DepartmentNames,
//       documentType: DocumentType,
//       SubdepartmentsMain: SubdepartmentsMain,
//       SubdepartmentsMain2: SubdepartmentsMain1,
//       Subdepartments: SubDepartments,
//       Subdepartments2: SubDepartments1,
//       ProjectName: ProjectName,
//       CurrentUser:user.Email
//     });

//     await console.log(this.state);

//   }




//   // approverslist
//   public render() {
//     var sss:any = [];

//     const toggleHideDialog = () => {
//       this.setState({
//         openDialog: true,
//         hiddenDialog: false,
//       });
//       // console.log(this.state.openDialog)
//     };

//     const toggleHideDialogUpload = () => {
//       this.setState({
//         openDialogUpload: true,
//         hiddenDialogUpload: false,
//       });
//       // console.log(this.state.openDialog)
//     };
//     // valueFileType
//     const changeValueFileType = async (e, value: any) => {
//       await this.setState({
//         valueFileType: value.text,
//         SubfolderState: false,
//         SubfolderState1: false,
//         fileDes: '',
//         filenames: '',
//         fileUrl: "",
//         params1: "",
//         params2: "",
//         params3: "",
//         params4: "",
//         params5: "",

//       })
//     };

//     const changeValuedepartmentName = async (e, value: any) => {
//       // console.log(value);
//       await sss.push(value.text);
//       if (this.state.SubfoldersMainParent.includes(value.text)) {
//         let array1:any = [];
//         // console.log(this.state.SubdepartmentsMain2);
//         await this.state.SubdepartmentsMain2.filter((names) => {
//           // console.log(names.ParentFolders)
//           // console.log(names)
//           if (names.ParentFolders === value.text) {
//             // console.log(names.SubFolders);
//             array1.push({ text: names.SubFolders, Key: names.SubFolders });
//           }
//         });
//         // await console.log(array1)
//         await this.setState({
//           SubfolderState: true,
//           SubdepartmentsMain: array1,
//           params1: value.text,
//           some: [value.text],
//         });
//       } else {
//         this.setState({
//           SubfolderState: false,
//           params1: value.text,
//         });
//       }

//       // await console.log(this.state.some)
//     };

//     const changeValuedocumentType = async (e, value: any) => {
//       // console.log(value);
//       await this.setState({
//         params2: value.text,
//       });
//     };

//     const changeValueProjectName = async (e, value: any) => {
//       // console.log(value);
//       await this.setState({
//         params5: value.text,
//       });
//     };

//     const changeValueSubdepartmentsMain = async (e, value: any) => {
//       console.log(value);
//       // Subfolders ,ParentFolder

//       if (this.state.SubfoldersParent.includes(value.text)) {
//         let array1:any = [];
//         console.log(this.state.Subdepartments2);

//         await this.state.Subdepartments2.filter((names) => {
//           // console.log(names.ParentFolders)
//           // console.log(names)
//           if (names.ParentFolders === value.text) {
//             console.log(names.SubFolders);
//             array1.push({ text: names.SubFolders, Key: names.SubFolders });
//           }
//         });
//         await console.log(array1);
//         await console.log(value.text);
//         await this.setState({
//           SubfolderState1: true,
//           Subdepartments: array1,
//           params3: value.text,
//         });
//       } else {
//         this.setState({
//           SubfolderState1: false,
//           params3: value.text,
//         });
//       }

//       // await console.log(this.state.some)
//     };

//     const changeValueSubdepartments = async (e, value: any) => {
//       // console.log(value);
//       if (this.state.SubfolderState1 === true) {
//         await sss.push(...sss, value.text);
//       }
//       await this.setState({
//         params4: value.text,
//         some: [value.text],
//       });
//     };

//     const changeSalectFilename = async (e, value: any) => {
//       console.log(value);
//       let testFile = value.text.split(".")[0];

//       await this.setState({
//         fileNameStruct: testFile,
//       });
//     };

//     const changeValueFilename = async (e, value: any) => {
//       // console.log(value);
//       await this.setState({
//         filenames: value,
//       });
//     };

//     const changeValueFileDescription = async (e, value: any) => {
//       // console.log(value);
//       await this.setState({
//         fileDes: value,
//       });
//     };

//     const downloadFile = async () => {
//       //download xl file
//       const sp:SPFI=getSp()
//       // console.log()
//       let fileName = this.state.downloadUrl.split("/")[4];
//       await sp.web
//         .getFileByServerRelativePath(this.state.downloadUrl)
//         .getBuffer()
//         .then((buffer: ArrayBuffer) => {
//           const blob = new Blob([buffer]);
//           const link = document.createElement("a");
//           link.href = window.URL.createObjectURL(blob);
//           link.download = `${fileName}`;
//           link.click();
//         });

//       await this.setState({
//         openDialog: false,
//         hiddenDialog: true,
//       });
//     };



//     const clickGenerate = async () => {
//       await console.log(this.state);
//       let somee:any = [];
//       let somee1:any = [];

//       if(this.state.params1.length <= 0) {
//         alert("Please add Department Name before generating ID!")
//       } else if(this.state.params2.length <= 0) {
//         alert("Please add Document Name before generating ID!")
//       } else if(this.state.params5.length <= 0) {
//         alert("Please add Project Name before generating ID!")
//       } else if(this.state.SubfolderState === true && this.state.params4.length <= 0) {
//         alert("Please add Sub Folders Main before generating ID!")
//       } else if(this.state.SubfolderState1 === true && this.state.params3.length <= 0) {
//         alert("Please add Sub Folders before generating ID!")
//       }

//       if (this.state.params5.length > 0) {
//         await console.log(this.state.params5);
//         await somee1.push(this.state.params5);
//         await somee1.push("TEPL");
//       }
//       if (this.state.params1.length > 0) {
//         await console.log(this.state.params1);
//         await somee.push(this.state.params1);
//         await somee1.push(this.state.params1);
//       }
//       if (this.state.params3.length > 0) {
//         await console.log(this.state.params3);
//         await somee.push(this.state.params3);
//         // await somee1.push(this.state.params3);
//       }
//       if (this.state.params4.length > 0) {
//         await console.log(this.state.params4);
//         await somee.push(this.state.params4);
//         // await somee1.push(this.state.params4);
//       }

//       if (this.state.params2.length > 0) {
//         await console.log(this.state.params2);
//         await somee.push(this.state.params2);
//         await somee1.push(this.state.params2);
//       }

//       await console.log(somee);
//       await console.log(somee.join("/"));
//       await console.log(somee1.join("-"));
//       let lastDigit = "";
//       let params6;
//       let digitArray:any = [];
//       await console.log(`/sites/DMSportal/Shared Documents/${somee.join("/")}`);
//       const sp:SPFI=getSp()
//       let somss = await sp.web
//         .getFolderByServerRelativePath(
//           `/sites/DMSportal/Shared Documents/${somee.join("/")}`
//         )
//         .files.getAll()
//         .then(async (s) => {
//           // console.log(s)
//           if (s.length > 0) {
//             s.map((ss) => {
//               let last = ss.Name.split("-")[4];
//               // console.log();
//               let splitFileEx = last.split(".")[0];
//               digitArray.push(splitFileEx);
//               // console.log(Number(splitFileEx) + 1);
//             });

//             let sortNumebrs = await digitArray.sort();

//             let last = await sortNumebrs[sortNumebrs.length - 1];

//             let returnNumber = String(Number(last) + 1);
//             if (returnNumber.length === 1) {
//               // console.log("00" + returnNumber)
//               lastDigit = "00" + returnNumber;
//               // return "00" + returnNumber;
//             } else if (returnNumber.length === 2) {
//               // console.log("0" + returnNumber)
//               lastDigit = "0" + returnNumber;
//               // return "0" + last;
//             } else if (returnNumber.length === 3) {
//               // console.log(returnNumber)
//               lastDigit = returnNumber;
//               // return last;
//             }
//           } else {
//             lastDigit = "001";
//           }

//           console.log();
//         });

//       await somee1.push(lastDigit);

//       await console.log(lastDigit);
//       await console.log(somee1);
//       await this.setState({
//         fileUrl: somee.join("/"),
//         fileNameStruct: somee1.join("-"),
//       });

//       await console.log(this.state);
//     };

//     const changeValueFileID = async (e, value: any) => {
//       // console.log(value);
//       await this.setState({
//         fileNameStruct: this.state.fileNameStruct,
//       });
//     };


//     const clickGenerate1 = async () => {
//       await console.log(this.state);
//       let somee:any = [];

//       if(this.state.params1.length <= 0) {
//         alert("Please add Department Name before generating ID!")
//       } else if(this.state.params2.length <= 0) {
//         alert("Please add Document Name before generating ID!")
//       } else if(this.state.params5.length <= 0) {
//         alert("Please add Project Name before generating ID!")
//       } else if(this.state.SubfolderState === true && this.state.params4.length <= 0) {
//         alert("Please add Sub Folders Main before generating ID!")
//       } else if(this.state.SubfolderState1 === true && this.state.params3.length <= 0) {
//         alert("Please add Sub Folders before generating ID!")
//       }

//       if (this.state.params1.length > 0) {
//         await console.log(this.state.params1);
//         await somee.push(this.state.params1);
//       }
//       if (this.state.params3.length > 0) {
//         await console.log(this.state.params3);
//         await somee.push(this.state.params3);
//         // await somee1.push(this.state.params3);
//       }
//       if (this.state.params4.length > 0) {
//         await console.log(this.state.params4);
//         await somee.push(this.state.params4);
//       }

//       if (this.state.params2.length > 0) {
//         await console.log(this.state.params2);
//         await somee.push(this.state.params2);
//       }

//       await console.log(somee);
//       await console.log(somee.join("/"));

//       let fileUrl = somee.join("/");
//       const sp:SPFI=getSp()
//       let filesName:any = [];
//       await sp.web
//         .getFolderByServerRelativePath(`/sites/DMSportal/Shared Documents/${fileUrl}`) // Here comes a folder/subfolder path
//         .files
//         .expand('Files/ListItemAllFields,DocID') // For Metadata extraction
//         .select().getAll()              // Fields to retrieve
//         .then(async (item) => {
//            console.log(item);
//            if(item.length > 0) {
//              await item.filter((file) => {
//                 // console.log(file.LinkingUri);
//                 // let files = file.Name.split(".");
//                 filesName.push({key:file.Name,text: file.Name,})
//              })
//            } else if(item.length <= 0) {
//             alert("There is no file inside this folder, please Create New file!")
//            }
//         });

//         await this.setState({
//           fileUrl: somee.join("/"),
//           Filess: filesName
//         });
//     };


//     const changeValue = async (e, value: any) => {
//       console.log(value.text);
//       let ID;
//       let path;
//       const sp:SPFI=getSp()
//       let somss:any = await sp.web.lists.getByTitle("My Docs").items();
//       console.log(somss)
//       await somss.filter((file) => {
//         if (file.fileType === value.text) {
//           ID = file.ID;
//         }
//       })
//       await console.log(ID);

//       // get relative url of file.

//       await sp.web.lists.getByTitle('My Docs')
//         .items.getById(ID)
//         .select('ID,FileRef')
//         .getAll().then((items: any) => {
//           // console.log(items.FileRef);
//           this.setState({
//             downloadUrl: items.FileRef
//           })

//         })


//     }

//     const closeHideDialog = () => {
//       this.setState({
//         openDialog: false,
//         hiddenDialog: true,
//       });
//     };

//     const closeHideDialogUpload = () => {
//       this.setState({
//         openDialogUpload: false,
//         hiddenDialogUpload: true,
//         SubfolderState: false,
//         SubfolderState1: false,
//         fileUrl: "",
//         params1: "",
//         params2: "",
//         params3: "",
//         params4: "",
//         params5: "",
//       });
//       // console.log(this.state.openDialog)
//     };

//     return (
//       <div style={{}}>
//         {/* <div ></div> */}
//         <div
//           style={{
//             flex: "1",
//             flexDirection: "row",
//             //    margin:'2px',
//             //    gap:'3px',
//             // borderStyle: 'dashed',
//             // borderColor: 'black',
//             position: "relative",

//             columnGap: "2px",
//           }}
//         >
//           <PrimaryButton
//             text="Template"
//             style={{ backgroundColor: "#0078D4" }}
//             onClick={toggleHideDialog}
//           />

//           <PrimaryButton
//             text="Upload"
//             style={{
//               // borderStyle: 'dashed',
//               // borderColor: 'black',
//               position: "absolute",
//               left: "86%",
//               backgroundColor: "#0078D4",
//             }}
//             onClick={toggleHideDialogUpload}
//           />
//         </div>

//         <Dialog
//               hidden={this.state.hiddenDialog}
//               // containerClassName={ 'ms-dialogMainOverride ' + styles.textDialog}
//               dialogContentProps={dialogContentProps}
//             >
//               {/* <p>Download template</p> */}
//               <Dropdown
//                 placeholder="Select an option"
//                 label="Select the template"
//                 options={options1}
//                 onChange={changeValue}
//                 styles={dropdownStyles}
//               />
//               <DialogFooter>
//                 <PrimaryButton style={{ backgroundColor: "#0078D4" }} onClick={downloadFile} text="Download" />
//                 <PrimaryButton style={{ backgroundColor: "#0078D4" }} onClick={closeHideDialog} text="Cancel" />
//               </DialogFooter>
//             </Dialog>

//         <Dialog
//           hidden={this.state.hiddenDialogUpload}
//           containerClassName={"ms-dialogMainOverride " + styles.textDialog}
//           dialogContentProps={dialogContentPropsUpload}
//         >
//           <div>
//           <Dropdown
//                   placeholder="Old Files"
//                   label="File type"
//                   options={options}
//                   onChange={changeValueFileType}
//                   styles={dropdownStyles}
//                 />
//           </div>
//           {
//             this.state.valueFileType === "Old Files" ?
//             (
//               <div style={{
//                 marginTop: "30px"
//               }}>
//               <div>
//               {/* <PrimaryButton type="file" name="myFile" id="newfile" text="Choose file" style={{ backgroundColor: "#0078D4" }}/> */}
//               <div
//                   style={{
//                     height: "200px",
//                     // borderStyle: 'dashed',
//                     // borderColor: 'black',
//                     // flexDirection: 'row',
//                     position: "relative",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//               >
//                 <div
//                   style={{
//                     left: "0%",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <Dropdown
//                     placeholder="Select an option"
//                     label="Department Name"
//                     options={this.state.departmentName}
//                     onChange={changeValuedepartmentName}
//                     styles={dropdownStyles}
//                   />
//                 </div>
//                 <div
//                   style={{
//                     left: "30%",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <Dropdown
//                     placeholder="Select an option"
//                     label="Document Name"
//                     options={this.state.documentType}
//                     onChange={changeValuedocumentType}
//                     styles={dropdownStyles}
//                   />
//                 </div>
//                 <div
//                   style={{
//                     left: "60%",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <Dropdown
//                     placeholder="Select an option"
//                     label="Project Name"
//                     options={this.state.ProjectName}
//                     onChange={changeValueProjectName}
//                     styles={dropdownStyles}
//                   />
//                 </div>
//                 {this.state.SubfolderState === true ? (
//                   <div
//                     style={{
//                       left: "0%",
//                       marginTop: "100px",
//                       position: "absolute",
//                       // left: '86%',
//                       // backgroundColor: "#0078D4"
//                     }}
//                   >
//                     <Dropdown
//                       placeholder="Select an option"
//                       label="Sub Folders Main"
//                       options={this.state.SubdepartmentsMain}
//                       onChange={changeValueSubdepartmentsMain}
//                       styles={dropdownStyles}
//                     />
//                   </div>
//                 ) : (
//                   <div></div>
//                 )}
//                 {this.state.SubfolderState1 === true ? (
//                   <div
//                     style={{
//                       marginTop: "100px",
//                       left: "30%",
//                       position: "absolute",
//                       // left: '86%',
//                       // backgroundColor: "#0078D4"
//                     }}
//                   >
//                     <Dropdown
//                       placeholder="Select an option"
//                       label="Sub Folders"
//                       options={this.state.Subdepartments}
//                       onChange={changeValueSubdepartments}
//                       styles={dropdownStyles}
//                     />
//                   </div>
//                 ) : (
//                   <div></div>
//                 )}

//                 {this.state.SubfolderState1 === false ? (
//                   <div
//                     style={{
//                       marginTop: "130px",
//                       left: "30%",
//                       position: "absolute",
//                       // left: '86%',
//                       // backgroundColor: "#0078D4"
//                     }}
//                   >
//                     <PrimaryButton
//                       text="Generate ID"
//                       style={{ backgroundColor: "#0078D4" }}
//                       onClick={clickGenerate1}
//                     />
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       marginTop: "130px",
//                       left: "60%",
//                       position: "absolute",
//                       // left: '86%',
//                       // backgroundColor: "#0078D4"
//                     }}
//                   >
//                     <PrimaryButton
//                       text="Generate ID"
//                       style={{ backgroundColor: "#0078D4" }}
//                       onClick={clickGenerate1}
//                     />
//                   </div>
//                 )}

//               </div>
//               <div style={{
//                 marginBottom: "30px",
//                 position: "relative",
//               }}>
//               <Dropdown
//                       placeholder="Select File"
//                       label="Select File"
//                       options={this.state.Filess}
//                       onChange={changeSalectFilename}
//                       style={{
//                         width: "50%",
//                       }}
//                     />
//               </div>
//               <div style={{
//                 marginTop:"50px"
//               }}>
//               <input type="file" name="myFile" id="newfile"></input>
//               </div>
//               <div style={{
//                 marginTop:"20px"
//               }}>
//                 <TextField
//                   label="File name"
//                   defaultValue={this.state.filenames}
//                   onChange={changeValueFilename}
//                 />
//                 <TextField
//                   label="File description"
//                   defaultValue={this.state.fileDes}
//                   multiline
//                   rows={3}
//                   onChange={changeValueFileDescription}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <PrimaryButton
//                 text="Upload"
//                 style={{ backgroundColor: "#0078D4" }}
//                 onClick={this.filesave}
//               />
//               <PrimaryButton
//                 style={{ backgroundColor: "#0078D4" }}
//                 onClick={closeHideDialogUpload}
//                 text="Cancel"
//               />
//             </DialogFooter>
//             </div>
//             ) :
//             (
//             <div style={{
//               marginTop: "30px"
//             }}>
//             <div>
//             {/* <PrimaryButton type="file" name="myFile" id="newfile" text="Choose file" style={{ backgroundColor: "#0078D4" }}/> */}
//             <div
//                 style={{
//                   height: "200px",
//                   // borderStyle: 'dashed',
//                   // borderColor: 'black',
//                   // flexDirection: 'row',
//                   position: "relative",
//                   // left: '86%',
//                   // backgroundColor: "#0078D4"
//                 }}
//             >
//               <div
//                 style={{
//                   left: "0%",
//                   position: "absolute",
//                   // left: '86%',
//                   // backgroundColor: "#0078D4"
//                 }}
//               >
//                 <Dropdown
//                   placeholder="Select an option"
//                   label="Department Name"
//                   options={this.state.departmentName}
//                   onChange={changeValuedepartmentName}
//                   styles={dropdownStyles}
//                 />
//               </div>
//               <div
//                 style={{
//                   left: "30%",
//                   position: "absolute",
//                   // left: '86%',
//                   // backgroundColor: "#0078D4"
//                 }}
//               >
//                 <Dropdown
//                   placeholder="Select an option"
//                   label="Document Name"
//                   options={this.state.documentType}
//                   onChange={changeValuedocumentType}
//                   styles={dropdownStyles}
//                 />
//               </div>
//               <div
//                 style={{
//                   left: "60%",
//                   position: "absolute",
//                   // left: '86%',
//                   // backgroundColor: "#0078D4"
//                 }}
//               >
//                 <Dropdown
//                   placeholder="Select an option"
//                   label="Project Name"
//                   options={this.state.ProjectName}
//                   onChange={changeValueProjectName}
//                   styles={dropdownStyles}
//                 />
//               </div>
//               {this.state.SubfolderState === true ? (
//                 <div
//                   style={{
//                     left: "0%",
//                     marginTop: "100px",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <Dropdown
//                     placeholder="Select an option"
//                     label="Sub Folders Main"
//                     options={this.state.SubdepartmentsMain}
//                     onChange={changeValueSubdepartmentsMain}
//                     styles={dropdownStyles}
//                   />
//                 </div>
//               ) : (
//                 <div></div>
//               )}
//               {this.state.SubfolderState1 === true ? (
//                 <div
//                   style={{
//                     marginTop: "100px",
//                     left: "30%",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <Dropdown
//                     placeholder="Select an option"
//                     label="Sub Folders"
//                     options={this.state.Subdepartments}
//                     onChange={changeValueSubdepartments}
//                     styles={dropdownStyles}
//                   />
//                 </div>
//               ) : (
//                 <div></div>
//               )}

//               {this.state.SubfolderState1 === false ? (
//                 <div
//                   style={{
//                     marginTop: "130px",
//                     left: "30%",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <PrimaryButton
//                     text="Generate ID"
//                     style={{ backgroundColor: "#0078D4" }}
//                     onClick={clickGenerate}
//                   />
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     marginTop: "130px",
//                     left: "60%",
//                     position: "absolute",
//                     // left: '86%',
//                     // backgroundColor: "#0078D4"
//                   }}
//                 >
//                   <PrimaryButton
//                     text="Generate ID"
//                     style={{ backgroundColor: "#0078D4" }}
//                     onClick={clickGenerate}
//                   />
//                 </div>
//               )}
//             </div>
//             <div style={{
//               marginBottom: "30px",
//               position: "relative",
//             }}>
//               <div style={{
//               // marginTop: "130px",
//               left: "0%",
//               position: "absolute",
//             }}>
//             <TextField
//                 label="ID (Please copy the generated ID before uploading)"
//                 disabled
//                 value={this.state.fileNameStruct}
//                 // style={{
//                 //   width:"50%",
//                 // }}
//                 defaultValue={this.state.fileNameStruct}
//                 onChange={changeValueFileID}
//               />
//               </div>
//               <div style={{
//               marginTop: "31px",
//               left: "45%",
//               position: "absolute",
//             }}>
//               <PrimaryButton
//                     text="Copy"
//                     style={{ backgroundColor: "#0078D4" }}
//                     onClick={async() => {
//                       navigator.clipboard.writeText(this.state.fileNameStruct)
//                       await alert("ID copied successfully!");
//                     }}
//                   />
//               </div>
//             </div>
//             <div style={{
//               marginTop:"100px"
//             }}>
//             <input type="file" name="myFile" id="newfile"></input>
//             </div>
//             <div style={{
//               marginTop:"20px"
//             }}>
//               <TextField
//                 label="File name"
//                 defaultValue={this.state.filenames}
//                 onChange={changeValueFilename}
//               />
//               <TextField
//                 label="File description"
//                 defaultValue={this.state.fileDes}
//                 multiline
//                 rows={3}
//                 onChange={changeValueFileDescription}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <PrimaryButton
//               text="Upload"
//               style={{ backgroundColor: "#0078D4" }}
//               onClick={this.filesave}
//             />
//             <PrimaryButton
//               style={{ backgroundColor: "#0078D4" }}
//               onClick={closeHideDialogUpload}
//               text="Cancel"
//             />
//           </DialogFooter>
//           </div>
//           )
// }
//         </Dialog>
//         <div>
//           <div style={{ margin: "35px" }}></div>
//           <Table responsive>
//             <thead>
//               <tr>
//                 {/* <th>#</th> */}
//                 {/* {Array.from({ length: 12 }).map((_, index) => ( */}
//                 <th>Name</th>
//                 <th>File title</th>
//                 <th>File Description</th>
//                 <th>File type</th>
//                 <th>File upload date</th>
//                 <th>Approval status</th>
//                 <th>View</th>
//                 {/* ))} */}
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.fileArray.map((fileDetails, index) => (
//                 <tr>
//                   <td key={index}>{fileDetails.Filename}</td>
//                   <td key={index}>{fileDetails.FileTitle}</td>
//                   <td key={index}> {fileDetails.Filedescription}</td>
//                   <td key={index}>{fileDetails.Filetype}</td>
//                   <td key={index}>{fileDetails.FileUploadDate}</td>
//                   <td key={index}>{fileDetails.ApprovalStatus}</td>

//                   <div>
//             <PrimaryButton text="View" style={{ backgroundColor: "#0078D4" }} href={fileDetails.Fileurl}  />
//             </div>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//         <div>
//           <div style={{ margin: "35px" }}></div>
//         </div>
//       </div>
//     );
//   }

//   private async filesave() {
//     console.log(this.state.filenames.length);
//     console.log(this.state.fileDes.length);

//     if(this.state.filenames.length <= 0) {
//       alert("Please give an file name")
//     } else if(this.state.fileDes.length <= 0) {
//       alert("Please give an file Description")
//     }


//     let myfile:any = (document.querySelector("#newfile") as HTMLInputElement);
//     // console.log(myfile);
//     if (myfile.size <= 10485760) {
//       let web:any = Web("https://m365x44410739.sharepoint.com/sites/DMSportal");

//       // create item in an sp list
//       //       let somss = await web.lists.getByTitle("User Files").items();
//       // console.log(somss)
//       await console.log(myfile.name);
//       let fileexe = myfile.name.split(".")[1];

//       await web
//         .getFolderByServerRelativePath(
//           `/sites/DMSportal/Shared Documents/${this.state.fileUrl}`
//         )
//         .files.add(`${this.state.fileNameStruct}.${fileexe}`, myfile, true)
//         .then((f) => {
//           // console.log("File Uploaded");
//           f.file.getItem().then(async(item) => {

//               //get item from sp



//             await item
//               .update({
//                 FileDescription: this.state.fileDes,
//                 FileName: this.state.filenames,
//                 DocID: String(this.state.DocID + 1),
//               })
//               .then(async (myupdate) => {
//                 console.log(myupdate);
//                 // console.log("Metadata Updated");
//               });


//               await item.get().then(async (myupdate) => {
//                 console.log(myupdate);
//                 await this.setState({
//                   fileIDs:myupdate.ID
//                 })
//                 // console.log("Metadata Updated");
//               });


//           });
//         });
//         this.state.fileUrl
//         let fileurl = "";
//         await web
//         .getFolderByServerRelativePath(`/sites/DMSportal/Shared Documents/${this.state.fileUrl}`) // Here comes a folder/subfolder path
//         .files
//         .expand('Files/ListItemAllFields,DocID') // For Metadata extraction
//         .select()              // Fields to retrieve
//         .get().then(async (item) => {
//            console.log(item);
//            await item.filter((file) => {
//               console.log(file.LinkingUri);
//               if(file.Name === `${this.state.fileNameStruct}.${fileexe}`) {
//                 fileurl = file.LinkingUri;
//               }
//            })
//         });

//         await web.lists
//         .getByTitle("User Files")
//         .items.add({
//           Filename: `${this.state.fileNameStruct}.${fileexe}`,
//           FileTitle: this.state.filenames,
//           Filetype: this.state.params2,
//           Filedescription: this.state.fileDes,
//           FileUploadDate: formatDate(new Date()),
//           ApprovalStatus: "QMS",
//           RequestorEmail: this.state.CurrentUser,
//           Fileurl: fileurl,
//           DocID:  String(this.state.DocID + 1),
//         })
//         .then(async (i) => {
//           await console.log(i);
//         });

//     //     console.log(this.state);
//     //     await web.lists.getById("380").rootFolder.files.get().then(t => {
//     // //add your code here if you want to do more after deleting the file
//     //     console.log(t);
//     //     });

//       await alert("Created Successfully");
//     } else {
//       const sp:SPFI=getSp()
//       await console.log(myfile.name);
//       let fileexe = myfile.name.split(".")[1];
//       await sp.web.lists
//         .getByTitle("Documents")
//         .rootFolder.files.addChunked(myfile.name, myfile)
//         .then((f) => {
//           // console.log("File Uploaded");
//           f.file.getItem().then(async(item) => {

//               //get item from sp



//             await item
//               .update({
//                 FileDescription: this.state.fileDes,
//                 FileName: this.state.filenames,
//                 DocID: String(this.state.DocID + 1),
//               })
//               .then(async (myupdate) => {
//                 console.log(myupdate);
//                 // console.log("Metadata Updated");
//               });


//               await item.getAll().then(async (myupdate) => {
//                 console.log(myupdate);
//                 await this.setState({
//                   fileIDs:myupdate.ID
//                 })
//                 // console.log("Metadata Updated");
//               });


//           });
//         });
//         this.state.fileUrl
//         let fileurl = "";
//         await sp.web
//         .getFolderByServerRelativePath(`/sites/DMSportal/Shared Documents/${this.state.fileUrl}`) // Here comes a folder/subfolder path
//         .files
//         .expand('Files/ListItemAllFields,DocID') // For Metadata extraction
//         .select()              // Fields to retrieve
//         .get().then(async (item) => {
//            console.log(item);
//            await item.filter((file) => {
//               console.log(file.LinkingUri);
//               if(file.Name === `${this.state.fileNameStruct}.${fileexe}`) {
//                 fileurl = file.LinkingUri;
//               }
//            })
//         });

//         await sp.web.lists
//         .getByTitle("User Files")
//         .items.add({
//           Filename: `${this.state.fileNameStruct}.${fileexe}`,
//           FileTitle: this.state.filenames,
//           Filetype: this.state.params2,
//           Filedescription: this.state.fileDes,
//           FileUploadDate: formatDate(new Date()),
//           ApprovalStatus: "QMS",
//           RequestorEmail: this.state.CurrentUser,
//           Fileurl: fileurl,
//           DocID:  String(this.state.DocID + 1),
//         })
//         .then(async (i) => {
//           await console.log(i);
//         });

//     //     console.log(this.state);
//     //     await web.lists.getById("380").rootFolder.files.get().then(t => {
//     // //add your code here if you want to do more after deleting the file
//     //     console.log(t);
//     //     });

//       await alert("Created Successfully");
//     }

//     await this.setState({
//       openDialogUpload: false,
//       hiddenDialogUpload: true,
//       SubfolderState: false,
//       SubfolderState1: false,
//       fileUrl: "",
//       params1: "",
//       params2: "",
//       params3: "",
//       params4: "",
//       params5: "",
//     });
//   }



// }

