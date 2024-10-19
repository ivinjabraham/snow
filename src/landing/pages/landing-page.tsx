import React, { useState } from 'react';
import LandingButton from '../components/landing-button';

const Landing: React.FC = () => {

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center flex-col" style={{ backgroundImage: `url(/bg_snow.png)` }}>
        <div className='flex justify-center items-center font-italiana text-9xl  text-deep-blue'>
            SNOW
        </div>
        <div className='font-italiana text-4xl mb-5 text-deep-blue'>
            Orchestrating Smart Automation: Conductor Meets LLM Power
        </div>
        <LandingButton/>
    </div>
  );
};  

export default Landing;
