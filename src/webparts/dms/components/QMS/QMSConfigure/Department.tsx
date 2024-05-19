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
  Row,
} from "antd";
import form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import { Edit } from "../../../../../Images/Edit.png";
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
  const [sectionopen, setSectionOpen] = useState(false);

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
  const onSectionClose = () => {
    setSectionOpen(false);
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

  const Deleteitem = async () => {
    const sp: SPFI = getSp();

    const list = sp.web.lists.getByTitle("Department Names");
    await list.items
      .getById(edit_DeptID)
      .delete()
      .then(async () => {
        // this.setState({
        //   isDeptEdited: false,
        //   value: await getDepartmentlistedit().then((val) =>
        //     this.setState({
        //       items: val,
        //     })
        //   ),
        // })
        setIsDeptEdited(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
      });
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
      });
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
    const sp: SPFI = getSp();

    if (edit_Dept_Title != "") {
      if (edit_Dept_Code != "") {
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
            setValue(
              await getDepartmentlistedit().then((val) => setItems(val))
            );
          });
      } else {
        // this.setState({
        //   edit_Dept_Code_err: "Please specify Code",
        // });
        setEditDeptCodeErr("Please specify Code");
      }
    } else {
      // this.setState({
      //   edit_Dept_Title_err: "Please specify Department name",
      // });
      setEditDeptTitleErr("Please specify Department name");
    }
  };

  const handleeditSection = async () => {
    const sp: SPFI = getSp();

    if (edit_Section_Title != "") {
      if (edit_Section_Code != "") {
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
            setValue(
              await getDepartmentlistedit().then((val) => setItems(val))
            );
          });
      } else {
        // this.setState({
        //   edit_Section_Code_err: "Please specify Code",
        // });
        setEditSectionCodeErr("Please specify Code");
      }
    } else {
      // this.setState({
      //   edit_Section_Title_err: "Please specify Sub-Section name",
      // });
      setEditSectionTitleErr("Please specify Sub-Section name");
    }
  };
  const editSection = (value) => {
    console.log(value);
    // this.setState({
    //   hideSectioneditDialog: false,
    //   isSectionEdited: true,
    //   edit_Section_Title: value.name,
    //   edit_SectionID: value.Id,

    //   edit_Section_Code: value.code,
    // });

    setHideSectionEditDialog(false);
    setIsSectionEdited(true);
    setEditSectionTitle(value.name);
    setEditSectionID(value.Id);
    setEditSectionCode(value.code);
  };

  const editDept = (value) => {
    console.log(value);
    // this.setState({
    //   hideDepteditDialog: false,
    //   isDeptEdited: true,
    //   edit_Dept_Title: value.name,
    //   edit_DeptID: value.Id,
    //   temp_Deptname: value.name,
    //   edit_Dept_Code: value.code,
    // });
    setHideDeptEditDialog(false);
    setIsDeptEdited(true);
    setEditDeptTitle(value.name);
    setEditDeptID(value.Id);
    setTempDeptName(value.name);
    setEditDeptCode(value.code);
  };

  const handleedit_Dept_Title = (event, value) => {
    // this.setState({
    //   edit_Dept_Title: value,
    // });
    setEditDeptTitle(value);
  };
  const handleedit_Dept_Code = (event, value) => {
    // this.setState({
    //   edit_Dept_Code: value,
    // });
    setEditDeptCode(value);
  };
  const handleedit_Section_Title = (event, value) => {
    // this.setState({
    //   edit_Section_Title: value,
    // });
    setEditSectionTitle(value);
  };
  const handleedit_Section_Code = (event, value) => {
    // this.setState({
    //   edit_Section_Code: value,
    // });
    setEditSectionCode(value);
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
    form.resetFields();
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
    form.resetFields();
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
        <div
          style={{
            width: "54%",
            display: "flex",
            backgroundColor: "rgba(237, 247, 245, 1)",
            border: "1px solid rgba(237, 247, 245, 1)",
            paddingTop: "10px",
          }}
        >
          <div style={{ width: "50%" }}>
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              Departments
            </span>
          </div>
          <div style={{ width: "50%", textAlign: "end" }}>
            <span onClick={addDepartment}>
              <img src={require("../../../../../Images/Group.png")} alt="add" />
            </span>
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
                          <Input onChange={handleadd_Dept_Code} />
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
                            onChange={handleadd_Dept_Title}
                            value={add_Dept_Title}
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
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>{item.name}</p>
                  </div>
                  <div style={{ width: "50%" }}>
                    <p style={{ textAlign: "end" }}>{item.code}</p>
                    <p>
                      <img src={Edit} alt="Edit" />
                    </p>
                  </div>
                </div>
              }
              key={item.code}
              style={{ marginTop: "10px" }}
            >
              {/* <Card.Meta
                avatar={<Avatar src="../../../../../Images/Group.png" />}
                title="Card title"
                description="This is the description"
              /> */}
              {/* <span>{item.name}</span>
              <span>{item.code}</span> */}
              {item.links.map((link) => (
                <div
                  key={link.Id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{link.name}</span>
                  <span>{link.code}</span>
                  <span>
                    <img
                      src={require("../../../../../Images/Edit.png")}
                      alt="edit"
                    />
                  </span>
                </div>
              ))}
              <div style={{ display: "flex" }} onClick={() => addSection(item)}>
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
    </div>
  );
}
