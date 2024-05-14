// import { Web } from "@pnp/sp/presets/all";
import {
  mergeStyles,
  TextField,
  DetailsList,
  SelectionMode,
  DetailsListLayoutMode,
  ITextFieldStyles,
  FontIcon,
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  Label,
  DialogType,
  // Checkbox,
} from "office-ui-fabric-react";
import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";
import { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Table } from "antd";
import Search from "antd/es/input/Search";
import type { CheckboxProps, GetProp } from "antd";
import { Checkbox } from "antd";
import { useForm } from "antd/es/form/Form";

// type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup: any = Checkbox.Group;

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "250px", float: "right" },
};
const iconClass = mergeStyles({
  fontSize: 18,
  width: "100%",
  textAlign: "center",
});
const markiconClass = mergeStyles({
  fontSize: 100,
  width: "500px",
  color: "green",
  textAlign: "center",
});
// let columns = [
//   {
//     key: "User Name",
//     name: "User Name",
//     isIconOnly: false,
//     fieldName: "Username",
//     minWidth: 180,
//     data: "string",
//     maxWidth: 180,
//     isResizable: false,
//     isCollapsible: false,
//     isPadded: true,
//   },
//   {
//     key: "User MailID",
//     name: "User MailID",
//     fieldName: "EmailID",
//     minWidth: 250,
//     maxWidth: 250,
//     data: "string",
//     isPadded: true,
//     isResizable: false,
//     isCollapsible: false,
//     isIconOnly: false,
//   },

