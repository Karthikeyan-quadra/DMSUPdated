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

  const toggleSectioneditHideDialog = () => {
    console.log(hideSectioneditDialog);
    if (hideSectioneditDialog) setHideSectionEditDialog(false);
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
        setIsSectionEdited(false);
        setValue(await getDepartmentlistedit().then((val) => setItems(val)));
        const updatedItems = await getDepartmentlistedit();
        setItems(updatedItems);
      });
    openSubdeptDeleteNotification();
    setEditSectionOpen(false);
  };

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
    if (hideDeptDialog) setHideDeptDialog(false);
    else setHideDeptDialog(true);
    setIsDeptAdded(true);
    setAddDeptTitleErr("");
    setAddDeptTitle("");
    setAddDeptCodeErr("");
    setAddDeptCode("");
  };

  const toggleSectionHideDialog = () => {
    console.log(hideSectionDialog);
    if (hideSectionDialog) setHideSectionDialog(false);
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

        if (items.length > 0) {
          const updatedItem = await sp.web.lists
            .getByTitle("Sub departments Main")
            .items.getById(items[0].Id)
            .update({
              ParentFolders: edit_Dept_Title,
            });

          console.log(JSON.stringify(updatedItem));
        }

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
    setEditDeptTitle(e.target.value);
    setOnChanged(true);
  };
  const handleedit_Dept_Code = (e: any) => {
    setEditDeptCode(e.target.value);
    setOnChanged(true);
  };
  const handleedit_Section_Title = (e: any) => {
    setEditSectionTitle(e.target.value);
    setOnChanged(true);
    console.log(edit_Section_Title);
  };
  const handleedit_Section_Code = (e: any) => {
    setEditSectionCode(e.target.value);
    setOnChanged(true);
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
    setAddDeptTitle(e.target.value);
  };

  const handleadd_Section_Title = (e: any) => {
    setAddSectionTitle(e.target.value);
  };
  const addDepartment = () => {
    setHideDeptDialog(false);
    setIsDeptAdded(true);
    setOpen(true);
    form.resetFields();
  };

  const addSection = (item) => {
    console.log(item);

    setSectionOpen(true);
    setHideSectionDialog(false);
    setIsSectionAdded(true);
    setSectionDept(item.name);
    form.resetFields();
  };

  const handleadd_Dept_Code = (e: any) => {
    setAddDeptCode(e.target.value);
  };

  const handleadd_Section_Code = (e: any) => {
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
    <div
      style={{
        marginLeft: "3%",
        marginTop: "50px",
        width: "98%",
        display: "flex",
      }}
    >
      <div style={{ width: "54%", display: "flex" }}>
        <div style={{ width: "100%" }}>
          <div>
            <div
              style={{
                width: "100%",
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
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              marginBottom: "5px",
            }}
          >
            {items.map((item) => (
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ width: "50%" }}>{item.name}</span>

                    <span style={{ width: "50%" }}>{item.code}</span>
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
                    <span style={{ width: "50%" }}>{link.name}</span>
                    <span style={{ width: "50%" }}>{link.code}</span>
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
      <div
        style={{
          width: "42%",
          display: "flex",
          marginLeft: "10px",
        }}
      >
        <Project />
      </div>
    </div>
  );
}
