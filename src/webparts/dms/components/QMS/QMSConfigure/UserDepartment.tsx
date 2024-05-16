import {
  DialogType,
  FontIcon,
  PrimaryButton,
  TextField,
  DetailsList,
  SelectionMode,
  DetailsListLayoutMode,
  Dialog,
  Checkbox,
  DialogFooter,
  DefaultButton,
  Label,
  ITextFieldStyles,
  mergeStyles,
  Dropdown,
} from "office-ui-fabric-react";
import * as React from "react";
import { Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";
import { getSubDepartmentlist } from "../../Data/GetSiteList";
import { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Table } from "antd";
import Search from "antd/es/input/Search";
import { useForm } from "antd/es/form/Form";
// let columns = [
//   {
//     key: "User Name",
//     name: "User Name",
//     isIconOnly: false,
//     fieldName: "Name",
//     minWidth: 200,
//     data: "string",
//     maxWidth: 200,
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
//     key: "Department",
//     name: "Department",
//     fieldName: "Department",
//     minWidth: 180,
//     maxWidth: 180,
//     isResizable: false,
//     isCollapsible: false,
//     data: "string",
//     isIconOnly: false,
//     isPadded: true,
//   },

//   {
//     key: "Sub Department",
//     name: "Sub Department",
//     fieldName: "SubDepartment",
//     minWidth: 180,
//     maxWidth: 180,
//     isResizable: false,
//     isCollapsible: false,
//     data: "string",
//     isIconOnly: false,
//     isPadded: true,
//   },

//   {
//     key: "Level",
//     name: "Level",
//     fieldName: "Level",
//     minWidth: 100,
//     maxWidth: 100,
//     isResizable: false,
//     isCollapsible: false,
//     data: "string",
//     isIconOnly: false,
//     isPadded: true,
//   },

//   {
//     key: "Manage",
//     name: "Manage",
//     fieldName: "Department",
//     minWidth: 100,
//     maxWidth: 100,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
//   {
//     key: "Delete",
//     name: "Delete",
//     fieldName: "Department",
//     minWidth: 100,
//     maxWidth: 100,
//     isResizable: false,
//     isCollapsible: false,
//     data: "number",
//     isIconOnly: false,
//     isPadded: true,
//   },
// ];

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "250px", float: "right" },
};

