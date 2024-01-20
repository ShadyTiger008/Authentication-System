import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formattedDate, formattedDateAndTime } from '../../utils/formatDate';
import { useMainContext } from '../../context/MainContext';


const Profile = () => {
  const { user, setUser } = useMainContext();
  
  const handleLogout = async () => {
    await axios.get(`http://localhost:8000/api/v1/users/logout/${user?._id}`);
    localStorage.clear("userId")
    setUser(null)
    window.location.assign("/login")
  }

  return (
    <main className="flex flex-col items-center justify-center h-full px-5">
      {user ? (<div className="w-full sm:w-9/12 flex flex-col justify-center items-center bg-blue-500 text-white p-8 rounded-lg shadow-lg">
        <img
          src={user?.avatar}
          alt="Profile"
          className="rounded-full h-20 w-20 mb-4"
        />
        <div className='w-full sm:w-1/2 flex flex-col justify-center items-center gap-3'>
          <h2 className="text-2xl font-bold mb-2">{ user?.name }</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <p className="text-lg font-semibold text-gray-100">Email:</p>
              <p className="text-lg font-bold text-wrap">{ user?.email }</p>
            </div>
          <p className="text-gray-300 mb-4 text-center">{user?.bio}</p>
          <div className="w-full flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 mb-1">Occupation:</p>
              <p className="text-sm font-semibold">{ user?.occupation }</p>
            </div>
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 mb-1">Status:</p>
              <p className="text-sm font-semibold">{user?.status}</p>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-between">
            
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 mb-1">Joined:</p>
              <p className="text-sm font-semibold">{formattedDateAndTime(user?.createdAt)}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-1">Last Login:</p>
              <p className="text-sm font-semibold">{formattedDateAndTime(user?.updatedAt)}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-5 bg-red-500 hover:bg-red-600 px-10 py-2 rounded-md hover:rounded-2xl cursor-pointer transition-all duration-300 font-semibold">
          Logout
        </button>
      </div>) : <div className='w-full h-20 bg-blue-400 flex justify-center items-center text-wrap font-semibold text-lg sm:text-2xl text-white rounded-lg '>Log in to see user profile</div>}
    </main>
  );
};

export default Profile;
