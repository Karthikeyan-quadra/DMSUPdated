import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";

import { Web, IWeb, Items } from "@pnp/sp/presets/all";
import "@pnp/sp/sputilities";
import { Text } from "@fluentui/react/lib/Text";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";

import "@pnp/sp/webs";
import "@pnp/sp/files";
// import { sp } from "@pnp/sp";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";

import Approvers from "./Approvers";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  FontIcon,
  INavLink,
  INavLinkGroup,
  INavStyles,
  Label,
  mergeStyles,
  Nav,
  PrimaryButton,
  Separator,
  TextField,
} from "office-ui-fabric-react";
import { getDepartmentlistedit } from "../../Data/GetSiteList";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Layout,
  notification,
  Row,
} from "antd";
import form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import Project from "./Project";
// import { Edit } from "../../../../../Images/Edit.png";
const sp: SPFI = getSp();
const dialogContentProps = {
  type: DialogType.normal,
  title: "Add Department",
};
const dialogContentPropsSection = {
  type: DialogType.normal,
  title: "Add Section",
};
const iconClass = mergeStyles({
  fontSize: 100,
  width: "500px",
  color: "green",
  textAlign: "center",
});
const dialogContentProps_edit = {
  type: DialogType.normal,
  title: "Edit Department",
};
// export default class Department extends React.Component<{}, any> {
export default function Department(props) {
  const [form] = useForm();
  const [items, setItems] = useState<any>([]);
  const [hideDeptDialog, setHideDeptDialog] = useState(true);
  const [isDeptAdded, setIsDeptAdded] = useState(true);
  const [add_Dept_Title_err, setAddDeptTitleErr] = useState("");
  const [add_Dept_Title, setAddDeptTitle] = useState("");
  const [add_Dept_Code_err, setAddDeptCodeErr] = useState("");
  const [add_Dept_Code, setAddDeptCode] = useState("");

  const [hideDepteditDialog, setHideDeptEditDialog] = useState(true);
  const [isDeptEdited, setIsDeptEdited] = useState(true);
  const [edit_Dept_Title_err, setEditDeptTitleErr] = useState("");
  const [edit_Dept_Title, setEditDeptTitle] = useState("");
  const [edit_Dept_Code_err, setEditDeptCodeErr] = useState("");
  const [edit_Dept_Code, setEditDeptCode] = useState("");
  const [edit_DeptID, setEditDeptID] = useState<any>("");
  const [temp_Deptname, setTempDeptName] = useState("");

  const [hideSectionDialog, setHideSectionDialog] = useState(true);
  const [isSectionAdded, setIsSectionAdded] = useState(true);
  const [add_Section_Title_err, setAddSectionTitleErr] = useState("");
  const [add_Section_Title, setAddSectionTitle] = useState("");
  const [add_Section_Code_err, setAddSectionCodeErr] = useState("");
  const [add_Section_Code, setAddSectionCode] = useState("");
  const [sectionDept, setSectionDept] = useState("");

  const [hideSectioneditDialog, setHideSectionEditDialog] = useState(true);
  const [isSectionEdited, setIsSectionEdited] = useState(true);
  const [edit_Section_Title_err, setEditSectionTitleErr] = useState("");
  const [edit_Section_Title, setEditSectionTitle] = useState("");
  const [edit_Section_Code_err, setEditSectionCodeErr] = useState("");
  const [edit_Section_Code, setEditSectionCode] = useState("");
  const [edit_SectionID, setEditSectionID] = useState<any>("");
  const [value, setValue] = useState<any>();
  const [open, setOpen] = useState(false);

  const [editdeptopen, seteditdeptOpen] = useState(false);

  const [sectionopen, setSectionOpen] = useState(false);
  const [editsectionopen, setEditSectionOpen] = useState(false);
  const [disablesubmit, setDisableSubmit] = useState(false);
  const [onchanged, setOnChanged] = useState(false);

  // public toggleDepteditHideDialog = () => {
  //   console.log(this.state.hideDepteditDialog);
  //   if (this.state.hideDepteditDialog)
  //     this.setState({
  //       hideDepteditDialog: false,
  //     });
  //   else
  //     this.setState({
  //       hideDepteditDialog: true,
  //       isDeptEdited: true,
  //       edit_Dept_Title_err: "",
  //       edit_Dept_Title: "",
  //       edit_Dept_Code_err: "",
  //       edit_Dept_Code: "",
  //       edit_DeptID: "",
  //       temp_Deptname: "",
  //     });
  // };
  const onClose = () => {
    setOpen(false);
  };
  const onEditDeptClose = () => {
    seteditdeptOpen(false);
  };

  const onSectionClose = () => {
    setSectionOpen(false);
    form.resetFields();
  };
  const onEditSectionClose = () => {
    setEditSectionOpen(false);
  };

  useEffect(() => {
    // Fetch the initial list of departments
    getDepartmentlistedit().then(setItems);
    console.log(items);
  }, []);

  const toggleDepteditHideDialog = () => {
    console.log(hideDepteditDialog);
    if (hideDepteditDialog) {
      setHideDeptEditDialog(false);
    } else {
      setHideDeptEditDialog(true);
      setIsDeptEdited(true);
      setEditDeptTitleErr("");
      setEditDeptTitle("");
      setEditDeptCodeErr("");
      setEditDeptCode("");
      setEditDeptID("");
      setTempDeptName("");
    }
    seteditdeptOpen(false);
  };

  // useEffect(() => {
  //   // Fetch initial department list
  //   const fetchDepartments = async () => {
  //     const initialItems = await getDepartmentlistedit();
  //     setItems(initialItems);
  //   };
  //   fetchDepartments();
  // }, []);
  const toggleSectioneditHideDialog = () => {
    console.log(hideSectioneditDialog);
    if (hideSectioneditDialog)
      // this.setState({
      //   hideSectioneditDialog: false,
      // });
      setHideSectionEditDialog(false);
    // this.setState({
    //   hideSectioneditDialog: true,
    //   isSectionEdited: true,
    //   edit_Section_Title_err: "",
    //   edit_Section_Title: "",
    //   edit_Section_Code_err: "",
    //   edit_Section_Code: "",
    //   edit_SectionID: "",
    // });
    else setHideSectionEditDialog(true);
    setIsSectionEdited(true);
    setEditSectionTitleErr("");
    setEditSectionTitle("");
    setEditSectionCodeErr("");
    setEditSectionCode("");
    setEditSectionID("");
  };

  // const Deleteitem = async () => {
  //   const sp: SPFI = getSp();

  //   const list = sp.web.lists.getByTitle("Department Names");
  //   await list.items
  //     .getById(edit_DeptID)
  //     .delete()
  //     .then(async () => {
  //       // this.setState({
  //       //   isDeptEdited: false,
  //       //   value: await getDepartmentlistedit().then((val) =>
  //       //     this.setState({
  //       //       items: val,
  //       //     })
  //       //   ),
  //       // })
  //       setIsDeptEdited(false);
  //       setValue(await getDepartmentlistedit().then((val) => setItems(val)));
  //       const updatedItems = await getDepartmentlistedit();
  //       setItems(updatedItems);
  //     });
  //

  //   openDeptDeleteNotification();

  //   seteditdeptOpen(false);
  // };

  const Deleteitem = async () => {
    const sp: SPFI = getSp();

    try {
      // Fetch the department using its name and code
      const department = await sp.web.lists
        .getByTitle("Department Names")
        .items.getById(edit_DeptID)();

      if (!department) {
        console.error("Department not found.");
        return;
      }

      // const deptId: any = department[0].Id;
      console.log(department);

      // Fetch all sub-departments associated with the department
      const subDepartments = await sp.web.lists
        .getByTitle("Sub departments Main")
        .items.filter(`ParentFolders eq '${edit_Dept_Title}'`)();
      console.log(subDepartments);

      // Delete each sub-department
      for (const subDept of subDepartments) {
        await sp.web.lists
          .getByTitle("Sub departments Main")
          .items.getById(subDept.Id)
          .delete();
      }

      // Delete the department
      await sp.web.lists
        .getByTitle("Department Names")
        .items.getById(edit_DeptID)
        .delete();

      // Update the state
      setIsDeptEdited(false);
      const updatedItems = await getDepartmentlistedit();
      setItems(updatedItems);

      openDeptDeleteNotification();
      seteditdeptOpen(false);
    } catch (error) {
      console.error("Error deleting department and sub-departments:", error);
    }
  };

  const DeleteSection = async () => {
    const sp: SPFI = getSp();
    const list = sp.web.lists.getByTitle("Sub departments Main");
    await list.items
      .getById(edit_SectionID)
      .delete()
      .then(async (res) => {
        // this.setState({
        //   isSectionEdited: false,
        //   value: await getDepartmentlistedit().then((val) =>
        //     this.setState({
        //       items: val,
        //     })
        //   ),
        // })
        setIsSectionEdited(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
        const updatedItems = await getDepartmentlistedit();
        setItems(updatedItems);
      });
    openSubdeptDeleteNotification();
    setEditSectionOpen(false);
  };

  // public async componentDidMount() {
  //   this.setState(
  //     {
  //       value: await getDepartmentlistedit().then((val) =>
  //         this.setState({
  //           items: val,
  //         })
  //       ),
  //     },
  //     () => {
  //       console.log(this.state.items);
  //     }
  //   );
  // }

  const fetchData = async () => {
    setValue(await getDepartmentlistedit().then((val) => setItems(val)));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleDeptHideDialog = () => {
    setOpen(false);
    form.resetFields();

    console.log(hideDeptDialog);
    if (hideDeptDialog)
      // this.setState({
      //   hideDeptDialog: false,
      // });
      setHideDeptDialog(false);
    // this.setState({
    //   hideDeptDialog: true,
    //   isDeptAdded: true,
    //   add_Dept_Title_err: "",
    //   add_Dept_Title: "",
    //   add_Dept_Code_err: "",
    //   add_Dept_Code: "",
    // });
    else setHideDeptDialog(true);
    setIsDeptAdded(true);
    setAddDeptTitleErr("");
    setAddDeptTitle("");
    setAddDeptCodeErr("");
    setAddDeptCode("");
  };

  const toggleSectionHideDialog = () => {
    console.log(hideSectionDialog);
    if (hideSectionDialog)
      // this.setState({
      //   hideSectionDialog: false,
      // });
      setHideSectionDialog(false);
    // this.setState({
    //   hideSectionDialog: true,
    //   sectionDept: "",
    //   isSectionAdded: true,
    //   add_Section_Title_err: "",
    //   add_Section_Title: "",
    //   add_Section_Code_err: "",
    //   add_Section_Code: "",
    // });
    else setHideSectionDialog(true);
    setSectionDept("");
    setIsSectionAdded(true);
    setAddSectionTitleErr("");
    setAddSectionTitle("");
    setAddSectionCodeErr("");
    setAddSectionCode("");
    setSectionOpen(false);
  };

  const navStyles: Partial<INavStyles> = {
    root: { width: 530 },
  };
  const handleeditDept = async () => {
    setDisableSubmit(true);
    const sp: SPFI = getSp();

    const list = sp.web.lists.getByTitle("Department Names");

    await list.items
      .getById(edit_DeptID)
      .update({
        Departments: edit_Dept_Title,
        Code: edit_Dept_Code,
      })
      .then(async (res) => {
        const items: any[] = await sp.web.lists
          .getByTitle("Sub departments Main")
          .items.top(1)
          .filter(`ParentFolders eq '${temp_Deptname}'`)();

        // see if we got something
        if (items.length > 0) {
          const updatedItem = await sp.web.lists
            .getByTitle("Sub departments Main")
            .items.getById(items[0].Id)
            .update({
              ParentFolders: edit_Dept_Title,
            });

          console.log(JSON.stringify(updatedItem));
        }
        // this.setState({
        //   isDeptEdited: false,
        //   value: await getDepartmentlistedit().then((val) =>
        //     this.setState({
        //       items: val,
        //     })
        //   ),
        // });

        setIsDeptEdited(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
        const updatedItems = await getDepartmentlistedit();
        setItems(updatedItems);
      });
    seteditdeptOpen(false);
    if (onchanged) {
      openEditdeptNotification();
      setOnChanged(false);
    }
    setDisableSubmit(false);
  };

  const handleeditSection = async () => {
    setDisableSubmit(true);
    const sp: SPFI = getSp();

    const list = sp.web.lists.getByTitle("Sub departments Main");

    await list.items
      .getById(edit_SectionID)
      .update({
        SubFolders: edit_Section_Title,
        Code: edit_Section_Code,
      })
      .then(async (res) => {
        // this.setState({
        //   isSectionEdited: false,
        //   value: await getDepartmentlistedit().then((val) =>
        //     this.setState({
        //       items: val,
        //     })
        //   ),
        // });
        setIsSectionEdited(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
        const updatedItems = await getDepartmentlistedit();
        setItems(updatedItems);
      });

    setEditSectionOpen(false);
    if (onchanged) {
      openEditSubdeptNotification();
      setOnChanged(false);
    }
    setDisableSubmit(false);
  };
  const editSection = (value) => {
    console.log(value);
    console.log("Edit section function called");
    // this.setState({
    //   hideSectioneditDialog: false,
    //   isSectionEdited: true,
    //   edit_Section_Title: value.name,
    //   edit_SectionID: value.Id,

    //   edit_Section_Code: value.code,
    // });
    setEditSectionOpen(true);
    setHideSectionEditDialog(false);
    setIsSectionEdited(true);
    setEditSectionTitle(value.name);
    setEditSectionID(value.Id);
    setEditSectionCode(value.code);
    form.setFieldsValue({
      "Sub-Section Title": value.name,
      "Sub-Section Code": value.code,
    });
  };

  const editDept = (value) => {
    console.log(value);
    console.log("Edit department function called");

    // this.setState({
    //   hideDepteditDialog: false,
    //   isDeptEdited: true,
    //   edit_Dept_Title: value.name,
    //   edit_DeptID: value.Id,
    //   temp_Deptname: value.name,
    //   edit_Dept_Code: value.code,
    // });
    seteditdeptOpen(true);
    setHideDeptEditDialog(false);
    setIsDeptEdited(true);
    setEditDeptTitle(value.name);
    setEditDeptID(value.Id);
    setTempDeptName(value.name);
    setEditDeptCode(value.code);
    form.setFieldsValue({
      "Department Title": value.name,
      "Department Code": value.code,
    });
  };

  const handleedit_Dept_Title = (e: any) => {
    // this.setState({
    //   edit_Dept_Title: value,
    // });
    setEditDeptTitle(e.target.value);
    setOnChanged(true);
  };
  const handleedit_Dept_Code = (e: any) => {
    // this.setState({
    //   edit_Dept_Code: value,
    // });
    setEditDeptCode(e.target.value);
    setOnChanged(true);
  };
  const handleedit_Section_Title = (e: any) => {
    // this.setState({
    //   edit_Section_Title: value,
    // });
    setEditSectionTitle(e.target.value);
    setOnChanged(true);
    console.log(edit_Section_Title);
  };
  const handleedit_Section_Code = (e: any) => {
    // this.setState({
    //   edit_Section_Code: value,
    // });

    setEditSectionCode(e.target.value);
    setOnChanged(true);
  };
  const _onRenderLink = (group: INavLink) => {
    return (
      <table style={{ tableLayout: "fixed", width: "100%", textAlign: "left" }}>
        <tr>
          <td>{group.name}</td>
          <td style={{ textAlign: "right" }}>{group.code}</td>
          <td>
            <FontIcon
              aria-label="EditSolid12"
              iconName="EditSolid12"
              style={{
                color: "rgb(0 120 212)",
                float: "right",
                marginRight: "20px",
                padding: "0 10px",
              }}
              onClick={() => editSection(group)}
            />
          </td>
        </tr>
      </table>
    );
  };
  const _onRenderGroupHeader = (group) => {
    return (
      <>
        <Text variant="xLarge" style={{ fontSize: "17px" }}>
          {group.name}
          <FontIcon
            className={styles.anihover}
            aria-label="EditSolid12"
            iconName="EditSolid12"
            style={{
              color: "rgb(0 120 212)",
              float: "right",
              marginRight: "20px",
              padding: "0 10px",
            }}
            onClick={() => editDept(group)}
          />
          <FontIcon
            className={styles.anihover}
            aria-label="AddToShoppingList"
            iconName="AddToShoppingList"
            style={{
              color: "#1c945d",
              float: "right",
              marginRight: "20px",
              padding: "0 10px",
            }}
            onClick={() => addSection(group)}
          />
          <Label
            style={{
              float: "right",
              marginRight: "60px",
              fontSize: "17px",
              padding: "0 10px",
            }}
          >
            {group.code}
          </Label>
        </Text>

        <Separator />
      </>
    );
  };
  const handleaddDept = async () => {
    setDisableSubmit(true);
    console.log("Handle Add Department function called");
    const sp: SPFI = getSp();

    await sp.web.lists
      .getByTitle("Department Names")
      .items.add({
        Departments: add_Dept_Title,
        Code: add_Dept_Code,
      })
      .then(async () => {
        // this.setState({
        //   isDeptAdded: false,
        //   value: await getDepartmentlistedit().then((val) =>
        //     this.setState({
        //       items: val,
        //     })
        //   ),
        // })
        setIsDeptAdded(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
        const updatedItems = await getDepartmentlistedit();
        setItems(updatedItems);
      });

    setOpen(false);
    openDeptNotification();
    form.resetFields();
    setDisableSubmit(false);
  };

  // const handleaddSection = async () => {
  //   const sp: SPFI = getSp();

  //   if (add_Section_Title != "") {
  //     if (add_Section_Code != "") {
  //       await sp.web.lists
  //         .getByTitle("Sub departments Main")
  //         .items.add({
  //           ParentFolders: sectionDept,
  //           SubFolders: add_Section_Title,
  //           Code: add_Section_Code,
  //         })
  //         .then(async () => {
  //           // this.setState({
  //           //   isSectionAdded: false,
  //           //   value: await getDepartmentlistedit().then((val) =>
  //           //     this.setState({
  //           //       items: val,
  //           //     })
  //           //   ),
  //           // })
  //           setIsSectionAdded(false);
  //           setValue(
  //             await getDepartmentlistedit().then((val) => setItems(val))
  //           );
  //         });
  //     } else {
  //       // this.setState({
  //       //   add_Section_Code_err: "Please specify Code",
  //       // });
  //       setAddSectionCodeErr("Please specify Code");
  //     }
  //   } else {
  //     // this.setState({
  //     //   add_Section_Title_err: "Please specify Department name",
  //     // });
  //     setAddSectionTitleErr("Please specify Department name");
  //   }
  // };
  // const handleadd_Dept_Title = (event, value) => {
  //   // this.setState({
  //   //   add_Dept_Title: value,
  //   // });
  //   setAddDeptTitle(value);
  // };

  const handleaddSection = async () => {
    setDisableSubmit(true);

    const sp: SPFI = getSp();

    await sp.web.lists
      .getByTitle("Sub departments Main")
      .items.add({
        ParentFolders: sectionDept,
        SubFolders: add_Section_Title,
        Code: add_Section_Code,
      })
      .then(async () => {
        // this.setState({
        //   isSectionAdded: false,
        //   value: await getDepartmentlistedit().then((val) =>
        //     this.setState({
        //       items: val,
        //     })
        //   ),
        // })
        setIsSectionAdded(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
        const updatedItems = await getDepartmentlistedit();
        setItems(updatedItems);
      });
    setSectionOpen(false);
    openSubdeptNotification();
    form.resetFields();
    setDisableSubmit(false);
  };

  const handleadd_Dept_Title = (e: any) => {
    // this.setState({
    //   add_Dept_Title: value,
    // });
    setAddDeptTitle(e.target.value);
  };
  // const handleadd_Section_Title = (event, value) => {
  //   // this.setState({
  //   //   add_Section_Title: value,
  //   // });
  //   setAddSectionTitle(value);
  // };

  const handleadd_Section_Title = (e: any) => {
    // this.setState({
    //   add_Section_Title: value,
    // });
    setAddSectionTitle(e.target.value);
  };
  const addDepartment = () => {
    // this.setState({
    //   hideDeptDialog: false,
    //   isDeptAdded: true,
    // });
    setHideDeptDialog(false);
    setIsDeptAdded(true);
    setOpen(true);
    form.resetFields();
  };
  // const addSection = (group) => {
  //   // this.setState({
  //   //   hideSectionDialog: false,
  //   //   isSectionAdded: true,
  //   //   sectionDept: group.name,
  //   // });
  //   setHideSectionDialog(false);
  //   setIsSectionAdded(true);
  //   setSectionDept(group.name);
  // };
  const addSection = (item) => {
    console.log(item);
    // this.setState({
    //   hideSectionDialog: false,
    //   isSectionAdded: true,
    //   sectionDept: group.name,
    // });
    setSectionOpen(true);
    setHideSectionDialog(false);
    setIsSectionAdded(true);
    setSectionDept(item.name);
    form.resetFields();
  };
  // const handleadd_Dept_Code = (event, value) => {
  //   // this.setState({
  //   //   add_Dept_Code: value,
  //   // });
  //   setAddDeptCode(value);
  // };
  const handleadd_Dept_Code = (e: any) => {
    // this.setState({
    //   add_Dept_Code: value,
    // });
    setAddDeptCode(e.target.value);
  };
  // const handleadd_Section_Code = (event, value) => {
  //   // this.setState({
  //   //   add_Section_Code: value,
  //   // });
  //   setAddSectionCode(value);
  // };

  const handleadd_Section_Code = (e: any) => {
    // this.setState({
    //   add_Dept_Code: value,
    // });
    setAddSectionCode(e.target.value);
  };

  const openDeptNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Added</span>
      ),
      description: "You have added the department successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../../Images/CheckMark.png")}
          alt="Success"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  const openDeptDeleteNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "red", fontWeight: "bold" }}>Deleted</span>
      ),
      description: "You have deleted the department successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../../Images/Cancel.png")}
          alt="Delete"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  const openEditdeptNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Updated</span>
      ),
      description: "You have Updated the department successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../../Images/CheckMark.png")}
          alt="Success"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  const openSubdeptNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Added</span>
      ),
      description: "You have added the sub-department successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../../Images/CheckMark.png")}
          alt="Success"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  const openEditSubdeptNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Updated</span>
      ),
      description: "You have updated the sub-department successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../../Images/CheckMark.png")}
          alt="Success"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  const openSubdeptDeleteNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "red", fontWeight: "bold" }}>Deleted</span>
      ),
      description: "You have deleted the department successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../../Images/Cancel.png")}
          alt="Delete"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  return (
    // <>
    //   <div
    //     className={styles.anihover}
    //     onClick={addDepartment}
    //     style={{ padding: "10px" }}
    //   >
    //     <FontIcon
    //       aria-label="CircleAddition"
    //       iconName="CircleAddition"
    //       style={{
    //         color: "rgb(0 120 212)",
    //         padding: "0 10px",
    //         fontSize: "17px",
    //       }}
    //     />
    //     <Text style={{ marginLeft: "5px" }} variant="xLarge">
    //       Add Department
    //     </Text>
    //   </div>

    //   <Separator />
    //   <Nav
    //     styles={navStyles}
    //     onRenderLink={_onRenderLink}
    //     onRenderGroupHeader={_onRenderGroupHeader}
    //     ariaLabel="Nav example similar to one found in this demo page"
    //     groups={items}
    //   />
    //   <Dialog
    //     containerClassName={
    //       "ms-dialogMainOverride " + styles.addProjectDialog
    //     }
    //     hidden={hideDeptDialog}
    //     dialogContentProps={dialogContentProps}
    //     isBlocking={false}
    //     onDismiss={toggleDeptHideDialog}
    //   >
    //     {isDeptAdded ? (
    //       <div>
    //         <div style={{ margin: "15px" }}>
    //           <div
    //             style={{
    //               width: "350px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Department Title"
    //               placeholder="Specify Department Name"
    //               resizable={false}
    //               onChange={handleadd_Dept_Title}
    //               errorMessage={add_Dept_Title_err}
    //             />
    //           </div>

    //           <div style={{ width: "350px", marginTop: "15px" }}>
    //             <TextField
    //               required
    //               label="Department Code"
    //               placeholder="Specify Department Unique ID"
    //               onChange={handleadd_Dept_Code}
    //               resizable={false}
    //               errorMessage={add_Dept_Code_err}
    //             />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <PrimaryButton
    //             style={{
    //               backgroundColor: "#0078D4",
    //             }}
    //             onClick={handleaddDept}
    //             text="Submit"
    //           />
    //           <DefaultButton
    //             onClick={toggleDeptHideDialog}
    //             text="Cancel"
    //           />
    //         </DialogFooter>
    //       </div>
    //     ) : (
    //       <div>
    //         <FontIcon
    //           aria-label="SkypeCircleCheck"
    //           iconName="SkypeCircleCheck"
    //           className={iconClass}
    //         />
    //         <Label
    //           style={{
    //             margin: "0 auto",
    //             width: "300px",
    //             textAlign: "center",
    //           }}
    //         >
    //           Department created Successfully
    //         </Label>

    //         <DialogFooter>
    //           <DefaultButton
    //             onClick={toggleDeptHideDialog}
    //             text="Close"
    //           />
    //         </DialogFooter>
    //       </div>
    //     )}
    //   </Dialog>

    //   {/*Edit Depts*/}
    //   <Dialog
    //     containerClassName={
    //       "ms-dialogMainOverride " + styles.addProjectDialog
    //     }
    //     hidden={hideDepteditDialog}
    //     dialogContentProps={dialogContentProps_edit}
    //     isBlocking={false}
    //     onDismiss={toggleDepteditHideDialog}
    //   >
    //     {isDeptEdited ? (
    //       <div>
    //         <div style={{ margin: "15px" }}>
    //           <div
    //             style={{
    //               width: "350px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Department Title"
    //               placeholder="Specify Department Name"
    //               resizable={false}
    //               value={edit_Dept_Title}
    //               onChange={handleedit_Dept_Title}
    //               errorMessage={edit_Dept_Title_err}
    //             />
    //           </div>

    //           <div style={{ width: "350px", marginTop: "15px" }}>
    //             <TextField
    //               required
    //               label="Department Code"
    //               placeholder="Specify Department Unique ID"
    //               onChange={handleedit_Dept_Code}
    //               resizable={false}
    //               value={edit_Dept_Code}
    //               errorMessage={edit_Dept_Code_err}
    //             />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <DefaultButton onClick={Deleteitem} text="Delete" />
    //           <PrimaryButton
    //             style={{
    //               backgroundColor: "#0078D4",
    //             }}
    //             onClick={handleeditDept}
    //             text="Submit"
    //           />
    //           <DefaultButton
    //             onClick={toggleDepteditHideDialog}
    //             text="Cancel"
    //           />
    //         </DialogFooter>
    //       </div>
    //     ) : (
    //       <div>
    //         <FontIcon
    //           aria-label="SkypeCircleCheck"
    //           iconName="SkypeCircleCheck"
    //           className={iconClass}
    //         />
    //         <Label
    //           style={{
    //             margin: "0 auto",
    //             width: "300px",
    //             textAlign: "center",
    //           }}
    //         >
    //           Department Details Altered Successfully
    //         </Label>

    //         <DialogFooter>
    //           <DefaultButton
    //             onClick={toggleDepteditHideDialog}
    //             text="Close"
    //           />
    //         </DialogFooter>
    //       </div>
    //     )}
    //   </Dialog>

    //   {/* Add section*/}
    //   <Dialog
    //     containerClassName={
    //       "ms-dialogMainOverride " + styles.addSectionDialog
    //     }
    //     hidden={hideSectionDialog}
    //     dialogContentProps={dialogContentPropsSection}
    //     isBlocking={false}
    //     onDismiss={toggleSectionHideDialog}
    //   >
    //     {isSectionAdded ? (
    //       <div>
    //         <div style={{ margin: "10px" }}>
    //           <div
    //             style={{
    //               width: "350px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Department Title"
    //               value={sectionDept}
    //               resizable={false}
    //               disabled
    //             />
    //           </div>
    //           <div
    //             style={{
    //               width: "350px",
    //               marginTop: "15px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Sub-Section Title"
    //               placeholder="Specify Sub-Section Name"
    //               resizable={false}
    //               onChange={handleadd_Section_Title}
    //               errorMessage={add_Section_Title_err}
    //             />
    //           </div>

    //           <div style={{ width: "350px", marginTop: "15px" }}>
    //             <TextField
    //               required
    //               label="Sub-Section Code"
    //               placeholder="Specify Sub-Section Unique ID"
    //               onChange={handleadd_Section_Code}
    //               resizable={false}
    //               errorMessage={add_Section_Code_err}
    //             />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <PrimaryButton
    //             style={{
    //               backgroundColor: "#0078D4",
    //             }}
    //             onClick={handleaddSection}
    //             text="Submit"
    //           />
    //           <DefaultButton
    //             onClick={toggleSectionHideDialog}
    //             text="Cancel"
    //           />
    //         </DialogFooter>
    //       </div>
    //     ) : (
    //       <div>
    //         <FontIcon
    //           aria-label="SkypeCircleCheck"
    //           iconName="SkypeCircleCheck"
    //           className={iconClass}
    //         />
    //         <Label
    //           style={{
    //             margin: "0 auto",
    //             width: "300px",
    //             textAlign: "center",
    //           }}
    //         >
    //           Sub-Section created Successfully
    //         </Label>

    //         <DialogFooter>
    //           <DefaultButton
    //             onClick={toggleSectionHideDialog}
    //             text="Close"
    //           />
    //         </DialogFooter>
    //       </div>
    //     )}
    //   </Dialog>

    //   {/*Edit section*/}

    //   <Dialog
    //     containerClassName={
    //       "ms-dialogMainOverride " + styles.addProjectDialog
    //     }
    //     hidden={hideSectioneditDialog}
    //     dialogContentProps={dialogContentProps_edit}
    //     isBlocking={false}
    //     onDismiss={toggleSectioneditHideDialog}
    //   >
    //     {isSectionEdited ? (
    //       <div>
    //         <div style={{ margin: "15px" }}>
    //           <div
    //             style={{
    //               width: "350px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Sub-Section Title"
    //               placeholder="Specify Sub-Section Name"
    //               resizable={false}
    //               value={edit_Section_Title}
    //               onChange={handleedit_Section_Title}
    //               errorMessage={edit_Section_Title_err}
    //             />
    //           </div>

    //           <div style={{ width: "350px", marginTop: "15px" }}>
    //             <TextField
    //               required
    //               label="Sub-Section Code"
    //               placeholder="Specify Sub-Section Unique ID"
    //               onChange={handleedit_Section_Code}
    //               resizable={false}
    //               value={edit_Section_Code}
    //               errorMessage={edit_Section_Code_err}
    //             />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <DefaultButton onClick={DeleteSection} text="Delete" />
    //           <PrimaryButton
    //             style={{
    //               backgroundColor: "#0078D4",
    //             }}
    //             onClick={handleeditSection}
    //             text="Submit"
    //           />
    //           <DefaultButton
    //             onClick={toggleSectioneditHideDialog}
    //             text="Cancel"
    //           />
    //         </DialogFooter>
    //       </div>
    //     ) : (
    //       <div>
    //         <FontIcon
    //           aria-label="SkypeCircleCheck"
    //           iconName="SkypeCircleCheck"
    //           className={iconClass}
    //         />
    //         <Label
    //           style={{
    //             margin: "0 auto",
    //             width: "300px",
    //             textAlign: "center",
    //           }}
    //         >
    //           Sub-Section Details Altered Successfully
    //         </Label>

    //         <DialogFooter>
    //           <DefaultButton
    //             onClick={toggleSectioneditHideDialog}
    //             text="Close"
    //           />
    //         </DialogFooter>
    //       </div>
    //     )}
    //   </Dialog>
    // </>
    <div>
      {/* <div>
        <Row gutter={24}>
          <Row gutter={24}>
            <Col span={16}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(237, 247, 245, 1)",
                  border: "1px solid rgba(237, 247, 245, 1)",
                }}
              >
                <div>Departments</div>
                <div>
                  <img
                    src={require("../../../../../Images/Group.png")}
                    alt="add"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </div> */}

      <div style={{ marginLeft: "3%", marginTop: "50px", width: "98%" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "54%",
              display: "flex",
              backgroundColor: "rgba(237, 247, 245, 1)",
              border: "1px solid rgba(237, 247, 245, 1)",
              borderRadius: "7px",
              padding: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Departments
              </span>
            </div>
            <div style={{ width: "50%", textAlign: "end" }}>
              <span onClick={addDepartment}>
                <img
                  src={require("../../../../../Images/Group.png")}
                  alt="add"
                />
              </span>
            </div>
          </div>

          <div
            style={{
              width: "42%",
              display: "flex",
              backgroundColor: "rgba(237, 247, 245, 1)",
              border: "1px solid rgba(237, 247, 245, 1)",
              borderRadius: "7px",
              padding: "10px",
              marginLeft: "10px",
            }}
          >
            {/* <div style={{ width: "50%" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Project
              </span>
            </div>
            <div style={{ width: "50%", textAlign: "end" }}>
              <span onClick={addDepartment}>
                <img
                  src={require("../../../../../Images/Group.png")}
                  alt="add"
                />
              </span>
            </div> */}
            <Project />
          </div>
        </div>

        {isDeptAdded ? (
          <div>
            <Drawer
              title="Add Department"
              onClose={onClose}
              open={open}
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
                    disabled={disablesubmit}
                    onClick={() => form.submit()} // Trigger the form submit manually
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => toggleDeptHideDialog()}
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
              <div>
                <Form
                  name="basic"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={() => handleaddDept()}
                  form={form}
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="Department Title"
                        name="Department Title"
                        style={{
                          maxWidth: 400,
                          marginTop: 37,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your department title!",
                          },
                        ]}
                      >
                        <Input
                          onChange={handleadd_Dept_Title}
                          value={add_Dept_Title}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="Department Code"
                        name="Department Code"
                        style={{
                          maxWidth: 400,
                          marginTop: 17,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your department code!",
                          },
                        ]}
                      >
                        <Input
                          onChange={handleadd_Dept_Code}
                          value={add_Dept_Code}
                        />
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
        <div
          style={{
            width: "54%",
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          {items.map((item) => (
            <Card
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{item.name}</span>

                  <span>{item.code}</span>
                  <span>
                    <img
                      onClick={() => editDept(item)}
                      src={require("../../../../../Images/Edit.png")}
                      alt="Edit"
                    />
                  </span>
                </div>
              }
              key={item.code}
              style={{ marginTop: "10px" }}
            >
              {item.links.map((link) => (
                <div
                  key={link.Id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{link.name}</span>
                  <span>{link.code}</span>
                  <span>
                    <img
                      onClick={() => editSection(link)}
                      src={require("../../../../../Images/Edit.png")}
                      alt="Edit"
                    />
                  </span>
                </div>
              ))}
              <div
                style={{ display: "flex", marginTop: "10px" }}
                onClick={() => addSection(item)}
              >
                <img
                  src={require("../../../../../Images/Group.png")}
                  alt="add"
                  style={{ width: "4%", height: "4%" }}
                />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "rgba(18, 150, 114, 1)",
                    textDecoration: "underline",
                    marginLeft: "4px",
                  }}
                >
                  Add Sub Department
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {isDeptEdited ? (
        <div>
          <Drawer
            title="Edit Department"
            onClose={onEditDeptClose}
            open={editdeptopen}
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
                  disabled={disablesubmit}
                  onClick={() => form.submit()} // Trigger the form submit manually
                >
                  Submit
                </Button>
                <Button
                  onClick={Deleteitem}
                  style={{
                    width: "149px",
                    marginLeft: "5px",
                    border: "1px solid rgba(203, 68, 68, 1)",
                    color: "rgba(203, 68, 68, 1)",
                  }}
                >
                  Delete
                </Button>
              </div>
            }
          >
            <div>
              <Form
                name="basic"
                layout="vertical"
                autoComplete="off"
                onFinish={() => handleeditDept()}
                form={form}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Department Title"
                      name="Department Title"
                      style={{
                        maxWidth: 400,
                        marginTop: 37,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your department title!",
                        },
                      ]}
                    >
                      <Input
                        onChange={handleedit_Dept_Title}
                        value={edit_Dept_Title}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Department Code"
                      name="Department Code"
                      style={{
                        maxWidth: 400,
                        marginTop: 17,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your department code!",
                        },
                      ]}
                    >
                      <Input
                        onChange={handleedit_Dept_Code}
                        value={edit_Dept_Code}
                      />
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

      {isSectionAdded ? (
        <div>
          <Drawer
            title="Add Section"
            onClose={onSectionClose}
            open={sectionopen}
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
                  disabled={disablesubmit}
                  onClick={() => form.submit()} // Trigger the form submit manually
                >
                  Submit
                </Button>
                <Button
                  onClick={() => toggleSectionHideDialog()}
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
            <div>
              <Form
                name="basic"
                layout="vertical"
                autoComplete="off"
                onFinish={() => handleaddSection()}
                form={form}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Department Title"
                      name="Department Title"
                      style={{
                        maxWidth: 400,
                        marginTop: 37,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      <Input defaultValue={sectionDept} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Sub-Section Title"
                      name="Sub-Section Title"
                      style={{
                        maxWidth: 400,
                        marginTop: 17,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your sub-section title!",
                        },
                      ]}
                    >
                      <Input
                        onChange={handleadd_Section_Title}
                        value={add_Section_Title}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Sub-Section Code"
                      name="Sub-Section Code"
                      style={{
                        maxWidth: 400,
                        marginTop: 17,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your sub-section code!",
                        },
                      ]}
                    >
                      <Input
                        onChange={handleadd_Section_Code}
                        value={add_Section_Code}
                      />
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
      {isSectionEdited ? (
        <div>
          <Drawer
            title="Edit Section"
            onClose={onEditSectionClose}
            open={editsectionopen}
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
                  disabled={disablesubmit}
                  onClick={() => form.submit()}
                >
                  Submit
                </Button>
                <Button
                  onClick={DeleteSection}
                  style={{
                    width: "149px",
                    marginLeft: "5px",
                    border: "1px solid rgba(203, 68, 68, 1)",
                    color: "rgba(203, 68, 68, 1)",
                  }}
                >
                  Delete
                </Button>
              </div>
            }
          >
            <div>
              <Form
                name="basic"
                layout="vertical"
                autoComplete="off"
                onFinish={() => handleeditSection()}
                form={form}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Sub-Section Title"
                      name="Sub-Section Title"
                      style={{
                        maxWidth: 400,
                        marginTop: 17,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your sub-section title!",
                        },
                      ]}
                    >
                      <Input
                        onChange={handleedit_Section_Title}
                        value={add_Section_Title}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Sub-Section Code"
                      name="Sub-Section Code"
                      style={{
                        maxWidth: 400,
                        marginTop: 17,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your sub-section code!",
                        },
                      ]}
                    >
                      <Input
                        onChange={handleedit_Section_Code}
                        value={edit_Section_Code}
                      />
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
  );
}
