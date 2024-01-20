import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'; // Use Routes for React Router v6
import Sidebar from '../components/Sidebar';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import Home from '../components/main/Home';
import Register from '../components/main/Register';
import Login from '../components/main/Login';
import Profile from '../components/main/Profile';
import { Toaster } from "react-hot-toast";
import { useMainContext } from '../context/MainContext';
import axios from 'axios';

function App() {
  const [ isToggle, setIsToggle ] = useState(false);
   const { user, setUser } = useMainContext();

    const getUserFromLocalStorage = () => {
      const initialUserId = localStorage.getItem("userId");
      if (initialUserId) {
        return JSON.parse(initialUserId);
      }
      return null;
    };

  const [userId, setUserId] = useState(getUserFromLocalStorage());
  // console.log(userId);


  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/get-user/${userId}`);
      // console.log(response.data);
      setUser(response.data.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      // Handle the error and show a user-friendly message
      // You might also want to distinguish between different types of errors
    }
  };
  return (
    <Router>
      <main className='h-screen flex flex-row'>
        <Sidebar isToggle={ isToggle } setIsToggle={ setIsToggle } />
        <section className='w-full overflow-y-scroll'>
          <Toaster/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              {/* Additional routes can be added here */}
            </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;