const markiconClass = mergeStyles({
  fontSize: 100,
  width: "500px",
  color: "green",
  textAlign: "center",
});
const dialogContentProps = {
  type: DialogType.normal,
  title: "Add User",
};
const dialogContentProps_edit = {
  type: DialogType.normal,
  title: "Manage User",
};
export default function UserDepartment(Props) {
  // this.state = {
  //   items: [],
  //   users: [],
  //   hideDialog: true,
  //   isAdded: true,
  //   add_UserName: "",
  //   add_UserName_err: "",
  //   add_EmailID: "",
  //   add_EmailID_err: "",
  //   Departments: [],
  //   add_Department: "",
  //   add_Department_err: "",

  //   Subdepartments: [],
  //   add_Subdepartment: "",
  //   add_Subdepartment_err: "",

  //   Level: [],
  //   add_Level: "",
  //   add_Level_err: "",

  //   hideeditDialog: true,
  //   isEdited: true,
  //   edit_UserName: "",
  //   edit_UserName_err: "",
  //   edit_EmailID: "",
  //   edit_EmailID_err: "",
  //   edit_Department: "",
  //   edit_Department_err: "",

  //   edit_Subdepartment: "",
  //   edit_Subdepartment_err: "",

  //   edit_Level: "",
  //   edit_Level_err: "",

  //   selectedval: {},
  //   selecteditem: "",
  //   overalllist: [],
  //   // subdepartmentItems:[]
  // };
  const [form] = useForm();
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [isAdded, setIsAdded] = useState(true);
  const [add_UserName, setAddUserName] = useState("");
  const [add_UserName_err, setAddUserNameErr] = useState("");
  const [add_EmailID, setAddEmailID] = useState("");
  const [add_EmailID_err, setAddEmailIDErr] = useState("");
  const [Departments, setDepartments] = useState([]);
  const [add_Department, setAddDepartment] = useState("");
  const [add_Department_err, setAddDepartmentErr] = useState("");
  const [Subdepartments, setSubdepartments] = useState([]);
  const [add_Subdepartment, setAddSubdepartment] = useState("");
  const [add_Subdepartment_err, setAddSubdepartmentErr] = useState("");
  const [Level, setLevel] = useState([]);
  const [add_Level, setAddLevel] = useState("");
  const [add_Level_err, setAddLevelErr] = useState("");
  const [hideeditDialog, setHideEditDialog] = useState(true);
  const [isEdited, setIsEdited] = useState(true);
  const [edit_UserName, setEditUserName] = useState("");
  const [edit_UserName_err, setEditUserNameErr] = useState("");
  const [edit_EmailID, setEditEmailID] = useState("");
  const [edit_EmailID_err, setEditEmailIDErr] = useState("");
  const [edit_Department, setEditDepartment] = useState("");
  const [edit_Department_err, setEditDepartmentErr] = useState("");
  const [edit_Subdepartment, setEditSubdepartment] = useState("");
  const [edit_Subdepartment_err, setEditSubdepartmentErr] = useState("");
  const [edit_Level, setEditLevel] = useState("");
  const [edit_Level_err, setEditLevelErr] = useState("");
  const [selectedval, setSelectedVal] = useState({});
  const [selecteditem, setSelectedItem] = useState<any>("");
  const [overalllist, setOverallList] = useState([]);
  const [add_Approver, setAddApprover] = useState<any>();
  const [Reviewer_name, setReviewerName] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);

  let columns: any = [
    {
      title: "User Name",
      dataIndex: "Name",
      key: "User Name",
      width: "20%",
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
      title: "User MailID",
      dataIndex: "EmailID",
      key: "User MailID",
      width: "38%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
      width: "16%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Sub Department",
      dataIndex: "SubDepartment",
      key: "Sub Department",
      width: "19%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Level",
      dataIndex: "Level",
      key: "Level",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "Department",
      key: "Manage",
      width: "11%",
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
    },
    {
      title: "",
      dataIndex: "Department",
      key: "Delete",
      width: "11%",
      align: "left",
      resizable: true,

      render: (text, record) => (
        <Button
          onClick={() => {
            DeleteUser(record);
            // showManageDrawer();
          }}
          style={{
            color: "rgba(203, 68, 68, 1)",
            border: "1px solid rgba(203, 68, 68, 1)",
          }}
        >
          X
        </Button>
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

    // {
    //   title: "View",
    //   dataIndex: "Fileurl",
    //   width: "7%",
    //   align: "left",
    //   resizable: true,
    //   render: (text, record) => (
    //     // <Button
    //     //   text="View"
    //     //   target="_blank"
    //     //   href={record.Fileurl}
    //     // />

    //     <img
    //       src={require("../../../../../Images/Eye.png")}
    //       alt="View"
    //       onClick={() => window.open(record.Fileurl, "_blank")}
    //     />
    //   ),
    //   responsive: ["md", "lg"],
    //   ellipsis: true,
    // },
  ];

  // private _getKey(item: any, index?: number): string {
  //   return item.key;
  // }

  function _getKey(item: any, index: number): string {
    return item.key;
  }

  // public async componentDidMount() {
  // this.setState(

  //   {
  //     items: await sp.web.lists.getByTitle("Approverlist").items(),
  //     overalllist: await sp.web.lists.getByTitle("Approverlist").items(),
  //     Departments: await sp.web.lists
  //       .getByTitle("Department Names")
  //       .items()
  //       .then((res) =>
  //         res.map((val) => ({
  //           text: val.Departments,
  //           key: val.code,

  //         }))

  //       ),
  //   },
  //   () => {
  //     console.log(this.state.Departments);
  //   }
  // );

  // public async componentDidMount() {
  //   const sp: SPFI = getSp();

  //   try {
  //     const [items, overalllist, departmentItems, levelItems] = await Promise.all([
  //       sp.web.lists.getByTitle("Approverlist").items.getAll(),
  //       sp.web.lists.getByTitle("Approverlist").items.getAll(),
  //       sp.web.lists.getByTitle("Department Names").items.getAll(),
  //       sp.web.lists.getByTitle("Request Level").items.getAll(),
  //     ]);
  //     console.log([items, overalllist, departmentItems,levelItems] );

  //     const Departments = departmentItems.map((val) => ({
  //       text: val.Departments,
  //       // key: val.code,
  //       key: val.Code,

  //     }));

  //     const Level = levelItems.map((val) => ({
  //       text: val.Text,
  //       // key: val.code,
  //       key: val.Key,

  //     }));

  //     this.setState(
  //       {
  //         items,
  //         overalllist,
  //         Departments,
  //         Level
  //       },
  //       () => {
  //         console.log(this.state.Departments);
  //         // console.log(this.state.subdepartmentItems);
  //         console.log(this.state.Level);
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error in componentDidMount:', error);
  //   }
  // }

  const fetchData = async () => {
    const sp = getSp();
    try {
      const [
        itemsData,
        overalllistData,
        departmentItemsData,
        levelItemsData,
      ]: any = await Promise.all([
        sp.web.lists.getByTitle("Approverlist").items.getAll(),
        sp.web.lists.getByTitle("Approverlist").items.getAll(),
        sp.web.lists.getByTitle("Department Names").items.getAll(),
        sp.web.lists.getByTitle("Request Level").items.getAll(),
      ]);

      console.log([
        itemsData,
        overalllistData,
        departmentItemsData,
        levelItemsData,
      ]);

      const DepartmentsData: any = departmentItemsData.map((val: any) => ({
        text: val.Departments,
        key: val.Code,
      }));

      const LevelData: any = levelItemsData.map((val: any) => ({
        text: val.Text,
        key: val.Key,
      }));

      setItems(itemsData);
      setOverallList(overalllistData);
      setDepartments(DepartmentsData);
      setLevel(LevelData);

      console.log(DepartmentsData);
      console.log(LevelData);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  //       add_Department: "",
  //       add_Department_err: "",
  //       add_Subdepartment: "",
  //       add_Subdepartment_err: "",
  //       add_Approver: "",
  //       add_UserName_err: "",
  //       add_EmailID_err: "",
  //       add_Level: "",
  //       add_Level_err: "",
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
      setAddUserName("");
      setAddEmailID("");
      setAddDepartment("");
      setAddDepartmentErr("");
      setAddSubdepartment("");
      setAddSubdepartmentErr("");
      setAddApprover("");
      setAddUserNameErr("");
      setAddEmailIDErr("");
      setAddLevel("");
      setAddLevelErr("");
      setSelectedItem("");
    }
    setOpen(false);
    form.resetFields();
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
  //       edit_Department: "",
  //       edit_Subdepartment:"",
  //       edit_Level:"",
  //       selectedval: {},
  //       edit_Department_err: "",
  //       edit_UserName_err: "",
  //       edit_EmailID_err: "",
  //       edit_Level_err: "",
  //     });
  // };

  const toggleeditHideDialog = () => {
    console.log(hideeditDialog);
    if (hideeditDialog) {
      setHideEditDialog(false);
    } else {
      setHideEditDialog(true);
      setIsEdited(true);
      setEditUserName("");
      setEditEmailID("");
      setSelectedItem("");
      setEditDepartment("");
      setEditSubdepartment("");
      setEditLevel("");
      setSelectedVal({});
      setEditDepartmentErr("");
      setEditUserNameErr("");
      setEditEmailIDErr("");
      setEditLevelErr("");
    }
  };

  const _renderItemColumn = (item, index: number, column) => {
    const fieldContent = item[column.fieldName] as string;

    switch (column.key) {
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
      case "Delete":
        return (
          <span>
            <FontIcon
              aria-label="Delete"
              iconName="Delete"
              className={styles.manage}
              style={{ color: "#0078d4" }}
              onClick={() => DeleteUser(item)}
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
    setOpen(true);
  };

  // const handledit_Username = (event, value) => {
  //   this.setState({
  //     edit_UserName: value,
  //   });
  // };

  const handledit_Username = (event, value) => {
    setEditUserName(value);
  };

  // const handleedit_UserMailID = (event, value) => {
  //   this.setState({
  //     edit_EmailID: value,
  //   });
  // };

  const handleedit_UserMailID = (event, value) => {
    setEditEmailID(value);
  };

  // const handleadd_Username = (event, value) => {
  //   this.setState({
  //     add_UserName: value,
  //   });
  // };

  const handleadd_Username = (event, value) => {
    setAddUserName(value);
  };

  // const handleadd_UserMailID = (event, value) => {
  //   this.setState({
  //     add_EmailID: value,
  //   });
  // };

  const handleadd_UserMailID = (event, value) => {
    setAddEmailID(value);
  };

  //       const handleadd_UserMailID = (event, value) => {
  //   const suffix = "@quadrasystems.net"; // Specify your desired email suffix
  //   const fullEmailID = value + suffix;

  //   this.setState({
  //     add_EmailID: fullEmailID,
  //   });
  // };

  // const handleadd_UserMailID = (event, value) => {
  //   const suffix = "@quadrasystems.net"; // Specify your desired email suffix
  //   const fullEmailID = value + suffix;
  //   setAddEmailID(fullEmailID);
  // };

  // const handleeditUser = async () => {
  //   if (edit_Department != "") {
  //     if (edit_UserName != "") {
  //       if (edit_EmailID != "") {
  //         const sp:SPFI=getSp()
  //         const list = sp.web.lists.getByTitle("Approverlist");

  //         await list.items
  //           .getById(selecteditem)
  //           .update({
  //             Name: edit_UserName,
  //             EmailID: edit_EmailID,
  //             Department: edit_Department,
  //             SubDepartment: edit_Subdepartment,
  //             Level: edit_Level,
  //           })
  //           .then(async (res) =>
  //             this.setState({
  //               isEdited: false,
  //               items: await sp.web.lists.getByTitle("Approverlist").items(),
  //               overalllist: await sp.web.lists
  //                 .getByTitle("Approverlist")
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
  //         edit_UserName_err: "Please specify UserName",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       edit_Department_err: "Please specify Department",
  //     });
  //   }
  // };

  const handleeditUser = async () => {
    console.log("handleedituse function called");

    if (edit_Department != "") {
      if (edit_UserName != "") {
        if (edit_EmailID != "") {
          try {
            const sp: SPFI = getSp();

            const list: any = sp.web.lists.getByTitle("Approverlist");

            await list.items
              .getById(selecteditem)
              .update({
                Name: edit_UserName,
                EmailID: edit_EmailID,
                Department: edit_Department,
                SubDepartment: edit_Subdepartment,
                Level: edit_Level,
              })
              .then(async (res) => {
                setIsEdited(false);
                setItems(await sp.web.lists.getByTitle("Approverlist").items());
                setOverallList(
                  await sp.web.lists.getByTitle("Approverlist").items()
                );
              });
          } catch (error) {
            console.error("Error updating user:", error);
          }
        } else {
          setEditEmailIDErr("Please specify User MailID");
        }
      } else {
        setEditUserNameErr("Please specify UserName");
      }
    } else {
      setEditDepartmentErr("Please specify Department");
    }
  };

  // const editUser = (value) => {
  //   this.setState({
  //     edit_UserName: value.Name,
  //     edit_EmailID: value.EmailID,
  //     hideeditDialog: false,
  //     edit_Department: value.Department,
  //     edit_Subdepartment:value.SubDepartment,
  //     edit_Level:value.Level,
  //     isEdited: "false",
  //     selecteditem: value.ID,
  //     selectedval: value,
  //   });
  // };

  const editUser = (value: any) => {
    setEditUserName(value.Name);
    setEditEmailID(value.EmailID);
    setEditDepartment(value.Department);
    setEditSubdepartment(value.SubDepartment);
    setEditLevel(value.Level);
    setHideEditDialog(false);
    setIsEdited(true);
    setSelectedItem(value.ID);
    setSelectedVal(value);
  };

  // const DeleteUser = async (value) => {
  //   this.setState(
  //     {
  //       selecteditem: value.ID,
  //       selectedval: value,
  //     },
  //     async () => {
  //       const sp:SPFI=getSp()
  //       const list = await sp.web.lists.getByTitle("Approverlist");
  //       console.log(this.state.selecteditem);
  //       await list.items
  //         .getById(this.state.selecteditem)
  //         .delete()
  //         .then(async (res) =>
  //           this.setState({
  //             hideeditDialog: false,
  //             isEdited: false,
  //             items: await sp.web.lists.getByTitle("Approverlist").items(),
  //             overalllist: await sp.web.lists
  //               .getByTitle("Approverlist")
  //               .items(),
  //           })
  //         );
  //     }
  //   );
  // };

  const DeleteUser = async (value) => {
    const selectedId = value.ID;
    setSelectedItem(selectedId);
    setSelectedVal(value);

    try {
      const sp: SPFI = getSp();
      const list = await sp.web.lists.getByTitle("Approverlist");
      console.log(selectedId);

      await list.items
        .getById(selectedId)
        .delete()
        .then(async (res) => {
          setHideEditDialog(false);
          setIsEdited(false);
          const updatedItems: any = await sp.web.lists
            .getByTitle("Approverlist")
            .items();
          const updatedOverallList: any = await sp.web.lists
            .getByTitle("Approverlist")
            .items();
          setItems(updatedItems);
          setOverallList(updatedOverallList);
        });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // const _filter = (event, text) => {
  //   console.log(text);
  //   if (text != "") {
  //     let val = overalllist.filter(
  //       (i: any) =>
  //         i.Name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  //         i.Department.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
  //         i.EmailID.toLowerCase().indexOf(text.toLowerCase()) > -1
  //     );
  //     let condition = text.toLowerCase() ? val : overalllist;
  //     console.log(val);
  //     // this.setState({
  //     //   items: val,
  //     // });
  //     setItems(val);
  //   } else {
  //     // this.setState({
  //     //   items: this.state.overalllist,
  //     // });
  //     setItems(overalllist);
  //   }
  // };

  const _onFilter = (text: string) => {
    // Filter the overalllist based on the provided text
    const filteredData = overalllist.filter(
      (item: any) =>
        item.Name.toLowerCase().includes(text.toLowerCase()) ||
        item.Department.toLowerCase().includes(text.toLowerCase()) ||
        item.EmailID.toLowerCase().includes(text.toLowerCase())
    );

    // Set the filtered data and searchText state variables
    setFilteredData(filteredData);
    setSearchText(text);
  };

  const addDepartmentChange = async (event, value) => {
    console.log(value);

    const subDept = await getSubDepartmentlist(value.value);
    //  this.setState({
    //   add_Department: value.text,
    //   Subdepartments:subDept
    // });
    setAddDepartment(value.value);
    setSubdepartments(subDept);
  };
  // console.log(this.state.add_Department);
  // const editDepartmentChange = (event, value) => {
  //   this.setState({
  //     edit_Department: value.text,
  //   });
  // };
  const editDepartmentChange = async (event, value) => {
    console.log(value);

    const subDept = await getSubDepartmentlist(value.text);
    //  this.setState({
    //   edit_Department: value.text,
    //   Subdepartments:subDept
    // });
    setEditDepartment(value.text);
    setSubdepartments(subDept);
  };

  // const addSubDepartmentChange = (event, value) => {
  //   this.setState({
  //     add_Subdepartment: value.text,
  //   });
  // };

  const addSubDepartmentChange = (event, value) => {
    setAddSubdepartment(value.value);
  };

  console.log(add_Subdepartment);

  // const editSubDepartmentChange = (event, value) => {
  //   this.setState({
  //     edit_Subdepartment: value.text,
  //   });
  // };

  const editSubDepartmentChange = (event, value) => {
    setEditSubdepartment(value.text);
  };

  console.log(edit_Subdepartment);

  // const addLevelChange = (event, value) => {
  //   this.setState({
  //     add_Level: value.text,
  //   });
  // };

  const addLevelChange = (event, value) => {
    setAddLevel(value.text);
  };

  console.log(add_Level);

  // const editLevelChange = (event, value) => {
  //   this.setState({
  //     edit_Level: value.text,
  //   });
  // };
  const editLevelChange = (event, value) => {
    setEditLevel(value.text);
  };

  console.log(edit_Level);

  // const handleAddUser = async () => {
  //   const sp:SPFI=getSp()
  //   if (this.state.add_Department != "") {
  //     if (this.state.add_UserName != "") {
  //       if (this.state.add_EmailID != "") {
  //         await sp.web.lists
  //           .getByTitle("Approverlist")
  //           .items.add({
  //             Name: this.state.add_UserName,
  //             EmailID: this.state.add_EmailID,
  //             Department: this.state.add_Department,
  //             SubDepartment: this.state.add_Subdepartment
  //           })
  //           .then(async (res) =>
  //             this.setState({
  //               isAdded: false,
  //               items: await sp.web.lists.getByTitle("Approverlist").items(),
  //               overalllist: await sp.web.lists
  //                 .getByTitle("Approverlist")
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
  //         add_UserName_err: "Please specify UserName",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       add_Department_err: "Please specify Department",
  //     });
  //   }

  // };

  const handleAddUser = async () => {
    const sp: SPFI = getSp();
    if (add_Level != "") {
      if (add_Subdepartment != "") {
        if (add_Department != "") {
          if (add_UserName != "") {
            if (add_EmailID != "") {
              await sp.web.lists
                .getByTitle("Approverlist")
                .items.add({
                  Name: add_UserName,
                  EmailID: add_EmailID,
                  Department: add_Department,
                  SubDepartment: add_Subdepartment,
                  Level: add_Level,
                })
                .then(async (res) =>
                  // this.setState({
                  //   isAdded: false,
                  //   items: await sp.web.lists.getByTitle("Approverlist").items(),
                  //   overalllist: await sp.web.lists
                  //     .getByTitle("Approverlist")
                  //     .items(),
                  // })
                  {
                    setIsAdded(false);
                    setItems(
                      await sp.web.lists.getByTitle("Approverlist").items()
                    );
                    setOverallList(
                      await sp.web.lists.getByTitle("Approverlist").items()
                    );
                  }
                );
            } else {
              // this.setState({
              //   add_EmailID_err: "Please specify User MailID",
              // });
              setAddEmailID("Please specify User MailID");
            }
          } else {
            // this.setState({
            //   add_UserName_err: "Please specify UserName",
            // });
            setAddUserNameErr("Please specify UserName");
          }
        } else {
          // this.setState({
          //   add_Department_err: "Please specify Department",
          // });
          setAddDepartmentErr("Please specify Department");
        }
      } else {
        // this.setState({
        //   add_Subdepartment_err: "Please specify Sub Department",
        // });
        setAddSubdepartmentErr("Please specify Sub Department");
      }
    } else {
      // this.setState({
      //   add_Level_err: "Please specify Level",
      // });
      setAddLevelErr("Please specify Level");
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <div>
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
        >
          {isAdded ? (
            <div>
              <div style={{ margin: "5px" }}>
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
                <div style={{ width: "350px", marginTop: "15px" }}>
                  <Dropdown
                    placeholder={Reviewer_name}
                    label="Department"
                    required
                    onChange={addDepartmentChange}
                    errorMessage={add_Department_err}
                    options={Departments}
                    // disabled ={this.state.SubDepartment.length===0 ? true:false}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <Dropdown
                    // placeholder={this.state.Reviewer_name}
                    placeholder="Select Sub-Department"
                    label="Sub Department"
                    required
                    onChange={addSubDepartmentChange}
                    errorMessage={add_Subdepartment_err}
                    options={Subdepartments}
                    disabled={Subdepartments.length == 0 ? true : false}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <Dropdown
                    // placeholder={this.state.Reviewer_name}
                    required
                    placeholder="Select Level"
                    label="Level"
                    onChange={addLevelChange}
                    errorMessage={add_Level_err}
                    options={Level}
                    disabled={Level.length == 0 ? true : false}
                  />
                </div>
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
          )}
        </Dialog> */}

      {/*Edit Projects*/}
      {/* <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.addProjectDialog
          }
          hidden={hideeditDialog}
          dialogContentProps={dialogContentProps_edit}
          isBlocking={false}
          onDismiss={toggleeditHideDialog}
        >
          {isEdited ? (
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
                <div style={{ width: "350px", marginTop: "15px" }}>
                  <Dropdown
                    placeholder={edit_Department}
                    label="Department"
                    required
                    onChange={editDepartmentChange}
                    errorMessage={edit_Department_err}
                    options={Departments}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <Dropdown
                    placeholder={edit_Subdepartment}
                    label="Sub Department"
                    required
                    onChange={editSubDepartmentChange}
                    errorMessage={edit_Subdepartment_err}
                    options={Subdepartments}
                  />
                </div>
                <div style={{ width: "350px", marginTop: "15px" }}>
                  <Dropdown
                    // placeholder={this.state.edit_Level}
                    placeholder={edit_Level}
                    label="Level"
                    required
                    onChange={editLevelChange}
                    errorMessage={edit_Level_err}
                    options={Level}
                  />
                </div>
              </div>
              <DialogFooter>
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
          )}
        </Dialog> */}
      {/* </div> */}
      <div>
        <div style={{ marginLeft: "3%", marginTop: "50px" }}>
          <div
            style={{
              width: "98%",
            }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Button
                  onClick={showDrawer}
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
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Search
                  placeholder="Search"
                  onSearch={_onFilter}
                  style={{ width: 300 }}
                />
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "20px", width: "98%" }}>
            <Row gutter={24}>
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={searchText ? filteredData : overalllist}
                />
              </Col>
            </Row>
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
                        <Col span={24}>
                          <Form.Item
                            label="Department"
                            name="Department"
                            style={{
                              maxWidth: 400,
                              marginTop: 17,
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Please select your Department!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select an option"
                              // disabled={valueFileType !== "Old Files"}
                              // value={departmentKey}
                              onChange={(event, option) =>
                                addDepartmentChange(event, option)
                              }
                            >
                              {Departments.map((option: any) => (
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
                          <Form.Item
                            label="Sub Department"
                            name="Sub Department"
                            style={{
                              maxWidth: 400,
                              marginTop: 17,
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Please select your Sub Department!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select an option"
                              // disabled={valueFileType !== "Old Files"}
                              // value={departmentKey}
                              onChange={(event, option) =>
                                addSubDepartmentChange(event, option)
                              }
                              disabled={
                                Subdepartments.length == 0 ? true : false
                              }
                            >
                              {Subdepartments.map((option: any) => (
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
                          <Form.Item
                            label="Level"
                            name="Level"
                            style={{
                              maxWidth: 400,
                              marginTop: 17,
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Please select your level!",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select an option"
                              // disabled={valueFileType !== "Old Files"}
                              // value={departmentKey}
                              onChange={(event, option) =>
                                addLevelChange(event, option)
                              }
                              disabled={Level.length == 0 ? true : false}
                            >
                              {Level.map((option: any) => (
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

                      <Row gutter={24} style={{ marginTop: "300px" }}>
                        <Col
                          span={24}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
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
                              onClick={() => toggleHideDialog()}
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
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
