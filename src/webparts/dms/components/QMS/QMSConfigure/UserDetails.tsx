// import { Web } from "@pnp/sp/presets/all";
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
  Checkbox,
} from "office-ui-fabric-react";
import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";

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
let columns = [
  {
    key: "User Name",
    name: "User Name",
    isIconOnly: false,
    fieldName: "Username",
    minWidth: 180,
    data: "string",
    maxWidth: 180,
    isResizable: false,
    isCollapsible: false,
    isPadded: true,
  },
  {
    key: "User MailID",
    name: "User MailID",
    fieldName: "EmailID",
    minWidth: 250,
    maxWidth: 250,
    data: "string",
    isPadded: true,
    isResizable: false,
    isCollapsible: false,
    isIconOnly: false,
  },

  {
    key: "File Uploader",
    name: "File Uploader",
    fieldName: "Fileuploader",
    minWidth: 100,
    maxWidth: 100,
    isResizable: false,
    isCollapsible: false,
    data: "string",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "QMS",
    name: "QMS",
    fieldName: "QMS",
    minWidth: 50,
    maxWidth: 50,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Approver",
    name: "Approver",
    fieldName: "Approver",
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Manage",
    name: "Manage",
    fieldName: "EmailID",
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
];
const dialogContentProps = {
  type: DialogType.normal,
  title: "Manage User",
};
const dialogContentProps_edit = {
  type: DialogType.normal,
  title: "Manage User",
};
export default class UserDetails extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      users: [],
      hideDialog: true,
      isAdded: true,
      add_UserName: "",
      add_UserName_err: "",
      add_EmailID: "",
      add_EmailID_err: "",

      add_Uploader: "false",
      add_QMS: "false",
      add_Approver: "false",

      hideeditDialog: true,
      isEdited: true,
      edit_UserName: "",
      edit_UserName_err: "",
      edit_EmailID: "",
      edit_EmailID_err: "",
      edit_Uploader: "",
      edit_QMS: "",
      edit_Approver: "",
      selectedval: {},
      selecteditem: "",
      overalllist: [],
    };
  }
  private _getKey(item: any, index?: number): string {
    return item.key;
  }
  public async componentDidMount() {
const sp:SPFI=getSp();

    this.setState(
      {
        items: await sp.web.lists.getByTitle("Userdetails").items(),
        overalllist: await sp.web.lists.getByTitle("Userdetails").items(),
      },
      // () => {
      //   console.log(this.state.users);
      // }

    );
            console.log(this.state.users);

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
        add_UserName: "",
        add_EmailID: "",
        add_Viewer: "",
        add_Uploader: "",
        add_QMS: "",
        add_Approver: "",
        add_UserName_err: "",
        add_EmailID_err: "",
        selecteditem: "",
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
        edit_UserName: "",
        edit_EmailID: "",
        selecteditem: "",
        edit_Uploader: "",
        edit_QMS: "",
        selectedval: {},
        edit_UserName_err: "",
        edit_EmailID_err: "",
        edit_Approver: "",
      });
  };
  render() {
    const editUser = (value) => {
      this.setState({
        edit_UserName: value.Username,
        edit_EmailID: value.EmailID,
        hideeditDialog: false,
        edit_Uploader: value.Fileuploader,
        edit_QMS: value.QMS,
        edit_Approver: value.Approver,
        isEdited: "false",
        selecteditem: value.ID,
        selectedval: value,
      });
    };
    const _renderItemColumn = (item, index: number, column) => {
      const fieldContent = item[column.fieldName] as string;

      switch (column.key) {
        case "File Uploader":
          switch (fieldContent) {
            case "true":
              return (
                <FontIcon
                  aria-label="Completed"
                  iconName="Completed"
                  className={iconClass}
                  style={{ color: "green" }}
                />
              );

            default:
              return (
                <span>
                  <FontIcon
                    aria-label="ErrorBadge"
                    iconName="ErrorBadge"
                    className={iconClass}
                    style={{ color: "red" }}
                  />
                </span>
              );
          }

        case "QMS":
          switch (fieldContent) {
            case "true":
              return (
                <FontIcon
                  aria-label="Completed"
                  iconName="Completed"
                  className={iconClass}
                  style={{ color: "green" }}
                />
              );

            default:
              return (
                <span>
                  <FontIcon
                    aria-label="ErrorBadge"
                    iconName="ErrorBadge"
                    className={iconClass}
                    style={{ color: "red" }}
                  />
                </span>
              );
          }

        case "Approver":
          switch (fieldContent) {
            case "true":
              return (
                <FontIcon
                  aria-label="Completed"
                  iconName="Completed"
                  className={iconClass}
                  style={{ color: "green" }}
                />
              );

            default:
              return (
                <span>
                  <FontIcon
                    aria-label="ErrorBadge"
                    iconName="ErrorBadge"
                    className={iconClass}
                    style={{ color: "red" }}
                  />
                </span>
              );
          }
        case "Manage":
          return (
            <span>
              <FontIcon
                aria-label="AccountManagement"
                iconName="AccountManagement"
                className={styles.manage}
                style={{ color: "#0078d4" }}
                onClick={() => editUser(item)}
              />
            </span>
          );
        default:
          return <span>{fieldContent}</span>;
      }
    };
    const AddUser = () => {
      this.setState({
        hideDialog: false,
        isAdded: true,
      });
    };
    const handledit_Username = (event, value) => {
      this.setState({
        edit_UserName: value,
      });
      console.log(value);

    };
    const handleedit_UserMailID = (event, value) => {
      this.setState({
        edit_EmailID: value,
      });
    };
    //original code
    const edit_uploader = (event, isChecked) => {
      isChecked == true
        ? this.setState({
            edit_Uploader: "true",
          })
        : this.setState({
            edit_Uploader: "false",
          });
    };

    const edit_QMS = (event, isChecked) => {
      isChecked == true
        ? this.setState({
            edit_QMS: "true",
          })
        : this.setState({
            edit_QMS: "false",
          });
    };

    const edit_Approver = (event, isChecked) => {
      isChecked == true
        ? this.setState({
            edit_Approver: "true",
          })
        : this.setState({
            edit_Approver: "false",
          });
    };


    // const toggleCheckbox = (key) => {
    //   this.setState((prevState) => ({
    //     [key]: prevState[key] === "true" ? "false" : "true",
    //   }));
    // };
    
    // const edit_uploader = (event, isChecked) => {
    //   toggleCheckbox("edit_Uploader");
    // };
    
    // const edit_QMS = (event, isChecked) => {
    //   toggleCheckbox("edit_QMS");
    // };
    
    // const edit_Approver = (event, isChecked) => {
    //   toggleCheckbox("edit_Approver");
    // };
    
    
    

    const handleadd_Username = (event, value) => {
      this.setState({
        add_UserName: value,
      });
    };
    const handleadd_UserMailID = (event, value) => {
      this.setState({
        add_EmailID: value,
      });
    };

    const add_uploader = (event, isChecked) => {
      isChecked == true
        ? this.setState({
            add_Uploader: "true",
          })
        : this.setState({
            add_Uploader: "false",
          });
    };

    const add_QMS = (event, isChecked) => {
      isChecked == true
        ? this.setState({
            add_QMS: "true",
          })
        : this.setState({
            add_QMS: "false",
          });
    };

    const add_Approver = (event, isChecked) => {
      isChecked == true
        ? this.setState({
            add_Approver: "true",
          })
        : this.setState({
            add_Approver: "false",
          });
    };

    const handleAddUser = async () => {
        const sp:SPFI=getSp();


      let status = this.state.overalllist.filter(
        (res) =>
          res.EmailID.toLowerCase() == this.state.add_EmailID.toLowerCase()
      );

      console.log(status);
      if (status.length == 0) {
        if (this.state.add_UserName != "") {
          if (this.state.add_EmailID != "") {
            await sp.web.lists
              .getByTitle("Userdetails")
              .items.add({
                Username: this.state.add_UserName,
                EmailID: this.state.add_EmailID,
                Fileuploader: this.state.add_Uploader,
                Approver: this.state.add_QMS,
                QMS: this.state.add_Approver,
              })
              .then(async (res) =>
                this.setState({
                  isAdded: false,
                  items: await sp.web.lists.getByTitle("Userdetails").items(),
                  overalllist: await sp.web.lists
                    .getByTitle("Userdetails")
                    .items(),
                })
              );
          } else {
            this.setState({
              add_EmailID_err: "Please specify User MailID",
            });
          }
        } else {
          this.setState({
            add_UserName_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          add_EmailID_err: "EmailID already Exists",
        });
      }
    };
    const _filter = (event, text) => {
      console.log(text);
      if (text != "") {
        let val = this.state.overalllist.filter(
          (i) =>
            i.Username.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            i.EmailID.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
        let condition = text.toLowerCase() ? val : this.state.overalllist;
        console.log(val);
        this.setState({
          items: val,
        });
      } else {
        this.setState({
          items: this.state.overalllist,
        });
      }
    };
    const handleeditUser = async () => {
    const sp:SPFI=getSp();

      let status = this.state.overalllist.filter(
        (res) =>
          res.EmailID.toLowerCase() == this.state.add_EmailID.toLowerCase()
      );
      if (
        status.length == 0 &&
        this.state.edit_EmailID.toLowerCase() ==
          this.state.selectedval.EmailID.toLowerCase()
      ) {
        if (this.state.edit_UserName != "") {
          if (this.state.edit_EmailID != "") {
            const list = sp.web.lists.getByTitle("Userdetails");

            await list.items
              .getById(this.state.selecteditem)
              .update({
                Username: this.state.edit_UserName,
                EmailID: this.state.edit_EmailID,
                Fileuploader: this.state.edit_Uploader,
                // Approver: this.state.edit_QMS,
                // QMS: this.state.edit_Approver,
                Approver: this.state.edit_Approver,
                QMS: this.state.edit_QMS,
              })
              .then(async (res) =>
                this.setState({
                  isEdited: false,
                  items: await sp.web.lists.getByTitle("Userdetails").items(),
                  overalllist: await sp.web.lists
                    .getByTitle("Userdetails")
                    .items(),
                })
              );
          } else {
            this.setState({
              edit_EmailID_err: "Please specify User MailID",
            });
          }
        } else {
          this.setState({
            edit_UserName_err: "Please specify Code",
          });
        }
      } else {
        this.setState({
          edit_EmailID_err: "EmailID already Exists",
        });
      }
      window.location.reload()
    };

    const DeleteUser = async () => {
      const sp:SPFI=getSp();

      const list:any = await sp.web.lists.getByTitle("Userdetails");
      await list.items
        .getById(this.state.selecteditem)
        .delete()
        .then(async (res) =>
          this.setState({
            isEdited: false,
            items: await sp.web.lists.getByTitle("Userdetails").items(),
            overalllist: await sp.web.lists.getByTitle("Userdetails").items(),
          })
        );
    };


    // const DeleteUser = async () => {
    //   try {
    //     const sp: SPFI = getSp();
    
    //     if (!sp) {
    //       console.error("SharePoint context object is not available.");
    //       return;
    //     }
    
    //     const list = sp.web.lists.getByTitle("Userdetails");
    
    //     if (!list || !list.items || !list.items.getById) {
    //       console.error("List or list items are not properly initialized.");
    //       return;
    //     }
    
    //     const itemId = this.state.selecteditem;
    
    //     if (!itemId) {
    //       console.error("Selected item ID is not available.");
    //       return;
    //     }
    
    //     await list.items.getById(itemId).delete();
    
    //     // Refresh the user list after deletion
    //     this.setState({
    //       isEdited: false,
    //       items: await sp.web.lists.getByTitle("Userdetails").items(),
    //       overalllist: await sp.web.lists.getByTitle("Userdetails").items(),
    //     });
    
    //     console.log("User deleted successfully.");
    //   } catch (error) {
    //     console.error("Error deleting user:", error);
    //   }
    // };
    
  
    return (
      <div>
        <div>
          <PrimaryButton onClick={AddUser}>
            <FontIcon
              aria-label="AddFriend"
              iconName="AddFriend"
              style={{ fontSize: "18px" }}
            />
            &nbsp; Add User
          </PrimaryButton>
          <TextField
            underlined
            placeholder="Search"
            onChange={_filter}
            styles={textFieldStyles}
          />
        </div>
        <div style={{ width: "100%", height: "450px", overflowY: "auto" }}>
          <DetailsList
            className={styles.list}
            items={this.state.items}
            compact={false}
            columns={columns}
            onRenderItemColumn={_renderItemColumn}
            selectionMode={SelectionMode.none}
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
          />
        </div>

        <div>
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
                      label="User Name"
                      placeholder="Specify User Name"
                      resizable={false}
                      onChange={handleadd_Username}
                      errorMessage={this.state.add_UserName_err}
                    />
                  </div>

                  <div style={{ width: "350px", marginTop: "15px" }}>
                    <TextField
                      suffix="@quadrasystems.net"
                      required
                      label="User MailID"
                      placeholder="Specify User MailID"
                      onChange={handleadd_UserMailID}
                      resizable={false}
                      errorMessage={this.state.add_EmailID_err}
                    />
                  </div>
                  <table style={{ marginTop: "25px" }}>
                    <tr>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="File Upload Access"
                          onChange={add_uploader}
                        />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox label="QMS User" onChange={add_QMS} />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="Approval Access"
                          style={{ margin: "15px" }}
                          onChange={add_Approver}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <DialogFooter>
                  <PrimaryButton
                    style={{
                      backgroundColor: "#0078D4",
                    }}
                    text="Submit"
                    onClick={handleAddUser}
                  />
                  <DefaultButton
                    onClick={this.toggleHideDialog}
                    text="Cancel"
                  />
                </DialogFooter>
              </div>
            ) : (
              <div>
                <FontIcon
                  aria-label="SkypeCircleCheck"
                  iconName="SkypeCircleCheck"
                  className={markiconClass}
                />
                <Label
                  style={{
                    margin: "0 auto",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  User Added Successfully
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
                      label="User Name"
                      placeholder="Specify User Name"
                      resizable={false}
                      value={this.state.edit_UserName}
                      onChange={handledit_Username}
                      errorMessage={this.state.edit_UserName_err}
                    />
                  </div>

                  <div style={{ width: "350px", marginTop: "15px" }}>
                    <TextField
                      required
                      label="User MailID"
                      value={this.state.edit_EmailID}
                      placeholder="Specify User MailID"
                      onChange={handleedit_UserMailID}
                      resizable={false}
                      errorMessage={this.state.edit_EmailID_err}
                    />
                  </div>
                  <table style={{ marginTop: "25px" }}>
                    <tr>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="File Upload Access"
                          onChange={edit_uploader}
                          checked={
                            this.state.edit_Uploader == "true" ? true : false
                          }
                        />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="QMS User"
                          onChange={edit_QMS}
                          checked={this.state.edit_QMS == "true" ? true : false}
                        />
                      </td>
                      <td style={{ paddingRight: "15px" }}>
                        <Checkbox
                          label="Approval Access"
                          checked={
                            this.state.edit_Approver == "true" ? true : false
                          }
                          onChange={edit_Approver}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <DialogFooter>
                  <DefaultButton onClick={DeleteUser} text="Delete" />
                  <PrimaryButton
                    style={{
                      backgroundColor: "#0078D4",
                    }}
                    onClick={handleeditUser}
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
                  className={markiconClass}
                />
                <Label
                  style={{
                    margin: "0 auto",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  User Details Altered Successfully
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
        </div>
      </div>
    );
  }
}
