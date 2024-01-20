import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import RouteSection from "./sidebar/RouteSection";
import ProfileSection from "./sidebar/ProfileSections";
import { MdOutlineMenuOpen } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import LogoSection from "./sidebar/LogoSection";

const Sidebar = ({ isToggle, setIsToggle }) => (
  <section className={ `bg-[#0d1117] transition-all duration-300 ${ isToggle ? 'w-11/12' : 'w-14' } sm:w-1/4 max-h-screen flex flex-col justify-between` }>
    {/* Upper Section */}
    <div className='flex flex-col gap-5'>
      <LogoSection isToggle={isToggle} setIsToggle={setIsToggle} />
        {/* All Routes */}
      <RouteSection isToggle={isToggle} />
    </div>
    {/* Bottom Section */ }
    <ProfileSection isToggle={isToggle} />
  </section>
);

export default Sidebar;
