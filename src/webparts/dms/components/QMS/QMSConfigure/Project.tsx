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
export default class Department extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hideDialog: true,
      addProjectStatus: true,
      isAdded: true,
      add_Project_Title_err: "",
      add_Project_Title: "",
      add_Project_Code_err: "",
      add_Project_Code: "",
      hideeditDialog: true,
      isEdited: true,
      edit_Project_Title_err: "",
      edit_Project_Title: "",
      edit_Project_Code_err: "",
      edit_Project_Code: "",
      edit_ID: "",
    };
  }

  public async componentDidMount() {
    this.setState(
      {
        value: await getProjectlist().then((val) =>
          this.setState({
            items: val,
          })
        ),
      },
      () => {
        console.log(this.state.items);
      }
    );
  }
  public toggleHideDialog = () => {
    console.log(this.state.hideDialog);
    if (this.state.hideDialog)
      this.setState({
        hideDialog: false,
      });
    else
      this.setState({
        hideDialog: true,
        isAdded: true,
        add_Project_Title_err: "",
        add_Project_Title: "",
        add_Project_Code_err: "",
        add_Project_Code: "",
      });
  };

  public toggleeditHideDialog = () => {
    console.log(this.state.hideeditDialog);
    if (this.state.hideeditDialog)
      this.setState({
        hideeditDialog: false,
      });
    else
      this.setState({
        hideeditDialog: true,
        isEdited: true,
        edit_Project_Title_err: "",
        edit_Project_Title: "",
        edit_Project_Code_err: "",
        edit_Project_Code: "",
        edit_ID: "",
      });
  };

  public Deleteitem = async () => {
    const sp:SPFI=getSp()

    const list = sp.web.lists.getByTitle("Project List");
    await list.items
      .getById(this.state.edit_ID)
      .delete()
      .then(async (res) =>
        this.setState({
          isEdited: false,
          value: await getProjectlist().then((val) =>
            this.setState({
              items: val,
            })
          ),
        })
      );
  };
  render(): React.ReactNode {
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
    const handleaddProject = async () => {
      const sp:SPFI=getSp()

      if (this.state.add_Project_Title != "") {
        if (this.state.add_Project_Code != "") {

          await sp.web.lists
            .getByTitle("Project List")
            .items.add({
              ProjectName: this.state.add_Project_Title,
              ProjectID: this.state.add_Project_Code,
            })
            .then(async (res) =>
              this.setState({
                isAdded: false,
                value: await getProjectlist().then((val) =>
                  this.setState({
                    items: val,
                  })
                ),
              })
            );
        } else {
          this.setState({
            add_Project_Code_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          add_Project_Title_err: "Please specify project name",
        });
      }
    };
    const handleeditProject = async () => {
      const sp:SPFI=getSp()

      if (this.state.edit_Project_Title != "") {
        if (this.state.edit_Project_Code != "") {
          const list = sp.web.lists.getByTitle("Project List");

          await list.items
            .getById(this.state.edit_ID)
            .update({
              ProjectName: this.state.edit_Project_Title,
              ProjectID: this.state.edit_Project_Code,
            })
            .then(async (res) =>
              this.setState({
                isEdited: false,
                value: await getProjectlist().then((val) =>
                  this.setState({
                    items: val,
                  })
                ),
              })
            );
        } else {
          this.setState({
            edit_Project_Code_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          edit_Project_Title_err: "Please specify project name",
        });
      }
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
    const editProject = (value) => {
      console.log(value);
      this.setState({
        hideeditDialog: false,
        isEdited: true,
        edit_Project_Title: value.name,
        edit_ID: value.Id,
        edit_Project_Code: value.code,
      });
    };
    const addProject = () => {
      this.setState({
        hideDialog: false,
        isAdded: true,
      });
    };
    const handleadd_Project_Title = (event, value) => {
      this.setState({
        add_Project_Title: value,
      });
    };
    const handleadd_Project_Code = (event, value) => {
      this.setState({
        add_Project_Code: value,
      });
    };
    const handleedit_Project_Title = (event, value) => {
      this.setState({
        edit_Project_Title: value,
      });
    };
    const handleedit_Project_Code = (event, value) => {
      this.setState({
        edit_Project_Code: value,
      });
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
          groups={this.state.items}
        />
        <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.addProjectDialog
          }
          hidden={this.state.hideDialog}
          dialogContentProps={dialogContentProps}
          isBlocking={false}
          onDismiss={this.toggleHideDialog}
        >
          {this.state.isAdded ? (
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
                    errorMessage={this.state.add_Project_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Project Code"
                    placeholder="Type Project Unique ID"
                    onChange={handleadd_Project_Code}
                    resizable={false}
                    errorMessage={this.state.add_Project_Code_err}
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
                <DefaultButton onClick={this.toggleHideDialog} text="Cancel" />
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
                <DefaultButton onClick={this.toggleHideDialog} text="Close" />
              </DialogFooter>
            </div>
          )}
        </Dialog>

        {/*Edit Projects*/}
        <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.addProjectDialog
          }
          hidden={this.state.hideeditDialog}
          dialogContentProps={dialogContentProps_edit}
          isBlocking={false}
          onDismiss={this.toggleeditHideDialog}
        >
          {this.state.isEdited ? (
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
                    value={this.state.edit_Project_Title}
                    onChange={handleedit_Project_Title}
                    errorMessage={this.state.edit_Project_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Project Code"
                    placeholder="Type Project Unique ID"
                    onChange={handleedit_Project_Code}
                    resizable={false}
                    value={this.state.edit_Project_Code}
                    errorMessage={this.state.edit_Project_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <DefaultButton onClick={this.Deleteitem} text="Delete" />
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleeditProject}
                  text="Submit"
                />
                <DefaultButton
                  onClick={this.toggleeditHideDialog}
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
                  onClick={this.toggleeditHideDialog}
                  text="Close"
                />
              </DialogFooter>
            </div>
          )}
        </Dialog>
      </>
    );
  }
}
