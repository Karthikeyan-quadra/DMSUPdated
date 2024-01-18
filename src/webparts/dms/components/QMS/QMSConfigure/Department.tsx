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
const sp:SPFI=getSp()
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
export default class Department extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hideDeptDialog: true,
      isDeptAdded: true,
      add_Dept_Title_err: "",
      add_Dept_Title: "",
      add_Dept_Code_err: "",
      add_Dept_Code: "",

      hideDepteditDialog: true,
      isDeptEdited: true,
      edit_Dept_Title_err: "",
      edit_Dept_Title: "",
      edit_Dept_Code_err: "",
      edit_Dept_Code: "",
      edit_DeptID: "",
      temp_Deptname: "",

      hideSectionDialog: true,
      isSectionAdded: true,
      add_Section_Title_err: "",
      add_Section_Title: "",
      add_Section_Code_err: "",
      add_Section_Code: "",
      sectionDept: "",

      hideSectioneditDialog: true,
      isSectionEdited: true,
      edit_Section_Title_err: "",
      edit_Section_Title: "",
      edit_Section_Code_err: "",
      edit_Section_Code: "",
      edit_SectionID: "",
    };
  }

  public toggleDepteditHideDialog = () => {
    console.log(this.state.hideDepteditDialog);
    if (this.state.hideDepteditDialog)
      this.setState({
        hideDepteditDialog: false,
      });
    else
      this.setState({
        hideDepteditDialog: true,
        isDeptEdited: true,
        edit_Dept_Title_err: "",
        edit_Dept_Title: "",
        edit_Dept_Code_err: "",
        edit_Dept_Code: "",
        edit_DeptID: "",
        temp_Deptname: "",
      });
  };

  public toggleSectioneditHideDialog = () => {
    console.log(this.state.hideSectioneditDialog);
    if (this.state.hideSectioneditDialog)
      this.setState({
        hideSectioneditDialog: false,
      });
    else
      this.setState({
        hideSectioneditDialog: true,
        isSectionEdited: true,
        edit_Section_Title_err: "",
        edit_Section_Title: "",
        edit_Section_Code_err: "",
        edit_Section_Code: "",
        edit_SectionID: "",
      });
  };

  public Deleteitem = async () => {
    const sp:SPFI=getSp()

    const list = sp.web.lists.getByTitle("Department Names");
    await list.items
      .getById(this.state.edit_DeptID)
      .delete()
      .then(async (res) =>
        this.setState({
          isDeptEdited: false,
          value: await getDepartmentlistedit().then((val) =>
            this.setState({
              items: val,
            })
          ),
        })
      );
  };

  public DeleteSection = async () => {
    const sp:SPFI=getSp()
    const list = sp.web.lists.getByTitle("Sub departments Main");
    await list.items
      .getById(this.state.edit_SectionID)
      .delete()
      .then(async (res) =>
        this.setState({
          isSectionEdited: false,
          value: await getDepartmentlistedit().then((val) =>
            this.setState({
              items: val,
            })
          ),
        })
      );
  };

  public async componentDidMount() {
    this.setState(
      {
        value: await getDepartmentlistedit().then((val) =>
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
  public toggleDeptHideDialog = () => {
    console.log(this.state.hideDeptDialog);
    if (this.state.hideDeptDialog)
      this.setState({
        hideDeptDialog: false,
      });
    else
      this.setState({
        hideDeptDialog: true,

        isDeptAdded: true,
        add_Dept_Title_err: "",
        add_Dept_Title: "",
        add_Dept_Code_err: "",
        add_Dept_Code: "",
      });
  };

  public toggleSectionHideDialog = () => {
    console.log(this.state.hideSectionDialog);
    if (this.state.hideSectionDialog)
      this.setState({
        hideSectionDialog: false,
      });
    else
      this.setState({
        hideSectionDialog: true,
        sectionDept: "",
        isSectionAdded: true,
        add_Section_Title_err: "",
        add_Section_Title: "",
        add_Section_Code_err: "",
        add_Section_Code: "",
      });
  };

  render(): React.ReactNode {
    const navStyles: Partial<INavStyles> = {
      root: { width: 530 },
    };
    const handleeditDept = async () => {
      const sp:SPFI=getSp()

      if (this.state.edit_Dept_Title != "") {
        if (this.state.edit_Dept_Code != "") {
          const list = sp.web.lists.getByTitle("Department Names");

          await list.items
            .getById(this.state.edit_DeptID)
            .update({
              Departments: this.state.edit_Dept_Title,
              Code: this.state.edit_Dept_Code,
            })
            .then(async (res) => {
              const items: any[] = await sp.web.lists
                .getByTitle("Sub departments Main")
                .items.top(1)
                .filter(`ParentFolders eq '${this.state.temp_Deptname}'`)();

              // see if we got something
              if (items.length > 0) {
                const updatedItem = await sp.web.lists
                  .getByTitle("Sub departments Main")
                  .items.getById(items[0].Id)
                  .update({
                    ParentFolders: this.state.edit_Dept_Title,
                  });

                console.log(JSON.stringify(updatedItem));
              }
              this.setState({
                isDeptEdited: false,
                value: await getDepartmentlistedit().then((val) =>
                  this.setState({
                    items: val,
                  })
                ),
              });
            });
        } else {
          this.setState({
            edit_Dept_Code_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          edit_Dept_Title_err: "Please specify Department name",
        });
      }
    };

    const handleeditSection = async () => {
      const sp:SPFI=getSp()

      if (this.state.edit_Section_Title != "") {
        if (this.state.edit_Section_Code != "") {
          const list = sp.web.lists.getByTitle("Sub departments Main");

          await list.items
            .getById(this.state.edit_SectionID)
            .update({
              SubFolders: this.state.edit_Section_Title,
              Code: this.state.edit_Section_Code,
            })
            .then(async (res) => {
              this.setState({
                isSectionEdited: false,
                value: await getDepartmentlistedit().then((val) =>
                  this.setState({
                    items: val,
                  })
                ),
              });
            });
        } else {
          this.setState({
            edit_Section_Code_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          edit_Section_Title_err: "Please specify Sub-Section name",
        });
      }
    };
    const editSection = (value) => {
      console.log(value);
      this.setState({
        hideSectioneditDialog: false,
        isSectionEdited: true,
        edit_Section_Title: value.name,
        edit_SectionID: value.Id,

        edit_Section_Code: value.code,
      });
    };

    const editDept = (value) => {
      console.log(value);
      this.setState({
        hideDepteditDialog: false,
        isDeptEdited: true,
        edit_Dept_Title: value.name,
        edit_DeptID: value.Id,
        temp_Deptname: value.name,
        edit_Dept_Code: value.code,
      });
    };

    const handleedit_Dept_Title = (event, value) => {
      this.setState({
        edit_Dept_Title: value,
      });
    };
    const handleedit_Dept_Code = (event, value) => {
      this.setState({
        edit_Dept_Code: value,
      });
    };
    const handleedit_Section_Title = (event, value) => {
      this.setState({
        edit_Section_Title: value,
      });
    };
    const handleedit_Section_Code = (event, value) => {
      this.setState({
        edit_Section_Code: value,
      });
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
      const sp:SPFI=getSp()

      if (this.state.add_Dept_Title != "") {
        if (this.state.add_Dept_Code != "") {
          await sp.web.lists
            .getByTitle("Department Names")
            .items.add({
              Departments: this.state.add_Dept_Title,
              Code: this.state.add_Dept_Code,
            })
            .then(async (res) =>
              this.setState({
                isDeptAdded: false,
                value: await getDepartmentlistedit().then((val) =>
                  this.setState({
                    items: val,
                  })
                ),
              })
            );
        } else {
          this.setState({
            add_Dept_Code_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          add_Dept_Title_err: "Please specify Department name",
        });
      }
    };

    const handleaddSection = async () => {
      const sp:SPFI=getSp()

      if (this.state.add_Section_Title != "") {
        if (this.state.add_Section_Code != "") {
          await sp.web.lists
            .getByTitle("Sub departments Main")
            .items.add({
              ParentFolders: this.state.sectionDept,
              SubFolders: this.state.add_Section_Title,
              Code: this.state.add_Section_Code,
            })
            .then(async (res) =>
              this.setState({
                isSectionAdded: false,
                value: await getDepartmentlistedit().then((val) =>
                  this.setState({
                    items: val,
                  })
                ),
              })
            );
        } else {
          this.setState({
            add_Section_Code_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          add_Section_Title_err: "Please specify Department name",
        });
      }
    };
    const handleadd_Dept_Title = (event, value) => {
      this.setState({
        add_Dept_Title: value,
      });
    };
    const handleadd_Section_Title = (event, value) => {
      this.setState({
        add_Section_Title: value,
      });
    };
    const addDepartment = () => {
      this.setState({
        hideDeptDialog: false,
        isDeptAdded: true,
      });
    };
    const addSection = (group) => {
      this.setState({
        hideSectionDialog: false,
        isSectionAdded: true,
        sectionDept: group.name,
      });
    };
    const handleadd_Dept_Code = (event, value) => {
      this.setState({
        add_Dept_Code: value,
      });
    };
    const handleadd_Section_Code = (event, value) => {
      this.setState({
        add_Section_Code: value,
      });
    };
    return (
      <>
        <div
          className={styles.anihover}
          onClick={addDepartment}
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
            Add Department
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
          hidden={this.state.hideDeptDialog}
          dialogContentProps={dialogContentProps}
          isBlocking={false}
          onDismiss={this.toggleDeptHideDialog}
        >
          {this.state.isDeptAdded ? (
            <div>
              <div style={{ margin: "15px" }}>
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <TextField
                    required
                    label="Department Title"
                    placeholder="Specify Department Name"
                    resizable={false}
                    onChange={handleadd_Dept_Title}
                    errorMessage={this.state.add_Dept_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Department Code"
                    placeholder="Specify Department Unique ID"
                    onChange={handleadd_Dept_Code}
                    resizable={false}
                    errorMessage={this.state.add_Dept_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleaddDept}
                  text="Submit"
                />
                <DefaultButton
                  onClick={this.toggleDeptHideDialog}
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
                Department created Successfully
              </Label>

              <DialogFooter>
                <DefaultButton
                  onClick={this.toggleDeptHideDialog}
                  text="Close"
                />
              </DialogFooter>
            </div>
          )}
        </Dialog>

        {/*Edit Depts*/}
        <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.addProjectDialog
          }
          hidden={this.state.hideDepteditDialog}
          dialogContentProps={dialogContentProps_edit}
          isBlocking={false}
          onDismiss={this.toggleDepteditHideDialog}
        >
          {this.state.isDeptEdited ? (
            <div>
              <div style={{ margin: "15px" }}>
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <TextField
                    required
                    label="Department Title"
                    placeholder="Specify Department Name"
                    resizable={false}
                    value={this.state.edit_Dept_Title}
                    onChange={handleedit_Dept_Title}
                    errorMessage={this.state.edit_Dept_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Department Code"
                    placeholder="Specify Department Unique ID"
                    onChange={handleedit_Dept_Code}
                    resizable={false}
                    value={this.state.edit_Dept_Code}
                    errorMessage={this.state.edit_Dept_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <DefaultButton onClick={this.Deleteitem} text="Delete" />
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleeditDept}
                  text="Submit"
                />
                <DefaultButton
                  onClick={this.toggleDepteditHideDialog}
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
                Department Details Altered Successfully
              </Label>

              <DialogFooter>
                <DefaultButton
                  onClick={this.toggleDepteditHideDialog}
                  text="Close"
                />
              </DialogFooter>
            </div>
          )}
        </Dialog>

        {/* Add section*/}
        <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.addSectionDialog
          }
          hidden={this.state.hideSectionDialog}
          dialogContentProps={dialogContentPropsSection}
          isBlocking={false}
          onDismiss={this.toggleSectionHideDialog}
        >
          {this.state.isSectionAdded ? (
            <div>
              <div style={{ margin: "10px" }}>
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <TextField
                    required
                    label="Department Title"
                    value={this.state.sectionDept}
                    resizable={false}
                    disabled
                  />
                </div>
                <div
                  style={{
                    width: "350px",
                    marginTop: "15px",
                  }}
                >
                  <TextField
                    required
                    label="Sub-Section Title"
                    placeholder="Specify Sub-Section Name"
                    resizable={false}
                    onChange={handleadd_Section_Title}
                    errorMessage={this.state.add_Section_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Sub-Section Code"
                    placeholder="Specify Sub-Section Unique ID"
                    onChange={handleadd_Section_Code}
                    resizable={false}
                    errorMessage={this.state.add_Section_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleaddSection}
                  text="Submit"
                />
                <DefaultButton
                  onClick={this.toggleSectionHideDialog}
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
                Sub-Section created Successfully
              </Label>

              <DialogFooter>
                <DefaultButton
                  onClick={this.toggleSectionHideDialog}
                  text="Close"
                />
              </DialogFooter>
            </div>
          )}
        </Dialog>

        {/*Edit section*/}

        <Dialog
          containerClassName={
            "ms-dialogMainOverride " + styles.addProjectDialog
          }
          hidden={this.state.hideSectioneditDialog}
          dialogContentProps={dialogContentProps_edit}
          isBlocking={false}
          onDismiss={this.toggleSectioneditHideDialog}
        >
          {this.state.isSectionEdited ? (
            <div>
              <div style={{ margin: "15px" }}>
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <TextField
                    required
                    label="Sub-Section Title"
                    placeholder="Specify Sub-Section Name"
                    resizable={false}
                    value={this.state.edit_Section_Title}
                    onChange={handleedit_Section_Title}
                    errorMessage={this.state.edit_Section_Title_err}
                  />
                </div>

                <div style={{ width: "350px", marginTop: "15px" }}>
                  <TextField
                    required
                    label="Sub-Section Code"
                    placeholder="Specify Sub-Section Unique ID"
                    onChange={handleedit_Section_Code}
                    resizable={false}
                    value={this.state.edit_Section_Code}
                    errorMessage={this.state.edit_Section_Code_err}
                  />
                </div>
              </div>
              <DialogFooter>
                <DefaultButton onClick={this.DeleteSection} text="Delete" />
                <PrimaryButton
                  style={{
                    backgroundColor: "#0078D4",
                  }}
                  onClick={handleeditSection}
                  text="Submit"
                />
                <DefaultButton
                  onClick={this.toggleSectioneditHideDialog}
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
                Sub-Section Details Altered Successfully
              </Label>

              <DialogFooter>
                <DefaultButton
                  onClick={this.toggleSectioneditHideDialog}
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
