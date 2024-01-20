import React from "react";
import { NavLink } from "react-router-dom";

const RouteSection = ({ isToggle }) => (
  <div>
    <ul className={`${isToggle ? "flex" : "hidden"} sm:flex flex-col gap-2 p-2`}>
      <NavLink to='/' className={`w-fill p-2 bg-gray-300 hover:bg-gray-500 rounded-lg`}>Home</NavLink>
      <NavLink to='/register' className={`w-fill p-2 bg-gray-300 hover:bg-gray-500 rounded-lg`}>Register</NavLink>
      <NavLink to='/login' className={`w-fill p-2 bg-gray-300 hover:bg-gray-500 rounded-lg`}>Login</NavLink>
      <NavLink to='/profile' className={`w-fill p-2 bg-gray-300 hover:bg-gray-500 rounded-lg`}>Profile</NavLink>
    </ul>
  </div>
);

export default RouteSection