import styles from "../Dms.module.scss";
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogStyles,
  IStackTokens,
  Label,
  mergeStyles,
  ProgressIndicator,
  SelectionMode,
  Stack,
  TextField,
  ThemeSettingName,
} from "office-ui-fabric-react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import * as React from "react";
import { ITextFieldStyles } from "office-ui-fabric-react";
import { getSitelist } from "../Data/GetSiteList";
import { Approvalmail, Denymail, UserApprovalmail } from "../Mailtrigger";

import { TablePagination } from "@material-ui/core";
import Logo from "../../../../Images/Illustration.png";
import { SPFI } from "@pnp/sp";
import { getSp } from "../../../../helpers/PnPConfig";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  notification,
  Row,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

var date = new Date();

const stackTokens: IStackTokens = { childrenGap: 20 };
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const dialogContentProps = {
  type: DialogType.normal,
  title: "Reject File",
};

const modelProps = {
  isBlocking: false,
};

const getStyles: IDialogStyles = {
  main: [
    {
      selectors: {
        ["@media (min-width: 480px)"]: {
          maxWidth: "700px",
          minWidth: "700px",
          maxHeight: "360px",
          minHeight: "150px",
        },
      },
    },
  ],
  root: "",
};

const dialogContentPropsLoading = {
  type: DialogType.normal,
  title: "Uploading file",
};

