import * as React from "react";
import styles from "../QMSRequestPage/QmsDashboard.module.scss";

// import { Web, IWeb } from "@pnp/sp/presets/all";
import { getSp } from "../../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";

import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/polyfill-ie11";

import "@pnp/sp/webs";
import "@pnp/sp/files";
import { render } from "react-dom";
import {
  getInitialApprovers,
  getDepartmentlist,
  getRequestlevellist,
  getSitelist,
  getApprover1,
  getApprover2,
  getSubDepartmentlist,
} from "../../Data/GetSiteList";
import {
  ComboBox,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  FontIcon,
  IDropdownStyles,
  IStackTokens,
  Label,
  mergeStyles,
  Modal,
  Persona,
  PersonaSize,
  PrimaryButton,
  SelectionMode,
  Stack,
} from "office-ui-fabric-react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Form, Row, Select } from "antd";
import { Divider } from "@fluentui/web-components";
import { useForm } from "antd/es/form/Form";

// import { sp } from "@pnp/sp";

// const sp:SPFI=getSp()
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200 },
};

const stackTokens: IStackTokens = { childrenGap: 50 };

// export default class QMSConfigure extends React.Component<{}, any> {
export default function Approvers(props) {
  const [form] = useForm();
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(true);
  const [Level, setLevel] = useState("");
  const [sub_Status, setSub_Status] = useState(true);
  const [hideDialog, setHideDialog] = useState(true);
  const [ischanged, setIsChanged] = useState(true);
  const [Department, setDepartment] = useState("");
  const [errlevelmsg, setErrLevelMsg] = useState("");
  const [SubDepartment, setSubDepartment] = useState("");
  const [approveshow, setApproveShow] = useState(false);
  const [errmsgApproverA, setErrmsgApproverA] = useState("");
  const [errmsgApproverB, setErrmsgApproverB] = useState("");
  const [errmsgApprover, setErrmsgApprover] = useState("");
  const [Approversconfig, setApproversConfig] = useState(false);
  const [ApproverA, setApproverA] = useState<any>();
  const [ApproverB, setApproverB] = useState<any>();
  const [SubDepartmentlist, setSubDepartmentlist] = useState<any>();
  const [errmsg, setErrmsg] = useState<any>();
  const [Approver_A, setApprover_A] = useState({
    Name: "Not Assigned",
    EmailID: "Not Assigned",
    Level: "",
    SubDepartment: "",
    Department: "",
    ApproverLevel: "",
  });
  const [Approver_B, setApprover_B] = useState({
    Name: "Not Assigned",
    EmailID: "Not Assigned",
    Level: "",
    SubDepartment: "",
    Department: "",
    ApproverLevel: "",
  });
  const [levelitems, setLevelItems] = useState<any>();
  const [Departmentitems, setDepartmentitems] = useState<any>();

  // public async componentDidMount() {
  //   this.setState({
  //     levelitems: await getRequestlevellist().then(async (item) => {
  //       let list: { Key: any; text: any }[] = [];
  //       await item.map(async (val) => {
  //          list.push({
  //           Key: val.Key,
  //           text: val.Text,
  //         });
  //       });
  //       console.log(list);
  //       return list;
  //     }),
  //     Departmentitems: await getDepartmentlist().then(async (item) => {
  //       let list: { Key: any; text: any }[] = [];
  //       await item.map(async (val) => {
  //         await list.push({
  //           Key: val.Title,
  //           text: val.Departments,
  //         });
  //       });
  //       return list;
  //     }),
  //   });
  // }

  // public async componentDidMount() {
  //   try {
  //     const levelItems = await getRequestlevellist();
  //     const departmentItems = await getDepartmentlist();

  //     const processedLevelItems = levelItems.map((val) => ({
  //       Key: val.Key,
  //       text: val.Text,
  //     }));

  //     const processedDepartmentItems = departmentItems.map((val) => ({
  //       Key: val.Title,
  //       text: val.Departments,
  //     }));

  //     this.setState({
  //       levelitems: processedLevelItems,
  //       Departmentitems: processedDepartmentItems,
  //     });

  //     console.log("Intermediate State:", this.state);
  //   } catch (error) {
  //     console.error("Error fetching levels and departments:", error);
  //   }
  // }

  const fetchData = async () => {
    try {
      const levelItems = await getRequestlevellist();
      const departmentItems = await getDepartmentlist();

      const processedLevelItems = levelItems.map((val) => ({
        Key: val.Key,
        text: val.Text,
      }));

      const processedDepartmentItems = departmentItems.map((val) => ({
        Key: val.Title,
        text: val.Departments,
      }));

      setLevelItems(processedLevelItems);
      setDepartmentitems(processedDepartmentItems);

      console.log("Intermediate State: Level Items", processedLevelItems);
      console.log(
        "Intermediate State: Department Items",
        processedDepartmentItems
      );
    } catch (error) {
      console.error("Error fetching levels and departments:", error);
    }
  };
  useEffect(() => {
    fetchData();
    // Cleanup function if needed
    // return () => { cleanup code };
  }, []);

  // render() {
  //     const HandleLevel = async (e, value: any) => {
  //       console.log(this.state.SubDepartment);
  //       console.log(value);
  //       this.setState(
  //         {
  //           Level: value.text,
  //           errmsgApproverA: "",
  //           errmsgApprover: "",
  //           errmsgApproverB: "",
  //           show: false,
  //           ischanged: true,

  //         },
  //         async () => {
  //           console.log(this.state.SubDepartment);
  //           if (this.state.Department != "") {
  //             this.setState({
  //               ApproverA: await getInitialApprovers(
  //                 this.state.Department,
  //                 this.state.Level,
  //                 this.state.SubDepartment
  //               ).then(async (item) => {
  //                 let list:any = [];
  //                 await item.map(async (val) => {
  //                   await list.push({
  //                     text: val.Name,
  //                     key: val.EmailID,
  //                     //Authority: val.Authority,
  //                     Level: val.Level,

  //                     Department: val.Department,
  //                     SubDepartment: val.SubDepartment,
  //                   });
  //                 });
  //                 if (list.length == 0) {
  //                   this.setState({
  //                     errmsgApproverA: "No Data found",
  //                   });
  //                 }
  //                 console.log(list);
  //                 return list;
  //               }),

  //               ApproverB: await getInitialApprovers(
  //                 this.state.Department,
  //                 this.state.Level,
  //                 this.state.SubDepartment
  //               ).then(async (item) => {
  //                 let list:any = [];
  //                 await item.map(async (val) => {
  //                   await list.push({
  //                     text: val.Name,
  //                     key: val.EmailID,
  //                     //Authority: val.Authority,
  //                     Level: val.Level,

  //                     Department: val.Department,
  //                     SubDepartment: val.SubDepartment,
  //                   });
  //                 });
  //                 if (list.length == 0) {
  //                   this.setState({
  //                     errmsgApproverA: "No Data found",
  //                   });
  //                 }
  //                 console.log(list);
  //                 return list;
  //               }),

  //               Approver_A: await getApprover1(
  //                 this.state.Department,
  //                 this.state.Level,
  //                 this.state.SubDepartment
  //               ),
  //               Approver_B: await getApprover2(
  //                 this.state.Department,
  //                 this.state.Level,
  //                 this.state.SubDepartment
  //               ),
  //             });
  //           }
  //         }
  //       );
  //     };

  // //Original code
  // // this.setState(
  // //   {
  // //     ischanged: true,
  // //     approveshow: true,
  // //     errmsgApproverA: "",
  // //     errmsgApproverB: "",
  // //     errmsgApprover: "",
  // //     SubDepartment: "",
  // //     Department: value.text,
  // //     SubDepartmentlist: await getSubDepartmentlist(value.text),
  // //   },
  // //   async () => {
  // //     this.setState({
  // //       sub_Status: this.state.SubDepartmentlist.length == 0 ? true : false,
  // //     });
  // //     if (this.state.SubDepartmentlist.length == 0) {
  // //       this.setState({
  // //         ApproverA: await getInitialApprovers(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           ""
  // //         ).then(async (item) => {
  // //           // let list = [];
  // //           const list: { Key: any; text: any, Level:any,  Department:any, SubDepartment: any}[] = [];

  // //           await item.map(async (val) => {
  // //             await list.push({
  // //               text: val.Name,
  // //               Key: val.EmailID,
  // //               //Authority: val.Authority,
  // //               Level: val.Level,

  // //               Department: val.Department,
  // //               SubDepartment: val.SubDepartment,
  // //             });
  // //           });
  // //           if (list.length == 0) {
  // //             this.setState({
  // //               errmsgApproverA: "No Data found",
  // //             });
  // //           }
  // //           console.log(list);
  // //           return list;
  // //         }),

  // //         Approver_A: await getApprover1(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           ""
  // //         ),
  // //         Approver_B: await getApprover2(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           ""
  // //         ),
  // //       });
  // //     }
  // //   }
  // // );
  // // };

  // // ApproverA: await getInitialApprovers(
  // //   this.state.Department,
  // //   this.state.Level,
  // //   this.state.SubDepartment
  // // )
  // //   .then((item) => {
  // //     try {
  // //       console.log("Initial Approvers for Approver_A:", item);

  // //       // Process the items and return the list
  // //       const list: {
  // //         Key: any;
  // //         text: any;
  // //         Level: any;
  // //         Department: any;
  // //         SubDepartment: any;
  // //       }[] = item.map((val) => ({
  // //         text: val.Name,
  // //         Key: val.EmailID,
  // //         Level: val.Level,
  // //         Department: val.Department,
  // //         SubDepartment: val.SubDepartment,
  // //       }));

  // //       if (list.length === 0) {
  // //         this.setState({
  // //           errmsgApproverA: "No Data found",
  // //         });
  // //       }

  // //       console.log(list);
  // //       return list;
  // //     } catch (error) {
  // //       console.error("Error processing initial approvers:", error);
  // //       throw error; // Throw the error to be caught by the .catch block
  // //     }
  // //   })
  // //   .catch((error) => {
  // //     console.error("Error fetching initial approvers:", error);
  // //     this.setState({
  // //       errmsgApproverA: "Error fetching data",
  // //     });
  // //     return [];
  // //   }),

  //     // Approver_A: await getApprover1(
  //     //             this.state.Department,
  //     //             this.state.Level,
  //     //             this.state.SubDepartment
  //     //           ),
  //     //           Approver_B: await getApprover2(
  //     //             this.state.Department,
  //     //             this.state.Level,
  //     //             this.state.SubDepartment
  //     //           ),
  //     //         });
  //     //       }
  //     //     }
  //     //   );
  //     //   }
  // // this.setState(
  // //   {
  // //     Level: value.text,
  // //     errmsgApproverA: "",
  // //     errmsgApprover: "",
  // //     errmsgApproverB: "",
  // //     show: false,
  // //     ischanged: true,
  // //   },
  // //   async () => {
  // //     console.log(this.state.SubDepartment);
  // //     if (this.state.Department !== "") {
  // //       this.setState({
  // //         ApproverA: await getInitialApprovers(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           this.state.SubDepartment
  // //         ).then(async (item) => {
  // //           const list: {
  // //             Key: any;
  // //             text: any;
  // //             Level: any;
  // //             Department: any;
  // //             SubDepartment: any;
  // //           }[] = [];
  // //           await item.map(async (val) => {
  // //             await list.push({
  // //               text: val.Name,
  // //               Key: val.EmailID,
  // //               Level: val.Level,
  // //               Department: val.Department,
  // //               SubDepartment: val.SubDepartment,
  // //             });
  // //           });

  // //           if (list.length == 0) {
  // //             this.setState({
  // //               errmsgApproverA: "No Data found",
  // //             });
  // //           }
  // //           console.log(list);
  // //           return list;
  // //         }),
  // //       });

  // //       this.setState({
  // //         ApproverB: await getInitialApprovers(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           this.state.SubDepartment
  // //         ).then(async (item) => {
  // //           const list: {
  // //             Key: any;
  // //             text: any;
  // //             Level: any;
  // //             Department: any;
  // //             SubDepartment: any;
  // //           }[] = [];
  // //           await item.map(async (val) => {
  // //             await list.push({
  // //               text: val.Name,
  // //               Key: val.EmailID,
  // //               Level: val.Level,
  // //               Department: val.Department,
  // //               SubDepartment: val.SubDepartment,
  // //             });
  // //           });

  // //           if (list.length == 0) {
  // //             this.setState({
  // //               errmsgApproverB: "No Data found",
  // //             });
  // //           }
  // //           console.log(list);
  // //           return list;
  // //         }),
  // //       });
  // //       this.setState({
  // //         Approver_A: await getApprover1(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           this.state.SubDepartment
  // //         ),
  // //         Approver_B: await getApprover2(
  // //           this.state.Department,
  // //           this.state.Level,
  // //           this.state.SubDepartment
  // //         ),
  // //       });
  // //     }
  // //   }
  // // );
  // // };

  const HandleLevel = async (e, value: any) => {
    console.log(SubDepartment);
    console.log(value);

    try {
      // Set initial state
      // this.setState({
      //   Level: value.text,
      //   errmsgApproverA: "",
      //   errmsgApprover: "",
      //   errmsgApproverB: "",
      //   show: false,
      //   ischanged: true,
      // });
      setLevel(value.value);
      setErrmsgApproverA("");
      setErrmsgApprover("");
      setErrmsgApproverB("");
      setShow(false);
      setIsChanged(true);

      if (Department !== "") {
        // Fetch data for ApproverA and ApproverB
        const [approverAData, approverBData] = await Promise.all([
          getInitialApprovers(Department, Level, SubDepartment),
          getInitialApprovers(Department, Level, SubDepartment),
        ]);
        console.log([approverAData, approverBData]);

        // Process data for ApproverA
        const approverAList = approverAData.map((val) => ({
          text: val.Name,
          key: val.EmailID,
          Level: val.Level,
          Department: val.Department,
          SubDepartment: val.SubDepartment,
        }));
        if (approverAList.length === 0) {
          // this.setState({
          //   errmsgApproverA: "No Data found",
          // });
          setErrmsgApproverA("No Data found");
        }

        // Process data for ApproverB
        const approverBList = approverBData.map((val) => ({
          text: val.Name,
          key: val.EmailID,
          Level: val.Level,
          Department: val.Department,
          SubDepartment: val.SubDepartment,
        }));
        console.log(approverBList);

        if (approverBList.length === 0) {
          // this.setState({
          //   errmsgApproverB: "No Data found",
          // });
          setErrmsgApproverB("No Data found");
        }

        // Set state for both Approvers
        // this.setState({
        //   ApproverA: approverAList,
        //   ApproverB: approverBList,
        //   Approver_A: await getApprover1(this.state.Department, this.state.Level, this.state.SubDepartment),
        //   Approver_B: await getApprover2(this.state.Department, this.state.Level, this.state.SubDepartment),
        // });
        setApproverA(approverAList);
        setApproverB(approverBList);
        setApprover_A(await getApprover1(Department, Level, SubDepartment));
        setApprover_B(await getApprover2(Department, Level, SubDepartment));
      }
    } catch (error) {
      console.error("Error in HandleLevel:", error);
      // Handle errors as needed
    }
  };

  const Handlechange = async () => {
    const sp: SPFI = getSp();
    console.log(Approver_A);
    console.log(Approver_B);
    if (Approver_A.EmailID == Approver_B.EmailID) {
      // this.setState({
      //   errmsgApprover: "Select a valid approval flow",
      // });
      setErrmsgApprover("Please select a valid approval flow !");
      console.log(errmsgApprover);
    } else {
      if (Approver_A.EmailID != "Not Assigned") {
        let val = `Level eq '${Approver_A.Level}' and Department eq '${Approver_A.Department}' and ApproverLevel eq '${Approver_A.ApproverLevel}'`;
        console.log(val);

        if (Approver_A.SubDepartment != null)
          val = `Level eq '${Approver_A.Level}' and Department eq '${Approver_A.Department}' and ApproverLevel eq '${Approver_A.ApproverLevel}' and SubDepartment eq '${Approver_A.SubDepartment}'`;
        console.log(val);

        await sp.web.lists
          .getByTitle("Final Appover")
          .items.top(1)
          .filter(`${val}`)
          .getAll()
          .then(async (items: any[]) => {
            if (items.length > 0) {
              sp.web.lists
                .getByTitle("Final Appover")
                .items.getById(items[0].Id)
                .update({
                  EmailID: Approver_A.EmailID,
                  Name: Approver_A.Name,
                  //Authority: this.state.Approver_A.Authority,
                })
                .then((result) => {
                  // this.setState({ hideDialog: false });
                  // setHideDialog(false);
                  console.log(JSON.stringify(result));
                });
            } else {
              await sp.web.lists
                .getByTitle("Final Appover")
                .items.add({
                  EmailID: Approver_A.EmailID,
                  Name: Approver_A.Name,
                  //Authority: Approver_A.Authority,
                  Level: Approver_A.Level,
                  ApproverLevel: Approver_A.ApproverLevel,
                  Department: Approver_A.Department,
                  SubDepartment: Approver_A.SubDepartment,
                })
                .then((result) => {
                  // this.setState({ hideDialog: false });
                  // setHideDialog(false);
                  console.log(JSON.stringify(result));
                });
            }
          });
      }
      if (Approver_B.EmailID != "Not Assigned") {
        let val = `Level eq '${Approver_B.Level}' and Department eq '${Approver_B.Department}' and ApproverLevel eq '${Approver_B.ApproverLevel}'`;
        console.log(val);

        if (Approver_B.SubDepartment != null)
          val = `Level eq '${Approver_B.Level}' and Department eq '${Approver_B.Department}' and ApproverLevel eq '${Approver_B.ApproverLevel}' and SubDepartment eq '${Approver_B.SubDepartment}'`;
        console.log(val);

        await sp.web.lists
          .getByTitle("Final Appover")
          .items.top(1)
          .filter(`${val}`)
          .getAll()
          .then(async (items: any[]) => {
            if (items.length > 0) {
              sp.web.lists
                .getByTitle("Final Appover")
                .items.getById(items[0].Id)
                .update({
                  EmailID: Approver_B.EmailID,
                  Name: Approver_B.Name,
                  // Authority: Approver_B.Authority,
                })
                .then((result) => {
                  // this.setState({ hideDialog: false });
                  // setHideDialog(false);
                  console.log(JSON.stringify(result));
                });
            } else {
              await sp.web.lists
                .getByTitle("Final Appover")
                .items.add({
                  EmailID: Approver_B.EmailID,
                  Name: Approver_B.Name,
                  //Authority: Approver_B.Authority,
                  Level: Approver_B.Level,
                  ApproverLevel: Approver_B.ApproverLevel,
                  Department: Approver_B.Department,
                  SubDepartment: Approver_B.SubDepartment,
                })
                .then((result) => {
                  // this.setState({ hideDialog: false });
                  // setHideDialog(false);
                  console.log(JSON.stringify(result));
                });
            }
          });
      }
    }
    form.resetFields();
  };

  // const HandleDepartment = async (e, value: any) => {
  //   console.log(value);
  //   setIsChanged(true);
  //   setApproveShow(true);
  //   setErrmsgApproverA("");
  //   setErrmsgApproverB("");
  //   setErrmsgApprover("");
  //   setSubDepartment("");
  //   setDepartment(value.text);
  //   setSubDepartmentlist(await getSubDepartmentlist(value.text));
  //   setSub_Status(SubDepartmentlist.length == 0 ? true : false);
  //     if (SubDepartmentlist.length == 0) {

  //       setApproverA(await getInitialApprovers(Department, Level, "").then(async (item) => {
  //         let list: any = [];

  //         await item.map(async (val) => {
  //           await list.push({
  //             text: val.Name,
  //             key: val.EmailID,
  //             //Authority: val.Authority,
  //             Level: val.Level,

  //             Department: val.Department,
  //             SubDepartment: val.SubDepartment,
  //           });
  //         });

  //         if (list.length == 0) {

  //           setErrmsgApproverA("No Data found")
  //         }
  //         console.log(list);
  //         return list;
  //       }),

  //       )

  //       setApprover_A(await getApprover1(
  //         Department,
  //         Level,
  //         ""
  //       ))
  //       setApprover_B(await getApprover2(
  //         Department,
  //         Level,
  //         ""
  //       ))
  //     }

  // };

  const HandleDepartment = async (e, value) => {
    console.log(value);
    setIsChanged(true);
    setApproveShow(true);
    setErrmsgApproverA("");
    setErrmsgApproverB("");
    setErrmsgApprover("");
    setSubDepartment("");
    setDepartment(value.value);
    const departmentList = await getSubDepartmentlist(value.value);
    setSubDepartmentlist(departmentList);
    setSub_Status(departmentList.length == 0 ? true : false);

    if (departmentList.length === 0) {
      const item: any = await getInitialApprovers(Department, Level, "");
      let list: any = [];

      item.forEach((val: any) => {
        list.push({
          text: val.Name,
          key: val.EmailID,
          //Authority: val.Authority,
          Level: val.Level,
          Department: val.Department,
          SubDepartment: val.SubDepartment,
        });
      });

      if (list.length === 0) {
        setErrmsgApproverA("No Data found");
      }

      setApproverA(list);
      setApprover_A(await getApprover1(Department, Level, ""));
      setApprover_B(await getApprover2(Department, Level, ""));
    }
  };

  const HandleSubDepartment = async (e, value: any) => {
    setSubDepartment(value.value);
    setErrmsgApprover("");

    setApproverA(
      await getInitialApprovers(Department, Level, SubDepartment).then(
        async (item) => {
          const list: {
            Key: any;
            text: any;
            Level: any;
            Department: any;
            SubDepartment: any;
          }[] = [];
          await item.map(async (val) => {
            await list.push({
              text: val.Name,
              Key: val.EmailID,
              //Authority: val.Authority,
              Level: val.Level,

              Department: val.Department,
              SubDepartment: val.SubDepartment,
            });
          });
          if (list.length == 0) {
            // this.setState({
            //   errmsgApproverA: "No Data found",
            // });
            setErrmsgApproverA("No Data found");
          }
          console.log(list);
          return list;
        }
      )
    );

    setApprover_A(await getApprover1(Department, Level, SubDepartment));
    setApprover_B(await getApprover2(Department, Level, SubDepartment));
  };

  // const HandleApproverA = async (e, value: any) => {
  //   console.log(value);
  //   console.log(e);
  //   this.setState({
  //     Approver_A: {
  //       Name: value.text,
  //       EmailID: value.key,
  //       //Authority: value.Authority,
  //       Level: value.Level,
  //       ApproverLevel: "APPROVER 2",
  //       Department: value.Department,
  //       SubDepartment: value.SubDepartment,
  //     },
  //     ischanged: false,
  //     errmsgApprover: "",
  //   });
  // };

  // const HandleApproverA = async (e, value: any) => {
  //   console.log("HandleApproverA triggered");
  //   console.log("Selected Value:", value);
  //   console.log("Event Object:", e);
  //   this.setState({
  //     Approver_A: {
  //       Name: value.text,
  //       EmailID: value.Key,
  //       //Authority: value.Authority,
  //       Level: value.Level,
  //       ApproverLevel: "APPROVER 2",
  //       Department: value.Department,
  //       SubDepartment: value.SubDepartment,
  //     },
  //     ischanged: false,
  //     errmsgApprover: "",
  //   });
  // };

  // const HandleApproverA = (e, value) => {
  //   console.log(value);
  //   console.log("Selected Value:", value.key);
  //   console.log("Selected Text:", value.value);
  //   console.log("Department:", value.Department);
  //   console.log("SubDepartment:", value.SubDepartment);
  //   console.log("HandleApproverA triggered");
  //   console.log("Selected Value:", value);
  //   console.log("Event Object:", e);
  //   setApprover_A({
  //     Name: value.text,
  //     EmailID: value.Key,
  //     Level: value.Level,
  //     ApproverLevel: "APPROVER 2",
  //     Department: value.Department,
  //     SubDepartment: value.SubDepartment,
  //   });
  //   setIsChanged(false);
  //   setErrmsgApprover("");
  // };

  const HandleApproverA = (e, value) => {
    console.log(value);
    console.log("Selected Value:", value.key);
    console.log("Selected Text:", value.value);

    // Parse the JSON string stored in data-option attribute
    const optionData = JSON.parse(value["data-option"]);

    console.log("Department:", optionData.Department);
    console.log("SubDepartment:", optionData.SubDepartment);
    console.log("Level:", optionData.Level);
    console.log("Name:", optionData.text);
    console.log("EmailID:", optionData.Key);
    console.log(optionData);

    console.log("HandleApproverA triggered");

    // Set state with values extracted from optionData
    setApprover_A({
      Name: optionData.text,
      EmailID: optionData.Key,
      Level: optionData.Level,
      ApproverLevel: "APPROVER 2",
      Department: optionData.Department,
      SubDepartment: optionData.SubDepartment,
    });

    setIsChanged(false);
    setErrmsgApprover("");
  };

  // const HandleApproverB = (e, value: any) => {
  //   console.log("HandleApproverB triggered");
  //   console.log("Selected Value:", value);
  //   console.log("Event Object:", e);
  //   console.log(value);
  //   // this.setState({
  //   //   Approver_B: {
  //   //     Name: value.text,
  //   //     EmailID: value.Key,
  //   //     // Authority: value.Authority,
  //   //     Level: value.Level,
  //   //     ApproverLevel: "APPROVER 3",
  //   //     Department: value.Department,
  //   //     SubDepartment: value.SubDepartment,
  //   //   },
  //   //   ischanged: false,
  //   //   errmsgApprover: "",
  //   // });

  //   setApprover_B({
  //     Name: value.text,
  //     EmailID: value.Key,
  //     // Authority: value.Authority,
  //     Level: value.Level,
  //     ApproverLevel: "APPROVER 3",
  //     Department: value.Department,
  //     SubDepartment: value.SubDepartment,
  //   });

  //   setIsChanged(false);
  //   setErrmsgApprover("");
  // };

  const HandleApproverB = (e, value) => {
    console.log(value);
    console.log("Selected Value:", value.key);
    console.log("Selected Text:", value.value);

    // Parse the JSON string stored in data-option attribute
    const optionData = JSON.parse(value["data-option"]);

    console.log("Department:", optionData.Department);
    console.log("SubDepartment:", optionData.SubDepartment);
    console.log("Level:", optionData.Level);
    console.log("Name:", optionData.text);
    console.log("EmailID:", optionData.Key);
    console.log(optionData);

    console.log("HandleApproverB triggered");

    // Set state with values extracted from optionData
    setApprover_B({
      Name: optionData.text,
      EmailID: optionData.Key,
      Level: optionData.Level,
      ApproverLevel: "APPROVER 3",
      Department: optionData.Department,
      SubDepartment: optionData.SubDepartment,
    });

    setIsChanged(false);
    setErrmsgApprover("");
  };

  const toggleHideDialog = () => {
    // this.setState({
    //   hideDialog: true,
    // });
    setHideDialog(true);

    console.log(hideDialog);
  };
  console.log(ApproverA);
  console.log(ApproverB);
  console.log(Approver_A);
  console.log(Approver_B);

  const styl = `:where(.css-dev-only-do-not-override-usln0u).ant-card .ant-card-body {
    padding: 6px;
    border-radius: 0 0 8px 8px;
}`;

  return (
    // <div style={{ clear: "both" }}>
    //   <div>
    //     <Stack horizontal tokens={stackTokens}>
    //       <ComboBox
    //         placeholder="Select level"
    //         label="Document Level"
    //         required
    //         errorMessage={errlevelmsg}
    //         options={levelitems}
    //         onChange={HandleLevel}
    //         styles={dropdownStyles}
    //       />
    //       <ComboBox
    //         placeholder="Select Department"
    //         label="Department"
    //         required
    //         disabled={show}
    //         errorMessage={errmsg}
    //         options={Departmentitems}
    //         onChange={HandleDepartment}
    //         styles={dropdownStyles}
    //       />
    //       {!sub_Status ? (
    //         <ComboBox
    //           placeholder="Select Sub-Department"
    //           label="Sub Department"
    //           required
    //           errorMessage={errmsg}
    //           options={SubDepartmentlist}
    //           onChange={HandleSubDepartment}
    //           styles={dropdownStyles}
    //         />
    //       ) : (
    //         <div></div>
    //       )}
    //     </Stack>
    //     {approveshow ? (
    //       <div>
    //         <br />
    //         <Stack horizontal tokens={stackTokens}>
    //           <ComboBox
    //             placeholder="Select Approver"
    //             label="Approver 2"
    //             errorMessage={errmsgApproverA}
    //             options={ApproverA}
    //             onChange={HandleApproverA}
    //             styles={dropdownStyles}
    //           />

    //           <ComboBox
    //             placeholder="Select Approver"
    //             label="Approver 3"
    //             errorMessage={errmsgApproverB}
    //             // options={this.state.ApproverB}
    //             options={ApproverA}

    //             onChange={HandleApproverB}
    //             styles={dropdownStyles}
    //           />
    //         </Stack>
    //       </div>
    //     ) : (
    //       <div></div>
    //     )}

    //     <div>
    //       <br />
    //       <Label>
    //         Approver Info{" "}
    //         <span>
    //           {errmsgApprover ? (
    //             <span
    //               style={{
    //                 color: "red",
    //                 fontWeight: "normal",
    //                 fontSize: "13px",
    //               }}
    //             >
    //               &nbsp;
    //               <FontIcon
    //                 aria-label="AlertSolid"
    //                 iconName="AlertSolid"
    //                 style={{
    //                   color: "red",
    //                   fontSize: "12px",
    //                   margin: "3px",
    //                 }}
    //               />
    //               {errmsgApprover}
    //             </span>
    //           ) : (
    //             <span></span>
    //           )}
    //         </span>
    //       </Label>
    //       <table style={{ tableLayout: "fixed", width: "70%" }}>
    //         <tr className={styles.Popup}>
    //           <td
    //             style={{
    //               borderRight: "solid 0.5px",
    //               width: "70%",
    //               padding: "10px",
    //             }}
    //           >
    //             <Persona
    //               showUnknownPersonaCoin={
    //                 Approver_A.Name == "Not Assigned"
    //                   ? true
    //                   : false
    //               }
    //               text={Approver_A.Name}
    //               tertiaryText="File Reviewer"
    //               secondaryText={
    //                 Approver_A.Name != "Not Assigned"
    //                   ? Approver_A.EmailID
    //                   : ""
    //               }
    //               size={PersonaSize.size72}
    //               imageAlt={Approver_A.Name}
    //             />
    //           </td>

    //           <td style={{ width: "70%", padding: "10px" }}>
    //             <Persona
    //               showUnknownPersonaCoin={
    //                 Approver_B.Name == "Not Assigned"
    //                   ? true
    //                   : false
    //               }
    //               text={Approver_B.Name}
    //               tertiaryText="File Approver"
    //               secondaryText={
    //                 Approver_B.Name != "Not Assigned"
    //                   ? Approver_B.EmailID
    //                   : ""
    //               }
    //               size={PersonaSize.size72}
    //               imageAlt={Approver_B.Name}
    //             />
    //           </td>
    //         </tr>
    //       </table>
    //     </div>
    //     <br />
    //     <PrimaryButton
    //       style={{ float: "right", right: "20vw" }}
    //       onClick={Handlechange}
    //       disabled={ischanged}
    //       text="Submit"
    //     />

    //     <Dialog
    //       hidden={hideDialog}
    //       containerClassName={"ms-dialogMainOverride " + styles.normalDialog}
    //       onDismiss={toggleHideDialog}
    //     >
    //       <svg
    //         style={{ margin: "auto 20px" }}
    //         viewBox="0 0 400 150"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         xmlnsXlink="http://www.w3.org/1999/xlink"
    //       >
    //         <rect
    //           x="0.4375"
    //           y="0.664062"
    //           width="400"
    //           height="150"
    //           fill="url(#pattern0)"
    //         />
    //         <defs>
    //           <pattern
    //             id="pattern0"
    //             patternContentUnits="objectBoundingBox"
    //             width="1"
    //             height="1"
    //           >
    //             <use
    //               xlinkHref="#image0_6782_329527"
    //               transform="translate(0.313433) scale(0.000932836 0.0025)"
    //             />
    //           </pattern>
    //           <image
    //             id="image0_6782_329527"
    //             width="400"
    //             height="400"
    //             xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAABYlAAAWJQFJUiTwAAAgAElEQVR4nO2da2yc15nfn+H9Jt5EmpRoWYxlKaXkXclt5O4uN5Fy26QxUsu53zbSYlsUyIeNtmQ/LIoi7rddgIRVtDAWWBRRvhQtFkXoAknh2KipRRgUVjeh0ljaSqZNmhFFijRv4nU4QxbPO+el3hnO7b2fy/8HjymS0vDMO5zzn/9zO4m9vT0CQBWm3ny19fhnvreMJwyA+IGAACmZevPVc0R0iYguEhH/uSXPOm8R0TgRjRz/zPdG8EwCEC0QECAVU2++eoWIrhLRWZfrWiGi60R07fhnvjeJZxWA8IGAACmYevPVi0IAjvtcz4oQkZfxzAIQLhAQECuc0yAi3uy/H/A6OLx1EfkSAMIDAgJiQ4jHqIdwVbmsCBEZx7MMQPBU4JqCOBBJ8skQxYNE4n1U/CwAQMDAgYDImXrz1V5RPZWvsioMpriSC+EsAIIFDgREighbjUQoHiQS8yjzBSBgICAgaq6HHLYqxAVRIgwACAiEsEBkTL35Kvd3vBLjFeekei9CWQAEAxwIiASR94i7N6NFNCkCAAIAAgKi4nrEeY9CQEAACAgICAgd0WV+QZIr3YJcCADBAAEBUSDbWJFLEqwBAOWBgIBQkcx92FyUYxkAqA0EBISNjDmHFiFsAAAfQEBAaIjKqxclvcIYbwKATyAgIExkTlb3SrAGAJQGAgLCRGYBgQMBwCcQEBAKYgKu38OhAAASAwEBYSF7qWyrBGsAQGmq8PSBkJC9yuns0PDYqONzN6XGK2IcfS6T4mazf/+DA/2j+e4IAJXBMEUQClNvvir9L9bf3opjKLB1NgmLzLIQIfvj5OBA/2QZ/x4AaYCAgMARPRZvyXxl59eaaHTihAQrOcAtISqjtqOBewGyghAWCAM06XnHtkX7IbWh4TESwjIuRIUFZXxwoB9j6UGswIGAwJl689URiRsILSR2IG6wRYVvo4MD/fnyMgCEBgQEBM7Um6+Ox3TqYNksb9bTG3dP6fbkrwh3MgpBAVEAAQGBo0ICneJLokeJU1BGkKQHQQMBAYEwNDzGfR8X2xs2vvbpk/eOqHBV2YGwEzEIrgAbEe5kxKQHDsIBAgI8MTQ81iqaBS858x2dTWt08cSEEheVcyCcCzGY14SgjCAhD7wAAQFlU0g0nJzpnqXTXXNKXNTbc130zmy3BCuRAogJcA0EBBSlHNFwopKATC62083pYxKsRDogJqAsICAgLyKnccVtOS6HrziMpQKalPKGDYvJdeRMQD4gIGCfoeGxXnGCIAtHi5cro5KAkBmVWEHBFV3XiegaqrmADQTEcBwhqqtB9G680HeHGmqSylzUn97po/VkjQQrUQpuYLyGEBeAgBhKEG4jH189e0upC4pKLF/AlRgOBMQwhobHLgrhCGXUiGoCgkqswHhNCAkGPxoEBMQQhobH2Gm8HOYpgY01SfpC3x2lLigqsQKHmxVfHhzov67Z4wJ5gIBojMhvXBW3wMJUhVCpidBG05lYMrAi8iTXkCfRFwiIhkQtHDYqCgihEitsICQaAwHRiLiEw0ZVAUEiPRIgJBoCAdGAuIXDRlUBGZ85SvfmOyVYiRFASDQCAqIwsgiHTW/7Ip0/Nq3cBZ1ZaaGxyV4JVmIUEBINqDD9AqjK0PDYy+J40x/IIB4kqrBUpLV+U8l1K06L+N2dFL/LQEHgQBQjinJcr6g0SDEXdKTHDsp/FQQCogiiAZCF44KsK1ZZQLgXhHtCQOzcEEKChkQFgIBIjhg5wsJxWfa1qiwgaCiUjh8JIcGIFIlBDkRiRGx4XAXxUJ2elhXTL4Fs8O/8OPIjcgMHIiEiXHVdxjxHMVR2IGTmGemqwPmRKwhryQcERCJEWe71sAYdhs3Jznk6d3RGxaVb3FvooPH7PRKsBBTgNSEkKPuVBISwJGFoeOyqKMtVUjxIzJVSmZ7mVaXXbwAvirLfq6ZfCFmAA4kZkSS/LnN1Vbmo2onuBGEsZbgh3AiS7DECBxIj4p3UuA7ioQsnOxZMvwSqcEEk2eFGYgQOJAZ0ch1OdHAgO+lK+smdPusjUAa4kZiAA4kYuA65qa5Mo6RXPeBGYgIOJCJUr7AqF9WOtM0HDplSGlRqRQgcSASIvg6lK6xMgocrcjgOKIldqXURT1/4QEBCZmh4jEdWvyXLxFxQHmcUbogE1mvtLfHaAyGCEFZIiET5CBEZdV4qJ9F1efeOkwq1gGOql5BgDwc4kBAYGh67JBLlOGxbYeBCtOCsSLBfMv1ChAEEJGDE8Lcfmxqy0ulMDXZSyIVoAb8Wf4zBjMGDEFZAiCqrEdPLc1UfqJgLh7A4lAW04YYIaaFKKwDgQAJgaHjsHHo7MiQ1a8BjB8JnvQNtsHtGzuEp9Q8ExCfiiNlR1Uavh4WOc6Q4F8INhkAb+LU6Kl67wAcQEB+ImOoPUaL7mA0NzxVvqEnSqc55CVYCAoRfsz9EXsQfyIF4QOQ7ruGkwPzo0I2eD0zq1RY+Pvcq8iLugQNxiRCPUYhHYXTdZFU+LAsU5bIIabXiMrkDAuICR7Ic/R1F0DGMRSKhfhKhLF05i+S6eyAgZSJ+sZAsL4PlrTrp1+gVTqg31iTVXDwohZ1ch4iUCQSkDByVVkiWl4HOeQKuxjp/bFqClYCQaEGFVvlAQEogfpFQaeUCnbrR84FQlvbYFVoQkRJAQIrgEA/gAhMqlRDKMgKISAkgIAUYGh67DvHwju5TbBHKMoYfir0A5AECkgfxC4MyXR/onEi3QSjLGC5DRPIDAckB4hEMpjTccSiLTzAEj+nsbKTTfU9Qe5tWvwMQkTxAQBxAPILDlIOYEMrKpqqygk483U7NzbV04kS7TEsLAohIDhAQAcQjWLgSa0ezybyFYAfCY+xBxn3YVFZWZH2uCRARBxAQiEdomHQcLJ+BgsOniLq7s5/zzg7tBIQgIo8xXkAgHuHxcF3LzaMgzx+bNnrsO7uN2tqqrK9xKItvGmK8iJDpAgLxCBeTHAiJse/PG5wPebKnucDXte3BNV5EjBUQcQ4AxCNEuBLLlDyIzdGWFSNPMHzyyZYD7sOGHYhmFVlOLpt8poiRAiK6S38gwVK0xzQXQmLsu0ld6iwcR7qLP89ckcUVWpryA1M71o0TEIwniZb7q/nDGjrDeZA/6J005vF+9FSHVXFVDP6+hmW9Towce2KUgAwNj12EeESLiQ6EDCrtZVFoaKgu6++2tdVboS6N+aHYY4zBGAERM/5HJFiKUXA/iK4HTJVC99JeFgO3ZbqcaNewN8TJiEnniRghIEPDY704zyM+TAxj2fT3TmpZ2nuk+1DBqqtScKe6xiJinyfSK8FaQkd7ARHnHI9APOLj/oq5l57FQ7fSXg5bHT/u7/hwFhEWIU1pEU5E+zPWTXAgIzjDPF44D2JaOa8TLu3VZWovi0dQ3eUsQr0+hUhizpoQMtdaQESTzwUJlmI8JrsQEqW9Okztra3J3+vhlYYGrfNjF3RvNNRWQERJHRoFJWHG4DyIzXkNRp1UVRk//cgtl3Uu79XytwHluvLBDsTkMBaJ0l52IiozMfEhpdO7gTwCvp+pqSWlr0eZaFveq52AiOoHlOtKiOlhLIbHnKg86mR9Y4du337oW0T43/P98P0ZwoiOlVlaCQgqruQGYawMqo86sUXEKwaKB+lamaWbA7mGiit5YQdialOhEx1GnfDmP/GeNyf1/+4umCYeNmfFHqUN2gjI0PDYVSTN5cfkpkInVj6k5748C/LA/Pw6zc4+cvUPp6aWaXV1W5JHEAuXxV6lBVoIiBgd8IoESwEluDffiUskONmxoPyok8mpZdoo002wcDxwKTia8oou406UFxBH3gMoAM/G4nNCQAYdRp1wZVYpOO/hNeSlKVrkQ3RwINyoc1yCdYAyubfQgUslYPHo1yAfUiqU9WB2jba3U5GtSQGOi71LaRJ7e3vKrl/EEqUPXXG8m29cecMbRmvdVtb3rYm1O9WUTFda787Xt6uJn5fNVF1saw4TvgYv9N0x+vzwXMZnjiod3uPDop577kjec0FYOH41/iCWdSnAnw8O9CubWFdWQEQM8VcSLOUAvDH2tKxQT/OqNQfJC3u7u7SVTND9lWaaWumgxU29ks+cQOYcAHjMG3dPKR3e4/Hu+Sb0cuiKE+6gIM8NDvSPq3h5lBQQETscla1klx0GnwERRqPYdnKX5lYb6M58D60m1T+kia/VF/ruSLASeeAS55/dPaVsxz67kI99rCfra3AfZXGLiC4ODvQvK7DWLIKdjBYdL8skHmEKh01tTQU91bFFx9rv0ebWLk0tNdPMWictbqmZh+OwHU/p1fnAJbc01CStJsOb08fUWrggld6l+YX1rGm98wsbMa9KCc6KPU258l7lHIiYKfOWBEuxYNHgF33U8Xx+3na2t2lzM02z6+00t9lBcxtqJadZPC6emJBgJXLBAjK5qOb54c3NtXS674n9z9l9IHleNp8cHOgfVWStFkoJiAhdjctSdcXTVeOea2QLSSqZpGSqguY2D1tCws5kZ1d+g/nZU3e1GHMeJBzC4nzIuqJd+7/7O93WOenc93H7jveRJwYyxelBlUJZqoWwpCnZlUE8mEQiQTV1dZlbMkk1VfPU0zhHlCBLSB5usDM5LK2YcEnvec1O7POLPeqERURFfv1/Z6mxodrUcSV+OC5GnSgz/l0ZBzI0PHaJiH4swVKkEY9CWG5ke5t202lLSJiMkHTQh1st0pUHc0lvg8LDBcOCxXX8fk88PxzEyUuDA/1KNEcrISAyha74aFJVznRIp1KU3NqyPtpCkqAErSYb6f5aN81uHJZCTFiM4ULyMzpxwio2AEahTChLlU70l2UQj0ZRJaMKlVVVVN/UZN0qK6uI9vi/PWquWae+9gn65JNv0x/2/JI+0nzf+lpccMIYU3rzo8OoE+Ca42LPkx7pHYhMVVdcMaRy2Sk3J7Ij2UkmLUeSeGxLrP9tpWppdqODfvuoy3IpUQIXUpiZlRYam9TuLCJQGumrslRwIFLMi2HhUL1nIVFRQbUNDdTY3EzV1TWWG7HePoj/1VVtW27k4z2/pE89dZNOH36PDtd766R3C1xIYXiagernhwBPSD8rS2oHMjQ8xjbuBxIsRXn3kQ+7BHgnuS1EhHKcSeZjerfKypdwv8ns+uHQ1oO+kOL8/P2P0AOcp2Ia/35woF/acJa0AiLOD35fgqVoP3bDEpLkNqW2k9af7ZBW5kNGROw/p3YrM2Kydpg+3GwOvDxYR6EOit29BP2Pd84oO+oEeOYjgwP9UlpQmUNY0tg3rwMRVcHqJamto/pDh6i2vp4SiQqi/fDWXtafqyrS9GTTQzp/5A59/um36fyRf6BjzQ+puiKYbmNVx3hEQUVijz7+ESneU4FokTaUJaUDkanngwx9V2z1kiS3aW93zzYkB13J429YZJxJu+VMNnZqPf9sTOotzi8me63z5YFRSNkbIqsDkWo+vokhlaqaGmpoOkR19fVUUVW1n2h/7ErsD4/fgHQ3fEjnut6lz/T+ki4+9Wt6uvUBNVS7P//6ndluJNSL8E+f+gClveYh5Zkh0gmISJxLc8Kg6XOaKqurqa6hgWobGzO9JHlFxMFe5vvNtev0bOdkRkyO/5qebntALbXl9ZpwjJ8PWAIFnpOKXXoeJc+mcVzsjVIhVQhLJM6541waf47KoGx4PEpqJ0mpnVROOCuR/RcTCUrkfM5s7tTS7FobfbD6BK1sNxT9WbKPjIkbhLKMg5OxvTJ1qMs2Ye9lmcSD4EAOUFFZSTWV9VRds2s1JKZ3dixx4DciB0QkD/XV2/R02yw93T5n5UlYTB6stdHCxsHyVHYhTzStYU5WAXgqwsO1JlRlmUOLbMMWpXEgsh5Re6Z71josCuSHu9tTOzvWvK0DIlLAhZCjLNhmh8uD19otMXnwqG3/6yzgPPId5AcDF41EmiNwZcqBKHuwvMlwd3t1ba3V4V5dU5MtGCIf4vx8/485n1dXpOlY8zw933OPXjj19/SPj7xHRw4tWWdioLS3MFyt1giHZhrS7JVSOBDZThl0AgfiDv592k2lLFey/7tVwInkupBCf/fBo1aqqa6g7mY0GOaDp/Xy1F5gFFLMyZLFgUjbqv8Qo7RdwSEsrtyyHEltbdG8SK4LIcrvWo4cWqaO+qW4H5q06DCnDbhGij0zdgERTYMX4l4HCB4eJ2+HtrKcRpFQViE4eQ8Kg7Je47gg9s5YkcGBSJ37wGE+/rGEpK7O+lgWeVxIRYUqR9fEA1eqoeTZOGLfO2N9VQ4Nj12RqWmwEOiKDoBEwupu57CW5UZKuRDH53Af5XEGuTrTOC720NiI+22dEqduIQ8SHFYfSV2dVb1VKnS1P2Ee7qMs4EKMJNY9NLZXpirug5nBGQyBkpn+W5slDMVcCMJX5QMXYhyxupA4X5lKuA+CAwkHW0RKdK8nEL5yBVyIkcS2l8YiIKJ6QAn3QWK4Hx+5CgImR0TyuRC4D/fAhRjH8bgqsuJ6dV6N6ed6ZnKpLaR7NpxE4mCZr00iAQHxALuQHs0PQXPDMyfa6fJ3z1q3c2e71Vm4O2LZUyN/dYquc+X6PricF9VY4cC5kCpR4ut0IRAP7+BArsecP//4aICzZ7uopkbLsOgFsbdGShyvUGVyH7m8M9cl14I0gntEcgUDAuId7kzHjKyM+8gVDP6apkS+t0b6ChXnfSjbdc55kOXNeglWoifcJ0IOF4L+D39ghhvRM88cDD33ne6IZS0RcEHssZER9Vs8Zd2HDU7KCw9rjpYIZaH3wz+cBzH56Numphrq6jpYQdnUWEPd3dpWVka6x0b2Kh0aHmslostR/byw4FzIDE6BC40qCEhgsHiYnEw/d7ZwyLnY9xTnsthrIyHKV6lylVeFeHv6GE6BCwt2IZWVCF8FRG+bmVOM2X2cKJLrYGeisQuJbK+NUkCkOYbRLyweOOQoPPIl1IE3TE2mP3++dKj5fBl/R1Ei22sjeZWq1jhYDvdXWqzjREHwIHwVLEcNC2Oxszh2rHSYub2tnk73dUaypoiJrLEwqleqNuErJ3wWNca9A9k5ZVBPCJfs9veXHx3QuC8kkj03dAFRvXS3FGOTvSjtBVLDnemt9ZtGPEncac5VVuXC4vGHLgRHISIp6Y3CgWjpPmw4H8LnUUNEgMyYUI311LEW6utzH1bmcJemoazQ994yj4jzRezHLnrFTkA6k5CtdVu0vlOdVYXF03q5MouPFTXlnR5Qi6PNq/TOrLZzoKi9vd5V6CoXTqgvLm3S7KxWZ8tfCltEEntlnEftFZHI+XGYDyBIWDD4nVpn47pnIUjtVlBVxa6sDxEYzE/v9NG6hvPcOAz1xS+echW6ykcymabXfzZBi4tavQl8aXCgfySsOw87hCV96S67izPds/RC3x26eGLCGkLnx0VAPICs6FiNxeLxuc+d8C0e9n198pO9uiXVQ92DQ3MgohtS2i4m7tI9d3QGh+8AY+AJClz0oQu2eHA5bpBwKOv11ycsR6IJbYMD/cthPJQwHYi0uY+TnfOW44B4AJPQyYGEJR4k+kO+/KU+K6+iCaHtxWEKiHTVV+w6+nsnLedh8pA5YC6c51Md3titDT4E8bCxBOqPTugy7iS0vTiUEJaoP34/8Dv2Aec1zqNKChjO7bkupaux+CwPP9VWXuDEugbVWR8ZHOifDPpOw3IgUoWvWDQ4QQ7xAKbDFYYqE8f8qu48I+EVJJQ9OSwBkab6yg5bIWQFgPohLE3HjkRBKHty4AIiwldng75fr7B4NOBoTwD2UVlEbt2K/pRFTaqxzoYx2iQMByJN+Ir7O3RIGgIQJE8o/JoYvzVLY2PTkf28iYlFun1nPrKfFzKB781hCIgU4StuEMSZ0AAcRPU8yLsTi5GICP+Mn0coVhEQ+N4cqIDIFL6CeACQHx2KScIWkTt3FqyfoRmBh7GCdiAXA74/T7D7QJMgAPnhghIdTinkDT6MnAiHrd6+eT/w+5WEQPfooAVEivwHxAOA4uhS0s45kYkAncLc3JpuYatcAt2jgxaQFwO+P0/0tkk7ggsAKdCpJ4o3fJ5f5Ze19ST9r7cC77WTjUD36MAEJKozeEvB1hxluwAUR/VEei5vvTXpu9w2iPtQgSD36iAdiBT5D5TtAlAa3aYyrK0lfSXVb96c0e0ckGIEtlcHKSDSOBAAQHE4ka7bdIYPpldoetr9xGHOe2jU61EOcjkQURp2PIj78otu1hyAsNBxNhznQ9yGod6+ORPaeiTleFDlvEE5ECnCV0BdUkk4x6hRuSO9ECwebkp7ud/DoNCVk0D2bAgIiJ3k1hal0xh2GTUN1TtaPi4OR3FFVSlYbLgM2FAgIEBtdtNp2lpfp9SOnhuZ7OicL7w1XtqFsPswoeqqAHIIiEz5D6AGfIjZzva2JR67u3AecaHz+TjcpV7MhbBwGJY4zyWQPEgQDkQq97GTxnkBssLCwbmOzbU1Sm5vmX45YkfHSiwnxVyI4e7DxvferZ2ALG/VSbAK4MQOVW2srtLWxgbt7e7i+kiCzi6Ey3oLiYSGgxK94HvvrpJhEUGyvBneQfsgQzqdor30LlXV1By4IhyS2k3vWknxdGqH0jsp9h58/D4lEglcQcngPIiugRwWj4mJJerr68j6OveKcOMhiNmBDA2PtcqW/4CAhE9lZRUlKipo5cMPaenhHC3NP6Rlvi3M06PFJVpfXckkx5NJK2yVxQENgajEie6Nt/mcxrvvYlae4LjYwz3jN4QlXfXVerIGIhIBlVVV1NzeTtW1tb5/GEsIwlrxoHvjLfd4OJPp7Eo+8NCtrjG+9nC/AnJOxus6s9oswSr0h0NSTS2tVFN3MO+UyP2shNE44FRAJOicRLd5/fUJa+Q7h65e/9mEHIuSB197uN8ciJT9H5OL7TiRMEIaDzXTBiVQWaUgOifRbTjfofkZH36AA8mFw1jza01yLUpzGg4dyu9ECjqPg9+AC4kHDCA1Gl97uGcBEU0oLbJe+XfmuiRYhVnUNzZZuRGLBGWJRDmpcuRB4gHn5xhNi5+GQj8OREr3YcMOBC4kWjgn0tDcXKJcN8/3UIgVKyaEsUBRPO/l2goIMz5zVIJVmEVFRQXVNjQWfMyJvJ9k/rALBxILNQYk0kFRICD54HLe2whlRU5tXZ3VK5KNoxKrdFEWiBCcoWM8sQhIIAeShM07s93oC4mBusYG8UOLqUUi61u7GOkeC0iiG08sOZCzqlz1m9PHMGQxYiqrqqmqurrADz2oKNZXUIUVC0iiG4/nvdyTgAwNj0kfvnLCDoRFBERLdW1mVlZZtVgJ5EDiBIl0s/G6p3t1IEqEr5zcX2mBiERMdU2tqMjKCEfeBHpOIh2lvPGAMJbxeNrTvQqIUg7EhjvUISLRUlUjwlgFE+jZn8GFxAMciPHAgZQDRCRaOBeSn0TegBYcSDy01mEMjeFE6kCUFRCCiERKld2ZfjBmtY+z73AXifRYgAMxHoSw3MAi8sbdU7SRPHgoEggOPjdkP2zl+GiROCgqKOWNB1RiGU+kISxpZ2C5gauzfnb3FM2saPFwpGV/PtY++cNXJKQEeZB46GxaM/FhgwyeNkHXAqJaCW8puD9kbLKXfjHZCzcSGkXCV1mfoBIrThDGMhsve7sXB+LrCERZ4TJfdiM8+gRNh8GSHbbK/XhQVBDGiocnMNLEdFzv7V4ERCsH4oSFg0ef/OROH4QkBOxukDxdIVlfgYDEAxyI8bje272cSKilA3FiC8nd+U7qbV+k3rYlvLh8U174yoZFpKISAh4lnEjnhsJ1hHJNxfXeDgEpAgvJvflO68YCwmLS07yKihW3FKq+KnRuSCJhJdIhINHDifT1xXbTHjbIEImAaBvC4hfPE01r1nhrFozqIuckpHYrqDKxR4kE+hZKkU6lc8JXB8n9uhXGKjiMEYQF/+5PQkBMJZIQllawSJzqnKeTHQtFBePAhatApVA57FdU5STPs8xHHifC56Pzv7X6SEBk9LSsoMkWlI0XAVG6C93Jme5Z18IB3JFO57qPwiW9mS9nNxVWQkAihV8L7L5xho6RuN7bvbw6j6t+ZflFcvHEBJ3umoN4hExqZ+eAVuQmzwuFtdBQGA+c6wNG4npvN+7tnS0e6LoNHw5D7aZSB+NWRZLn+3+0/z1EJHK4UASAcnAlIEPDY0pXYNnigZLcaEglk4+1g7I/Zj4p7D5s0BMSPVxlyLkQYB5u93i3DkTpCqznj01DPCKC3YMlIOW6DwcJx9+DgMQD9z4BI3G1xxsTwuJ3VEfxrioydra3aY8yJc5luY8iwpKGiEQOv1ZwSiEohRECwqGrc0dnJFiJGfCGb7sPp5tw6z5s4ELigYtMACiGEQLCfR7oHo8GDl0lNzYO9n04f7oL92F9j5PpEJHI4WosuBBQDLcComQPCPd6gPBh8dja2LA+Huj78Og+bFCNFQ9wIcbhao/XXkD4XRR6PcJnXzzYKeSErBJOUXDpPuzvclf6Ho67jRx+/aDk3ShCFRDlQDVJ+HB4aWtjXYhH5seV9hvZFHMfNkimxwNXL+JNGMiH1gLC8Vu8ewoXrrZi8dhN2yGm7MR5EO7D/hwuJB44f4giFJAPrQUEZbvhYbmO9XVKbm1xjjtvtVXuwMRC4lGO+7DJdLaDqLHOxcGIE5CD1tN4cURn8KRTKct1pO2NPOesj2wZcBvIsv9ZYbHBlN74OH9s2jpsan6tydRLAHLQ+lWI8FWAcGf5zg5tb2xQKks8HiuIl9CVG/dh/11UZMVHf+8kpjmAfbQVEE76IfEXIIkEVVVXU/2hQ1TJJwVmHzEYnHiUkSfBkMX4sOfJIZwFSGcBwbukcGBxqGtspERFZf68R5A/tYjYoLEwPlhEOJzF5+kAs0EgGbjGEpH6+oLJcueffbmPYnAoCyISK9xkiOnWZms30TcAABYOSURBVAMBAZ6oqKyk6trarG7zsEJXhfIkVkIdZb2xwnnGz566azkSjD0xD+PPRAfe4ZxIemfH2sSLiocPSomNdextFX6N48Yu851cbKfbc11WtRbQH7zygGcSIrFuHVtbjAAS5wURVVkVKOuVAltIZlZa6O5CB0p+NQcCAnxhuZBU6nEoKezQVR53Y4eyEm6EB4TKUXH+DgvI5FKb5UyAfmgrIHjnExGJhJUPsRoLA+r3KEixBkNuLuTyYiAVnCPh25muOcuRsJDspPE86YLWvn8DcdhIsHIQXsJQaDA0Bnue1gt9d+hcz30k3DXBrYAsq/SwH8KFRAI7kNwkupNQQlcFxAVVWXLDPSR8Ps8X+u5YXe2YFiEdrvZ4tyGscZWuxMxqMzpmI4KT2Pn6MsIWj9y/bwsI8iHyY+dJOFLwzlwX3V9pQXgrflzt8VqHsPALGR37VVBBNgt6BP0hasHhLe4jQXhLPbSvfeQKEBA+VgLbSw4jhAZDQihLSXLDWz04jkF6tC/jvTffiTPRI6bgxh5Bd7oT9IeoizO8heoteXH76lIqB8JwR+y9hQ4JVqI39kYdmHgEBCqz1MZZvcVhLszdCh1Xe3zCrdUfGh5TLjbA1ph/ATHePVySm5vexIOCdx+5wInoA5oTw2NwoN/VC8uIVxVb35vTxyRYiea4FI+CXwvBrSAnog9c+stu5NKzv0HSPWa8CIiSmS2uyMI7logpIR5h5D0Kgcos/UDSPXBcX0AvSXSOkV2I/rH5Z3zmqBVDRRw1eA5szkGIR8CgR0RfnEl3O7yFicCucZ3jNiowzKGs0YkTGHESBk4B8SgeB4go0Q70gZPufNDVF0TSHZ3u4eJFQCZVeoC5sIiMTfaiJDBgdsuYxkslhCCqKi2EssyAp1DwiYlcQHOycx5FNKVxvbcbJyDM8mY9vXH3lPURBANPw/UsHhGV+DpDVxARc7BLgTnpDldSlEgERKmBioXg+CiHsyAiwcD9FqqIhw1ExDycroT/DFeSheu93YuAKNdMWAgOY7ETQaOhP8IQj6iAiJiJc/4WGhT3cb2340RCvmr3e6wy3+ePTVu/WMAde84pvAGJR9juwwlOMzQXdiD2MbwcjeA3kxjCWj6uO9FJ0W70cuBfpjPds5id5QL+/UklhegqKB5e/y7QFxYPFhEWE5NC3G670AkOJBv+xWE3wgMYOel2FI1JJbGOsqUyx5NQtOLhFjgRQHAlrvAqIDdUbSYsB06wc6kvx0XZjeBQqvxw7sNysJKKhxcxgIgAJ7wHcI6E31Bq7kpuePlHXgVEi0qsUvAvCs/Quj3XZbmR3rYlJNsEvNHuuw9BsZAVFenzIEnEwwYiAnIxwJV42tO9Cghn61/0+G+VwxoJP99p3XhwG4vJE43rVj25qWWAuoqHDUQEFEJTV+KputargCjfTOgVFhN7KCNXbJnoSFKp1OO5UvYXywlZ5fl7MoqHDUQEFEMzV+JpT4eAuMCu0uJQlqnOI7Wzky0ehTbYGMQjDCAioBw0cCWe9nRPZbykcSlvIXiWzpmuOWOFw855yCweYW70EBHgFhYQezKw7K7ESwkv+SzjnSKi4z7+vRI0io5Vk+fn7KbTlBbNgqVCVpSb78j5u0X/vQ/C3uDhRIBb2JWc49vRGUtEWEz4NEUJmfK6JD8CMqm7gPAvAM/NMdp1pNPWoMSSG3+MIauoNnaICPCKnSvhoyTuLnTI5ko8pyT8CMiozr0gJosH93dYPR48YbeMcBWVcB0l78MHUW/oEBHgB3sysGSuZNTrP/QjINoMVczFRPGwmwL37ObAcsJNhU4Q1FQ8bCAiIAgkciWe93IISA4sGny+stbiIc4H59zGXp6JtOUIB5XrOordjw/i3sAhIiAonK5kZqXFciVcyRUhnvdyz1VYpGklFifMTRpdYoWrWEh4Q7S/WGxjjNl1kCQVURAPECZRnu3utQKLAhimqNVMLK60Mm3uVUVFhXVjEdkVOY+8lOk6yADxACBs7LPd+RayK/E0A8vGr4BolUjnPg9TqaispIQQkixXWkg4KNqQFUkkHhAxECU8OolvnB9hIeGRSgG6Es8JdApAQLTJg3Di3PSzknljrKyqyriR3ER69l88+KUCXw9ybTIA8QBxwXlZng7ON67cskNcPvG1h0NABBjZ/hjLjYgkexaFhIMgHgBECb/Z5ZtVDiyExOPoFF97uK8kOmUS6Vo0FPLZyDjONps9p4hEHK56fPfybNoQECAzHgY6Tg0O9Pf6eUhBnEg4rrqAsDWEeByEN0x2I7nJ9aiGIEI8ACgfDwMdfUeQghCQUdXPBsEhUYXhjZNvZZf5BvhzZQHiAVTCOWa+RJOirwQ6BSggStMI91EUu8zXNOEgiAdQnBKjU3zv3b5zIJTJg/BxiJG2TgYJn/Fx2uAS3nIp2icSABAPAMKHXcm7Cx1bX/zuJd8HllQEtFrlXQgojUnnbUA8gK40ZI7l9nQGei4QEHFMLShNWJsqNmsAomU9WfO/g/iBEBAIiCuC3OztBL1sQNCA7ixtNPxNEA8xEAEZHOgf93OqVdxsQEAiR9ZNGuIBdGdzpzr14uUXfxrEwwzKgZDKLoQdCESkPPxusLK6DoJ4AENY3aoL7M1+kAIyEuB9Rc5DOc8qlhKvG63MGzTEA5jCWrLmb4N6qHAggpnVZinWoSMyuw6CeADDSKaq/jqoRxyYgAwO9C/7nS0fJ9z6jzBW8Mi+OUM8gEksbdYvf/7bX5YyhEWqh7G45R+UppxNV3bXQRAPYCCrW3WBRoogIA74oBa4EP+osDFDPICJbO5UDwf5sAMVkMGBfh7tfivI+4ya8ZmjKi8/EgqNv1HBdRDEAxjKo+3azc996ys/D/LRB+1ASPVkOudCZsI5e1hbVBEOgngAg1ncaPh10I8+DAG5HsJ9Rsrb08e8nu5lFCoJB0E8gOFsp6peCfoKBDKNNxcdTinkM0IunpiwZuuDbML4nQkbiAcwGe4+/0f/7F9WB30JwnAgpHoyncTxkKMTJ8o9GhJIDMQDmM7SZv1vwrgEYQmI8mEsgojkRTX3AfEAgOjho0P/NozLEEoIizJhLB6weDaUO48YPrHwD3oncfStQgIC4QAgA1dfPfvCnzaEcTnCciCkiwshMWyRnQgfCQnkB+IBwGMWNxpeD+tyhCkgyudBnHAY6+b0MfrFZK+xzYYquA+IBwDZBN086CS0EBZlwljcE3IhtB8QE1yZdapznk52LBhTpQXxAEA95teaFj526budYS08TAdCOoWxnLAbeWe2m35yp49uz3UhyS4BEA8ADrKWrHktzMsSqgOhjAvhKb3at3b3ti9Sb9sSdTatSbCaYJHZfUA4AMjPTrpy75nP/atQTUJVBNeecyGXI/g5scIJdr5xSOt3j9ynJ1tXqKZyV+nHJHvYCuIBQGEWNxreC/vyhB3CYq5F8DOkgcNZf//bp+i13/wOvf3BMZp71EC7u7vWZuy8yQ7EAwC1WdmqC6X3w0noISzSrCfEC52Na9TX9cD6mA/nZhjnxohEOQB6EGbvh5MoHAiZ5kJymV9vor977yT93fsn6YPlw/tDCPMNI8x1KmFv6iq5IogHAOWxsN74X6K4VJE4EDIomV4O3Nl+umuWjrctyr9YCYBwAFA+USTPbaJyIKRrSa8XuLP95vRT9D//4TRNLaG7vRgQDwDcMbPa/HZUlyxKATE6jJUPCElhVDtrBABZ2NypHoxqKZGFsCgTxrpuQkmvVxDaygDhAMAbc48OTTz/0h8/E9Xli9KBEMJYxbEdyY33nrES76YB1wGAPx5t1/6nKC9hpA6ENJ6PFQbc1c6OpFD5ry5ANADwz9Jm/fK5L/5JW5SXMmoHQnAh5TO/1kQ3Jp7R1pHAcQAQHMub9f896ssZuQMhTc5MjwN2JOeO3qeWOvUPtoJwABAcYZ15Xoo4HAjzckw/V2nYkbxx96P0f6afUvZMErgOAIJn9tGhH8VxWWNxIAQXEgi9bYtWjqShJin9WiEaAIRDXO6DYnQgBBfin8mldnrj3kfp9ly3tGeSwHEAEC5xuQ+K04EQXEig8Bj5kx3z1i3uUxIhGABEQ5zug2J2IAQXEhzsQNiJ/DTGrna4DQCiJU73QXE7EIILCY0ou9ohGgBET9zugyRwIAQXEg5hd7UXGkcPAIiGuN0HyeBACC4kEoLqIYFgABA/MrgPksSBEFxI+PjpIYHbAEAuZHAfJIsDIRx7GzlcrcU5kkIVWxALAORkcaNh7bl/fuWQDIuTxYEwVyVYgzHcW+i0KracPSRwGgDIz+JGw7+TZZHSOBDCpN7YyFRszVFvO47YBUBm4pi4WwyZHAhzRYI1GEemYusY/fROn5UrAQDIydyjQ1+UaWFSORDKuBA++vb7EizFWLhi60zXnPURACAHM6vN47//pe88J9PTIZsDIVGRtSLBOoyFXcjoxAnLlag69RcAndhJV+6tbNZfku0hSScggwP9yyjrlYPJxXb6yZ0+uj3XJe2wRgBMYGqp7b9+/ttfnpLtoUoXwrJBWa9ccLnvqc55K9kOAIiOR9u1m8++8KcNMl5yGUNYNijrlQh2IO/MdluJdnYmAIBomFps/zNZL7W0DoSQUJcaJNoBCB8ZE+dOZHYghIS6vNiJdr4h0Q5A8MiaOHcitYCIhDp6QySGhYQT7VyxhUQ7AMHxwXLrX8mYOHcidQjLBh3qamAn2k92LMR+KiIAKjO/1rTwsUvf7ZT9IcgewrK5glCW/NiJdrv0FwDgHg5dfbjR8JIKl04JB0IZF8JVWa9IsBRQJjxji+drwZEAUD5TS20jn/jqNyEgQYNQlpogtAVAecg2LLEUqoSwbBDKUhA7tDXym2etZPvyZr3plwSAA3DoSrZhiaVQyoFQxoWwiPxQgqUAH7TWb1qOpKdlBa4EACJ6f7H9P1/82jf+hUrXQjkBoYyIjBDRixIsBfiExYNFpLdtCU2JwFgW1htn/8mLl4+o9virJFiDF9iFTBJRi3pLB044vMWjUfjGSfejQkzYoQBgAhy6ml9r+j0VH6qSDoQyLuQiEb0lwVJACLCYsCPpaV61PiLMBXTl3YWOP//0N752TcWHp6yAEGZlGQWLyBNNa9TZuI5QF9AG2WddlUJpASGMfTcWW1Ba67ascFdDTdL0SwIUQ+Yx7eWiag7ECQ8bG0c+xCx4Bpfz/HYOcbGQsKg0VO/sh8AAkBHOe9xfafmjZxV/dpR3IJRxISwiP5ZgKUAybGGpER8ZDoOR43sARM3Eh4f/8lNf//pfqH7htRAQQj4EBECuY2EX01giNGaJUN1Wwe+zQKEAADhRPe/hRBsBIYw6AZLirCjjMmVgLqqNKimFDjkQJ5fQHwJkYz1ZQ+ui18VunISYmAfnPWZXm8/p9MC1ciCUcSH8BP1KgqUAUBQWE55WfKpjAVVkBnB3vvMbn/3mV/+bTo9UOwEhzMsCCsIhLu7AZ0EB+qHinKty0FJACEl1oChwJfqhU9I8F20FhJBUB4rDuRKeWIx+FnVR5Whar+iWRM+Fk+qj6FQHKnJ/pcW6cRXX6a45hLcUgzvNF9YbP6bzY9TagVDGhfSiUx3oAE52VAeuuJr48PAnPvetr/xc58epvYDQ48qsUYgI0AV2I2e65pAnkRAWj/cX27+pW8VVPowQEEJlFtAU5Enk4+5853/87De/+mcmPFZjBIQgIkBjWEC4cgvNifGia7luIYwSEMqIyMtE9AMJlgJA4CDhHh+/XW690f+Vb1006TEbJyCUEZHrRHRZgqUAEAosJCc7563mRCTcw2fu0aGJ51/642d0f5y5GCkgBBEBhoDKrfAxVTzIZAEhiAgwCAhJOJgsHmS6gBC61YGBoAQ4GHTvMi+HCvmXGDrcrX5L88cIwD48Vv4nd/ro5vQx2kjW4MJ4wIQu83Iw3oFQxoW0YuQJMBU4EnewePx2ubXv89/+8pRK6w4DCIgAIgJMh4WEcyQ4J74wEI9sICAOICIAZJoS2ZGguz0biMdBICA5CBG5huosYDoQksc8WG2eXt6s/zjEIxsISAFQ4gtABtOFxPRS3WJAQIoAEQHgMSYKCcSjOBCQEkBEAMjGFCGBeJQGAlIGmOILwEF0FhLTpup6BQJSJhARAPKjm5BAPMoHAuKCoeExHtU8gpMNATiI6kLCJwlOLbX9609/42vXJFiOEkBAXCKOx2UROa7UwgGICBWFZHOnOjW93PodE46hDRIIiAfQcAhAaVQREjQIegcC4hE0HAJQHjILCVdaLW40fBri4Q0IiE9wRC4A5SGbkJh4BG3QQEACYGh4jEfCX0dyHYDSxC0knCz/YLn1rz719a//BZ4uf0BAAkIk168jLwJAebCAnDs6E+n0X853PFht/hMky4MBAhIgIi/CIvKiNg8KgJCJ6jyShfXG2fm1pt9DviM4ICAhMDQ8dpWIXtHugQEQImEKydRS28gnvvrNl/D8BQsEJCTQLwKAN4IUEvR3hAsEJEQQ0gLAO36FBCGr8IGARABCWgB4x62Q7KQraWa1GSGrCICARASqtADwx5nuWevM9urKdMH7QZVVtEBAImZoeIy7179v1IMGICBYPE51zucVkpnV5vHf/9J3nsO1jg4ISAyIqb7XkWAHwBtOIUntVqTur7T8G0zRjR4ISEyIBPvLcCMAeKe+euevTxz+8C+RKI8HCEjMwI0A4AkWjCuDA/2juHzxUWHqA5cF8QLgBPt/MP1aAFAm/Fo5B/GIHzgQiUClFgBFuSVcxzgukxxAQCRE9I28jOm+AFis8OthcKAfSXLJgIBICg6sAsDiR0R0dXCgfxmXQz4gIJIjkuzXENYChnFLCAfyHBIDAVGEoeGxK0JIENYCOrMihOM6nmX5gYAohAhrXRU3CAnQiRXxBukawlXqAAFRkKHhsV6RZEd+BOjAj0SSfBLPplpAQBRGCMk1jIsHivKaCFdBOBQFAqIBItHOjuSC6dcCKMEN4TiQIFccCIhGQEiA5EA4NAMCoiFCSK4itAUk4TWRHIdwaAYERGOQbAcxg+S45kBADEAICTuSKyj/BSGzIua5XYNw6A8ExCBEH8kVISYYHw+CZEpUBF5HH4c5QEAMZWh47JIQEiTcgR9uCLcxgqtoHhAQw0F4C3gAYSpgAQEB+4h5W5dQvQUKwNVUI5hTBWwgIOAAwpVcQq4EOHIbI3AbIBcICCiKOCXRdiYQEzNg0RgRCXGc/gcKAgEBZQMx0RqIBnANBAR4AmKiBRAN4AsICPCNI2dyCWXB0nNDiAZyGsA3EBAQKKJZ8aK4wZ3Ej+0yeA7VKJr8QJBAQECoCHdy0XGDoITLlC0WQjDgMkBoQEBApAhBOScE5RxCXr7hkNS4EIxxCAaIEggIiB0xfv6c43YWz0pebgmxGBdigfHoIFYgIEBKRJUX3+wQWKtBwsJCsSxcxaQQC1RJAemAgAClEMJiJ+rJ8VG1UNgN8XHU8XEZQgFUAgICtMIhMOQQl9w/UwiCcyPn89E8f4ZAAK2AgAAAAHAPEf1/dN+az09WRuMAAAAASUVORK5CYII="
    //           />
    //         </defs>
    //       </svg>
    //       <Label
    //         style={{
    //           margin: "0 auto",
    //           width: "300px",
    //           textAlign: "center",
    //         }}
    //       >
    //         Successfully Approver flow Changed
    //       </Label>

    //       <DialogFooter>
    //         <DefaultButton onClick={toggleHideDialog} text="Close" />
    //       </DialogFooter>
    //     </Dialog>
    //   </div>
    // </div>

    <div style={{ marginTop: "50px", marginLeft: "3%" }}>
      <style>{styl}</style>
      <div>
        <Form
          name="basic"
          layout="vertical"
          onFinish={() => Handlechange()}
          autoComplete="off"
          style={{ maxWidth: "100%" }}
          form={form}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Document Level"
                name="Document Level"
                style={{ maxWidth: 300 }}
                rules={[
                  { required: true, message: "Please select document level" },
                ]}
              >
                <Select
                  placeholder="Select level"
                  onChange={(event, option) => HandleLevel(event, option)}
                >
                  {levelitems &&
                    levelitems.map((option: any) => (
                      <Select.Option key={option.Key} value={option.Key}>
                        {option.Key}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Department"
                name="Department"
                style={{ maxWidth: 300 }}
                rules={[
                  { required: true, message: "Please select department" },
                ]}
              >
                <Select
                  placeholder="Select Department"
                  onChange={(event, option) => HandleDepartment(event, option)}
                >
                  {Departmentitems &&
                    Departmentitems.map((option: any) => (
                      <Select.Option key={option.key} value={option.text}>
                        {option.key}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              {!sub_Status ? (
                <Form.Item
                  label="Sub-Department"
                  name="Sub-Department"
                  style={{ maxWidth: 300 }}
                  rules={[
                    { required: true, message: "Please select sub-department" },
                  ]}
                >
                  <Select
                    placeholder="Select Sub-Department"
                    onChange={(event, option) =>
                      HandleSubDepartment(event, option)
                    }
                  >
                    {SubDepartmentlist.map((option: any) => (
                      <Select.Option key={option.key} value={option.text}>
                        {option.text}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
          {approveshow ? (
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Approver 2"
                  name="Approver 2"
                  style={{ maxWidth: 300 }}
                  rules={[
                    { required: true, message: "Please select Approver 2" },
                  ]}
                >
                  <Select
                    placeholder="Select Approver"
                    onChange={(event, option) => HandleApproverA(event, option)}
                    labelInValue
                  >
                    {ApproverA &&
                      ApproverA.map((option: any) => (
                        <Select.Option
                          key={option.Key}
                          value={option.Key}
                          data-option={JSON.stringify(option)}
                        >
                          {option.text}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Approver 3"
                  name="Approver 3"
                  style={{ maxWidth: 300 }}
                  rules={[
                    { required: true, message: "Please select Approver 3" },
                  ]}
                >
                  <Select
                    placeholder="Select Approver"
                    onChange={(event, option) => HandleApproverB(event, option)}
                    labelInValue
                  >
                    {ApproverA &&
                      ApproverA.map((option: any) => (
                        <Select.Option
                          key={option.Key}
                          value={option.text}
                          data-option={JSON.stringify(option)}
                        >
                          {option.text}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <div></div>
          )}
          <div style={{ marginTop: "30px" }}>
            <Form.Item
              label="Approver Info"
              style={{ fontWeight: "600", fontSize: "18px" }}
              validateStatus={errmsgApprover ? "error" : ""}
              help={errmsgApprover ? errmsgApprover : ""}
            ></Form.Item>
            <Form.Item style={{ marginTop: "2px" }}>
              <Card style={{ width: 360 }}>
                <p>
                  <Avatar size={50} style={{ backgroundColor: "#87d068" }}>
                    {Approver_A.Name && Approver_A.Name.length >= 2
                      ? Approver_A.Name.slice(0, 2)
                      : Approver_A.Name}
                  </Avatar>
                  <span style={{ marginLeft: "20px", fontSize: "16px" }}>
                    {Approver_A.Name}
                  </span>
                  <span
                    style={{
                      marginLeft: "20px",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    File Reviewer
                  </span>
                </p>
              </Card>
              <Card style={{ width: 360 }}>
                <p>
                  <Avatar size={50} style={{ backgroundColor: "#87d068" }}>
                    {Approver_B.Name && Approver_B.Name.length >= 2
                      ? Approver_B.Name.slice(0, 2)
                      : Approver_B.Name}
                  </Avatar>
                  <span style={{ marginLeft: "20px", fontSize: "16px" }}>
                    {Approver_B.Name}
                  </span>
                  <span
                    style={{
                      marginLeft: "20px",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    File Approver
                  </span>
                </p>
              </Card>
            </Form.Item>

            <Form.Item
              style={{
                marginTop: 50,
                // display: "flex",
                // justifyContent: "flex-end",
                textAlign: "end",
              }}
            >
              <Row gutter={24}>
                <Col span={23}>
                  <Button
                    htmlType="submit"
                    style={{
                      width: "149px",
                      backgroundColor: "rgba(74, 173, 146, 1)",
                      color: "white",
                    }}
                    // onClick={() => {
                    //   Handlechange();
                    // }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
