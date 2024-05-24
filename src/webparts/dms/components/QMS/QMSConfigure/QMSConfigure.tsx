import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";

import { Web, IWeb } from "@pnp/sp/presets/all";
import "@pnp/sp/sputilities";

import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import Approvers from "./Approvers";
import {
  INavLinkGroup,
  INavStyles,
  Nav,
  Separator,
} from "office-ui-fabric-react";
import Department from "./Department";
import Project from "./Project";
import UserDetails from "./UserDetails";
import ExistingFlow from "./ExistingFlow";
import UserDepartment from "./UserDepartment";
import { useState } from "react";
import { Menu } from "antd";

export default function QMSConfigure(props) {
  const [nav, setNav] = useState(true);
  const [SelectedKey, setSelectedKey] = useState("1");
  const [Approversconfig, setApproversConfig] = useState(false);
  const [Flowconfig, setFlowConfig] = useState<any>();
  const [Deptconfig, setDeptConfig] = useState<any>();
  const [Userconfig, setUserConfig] = useState<any>();
  const [DMconfig, setDMConfig] = useState<any>();
  const [current, setCurrent] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Update the selected key state based on the clicked menu item
  };

  const styl = `:where(.css-dev-only-do-not-override-usln0u).ant-menu-light.ant-menu-horizontal >.ant-menu-item-selected::after, :where(.css-dev-only-do-not-override-usln0u).ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item-selected::after, :where(.css-dev-only-do-not-override-usln0u).ant-menu-light.ant-menu-horizontal >.ant-menu-submenu-selected::after, :where(.css-dev-only-do-not-override-usln0u).ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu-selected::after {
      border-bottom-width: 2px;
      border-bottom-color: rgba(41, 161, 128, 1);
  }`;
  return (
    <div>
      <style>{styl}</style>
      <div className={styles.configureStyle}>Configure</div>

      <div>
        <Menu
          onClick={handleMenuClick}
          selectedKeys={[SelectedKey]}
          mode="horizontal"
          className={styles.menuStyle}
        >
          <Menu.Item key="1" className={styles.menuItemStyle}>
            Manage Approvers
          </Menu.Item>
          <Menu.Item key="2" className={styles.menuItemStyle}>
            Manage Flow
          </Menu.Item>
          <Menu.Item key="3" className={styles.menuItemStyle}>
            Departments
          </Menu.Item>
          <Menu.Item key="4" className={styles.menuItemStyle}>
            User Properties
          </Menu.Item>
          <Menu.Item key="5" className={styles.menuItemStyle}>
            Department Users
          </Menu.Item>
        </Menu>

        {/* Render component based on the selected menu item */}
        {SelectedKey === "1" && <Approvers />}
        {SelectedKey === "2" && <ExistingFlow />}
        {SelectedKey === "3" && <Department />}
        {SelectedKey === "4" && <UserDetails />}
        {SelectedKey === "5" && <UserDepartment />}
        {/* Add Project component here if needed */}
      </div>
    </div>
  );
}
