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
        // <Button
        //   text="View"
        //   target="_blank"
        //   href={record.Fileurl}
        // />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ApprovalPopup props={record} />
          <DenyPopup props={record} />
        </div>
      ),

      responsive: ["md", "lg"],
      // ellipsis: true,
    },
    // {
    //   title: "Deny",
    //   dataIndex: "Status",
    //   width: "7%",
    //   align: "left",
    //   resizable: true,
    //   responsive: ["md", "lg"],
    //   ellipsis: true,
    // },

    {
      title: "View",
      dataIndex: "Fileurl",
      width: "7%",
      align: "left",
      resizable: true,
      render: (text, record) => (
        // <Button
        //   text="View"
        //   target="_blank"
        //   href={record.Fileurl}
        // />

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

  // public async componentDidMount() {
  //   const sp:SPFI=getSp()
  //   console.log(await sp.web.currentUser());
  //   console.log(await (await sp.web.currentUser()).Email);
  //   this.setState(
  //     {
  //       //items:await getSitelist(),
  //       value: await getSitelist(),
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
  //   console.log(this.state.value);
  //   console.log(this.state.overalllist);
  //   console.log(this.state.count);
  // }

  const handlePopup = (props) => {
    setShowApprovalPopup(true);
    setRowItem(props);
  };

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

  // useEffect(() => {
  //   fetchData();
  // }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, []);

  //   useEffect(() => {
  //   fetchData();
  // }, [overalllist]);

  function _getKey(item: any, index?: number): string {
    console.log(item.key);
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
  //   console.log(val);

  //   let condition = text.toLowerCase() ? val : this.state.overalllist;
  //   console.log(condition);

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

  // const _onFilter = (
  //   ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   text: string
  // ) => {
  //   let val: any = overalllist.filter(
  //     (i: any) =>
  //       i.FileTitle.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  //       i.Status.toLowerCase().indexOf(text.toLowerCase()) > -1
  //   );
  //   console.log(val);

  //   let condition = text.toLowerCase() ? val : overalllist;
  //   console.log(condition);

  //   setItems(
  //     text.toLowerCase()
  //       ? val.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //       : overalllist.slice(
  //           page * rowsPerPage,
  //           page * rowsPerPage + rowsPerPage
  //         )
  //   );

  //   setCount(condition.length);
  //   setValue(condition);
  //   console.log(val);
  // };

  const _onFilter = (text: any) => {
    const filtered: any = overalllist.filter(
      (item: any) =>
        item.FileTitle.toLowerCase().includes(text.toLowerCase()) ||
        item.Status.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

  const UploadFile = () => {
    // this.setState({
    //   uploadfile: true,
    // });
    setUploadFile(true);
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

  // const sendApproval = () => {
  //   console.log("hello");
  //   // this.setState({
  //   //   opendialog: true,
  //   //   hideDialog: false,
  //   // });
  //   setOpenDialog(true);
  //   setHideDialog(false);
  // };

  // public toggleHideDialog = () => {
  //   this.setState((prevstate) => {
  //     hideDialog: prevstate.hideDialog ? false : true;
  //   });
  //   console.log(this.state.hideDialog);
  // };

  const toggleHideDialog = (setHideDialog) => {
    setHideDialog((prevHideDialog) => !prevHideDialog);
  };

  const RowsPerPage = (value) => {
    setRowsPerPage(value);
  };

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

  const Page = (value) => {
    setPage(value);
    setItems(value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  };

  const handleChangePage = (event, newPage) => {
    Page(newPage);
    fetchData();
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    RowsPerPage(parseInt(event.target.value, 10));
    Page(0);
    fetchData();
  };

  const _renderItemColumn = (item, index: number, column) => {
    const fieldContent = item[column.fieldName] as string;

    switch (column.key) {
      case "Uploadstatus":
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

      case "Approval":
        switch (fieldContent) {
          case "Pending":
            return (
              <ApprovalPopup
                props={item}
                // {...item}
                // toCallBack={async (isupdated) => {
                //   console.log(this.state);
                //   await this.updated(isupdated);
                // }}
              ></ApprovalPopup>
            );

          default:
            return;
        }

      case "Deny":
        switch (fieldContent) {
          case "Pending":
            return (
              <DenyPopup
                {...item}
                toCallBack={async (isupdated) => {
                  await updated(isupdated);
                }}
              ></DenyPopup>
            );

          default:
            return;
        }

      default:
        return fieldContent.length <= 150 ? (
          <span>{fieldContent}</span>
        ) : (
          <span>{fieldContent.slice(0, 150)}...</span>
        );
    }
  };
  return (
    // <div className={styles.QmsDashboard}>
    //   <Stack horizontal className={styles.filter} tokens={stackTokens}>
    //     <TextField
    //       underlined
    //       placeholder="Search"
    //       onChange={_onFilter}
    //       styles={textFieldStyles}
    //     />

    //     {/*<UploadFile></UploadFile>*/}
    //   </Stack>
    //   <DetailsList
    //     className={styles.list}
    //     items={items}
    //     compact={false}
    //     columns={columns}
    //     onRenderItemColumn={_renderItemColumn}
    //     selectionMode={SelectionMode.none}
    //     getKey={_getKey}
    //     setKey="none"
    //     layoutMode={DetailsListLayoutMode.justified}
    //     isHeaderVisible={true}
    //   />
    //   {overalllist.length == 0 ? (
    //     <div
    //       style={{
    //         // borderStyle:'dashed',
    //         padding: "70px 0",
    //         // height: "200px",
    //         margin: "auto",
    //         // width: "300px",
    //         textAlign: "center",
    //       }}
    //     >
    //       <img
    //         style={{
    //           // borderStyle:'dashed',
    //           display: "block",
    //           margin: "auto",
    //           padding: "40px",
    //           width: "40%",
    //           // height: ""
    //         }}
    //         src={Logo}
    //       />
    //       <b style={{ fontWeight: "bold" }}>No Pending Request Available</b>
    //     </div>
    //   ) : (
    //     <div></div>
    //   )}
    //   <TablePagination
    //     rowsPerPageOptions={[5, 10, 25]}
    //     component="div"
    //     count={count}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     rowsPerPage={rowsPerPage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </div>
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
