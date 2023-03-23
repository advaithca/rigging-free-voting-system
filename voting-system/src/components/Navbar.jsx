import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-scroll';
import LogoutButton from './auth/LogoutButton';

const Navbar = () => {
 
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>VOTE.IN</h1>
      <ul className='hidden md:flex'>
      <li className='p-4 cursor-pointer hover:bg-white hover:text-black'> <a  href="/"  smooth={true} duration={500}>Home</a> </li>
      <li className='p-4 cursor-pointer hover:bg-white hover:text-black'> <a  href="/adminDashboard"  smooth={true} offset={-60} duration={500}>Admin</a> </li>
      <li className='p-4 cursor-pointer hover:bg-white hover:text-black'> <Link  to="about"  smooth={true} offset={-80} duration={500}>About</Link> </li>
      
      </ul>
      <LogoutButton />
    </div>
  );
};

export default Navbar;
