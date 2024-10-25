import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsProvider } from '../services/context/SettingsProvider';
import SettingsSidebar from '../components/SettingsSidebar';

const SettingsLayout = () => {
  const [isSidebarTextVisible, setIsSidebarTextVisible] = useState(true);

  const handleSidebar = (val) => {
    setIsSidebarTextVisible(val);
  };

  return (
    <SettingsProvider>
        <div className="w-full h-full max-h-svh bg-gray-100 relative">
            <div className={`h-full text-xs font-[500] absolute top-0 left-0 ${isSidebarTextVisible ? 'w-48' : 'w-0'} z-20 block`}>
                <SettingsSidebar handleSidebar={handleSidebar} isSidebarTextVisible={isSidebarTextVisible}/>
            </div>
            <main className={`h-full pt-11 overflow-hidden ${isSidebarTextVisible ? 'ml-48' : 'ml-0'}`}>
                <div className='ml-3 h-full overflow-y-scroll scrollbar-none'>
                    <Outlet />
                </div>
            </main>
        </div>
    </SettingsProvider>
  );
};

export default SettingsLayout;