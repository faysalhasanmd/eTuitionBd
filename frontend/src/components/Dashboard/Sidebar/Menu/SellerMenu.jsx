import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Student Post"
        address="manage-student-post"
      />
      <MenuItem
        icon={MdHomeWork}
        label="My Applied Tuition"
        address="my-applied-tuition"
      />
      <MenuItem
        icon={MdHomeWork}
        label="Tutor Ongoing Tuitions"
        address="tutor-ongoing-tuitions"
      />
      <MenuItem
        icon={MdHomeWork}
        label="Revenue History"
        address="revenue-history"
      />
    </>
  );
};

export default SellerMenu;
