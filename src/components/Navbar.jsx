import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Logo from "../assets/devchallenges.svg";
import defaultAvatar from "../assets/avatar-default.svg";
import { Dropdown } from "./Profile/DropDown";


const Navbar = ({ logout, data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between flex-row items-center pl-[1rem] pr-[1rem] sm:pl-[3rem] sm:pr-[3rem] lg:px-40 py-5">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="flex-shrink-0" />
      </div>

      <div
        className="flex items-center flex-row space-x-2 cursor-pointer select-none"
        onClick={toggleDropdown}
      >
        {data[0] && data[0].picture ? (
          <img
            src={'http://localhost:3001/uploads/' + data[0].picture}
            alt="User Avatar"
            className="border w-[4.5rem] h-[4.5rem] rounded-lg"
          />
        ) : (
          <img
            src={defaultAvatar}
            alt="User Avatar"
            className="border w-[4.5rem] h-[4.5rem] rounded-lg"
          />
        )}
        <p>{data[0] && data[0].email}</p>
        {!isDropdownOpen ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
      </div>
      {isDropdownOpen && <Dropdown logout={logout} />}
    </div>
  );
};

export default Navbar;
