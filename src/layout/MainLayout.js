import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TitleProvider } from '../services/context/TitleProvider';

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setOpenSidebar(false);
  };

  return (
    <TitleProvider>
        <div className="w-full h-svh max-h-svh bg-gray-100 relative">
        {openSidebar && (
          <div className='fixed top-0 left-0 w-48 z-20 block md:hidden'>
            <Sidebar handleSidebar={handleSidebar}/>
            <button
              className="absolute top-4 right-0 text-white"
              onClick={handleSidebar}
            >
              <FontAwesomeIcon icon={faXmark} style={{fontSize: '20px', color: 'black'}} />
            </button>
          </div>
        )}
        <div className='fixed top-0 left-0 w-48 lg:w-64 z-20 hidden md:block'>
          <Sidebar/>
        </div>
        <div className="h-full relative overflow-hidden md:ml-48 lg:ml-64 bg-[#f7f7f7]">
          <div className='bg-white z-10 p-4 border-b border-gray-300 h-16 w-full fixed top-0 right-0 left-0 md:pl-48 lg:pl-64'>
            <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
          </div>
          <main className="pt-20 pb-5 h-full overflow-hidden">
            <div className='px-5 bg-white h-full overflow-y-scroll'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TitleProvider>
  );
};

export default MainLayout;