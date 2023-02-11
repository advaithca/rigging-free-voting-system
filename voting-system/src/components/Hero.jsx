import React from 'react';
import Typed from 'react-typed';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div name='home' className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          Fair elections. Everytime.
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Rig-Free Voting System
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>
            Compatible for
            <Typed
              className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2'
              strings={['Legislative', 'Parliament', 'Municipal']}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
            elections

          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your polling booths real-time with new MTCNN face recognition technology. </p>

        <Link to="/voterScanning">
          <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
            Go to Live Elections</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
