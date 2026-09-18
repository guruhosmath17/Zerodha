import React from 'react';
import Awards from './Awards';
import Education from './Education';
import Hero from './Hero';
import Pricing from './Pricing';
import Stats from './Stats';
import Footer from '../Foooter';
import Navbar from '../Navbar';
import OpenAccount from '../OpenAccount';


function HomePage() {
    return ( 
       <>
       <Hero />
       <Awards />
        <Stats />
        <Pricing />
       <Education />
       <OpenAccount />
      
       </>
     );
    
}

export default HomePage;