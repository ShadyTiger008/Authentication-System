import React from "react";
import { useMainContext } from "../../context/MainContext";
import { Link } from "react-router-dom";

const ProfileSection = ({ isToggle }) => {
  const { user } = useMainContext();

  return (
    <>
      { user ? (
          <div className={ `${ isToggle ? "flex" : "hidden" } p-3 sm:flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-white bg-zinc-800` }>
          <Link to="/profile">
             <img src={user?.avatar} alt="User Avatar" className="w-8 sm:w-12 h-8 sm:h-12 rounded-full" />
          </Link>
        <div className="flex flex-col">
          <div className="text-md sm:text-xl font-semibold">{user?.name}</div>
          <div className="text-xs sm:text-sm">{user?.email}</div>
        </div>
        </div>
      ) : <div className="w-full h-10 justify-center items-center text-white">
          <span>Login</span>
      </div> }
    </>
  );
};

export default ProfileSection;
