import { SPFI } from "@pnp/sp";
import { getSp } from "../../../../helpers/PnPConfig";
import * as React from "react";
import { useState, useEffect } from "react";
import styless from "./navbar.module.scss";
import { Pivot, PivotItem, PivotLinkFormat } from "office-ui-fabric-react";
import "bootstrap/dist/css/bootstrap.min.css";

import User from "../User/User";
import Qms from "../QMS/Qms";
import Approvers from "../Approvers/Approvers";
import { getUserDetails } from "../Data/GetSiteList";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import { Routes, Route } from "react-router-dom"; // Import HashRouter, Routes, and Route
import { Link } from "react-router-dom"; // Import Link component
import { RouteProps } from "react-router";

const { Header, Sider, Content } = Layout;
import type { MenuProps } from "antd";
import QMSConfigure from "../QMS/QMSConfigure/QMSConfigure";

type MenuItem = Required<MenuProps>["items"][number];

export default function Navbar() {
  const [state, setState] = useState({
    userArray: [],
    QMS: "false",
    Approvers: "false",
    FileViewer: "false",
    Fileuploader: "false",
    showFirstItem: false,
    showApproverTab: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails();
      const qmsValue = userDetails.length > 0 && userDetails[0].QMS;

      const approverValue = userDetails.length > 0 && userDetails[0].Approver;
      const sp: SPFI = getSp();
      const currentUser = await sp.web.currentUser();
      console.log(currentUser);

      const items: any[] = await sp.web.lists.getByTitle("Userdetails").items();
      console.log(items);

      let userArray: any = items.filter(async (i) => {
        const { Username, EmailID, FileViewer, Fileuploader, QMS, Approver } =
          i;
        if (currentUser.Email === EmailID) {
          userArray.push({
            Username: Username,
            EmailID: EmailID,
            FileViewer: FileViewer,
            Fileuploader: Fileuploader,
            QMS: QMS,
            Approver: Approver,
          });
        }
      });

      setState({
        userArray: userArray,
        QMS: userArray[0].QMS,
        Approvers: userArray[0].Approver,
        FileViewer: userArray[0].FileViewer,
        Fileuploader: userArray[0].Fileuploader,
        showFirstItem: qmsValue === "true", // Convert to boolean
        showApproverTab: approverValue === "true", // Convert to boolean
      });
    };

    fetchData();
  }, []);

  const { showFirstItem } = state; // Access showFirstItem from state
  console.log(showFirstItem);

  const { showApproverTab } = state;
  console.log(showApproverTab);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const handleMenuClick = (menuItem) => {
    if (menuItem.key === "2" && !showFirstItem) return; // If QMS is not available, return early
    if (menuItem.key === "3" && !showApproverTab) return; // If Approver Dashboard is not available, return early
    setSelectedMenuItem(menuItem.key);
  };

  const handleTabClick = (menuItem) => {
    if (menuItem.icon && menuItem.label) {
      setSelectedMenuItem(menuItem.key);
    }
  };

  const styles = `
    .ant-layout .ant-layout-sider {
      position: relative;
      min-width: 0;
      background-color: white;
      transition: all 0.2s, background 0s;
      max-width: 288px !important;
      min-width: 288px !important;
      width: 288px !important;
      flex: 0 0 200px;
  }
  :where(.css-dev-only-do-not-override-usln0u).ant-layout .ant-layout-sider-children {
    height: 100%;
    margin-top: -0.1px;
    padding-top: 0.1px;
    border: 2px solid #18ab83;
    border-radius: 12px;
}
:where(.css-dev-only-do-not-override-usln0u).ant-menu-light .ant-menu-item-selected, :where(.css-dev-only-do-not-override-usln0u).ant-menu-light>.ant-menu .ant-menu-item-selected {
  color: rgba(18, 150, 114, 1);
}

:where(.css-dev-only-do-not-override-usln0u).ant-menu-light.ant-menu-inline .ant-menu-item, :where(.css-dev-only-do-not-override-usln0u).ant-menu-light>.ant-menu.ant-menu-inline .ant-menu-item {
  position: relative;
  padding-left: 10px;
}
:where(.css-dev-only-do-not-override-usln0u).ant-menu-light, :where(.css-dev-only-do-not-override-usln0u).ant-menu-light>.ant-menu {
  color: rgba(0, 0, 0, 0.88);
  background: #ffffff;
  margin-top: 80%;
}
  `;

  return (
    <div>
      <div>
        <style>{styles}</style>
        <Layout className={styless.sidenavbarheight}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              className={styless.margin}
              theme="light"
              mode="inline"
              onClick={handleMenuClick}
              selectedKeys={[selectedMenuItem]}
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: (
                    <img
                      src={require("../../../../Images/Profile.png")}
                      alt="User Dashboard logo"
                      style={{ width: "24px", height: "24px" }}
                    />
                  ),
                  label: (
                    <Link
                      to="/"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      User Dashboard
                    </Link>
                  ),
                },
                {
                  key: "2",
                  icon: showFirstItem ? (
                    <img
                      src={require("../../../../Images/InProgress.png")}
                      alt="QMS logo"
                      style={{ width: "24px", height: "24px" }}
                    />
                  ) : null,
                  label: showFirstItem ? (
                    <Link
                      to="/qms"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      QMS
                    </Link>
                  ) : (
                    ""
                  ),

                  children: showFirstItem
                    ? [
                        {
                          key: "2.1",

                          label: (
                            <Link
                              to="/qms/configure"
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              Configure
                            </Link>
                          ),
                        },
                      ]
                    : [],
                },
                {
                  key: "3",
                  icon: showApproverTab ? (
                    <img
                      src={require("../../../../Images/Verified.png")}
                      alt="Approver Dashboard logo"
                      style={{ width: "24px", height: "24px" }}
                    />
                  ) : null,
                  label: showApproverTab ? (
                    <Link
                      to="/approvers"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Approver Dashboard
                    </Link>
                  ) : (
                    ""
                  ),
                },
              ]}
            />
          </Sider>

          <div style={{ width: "86%", backgroundColor: "white" }}>
            <Routes>
              <Route path="/" element={<User />} />
              {showFirstItem && <Route path="/qms" element={<Qms />} />}
              {showFirstItem && (
                <Route path="/qms/configure" element={<QMSConfigure />} />
              )}

              {showApproverTab && (
                <Route path="/approvers" element={<Approvers />} />
              )}
            </Routes>
          </div>
        </Layout>
      </div>
    </div>
  );
}
