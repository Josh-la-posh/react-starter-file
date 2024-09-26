import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [title, setTitle] = useState('');

  const handleSidebar = () => {
    setOpenSidebar(false);
  };

  const updateTitle = (val) => {
    setTitle(val);
  }

  return (
    <div className="w-full h-svh max-h-svh bg-gray-100 relative">
      {openSidebar && (
        <div className='fixed top-0 left-0 w-48 z-20 block md:hidden'>
          <Sidebar handleSidebar={handleSidebar} updateTitle={updateTitle}/>
          <button
            className="absolute top-9 right-0 text-white"
            onClick={handleSidebar}
          >
            <div className='flex items-center justify-center border-2 border-white p-2 h-[25px] w-[25px] rounded-full'>
              <FontAwesomeIcon icon={faXmark} style={{fontSize: '18px'}} />
            </div>
          </button>
        </div>
      )}
      <div className='fixed top-0 left-0 w-48 lg:w-64 z-20 hidden md:block'>
        <Sidebar updateTitle={updateTitle}/>
      </div>
      <div className="flex flex-col overflow-hidden md:ml-48 lg:ml-64">
        <div className='border-b border-gray-200'>
          <Header title={title} setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        </div>
        <main className="flex-1 overflow-y-auto p-5">
          {/* Correctly render the Outlet component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;