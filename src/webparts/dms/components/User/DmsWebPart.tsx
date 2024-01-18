import * as React from 'react';
import styles from './DmsWebPart.module.scss';
import { IDmsWebPartProps } from './IDmsWebPartProps';
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
import Navbar from '../Navbar/Navbar';

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

export default class DmsWebPart extends React.Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  public async componentDidMount() {

  }
  // approverslist
  public render(): React.ReactElement<IDmsWebPartProps> {


 
    return (
      <div style={{
        // borderStyle: 'dashed',
        width: '1400px',
        // height: '1000px',
      }}>
          <Navbar />
      </div>
    );
  }


  }

