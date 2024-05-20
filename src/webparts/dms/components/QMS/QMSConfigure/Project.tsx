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
import { getDepartmentlistedit, getProjectlist } from "../../Data/GetSiteList";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
const sp: SPFI = getSp();
const dialogContentProps = {
  type: DialogType.normal,
  title: "Add Project",
};
const dialogContentProps_edit = {
  type: DialogType.normal,
  title: "Edit Project",
};
const iconClass = mergeStyles({
  fontSize: 100,
  width: "500px",
  color: "green",
  textAlign: "center",
});
// export default class Department extends React.Component<{}, any> {
// export default function Department(){
export default function Project() {
  // this.state = {
  //   items: [],
  //   hideDialog: true,
  //   addProjectStatus: true,
  //   isAdded: true,
  //   add_Project_Title_err: "",
  //   add_Project_Title: "",
  //   add_Project_Code_err: "",
  //   add_Project_Code: "",
  //   hideeditDialog: true,
  //   isEdited: true,
  //   edit_Project_Title_err: "",
  //   edit_Project_Title: "",
  //   edit_Project_Code_err: "",
  //   edit_Project_Code: "",
  //   edit_ID: "",
  // };
  const [form] = useForm();
  const [items, setItems] = useState<any>([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [addProjectStatus, setAddProjectStatus] = useState(true);
  const [isAdded, setIsAdded] = useState(true);
  const [add_Project_Title_err, setAddProjectTitleErr] = useState("");
  const [add_Project_Title, setAddProjectTitle] = useState("");
  const [add_Project_Code_err, setAddProjectCodeErr] = useState("");
  const [add_Project_Code, setAddProjectCode] = useState("");
  const [hideeditDialog, setHideEditDialog] = useState(true);
  const [isEdited, setIsEdited] = useState(true);
  const [edit_Project_Title_err, setEditProjectTitleErr] = useState("");
  const [edit_Project_Title, setEditProjectTitle] = useState("");
  const [edit_Project_Code_err, setEditProjectCodeErr] = useState("");
  const [edit_Project_Code, setEditProjectCode] = useState("");
  const [edit_ID, setEditID] = useState("");
  const [value, setValue] = useState<any>();
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [onchanged, setOnChanged] = useState(false);
  const [disablesubmit, setDisableSubmit] = useState(false);

  // public async componentDidMount() {
  //   this.setState(
  //     {
  //       value: await getProjectlist().then((val) =>
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
  const openNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Added</span>
      ),
      description: "You have added the project successfully",
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
  const openEditNotification = () => {
    notification.info({
      message: (
        <span style={{ color: "green", fontWeight: "bold" }}>Updated</span>
      ),
      description: "You have updated the project successfully",
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
      description: "You have deleted the project successfully",
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
  const fetchData = async () => {
    try {
      const projectList: any = await getProjectlist();
      setItems(projectList);
    } catch (error) {
      console.error("Error fetching project list:", error);
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  const onEditClose = () => {
    setEditOpen(false);
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
  //       add_Project_Title_err: "",
  //       add_Project_Title: "",
  //       add_Project_Code_err: "",
  //       add_Project_Code: "",
  //     });
  // };

  const toggleHideDialog = () => {
    console.log(hideDialog);
    if (hideDialog) {
      setHideDialog(false);
    } else {
      setHideDialog(true);
      setIsAdded(true);
      setAddProjectTitleErr("");
      setAddProjectTitle("");
      setAddProjectCodeErr("");
      setAddProjectCode("");
    }
    setOpen(false);
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
  //       edit_Project_Title_err: "",
  //       edit_Project_Title: "",
  //       edit_Project_Code_err: "",
  //       edit_Project_Code: "",
  //       edit_ID: "",
  //     });
  // };

  const toggleeditHideDialog = () => {
    console.log(hideeditDialog);
    if (hideeditDialog) {
      setHideEditDialog(false);
    } else {
      setHideEditDialog(true);
      setIsEdited(true);
      setEditProjectTitleErr("");
      setEditProjectTitle("");
      setEditProjectCodeErr("");
      setEditProjectCode("");
      setEditID("");
    }
    setEditOpen(false);
  };

  // public Deleteitem = async () => {
  //   const sp:SPFI=getSp()

  //   const list = sp.web.lists.getByTitle("Project List");
  //   await list.items
  //     .getById(this.state.edit_ID)
  //     .delete()
  //     .then(async (res) =>
  //       this.setState({
  //         isEdited: false,
  //         value: await getProjectlist().then((val) =>
  //           this.setState({
  //             items: val,
  //           })
  //         ),
  //       })
  //     );
  // };

  const Deleteitem = async () => {
    const sp: SPFI = getSp();

    const list: any = sp.web.lists.getByTitle("Project List");
    try {
      await list.items.getById(edit_ID).delete();
      setIsEdited(false);
      const projectList = await getProjectlist();
      setValue(projectList);
      const updatedItems = await getProjectlist();
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    openDeleteNotification;
    setEditOpen(false);

    fetchData();
  };

  const navStyles: Partial<INavStyles> = {
    root: { width: 530 },
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
              onClick={() => editProject(group)}
            />
          </td>
        </tr>
      </table>
    );
  };
  // const handleaddProject = async () => {
  //   const sp:SPFI=getSp()

  //   if (this.state.add_Project_Title != "") {
  //     if (this.state.add_Project_Code != "") {

  //       await sp.web.lists
  //         .getByTitle("Project List")
  //         .items.add({
  //           ProjectName: this.state.add_Project_Title,
  //           ProjectID: this.state.add_Project_Code,
  //         })
  //         .then(async (res) =>
  //           this.setState({
  //             isAdded: false,
  //             value: await getProjectlist().then((val) =>
  //               this.setState({
  //                 items: val,
  //               })
  //             ),
  //           })
  //         );
  //     } else {
  //       this.setState({
  //         add_Project_Code_err: "Please specify Code",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       add_Project_Title_err: "Please specify project name",
  //     });
  //   }
  // };

  const handleaddProject = async () => {
    setDisableSubmit(true);
    const sp: SPFI = getSp();

    try {
      await sp.web.lists.getByTitle("Project List").items.add({
        ProjectName: add_Project_Title,
        ProjectID: add_Project_Code,
      });
      setIsAdded(false);
      const projectList = await getProjectlist();
      setValue(projectList);
      const updatedItems = await getProjectlist();
      setItems(updatedItems);
      console.log(items);
      console.log(updatedItems);
    } catch (error) {
      console.error("Error adding project:", error);
    }

    if (onchanged) {
      openNotification();
      setOnChanged(false);
    }
    setDisableSubmit(false);
    fetchData();
  };

  // const handleeditProject = async () => {
  //   const sp:SPFI=getSp()

  //   if (this.state.edit_Project_Title != "") {
  //     if (this.state.edit_Project_Code != "") {
  //       const list = sp.web.lists.getByTitle("Project List");

  //       await list.items
  //         .getById(this.state.edit_ID)
  //         .update({
  //           ProjectName: this.state.edit_Project_Title,
  //           ProjectID: this.state.edit_Project_Code,
  //         })
  //         .then(async (res) =>
  //           this.setState({
  //             isEdited: false,
  //             value: await getProjectlist().then((val) =>
  //               this.setState({
  //                 items: val,
  //               })
  //             ),
  //           })
  //         );
  //     } else {
  //       this.setState({
  //         edit_Project_Code_err: "Please specify Code",
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       edit_Project_Title_err: "Please specify project name",
  //     });
  //   }
  // };

  const handleeditProject = async () => {
    setDisableSubmit(true);

    const sp: SPFI = getSp();

    try {
      const list: any = sp.web.lists.getByTitle("Project List");
      await list.items.getById(edit_ID).update({
        ProjectName: edit_Project_Title,
        ProjectID: edit_Project_Code,
      });
      setIsEdited(false);
      const projectList = await getProjectlist();
      setValue(projectList); // Update items state with the new project list
      const updatedItems = await getProjectlist();
      setItems(updatedItems);
    } catch (error) {
      console.error("Error editing project:", error);
    }

    if (onchanged) {
      openEditNotification();
      setOnChanged(false);
    }
    setDisableSubmit(false);
    fetchData();
  };

  useEffect(() => {
    // Fetch the initial list of departments
    getProjectlist().then(setItems);
    console.log(items);
  }, []);
  const _onRenderGroupHeader = (group: INavLinkGroup) => {
    return (
      <>
        <b>
          <Text variant="xLarge" style={{ fontSize: "17px" }}>
            {group.name}
          </Text>
        </b>
        <Separator />
      </>
    );
  };
  // const editProject = (value) => {
  //   console.log(value);
  //   this.setState({
  //     hideeditDialog: false,
  //     isEdited: true,
  //     edit_Project_Title: value.name,
  //     edit_ID: value.Id,
  //     edit_Project_Code: value.code,
  //   });
  // };
  const editProject = (value) => {
    setEditOpen(true);
    console.log(value);
    setHideEditDialog(false);
    setIsEdited(true);
    setEditProjectTitle(value.name);
    setEditID(value.Id);
    setEditProjectCode(value.code);
    form.setFieldsValue({
      "Project Title": value.name,
      "Project Code": value.code,
    });
  };

  // const addProject = () => {
  //   this.setState({
  //     hideDialog: false,
  //     isAdded: true,
  //   });
  // };

  const addProject = () => {
    setHideDialog(false);
    setIsAdded(true);
    setOpen(true);
    form.resetFields();
  };

  // const handleadd_Project_Title = (event, value) => {
  //   this.setState({
  //     add_Project_Title: value,
  //   });
  // };

  const handleadd_Project_Title = (e: any) => {
    // this.setState({
    //   add_Project_Title: value,
    // });
    setAddProjectTitle(e.target.value);
  };

  // const handleadd_Project_Code = (event, value) => {
  //   this.setState({
  //     add_Project_Code: value,
  //   });
  // };

  const handleadd_Project_Code = (e: any) => {
    // this.setState({
    //   add_Project_Code: value,
    // });
    setAddProjectCode(e.target.value);
  };

  // const handleedit_Project_Title = (event, value) => {
  //   this.setState({
  //     edit_Project_Title: value,
  //   });
  // };
  const handleedit_Project_Title = (e: any) => {
    // this.setState({
    //   edit_Project_Title: value,
    // });
    setEditProjectTitle(e.target.value);
    setOnChanged(true);
  };

  // const handleedit_Project_Code = (event, value) => {
  //   this.setState({
  //     edit_Project_Code: value,
  //   });
  // };

  const handleedit_Project_Code = (e: any) => {
    // this.setState({
    //   edit_Project_Code: value,
    // });
    setEditProjectCode(e.target.value);
    setOnChanged(true);
  };
  return (
    // <>
    //   <div
    //     className={styles.anihover}
    //     onClick={addProject}
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
    //       Add Projects
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
    //     containerClassName={"ms-dialogMainOverride " + styles.addProjectDialog}
    //     hidden={hideDialog}
    //     dialogContentProps={dialogContentProps}
    //     isBlocking={false}
    //     onDismiss={toggleHideDialog}
    //   >
    //     {isAdded ? (
    //       <div>
    //         <div style={{ margin: "15px" }}>
    //           <div
    //             style={{
    //               width: "350px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Project Title"
    //               placeholder="Type Project Name"
    //               resizable={false}
    //               onChange={handleadd_Project_Title}
    //               errorMessage={add_Project_Title_err}
    //             />
    //           </div>

    //           <div style={{ width: "350px", marginTop: "15px" }}>
    //             <TextField
    //               required
    //               label="Project Code"
    //               placeholder="Type Project Unique ID"
    //               onChange={handleadd_Project_Code}
    //               resizable={false}
    //               errorMessage={add_Project_Code_err}
    //             />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <PrimaryButton
    //             style={{
    //               backgroundColor: "#0078D4",
    //             }}
    //             onClick={handleaddProject}
    //             text="Submit"
    //           />
    //           <DefaultButton onClick={toggleHideDialog} text="Cancel" />
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
    //           Project created Successfully
    //         </Label>

    //         <DialogFooter>
    //           <DefaultButton onClick={toggleHideDialog} text="Close" />
    //         </DialogFooter>
    //       </div>
    //     )}
    //   </Dialog>

    //   {/*Edit Projects*/}
    //   <Dialog
    //     containerClassName={"ms-dialogMainOverride " + styles.addProjectDialog}
    //     hidden={hideeditDialog}
    //     dialogContentProps={dialogContentProps_edit}
    //     isBlocking={false}
    //     onDismiss={toggleeditHideDialog}
    //   >
    //     {isEdited ? (
    //       <div>
    //         <div style={{ margin: "15px" }}>
    //           <div
    //             style={{
    //               width: "350px",
    //             }}
    //           >
    //             <TextField
    //               required
    //               label="Project Title"
    //               placeholder="Type Project Name"
    //               resizable={false}
    //               value={edit_Project_Title}
    //               onChange={handleedit_Project_Title}
    //               errorMessage={edit_Project_Title_err}
    //             />
    //           </div>

    //           <div style={{ width: "350px", marginTop: "15px" }}>
    //             <TextField
    //               required
    //               label="Project Code"
    //               placeholder="Type Project Unique ID"
    //               onChange={handleedit_Project_Code}
    //               resizable={false}
    //               value={edit_Project_Code}
    //               errorMessage={edit_Project_Code_err}
    //             />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <DefaultButton onClick={Deleteitem} text="Delete" />
    //           <PrimaryButton
    //             style={{
    //               backgroundColor: "#0078D4",
    //             }}
    //             onClick={handleeditProject}
    //             text="Submit"
    //           />
    //           <DefaultButton onClick={toggleeditHideDialog} text="Cancel" />
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
    //           Project Details Altered Successfully
    //         </Label>

    //         <DialogFooter>
    //           <DefaultButton onClick={toggleeditHideDialog} text="Close" />
    //         </DialogFooter>
    //       </div>
    //     )}
    //   </Dialog>
    // </>
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>Projects</span>
        </div>
        <div style={{ width: "50%", textAlign: "end" }}>
          <span onClick={addProject}>
            <img src={require("../../../../../Images/Group.png")} alt="add" />
          </span>
        </div>
      </div>
      {isAdded ? (
        <div>
          <Drawer
            title="Add Project"
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
                onFinish={() => handleaddProject()}
                form={form}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Project Title"
                      name="Project Title"
                      style={{
                        maxWidth: 400,
                        marginTop: 10,
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
                        onChange={handleadd_Project_Title}
                        value={add_Project_Title}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Project Code"
                      name="Project Code"
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
                        onChange={handleadd_Project_Code}
                        value={add_Project_Code}
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
      {/* <div>
      {items.map((item) => (
        <Card title={item.name}>
        <p>Project Code: {item.code}</p>
      ))}

      </div> */}
      <div>
        {items.map((item: any) => (
          <Card title="" key={item.code}>
            {item.links.map((link) => (
              <div
                key={link.Id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{link.name}</span>
                <span>{link.code}</span>
                <span>
                  <img
                    onClick={() => editProject(link)}
                    src={require("../../../../../Images/Edit.png")}
                    alt="Edit"
                  />
                </span>
              </div>
            ))}
          </Card>
        ))}
      </div>
      {isEdited ? (
        <div>
          <Drawer
            title="Edit Project"
            onClose={onEditClose}
            open={editopen}
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
                onFinish={() => handleeditProject()}
                form={form}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Project Title"
                      name="Project Title"
                      style={{
                        maxWidth: 400,
                        marginTop: 10,
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
                        onChange={handleedit_Project_Title}
                        value={edit_Project_Title}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Project Code"
                      name="Project Code"
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
                        onChange={handleedit_Project_Code}
                        value={edit_Project_Code}
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
