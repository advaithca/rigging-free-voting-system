import React from 'react';

const About = () => {
  return (
    <div name='about' className='w-full py-[10rem] px-4 bg-white' id='About'>
      <div className='max-w-[1240px] mx-auto'>
      <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-4'>
            About
        </h1>
        <p>Rig-free voting system is a face recognition based voter identity system that ensures fair and proper electoral practices. This system uses facial recognition which helps the Election Commission to avoid rigging, bogus results, disputes, and uncertain situations. It uses artificial intelligence for facial recognition of the voters by validating it with a dummy database in which complete detail of a person is available including name, father's name, id number, thumb impression, photo, etc.</p> <br />

        <p>Our project infrastructure includes the admin panel which requires login credentials. The system is restricted and cannot be accessed outside of the polling station. In the polling station, firstly, the voter has to input their legal details (NIC) for authentication which redirects the voter to the Facial Recognition window, where the voter's face is validated through this method then all the candidates lists will be displayed on the screen of the voter. The program keeps the vote count of every candidate on submission of each vote and displays the result of the election as soon as the voting process ends, which means no delay in results.</p>
      
      </div>
    </div>
  );
};

export default About;