//   {
//     key: "File Uploader",
//     name: "File Uploader",
//     fieldName: "Fileuploader",
//     minWidth: 100,
//     maxWidth: 100,
//     isResizable: false,
//     isCollapsible: false,
//     data: "string",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "QMS",
//     name: "QMS",
//     fieldName: "QMS",
//     minWidth: 50,
//     maxWidth: 50,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "Approver",
//     name: "Approver",
//     fieldName: "Approver",
//     minWidth: 80,
//     maxWidth: 80,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "Manage",
//     name: "Manage",
//     fieldName: "EmailID",
//     minWidth: 80,
//     maxWidth: 80,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
// ];
const dialogContentProps = {
  type: DialogType.normal,
  title: "Manage User",
};
const dialogContentProps_edit = {
  type: DialogType.normal,
  title: "Manage User",
};
export default function UserDetails() {
  // this.state = {
  //   items: [],
  //   users: [],
  //   hideDialog: true,
  //   isAdded: true,
  //   add_UserName: "",
  //   add_UserName_err: "",
  //   add_EmailID: "",
  //   add_EmailID_err: "",

  //   add_Uploader: "false",
  //   add_QMS: "false",
  //   add_Approver: "false",

  //   hideeditDialog: true,
  //   isEdited: true,
  //   edit_UserName: "",
  //   edit_UserName_err: "",
  //   edit_EmailID: "",
  //   edit_EmailID_err: "",
  //   edit_Uploader: "",
  //   edit_QMS: "",
  //   edit_Approver: "",
  //   selectedval: {},
  //   selecteditem: "",
  //   overalllist: [],
  // };

  const [form] = useForm();
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [isAdded, setIsAdded] = useState(true);
  const [add_UserName, setAdd_UserName] = useState("");
  const [add_UserName_err, setAdd_UserName_err] = useState("");
  const [add_EmailID, setAdd_EmailID] = useState("");
  const [add_EmailID_err, setAdd_EmailID_err] = useState("");
  const [add_Uploader, setAdd_Uploader] = useState<any>(false);
  const [add_QMS, setAdd_QMS] = useState<any>(false);
  const [add_Approver, setAdd_Approver] = useState<any>(false);
  const [hideeditDialog, setHideeditDialog] = useState(true);
  const [isEdited, setIsEdited] = useState(true);
  const [edit_UserName, setEdit_UserName] = useState("");
  const [edit_UserName_err, setEdit_UserName_err] = useState("");
  const [edit_EmailID, setEdit_EmailID] = useState<any>("");
  const [edit_EmailID_err, setEdit_EmailID_err] = useState("");
  const [edit_Uploader, setEdit_Uploader] = useState("");
  const [edit_QMS, setEdit_QMS] = useState<any>("");
  const [edit_Approver, setEdit_Approver] = useState<any>("");
  const [selectedval, setSelectedval] = useState<any>({});
  const [selecteditem, setSelecteditem] = useState<any>("");
  const [overalllist, setOveralllist] = useState<any>([]);
  const [add_Viewer, setAdd_Viewer] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const [open, setOpen] = useState(false);
  const [Manageopen, setManageOpen] = useState(false);

  const [checkedList, setCheckedList] = useState<any>(false);

  const [managecheckedList, setManageCheckedList] = useState<any>(false);
  // const [selectedRowData, setSelectedRowData] = useState<any>();

  // private _getKey(item: any, index?: number): string {
  //   return item.key;
  // }
  const plainOptions = ["File Upload Access", "QMS User", "Approval Access"];

  let columns: any = [
    {
      title: "User Name",
      dataIndex: "Username",
      key: "Username",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
      editable: true,
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
      title: "User MailID",
      dataIndex: "EmailID",
      key: "EmailID",
      width: "25%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "File Uploader",
      dataIndex: "Fileuploader",
      key: "Fileuploader",
      width: "11%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,

      render: (text) =>
        text === "true" ? (
          <div className={styles.AccessibleBorder}>
            <span className={styles.Accessiblestyle}>Accessible</span>
          </div>
        ) : (
          <div className={styles.InaccessibleBorder}>
            <span className={styles.Inaccessiblestyle}>Inaccessible</span>
          </div>
        ),
    },
    {
      title: "QMS",
      dataIndex: "QMS",
      key: "QMS",
      width: "11%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
      render: (text) =>
        text === "true" ? (
          <div className={styles.AccessibleBorder}>
            <span className={styles.Accessiblestyle}>Accessible</span>
          </div>
        ) : (
          <div className={styles.InaccessibleBorder}>
            <span className={styles.Inaccessiblestyle}>Inaccessible</span>
          </div>
        ),
    },
    {
      title: "Approver",
      dataIndex: "Approver",
      key: "Approver",
      width: "11%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
      render: (text) =>
        text === "true" ? (
          <div className={styles.AccessibleBorder}>
            <span className={styles.Accessiblestyle}>Accessible</span>
          </div>
        ) : (
          <div className={styles.InaccessibleBorder}>
            <span className={styles.Inaccessiblestyle}>Inaccessible</span>
          </div>
        ),
    },

    {
      title: "",
      dataIndex: "Manage",
      width: "10%",
      align: "left",
      resizable: true,
      render: (text, record) => (
        <span
          onClick={() => {
            editUser(record);
            // showManageDrawer();
          }}
          style={{
            color: "rgba(22, 119, 255, 1)",
            textDecoration: "underline",
          }}
        >
          Manage
        </span>
      ),
      responsive: ["md", "lg"],
      ellipsis: true,
    },
  ];

  function _getKey(item: any, index?: number): string {
    return item.key;
  }

  //   public async componentDidMount() {
  // const sp:SPFI=getSp();

  //     this.setState(
  //       {
  //         items: await sp.web.lists.getByTitle("Userdetails").items(),
  //         overalllist: await sp.web.lists.getByTitle("Userdetails").items(),
  //       },
  //       // () => {
  //       //   console.log(this.state.users);
  //       // }

  //     );
  //             console.log(this.state.users);

  //   }

  const fetchData = async () => {
    const sp: SPFI = getSp();
    const fetchedItems: any = await sp.web.lists
      .getByTitle("Userdetails")
      .items();
    setItems(fetchedItems);
    setOveralllist(fetchedItems);
    setUsers(fetchedItems); // Assuming you meant to set users here
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (checkedValues: any) => {
    setCheckedList(checkedValues);

    // Check which options are selected and call the appropriate handler functions
    if (checkedValues.includes("QMS User")) {
      handleadd_QMS("", true);
    } else {
      handleadd_QMS("", false);
    }

    if (checkedValues.includes("Approval Access")) {
      handleadd_Approver("", true);
    } else {
      handleadd_Approver("", false);
    }

    if (checkedValues.includes("File Upload Access")) {
      add_uploader("", true);
    } else {
      add_uploader("", false);
    }
  };
  const onManageChange = (checkedValues: any) => {
    setManageCheckedList(checkedValues);

    // Check which options are selected and call the appropriate handler functions
    if (checkedValues.includes("QMS User")) {
      handleEditQMS("", true);
    } else {
      handleEditQMS("", false);
    }

    if (checkedValues.includes("Approval Access")) {
      handleEditApprover("", true);
    } else {
      handleEditApprover("", false);
    }

    if (checkedValues.includes("File Upload Access")) {
      edit_uploader("", true);
    } else {
      edit_uploader("", false);
    }
  };

  // public toggleHideDialog = () => {
  //   console.log(this.state.hideDialog);
  //   if (this.state.hideDialog)
  //     this.setState({
  //       hideDialog: false,
  //     });
  //   else
  //     this.setState({
  //       hideDialog: true,
  //       isAdded: true,
  //       add_UserName: "",
  //       add_EmailID: "",
  //       add_Viewer: "",
  //       add_Uploader: "",
  //       add_QMS: "",
  //       add_Approver: "",
  //       add_UserName_err: "",
  //       add_EmailID_err: "",
  //       selecteditem: "",
  //     });
  // };

  const toggleHideDialog = () => {
    console.log(hideDialog);
    if (hideDialog) {
      setHideDialog(false);
    } else {
      setHideDialog(true);
      setIsAdded(true);
      setAdd_UserName("");
      setAdd_EmailID("");
      setAdd_Viewer("");
      setAdd_Uploader("");
      setAdd_QMS("");
      setAdd_Approver("");
      setAdd_UserName_err("");
      setAdd_EmailID_err("");
      setSelecteditem("");
    }
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
  //       edit_UserName: "",
  //       edit_EmailID: "",
  //       selecteditem: "",
  //       edit_Uploader: "",
  //       edit_QMS: "",
  //       selectedval: {},
  //       edit_UserName_err: "",
  //       edit_EmailID_err: "",
  //       edit_Approver: "",
  //     });
  // };

  const toggleeditHideDialog = () => {
    console.log(hideeditDialog);
    if (hideeditDialog) {
      setHideeditDialog(false);
    } else {
      setHideeditDialog(true);
      setIsEdited(true);
      setEdit_UserName("");
      setEdit_EmailID("");
      setSelecteditem("");
      setEdit_Uploader("");
      setEdit_QMS("");
      setSelectedval({});
      setEdit_UserName_err("");
      setEdit_EmailID_err("");
      setEdit_Approver("");
    }
  };

  // const editUser = (value) => {
  //   this.setState({
  //     edit_UserName: value.Username,
  //     edit_EmailID: value.EmailID,
  //     hideeditDialog: false,
  //     edit_Uploader: value.Fileuploader,
  //     edit_QMS: value.QMS,
  //     edit_Approver: value.Approver,
  //     isEdited: "false",
  //     selecteditem: value.ID,
  //     selectedval: value,
  //   });
  // };
  useEffect(() => {
    console.log("Managechecklist:", managecheckedList);
  }, [managecheckedList]); // This will run every time managecheckedList changes

  const editUser = (record: any) => {
    // console.log(value);
    // setEdit_UserName(value.Username);
    // setEdit_EmailID(value.EmailID);
    // // setHideeditDialog(false);
    // setEdit_Uploader(value.Fileuploader);
    // setEdit_QMS(value.QMS);
    // setEdit_Approver(value.Approver);
    // setIsEdited(true);
    // setSelecteditem(value);
    // setSelectedval(value.key);
    // setManageOpen(true);

    console.log("record:", record);
    setManageOpen(true);
    setEdit_UserName(record.Username);
    setEdit_EmailID(record.EmailID);
    setEdit_Uploader(record.Fileuploader);
    setEdit_QMS(record.QMS);
    setEdit_Approver(record.Approver);
    setIsEdited(true);
    setSelecteditem(record.ID);
    setSelectedval(record);

    const newCheckedList = {
      "File Upload Access": record.Fileuploader === "true",
      "QMS User": record.QMS === "true",
      "Approval Access": record.Approver === "true",
    };
    console.log("New Checked List:", newCheckedList);

    setManageCheckedList(newCheckedList);
    console.log("Managechecklist:", managecheckedList);

    form.setFieldsValue({
      "User Name": record.Username,
      "User MailID": record.EmailID,
      "Provide Access": Object.keys(newCheckedList).filter(
        (key) => newCheckedList[key]
      ),
    });
    // setHideeditDialog(false); // Show the edit drawer
  };

  const _renderItemColumn = (item, index: number, column) => {
    const fieldContent = item[column.fieldName] as string;

    switch (column.key) {
      case "File Uploader":
        switch (fieldContent) {
          case "true":
            return (
              <FontIcon
                aria-label="Completed"
                iconName="Completed"
                className={iconClass}
                style={{ color: "green" }}
              />
            );

          default:
            return (
              <span>
                <FontIcon
                  aria-label="ErrorBadge"
                  iconName="ErrorBadge"
                  className={iconClass}
                  style={{ color: "red" }}
                />
              </span>
            );
        }

      case "QMS":
        switch (fieldContent) {
          case "true":
            return (
              <FontIcon
                aria-label="Completed"
                iconName="Completed"
                className={iconClass}
                style={{ color: "green" }}
              />
            );

          default:
            return (
              <span>
                <FontIcon
                  aria-label="ErrorBadge"
                  iconName="ErrorBadge"
                  className={iconClass}
                  style={{ color: "red" }}
                />
              </span>
            );
        }

      case "Approver":
        switch (fieldContent) {
          case "true":
            return (
              <FontIcon
                aria-label="Completed"
                iconName="Completed"
                className={iconClass}
                style={{ color: "green" }}
              />
            );

          default:
            return (
              <span>
                <FontIcon
                  aria-label="ErrorBadge"
                  iconName="ErrorBadge"
                  className={iconClass}
                  style={{ color: "red" }}
                />
              </span>
            );
        }
      case "Manage":
        return (
          <span>
            <FontIcon
              aria-label="AccountManagement"
              iconName="AccountManagement"
              className={styles.manage}
              style={{ color: "#0078d4" }}
              onClick={() => editUser(item)}
            />
          </span>
        );
      default:
        return <span>{fieldContent}</span>;
    }
  };
  // const AddUser = () => {
  //   this.setState({
  //     hideDialog: false,
  //     isAdded: true,
  //   });
  // };

  const AddUser = () => {
    setHideDialog(false);
    setIsAdded(true);
  };

  // const handledit_Username = (event, value) => {
  //   this.setState({
  //     edit_UserName: value,
  //   });
  //   console.log(value);

  // };

  const handledit_Username = (e: any) => {
    setEdit_UserName(e.target.value);
    console.log(edit_UserName);
  };

  // const handleedit_UserMailID = (event, value) => {
  //   this.setState({
  //     edit_EmailID: value,
  //   });
  // };

  const handleedit_UserMailID = (e: any) => {
    setEdit_EmailID(e.target.value);
    console.log(e.target.valuelue);
    console.log(edit_EmailID);
  };

  //original code
  // const edit_uploader = (event, isChecked) => {
  //   isChecked == true
  //     ? this.setState({
  //         edit_Uploader: "true",
  //       })
  //     : this.setState({
  //         edit_Uploader: "false",
  //       });
  // };

  const edit_uploader = (event, isChecked: any) => {
    setEdit_Uploader(isChecked ? "true" : "false");
  };

  // const edit_QMS = (event, isChecked) => {
  //   isChecked == true
  //     ? this.setState({
  //         edit_QMS: "true",
  //       })
  //     : this.setState({
  //         edit_QMS: "false",
  //       });
  // };

  const handleEditQMS = (event, isChecked: any) => {
    setEdit_QMS(isChecked ? "true" : "false");
    console.log(edit_QMS);
  };

  // const edit_Approver = (event, isChecked) => {
  //   isChecked == true
  //     ? this.setState({
  //         edit_Approver: "true",
  //       })
  //     : this.setState({
  //         edit_Approver: "false",
  //       });
  // };

  const handleEditApprover = (event, isChecked: any) => {
    setEdit_Approver(isChecked ? "true" : "false");
  };

  // const toggleCheckbox = (key) => {
  //   this.setState((prevState) => ({
  //     [key]: prevState[key] === "true" ? "false" : "true",
  //   }));
  // };

  // const edit_uploader = (event, isChecked) => {
  //   toggleCheckbox("edit_Uploader");
  // };

  // const edit_QMS = (event, isChecked) => {
  //   toggleCheckbox("edit_QMS");
  // };

  // const edit_Approver = (event, isChecked) => {
  //   toggleCheckbox("edit_Approver");
  // };

  // const handleadd_Username = (event, value) => {
  //   this.setState({
  //     add_UserName: value,
  //   });
  // };

  const handleadd_Username = (e: any) => {
    setAdd_UserName(e.target.value);
    console.log(add_UserName);
  };

  // const handleadd_UserMailID = (event, value) => {
  //   this.setState({
  //     add_EmailID: value,
  //   });
  // };

  const handleadd_UserMailID = (e: any) => {
    setAdd_EmailID(e.target.value);
    console.log(add_EmailID);
  };

  // const add_uploader = (event, isChecked) => {
  //   isChecked == true
  //     ? this.setState({
  //         add_Uploader: "true",
  //       })
  //     : this.setState({
  //         add_Uploader: "false",
  //       });
  // };

  const add_uploader = (event, isChecked: any) => {
    setAdd_Uploader(isChecked ? "true" : "false");
    console.log(add_Uploader);
  };

  // const add_QMS = (event, isChecked) => {
  //   isChecked == true
  //     ? this.setState({
  //         add_QMS: "true",
  //       })
  //     : this.setState({
  //         add_QMS: "false",
  //       });
  // };

  const handleadd_QMS = (event, isChecked: any) => {
    setAdd_QMS(isChecked ? "true" : "false");
    console.log(add_QMS);
    console.log("handleadd_QMS Function called");
  };

  // const add_Approver = (event, isChecked) => {
  //   isChecked == true
  //     ? this.setState({
  //         add_Approver: "true",
  //       })
  //     : this.setState({
  //         add_Approver: "false",
  //       });
  // };

  const handleadd_Approver = (event, isChecked: any) => {
    setAdd_Approver(isChecked ? "true" : "false");
    console.log(add_Approver);
  };

  // const handleAddUser = async () => {
  //     const sp:SPFI=getSp();

  //   let status = this.state.overalllist.filter(
  //     (res:any) =>
  //       res.EmailID.toLowerCase() == this.state.add_EmailID.toLowerCase()
  //   );

  //   console.log(status);
  //   if (status.length == 0) {
  //     if (this.state.add_UserName != "") {
  //       if (this.state.add_EmailID != "") {
  //         await sp.web.lists
  //           .getByTitle("Userdetails")
  //           .items.add({
  //             Username: this.state.add_UserName,
  //             EmailID: this.state.add_EmailID,
  //             Fileuploader: this.state.add_Uploader,
  //             Approver: this.state.add_QMS,
  //             QMS: this.state.add_Approver,
  //           })
  //           .then(async (res) =>
  //             this.setState({
  //               isAdded: false,
  //               items: await sp.web.lists.getByTitle("Userdetails").items(),
  //               overalllist: await sp.web.lists
  //                 .getByTitle("Userdetails")
  //                 .items(),
  //             })
  //           );
  //       } else {
  //         this.setState({
  //           add_EmailID_err: "Please specify User MailID",
  //         });
  //       }
  //     } else {
  //       this.setState({
  //         add_UserName_err: "Please specify Code",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       add_EmailID_err: "EmailID already Exists",
  //     });
  //   }
  // };

  const handleAddUser = async () => {
    console.log("Handle Add user function called");
    const sp: SPFI = getSp();

    let status = overalllist.filter(
      (res: any) => res.EmailID.toLowerCase() == add_EmailID.toLowerCase()
    );

    console.log(status);
    if (status.length == 0) {
      if (add_UserName != "") {
        if (add_EmailID != "") {
          try {
            await sp.web.lists.getByTitle("Userdetails").items.add({
              Username: add_UserName,
              EmailID: add_EmailID,
              Fileuploader: add_Uploader,
              Approver: add_QMS,
              QMS: add_Approver,
            });
            setIsAdded(false);
            setItems(await sp.web.lists.getByTitle("Userdetails").items());
            setOveralllist(
              await sp.web.lists.getByTitle("Userdetails").items()
            );
          } catch (error) {
            console.error(error);
          }
        } else {
          setAdd_EmailID_err("Please specify User MailID");
        }
      } else {
        setAdd_UserName_err("Please specify Code");
      }
    } else {
      setAdd_EmailID_err("EmailID already Exists");
    }

    setOpen(false);
    form.resetFields();
  };

  // const _filter = (event, text) => {
  //   console.log(text);
  //   if (text != "") {
  //     let val = this.state.overalllist.filter(
  //       (i) =>
  //         i.Username.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  //         i.EmailID.toLowerCase().indexOf(text.toLowerCase()) > -1
  //     );
  //     let condition = text.toLowerCase() ? val : this.state.overalllist;
  //     console.log(val);
  //     this.setState({
  //       items: val,
  //     });
  //   } else {
  //     this.setState({
  //       items: this.state.overalllist,
  //     });
  //   }
  // };

  // const _filter = (event, text: any) => {
  //   console.log(text);
  //   if (text != "") {
  //     let val = overalllist.filter(
  //       (i: any) =>
  //         i.Username.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  //         i.EmailID.toLowerCase().indexOf(text.toLowerCase()) > -1
  //     );
  //     setSearchText(text);
  //     let condition = text.toLowerCase() ? val : overalllist;
  //     console.log(val);
  //     setItems(val);
  //     setFilteredData(condition);
  //   } else {
  //     setItems(overalllist);
  //   }
  // };

  const _filter = (text: any) => {
    const filtered: any = overalllist.filter(
      (item: any) =>
        item.Username.toLowerCase().includes(text.toLowerCase()) ||
        item.EmailID.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(text);
  };
  // const handleeditUser = async () => {
  // const sp:SPFI=getSp();

  //   let status = this.state.overalllist.filter(
  //     (res) =>
  //       res.EmailID.toLowerCase() == this.state.add_EmailID.toLowerCase()
  //   );
  //   if (
  //     status.length == 0 &&
  //     this.state.edit_EmailID.toLowerCase() ==
  //       this.state.selectedval.EmailID.toLowerCase()
  //   ) {
  //     if (this.state.edit_UserName != "") {
  //       if (this.state.edit_EmailID != "") {
  //         const list = sp.web.lists.getByTitle("Userdetails");

  //         await list.items
  //           .getById(this.state.selecteditem)
  //           .update({
  //             Username: this.state.edit_UserName,
  //             EmailID: this.state.edit_EmailID,
  //             Fileuploader: this.state.edit_Uploader,
  //             // Approver: this.state.edit_QMS,
  //             // QMS: this.state.edit_Approver,
  //             Approver: this.state.edit_Approver,
  //             QMS: this.state.edit_QMS,
  //           })
  //           .then(async (res) =>
  //             this.setState({
  //               isEdited: false,
  //               items: await sp.web.lists.getByTitle("Userdetails").items(),
  //               overalllist: await sp.web.lists
  //                 .getByTitle("Userdetails")
  //                 .items(),
  //             })
  //           );
  //       } else {
  //         this.setState({
  //           edit_EmailID_err: "Please specify User MailID",
  //         });
  //       }
  //     } else {
  //       this.setState({
  //         edit_UserName_err: "Please specify Code",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       edit_EmailID_err: "EmailID already Exists",
  //     });
  //   }
  //   window.location.reload()
  // };

  // const handleeditUser = async () => {
  // const sp:SPFI=getSp()

  //   let status:any = overalllist.filter(
  //     (res:any) =>
  //       res.EmailID.toLowerCase() == add_EmailID.toLowerCase()
  //   );
  //   console.log(status);
  //   console.log(add_EmailID);
  //   if (
  //     status.length == 0 &&
  //     edit_EmailID.toLowerCase() ==
  //       selectedval.EmailID.toLowerCase()
  //   ) {
  //     if (edit_UserName != "") {
  //       if (edit_EmailID != "") {
  //         const list = sp.web.lists.getByTitle("Userdetails");

  //         await list.items
  //           .getById(selecteditem)
  //           .update({
  //             Username: edit_UserName,
  //             EmailID: edit_EmailID,
  //             Fileuploader: edit_Uploader,
  //             // Approver: this.state.edit_QMS,
  //             // QMS: this.state.edit_Approver,
  //             Approver: edit_Approver,
  //             QMS: edit_QMS,
  //           })
  //           .then(async (res) =>
  //             // this.setState({
  //             //   isEdited: false,
  //             //   items: await sp.web.lists.getByTitle("Userdetails").items(),
  //             //   overalllist: await sp.web.lists
  //             //     .getByTitle("Userdetails")
  //             //     .items(),
  //             // })
  //               {
  //             setIsEdited(false);
  //             setItems(await sp.web.lists.getByTitle("Userdetails").items());
  //             setOveralllist(await sp.web.lists.getByTitle("Userdetails").items());

  //           }
  //           );
  //       } else {
  //         // this.setState({
  //         //   edit_EmailID_err: "Please specify User MailID",
  //         // });
  //         setEdit_EmailID_err("Please specify User MailID");
  //       }
  //     } else {
  //       // this.setState({
  //       //   edit_UserName_err: "Please specify Code",
  //       // });
  //       setEdit_UserName_err("Please specify Code");
  //     }
  //   } else {
  //     // this.setState({
  //     //   edit_EmailID_err: "EmailID already Exists",
  //     // });
  //     setEdit_EmailID_err("EmailID already Exists");
  //   }
  //   // window.location.reload()
  // };

  // const handleeditUser = async () => {
  //   const sp: SPFI = getSp()

  //   let status: any = overalllist.filter(
  //     (res: any) =>
  //       res.EmailID.toLowerCase() == edit_EmailID.toLowerCase()
  //   );
  //   console.log(status);
  //   console.log(edit_EmailID);

  //     console.log(selectedval.EmailID);
  //     console.log(selecteditem);

  //   if (status.length == 0 ) {
  //     console.log(selectedval.EmailID);
  //     if (edit_UserName != "") {
  //       if (edit_EmailID != "") {
  //         try {
  //         await  sp.web.lists.getByTitle("Userdetails").items
  //           .getById(selecteditem)
  //           .update({
  //             Username: edit_UserName,
  //             EmailID: edit_EmailID,
  //             Fileuploader: edit_Uploader,
  //             Approver: edit_Approver,
  //             QMS: edit_QMS,
  //           });

  //             setIsEdited(false);
  //             console.log(isEdited);

  //             setItems(await sp.web.lists.getByTitle("Userdetails").items());
  //             setOveralllist(
  //               await sp.web.lists.getByTitle("Userdetails").items());
  //             }
  //               catch (error) {
  //                 console.error(error);
  //               }

  //       } else {
  //         // Set error message if edit_EmailID is empty
  //         setEdit_EmailID_err("Please specify User MailID");
  //       }
  //     } else {
  //       // Set error message if edit_UserName is empty
  //       setEdit_UserName_err("Please specify Code");
  //     }
  //   } else {
  //     // Set error message if email ID already exists
  //     setEdit_EmailID_err("EmailID already Exists");
  //   }
  // };

  const handleeditUser = async () => {
    const sp: SPFI = getSp();

    // Check if the email ID is being edited
    if (edit_EmailID !== selectedval.EmailID) {
      // Filter the overall list to find if the edited email ID already exists
      let status: any = overalllist.filter(
        (res: any) => res.EmailID.toLowerCase() === edit_EmailID.toLowerCase()
      );

      // Check if the filtered list is not empty (indicating that the email ID already exists)
      if (status.length !== 0) {
        // Set error message if email ID already exists
        setEdit_EmailID_err("EmailID already Exists");
        return; // Exit the function early
      }
    }

    // Proceed with updating user details
    if (edit_UserName !== "") {
      if (edit_EmailID !== "") {
        try {
          await sp.web.lists
            .getByTitle("Userdetails")
            .items.getById(selecteditem)
            .update({
              Username: edit_UserName,
              EmailID: edit_EmailID,
              Fileuploader: edit_Uploader,
              Approver: edit_Approver,
              QMS: edit_QMS,
            });

          setIsEdited(false);
          setItems(await sp.web.lists.getByTitle("Userdetails").items());
          setOveralllist(await sp.web.lists.getByTitle("Userdetails").items());
        } catch (error) {
          console.error(error);
        }
      } else {
        // Set error message if edit_EmailID is empty
        setEdit_EmailID_err("Please specify User MailID");
      }
    } else {
      // Set error message if edit_UserName is empty
      setEdit_UserName_err("Please specify Code");
    }
  };

  // const DeleteUser = async () => {
  //   const sp:SPFI=getSp();

  //   const list:any = await sp.web.lists.getByTitle("Userdetails");
  //   await list.items
  //     .getById(this.state.selecteditem)
  //     .delete()
  //     .then(async (res) =>
  //       this.setState({
  //         isEdited: false,
  //         items: await sp.web.lists.getByTitle("Userdetails").items(),
  //         overalllist: await sp.web.lists.getByTitle("Userdetails").items(),
  //       })
  //     );
  // };

  const DeleteUser = async () => {
    const sp: SPFI = getSp();

    const list: any = await sp.web.lists.getByTitle("Userdetails");
    await list.items
      .getById(selecteditem)
      .delete()
      .then(async (res: any) => {
        setIsEdited(false);
        setItems(await sp.web.lists.getByTitle("Userdetails").items());
        setOveralllist(await sp.web.lists.getByTitle("Userdetails").items());
      });
  };

  // const DeleteUser = async () => {
  //   try {
  //     const sp: SPFI = getSp();

  //     if (!sp) {
  //       console.error("SharePoint context object is not available.");
  //       return;
  //     }

  //     const list = sp.web.lists.getByTitle("Userdetails");

  //     if (!list || !list.items || !list.items.getById) {
  //       console.error("List or list items are not properly initialized.");
  //       return;
  //     }

  //     const itemId = this.state.selecteditem;

  //     if (!itemId) {
  //       console.error("Selected item ID is not available.");
  //       return;
  //     }

  //     await list.items.getById(itemId).delete();

  //     // Refresh the user list after deletion
  //     this.setState({
  //       isEdited: false,
  //       items: await sp.web.lists.getByTitle("Userdetails").items(),
  //       overalllist: await sp.web.lists.getByTitle("Userdetails").items(),
  //     });

  //     console.log("User deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  const showDrawer = () => {
    setOpen(true);
    setIsAdded(true);
    form.resetFields();
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  // const showManageDrawer = () => {
  //   setManageOpen(true);
  //   setIsEdited(true);
  // };

  const onManageClose = () => {
    setManageOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ marginLeft: "3%", marginTop: "50px" }}>
      {/* <div style={{ display: "none" }}> */}
      {/* <div style={{ display: "none" }}>
          <PrimaryButton onClick={AddUser}>
            <FontIcon
              aria-label="AddFriend"
              iconName="AddFriend"
              style={{ fontSize: "18px" }}
            />
            &nbsp; Add User
          </PrimaryButton>
          <TextField
            underlined
            placeholder="Search"
            onChange={_filter}
            styles={textFieldStyles}
          />
        </div> */}
      {/* <div style={{ width: "100%", height: "450px", overflowY: "auto" }}>
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
        </div> */}

      {/* <div> */}
      {/* <Dialog
            containerClassName={
              "ms-dialogMainOverride " + styles.addProjectDialog
            }
            hidden={hideDialog}
            dialogContentProps={dialogContentProps}
            isBlocking={false}
            onDismiss={toggleHideDialog}
          > */}
      {/* {isAdded ? (
              <div>
                <div style={{ margin: "15px" }}>
                  <div
                    style={{
                      width: "350px",
                    }}
                  >
                    <TextField
                      required
                      label="User Name"
                      placeholder="Specify User Name"
                      resizable={false}
                      onChange={handleadd_Username}
                      errorMessage={add_UserName_err}
                    />
                  </div>

                  <div style={{ width: "350px", marginTop: "15px" }}>
                    <TextField
                      suffix="@quadrasystems.net"
                      required
                      label="User MailID"
                      placeholder="Specify User MailID"
                      onChange={handleadd_UserMailID}
                      resizable={false}
                      errorMessage={add_EmailID_err}
                    />
                  </div>
                  <table style={{ marginTop: "25px" }}>
                    <tr>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="File Upload Access"
                          onChange={add_uploader}
                        />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox label="QMS User" onChange={handleadd_QMS} />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="Approval Access"
                          style={{ margin: "15px" }}
                          onChange={handleadd_Approver}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <DialogFooter>
                  <PrimaryButton
                    style={{
                      backgroundColor: "#0078D4",
                    }}
                    text="Submit"
                    onClick={handleAddUser}
                  />
                  <DefaultButton onClick={toggleHideDialog} text="Cancel" />
                </DialogFooter>
              </div>
            ) : (
              <div>
                <FontIcon
                  aria-label="SkypeCircleCheck"
                  iconName="SkypeCircleCheck"
                  className={markiconClass}
                />
                <Label
                  style={{
                    margin: "0 auto",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  User Added Successfully
                </Label>

                <DialogFooter>
                  <DefaultButton onClick={toggleHideDialog} text="Close" />
                </DialogFooter>
              </div>
            )} */}
      {/* </Dialog> */}

      {/*Edit Projects*/}
      {/* <Dialog
            containerClassName={
              "ms-dialogMainOverride " + styles.addProjectDialog
            }
            hidden={hideeditDialog}
            dialogContentProps={dialogContentProps_edit}
            isBlocking={false}
            onDismiss={toggleeditHideDialog}
          > */}
      {/* {isEdited ? (
              <div>
                <div style={{ margin: "15px" }}>
                  <div
                    style={{
                      width: "350px",
                    }}
                  >
                    <TextField
                      required
                      label="User Name"
                      placeholder="Specify User Name"
                      resizable={false}
                      value={edit_UserName}
                      onChange={handledit_Username}
                      errorMessage={edit_UserName_err}
                    />
                  </div>

                  <div style={{ width: "350px", marginTop: "15px" }}>
                    <TextField
                      required
                      label="User MailID"
                      value={edit_EmailID}
                      placeholder="Specify User MailID"
                      onChange={handleedit_UserMailID}
                      resizable={false}
                      errorMessage={edit_EmailID_err}
                    />
                  </div>
                  <table style={{ marginTop: "25px" }}>
                    <tr>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="File Upload Access"
                          onChange={edit_uploader}
                          checked={edit_Uploader == "true" ? true : false}
                        />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="QMS User"
                          // onChange={edit_QMS}
                          onChange={handleEditQMS}
                          checked={edit_QMS == "true" ? true : false}
                        />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="Approval Access"
                          checked={edit_Approver == "true" ? true : false}
                          // onChange={edit_Approver}
                          onChange={handleEditApprover}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <DialogFooter>
                  <DefaultButton onClick={DeleteUser} text="Delete" />
                  <PrimaryButton
                    style={{
                      backgroundColor: "#0078D4",
                    }}
                    onClick={handleeditUser}
                    text="Submit"
                  />
                  <DefaultButton onClick={toggleeditHideDialog} text="Cancel" />
                </DialogFooter>
              </div>
            ) : (
              <div>
                <FontIcon
                  aria-label="SkypeCircleCheck"
                  iconName="SkypeCircleCheck"
                  className={markiconClass}
                />
                <Label
                  style={{
                    margin: "0 auto",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  User Details Altered Successfully
                </Label>

                <DialogFooter>
                  <DefaultButton onClick={toggleeditHideDialog} text="Close" />
                </DialogFooter>
              </div>
            )} */}
      {/* </Dialog> */}
      {/* </div> */}
      {/* </div> */}

      <div>
        <Row gutter={24} style={{ width: "98%" }}>
          <Col span={12}>
            <Button
              onClick={showDrawer}
              // className={`${styles.addUserButtonStyle} ${styles.addUserTextStyle}`}
              style={{
                width: "149px",
                height: "34px",
                padding: "0px",
                backgroundColor: "rgba(74, 173, 146, 1)",
                color: "white",
              }}
            >
              <img
                src={require("../../../../../Images/UserImage.png")}
                alt="UserImage"
                style={{ padding: "5px" }}
              />
              Add User
            </Button>
          </Col>
          <Col
            span={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Search
              placeholder="Search"
              onSearch={_filter}
              style={{ width: 300 }}
            />
          </Col>
        </Row>

        <div style={{ marginTop: "20px", width: "97%" }}>
          <Table
            columns={columns}
            dataSource={searchText ? filteredData : overalllist}
          />
        </div>

        <div>
          {isAdded ? (
            <div>
              <Drawer title="Add User" onClose={onClose} open={open}>
                <div>
                  <Form
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    onFinish={() => handleAddUser()}
                    form={form}
                  >
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          label="User Name"
                          name="User Name"
                          style={{
                            maxWidth: 400,
                            marginTop: 37,
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Specify User Name"
                            onChange={handleadd_Username}
                            value={add_UserName}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          label="User MailID"
                          name="User MailID"
                          style={{
                            maxWidth: 400,
                            marginTop: 17,
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your user mailId!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Specify User MailID"
                            onChange={handleadd_UserMailID}
                            value={add_EmailID}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={13}>
                        <Form.Item
                          label={
                            <span
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              Provide Access
                            </span>
                          }
                          name="Provide Access"
                          style={{
                            maxWidth: 400,
                            marginTop: 17,
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please provide required access!",
                            },
                          ]}
                        >
                          <CheckboxGroup
                            options={plainOptions}
                            value={checkedList}
                            onChange={onChange}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24} style={{ marginTop: "300px" }}>
                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            style={{
                              width: "100px",
                              height: "34px",
                              padding: "0px",
                              backgroundColor: "rgba(74, 173, 146, 1)",
                              color: "white",
                            }}
                          >
                            Add
                          </Button>
                        </Form.Item>

                        <Form.Item>
                          <Button
                            onClick={() => onCancel()}
                            style={{
                              width: "100px",
                              height: "34px",
                              padding: "0px",
                              marginLeft: "5px",
                            }}
                          >
                            Cancel
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Drawer>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div>
        {isEdited ? (
          <div>
            <Drawer
              title="Manage User"
              onClose={onManageClose}
              open={Manageopen}
            >
              <div>
                <Form
                  name="basic"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={() => handleeditUser()}
                  form={form}
                  // initialValues={{
                  //   "User Name": ,
                  //   "User MailID": edit_EmailID,
                  //   "Provide Access": Object.keys(managecheckedList).filter(
                  //     (key) => managecheckedList[key]
                  //   ),
                  // }}
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="User Name"
                        name="User Name"
                        style={{
                          maxWidth: 400,
                          marginTop: 37,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Input
                          onChange={handledit_Username}
                          value={edit_UserName}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="User MailID"
                        name="User MailID"
                        style={{
                          maxWidth: 400,
                          marginTop: 17,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Input
                          placeholder={edit_EmailID}
                          onChange={handleedit_UserMailID}
                          value={edit_EmailID}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={13}>
                      <Form.Item
                        label={
                          <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            Provide Access
                          </span>
                        }
                        name="Provide Access"
                        style={{
                          maxWidth: 400,
                          marginTop: 17,
                        }}
                      >
                        <CheckboxGroup
                          options={plainOptions}
                          value={managecheckedList}
                          onChange={onManageChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24} style={{ marginTop: "300px" }}>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Form.Item>
                        <Button
                          htmlType="submit"
                          style={{
                            width: "100px",
                            height: "34px",
                            padding: "0px",
                            backgroundColor: "rgba(74, 173, 146, 1)",
                            color: "white",
                          }}
                        >
                          Submit
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          onClick={() => DeleteUser()}
                          style={{
                            width: "100px",
                            height: "34px",
                            padding: "0px",
                            marginLeft: "5px",
                            border: "1px solid rgba(203, 68, 68, 1)",
                            color: "rgba(203, 68, 68, 1)",
                          }}
                        >
                          Delete
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Drawer>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
