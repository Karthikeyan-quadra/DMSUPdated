import * as React from "react";
import styles from "./QmsDashboard.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import { Web, IWeb, Items } from "@pnp/sp/presets/all";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import Logo from "../../../../../Images/Illustration.png";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import { getSitelist } from "../../Data/GetSiteList";
import {
  DetailsList,
  DetailsListLayoutMode,
  DialogType,
  IStackTokens,
  mergeStyles,
  PrimaryButton,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";
import ApprovalPopup from "./ApprovalPopup";
import DenyPopup from "./DenyPopup";
import UploadFile from "./UploadFile";
import { TablePagination } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "antd";
import Search from "antd/es/input/Search";

const stackTokens: IStackTokens = { childrenGap: 20 };
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};
const dialogContentProps = {
  type: DialogType.normal,
  title: "Upload File",
};
// let columns = [
//   {
//     key: "Document No",
//     name: "Document No",
//     isIconOnly: false,
//     fieldName: "Filename",
//     minWidth: 200,
//     data: "string",
//     maxWidth: 200,
//     isResizable: false,
//     isCollapsible: false,
//     isPadded: true,
//   },
//   {
//     key: "Uploadstatus",
//     name: "Uploadstatus",
//     fieldName: "Status",
//     minWidth: 70,
//     maxWidth: 70,
//     data: "string",
//     isPadded: true,
//     isResizable: false,
//     isCollapsible: false,
//     isIconOnly: false,
//   },
//   {
//     key: "File Title",
//     name: "File Title",
//     fieldName: "FileTitle",
//     minWidth: 100,
//     maxWidth: 100,
//     data: "string",
//     isPadded: true,
//     isResizable: false,
//     isCollapsible: false,
//     isIconOnly: false,
//   },
//   {
//     key: "FileUploadDate",
//     name: "FileUploadDate",
//     fieldName: "FileUploadDate",
//     minWidth: 80,
//     maxWidth: 80,
//     isResizable: false,
//     isCollapsible: false,
//     data: "string",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "Requester Name",
//     name: "Requester Name",
//     fieldName: "Requester",
//     minWidth: 125,
//     maxWidth: 125,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "Approval",
//     name: "Approval",
//     fieldName: "Status",
//     minWidth: 70,
//     maxWidth: 70,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "Deny",
//     name: "Deny",
//     fieldName: "Status",
//     minWidth: 70,
//     maxWidth: 70,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },

//   {
//     key: "Link",
//     name: "Link",
//     fieldName: "Fileurl",
//     minWidth: 70,
//     maxWidth: 70,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
// ];

export default function QmsDashboard(props) {
  // sendApproval: any;

  // this.state = {
  //   items: [],
  //   hideDialog: true,
  //   opendialog: false,
  //   Selecteditem: "",
  //   uploadfile: false,
  //   rowsPerPage: 5,
  //   page: 0,
  //   overalllist: [],
  // };
  //this.sendApproval= this.sendApproval.bind(this);

  const [items, setItems] = useState([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [opendialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [uploadFile, setUploadFile] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [overalllist, setOverallList] = useState([]);
  const [value, setValue] = useState([]);
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowItem, setRowItem] = useState<any>();
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);

  const sendApproval = () => {
    console.log("hello");
    // this.setState({
    //   opendialog: true,
    //   hideDialog: false,
    // });
    setOpenDialog(true);
    console.log(opendialog);
    setHideDialog(false);
    console.log(hideDialog);
  };

  let columns: any = [
    {
      title: "Document ID",
      dataIndex: "Filename",
      width: "32%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    // {
    //   title: "Uploadstatus",
    //   dataIndex: "Status",
    //   width: "14%",
    //   align: "left",
    //   resizable: true,
    //   responsive: ["md", "lg"],
    //   ellipsis: true,
    // },
    {
      title: "File Title",
      dataIndex: "FileTitle",
      width: "13%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Upload Date",
      dataIndex: "FileUploadDate",
      width: "11%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Requester Name",
      dataIndex: "Requester",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "Status",
      width: "16%",
      align: "left",
      resizable: true,

      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ApprovalPopup props={record} />
          <DenyPopup props={record} />
        </div>
      ),

      responsive: ["md", "lg"],
    },

    {
      title: "View",
      dataIndex: "Fileurl",
      width: "7%",
      align: "left",
      resizable: true,
      render: (text, record) => (
        <img
          src={require("../../../../../Images/Eye.png")}
          alt="View"
          onClick={() => window.open(record.Fileurl, "_blank")}
        />
      ),
      responsive: ["md", "lg"],
      ellipsis: true,
    },
  ];

  const fetchData = async () => {
    const sp: SPFI = getSp();
    console.log(await sp.web.currentUser());
    console.log(await (await sp.web.currentUser()).Email);

    const fetchedValue: any = await getSitelist();

    setValue(fetchedValue);

    setCount(fetchedValue.length);

    const slicedItems = fetchedValue.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    setItems(slicedItems);

    setOverallList(fetchedValue);
  };

  useEffect(() => {
    fetchData();
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

  const updated = async (isupdated) => {
    if (isupdated) {
      const updatedValue: any = await getSitelist();

      setValue(updatedValue);
      setCount(updatedValue.length);

      const slicedItems = updatedValue.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setItems(slicedItems);
      setOverallList(updatedValue);
    }
  };

  const RowsPerPage = (value) => {
    setRowsPerPage(value);
  };

  const Page = (value) => {
    setPage(value);
    setItems(value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  };

  return (
    <>
      <div>
        <p className={styles.QMSstyle}>QMS Dashboard</p>
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
    </>
  );
}
