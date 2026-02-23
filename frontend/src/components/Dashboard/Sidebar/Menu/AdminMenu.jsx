import { FaUserCog } from "react-icons/fa";
import { MdOutlineManageHistory } from "react-icons/md";

import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Admin Statistics"
        address="admin-statistics"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Student Post"
        address="manage-student-post"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaUserCog}
        label="Reports & Analytics"
        address="reports-analytics"
      />
    </>
  );
};

export default AdminMenu;
