import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";

import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";

import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import {
  getEditSitelist,
  getName,
  Get_departmentusers,
} from "../../Data/GetSiteList";
import {
  DialogType,
  IDocumentCardPreviewProps,
  IStackTokens,
  mergeStyles,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";
import CheckMark from "../../../../../Images/CheckMark.png";

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
  Table,
  Typography,
  notification,
} from "antd";
import Search from "antd/es/input/Search";
import { useForm } from "antd/es/form/Form";

export default function QmsDashboard(props) {
  const [selectedRecord, setSelectedRecord] = useState<any>({});
  const [form] = useForm();
  const [items, setItems] = useState([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [opendialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>("");
  const [uploadfile, setUploadFile] = useState(false);
  const [page, setpage] = useState(0);
  const [hideeditDialog, setHideEditDialog] = useState(true);
  const [isEdited, setIsEdited] = useState(true);
  const [Selected_item, setSelected_item] = useState<any>({});
  const [overalllist, setOverallList] = useState([]);
  const [Approver_list, setApproverList] = useState([]);
  const [err_Approvermsg, setErrApproverMsg] = useState("");
  const [err_Reviewermsg, setErrReviewerMsg] = useState("");
  const [Reviewer_name, setReviewerName] = useState("");
  const [Approver_name, setApproverName] = useState("");
  const [value, setValue] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  let columns: any = [
    {
      title: "Document ID",
      dataIndex: "Filename",
      key: "Filename",
      width: "31%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },

    {
      title: "File Title",
      dataIndex: "FileTitle",
      key: "FileTitle",
      width: "14%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Upload Date",
      dataIndex: "FileUploadDate",
      key: "FileUploadDate",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Requester Name",
      dataIndex: "Requester",
      key: "Requester",
      width: "20%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Approval Status",
      dataIndex: "ApprovalStatus",
      key: "ApprovalStatus",
      width: "18%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "Fileurl",
      key: "Fileurl",
      width: "11%",
      align: "left",
      resizable: true,

      render: (text, record) => (
        <span
          onClick={() => {
            editFlow(record);
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
  ];

  const openNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Altered</span>
      ),
      description: "You have altered the flow successfully",
      placement: "top",
      icon: <img src={CheckMark} alt="Success" style={{ width: "20%" }} />,
    });
  };

  const fetchData = async () => {
    const sp: SPFI = getSp();
    const currentUser = await sp.web.currentUser();
    console.log(currentUser);
    console.log(await currentUser.Email);
    const sitelist: any = await getEditSitelist();

    setValue(sitelist);
    setCount(sitelist.length);
    setItems(
      sitelist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
    setOverallList(sitelist);
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

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
      const updatedValue: any = await getEditSitelist();
      setValue(updatedValue);
      setCount(updatedValue.length);
      setItems(
        updatedValue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
      setOverallList(updatedValue);
    }
  };

  const setRowsPerPage = (value) => {
    setrowsPerPage(value);
  };

  const setPage = (value) => {
    setPage(value);
    setItems((value) =>
      value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  const toggleeditHideDialog = () => {
    console.log(hideeditDialog);
    if (hideeditDialog) {
      setHideEditDialog(false);
    } else {
      setHideEditDialog(true);
      setIsEdited(true);
      setSelected_item({});
      setErrApproverMsg("");
      setErrReviewerMsg("");
      setReviewerName("");
      setApproverName("");
    }
    setOpen(false);
  };

  const SubmitFlow = async () => {
    console.log("SubmitFlow function called");
    console.log("Selected_item:", Selected_item);

    const sp: SPFI = getSp();
    if (Selected_item.Approver2 !== "") {
      if (Selected_item.Approver3 !== "") {
        try {
          await sp.web.lists
            .getByTitle("User Files")
            .items.getById(Selected_item.ID)
            .update({
              Approver2: Selected_item.Approver2,
              Approver3: Selected_item.Approver3,
            });
          setIsEdited(false);
          setValue(await getEditSitelist());
          setCount(value.length);
          setItems(
            value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          );
          setOverallList(value);
        } catch (error) {
          console.error("Error updating item:", error);
        }
      } else {
        setErrReviewerMsg("Please specify Reviewer");
      }
    } else {
      setErrApproverMsg("Please specify Approver");
    }
    openNotification();
  };

  const editFlow = async (record: any) => {
    setOpen(true);
    console.log(record);
    setSelectedRecord(record);
    setHideEditDialog(false);
    setIsEdited(true);
    setSelected_item(record);
    const sp: SPFI = getSp();

    const approverListResult: any = await Get_departmentusers(
      record.Department
    );
    console.log(approverListResult);
    const mappedApproverList: any = approverListResult.map((val: any) => ({
      text: val.Name,
      key: val.EmailID,
    }));
    console.log(mappedApproverList);
    setApproverList(mappedApproverList);

    const reviewerNameResult: any = await getName(record.Approver2);
    console.log(reviewerNameResult);
    setReviewerName(reviewerNameResult[0].Name);

    const approverNameResult: any = await getName(record.Approver3);
    console.log(approverNameResult);
    setApproverName(approverNameResult[0].Name);

    form.setFieldsValue({
      "Document ID": record.Filename,
      "Document Title": record.FileTitle,
      RequesterInfo: {
        name: record.Requester,
        email: record.RequestorEmail,
      },
      view: record.Fileurl,
      Department: record.Department,
      Section: record.SubDepartment,
      "Document Reviewer": reviewerNameResult[0].Name,
      "Document Approver": approverNameResult[0].Name,
    });
  };

  const ReviewerChange = async (event, value) => {
    setSelected_item((prevState) => ({
      ...prevState,
      Approver2: value.key,
      Approver2Name: value.value,
    }));

    const reviewerNameResult: any = await getName(value.key);
    console.log(reviewerNameResult);
    setReviewerName(reviewerNameResult[0].Name);

    form.setFieldsValue({
      "Document Reviewer": reviewerNameResult[0].Name,
    });
    console.log(value);
    console.log(event);
  };

  const ApproverChange = async (event, value) => {
    setSelected_item((prevState) => ({
      ...prevState,
      Approver3: value.key,
    }));
    const approverNameResult: any = await getName(value.key);
    console.log(approverNameResult);
    setReviewerName(approverNameResult[0].Name);

    form.setFieldsValue({
      "Document Approver": approverNameResult[0].Name,
    });
    console.log(value);
    console.log(Selected_item);
  };

  console.log("SelectedRecord:", selectedRecord);

  return (
    <div style={{ marginLeft: "3%", marginTop: "50px" }}>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "98%" }}
      >
        <Row gutter={24}>
          <Col span={24}>
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
        {isEdited ? (
          <div>
            <Drawer
              title="Manage Flow"
              onClose={onClose}
              open={open}
              size={"large"}
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
                  onFinish={() => SubmitFlow()}
                  form={form}
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        label="Document ID"
                        name="Document ID"
                        style={{
                          maxWidth: 457,
                          marginTop: 37,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Input
                          defaultValue={Selected_item.Filename}
                          disabled={true}
                          style={{ width: "457px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col>
                      <Form.Item
                        label="Document Title"
                        name="Document Title"
                        style={{
                          maxWidth: 457,
                          marginTop: 17,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Input
                          defaultValue={Selected_item.FileTitle}
                          disabled={true}
                          style={{ width: "457px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col>
                      <Form.Item
                        style={{
                          maxWidth: 457,
                          marginTop: 17,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Button
                          style={{
                            width: "100px",
                            backgroundColor: "rgba(74, 173, 146, 1)",
                            color: "white",
                          }}
                          href={form.getFieldValue("view")}
                          target="_blank"
                        >
                          View
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col>
                      <Form.Item
                        label="Requester Info"
                        name="RequesterInfo"
                        style={{
                          maxWidth: 457,
                          marginTop: 17,
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        <Card style={{ width: "457px" }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Row gutter={24} style={{ alignItems: "center" }}>
                              <Col
                                span={4}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Avatar
                                  size={50}
                                  style={{ backgroundColor: "#87d068" }}
                                >
                                  {selectedRecord.Requester &&
                                  selectedRecord.Requester.length >= 2
                                    ? selectedRecord.Requester.slice(0, 2)
                                    : selectedRecord.Requester}
                                </Avatar>
                              </Col>

                              <Col
                                span={20}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {selectedRecord.Requester}
                                </span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {selectedRecord.RequestorEmail}
                                </span>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col>
                      <Form.Item
                        label="Department"
                        name="Department"
                        style={{
                          maxWidth: 225,
                          marginTop: 37,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Input
                          defaultValue={Selected_item.Department}
                          disabled={true}
                          style={{ width: "209px" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label="Section"
                        name="Section"
                        style={{
                          maxWidth: 225,
                          marginTop: 37,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Input
                          defaultValue={Selected_item.SubDepartment}
                          disabled={true}
                          style={{ width: "209px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col>
                      <p
                        style={{
                          maxWidth: 225,
                          marginTop: 37,
                        }}
                      >
                        Modify Approver here
                      </p>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col>
                      <Form.Item
                        label="Document Reviewer"
                        name="Document Reviewer"
                        style={{
                          maxWidth: 457,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Select
                          placeholder="Select an option"
                          value={selectedItem.Approver2Name}
                          onChange={(event, option) => {
                            ReviewerChange(event, option);
                          }}
                          style={{ width: "457px" }}
                        >
                          {Approver_list &&
                            Approver_list.map((option: any) => (
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
                    <Col>
                      <Form.Item
                        label="Document Approver"
                        name="Document Approver"
                        style={{
                          maxWidth: 457,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        <Select
                          placeholder="Select an option"
                          onChange={(event, option) => {
                            ApproverChange(event, option);
                          }}
                          style={{ width: "457px" }}
                        >
                          {Approver_list &&
                            Approver_list.map((option: any) => (
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
    </div>
  );
}
