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
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import Search from "antd/es/input/Search";
import { useForm } from "antd/es/form/Form";

export default function UserDepartment(Props) {
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
  const [Manageopen, setManageOpen] = useState(false);

  const [onchanged, setOnChanged] = useState(false);

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

    {
      title: "User MailID",
      dataIndex: "EmailID",
      key: "User MailID",
      width: "32%",
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
    },
  ];

  const openNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Added</span>
      ),
      description: "You have added the user successfully",
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

  const openDeleteNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "red", fontWeight: "bold" }}>Deleted</span>
      ),
      description: "You have deleted the user successfully",
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

  const openManageNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Updated</span>
      ),
      description: "You have updated the user successfully",
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
    setManageOpen(false);
    form.resetFields();
  };

  const handledit_Username = (e: any) => {
    setEditUserName(e.target.value);
    setOnChanged(true);
  };

  const handleedit_UserMailID = (e: any) => {
    setEditEmailID(e.target.value);
    setOnChanged(true);
  };

  const handleadd_Username = (e: any) => {
    setAddUserName(e.target.value);
    console.log(add_UserName);
  };

  const handleadd_UserMailID = (e: any) => {
    setAddEmailID(e.target.value);
    console.log(add_EmailID);
  };

  const handleeditUser = async () => {
    console.log("handleedituser function called");

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
          setOverallList(await sp.web.lists.getByTitle("Approverlist").items());
        });
      if (onchanged) {
        openManageNotification();
        setOnChanged(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const editUser = (record: any) => {
    console.log("Edit user function called");
    console.log("Record:", record);
    setEditUserName(record.Name);
    setEditEmailID(record.EmailID);
    setEditDepartment(record.Department);
    setEditSubdepartment(record.SubDepartment);
    setEditLevel(record.Level);
    setHideEditDialog(false);
    setIsEdited(true);
    setSelectedItem(record.ID);
    setSelectedVal(record);
    setManageOpen(true);
    form.setFieldsValue({
      "User Name": record.Name,
      "User MailID": record.EmailID,
      Department: record.Department,
      "Sub Department": record.SubDepartment,
      Level: record.Level,
    });
  };

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
    openDeleteNotification();
  };

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

    setAddDepartment(value.value);
    setSubdepartments(subDept);
  };

  const editDepartmentChange = async (event, value) => {
    console.log(value);

    const subDept = await getSubDepartmentlist(value.value);

    setEditDepartment(value.value);
    setSubdepartments(subDept);
    setOnChanged(true);
  };

  const addSubDepartmentChange = (event, value) => {
    setAddSubdepartment(value.value);
  };

  const editSubDepartmentChange = (event, value) => {
    setEditSubdepartment(value.value);
    setOnChanged(true);
  };

  const addLevelChange = (event, value) => {
    setAddLevel(value.value);
  };

  const editLevelChange = (event, value) => {
    setEditLevel(value.value);
    setOnChanged(true);
  };

  const handleAddUser = async () => {
    console.log("handleAddUser function called");
    const sp: SPFI = getSp();
    await sp.web.lists
      .getByTitle("Approverlist")
      .items.add({
        Name: add_UserName,
        EmailID: add_EmailID,
        Department: add_Department,
        SubDepartment: add_Subdepartment,
        Level: add_Level,
      })
      .then(async (res) => {
        setIsAdded(false);
        setItems(await sp.web.lists.getByTitle("Approverlist").items());
        setOverallList(await sp.web.lists.getByTitle("Approverlist").items());
      });

    setOpen(false);
    form.resetFields();
    openNotification();
  };

  const showDrawer = () => {
    setOpen(true);
    setIsAdded(true);
    form.resetFields();
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const onManageClose = () => {
    setManageOpen(false);
  };

  return (
    <div>
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
                <Drawer
                  title="Add User"
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
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: "149px",
                          backgroundColor: "rgba(74, 173, 146, 1)",
                          color: "white",
                        }}
                        onClick={() => form.submit()} // Trigger the form submit manually
                      >
                        Add
                      </Button>
                      <Button
                        onClick={() => toggleHideDialog()}
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
                              marginTop: 10,
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
                    </Form>
                  </div>
                </Drawer>
              </div>
            ) : (
              <></>
            )}
          </div>
          {isEdited ? (
            <div>
              <Drawer
                title="Manage User"
                onClose={onManageClose}
                open={Manageopen}
                footer={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      type="primary"
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
                      onClick={() => toggleeditHideDialog()}
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
                    onFinish={() => handleeditUser()}
                    form={form}
                  >
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          label="User Name"
                          name="User Name"
                          style={{
                            maxWidth: 400,
                            marginTop: 10,
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
                            onChange={handleedit_UserMailID}
                            value={edit_EmailID}
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
                        >
                          <Select
                            placeholder="Select an option"
                            onChange={(event, option) =>
                              editDepartmentChange(event, option)
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
                        >
                          <Select
                            placeholder="Select an option"
                            onChange={(event, option) =>
                              editSubDepartmentChange(event, option)
                            }
                            disabled={Subdepartments.length == 0 ? true : false}
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
                        >
                          <Select
                            placeholder="Select an option"
                            onChange={(event, option) =>
                              editLevelChange(event, option)
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
                  </Form>
                </div>
              </Drawer>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
