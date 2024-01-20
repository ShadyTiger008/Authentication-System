import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const [occupation, setOccupation] = useState("")
  const [password, setPassword] = useState("")
  const [ avatar, setAvatar ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true)
  console.log(name, email, occupation, password, avatar);
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('occupation', occupation);
  formData.append('avatar', avatar);

  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/signup", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    toast.success("Successfully signed up!")
    window.location.assign("/login")
  } catch (error) {
    console.error("Error during registration:", error);
  } finally {
    setIsLoading(false)
  }
};

  return (
    <main className='w-full h-full flex flex-col gap-8 justify-center items-center'>
      <section className='text-4xl font-bold tracking-widest text-center'>
        User Registration
      </section>
      <section className='flex flex-col items-center gap-4'>
        <input 
          type="text" 
          placeholder='Your name' 
          className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          onChange={ (e) => setName(e.target.value) }
        />
        <textarea 
          type="text" 
          placeholder='Your Bio' 
          className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          onChange={ (e) => setBio(e.target.value) }
        />
        <input 
          type="email" 
          placeholder='Your email' 
          className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input 
          type="text" 
          placeholder='Your occupation' 
          className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          onChange={ (e) => setOccupation(e.target.value) }
        />
        <input 
          type="password" 
          placeholder='Your password' 
          className='p-3 w-full sm:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          onChange={ (e) => setPassword(e.target.value) }
        />
        <label className='flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-md cursor-pointer'>
          <span>Upload Profile Image</span>
          <input type="file"
            className='hidden'
            onChange={ (e) => setAvatar(e.target.files[ 0 ]) } />
        </label>
        <button
          disabled={isLoading}
          className='bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300'
        onClick={handleRegister}>
          {isLoading ? "Registering...." : "Register"}
        </button>
      </section>
    </main>
  );
}

export default Register;
