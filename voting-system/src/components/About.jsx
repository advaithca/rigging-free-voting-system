import React from 'react';

import imageone from '../assets/thunder.png'
import imagetwo from '../assets/face-scan.png'
import imagethree from '../assets/cloud-protection.png'


const About = () => {
  return (
    <div name='about' className='w-full py-[3rem] px-4 bg-gray-200' back id='About'>
      <div className='max-w-[1240px] mx-auto'>
      <h1 className='md:text-4xl sm:text-2xl text-2xl font-bold py-4'>
            About
        </h1>
        <p className='text-lg'>Rig-free voting system is a face recognition based voter identity system that ensures fair and proper electoral practices. This system uses facial recognition which helps the Election Commission to avoid rigging, bogus results, disputes, and uncertain situations. Developed by Final year B.Tech Computer science engineering students of SOE,CUSAT.</p> <br />

        <div className="grid grid-cols-3  pt-16">
          <div>
            <div className='flex items-center justify-center'>

          <img src={imageone} className="w-[200px] " alt="" />
            </div>
          <div className='flex items-center justify-center py-6 font-medium text-xm md:text-2xl'>  Lightning Fast</div>
          </div>

          <div>
          <div className='flex items-center justify-center'>

          <img src={imagetwo} className="w-[200px]" alt="" />
</div>
          <div className='flex items-center justify-center py-6 font-medium text-xm md:text-2xl'>  User Authetication</div>
          </div>

          <div>
          <div className='flex items-center justify-center'>

          <img src={imagethree} className="w-[200px]" alt="" />
</div>
          <div className='flex items-center justify-center py-6 font-medium text-xm md:text-2xl'>  Cloud Protection</div>
          </div>
          
        </div>
      
      </div>
    </div>
  );
};

export default About;