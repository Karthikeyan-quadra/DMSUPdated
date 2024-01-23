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
  let columns = [
    {
      key: "User Name",
      name: "User Name",
      isIconOnly: false,
      fieldName: "Name",
      minWidth: 200,
      data: "string",
      maxWidth: 200,
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
      key: "Department",
      name: "Department",
      fieldName: "Department",
      minWidth: 180,
      maxWidth: 180,
      isResizable: false,
      isCollapsible: false,
      data: "string",
      isIconOnly: false,
      isPadded: true,
    },
    {
      key: "Manage",
      name: "Manage",
      fieldName: "Department",
      minWidth: 100,
      maxWidth: 100,
      isResizable: false,
      isCollapsible: false,
      data: "number",
      isIconOnly: false,
      isPadded: true,
    },
    {
      key: "Delete",
      name: "Delete",
      fieldName: "Department",
      minWidth: 100,
      maxWidth: 100,
      isResizable: false,
      isCollapsible: false,
      data: "number",
      isIconOnly: false,
      isPadded: true,
    },
  ];
  const sp:SPFI=getSp()

  const textFieldStyles: Partial<ITextFieldStyles> = {
    root: { maxWidth: "250px", float: "right" },
  };
  
  const markiconClass = mergeStyles({
    fontSize: 100,
    width: "500px",
    color: "green",
    textAlign: "center",
  });
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Add User",
  };
  const dialogContentProps_edit = {
    type: DialogType.normal,
    title: "Manage User",
  };
  export class UserDepartment extends React.Component<{}, any> {
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
        Departments: [],
        add_Department: "",
        add_Department_err: "",
        hideeditDialog: true,
        isEdited: true,
        edit_UserName: "",
        edit_UserName_err: "",
        edit_EmailID: "",
        edit_EmailID_err: "",
        edit_Department: "",
        edit_Department_err: "",
        selectedval: {},
        selecteditem: "",
        overalllist: [],
      };
    }
    private _getKey(item: any, index?: number): string {
      return item.key;
    }
    // public async componentDidMount() {
      // this.setState(

      //   {
      //     items: await sp.web.lists.getByTitle("Approverlist").items(),
      //     overalllist: await sp.web.lists.getByTitle("Approverlist").items(),
      //     Departments: await sp.web.lists
      //       .getByTitle("Department Names")
      //       .items()
      //       .then((res) =>
      //         res.map((val) => ({
      //           text: val.Departments,
      //           key: val.code,
                
      //         }))
              
      //       ),
      //   },
      //   () => {
      //     console.log(this.state.Departments);
      //   }
      // );


      public async componentDidMount() {
        const sp: SPFI = getSp();
      
        try {
          const [items, overalllist, departmentItems] = await Promise.all([
            sp.web.lists.getByTitle("Approverlist").items.getAll(),
            sp.web.lists.getByTitle("Approverlist").items.getAll(),
            sp.web.lists.getByTitle("Department Names").items.getAll(),
          ]);
      
          const Departments = departmentItems.map((val) => ({
            text: val.Departments,
            key: val.code,
          }));
      
          this.setState(
            {
              items,
              overalllist,
              Departments,
            },
            () => {
              console.log(this.state.Departments);
            }
          );
        } catch (error) {
          console.error('Error in componentDidMount:', error);
        }
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
          add_Department: "",
          add_Department_err: "",
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
          edit_Department: "",
          selectedval: {},
          edit_Department_err: "",
          edit_UserName_err: "",
          edit_EmailID_err: "",
        });
    };
    render() {
      const _renderItemColumn = (item, index: number, column) => {
        const fieldContent = item[column.fieldName] as string;
  
        switch (column.key) {
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
          case "Delete":
            return (
              <span>
                <FontIcon
                  aria-label="Delete"
                  iconName="Delete"
                  className={styles.manage}
                  style={{ color: "#0078d4" }}
                  onClick={() => DeleteUser(item)}
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
      };
      const handleedit_UserMailID = (event, value) => {
        this.setState({
          edit_EmailID: value,
        });
      };
  
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

//       const handleadd_UserMailID = (event, value) => {
//   const suffix = "@quadrasystems.net"; // Specify your desired email suffix
//   const fullEmailID = value + suffix;

//   this.setState({
//     add_EmailID: fullEmailID,
//   });
// };
      const handleeditUser = async () => {
        if (this.state.edit_Department != "") {
          if (this.state.edit_UserName != "") {
            if (this.state.edit_EmailID != "") {
              const sp:SPFI=getSp()
              const list = sp.web.lists.getByTitle("Approverlist");
  
              await list.items
                .getById(this.state.selecteditem)
                .update({
                  Name: this.state.edit_UserName,
                  EmailID: this.state.edit_EmailID,
                  Department: this.state.edit_Department,
                })
                .then(async (res) =>
                  this.setState({
                    isEdited: false,
                    items: await sp.web.lists.getByTitle("Approverlist").items(),
                    overalllist: await sp.web.lists
                      .getByTitle("Approverlist")
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
              edit_UserName_err: "Please specify UserName",
            });
          }
        } else {
          this.setState({
            edit_Department_err: "Please specify Department",
          });
        }
      };
      const editUser = (value) => {
        this.setState({
          edit_UserName: value.Name,
          edit_EmailID: value.EmailID,
          hideeditDialog: false,
          edit_Department: value.Department,
  
          isEdited: "false",
          selecteditem: value.ID,
          selectedval: value,
        });
      };
      const DeleteUser = async (value) => {
        this.setState(
          {
            selecteditem: value.ID,
            selectedval: value,
          },
          async () => {
            const sp:SPFI=getSp()
            const list = await sp.web.lists.getByTitle("Approverlist");
            console.log(this.state.selecteditem);
            await list.items
              .getById(this.state.selecteditem)
              .delete()
              .then(async (res) =>
                this.setState({
                  hideeditDialog: false,
                  isEdited: false,
                  items: await sp.web.lists.getByTitle("Approverlist").items(),
                  overalllist: await sp.web.lists
                    .getByTitle("Approverlist")
                    .items(),
                })
              );
          }
        );
      };
      const _filter = (event, text) => {
        console.log(text);
        if (text != "") {
          let val = this.state.overalllist.filter(
            (i) =>
              i.Name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
              i.Department.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
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
      const addDepartmentChange = (event, value) => {
        console.log(value);
        this.setState({
          add_Department: value.text,
        });
      };
      const editDepartmentChange = (event, value) => {
        this.setState({
          edit_Department: value.text,
        });
      };
      const handleAddUser = async () => {
        const sp:SPFI=getSp()
        if (this.state.add_Department != "") {
          if (this.state.add_UserName != "") {
            if (this.state.add_EmailID != "") {
              await sp.web.lists
                .getByTitle("Approverlist")
                .items.add({
                  Name: this.state.add_UserName,
                  EmailID: this.state.add_EmailID,
                  Department: this.state.add_Department,
                })
                .then(async (res) =>
                  this.setState({
                    isAdded: false,
                    items: await sp.web.lists.getByTitle("Approverlist").items(),
                    overalllist: await sp.web.lists
                      .getByTitle("Approverlist")
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
              add_UserName_err: "Please specify UserName",
            });
          }
        } else {
          this.setState({
            add_Department_err: "Please specify Department",
          });
        }
      };
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
                  <div style={{ margin: "5px" }}>
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
                    <div style={{ width: "350px", marginTop: "15px" }}>
                      <Dropdown
                        placeholder={this.state.Reviewer_name}
                        label="Department"
                        required
                        onChange={addDepartmentChange}
                        errorMessage={this.state.add_Department_err}
                        options={this.state.Departments}
                      />
                    </div>
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
                    <div style={{ width: "350px", marginTop: "15px" }}>
                      <Dropdown
                        placeholder={this.state.edit_Department}
                        label="Department"
                        required
                        onChange={editDepartmentChange}
                        errorMessage={this.state.edit_Department_err}
                        options={this.state.Departments}
                      />
                    </div>
                  </div>
                  <DialogFooter>
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
  
  export default UserDepartment;
  