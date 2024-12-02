import React from 'react';
import { Link } from 'react-router-dom';
import useSettingsTitle from '../services/hooks/useSettingsTitle';
import { Bell, BookUser, GroupIcon, LockKeyhole, User, Verified, Warehouse } from 'lucide-react';

const SettingsSidebar = ({handleSettingsSidebar, isSettingsSidebarTextVisible}) => {
    const { settingsTitle, setSettingsTitle } = useSettingsTitle();
    return (
        <div className="">
            <div className="text-gray-800 text-2xl font-semibold mb-4">
                {settingsTitle}
            </div>
            <nav className={`bg-white pt-4 flex-1 overflow-y-auto scrollbar-none`}>
                <Link to="/settings/profile" className={`block py-4 ${settingsTitle === 'Accounts' ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                    <div className={`flex items-center gap-2 pl-4`}>
                        <User size='15' />
                        <div>Profile</div>
                    </div>
                </Link>
                <Link to="/settings/contact" className={`block py-4 ${settingsTitle === 'Contact' ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                    <div className={`flex items-center gap-2 pl-4`}>
                        <BookUser size='15' />
                        <div>Contact</div>
                    </div>
                </Link>
                <Link to="/settings/security" className={`block py-4 ${settingsTitle === 'Security' ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                    <div className={`flex items-center gap-2 pl-4`}>
                        <LockKeyhole size='15' />
                        <div>Security</div>
                    </div>
                </Link>
                <Link to="/settings/notification" className={`block py-4 ${settingsTitle === 'Notification' ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                    <div className={`flex items-center gap-2 pl-4`}>
                        <Bell size='15' />
                        <div>Notification</div>
                    </div>
                </Link>
                <Link to="/settings/privacy" className={`block py-4 ${settingsTitle === 'Privacy' ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                    <div className={`flex items-center gap-2 pl-4`}>
                        <Verified size='15' />
                        <div>Privacy</div>
                    </div>
                </Link>
                <Link to="/settings/user" className={`block py-4 ${settingsTitle === 'Team' ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                    <div className={`flex items-center gap-2 pl-4`}>
                        <GroupIcon size='15' />
                        <div>Team</div>
                    </div>
                </Link>
            </nav>
        </div>
    );
};

export default SettingsSidebar;