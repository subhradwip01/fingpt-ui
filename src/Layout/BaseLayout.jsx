import React, { useContext, useState } from 'react';
import {Navbar} from './Navbar';
import {Sidebar} from './Sidebar';



const BaseLayout = ({ windowWidth, children }) => {
  return (
    <div className='h-full overflow-hidden'>
        {/* Navbar */}
        <Navbar/>
        {/* Sidebar and content */}
        <div className='h-[100vh]'>
        <div className='grid grid-cols-6 gap-4'>
            <div className='col-span-1'>
                <Sidebar/>
            </div>
            <div className='col-span-5'>
                {children}
            </div>
        </div>
        </div>
    </div>
  );
};

export default BaseLayout;