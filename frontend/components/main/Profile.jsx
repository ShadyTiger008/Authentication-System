import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formattedDateAndTime } from '../../utils/formatDate';
import { useMainContext } from '../../context/MainContext';
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useMainContext();
  const [ toggleEdit, setToggleEdit ] = useState(false);
  
  const handleLogout = async () => {
    await axios.get(`http://localhost:8000/api/v1/users/logout/${user?._id}`);
    localStorage.clear("userId")
    setUser(null)
    window.location.assign("/login")
  }

  const statusLabel = [
    {
      id: 1,
      label: "Active"
    },
    {
      id: 2,
      label: "Inactive"
    },
    {
      id: 3,
      label: "Busy"
    },
    {
      id: 4,
      label: "Available"
    },
    {
      id: 5,
      label: "Unavailable"
    },
  ]

  const changeUserStatus = async (status) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/update-status/65aabd58e4543155103180e5`, {
        status
      })
      console.log(response.data.data.updatedUser);
      setToggleEdit(false)
      setUser(response.data.data.updatedUser)
      toast.success("Status successfully updated");
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
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
              <div className={`flex gap-2 items-center ${toggleEdit ? "flex-col" : "flex-row"}`}>
                { !toggleEdit ?
                <p className="text-sm font-semibold">{ user?.status }</p>
                :
                <>
                  { statusLabel.map((status) => (
                    <div key={status.id} className='cursor-pointer' onClick={() => changeUserStatus(status.label)}>
                      {status.label}
                    </div>
                  ))}
                </> }
              <CiEdit onClick={() => setToggleEdit(!toggleEdit)}/>
              </div>
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
