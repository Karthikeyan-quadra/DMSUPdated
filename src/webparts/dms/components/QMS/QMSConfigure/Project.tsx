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
const sp:SPFI=getSp()
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
  export default function Department(){
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

  const [items, setItems] = useState([]);
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

  const fetchData = async () => {
    try {
      const projectList:any = await getProjectlist();
      setItems(projectList);
    } catch (error) {
      console.error('Error fetching project list:', error);
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
    const sp:SPFI=getSp()

    const list:any = sp.web.lists.getByTitle("Project List");
    try {
      await list.items.getById(edit_ID).delete();
      setIsEdited(false);
      const projectList = await getProjectlist();
      setValue(projectList);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    fetchData();

  };

 
    const navStyles: Partial<INavStyles> = {
      root: { width: 530 },
    };
    const _onRenderLink = (group: INavLink) => {
      return (
        <table
          style={{ tableLayout: "fixed", width: "100%", textAlign: "left" }}
        >
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
      const sp:SPFI=getSp()
  
      if (add_Project_Title !== "") {
        if (add_Project_Code !== "") {
          try {
            await sp.web.lists.getByTitle("Project List").items.add({
              ProjectName: add_Project_Title,
              ProjectID: add_Project_Code
            });
            setIsAdded(false);
            const projectList = await getProjectlist();
            setValue(projectList);
          } catch (error) {
            console.error('Error adding project:', error);
          }
        } else {
          setAddProjectCodeErr("Please specify Code");
        }
      } else {
        setAddProjectTitleErr("Please specify project name");
      }
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
      const sp:SPFI=getSp()
  
      if (edit_Project_Title !== "") {
        if (edit_Project_Code !== "") {
          try {
            const list:any = sp.web.lists.getByTitle("Project List");
            await list.items.getById(edit_ID).update({
              ProjectName: edit_Project_Title,
              ProjectID: edit_Project_Code
            });
            setIsEdited(false);
            const projectList = await getProjectlist();
            setValue(projectList); // Update items state with the new project list
          } catch (error) {
            console.error('Error editing project:', error);
          }
        } else {
          setEditProjectCodeErr("Please specify Code");
        }
      } else {
        setEditProjectTitleErr("Please specify project name");
      }
      fetchData();

    };


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
      console.log(value);
      setHideEditDialog(false);
      setIsEdited(true);
      setEditProjectTitle(value.name);
      setEditID(value.Id);
      setEditProjectCode(value.code);
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
    };

    // const handleadd_Project_Title = (event, value) => {
    //   this.setState({
    //     add_Project_Title: value,
    //   });
    // };

    const handleadd_Project_Title = (event, value) => {
      // this.setState({
      //   add_Project_Title: value,
      // });
      setAddProjectTitle(value);
    };

    // const handleadd_Project_Code = (event, value) => {
    //   this.setState({
    //     add_Project_Code: value,
    //   });
    // };

    const handleadd_Project_Code = (event, value) => {
      // this.setState({
      //   add_Project_Code: value,
      // });
      setAddProjectCode(value);
    };

    // const handleedit_Project_Title = (event, value) => {
    //   this.setState({
    //     edit_Project_Title: value,
    //   });
    // };
    const handleedit_Project_Title = (event, value) => {
      // this.setState({
      //   edit_Project_Title: value,
      // });
      setEditProjectTitle(value);
    };


    // const handleedit_Project_Code = (event, value) => {
    //   this.setState({
    //     edit_Project_Code: value,
    //   });
    // };

    const handleedit_Project_Code = (event, value) => {
      // this.setState({
      //   edit_Project_Code: value,
      // });
      setEditProjectCode(value);
    };
    return (
      <>
        <div
          className={styles.anihover}
          onClick={addProject}
          style={{ padding: "10px" }}
        >
          <FontIcon
            aria-label="CircleAddition"
            iconName="CircleAddition"
            style={{
              color: "rgb(0 120 212)",
              padding: "0 10px",
              fontSize: "17px",
            }}
          />
          <Text style={{ marginLeft: "5px" }} variant="xLarge">
            Add Projects
          </Text>
        </div>
        <Separator />
        <Nav
          styles={navStyles}
          onRenderLink={_onRenderLink}
          onRenderGroupHeader={_onRenderGroupHeader}
          ariaLabel="Nav example similar to one found in this demo page"
          groups={items}
        />
        <Dialog
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
              <div style={{ margin: "15px" }}>
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <TextField
                    required
                    label="Project Title"
                    placeholder="Type Project Name"
                    resizable={false}
                    onChange={handleadd_Project_Title}
                    errorMessage={add_Project_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Project Code"
                    placeholder="Type Project Unique ID"
                    onChange={handleadd_Project_Code}
                    resizable={false}
                    errorMessage={add_Project_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleaddProject}
                  text="Submit"
                />
                <DefaultButton onClick={toggleHideDialog} text="Cancel" />
              </DialogFooter>
            </div>
          ) : (
            <div>
              <FontIcon
                aria-label="SkypeCircleCheck"
                iconName="SkypeCircleCheck"
                className={iconClass}
              />
              <Label
                style={{
                  margin: "0 auto",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                Project created Successfully
              </Label>

              <DialogFooter>
                <DefaultButton onClick={toggleHideDialog} text="Close" />
              </DialogFooter>
            </div>
          )}
        </Dialog>

        {/*Edit Projects*/}
        <Dialog
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
                    label="Project Title"
                    placeholder="Type Project Name"
                    resizable={false}
                    value={edit_Project_Title}
                    onChange={handleedit_Project_Title}
                    errorMessage={edit_Project_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Project Code"
                    placeholder="Type Project Unique ID"
                    onChange={handleedit_Project_Code}
                    resizable={false}
                    value={edit_Project_Code}
                    errorMessage={edit_Project_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <DefaultButton onClick={Deleteitem} text="Delete" />
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleeditProject}
                  text="Submit"
                />
                <DefaultButton
                  onClick={toggleeditHideDialog}
                  text="Cancel"
                />
              </DialogFooter>
            </div>
          ) : (
            <div>
              <FontIcon
                aria-label="SkypeCircleCheck"
                iconName="SkypeCircleCheck"
                className={iconClass}
              />
              <Label
                style={{
                  margin: "0 auto",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                Project Details Altered Successfully
              </Label>

              <DialogFooter>
                <DefaultButton
                  onClick={toggleeditHideDialog}
                  text="Close"
                />
              </DialogFooter>
            </div>
          )}
        </Dialog>
      </>
    );
  
}
