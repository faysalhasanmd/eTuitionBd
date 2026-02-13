import { BsFillHouseAddFill, BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal";

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Tuition"
        address="add-tuition"
      />
      <MenuItem icon={BsFingerprint} label="My Tuition" address="my-tuition" />
      <MenuItem
        icon={BsFingerprint}
        label="Tutor Applied Tuition"
        address="tutor-applied-tuition"
      />

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform text-gray-600 hover:bg-gray-300 hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />
        <span className="mx-4 font-medium">Become A Seller</span>
      </div>

      {/* Fix here: PascalCase */}
      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default CustomerMenu;
