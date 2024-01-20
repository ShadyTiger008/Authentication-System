import React, { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { useMainContext } from '../../context/MainContext';

const Login = () => {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useMainContext();

  const handleLogin = async () => {
    setIsLoading(true);

    const formData = {
      email,
      password
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/login", formData);
      console.log(response.data);

      // Update the context user state
      setUser(response?.data?.data?.user);

      // Note: You should handle the case when `response.data.data.user` is not available

      localStorage.setItem("userId", JSON.stringify(response.data.data.user._id));
      localStorage.setItem("refreshToken", JSON.stringify(response.data.data.user.refreshToken));
      toast.success("Successfully signed up!");
      window.location.assign("/");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='w-full h-full flex flex-col gap-8 justify-center items-center'>
      <section className='text-4xl font-bold tracking-widest text-center'>
        User Login
      </section>
      <section className='flex flex-col items-center gap-4'>
        <input 
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email' 
        className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'/>
        <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Your password' 
        className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'/>
        <button
          disabled={ isLoading }
          onClick={handleLogin}
          className='bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300'>
          {isLoading ? "Loggin in..." : "Log In"}
        </button>
      </section>
    </main>
  )
}

export default Login