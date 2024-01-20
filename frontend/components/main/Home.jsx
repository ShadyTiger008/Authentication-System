import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formattedDate } from '../../utils/formatDate';
import { useMainContext } from '../../context/MainContext';

const statusLabel = [
  { id: 1, label: "Active", textColor: "text-emerald-700" },
  { id: 2, label: "Inactive", textColor: "text-gray-700" },
  { id: 3, label: "Busy", textColor: "text-red-700" },
  { id: 4, label: "Available", textColor: "text-blue-700" },
  { id: 5, label: "Unavailable", textColor: "text-pink-700" },
];

const Home = () => {
  const { user } = useMainContext();
  const [query, setQuery] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ selectedStatus, setSelectedStatus ] = useState('');
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  let userId
  useEffect(() => {
    userId = JSON.parse(localStorage.getItem("userId"));
    getAllUsers(userId);
  }, []);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/get-user", { email: query });
      setResponseData(response.data.data.users);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Couldn't find user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserByStatus = async (status) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/users-status/${user._id}`, {
        status: selectedStatus,
      });
      setResponseData(response.data.data.FoundUsers);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching user by status:", error);
      toast.error("Couldn't find users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStatus) {
      getUserByStatus()
   }
  }, [selectedStatus])

  const getAllUsers = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/get-all-users/${userId}`);
      setResponseData(response.data?.data?.Allusers);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching all users:", error);
      toast.error("Couldn't find users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchByCreatedAt = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/created-at-user/${user._id}`, {
        startDate: startDate,
        endDate: endDate
      })
      setResponseData(response.data?.data?.User);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching all users:", error);
      toast.error("Couldn't find users", error);
    } finally {
      setIsLoading(false);
    }
  }

  const searchByLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/created-at-user/${user._id}`, {
        startDate: startDate,
        endDate: endDate
      })
      setResponseData(response.data?.data?.User);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching all users:", error);
      toast.error("Couldn't find users", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      { !isLoading ? (
        <main className="flex flex-col gap-5 items-center justify- h-full p-5">
      <section className="w-full bg-purple-500 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Welcome to Our Website</h2>
        <p className="text-lg text-gray-300 mb-6">
          Explore and discover amazing content.
        </p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by email address"
            onChange={(e) => {setQuery(e.target.value)}}
            className="p-2 border border-white rounded-l-md focus:outline-none text-black w-96 h-10"
          />
          <button
            onClick={getDetails}
            className="bg-gray-200 text-purple-500 p-2 rounded-r-md">
            Search
          </button>
        </div>
      </section>
      <section className='flex flex-row gap-5 w-full'>
        {/* Filter section */}
        <div className='hidden sm:flex bg-indigo-400 h-full w-2/5 rounded-lg flex-col items-center py-3 gap-5'>
          <span className='text-2xl font-bold text-white'>Filter</span>
          <div className='h-px w-full bg-gray-100 my-2'/>
          <div className='flex flex-col justify-center gap-2'>
            <span className='w-full text-center text-xl font-bold text-white'>Status</span>
            <ul>
              {statusLabel?.map((status) => (
                <li key={status.id} className='flex flex-row gap-2 items-center text-lg'>
                  <input
                    type="radio"
                    name="status" // Make sure the name is the same for all radio buttons in the group
                    id={status.label}
                    value={status.label}
                    checked={selectedStatus === status.label}
                    onChange={handleStatusChange}
                  />
                  <label htmlFor={status.label} className={`${status.textColor}`}>
                    {status.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <span className='text-md font-bold text-white'>Joined</span>
                <input
                  type="text"
                  placeholder='Start Date - YYYY-MM-DD (Ex: 2024-01-20)'
                  className='text-xs w-60 h-8 p-2 rounded-lg'
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder='End Date - YYYY-MM-DD (Ex: 2024-01-20)'
                  className='text-xs w-60 h-8 p-2 rounded-lg'
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button
                  className='bg-pink-500 w-full py-2 font-semibold text-white rounded-lg'
                  onClick={ searchByCreatedAt }>
                  Search
                </button>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
                <span className='text-md font-bold text-white'>Last Login</span>
                <input
                  type="text"
                  name="start"
                  placeholder='Start Date - YYYY-MM-DD (Ex: 2024-01-20)'
                  className='text-xs w-60 h-8 p-2 rounded-lg'
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder='End Date - YYYY-MM-DD (Ex: 2024-01-20)'
                  className='text-xs w-60 h-8 p-2 rounded-lg'
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button
                  onClick={searchByLogin}
                  className='bg-pink-500 w-full py-2 font-semibold text-white rounded-lg'>
                  Search
                </button>
          </div>
        </div>
        {/* Data section */}
        { responseData?.length > 0 ? (
          <div className='w-full flex flex-row flex-wrap border-2 rounded-lg justify-center gap-2 p-2'>
          { responseData?.map((user) => (
            <div key={user?._id} className='border w-96 h-96 justify-center bg-blue-300 rounded-md p-5 flex flex-col items-center cursor-pointer text-white hover:bg-blue-500 duration-300 transition-all'>
              <img src={user?.avatar} alt="User Avatar" className="rounded-full h-16 w-16 mb-2 object-fit" />
              <h3 className="text-lg font-bold mb-2">{user?.name}</h3>
              <h3 className="text-sm font-semibold text-center mb-2">{user?.bio}</h3>
              <p className="text-sm text-gray-800 mb-2">{user?.email}</p>
              <p className="text-sm mb-2">{user?.occupation}</p>
              <p className={`text-sm font-semibold ${user?.status === 'Active' ? 'text-emerald-500' : 'text-red-600'}`}>
                {user?.status}
              </p>
              <p className="text-sm text-gray-800 mb-2">
                Joined: {formattedDate(user?.createdAt)}
              </p>
              <p className="text-sm text-gray-800 mb-2">
                Last Login: {formattedDate(user?.updatedAt)}
              </p>
            </div>
            ))}
        </div>
        ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <span className='text-3xl font-semibold'>No user found</span>
            </div>
        )}
      </section>
    </main>
      ) : (
          <div className='w-full h-full justify-center items-center'>
            <span className='text-2xl font-semibold'>Retriving data....</span>
          </div>
      )}
    </>
  );
};

export default Home;
