import * as React from "react";
import styles from "./QmsDashboard.module.scss";

import { Web, IWeb } from "@pnp/sp/presets/all";
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import { ISharingResult, SharingRole } from "@pnp/sp/sharing";
import CheckMark from "../../../../../Images/CheckMark.png";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import { render } from "react-dom";
import {
  getApprover1,
  getApprover2,
  getDepartmentlist,
  getQMSApprover,
  getRequestlevellist,
  getSitelist,
} from "../../Data/GetSiteList";
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  FontIcon,
  IDropdownStyles,
  IStackTokens,
  Label,
  mergeStyles,
  Modal,
  Persona,
  PersonaSize,
  PrimaryButton,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";

import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import { Approvalmail } from "./MailTrigger";

import { off } from "process";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};
const dialogContentProps = {
  type: DialogType.normal,
  title: "Approval Request",
};
var date = new Date();
date.setDate(date.getDate() + 5);
const stackTokens: IStackTokens = { childrenGap: 50 };
export default function ApprovalPopup({ props }) {
  const [form] = useForm();
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(true);
  const [hideDialog, setHideDialog] = useState(true);
  const [Denystatus, setDenystatus] = useState(true);
  const [errormsg, setErrormsg] = useState("");
  const [subDepartment, setSubDepartment] = useState<any>("");
  const [Department, setDepartment] = useState("");
  const [approveshow, setApproveshow] = useState(true);
  const [errmsgApprover, setErrmsgApprover] = useState("");
  const [Level, setLevel] = useState("");
  const [Approver_A, setApprover_A] = useState({
    Name: "Not Assigned",
    EmailID: "Not Assigned",
  });
  const [Approver_B, setApprover_B] = useState({
    Name: "Not Assigned",
    EmailID: "Not Assigned",
  });
  const [levelitems, setLevelitems] = useState<any>();
  const [QMSApprover, setQMSApprover] = useState<any>();
  const [value, setValue] = useState<any>();
  const [Remainder, setRemainder] = useState<any>();
  const [UniqueItem, setUniqueItem] = useState<any>();
  const [opendialog, setOpenDialog] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const levelitems: any = await getRequestlevellist().then(async (item) => {
        const list: { Key: string; text: string }[] = [];
        item.map(async (val) => {
          list.push({
            Key: val.Key,
            text: val.Text,
          });
          console.log(list);
        });
        return list;
      });
      setLevelitems(levelitems);

      const qmsApproverData = await getQMSApprover();
      setQMSApprover(qmsApproverData);

      setValue(props);
      console.log(props);
      console.log(hideDialog);

      setRemainder(props.Remainder);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSubDepartment(props.SubDepartment);
    console.log(Level);

    console.log(props);

    fetchData();
  }, [props]);

  const toggleHideDialog = () => {
    setHideDialog(true);
    setLevel("");
    setErrormsg("");
    setErrmsgApprover("");
    setDenystatus(true);
    setApprover_A({
      Name: "Not Assigned",
      EmailID: "Not Assigned",
    });
    setApprover_B({
      Name: "Not Assigned",
      EmailID: "Not Assigned",
    });
    console.log("Level is :", Level);
    form.resetFields();
    setOpen(false);
  };

  const sendApproval = async () => {
    console.log(props);
    console.log(hideDialog);
    console.log("hello");
    setUniqueItem(props);
    setOpenDialog(true);
    setHideDialog(false);
    setDepartment(props.Department);
    setSubDepartment(props.SubDepartment);
    setOpen(true);
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date: any) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  };

  const SendRequest = async () => {
    console.log("SendRequest function called");
    if (Level != "") {
      console.log(Approver_A);
      console.log(Approver_B);
      if (
        Approver_A.EmailID == "Not Assigned" ||
        Approver_B.EmailID == "Not Assigned"
      ) {
        setErrmsgApprover("Please Configure the Approver flow!");
      } else {
        setDenystatus(false);
        console.log(QMSApprover);
        const sp: SPFI = getSp();
        await sp.web.lists
          .getByTitle("User Files")
          .items.getById(UniqueItem.ID)
          .update({
            Status: "Processing",
            ApprovalStatus: "APPROVER 2",
            Level: Level,
            Approver2: Approver_A.EmailID,
            Approver3: Approver_B.EmailID,
            Approver4:
              QMSApprover && QMSApprover[0] ? QMSApprover[0].EmailID : "",

            Remainder: formatDate(date),
          });

        await Approvalmail(
          props,
          "APPROVER 2",
          await (
            await sp.web.currentUser()
          ).Email,
          Approver_A.EmailID
        );

        setUniqueItem(true);
      }
    } else {
      setErrmsg("Please Select level");
    }
    setOpen(false);
    openNotification();
    await fetchData();
  };

  const HandleLevel = async (e, value: any) => {
    console.log(value);
    const levels = value.key;
    console.log(levels);
    setLevel(levels);
    console.log(Level);
    console.log(props.Department);
    console.log(props.SubDepartment);

    setErrmsgApprover("");
    setErrmsg("");

    try {
      const approverAData = await getApprover1(
        props.Department,
        levels,
        props.SubDepartment
      );
      const approverBData = await getApprover2(
        props.Department,
        levels,
        props.SubDepartment
      );
      setApprover_A(approverAData);
      setApprover_B(approverBData);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const openNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Approved</span>
      ),
      description: "You have approved the request successfully",
      placement: "top",
      icon: <img src={CheckMark} alt="Success" style={{ width: "20%" }} />,
    });
    window.location.reload();
  };

  return (
    <div>
      <Button
        style={{
          marginLeft: "10px",
          color: "rgba(4, 173, 58, 1)",
          border: "1px solid rgba(14, 173, 58, 1)",
        }}
        onClick={sendApproval}
      >
        Approve
      </Button>

      <Drawer
        title="Approval"
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
          <Row gutter={24}>
            <Col span={24}>
              <p style={{ fontSize: "13px" }}>
                Select next level approver and submit
              </p>
            </Col>
          </Row>
          <Form
            name="basic"
            layout="vertical"
            onFinish={() => {
              SendRequest();
            }}
            autoComplete="off"
            form={form}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Approval Level"
                  name="Approval Level"
                  style={{ maxWidth: 400, marginTop: 37 }}
                  rules={[
                    {
                      required: true,
                      message: "Please select the approver level",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select an option"
                    onChange={(event, option) => {
                      HandleLevel(event, option);
                    }}
                    style={{ width: "330px" }}
                    value={Level}
                  >
                    {levelitems &&
                      levelitems.map((option: any) => (
                        <Select.Option key={option.Key} value={option.Key}>
                          {option.Key}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Department"
                  name="Department"
                  style={{ maxWidth: 400, marginTop: 10 }}
                >
                  <Input
                    defaultValue={Department}
                    disabled={true}
                    style={{ width: "330px" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {subDepartment != "" && subDepartment != null ? (
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="Section"
                    name="Section"
                    style={{ maxWidth: 400, marginTop: 10 }}
                  >
                    <Input
                      defaultValue={subDepartment}
                      disabled={true}
                      style={{ width: "330px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <div style={{ marginTop: 37 }}>
              <div>
                <Row gutter={24}>
                  <Col span={12}>
                    <p>Approver Info</p>
                  </Col>
                  <Col span={12}>
                    <p>Manage approver</p>
                  </Col>
                </Row>
              </div>
              <div>
                <Card style={{ width: 330 }}>
                  <p>
                    <Avatar size={50} style={{ backgroundColor: "#87d068" }}>
                      {Approver_A.Name && Approver_A.Name.length >= 2
                        ? Approver_A.Name.slice(0, 2)
                        : Approver_A.Name}
                    </Avatar>
                    <span style={{ marginLeft: "20px" }}>
                      {Approver_A.Name}
                    </span>
                  </p>
                </Card>
                <Card style={{ width: 330 }}>
                  <p>
                    <Avatar size={50} style={{ backgroundColor: "#87d068" }}>
                      {Approver_B.Name && Approver_B.Name.length >= 2
                        ? Approver_B.Name.slice(0, 2)
                        : Approver_B.Name}
                    </Avatar>
                    <span style={{ marginLeft: "20px" }}>
                      {Approver_B.Name}
                    </span>
                  </p>
                </Card>
              </div>
            </div>
          </Form>
        </div>
      </Drawer>
    </div>
  );
}
