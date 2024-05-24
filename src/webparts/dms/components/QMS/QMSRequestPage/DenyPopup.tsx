import * as React from "react";
import styles from "./QmsDashboard.module.scss";

import { escape, set } from "@microsoft/sp-lodash-subset";
import { Web, IWeb } from "@pnp/sp/presets/all";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import { ISharingResult, SharingRole } from "@pnp/sp/sharing";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import { render } from "react-dom";
import { getSitelist } from "../../Data/GetSiteList";
import type { NotificationArgsProps } from "antd";
import Cancel from "../../../../../Images/Cancel.png";
import CheckMark from "../../../../../Images/CheckMark.png";

import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  IStackTokens,
  Label,
  mergeStyles,
  // Modal,
  PrimaryButton,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";
import { Denymail } from "./MailTrigger";
import { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, message, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

const dialogContentProps = {
  type: DialogType.normal,
  title: "Deny Request",
};
import { Modal } from "antd";
type NotificationPlacement = NotificationArgsProps["placement"];

export default function DenyPopup({ props }) {
  const [form] = useForm();

  const [items, setItems] = useState([]);
  const [hideDialog, setHideDialog] = useState(true);
  const [Denystatus, setDenyStatus] = useState(true);
  const [Commentmsg, setCommentmsg] = useState("");
  const [comment, setComment] = useState("");
  const [UniqueItem, setUniqueItem] = useState<any>();
  const [opendialog, setOpendialog] = useState(false);
  const [open, setOpen] = useState(false);

  // }

  const openNotification = () => {
    notification.info({
      message: <span style={{ fontWeight: "600", color: "red" }}>Denied</span>,
      description: "You have denied the request successfully",
      placement: "top",
      icon: <img src={Cancel} alt="Cancel" style={{ width: "20%" }} />,
    });
    window.location.reload();
  };

  useEffect(() => {
    console.log("hello popup");
    console.log(props);
  }, []);

  const toggleHideDialog = () => {
    console.log(hideDialog);
    if (hideDialog) {
      setHideDialog(false);
    } else {
      setHideDialog(true);
      setDenyStatus(true);
      setComment("");
    }
    form.resetFields();
    setOpen(false);
  };

  const HandleDenystatus = async () => {
    console.log("HandleDenystatus funcion called");
    console.log(comment);

    const sp: SPFI = getSp();

    await sp.web.lists
      .getByTitle("User Files")
      .items.getById(UniqueItem.ID)
      .update({
        Status: "Rejected",
      });

    setDenyStatus(false);
    openNotification();
    setOpen(false);
    console.log(Denystatus);

    Denymail(props, await (await sp.web.currentUser()).Email, comment);

    UniqueItem.toCallBack(true);
    console.log(UniqueItem.toCallBack(true));
    form.resetFields();
  };

  const sendDeny = async () => {
    console.log(hideDialog);
    console.log("hello");

    setUniqueItem(props);
    setOpendialog(true);
    setHideDialog(false);
    setOpen(true);

    console.log(comment);
  };

  const Feedbackhandle = (e: any) => {
    console.log(e.target.value);

    setComment(e.target.value);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        style={{
          marginLeft: "10px",
          color: "rgba(203, 68, 68, 1)",
          border: "1px solid rgba(203, 68, 68, 1)",
        }}
        onClick={sendDeny}
      >
        X
      </Button>
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
              type="primary"
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
                Provide your reason for rejection in the comments.
              </p>
            </Col>
            <Form
              name="basic"
              layout="vertical"
              onFinish={() => {
                HandleDenystatus();
              }}
              autoComplete="off"
              form={form}
            >
              {Denystatus ? (
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
                          onChange={Feedbackhandle}
                          style={{
                            width: "350px",
                            height: "190px",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </Form>
          </Row>
        </div>
      </Drawer>
    </div>
  );
}
