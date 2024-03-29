import "@pnp/sp/lists";
import { getSp } from "../../../../helpers/PnPConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/items/get-all";

export async function getSitelist() {
  const sp:SPFI=getSp()
  const items: any[] = await sp.web.lists
    .getByTitle("User Files")
    .items.filter(`Status eq 'Pending'`)
    .getAll();
  return items;
}

export async function getEditSitelist() {
  const sp:SPFI=getSp()

  console.log("hello")
  const items: any[] = await sp.web.lists
    .getByTitle("User Files")
    .items.filter(`ApprovalStatus eq 'APPROVER 2' or ApprovalStatus eq 'APPROVER 3'`)
    .getAll();
  return items;
}

export async function Get_departmentusers(Dept){
  const sp:SPFI=getSp()
 return await sp.web.lists.getByTitle("Approverlist").items.filter(`Department eq '${Dept}'`).getAll();


}
// export async function getRequestlevellist() {
//   const sp:SPFI=getSp();
//   const items: any[] = await sp.web.lists.getByTitle("Request Level").items()
//   return items;
// }

export async function getRequestlevellist() {
  const sp: SPFI = getSp();
  const items:any[] = await sp.web.lists.getByTitle("Request Level").items.getAll();
  return items;
}


export async function getName(mailID){
  const sp:SPFI=getSp()
 let a:any= await sp.web.lists
            .getByTitle("Approverlist")
            .items.filter(`EmailID eq '${mailID}'`)
            .getAll()
            return a
}
// export async function getUserDetails(Approver1, Approver2) {
//   const sp:SPFI=getSp()
//   const items: any[] = await sp.web.lists
//     .getByTitle("UserDetails")
//     .items.select(`${Approver1},${Approver2}`)
//     .filter(`UserMailID eq '${await (await sp.web.currentUser()).Email}'`)
//     .getAll();
//   return [items, Approver1, Approver2];
// }

// export async function getUserDetails() {
//   const sp:SPFI=getSp()
//   const items: any[] = await sp.web.lists
//     .getByTitle("UserDetails")
//     .items
//     .filter(`UserMailID eq '${await (await sp.web.currentUser()).Email}'`)
//     .getAll();
//   return items;
// }

export async function getUserDetails() {
  const sp: SPFI = getSp();
  // const currentUserEmail = (await sp.web.currentUser()).Email;
  
  const items: any[] = await sp.web.lists.getByTitle("UserDetails")
    .items
    .filter(`EmailID eq '${await (await sp.web.currentUser()).Email}'`)
.select("QMS","Fileuploader", "Approver") 
    .getAll();

  console.log(items); 

  return items;
}



export async function getInitialApprovers(Department, Level, SubDepartment) {
  const sp:SPFI=getSp()
  console.log({ Department, Level, SubDepartment });
  let items: any[];
  if (SubDepartment == "")
    items = await sp.web.lists
      .getByTitle("Approverlist")
      .items.filter(
        `Department eq '${Department}' and Level eq '${Level}' `
      )
      .getAll();
  else
    items = await sp.web.lists
      .getByTitle("Approverlist")
      .items.filter(
        `Department eq '${Department}' and Level eq '${Level}' and SubDepartment eq '${SubDepartment}'`
      )
      .getAll();

  return items;
}



export async function getApprover1(Department, Level, SubDepartment) {
  const sp:SPFI=getSp()
  let items: any[];
  if (SubDepartment == "" || SubDepartment == null)
    items = await sp.web.lists
      .getByTitle("Final Appover")
      .items.filter(
        `Department eq '${Department}' and Level eq '${Level}' and ApproverLevel eq 'APPROVER 2'`
      )
      .getAll();
  else
    items = await sp.web.lists
      .getByTitle("Final Appover")
      .items.filter(
        `Department eq '${Department}' and Level eq '${Level}' and ApproverLevel eq 'APPROVER 2' and SubDepartment eq '${SubDepartment}'`
      )
      .getAll();
  if (items.length == 0) {
    items = [
      {
        Name: "Not Assigned",
       // Authority: "Not Assigned",
        EmailID: "Not Assigned",
      },
    ];
  }

  return items[0];
}

export async function getApprover2(Department, Level, SubDepartment) {
  const sp:SPFI=getSp()
  let items: any[];
  if (SubDepartment == "" || SubDepartment == null)
    items = await sp.web.lists
      .getByTitle("Final Appover")
      .items.filter(
        `Department eq '${Department}' and Level eq '${Level}' and ApproverLevel eq 'APPROVER 3'`
      )
      .getAll();
  else
    items = await sp.web.lists
      .getByTitle("Final Appover")
      .items.filter(
        `Department eq '${Department}' and Level eq '${Level}' and ApproverLevel eq 'APPROVER 3' and SubDepartment eq '${SubDepartment}'`
      )
      .getAll();
  if (items.length == 0) {
    items = [
      {
        Name: "Not Assigned",
       // Authority: "Not Assigned",
        EmailID: "Not Assigned",
      },
    ];
  }
  return items[0];
}


export async function getQMSApprover()
{
  const sp:SPFI=getSp()
  let  items = await sp.web.lists
      .getByTitle("Final Appover")
      .items.filter(
        `ApproverLevel eq 'APPROVER 4'`
      ).getAll();
      console.log(items)
      return items
}


export async function getDepartmentlist() {
  const sp:SPFI=getSp()
  const items: any[] = await sp.web.lists.getByTitle("Department Names").items();

  return items;
}
export async function getDepartmentlistedit() {
  const sp: SPFI = getSp();

  let a = await sp.web.lists.getByTitle("Department Names").items();
  var dept: { name: string; code: string; links: { name: string; key: string; url: string; code: string; Id: string; Dept: string }[]; Id: string }[] = a.map(x => ({ "name": x.Departments, "code": x.Code, "links": [], "Id": x.ID }));

  let req = a.map(async val => await sp.web.lists.getByTitle("Sub departments Main").items.filter(`ParentFolders eq '${val.Departments}'`).getAll());

  let aaa: Promise<{ name: string; code: string; links: { name: string; key: string; url: string; code: string; Id: string; Dept: string }[]; Id: string }[]> = Promise.all(req).then(async res => {
    console.log(res);

    console.log(dept);

    for (let i = 0; i < dept.length; i++) {
      console.log(dept[i]);
      dept[i].links = (res[i] as { SubFolders: string; Code: string; ID: string; ParentFolders: string }[]).map(v => ({ "name": v.SubFolders, "key": v.SubFolders, url: "", "code": v.Code, "Id": v.ID, "Dept": v.ParentFolders }));
    }

    return dept;
  });

  return aaa;
}

export async function getSubDepartmentlist(Department) {
  const sp:SPFI=getSp()
  let list: any = [];
  console.log("Department:", Department); // Log the department value

  const items: any[] = await sp.web.lists
    .getByTitle("Sub departments Main")
    .items.filter(`ParentFolders eq '${Department}'`)
    .getAll();
  if (items.length != 0) {
    items.map(async (val) => {
      await list.push({
        text: val.SubFolders,
        key: val.Code,
      });
    });
  }

  return list;
}
export async function getProjectlist(){
const sp:SPFI=getSp()
const items:any=await sp.web.lists.getByTitle("Project List").items().then(res=>res.map(val=>({"name":val.ProjectName,"code":val.ProjectID,"Id":val.ID})))
return [{"name":"Projects",links:items}]
}
