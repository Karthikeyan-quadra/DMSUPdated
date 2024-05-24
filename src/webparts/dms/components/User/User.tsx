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
import Cancel from "../../../../Images/Cancel.png";
import CheckMark from "../../../../Images/CheckMark.png";

import { folderFromServerRelativePath } from "@pnp/sp/folders";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Layout,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import { Input } from "antd";

import { TextField } from "@fluentui/react/lib/TextField";
import ReactTable from "react-table";
// import Navbar from './Navbar/Navbar';
import { ISharingResult, SharingRole, SharingLinkKind } from "@pnp/sp/sharing";
// import { Button, Table } from "react-bootstrap";
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

import { getUserDetails } from "../Data/GetSiteList";
import { useEffect, useState } from "react";

import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";

var date = new Date();

const options: IDropdownOption[] = [
  { key: "Old Files", text: "Old Files" },
  { key: "New Files", text: "New Files" },
];

const modelProps = {
  isBlocking: false,
};

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

const options1: any[] = [
  { key: "Manual", text: "Manual" },
  { key: "Policy", text: "Policy" },
  { key: "SOP", text: "SOP" },
  { key: "Work Instruction", text: "Work Instruction" },
  { key: "MSOP", text: "MSOP" },
  { key: "Form", text: "Form" },
];

const chooose: any[] = [];

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const { Search } = Input;

const columns: any = [
  {
    title: "File Name",
    dataIndex: "FileTitle",
    width: "14%",
    align: "left",
    resizable: true,
    responsive: ["md", "lg"],
    ellipsis: true,
  },
  {
    title: "Document ID",
    dataIndex: "Filename",
    width: "32%",
    align: "left",
    resizable: true,
    ellipsis: true,
  },
  {
    title: "Uploaded Date",
    dataIndex: "FileUploadDate",
    width: "12%",
    align: "left",
    resizable: true,
  },

  {
    title: "Approver",
    dataIndex: "ApprovalStatus",
    width: "11%",
    align: "left",
    resizable: true,
  },
  {
    title: "Status",
    dataIndex: "Status",
    width: "10%",
    align: "left",
    resizable: true,
  },

  {
    title: "View",
    dataIndex: "Fileurl",
    width: "8%",
    align: "left",
    resizable: true,
    render: (text, record) => (
      <img
        src={require("../../../../Images/Eye.png")}
        alt="View"
        onClick={() => window.open(record.Fileurl, "_blank")}
      />
    ),
  },
];

const styl = `:where(.css-usln0u).ant-table-wrapper table, :where(.css-dev-only-do-not-override-usln0u).ant-table-wrapper table{
  width: 100%;
  text-align: start;
  border-radius: 8px 8px 0 0;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed !important;
}

:where(.css-dev-only-do-not-override-usln0u).ant-form-item .ant-form-item-control-input-content {
  flex: auto;
  max-width: 100%;
  width:100%;
}

:where(.css-dev-only-do-not-override-usln0u).ant-upload-wrapper .ant-upload-select {
  display: inline-block;
  width: 30%;
}

:where(.css-dev-only-do-not-override-usln0u).ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
  border-color: rgba(74, 173, 146, 1);
  background-color: rgba(74, 173, 146, 1);
}
`;

