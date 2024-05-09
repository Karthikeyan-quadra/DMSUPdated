// import * as React from "react";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
// import "@pnp/polyfill-ie11";
// import "@pnp/sp/webs";
// import "@pnp/sp/files";
// import QmsDashboard from "./QMSRequestPage/QmsDashboard";
// import QMSConfigure from "./QMSConfigure/QMSConfigure";
// import { IStackTokens, Pivot, PivotItem, Stack } from "office-ui-fabric-react";
// const stackTokens: IStackTokens = { childrenGap: 50 };

// export default class header extends React.Component<{}, any> {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   public async componentDidMount() {}

//   public render() {
//     return (
//       <Stack>
//         <Pivot style={{ marginTop: "10px" }}>
//           <PivotItem headerText="Dashboard">
//             <QmsDashboard />
//           </PivotItem>

//           <PivotItem headerText="Configure" itemIcon="Settings">
//             <QMSConfigure />
//           </PivotItem>
//         </Pivot>
//       </Stack>
//     );
//   }
// }

import * as React from "react";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import QmsDashboard from "./QMSRequestPage/QmsDashboard";
import QMSConfigure from "./QMSConfigure/QMSConfigure";
import { IStackTokens, Pivot, PivotItem, Stack } from "office-ui-fabric-react";
import { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const stackTokens: IStackTokens = { childrenGap: 50 };

export default function header() {
  return (
    <div>
      <div>
        <QmsDashboard />
      </div>

      {/* <div style={{ marginTop: "10px" }}>
        <QMSConfigure />
      </div> */}
    </div>
  );
}
