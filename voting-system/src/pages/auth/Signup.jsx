import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/imageUpload')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <img className="hidden sm:block absolute w-full h-full object-cover bg-gray-800" />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign Up</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                className="p-3 my-2 bg-gray-700 rouded"
                type="email"
                placeholder="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-2 bg-gray-700 rouded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-green-600 py-3 my-6 rounded font-bold">
                Sign Up
              </button>
              
              
              <p className="py-4 flex justify-between">
              <Link to="/login">  
                <span className="text-gray-600">Log In</span>{" "}
              
              </Link>

              <Link to="/">
              
                
                <span className="text-gray-600 ">Home</span>{" "}
              </Link>
              </p>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
