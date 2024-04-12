// import * as React from 'react';
// import styles from './Dms.module.scss';
// import type { IDmsProps } from './IDmsProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class Dms extends React.Component<IDmsProps, {}> {
//   public render(): React.ReactElement<IDmsProps> {
//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//       hasTeamsContext,
//       userDisplayName
//     } = this.props;

//     return (
//       <section className={`${styles.dms} ${hasTeamsContext ? styles.teams : ''}`}>
//         <div className={styles.welcome}>
//           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//           <h2>Well done, {escape(userDisplayName)}!</h2>
//           <div>{environmentMessage}</div>
//           <div>Web part property value: <strong>{escape(description)}</strong></div>
//         </div>
//         <div>
//           <h3>Welcome to SharePoint Framework!</h3>
//           <p>
//             The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
//           </p>
//           <h4>Learn more about SPFx development:</h4>
//           <ul className={styles.links}>
//             <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
//             <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
//             <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
//           </ul>
//         </div>
//       </section>
//     );
//   }
// }


import * as React from 'react';
import styles from './Dms.module.scss';
import { IDmsProps } from './IDmsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";
import { ISharingResult, SharingRole, SharingLinkKind } from "@pnp/sp/sharing";
import "@pnp/sp/webs";
import "@pnp/sp/sharing";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/web";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
// import ReactTable from "react-table"; 
import Navbar from './Navbar/Navbar';

const options: IDropdownOption[] = [
  { key: 'Objectives', text: 'Objectives' },
  { key: 'Policies', text: 'Policies' },
  { key: 'SOPs', text: 'SOPs' },
  { key: 'Plans', text: 'Plans' },
];


const optionsFiletype: IDropdownOption[] = [
  { key: 'Old', text: 'Old' },
  { key: 'New', text: 'New' },
];

const templatePopup = () => (
  <div>

  </div>
)

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Download Template',
};
const dialogContentPropsUpload = {
  type: DialogType.normal,
  title: 'Upload File',
};

export default function DmsWebPart(props){
 
    return (
      <div style={{
        width: '1400px',
      }}>
          <Navbar />
      </div>
    );
  }