export default function User(props) {
  const [form] = useForm(); // Access the form instance

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpload, setOpenDialogUpload] = useState(false);
  const [fileIDs, setFileIDs] = useState("");
  const [hiddenDialogUpload, setHiddenDialogUpload] = useState(true);
  const [hiddenDialog, setHiddenDialog] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [filenames, setFilenames] = useState("");
  const [fileDes, setFileDes] = useState("");
  const [departmentName, setDepartmentName] = useState<any>([]);
  const [documetntype, setDocumetntype] = useState("");
  const [documentType, setDocumentType] = useState([]);
  const [ProjectName, setProjectName] = useState([]);
  const [SubdepartmentsMain, setSubdepartmentsMain] = useState<any>([]);
  const [Filess, setFiless] = useState([]);
  const [SubdepartmentsMain2, setSubdepartmentsMain2] = useState([]);
  const [Subdepartments2, setSubdepartments2] = useState<any>([]);
  const [choose, setChoose] = useState<any>(false);
  const [Subdepartments, setSubdepartments] = useState([]);
  const [SubfolderState, setSubfolderState] = useState(false);
  const [SubfolderState1, setSubfolderState1] = useState(false);
  const [SubfoldersMainParent, setSubfoldersMainParent] = useState<any>([]);
  const [SubfoldersParent, setSubfoldersParent] = useState<any>([]);
  const [fileUrl, setFileUrl] = useState("");
  const [valueFileType, setValueFileType] = useState("New Files");
  const [DocID, setDocID] = useState<any>("");
  const [fileNameStruct, setFileNameStruct] = useState("");
  const [params1, setParams1] = useState<any>("");
  const [params11, setParams11] = useState<any>("");
  const [departmentKey, setDepartmentKey] = useState<any>("");
  const [projectKey, setProjectKey] = useState<any>("");
  const [subFoldersMainKey, setSubFoldersMainKey] = useState("");
  const [params111, setParams111] = useState<any>("");
  const [documentKey, setDocumentKey] = useState<any>("");
  const [Uploading, setUploading] = useState(false);
  const [DownloadURI, setDownloadURI] = useState(true);
  const [params22, setParams22] = useState<any>("");
  const [params2, setParams2] = useState<any>("");
  const [params3, setParams3] = useState<any>("");
  const [params4, setParams4] = useState<any>("");
  const [params5, setParams5] = useState<any>("");
  const [some, setSome] = useState<any>([]);
  const [CurrentUser, setCurrentUser] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [overalllist, setOveralllist] = useState([]);
  const [items, setItems] = useState([]);
  const [fileess, setFileess] = useState<any>([]);
  const [showFirstItem, setShowFirstItem] = useState(false);
  const [count, setCount] = useState<any>();
  const [value, setValue] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [showUploadDiv, setShowUploadDiv] = useState(true); // State to manage the visibility of upload div

  const [showTemplateDiv, setshowTemplateDiv] = useState(true);

  const [radiovalue, setRadioValue] = useState("New Files");
  const [disablesubmit, setDisableSubmit] = useState(false);

  const openNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Uploaded</span>
      ),
      description: "You have uploaded the file successfully",
      placement: "top",
      icon: <img src={CheckMark} alt="Success" style={{ width: "20%" }} />,
    });
  };

  const openCopiedNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Copied</span>
      ),
      description: "You had copied the ID",
      placement: "top",
      icon: <img src={CheckMark} alt="Success" style={{ width: "20%" }} />,
    });
  };

  const openDepartmentNotification = () => {
    notification.info({
      message: "",
      description: "Please select Department Name",
      placement: "top",
    });
  };

  const openDocumentNotification = () => {
    notification.info({
      message: "",
      description: "Please select Document Name",
      placement: "top",
    });
  };

  const openSubFoldersMaintNotification = () => {
    notification.info({
      message: "",
      description: "Please select Sub Folders Main",
      placement: "top",
    });
  };

  const openSubFolderstNotification = () => {
    notification.info({
      message: "",
      description: "Please select Sub Folders ",
      placement: "top",
    });
  };

  const openNofileNotification = () => {
    notification.info({
      message: "",
      description: (
        <div>
          <p>There is no file inside this folder.</p>
          <p>Please create a new file!</p>
        </div>
      ),
      placement: "top",
    });
  };

  const fetchData = async () => {
    try {
      const sp: SPFI = getSp();

      // Fetch user details
      const userDetails = await getUserDetails();
      console.log(userDetails);
      const uploadValue = userDetails.length > 0 && userDetails[0].Fileuploader;
      console.log("User details:", userDetails);
      console.log("Upload value:", uploadValue);

      // Fetch current user
      let user = await sp.web.currentUser();
      console.log("Current user email:", user.Email);

      // Fetch user files
      const userFiles = await sp.web.lists
        .getByTitle("User Files")
        .items.select(
          "File,Filetype,Filename,FileTitle,Filedescription,FileUploadDate,ApprovalStatus,Fileurl,Status,Requester"
        )
        .expand("File")
        .getAll();

      console.log("User files:", userFiles);

      // Reverse the order of fetched files
      const y: any = [...userFiles].reverse();

      // Set state with fetched data
      setValue(y);
      setCount(y.length);
      setItems(y.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
      setOveralllist(y);

      setShowFirstItem(uploadValue === "true");
      setCount(y.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const toggleUploadDiv = () => {
    console.log("Upload button clicked");
    setShowUploadDiv(!showUploadDiv);
    console.log(showUploadDiv);
  };

  const toggletemplateDiv = () => {
    console.log("Template button clicked");
    setshowTemplateDiv(!showTemplateDiv);
    console.log(showTemplateDiv);
  };

  const onClose = () => {
    setshowTemplateDiv(false);
    form.resetFields();
  };

  useEffect(() => {
    toggleUploadDiv();
    console.log(showUploadDiv);
    toggletemplateDiv();
    console.log(showTemplateDiv);
  }, []);

  useEffect(() => {
    console.log(radiovalue);
    setValueFileType(radiovalue);
    console.log(valueFileType);
  }, [radiovalue]);

  useEffect(() => {
    console.log(radiovalue);
  }, []);

  const onChange = (e: any) => {
    console.log("Radio checked", e.target.value);
    setRadioValue(e.target.value);
    console.log(radiovalue);
    setValueFileType(e.target.value);
    setSubfolderState(false);
    setSubfolderState1(false);
    setFileDes("");
    setFilenames("");
    setFileUrl("");
    setParams1("");
    setParams2("");
    setParams3("");
    setParams4("");
    setParams5("");
    setDepartmentKey("");
    setDocumentKey("");
    setProjectKey("");
    setSubFoldersMainKey("");
    setParams22("");
    setParams11("");
    setParams111("");
    setFiless([]);
    setFileNameStruct("");
    console.log(valueFileType);
    console.log(radiovalue);
    form.resetFields();
  };

  const fetchAdditionalData = async () => {
    try {
      const sp: SPFI = getSp();

      const userDetails = await getUserDetails();
      console.log(userDetails);
      const uploadValue = userDetails.length > 0 && userDetails[0].Fileuploader;
      console.log(uploadValue);

      let user = await sp.web.currentUser();
      console.log(user.Email);

      await fetchData();
      const items: any[] = await sp.web.lists
        .getByTitle("Project List")
        .items();
      console.log(items.length);

      setDocID(items.length);

      let DepartmentNames: any = [];

      let DocumentType: any = [];
      let ProjectName: any = [];
      let SubDepartments: any = [];
      let SubdepartmentsParents: any = [];
      let SubDepartments1: any = [];
      let SubdepartmentsMain: any = [];
      let SubdepartmentsMain1: any = [];
      let SubdepartmentsMainParents: any = [];

      await sp.web.lists
        .getByTitle("Project List")
        .items.select("ProjectName,ProjectID")
        .getAll()
        .then(async (item) => {
          item.map(async (nn) => {
            await ProjectName.push({ key: nn.ProjectName, text: nn.ProjectID });
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
              key: nn.Code,
              text: nn.Departments,
            });
          });
        });

      await sp.web.lists
        .getByTitle("Document Type")
        .items.select("Documents,Code")
        .getAll()
        .then(async (item) => {
          item.map(async (nn) => {
            await DocumentType.push({ key: nn.Code, text: nn.Documents });
          });
        });

      await sp.web.lists
        .getByTitle("Sub departments")
        .items.select("Subfolders,ParentFolder")
        .getAll()
        .then(async (item) => {
          item.map(async (nn) => {
            await SubDepartments1.push({
              text: nn.Subfolders,
              key: nn.ParentFolder,
            });
            await SubdepartmentsParents.push(nn.ParentFolder);
          });

          await console.log(SubdepartmentsParents);
          let uniqueArray = SubdepartmentsParents.filter(function (
            item,
            pos,
            self
          ) {
            return self.indexOf(item) == pos;
          });
          await console.log(uniqueArray);

          setSubfoldersParent(uniqueArray);
        });

      await sp.web.lists
        .getByTitle("Sub departments Main")
        .items.select("SubFolders,ParentFolders,Code")
        .getAll()
        .then(async (item) => {
          item.map(async (nn) => {
            await SubdepartmentsMain1.push({
              SubFolders: nn.SubFolders,
              ParentFolders: nn.ParentFolders,
              Code: nn.Code,
            });

            await SubdepartmentsMainParents.push(nn.ParentFolders);
          });

          await console.log(SubdepartmentsMainParents);
          let uniqueArray = SubdepartmentsMainParents.filter(function (
            item,
            pos,
            self
          ) {
            return self.indexOf(item) == pos;
          });

          setSubfoldersMainParent(uniqueArray);
        });

      setDepartmentName(DepartmentNames);
      setDocumentType(DocumentType);
      setSubdepartmentsMain(SubdepartmentsMain);
      setSubdepartmentsMain2(SubdepartmentsMain1);
      setSubdepartments(SubDepartments);
      setSubdepartments2(SubDepartments1);
      setProjectName(ProjectName);
      setCurrentUser(user.Email);
      setShowFirstItem(uploadValue === "true");

      console.log("SubdepartmentsMain:", SubdepartmentsMain);
      console.log("SubDepartments1:", SubDepartments1);
      console.log("ProjectName:", ProjectName);
    } catch (error) {
      console.error("Error in fetchAdditionalData:", error);
    }
  };
  useEffect(() => {
    fetchAdditionalData();
  }, []);

  const _onFilter = (text: any) => {
    const filtered: any = overalllist.filter(
      (item: any) =>
        item.FileTitle.toLowerCase().includes(text.toLowerCase()) ||
        item.Status.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

  const _getKey = (item: any, index: any) => {
    return item.key;
  };

  const RowsPerPage = (value: any) => {
    setRowsPerPage(value);
  };

  const Page = (value) => {
    setPage(value);
    setItems(value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  };

  var sss: any = [];

  const changeValuedepartmentName = async (event: any, value: any) => {
    console.log("changeValuedepartmentName function called.");
    console.log("Selected department value:", value);

    try {
      setParams1("");
      setParams3("");
      setParams4("");
      setParams5("");

      const selectedDepartment = value.value;
      const selectedDepartmentKey = value.key;
      console.log("Selected department:", selectedDepartment);
      console.log("Selected department key:", value.key);

      // Check if the selected department has subfolders
      if (SubfoldersMainParent.includes(selectedDepartment)) {
        console.log("Selected department has subfolders.");

        const subfolders = SubdepartmentsMain2.filter(
          (subfolder: any) => subfolder.ParentFolders === selectedDepartment
        ).map((subfolder: any) => ({
          text: subfolder.SubFolders,
          key: subfolder.SubFolders,
          Code: subfolder.Code,
        }));

        console.log("SubdepartmentsMain array:", subfolders);

        setSubfolderState(true);
        setSubdepartmentsMain(subfolders);
        setParams111(value.key);
        setParams11(selectedDepartment);
        setDepartmentKey(selectedDepartmentKey);
        setSome([selectedDepartment]);
      } else {
        console.log("Selected department does not have subfolders.");

        setSubfolderState(false);
        setParams111(value.key);
        setParams11(selectedDepartment);
      }
    } catch (error) {
      console.error("Error in changeValuedepartmentName:", error);
    }
  };

  const changeValuedocumentType = async (event: any, value: any) => {
    console.log(value);
    const selectedDocumentKey: any = value.key;
    console.log("Selected department:", selectedDocumentKey);

    setParams2(value.key);
    setParams22(value.value);
    setDocumentKey(selectedDocumentKey);
  };

  const changeValueProjectName = async (event: any, value: any) => {
    console.log(value);
    const selectedProjectKey: any = value.key;
    console.log("Selected department:", selectedProjectKey);

    setParams5(value.value);
    setProjectKey(selectedProjectKey);
  };

  const changeValueSubdepartmentsMain = async (event: any, value: any) => {
    console.log("Selected value:", value);

    const SubDepartmentmainkey: any = value.key;
    console.log("Selected department key:", SubDepartmentmainkey);
    console.log("Selected department text:", value.value);

    if (SubfoldersParent.includes(value.text)) {
      let array1 = Subdepartments2.filter(
        (names: any) => names.ParentFolders === value.value
      ).map((subfolder: any) => ({
        text: subfolder.SubFolders,
        key: subfolder.SubFolders,
      }));
      console.log("Filtered subfolders:", array1);

      setSubfolderState1(true);
      setSubdepartments(array1);
      setParams1(value.key);
      setParams3(value.value);
    } else {
      setSubfolderState1(false);
      setParams1(value.key);
      setParams3(value.value);
      setSubFoldersMainKey(SubDepartmentmainkey);
    }
  };

  const changeValueSubdepartments = async (value: any) => {
    if (SubfolderState1 === true) {
      await sss.push(...sss, value.text);
      console.log(sss);
    }

    setParams4(value.text);
    setSome([value.text]);
    console.log(params4);
    console.log(some);
  };

  const changeSelectFilename = async (e, value: any) => {
    console.log(value);
    let testFile = value.value.split(".")[0];
    console.log(testFile);

    setFileNameStruct(testFile);
    console.log(fileNameStruct);
  };
  console.log(fileNameStruct);

  const changeValueFilename = (e: any, value: any) => {
    // Update the filenames state with the new value entered in the input
    setFilenames(e.target.value);
    console.log(filenames);
  };

  const changeFile = (info) => {
    // Extract the fileList from info
    const { fileList } = info;

    // Convert the fileList array to a FileList object
    const fileArray = fileList.map((file) => file.originFileObj);
    const filelistObject = new DataTransfer();
    fileArray.forEach((file) => {
      filelistObject.items.add(file);
    });

    // Set the file list using the constructed FileList object
    setFileess(filelistObject.files);
    console.log(fileess);
  };
  console.log(fileess);

  const changeValueFileDescription = (e: any, value: any) => {
    // Update the filenames state with the new value entered in the input
    setFileDes(e.target.value);
    console.log(fileDes);
  };

  const downloadFile = async () => {
    //download xl file
    const sp: SPFI = getSp();

    console.log(downloadUrl);
    console.log(downloadUrl.split("/")[4]);
    let fileName = downloadUrl.split("/")[4];

    try {
      await sp.web
        .getFileByServerRelativePath(downloadUrl)
        .getBuffer()
        .then((buffer: ArrayBuffer) => {
          const blob = new Blob([buffer]);
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${fileName}`;
          link.click();
          chooose.length = 0;
        });

      setOpenDialog(false);
      setHiddenDialog(true);
      setDownloadUrl("");
      setChoose(false);
      setDownloadURI(true);
    } catch (e) {
      alert("Something went wrong, Try again later !");
    }
    onClose();
  };

  const clickGenerate = async () => {
    console.log("clickGenerate function called");

    let somee: any = [];
    let somee1: any = [];
    let somee2: any = [];
    let lastDigit: any = "";
    console.log(params111);
    console.log(params111.length);

    if (params111.length <= 0) {
      alert("Please add Department Name before generating ID!");
    } else if (params2.length <= 0) {
      alert("Please add Document Name before generating ID!");
    } else if (params5.length <= 0) {
      alert("Please add Project Name before generating ID!");
    } else if (SubfolderState === true && params3.length <= 0) {
      alert("Please add Sub Folders Main before generating ID!");
    } else if (SubfolderState1 === true && params4.length <= 0) {
      alert("Please add Sub Folders before generating ID!");
    } else {
      if (params5.length > 0) {
        somee1.push("TEPL");
        somee1.push(params5);
      }
      if (params111.length > 0) {
        somee.push(params111);
        somee1.push(params111);
        if (params1.length > 0) {
          somee1.push(params1);
        }
        somee2.push(params11);
      }
      if (params3.length > 0) {
        somee.push(params3);
        somee2.push(params3);
      }
      if (params4.length > 0) {
        somee.push(params4);
        somee2.push(params4);
      }
      if (params2.length > 0) {
        somee.push(params2);
        somee1.push(params2);
        somee2.push(params22);
      }

      console.log(somee);
      console.log(somee.join("/"));
      console.log(somee1.join("-"));
      console.log(somee2.join("/"));

      const sp: SPFI = getSp();
      const documentLibraryName = "Shared Documents1";

      const folders = somee2.join("/").split("/");
      let currentFolderPath = `/sites/DMS-Quadra/${documentLibraryName}`;

      for (const folderName of folders) {
        try {
          currentFolderPath += `/${folderName}`;
          console.log(currentFolderPath);
          const folder = await sp.web.getFolderByServerRelativePath(
            currentFolderPath
          )();
          console.log("folder:", folder);
          console.log(
            `Folder "${folderName}" already exists at path: ${currentFolderPath}`
          );
        } catch (error) {
          console.error(
            `Folder "${folderName}" doesn't exist at path: ${currentFolderPath}`
          );
        }
      }

      let allFiles: any = await sp.web.lists
        .getByTitle("Shared Documents")
        .items.select("ID", "FileRef")
        .getAll();
      console.log(allFiles);

      let filesInFolder = allFiles.filter((file) =>
        file.FileRef.includes(currentFolderPath)
      );
      console.log("filesInFolder:", filesInFolder);

      let fileIDs = filesInFolder.map((file) => file.ID);
      console.log("File IDs in the folder:", fileIDs);

      let maxId;
      if (fileIDs.length === 0) {
        maxId = 0;
      } else {
        maxId = Math.max(...fileIDs);
      }

      let returnNumber = (maxId + 1).toString().padStart(4, "0");
      lastDigit = returnNumber;

      somee1.push(lastDigit);
      console.log("Generated ID:", lastDigit);
      console.log(somee1);

      setFileUrl(somee2.join("/"));
      setFileNameStruct(somee1.join("-"));
    }
  };

  const changeValueFileID = async (e, value: any) => {
    setFileNameStruct(fileNameStruct);
  };

  const clickGenerate1 = async () => {
    let somee: any = [];
    let somee1: any = [];
    console.log(params4);
    if (params111.length <= 0) {
      openDepartmentNotification();
    } else if (params2.length <= 0) {
      openDocumentNotification();
    } else if (SubfolderState === true && params3.length <= 0) {
      openSubFoldersMaintNotification();
    } else if (SubfolderState1 === true && params4.length <= 0) {
      openSubFolderstNotification();
    }

    if (params111.length > 0) {
      console.log(params1);
      await somee.push(params11);
    }
    if (params3.length > 0) {
      console.log(params3);
      await somee.push(params3);
    }
    if (params4.length > 0) {
      console.log(params4);
      await somee.push(params4);
    }

    if (params2.length > 0) {
      console.log(params2);
      await somee.push(params22);
    }

    console.log(somee);
    console.log(somee.join("/"));
    let fileUrl: any = somee.join("/");

    console.log(`/sites/DMS-Quadra/Shared Documents1/${fileUrl}`);
    console.log(`${fileUrl}`);

    const sp: SPFI = getSp();
    let filesName: any = [];

    const folder: any = await sp.web
      .getFolderByServerRelativePath(
        `/sites/DMS-Quadra/Original File/${fileUrl}`
      )
      .files.expand("Files/ListItemAllFields,DocID")
      .select()();
    console.log(folder);

    console.log(folder);

    if (folder.length > 0) {
      folder.forEach((file) => {
        filesName.push({ key: file.Name, text: file.Name });
      });
    } else {
      openNofileNotification();
    }

    setFileUrl(somee.join("/"));
    setFiless(filesName);
  };

  const changeValue = async (e, value: any) => {
    console.log("change value function called");
    console.log(value.value);
    console.log(value);
    console.log("chooose:", choose);

    chooose.length = 0;
    console.log("chooose:", chooose.length);

    if (value.value === "Work Instruction") {
      console.log("entyered in WI");

      setChoose(true);
      setDocumetntype(value.value);
      console.log(documentType);

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
        if (i.key === value.value) {
          chooose.push(i);
        }
      });
    } else if (value.value === "MSOP") {
      console.log("entyered in MSOP");

      setChoose(true);
      console.log(choose);
      console.log(value);
      console.log(value.text);
      console.log(value.key);

      setDocumetntype(value.value);

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
        if (i.key === value.value) {
          chooose.push(i);
        }
      });
      console.log(choose);
    } else if (value.value === "Form") {
      console.log("entyered in Form");

      setChoose(true);
      setDocumetntype(value.value);

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
        if (i.key === value.value) {
          chooose.push(i);
          console.log(value.value);
        }
      });
      console.log("chooose:", choose);
    } else {
      let ID;
      let path;
      console.log("entered in else");

      setChoose(false);

      console.log(choose);
      console.log(value.key);
      console.log(value.text);

      const sp: SPFI = getSp();
      let somss: any = await sp.web.lists.getByTitle("My Docs").items();
      console.log(somss);
      let filteredFile = somss.filter((file: any) => {
        console.log(file);
        console.log(file.fileType);
        return file.fileType === value.key;
      });
      console.log(filteredFile);

      await sp.web.lists
        .getByTitle("My Docs")
        .items.getById(filteredFile[0].ID)
        .select("ID,FileRef")()
        .then(async (items: any) => {
          console.log(items.FileRef);

          setDownloadUrl(items.FileRef);
          setDownloadURI(false);
          console.log(items.FileRef);
        });
    }
  };

  const changeValue1 = async (e, value: any) => {
    console.log("changeValue1 function called");
    console.log(value.value);
    console.log(value);
    console.log("Selected Value:", value.key);
    console.log("Selected Text:", value.value);

    let ID;
    let path;
    const sp: SPFI = getSp();
    let somss: any = await sp.web.lists.getByTitle("My Docs").items();
    console.log(somss);
    await somss.filter((file: any) => {
      if (file.fileType === value.value) {
        ID = file.ID;
        console.log(ID);
        console.log(file);
        console.log(value.value);
        console.log(value.text);
        console.log(value.key);
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
        console.log(items.FileRef);

        setDownloadUrl(items.FileRef);
        setDownloadURI(false);
      });
  };

  const handleFileChange = (info) => {
    // Extract the fileList from info
    const { fileList } = info;

    // Convert the fileList array to a FileList object
    const fileArray = fileList.map((file) => file.originFileObj);
    const filelistObject = new DataTransfer();
    fileArray.forEach((file) => {
      filelistObject.items.add(file);
    });

    // Set the file list using the constructed FileList object
    setFileess(filelistObject.files);
  };
  console.log(fileess);

  const filesave = async () => {
    setDisableSubmit(true); // Enable the submit button
    console.log(disablesubmit);

    console.log("filesave function called");
    console.log(filenames.length);
    console.log(fileDes.length);
    console.log(fileNameStruct);

    if (Array.isArray(fileess) && fileess.length > 0) {
      const fileToUpload: any = fileess[0]; // Assuming you want to upload the first file in the array

      console.log(fileToUpload);
    } else if (fileNameStruct.length <= 0) {
      alert("Please generate Id");
    } else if (fileess.length <= 0) {
      alert("Please Choose File");
    } else if (filenames.length <= 0) {
      alert("Please give file name");
    } else if (fileDes.length <= 0) {
      alert("Please give file Description");
    } else {
      console.log(fileNameStruct);
      const fileToUpload: any = fileess[0]; // Assuming you want to upload the first file in the array
      let myfile: any = fileToUpload;
      console.log(myfile);

      setUploading(true);
      console.log(Uploading);

      let Department: any = "";
      let Subdepartment: any = "";

      if (params11.length >= 0) {
        Department = params11;
      } else {
        Department = "";
      }
      if (fileess.length <= 0) {
      }

      if (params3.length >= 0) {
        Subdepartment = params3;
      } else {
        Subdepartment = "";
      }

      if (myfile.size <= 10485760) {
        const sp: SPFI = getSp();

        console.log(myfile.name);

        //This code works
        let fileexe: any = myfile.name.split(".").pop();
        console.log(fileexe);
        console.log(`/sites/DMS-Quadra/Shared Documents1/${fileUrl}`);
        console.log(`${fileNameStruct}.${fileexe}`);

        const folderPath = `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`;
        console.log(folderPath);
        console.log(fileUrl);

        const documentLibraryName = "Shared Documents1";

        // Split the fileUrl string into individual folder names
        const folders = fileUrl.split("/");
        console.log(fileUrl);
        console.log(folders);

        // Initialize the base folder path
        let currentFolderPath = `/sites/DMS-Quadra/${documentLibraryName}`;

        // Iterate over each folder name and create folders
        for (const folderName of folders) {
          try {
            // Update the folder path
            currentFolderPath += `/${folderName}`;

            // Check if the folder already exists
            const folder = await sp.web
              .getFolderByServerRelativePath(currentFolderPath)
              .getItem();
            console.log(
              `Folder "${folderName}" already exists at path: ${currentFolderPath}`
            );
          } catch (error) {
            // Handle the error if the folder doesn't exist
            console.error(
              `Folder "${folderName}" doesn't exist at path: ${currentFolderPath}`
            );
            console.log(
              `Creating folder "${folderName}" at path: ${currentFolderPath}`
            );

            // Attempt to create the folder
            try {
              await sp.web.folders.addUsingPath(currentFolderPath);
              console.log(
                `Folder "${folderName}" created successfully at path: ${currentFolderPath}`
              );
            } catch (error) {
              console.error(`Error creating folder "${folderName}":`, error);
              return;
            }
          }
        }

        await sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(`${fileNameStruct}.${fileexe}`, myfile, {
            Overwrite: true,
          })

          .then(async (f) => {
            await f.file.getItem().then(async (item) => {
              await item
                .update({
                  FileDescription: fileDes,
                  FileName: filenames,
                  DocID: String(DocID + 1),
                })
                .then(async (myupdate) => {
                  console.log(myupdate);
                });

              console.log(item);
            });
          });

        fileUrl;
        let fileurl: any = "";
        await sp.web
          .getFolderByServerRelativePath(
            `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`
          ) // Here comes a folder/subfolder path
          .files.expand("Files/ListItemAllFields,DocID") // For Metadata extraction
          .select() // Fields to retrieve
          ()
          .then(async (item) => {
            console.log(item);
            item.filter((file) => {
              console.log(file);
              console.log(file.LinkingUri);
              if (file.Name === `${fileNameStruct}.${fileexe}`) {
                fileurl = file.LinkingUri;
              }
            });
          });

        console.log(fileIDs);
        date.setDate(date.getDate() + 5);
        let { Title } = await sp.web.currentUser();
        if (valueFileType === "Old Files") {
          console.log(`${fileNameStruct}.${fileexe}`);
          // update item in an sp list
          const items: any[] = await sp.web.lists
            .getByTitle("User Files")
            .items.filter(`Filename eq '${fileNameStruct}.${fileexe}'`)();
          console.log(items);
          const max = items.reduce(function (prev, current) {
            return toTimestamp(prev.Modified) > toTimestamp(current.Modified)
              ? prev
              : current;
          });
          console.log(max);
          await sp.web.lists
            .getByTitle("User Files")
            .items.getById(max.Id)
            .update({
              Filename: `${fileNameStruct}.${fileexe}`,
              FileTitle: filenames,
              Filetype: params2,
              Filedescription: fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              Requester: Title,
              Remainder: formatDate(date),
              RequestorEmail: CurrentUser,
              Fileurl: fileurl,
              DocID: String(DocID + 1),
              Status: "Pending",

              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then((i) => {
              console.log(i);
            });
        } else if (valueFileType === "New Files") {
          await sp.web.lists
            .getByTitle("User Files")
            .items.add({
              Filename: `${fileNameStruct}.${fileexe}`,
              FileTitle: filenames,
              Filetype: params2,
              Filedescription: fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              Requester: Title,
              Remainder: formatDate(date),
              RequestorEmail: CurrentUser,
              Fileurl: fileurl,
              DocID: String(DocID + 1),
              Status: "Pending",

              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then(async (i) => {
              console.log(i);
            });
        }

        await fetchData();
        openNotification();

        setUploading(false);
      } else {
        const sp: SPFI = getSp();
        console.log(myfile.name);
        let fileexe: any = myfile.name.split(".").pop();

        console.log(`/sites/DMS-Quadra/Shared Documents1/${fileUrl}`);

        console.log(`${fileNameStruct}.${fileexe}`);

        await sp.web
          .getFolderByServerRelativePath(
            `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`
          )
          .files.addChunked(myfile.name, myfile)
          .then((f) => {
            f.file.getItem().then(async (item) => {
              await item
                .update({
                  FileDescription: fileDes,
                  FileName: filenames,
                  DocID: String(DocID + 1),
                })
                .then(async (myupdate) => {
                  console.log(myupdate);
                });

              await item().then(async (myupdate) => {
                console.log(myupdate);

                setFileIDs(myupdate.ID);
              });
            });
          });
        fileUrl;

        let fileurl: any = "";

        const folderPath: any = `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`;
        console.log(folderPath);
        console.log(fileUrl);

        const folder: any = sp.web.getFolderByServerRelativePath(folderPath);

        const items: any = await folder.files
          .expand("Files/ListItemAllFields,DocID")
          .select()
          .getAll();

        for (const item of items) {
          console.log(item);
          if (item.Name === `${fileNameStruct}.${fileexe}`) {
            fileurl = item.LinkingUri;
            break;
          }
        }

        console.log(fileIDs);
        let { Title } = await sp.web.currentUser();
        if (valueFileType === "Old Files") {
          // update item in an sp list
          const items: any[] = await sp.web.lists
            .getByTitle("User Files")
            .items.top(1)
            .filter(`Filename eq '${fileNameStruct}.${fileexe}'`)();

          if (items.length > 0) {
            await sp.web.lists
              .getByTitle("User Files")
              .items.getById(items[0].Id)
              .update({
                Filename: `${fileNameStruct}.${fileexe}`,
                FileTitle: filenames,
                Filetype: params2,
                Filedescription: fileDes,
                FileUploadDate: formatDate(new Date()),
                ApprovalStatus: "QMS",
                RequestorEmail: CurrentUser,
                Requester: Title,
                Fileurl: fileurl,
                DocID: String(DocID + 1),
                Status: "Pending",

                RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

                Department: Department,
                SubDepartment: Subdepartment,
              })
              .then((i) => {
                console.log(i);
              });
          }
        } else if (valueFileType === "New Files") {
          await sp.web.lists
            .getByTitle("User Files")
            .items.add({
              Filename: `${fileNameStruct}.${fileexe}`,
              FileTitle: filenames,
              Filetype: params2,
              Filedescription: fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              RequestorEmail: CurrentUser,
              Fileurl: fileurl,
              Requester: Title,
              DocID: String(DocID + 1),
              Status: "Pending",

              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then(async (i) => {
              console.log(i);
            });
        }
        openNotification();

        setUploading(false);
      }

      setOpenDialogUpload(false);
      setHiddenDialogUpload(true);
      setSubfolderState(false);
      setSubfolderState1(false);
      setFileUrl("");
      setFilenames("");
      setFileDes("");
      setFiless([]);
      setParams1("");
      setParams22("");
      setParams11("");
      setParams2("");
      setParams3("");
      setParams4("");
      setParams5("");
      setFileNameStruct("");
      setValueFileType("New Files");
      setFileess([]);
      setDepartmentKey("");
      setDocumentKey("");
      setProjectKey("");
    }
    form.resetFields();
    setDisableSubmit(false);
  };

  const filesaveold = async () => {
    console.log("filesaveold function called");

    console.log("valueFileType:", valueFileType);

    setDisableSubmit(true);
    console.log(filenames.length);
    console.log(fileDes.length);
    console.log(fileNameStruct);

    if (Array.isArray(fileess) && fileess.length > 0) {
      const fileToUpload: any = fileess[0]; // Assuming you want to upload the first file in the array

      console.log(fileToUpload);
    } else if (fileNameStruct.length <= 0) {
      alert("Please click search and select the file");
    } else if (fileess.length <= 0) {
      alert("Please Choose File");
    } else if (filenames.length <= 0) {
      alert("Please give an file name");
    } else if (fileDes.length <= 0) {
      alert("Please give an file Description");
    } else {
      console.log(fileNameStruct);
      const fileToUpload: any = fileess[0]; // Assuming you want to upload the first file in the array
      let myfile: any = fileToUpload;
      console.log(myfile);

      setUploading(true);
      console.log(Uploading);

      let Department: any = "";
      let Subdepartment: any = "";

      if (params11.length >= 0) {
        Department = params11;
      } else {
        Department = "";
      }

      if (params3.length >= 0) {
        Subdepartment = params3;
      } else {
        Subdepartment = "";
      }

      if (myfile.size <= 10485760) {
        const sp: SPFI = getSp();

        console.log(myfile.name);

        //This code works
        let fileexe: any = myfile.name.split(".").pop();
        console.log(fileexe);
        console.log(`/sites/DMS-Quadra/Shared Documents1/${fileUrl}`);

        console.log(`${fileNameStruct}.${fileexe}`);

        const folderPath = `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`;
        console.log(folderPath);
        console.log(fileUrl);
        await sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(`${fileNameStruct}.${fileexe}`, myfile, {
            Overwrite: true,
          })

          .then(async (f) => {
            await f.file.getItem().then(async (item) => {
              await item
                .update({
                  FileDescription: fileDes,
                  FileName: filenames,
                  DocID: String(DocID + 1),
                })
                .then(async (myupdate) => {
                  console.log(myupdate);
                });

              console.log(item);
            });
          });

        fileUrl;
        let fileurl: any = "";
        await sp.web
          .getFolderByServerRelativePath(
            `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`
          ) // Here comes a folder/subfolder path
          .files.expand("Files/ListItemAllFields,DocID") // For Metadata extraction
          .select() // Fields to retrieve
          ()
          .then(async (item) => {
            console.log(item);
            item.filter((file) => {
              console.log(file);
              console.log(file.LinkingUri);
              if (file.Name === `${fileNameStruct}.${fileexe}`) {
                fileurl = file.LinkingUri;
              }
            });
          });

        console.log(fileIDs);
        date.setDate(date.getDate() + 5);
        let { Title } = await sp.web.currentUser();
        if (valueFileType === "Old Files") {
          console.log("Entered into old files section");
          console.log(`${fileNameStruct}.${fileexe}`);
          // update item in an sp list
          const items: any[] = await sp.web.lists
            .getByTitle("User Files")
            .items.filter(`Filename eq '${fileNameStruct}.${fileexe}'`)();
          console.log(items);
          const max = items.reduce(function (prev, current) {
            return toTimestamp(prev.Modified) > toTimestamp(current.Modified)
              ? prev
              : current;
          });
          console.log(max);

          await sp.web.lists
            .getByTitle("User Files")
            .items.getById(max.Id)
            .update({
              Filename: `${fileNameStruct}.${fileexe}`,
              FileTitle: filenames,
              Filetype: params2,
              Filedescription: fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              Requester: Title,
              Remainder: formatDate(date),
              RequestorEmail: CurrentUser,
              Fileurl: fileurl,
              DocID: String(DocID + 1),
              Status: "Pending",

              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then((i) => {
              console.log(i);
            });
        } else if (valueFileType === "New Files") {
          await sp.web.lists
            .getByTitle("User Files")
            .items.add({
              Filename: `${fileNameStruct}.${fileexe}`,
              FileTitle: filenames,
              Filetype: params2,
              Filedescription: fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              Requester: Title,
              Remainder: formatDate(date),
              RequestorEmail: CurrentUser,
              Fileurl: fileurl,
              DocID: String(DocID + 1),
              Status: "Pending",

              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then(async (i) => {
              console.log(i);
            });
        }

        await fetchData();
        openNotification();

        setUploading(false);
      } else {
        const sp: SPFI = getSp();
        console.log(myfile.name);
        let fileexe: any = myfile.name.split(".").pop();

        console.log(`/sites/DMS-Quadra/Shared Documents1/${fileUrl}`);

        console.log(`${fileNameStruct}.${fileexe}`);

        await sp.web
          .getFolderByServerRelativePath(
            `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`
          )
          .files.addChunked(myfile.name, myfile)
          .then((f) => {
            f.file.getItem().then(async (item) => {
              await item
                .update({
                  FileDescription: fileDes,
                  FileName: filenames,
                  DocID: String(DocID + 1),
                })
                .then(async (myupdate) => {
                  console.log(myupdate);
                });

              await item().then(async (myupdate) => {
                console.log(myupdate);

                setFileIDs(myupdate.ID);
              });
            });
          });
        fileUrl;

        let fileurl: any = "";

        const folderPath: any = `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`;
        console.log(folderPath);
        console.log(fileUrl);

        const folder: any = sp.web.getFolderByServerRelativePath(folderPath);

        const items: any = await folder.files
          .expand("Files/ListItemAllFields,DocID")
          .select()
          .getAll();

        for (const item of items) {
          console.log(item);
          if (item.Name === `${fileNameStruct}.${fileexe}`) {
            fileurl = item.LinkingUri;
            break;
          }
        }

        console.log(fileIDs);
        let { Title } = await sp.web.currentUser();
        if (valueFileType === "Old Files") {
          // update item in an sp list
          const items: any[] = await sp.web.lists
            .getByTitle("User Files")
            .items.top(1)
            .filter(`Filename eq '${fileNameStruct}.${fileexe}'`)();

          if (items.length > 0) {
            await sp.web.lists
              .getByTitle("User Files")
              .items.getById(items[0].Id)
              .update({
                Filename: `${fileNameStruct}.${fileexe}`,
                FileTitle: filenames,
                Filetype: params2,
                Filedescription: fileDes,
                FileUploadDate: formatDate(new Date()),
                ApprovalStatus: "QMS",
                RequestorEmail: CurrentUser,
                Requester: Title,
                Fileurl: fileurl,
                DocID: String(DocID + 1),
                Status: "Pending",

                RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

                Department: Department,
                SubDepartment: Subdepartment,
              })
              .then((i) => {
                console.log(i);
              });
          }
        } else if (valueFileType === "New Files") {
          await sp.web.lists
            .getByTitle("User Files")
            .items.add({
              Filename: `${fileNameStruct}.${fileexe}`,
              FileTitle: filenames,
              Filetype: params2,
              Filedescription: fileDes,
              FileUploadDate: formatDate(new Date()),
              ApprovalStatus: "QMS",
              RequestorEmail: CurrentUser,
              Fileurl: fileurl,
              Requester: Title,
              DocID: String(DocID + 1),
              Status: "Pending",

              RelativeURL: `/sites/DMS-Quadra/Shared Documents1/${fileUrl}`,

              Department: Department,
              SubDepartment: Subdepartment,
            })
            .then(async (i) => {
              console.log(i);
            });
        }

        openNotification();

        setUploading(false);
      }

      setOpenDialogUpload(false);
      setHiddenDialogUpload(true);
      setSubfolderState(false);
      setSubfolderState1(false);
      setFileUrl("");
      setFilenames("");
      setFileDes("");
      setFiless([]);
      setParams1("");
      setParams22("");
      setParams11("");
      setParams2("");
      setParams3("");
      setParams4("");
      setParams5("");
      setFileNameStruct("");
      setValueFileType("Old Files");
      setDepartmentKey("");
      setDocumentKey("");
      setProjectKey("");
      setFileess([]);
    }
    form.resetFields();
    setDisableSubmit(false);
  };

  return (
    <div>
      <style>{styl}</style>

      {!showUploadDiv ? (
        <div className={styles.newdesigndiv}>
          <div className={styles.rectangle}>
            <div className={styles.template} onClick={toggletemplateDiv}>
              <span className={styles.smallcard1}>
                <img
                  src={require("../../../../Images/Template.png")}
                  alt="Template logo"
                  style={{ width: "50%" }}
                />
              </span>
              <span style={{ fontSize: "22px" }}>Select template</span>
            </div>

            {showTemplateDiv && (
              <>
                <Drawer
                  title="Select template"
                  onClose={onClose}
                  open={showTemplateDiv}
                  footer={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        htmlType="submit"
                        style={{
                          width: "149px",
                          backgroundColor: "rgba(74, 173, 146, 1)",
                          color: "white",
                        }}
                        onClick={() => form.submit()} // Trigger the form submit manually
                      >
                        Download
                      </Button>
                      <Button
                        onClick={() => onClose()}
                        style={{
                          width: "149px",
                          marginLeft: "5px",
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  }
                >
                  <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={() => downloadFile()}
                    autoComplete="off"
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Template"
                          name="Template"
                          style={{ maxWidth: 400, marginTop: 37 }}
                        >
                          <Select
                            placeholder="Select an option"
                            onChange={(event, option) => {
                              changeValue(event, option);
                            }}
                            style={{ width: "330px" }}
                          >
                            {options1.map((option: any) => (
                              <Select.Option
                                key={option.key}
                                value={option.text}
                              >
                                {option.text}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    {choose ? (
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Sub Section"
                            name="Sub Section"
                            style={{ maxWidth: 400, marginTop: 0 }}
                          >
                            <Select
                              placeholder="Select an option"
                              onChange={(event, option) => {
                                changeValue1(event, option);
                              }}
                              style={{ width: "330px" }}
                              // labelInValue
                            >
                              {chooose.map((option: any) => (
                                <Select.Option
                                  key={option.text}
                                  value={option.text}
                                >
                                  {option.text}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    ) : (
                      <div></div>
                    )}
                  </Form>
                </Drawer>
              </>
            )}

            {showFirstItem && (
              <div className={styles.upload} onClick={toggleUploadDiv}>
                <span className={styles.smallcard2}>
                  <img
                    src={require("../../../../Images/Upload.png")}
                    alt="Upload logo"
                    style={{ width: "50%" }}
                  />
                </span>
                <span style={{ fontSize: "22px" }}>Upload Document</span>
              </div>
            )}
          </div>

          <div className={styles.Tablediv}>
            <Search
              placeholder="Search"
              onSearch={_onFilter}
              style={{ width: 300 }}
            />
            <Table
              columns={columns}
              dataSource={searchText ? filteredData : overalllist}
            />
          </div>
        </div>
      ) : (
        <div>
          <Layout>
            <div>
              <Card>
                <div className={styles.uploadfilesdiv}>
                  <span>
                    <img src={require("../../../../Images/Arrow.png")} />
                  </span>
                  <span className={styles.uploadstyle}>Upload</span>
                  <span>
                    <Radio.Group onChange={onChange} value={radiovalue}>
                      <Radio value={"New Files"}>New Files</Radio>
                      <Radio value={"Old Files"}>Replace old files</Radio>
                    </Radio.Group>
                  </span>
                </div>
                {showUploadDiv && valueFileType === "New Files" ? (
                  <div>
                    <Form
                      form={form}
                      name="basic"
                      layout="vertical"
                      onFinish={() => filesave()}
                      autoComplete="off"
                      style={{ maxWidth: "100%" }}
                    >
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Department Name"
                            name="Department Name"
                            style={{ maxWidth: 400, marginTop: 37 }}
                            rules={[
                              {
                                required: true,
                                message: "Please select your Department Name!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select an option"
                              onChange={(event, option) =>
                                changeValuedepartmentName(event, option)
                              }
                            >
                              {departmentName.map((option: any) => (
                                <Select.Option
                                  key={option.key}
                                  value={option.text}
                                >
                                  {option.text}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Document Name"
                            name="Document Name"
                            style={{ maxWidth: 400, marginTop: 37 }}
                            rules={[
                              {
                                required: true,
                                message: "Please select your Document Name!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select an option"
                              onChange={(event, option) => {
                                changeValuedocumentType(event, option);
                              }}
                            >
                              {documentType.map((option: any) => (
                                <Select.Option
                                  key={option.key}
                                  value={option.text}
                                >
                                  {option.text}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item
                            label="Project Name"
                            name="Project Name"
                            style={{ maxWidth: 400, marginTop: 17 }}
                            rules={[
                              {
                                required: true,
                                message: "Please select your Project Name!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select an option"
                              onChange={(event, option) => {
                                changeValueProjectName(event, option);
                              }}
                            >
                              {ProjectName.map((option: any) => (
                                <Select.Option
                                  key={option.key}
                                  value={option.text}
                                >
                                  {option.text}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          {SubfolderState === true ? (
                            <Form.Item
                              label="Sub Folders Main"
                              name="Sub Folders Main"
                              style={{ maxWidth: 400, marginTop: 17 }}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please select your Sub Folders Main!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select an option"
                                onChange={(event, option) => {
                                  changeValueSubdepartmentsMain(event, option);
                                }}
                              >
                                {SubdepartmentsMain.map((option: any) => (
                                  <Select.Option
                                    key={option.key}
                                    value={option.text}
                                  >
                                    {option.text}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          ) : (
                            <div></div>
                          )}
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={24}>
                          {SubfolderState1 === true ? (
                            <Form.Item
                              label="Sub Folders"
                              name="Sub Folders"
                              style={{ maxWidth: 400, marginTop: 17 }}
                              rules={[{ required: true }]}
                            >
                              <Select
                                placeholder="Select an option"
                                onChange={changeValueSubdepartments}
                              >
                                {Subdepartments.map((option: any) => (
                                  <Select.Option
                                    key={option.key}
                                    value={option.key}
                                  >
                                    {option.text}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          ) : (
                            <div></div>
                          )}
                          {SubfolderState1 === false ? (
                            <Form.Item>
                              <Button
                                onClick={clickGenerate}
                                style={{
                                  padding: "0px",
                                  display: "block",
                                  marginTop: 17,
                                }}
                              >
                                <span>
                                  <img
                                    src={require("../../../../Images/Gear.png")}
                                    alt="Gear"
                                    style={{ width: "50%" }}
                                  />
                                </span>
                                <span
                                  style={{
                                    color: "rgba(74, 173, 146, 1)",
                                    paddingRight: "18px",
                                  }}
                                >
                                  Generate ID
                                </span>
                              </Button>
                            </Form.Item>
                          ) : (
                            <Form.Item>
                              <Button
                                onClick={clickGenerate}
                                style={{
                                  padding: "0px",
                                  display: "block",
                                  marginTop: 17,
                                }}
                              >
                                <span>
                                  <img
                                    src={require("../../../../Images/Gear.png")}
                                    alt="Gear"
                                    style={{ width: "50%" }}
                                  />
                                </span>
                                <span
                                  style={{
                                    color: "rgba(74, 173, 146, 1)",
                                    paddingRight: "18px",
                                  }}
                                >
                                  Generate ID
                                </span>
                              </Button>
                            </Form.Item>
                          )}
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={24}>
                          <Form.Item style={{ maxWidth: 400, marginTop: 17 }}>
                            <Space.Compact>
                              <Input
                                value={
                                  fileNameStruct.length > 39
                                    ? `${fileNameStruct.slice(0, 39)}...`
                                    : fileNameStruct
                                }
                                style={{ width: "310px" }}
                                onChange={changeValueFileID}
                              />
                              <Button
                                style={{ background: "rgba(74, 173, 146, 1)" }}
                                disabled={fileNameStruct === ""}
                                onClick={async () => {
                                  navigator.clipboard.writeText(fileNameStruct);
                                  openCopiedNotification();
                                }}
                              >
                                <span>
                                  <img
                                    src={require("../../../../Images/Copy.png")}
                                    alt="Copy"
                                  />
                                </span>
                                <span
                                  style={{ paddingLeft: "5px", color: "white" }}
                                >
                                  Copy
                                </span>
                              </Button>
                            </Space.Compact>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={24}>
                          <Form.Item
                            label="Upload New file"
                            name="Upload New file"
                            style={{ width: "100%", marginTop: "30px" }}
                            rules={[
                              {
                                required: true,
                                message: "Please choose file to upload!",
                              },
                            ]}
                          >
                            <Upload
                              accept=".doc, .docx, .xls, .xlsx"
                              onChange={handleFileChange}
                              beforeUpload={() => false}
                            >
                              <Button
                                icon={<UploadOutlined />}
                                style={{ width: 400, textAlign: "start" }}
                              >
                                Upload
                              </Button>
                            </Upload>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={24}>
                          <Form.Item
                            label="File Name"
                            name="File Name"
                            style={{ maxWidth: 400, marginTop: 17 }}
                            rules={[
                              {
                                required: true,
                                message: "Please input your File Name!",
                              },
                            ]}
                          >
                            <Input
                              value={filenames}
                              onChange={changeValueFilename}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col span={24}>
                          <Form.Item
                            label="File Description"
                            name="File Description"
                            style={{ maxWidth: 400, marginTop: 17 }}
                            rules={[
                              {
                                required: true,
                                message: "Please input your File Description!",
                              },
                            ]}
                          >
                            <TextArea
                              showCount
                              maxLength={100}
                              onChange={changeValueFileDescription}
                              style={{ height: 120, resize: "none" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col
                          span={24}
                          style={{ display: "flex", marginLeft: "57%" }}
                        >
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              style={{
                                background: "rgba(74, 173, 146, 1)",
                                color: "white",
                                width: "149px",
                              }}
                              disabled={disablesubmit}
                            >
                              Submit
                            </Button>
                          </Form.Item>

                          <Form.Item>
                            <Button
                              onClick={toggleUploadDiv}
                              style={{ marginLeft: "10px", width: "149px" }}
                            >
                              Cancel
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                ) : (
                  <div>
                    <div style={{ maxWidth: 400, marginTop: 37 }}>
                      <p className={styles.SelectOldFilestyle}>
                        Select Old File
                      </p>
                    </div>
                    <div>
                      <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        onFinish={() => filesaveold()}
                        autoComplete="off"
                        style={{ maxWidth: "100%" }}
                      >
                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item
                              label="Department Name"
                              name="Department Name"
                              style={{ maxWidth: 400 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please select Department Name!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select an option"
                                onChange={(event, option) =>
                                  changeValuedepartmentName(event, option)
                                }
                              >
                                {departmentName.map((option: any) => (
                                  <Select.Option
                                    key={option.key}
                                    value={option.text}
                                  >
                                    {option.text}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Document Name"
                              name="Document Name"
                              style={{ maxWidth: 400 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please select Document Name!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select an option"
                                onChange={(event, option) => {
                                  changeValuedocumentType(event, option);
                                }}
                              >
                                {documentType.map((option: any) => (
                                  <Select.Option
                                    key={option.key}
                                    value={option.text}
                                  >
                                    {option.text}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={24}>
                          <Col span={24}>
                            {SubfolderState === true ? (
                              <Form.Item
                                label="Sub Folders Main"
                                name="Sub Folders Main"
                                style={{ maxWidth: 400, marginTop: 17 }}
                                rules={[{ required: true }]}
                              >
                                <Select
                                  placeholder="Select an option"
                                  onChange={changeValueSubdepartmentsMain}
                                >
                                  {SubdepartmentsMain.map((option: any) => (
                                    <Select.Option
                                      key={option.key}
                                      value={option.key}
                                    >
                                      {option.text}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            ) : (
                              <div></div>
                            )}

                            {SubfolderState1 === true ? (
                              <Form.Item
                                label="Sub Folders"
                                name="Sub Folders"
                                style={{ maxWidth: 400, marginTop: 17 }}
                                rules={[{ required: true }]}
                              >
                                <Select
                                  placeholder="Select an option"
                                  onChange={changeValueSubdepartments}
                                >
                                  {Subdepartments.map((option: any) => (
                                    <Select.Option
                                      key={option.key}
                                      value={option.key}
                                    >
                                      {option.text}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            ) : (
                              <div></div>
                            )}

                            {SubfolderState1 === false ? (
                              <Form.Item>
                                <Button
                                  onClick={clickGenerate1}
                                  style={{
                                    padding: "0px",
                                    display: "block",
                                    marginTop: 17,
                                    width: "14%",
                                  }}
                                >
                                  <span>
                                    <img
                                      src={require("../../../../Images/Search.png")}
                                      alt="Search"
                                      style={{ width: "100%" }}
                                    />
                                  </span>
                                  <span
                                    style={{
                                      color: "rgba(74, 173, 146, 1)",
                                      paddingRight: "18px",
                                      paddingLeft: "4px",
                                    }}
                                  >
                                    Search
                                  </span>
                                </Button>
                              </Form.Item>
                            ) : (
                              <Form.Item>
                                <Button
                                  onClick={clickGenerate1}
                                  style={{
                                    padding: "0px",
                                    display: "block",
                                    marginTop: 17,
                                    width: "10%",
                                  }}
                                >
                                  <span>
                                    <img
                                      src={require("../../../../Images/Search.png")}
                                      alt="Search"
                                      style={{ width: "100%" }}
                                    />
                                  </span>
                                  <span
                                    style={{
                                      color: "rgba(74, 173, 146, 1)",
                                      paddingRight: "18px",
                                      paddingLeft: "4px",
                                    }}
                                  >
                                    Search
                                  </span>
                                </Button>
                              </Form.Item>
                            )}
                          </Col>
                        </Row>

                        <Row
                          gutter={24}
                          style={{ maxWidth: 400, marginTop: 24 }}
                        >
                          <Col span={24}>
                            <p className={styles.ReplaceFileStyle}>
                              Replace File
                            </p>
                          </Col>
                        </Row>

                        <Row gutter={24}>
                          <Col span={12}>
                            <Form.Item
                              label="Select File"
                              name="Select File"
                              style={{ maxWidth: 400 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please choose file to upload!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select File"
                                onChange={(event, option) => {
                                  changeSelectFilename(event, option);
                                }}
                              >
                                {Filess.map((option: any) => (
                                  <Select.Option
                                    key={option.key}
                                    value={option.text}
                                  >
                                    {option.text}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              label="New file"
                              name="New file"
                              style={{ maxWidth: 400, marginTop: 0 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please choose file to upload!",
                                },
                              ]}
                            >
                              <Upload
                                accept=".doc, .docx, .xls, .xlsx"
                                onChange={changeFile}
                                beforeUpload={() => false} // Prevent actual upload
                              >
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{ width: 400, textAlign: "start" }}
                                >
                                  Upload
                                </Button>
                              </Upload>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={24}>
                          <Col span={24}>
                            <Form.Item
                              label="File Name"
                              name="File Name"
                              style={{ maxWidth: 400, marginTop: 17 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your File Name!",
                                },
                              ]}
                            >
                              <Input
                                value={filenames}
                                onChange={changeValueFilename}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={24}>
                          <Col span={24}>
                            <Form.Item
                              label="File Description"
                              name="File Description"
                              style={{ maxWidth: 400, marginTop: 17 }}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input your File Description!",
                                },
                              ]}
                            >
                              <TextArea
                                showCount
                                maxLength={100}
                                onChange={changeValueFileDescription}
                                style={{ height: 120, resize: "none" }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={24}>
                          <Col
                            span={24}
                            style={{ display: "flex", marginLeft: "57%" }}
                          >
                            <Form.Item>
                              <Button
                                disabled={disablesubmit}
                                htmlType="submit"
                                style={{
                                  background: "rgba(74, 173, 146, 1)",
                                  color: "white",
                                  width: "149px",
                                }}
                              >
                                Submit
                              </Button>
                            </Form.Item>

                            <Form.Item>
                              <Button
                                onClick={toggleUploadDiv}
                                style={{ marginLeft: "5px", width: "149px" }}
                              >
                                Cancel
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </Layout>
        </div>
      )}
    </div>
  );
}
