import * as React from "react";
import styles from "./QmsDashboard.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import { Web, IWeb, Items } from "@pnp/sp/presets/all";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import Logo from "../../../../../Images/Illustration.png";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import { getSitelist } from "../../Data/GetSiteList";
import {
  DetailsList,
  DetailsListLayoutMode,
  DialogType,
  IStackTokens,
  mergeStyles,
  PrimaryButton,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";
import ApprovalPopup from "./ApprovalPopup";
import DenyPopup from "./DenyPopup";
import UploadFile from "./UploadFile";
import { TablePagination } from "@material-ui/core";

const stackTokens: IStackTokens = { childrenGap: 20 };
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};
const dialogContentProps = {
  type: DialogType.normal,
  title: "Upload File",
};
let columns = [
  {
    key: "Document No",
    name: "Document No",
    isIconOnly: false,
    fieldName: "Filename",
    minWidth: 200,
    data: "string",
    maxWidth: 200,
    isResizable: false,
    isCollapsible: false,
    isPadded: true,
  },
  {
    key: "Uploadstatus",
    name: "Uploadstatus",
    fieldName: "Status",
    minWidth: 70,
    maxWidth: 70,
    data: "string",
    isPadded: true,
    isResizable: false,
    isCollapsible: false,
    isIconOnly: false,
  },
  {
    key: "File Title",
    name: "File Title",
    fieldName: "FileTitle",
    minWidth: 100,
    maxWidth: 100,
    data: "string",
    isPadded: true,
    isResizable: false,
    isCollapsible: false,
    isIconOnly: false,
  },
  {
    key: "FileUploadDate",
    name: "FileUploadDate",
    fieldName: "FileUploadDate",
    minWidth: 80,
    maxWidth: 80,
    isResizable: false,
    isCollapsible: false,
    data: "string",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Requester Name",
    name: "Requester Name",
    fieldName: "Requester",
    minWidth: 125,
    maxWidth: 125,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Approval",
    name: "Approval",
    fieldName: "Status",
    minWidth: 70,
    maxWidth: 70,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
  {
    key: "Deny",
    name: "Deny",
    fieldName: "Status",
    minWidth: 70,
    maxWidth: 70,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },

  {
    key: "Link",
    name: "Link",
    fieldName: "Fileurl",
    minWidth: 70,
    maxWidth: 70,
    isResizable: false,
    isCollapsible: false,
    data: "number",
    isIconOnly: false,
    isPadded: true,
  },
];

export default class QmsDashboard extends React.Component<{}, any> {
  //sendApproval: any;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hideDialog: true,
      opendialog: false,
      Selecteditem: "",
      uploadfile: false,
      rowsPerPage: 5,
      page: 0,
      overalllist: [],
    };
    //this.sendApproval= this.sendApproval.bind(this);
  }

  public async componentDidMount() {
    const sp:SPFI=getSp()
    console.log(await sp.web.currentUser());
    console.log(await (await sp.web.currentUser()).Email);
    this.setState(
      {
        //items:await getSitelist(),
        value: await getSitelist(),
      },
      () => {
        this.setState({
          count: this.state.value.length,
          items: this.state.value.slice(
            this.state.page * this.state.rowsPerPage,
            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
          ),
          overalllist: this.state.value,
        });
      }
    );

    console.log(this.state.items);
    console.log(this.state.value);
    console.log(this.state.overalllist);
    console.log(this.state.count);

    
  }
  private _getKey(item: any, index?: number): string {
    console.log(item.key);
    return item.key;
  }

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ): void => {
    let val = this.state.overalllist.filter(
      (i) =>
        i.FileTitle.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        i.Status.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    console.log(val);
    
    let condition = text.toLowerCase() ? val : this.state.overalllist;
    console.log(condition);
    
    this.setState(
      {
        items: text.toLowerCase()
          ? val.slice(
              this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
            )
          : this.state.overalllist.slice(
              this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
            ),
      },
      () => {
        this.setState({
          count: condition.length,
          value: condition,
        });
      }
    );
    console.log(val);
  };

  public UploadFile = () => {
    this.setState({
      uploadfile: true,
    });
  };

  public updated = async (isupdated) => {
    if (isupdated) {
      this.setState(
        {
          value: await getSitelist(),
        },
        () => {
          this.setState({
            count: this.state.value.length,
            items: this.state.value.slice(
              this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
            ),
            overalllist: this.state.value,
          });
        }
      );
    }
  };

  public sendApproval() {
    console.log(this.state);
    console.log("hello");
    this.setState({
      opendialog: true,
      hideDialog: false,
    });
  }

  public toggleHideDialog = () => {
    this.setState((prevstate) => {
      hideDialog: prevstate.hideDialog ? false : true;
    });
    console.log(this.state.hideDialog);
  };

  public setRowsPerPage = (value) => {
    this.setState({
      rowsPerPage: value,
    });
  };

  public setPage = (value) => {
    this.setState(
      {
        page: value,
      },
      () => {
        this.setState({
          items: this.state.value.slice(
            this.state.page * this.state.rowsPerPage,
            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
          ),
        });
      }
    );
  };

  render() {
    const handleChangePage = (event, newPage) => {
      this.setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      console.log(event.target.value);
      this.setRowsPerPage(parseInt(event.target.value, 10));
      this.setPage(0);
    };

    const _renderItemColumn = (item, index: number, column) => {
      const fieldContent = item[column.fieldName] as string;

      switch (column.key) {
        case "Uploadstatus":
          switch (fieldContent) {
            case "Pending":
              return (
                <span
                  data-selection-disabled={true}
                  className={mergeStyles({
                    color: "#4f6bed",
                    height: "100%",
                    display: "block",
                    fontWeight: "bold",
                  })}
                >
                  {fieldContent}
                </span>
              );
            case "Processing":
              return (
                <span
                  data-selection-disabled={true}
                  className={mergeStyles({
                    color: "#ef6950",
                    height: "100%",
                    display: "block",
                    fontWeight: "bold",
                  })}
                >
                  {fieldContent}
                </span>
              );

            case "Completed":
              return (
                <span
                  data-selection-disabled={true}
                  className={mergeStyles({
                    color: "#498205",
                    height: "100%",
                    display: "block",
                    fontWeight: "bold",
                  })}
                >
                  {fieldContent}
                </span>
              );
            case "Rejected":
              return (
                <span
                  data-selection-disabled={true}
                  className={mergeStyles({
                    color: "#a4262c",
                    height: "100%",
                    display: "block",
                    fontWeight: "bold",
                  })}
                >
                  {fieldContent}
                </span>
              );

            default:
              return <span>{fieldContent}</span>;
          }

        case "Link":
          return (
            <PrimaryButton
              style={{
                backgroundColor: "#0078D4",
              }}
              text="View"
              target="_blank"
              href={fieldContent}
            />
          );

        case "Approval":
          switch (fieldContent) {
            case "Pending":
              return (
                <ApprovalPopup
                props={item}
                  // {...item}
                  // toCallBack={async (isupdated) => {
                  //   console.log(this.state);
                  //   await this.updated(isupdated);
                  // }}
                ></ApprovalPopup>
              );

            default:
              return;
          }

        case "Deny":
          switch (fieldContent) {
            case "Pending":
              return (
                <DenyPopup
                  {...item}
                  toCallBack={async (isupdated) => {
                    console.log(this.state);
                    await this.updated(isupdated);
                  }}
                ></DenyPopup>
              );

            default:
              return;
          }

        default:
          return fieldContent.length <= 150 ? (
            <span>{fieldContent}</span>
          ) : (
            <span>{fieldContent.slice(0, 150)}...</span>
          );
      }
    };
    return (
      <div className={styles.QmsDashboard}>
        <Stack horizontal className={styles.filter} tokens={stackTokens}>
          <TextField
            underlined
            placeholder="Search"
            onChange={this._onFilter}
            styles={textFieldStyles}
          />

          {/*<UploadFile></UploadFile>*/}
        </Stack>
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
        {this.state.overalllist.length == 0 ? (
          <div
            style={{
              // borderStyle:'dashed',
              padding: "70px 0",
              // height: "200px",
              margin: "auto",
              // width: "300px",
              textAlign: "center",
            }}
          >
            <img
              style={{
                // borderStyle:'dashed',
                display: "block",
                margin: "auto",
                padding: "40px",
                width: "40%",
                // height: ""
              }}
              src={Logo}
            />
            <b style={{ fontWeight: "bold" }}>No Pending Request Available</b>
          </div>
        ) : (
          <div></div>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.count}
          page={this.state.page}
          onPageChange={handleChangePage}
          rowsPerPage={this.state.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  }
}