export default function Approvers() {
  const [items, setItems] = useState([]);
  const [overalllist, setOverallList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [CurrentUser, setCurrentUser] = useState("");
  const [fileArray, setFileArray] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpload, setOpenDialogUpload] = useState(false);
  const [hiddenDialogUpload, setHiddenDialogUpload] = useState(true);
  const [hiddenDialog, setHiddenDialog] = useState(true);
  const [hiddenDialog1, setHiddenDialog1] = useState(true);
  const [CurrentFile, setCurrentFile] = useState([]);
  const [fileDes, setFileDes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState<any>();
  const [count, setCount] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);

  let columns: any = [
    {
      title: "Document ID",
      dataIndex: "Filename",
      key: "Document ID",
      width: "26%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },

    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "12%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "File Title",
      dataIndex: "FileTitle",
      key: "File Title",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Uploaded Date",
      dataIndex: "FileUploadDate",
      key: "Uploaded Date",
      width: "15%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "Requester Name",
      dataIndex: "Requester",
      key: "Requester Name",
      width: "17%",
      align: "left",
      resizable: true,
      responsive: ["md", "lg"],
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "Status",
      key: "Approval",
      width: "16%",
      align: "left",
      resizable: true,

      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <span>
            <Button
              onClick={() => {
                Approvemail(record, record.ApprovalStatus);
              }}
              style={{
                color: "rgba(4, 173, 58, 1)",
                border: "1px solid rgba(14, 173, 58, 1)",
              }}
            >
              Approve
            </Button>
          </span>
          <span style={{ marginLeft: "5px" }}>
            <Button
              onClick={() => {
                RejectFunc(record);
              }}
              style={{
                color: "rgba(203, 68, 68, 1)",
                border: "1px solid rgba(203, 68, 68, 1)",
              }}
            >
              X
            </Button>
          </span>
        </div>
      ),
      responsive: ["md", "lg"],
    },

    {
      title: "View",
      dataIndex: "Fileurl",
      width: "7%",
      align: "left",
      resizable: true,
      render: (text, record) => (
        <img
          src={require("../../../../Images/Eye.png")}
          alt="View"
          onClick={() => window.open(record.Fileurl, "_blank")}
        />
      ),
      responsive: ["md", "lg"],
      ellipsis: true,
    },
  ];

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
      icon: (
        <img
          src={require("../../../../Images/CheckMark.png")}
          alt="Success"
          style={{ width: "20%" }}
        />
      ),
    });
  };
  const openDeneiedNotification = () => {
    notification.info({
      message: <span style={{ fontWeight: "600", color: "red" }}>Denied</span>,
      description: "You have denied the request successfully",
      placement: "top",
      icon: (
        <img
          src={require("../../../../Images/Cancel.png")}
          alt="Cancel"
          style={{ width: "20%" }}
        />
      ),
    });
  };

  const fetchData = async () => {
    const sp: SPFI = getSp(); // Adjust this according to your actual method to get sp

    const items: any[] = await sp.web.lists
      .getByTitle("Approverlist")
      .items.getAll();
    const filesForApproval: any[] = await sp.web.lists
      .getByTitle("User Files")
      .items.getAll();
    console.log(filesForApproval);
    let user = await sp.web.currentUser();
    console.log(user.Email);

    let userDetails: any = [];
    let fileArray: any = [];
    let fileArrayUpdated: any = [];

    await filesForApproval.map(async (files) => {
      if (
        files.Approver2 === user.Email &&
        files.ApprovalStatus === "APPROVER 2"
      ) {
        await userDetails.push(files);
      }
      if (
        files.Approver3 === user.Email &&
        files.ApprovalStatus === "APPROVER 3"
      ) {
        await userDetails.push(files);
      }
      if (
        files.Approver4 === user.Email &&
        files.ApprovalStatus === "APPROVER 4"
      ) {
        await userDetails.push(files);
      }
    });

    await console.log(userDetails);

    var uniq = {};
    fileArray = userDetails.filter(
      (obj) => !uniq[obj.ID] && (uniq[obj.ID] = true)
    );

    console.log("fileArray", fileArray);

    await fileArray.filter(async (files: any) => {
      if (files.Status === "Processing") {
        fileArrayUpdated.push(files);
      }
    });

    console.log("fileArrayUpdated", fileArrayUpdated);

    let val = fileArrayUpdated;
    setValue(fileArrayUpdated);
    console.log(val);
    setCurrentUser(user.Email);
    setCount(val.length);
    setItems(val.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    setOverallList(val);
  };

  useEffect(() => {
    console.log(rowsPerPage); // This will log the updated value of rowsPerPage
    console.log(page); // This will log the updated value of rowsPerPage
    fetchData();
  }, [rowsPerPage, page]);

  function _getKey(item: any, index?: number): string {
    return item.key;
  }

  const RowsPerPage = (value: any) => {
    let val = value;
    setRowsPerPage(val);
    console.log(rowsPerPage);
    console.log(val);
    fetchData();
  };

  const Page = (value: any) => {
    let val = value;
    setPage(val);
    setItems(val.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    fetchData();
  };

  const _onFilter = (text: any) => {
    const filtered: any = overalllist.filter(
      (item: any) =>
        item.FileTitle.toLowerCase().includes(text.toLowerCase()) ||
        item.Status.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

  const Approvemail: any = async (value, ApprovalStatus) => {
    try {
      console.log(value);
      console.log(value.ID);
      console.log(value.RelativeURL);

      setLoading(true);
      setOpenDialog(true);
      setHiddenDialog1(false);

      let siteUrl = value.RelativeURL.split("/");
      siteUrl[3] = "Original File";
      console.log(siteUrl);
      // let copy = siteUrl.join("/");
      let copy = siteUrl.join("/");
      console.log(copy);
      console.log(`${value.RelativeURL}${value.Filename}`);
      let ApprovalStatuss = "";
      let ApproverEmail = "";
      let Statuss = "";
      let ApprovedBy = "";
      if (ApprovalStatus === "APPROVER 2") {
        ApproverEmail = value.Approver3;
        ApprovedBy = value.Approver2;
        ApprovalStatuss = "APPROVER 3";
        console.log(ApproverEmail);
        date.setDate(date.getDate() + 3);
        console.log(formatDate(date));
        console.log(date);
        Statuss = "Processing";
        await Approvalmail(value, ApproverEmail, ApprovedBy);
      } else if (ApprovalStatus === "APPROVER 3") {
        ApproverEmail = value.Approver4;
        ApprovedBy = value.Approver3;
        ApprovalStatuss = "APPROVER 4";
        console.log(ApproverEmail);
        date.setDate(date.getDate() + 2);
        console.log(formatDate(date));
        console.log(date);
        Statuss = "Processing";
        await Approvalmail(value, ApproverEmail, ApprovedBy);
      } else if (ApprovalStatus === "APPROVER 4") {
        ApproverEmail = value.RequestorEmail;
        console.log(value.RequestorEmail);
        ApprovedBy = value.Approver4;
        console.log(value.Approver4);

        ApprovalStatuss = "APPROVER 4";
        Statuss = "Completed";
        console.log(Statuss);
        console.log(ApproverEmail);

        const destinationUrl: any = `${copy}`;
        console.log(destinationUrl);

        const sp: SPFI = getSp();
        const buffer: ArrayBuffer = await sp.web
          .getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`)
          .getBuffer()
          .then((res: any) => res)
          .catch((e) => console.error(e));

        console.log(`${value.RelativeURL}/${value.Filename}`);
        console.log(buffer);
        const blob: Blob = await sp.web
          .getFileByServerRelativePath(`${value.RelativeURL}/${value.Filename}`)
          .getBlob()
          .then((res: any) => res)
          .catch((e) => console.error(e));

        console.log(blob);
        console.log(`${destinationUrl}/${value.Filename}`);

        const exists: any = await sp.web
          .getFolderByServerRelativePath(`${destinationUrl}`)
          .files.getByUrl(`${value.Filename}`)
          .exists()
          .then((res) => res)
          .catch((e) => console.error(e));
        console.log(exists);
        console.log("inside approver 4");

        if (exists === true) {
          const folderPath: any = `${destinationUrl}/${value.Filename}`;
          console.log(folderPath);

          await sp.web
            .getFolderByServerRelativePath(`${destinationUrl}`)
            .files.addChunked(
              value.Filename,
              blob,
              (chunk) => {
                console.log(`progress`);
                console.log(chunk);
              },
              true
            )
            .then(async (file) => {
              console.log(file);
              console.log("File Uploaded");
              console.log(`${folderPath}/${value.Filename}`);

              let description = "";
              const itemss: any[] = await sp.web.lists
                .getByTitle("User Files")
                .items.top(1)
                .filter(`Filename eq '${value.Filename}'`)();
              if (itemss.length > 0) {
                console.log(itemss[0]);
                description = itemss[0].Filedescription;
              }
              await sp.web
                .getFileByServerRelativePath(
                  `${destinationUrl}/${value.Filename}`
                )
                .checkin(description);

              console.log(`${value.RelativeURL}/${value.Filename}`);

              await sp.web
                .getFileByServerRelativePath(
                  `${destinationUrl}/${value.Filename}`
                )
                .checkout();

              console.log(`${destinationUrl}/${value.Filename}`);

              let fileurl: any = "";

              // Declare folderPath here
              const folderPathForLinkingUri: any = `${destinationUrl}`;
              const folderForLinkingUri: any =
                sp.web.getFolderByServerRelativePath(folderPathForLinkingUri);

              await folderForLinkingUri.files
                .expand("Files/ListItemAllFields,DocID") // For Metadata extraction
                .select()() // Fields to retrieve
                // .get()
                .then(async (files) => {
                  await files.filter((file) => {
                    if (file.Name === value.Filename) {
                      fileurl = file.LinkingUri;
                    }
                  });
                });

              const items: any[] = await sp.web.lists
                .getByTitle("User Files")
                .items.top(1)
                .filter(`Filename eq '${value.Filename}'`)();
              console.log(items);
              if (items.length > 0) {
                await sp.web.lists
                  .getByTitle("User Files")
                  .items.getById(items[0].Id)
                  .update({
                    Fileurl: fileurl,
                  })
                  .then((i) => {
                    console.log(i);
                  });
              }
            });
        } else {
          //new file
          const fileRelativePath: any = `${destinationUrl}/${value.Filename}`;
          console.log(fileRelativePath);
          console.log(destinationUrl);

          const splited = destinationUrl.split("/");
          console.log(splited);
          const sliced = splited.slice(4, 7);
          console.log(sliced);

          const documentLibraryName = "Original File";

          const folders = sliced;

          // Initialize the base folder path
          let currentFolderPath = `/sites/DMS-Quadra/${documentLibraryName}`;

          // Iterate over each folder name and create folders
          for (const folderName of folders) {
            try {
              // Update the folder path
              currentFolderPath += `/${folderName}`;
              console.log(currentFolderPath);
              // Check if the folder already exists
              const folder = await sp.web
                .getFolderByServerRelativePath(currentFolderPath)
                .getItem();
              console.log(folder);

              console.log(
                `Folder "${folderName}" already exists at path: ${currentFolderPath}`
              );
            } catch (error) {
              // Handle the error if the folder doesn't exist
              console.error(
                `Folder "${folderName}" doesn't exist at path: ${currentFolderPath}`
              );
              console.log(
                `Creating folder "${folderName}" at path: ${currentFolderPath}`
              );

              // Attempt to create the folder
              try {
                await sp.web.folders.addUsingPath(currentFolderPath);
                console.log(
                  `Folder "${folderName}" created successfully at path: ${currentFolderPath}`
                );
              } catch (error) {
                console.error(`Error creating folder "${folderName}":`, error);
                return;
              }
            }
          }

          const fileExists: any = await sp.web
            .getFolderByServerRelativePath(`${destinationUrl}`)
            .files.getByUrl(`${value.Filename}`)
            .exists()
            .then((res) => res)
            .catch((e) => console.error(e));
          console.log(fileExists);

          await sp.web
            .getFolderByServerRelativePath(`${destinationUrl}`)
            .files.addUsingPath(value.Filename, blob, { Overwrite: true })
            .then(async (file) => {
              console.log("File Created", file);
              console.log(`${destinationUrl}/${value.Filename}`);
              await sp.web
                .getFileByServerRelativePath(
                  `${destinationUrl}/${value.Filename}`
                )
                .checkout();

              console.log(`${destinationUrl}/${value.Filename}`);

              let fileurl: any = "";

              try {
                const folder: any = await sp.web
                  .getFolderByServerRelativePath(destinationUrl)
                  .files.expand("Files/ListItemAllFields,DocID")
                  .select() // Fields to retrieve
                  ()
                  .then(async (item) => {
                    console.log(item);
                    await item.filter((file) => {
                      if (file.Name === value.Filename) {
                        fileurl = file.LinkingUri;
                      }
                    });
                  });
                console.log(fileurl);
              } catch (error) {
                console.error(error);
              }

              console.log(fileurl);

              try {
                const items: any[] = await sp.web.lists
                  .getByTitle("User Files")
                  .items.top(1)
                  .filter(`Filename eq '${value.Filename}'`)();
                console.log(items);

                if (items.length > 0) {
                  await sp.web.lists
                    .getByTitle("User Files")
                    .items.getById(items[0].Id)
                    .update({
                      Fileurl: fileurl,
                    })
                    .then((i) => {
                      console.log(i);
                    });
                }
              } catch (error) {
                console.error(error);
              }
            });
        }

        UserApprovalmail(value);
      }

      const sp: SPFI = getSp();

      await sp.web.lists
        .getByTitle("User Files")
        .items.getById(value.ID)
        .update({
          ApprovalStatus: ApprovalStatuss,
          Status: Statuss,
          Remainder: Statuss === "Completed" ? "" : formatDate(date),
          // FileUrl:
        })
        .then(async () => {
          let RefreshData: any = overalllist;
          let LastDate: any = [];
          console.log("overalllist", overalllist);
          await RefreshData.filter((files: any) => {
            if (files.ID !== value.ID) {
              LastDate.push(files);
            }
          });
          console.log("LastDate", LastDate);

          setValue(LastDate);
          setOverallList(LastDate);
          setItems(LastDate);
          setOpenDialog(false);
          setHiddenDialog(true);
        })
        .catch((er) => console.error(er));

      await setLoading(false);
    } catch (e) {
      console.log(e);

      setLoading(false);
      setError(true);
    }
    openNotification();
    fetchData();
  };

  const handleChangePage = (event, newPage) => {
    const newpagechange = newPage;
    setPage(newpagechange);
    console.log(page);
    fetchData();
  };

  const [form] = useForm();

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const RejectFunc = async (fileDetails) => {
    try {
      setOpenDialog(true);
      setHiddenDialog(false);
      setCurrentFile(fileDetails);
      setOpen(true);
    } catch (error) {
      console.error("Error displaying rejection dialog:", error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  const Rejectmail = async (value) => {
    console.log(value);
    console.log(value.ID);

    if (fileDes.length === 0) {
      alert("Please enter the rejection comments.");
    } else {
      await Denymail(value.RequestorEmail, value, fileDes);

      const sp: SPFI = getSp();
      await sp.web.lists
        .getByTitle("User Files")
        .items.getById(value.ID)
        .update({
          Status: "Rejected",
        })
        .then(async () => {
          let RefreshData = fileArray;
          // let LastDate = [];
          let LastDate: any = [];

          await RefreshData.filter((files: any) => {
            if (files.ID !== value.ID) {
              LastDate.push(files);
            }
          });

          setFileArray(LastDate);
          setValue(LastDate);
          setOverallList(LastDate);
          setItems(LastDate);
          setOpenDialog(false);
          setHiddenDialog(true);
        });
      setOpen(false);
      openDeneiedNotification();
      form.resetFields();
      fetchData();
    }
  };

  const changeValueFileDescription = async (e) => {
    console.log(e.target.value);

    setFileDes(e.target.value);
  };

  return (
    <div>
      <div>
        <p className={styles.Approverstyle}>Approver Dashboard</p>
      </div>
      <div style={{ marginLeft: "3%", marginTop: "50px" }}>
        <div style={{ width: "98%" }}>
          <Row gutter={24}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-end" }}
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
          <Drawer
            title="Rejection"
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
                    backgroundColor: "rgba(203, 68, 68, 1)",
                    color: "white",
                  }}
                  onClick={() => form.submit()} // Trigger the form submit manually
                >
                  Reject
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
              <Row gutter={24}>
                <Col span={24}>
                  <p style={{ fontSize: "13px" }}>
                    Provide your reason for rejection in the comments.
                  </p>
                </Col>
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={() => Rejectmail(CurrentFile)}
                  autoComplete="off"
                  form={form}
                >
                  <div>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          label="Reason for Rejection"
                          name="Reason for Rejection"
                          style={{
                            maxWidth: 500,
                            marginTop: 37,
                            fontWeight: 600,
                            fontSize: "16px",
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your reason for rejection",
                            },
                          ]}
                        >
                          <TextArea
                            allowClear
                            onChange={changeValueFileDescription}
                            style={{
                              width: "350px",
                              height: "190px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <div></div>
              </Row>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
