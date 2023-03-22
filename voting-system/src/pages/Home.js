import React from 'react';
import About from '../components/About';
import Analytics from '../components/Analytics';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';



function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Analytics />
      <About />
      <Footer />
    </div>
   
  );
}

export default Home;
