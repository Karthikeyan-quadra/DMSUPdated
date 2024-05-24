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
} from "office-ui-fabric-react";
import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Table,
  notification,
} from "antd";
import Search from "antd/es/input/Search";
import type { CheckboxProps, GetProp } from "antd";
import { Checkbox } from "antd";
import { useForm } from "antd/es/form/Form";

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

const dialogContentProps = {
  type: DialogType.normal,
  title: "Manage User",
};
const dialogContentProps_edit = {
  type: DialogType.normal,
  title: "Manage User",
};
export default function UserDetails() {
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
  const [onchanged, setOnChanged] = useState(false);
  const [managecheckedList, setManageCheckedList] = useState<any>(false);
  const [editEmailError, setEditEmailError] = useState("");

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

  useEffect(() => {
    console.log("Managechecklist:", managecheckedList);
  }, [managecheckedList]); // This will run every time managecheckedList changes

  const editUser = (record: any) => {
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
  };

  const handledit_Username = (e: any) => {
    setEdit_UserName(e.target.value);
    console.log(edit_UserName);
    setOnChanged(true);
  };

  const handleedit_UserMailID = (e: any) => {
    setEdit_EmailID(e.target.value);
    console.log(e.target.valuelue);
    console.log(edit_EmailID);
    setOnChanged(true);
  };

  const edit_uploader = (event, isChecked: any) => {
    setEdit_Uploader(isChecked ? "true" : "false");
    setOnChanged(true);
  };

  const handleEditQMS = (event, isChecked: any) => {
    setEdit_QMS(isChecked ? "true" : "false");
    console.log(edit_QMS);
    setOnChanged(true);
  };

  const handleEditApprover = (event, isChecked: any) => {
    setEdit_Approver(isChecked ? "true" : "false");
    setOnChanged(true);
  };

  const handleadd_Username = (e: any) => {
    setAdd_UserName(e.target.value);
    console.log(add_UserName);
  };

  const handleadd_UserMailID = (e: any) => {
    setAdd_EmailID(e.target.value);
    console.log(add_EmailID);
  };

  const add_uploader = (event, isChecked: any) => {
    setAdd_Uploader(isChecked ? "true" : "false");
    console.log(add_Uploader);
  };

  const handleadd_QMS = (event, isChecked: any) => {
    setAdd_QMS(isChecked ? "true" : "false");
    console.log(add_QMS);
    console.log("handleadd_QMS Function called");
  };

  const handleadd_Approver = (event, isChecked: any) => {
    setAdd_Approver(isChecked ? "true" : "false");
    console.log(add_Approver);
  };

  const handleAddUser = async () => {
    console.log("Handle Add user function called");
    const sp: SPFI = getSp();

    let status = overalllist.filter(
      (res: any) => res.EmailID.toLowerCase() == add_EmailID.toLowerCase()
    );
    if (status.length !== 0) {
      setAdd_EmailID_err("Entered emailID already exists!");

      return; // Exit the function early
    }

    console.log(status);

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
      setOveralllist(await sp.web.lists.getByTitle("Userdetails").items());
      setEdit_EmailID_err("");
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
    form.resetFields();
    openNotification();
  };

  const _filter = (text: any) => {
    const filtered: any = overalllist.filter(
      (item: any) =>
        item.Username.toLowerCase().includes(text.toLowerCase()) ||
        item.EmailID.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

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
        setEdit_EmailID_err("Entered emailID already exists!");

        return; // Exit the function early
      }
    }

    // Proceed with updating user details

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
      if (onchanged) {
        openManageNotification();
        setOnChanged(false);
      }
      setEdit_EmailID_err("");
    } catch (error) {
      console.error(error);
    }
  };

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
    openDeleteNotification();
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

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div style={{ marginLeft: "3%", marginTop: "50px" }}>
        <div>
          <div style={{ width: "98%" }}>
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
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Search
                  placeholder="Search"
                  onSearch={_filter}
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
                        onClick={() => onCancel()}
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
                            validateStatus={add_EmailID_err ? "error" : ""}
                            help={add_EmailID_err}
                            rules={[
                              {
                                required: true,
                                message: "Please input your user mailId!",
                              },
                              {
                                validator: (_, value) => {
                                  if (add_EmailID_err) {
                                    return Promise.reject(
                                      new Error(add_EmailID_err)
                                    );
                                  }

                                  return Promise.resolve();
                                },
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
                              fontSize: "16px",
                              fontWeight: "600",
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
                      onClick={() => DeleteUser()}
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
                          validateStatus={edit_EmailID_err ? "error" : ""}
                          help={edit_EmailID_err}
                          rules={[
                            {
                              validator: (_, value) => {
                                if (edit_EmailID_err) {
                                  return Promise.reject(
                                    new Error(edit_EmailID_err)
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
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
                        >
                          <CheckboxGroup
                            options={plainOptions}
                            value={managecheckedList}
                            onChange={onManageChange}
                          />
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
