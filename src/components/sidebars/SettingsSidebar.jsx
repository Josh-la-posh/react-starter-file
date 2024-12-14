import React from 'react';
import { Link } from 'react-router-dom';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';
import { Bell, BookUser, GroupIcon, LockKeyhole, User, Verified, Warehouse } from 'lucide-react';

const SettingsSidebar = () => {
    const { settingsTitle } = useSettingsTitle();

    const sidebarItems = [
        {
            id: 1,
            icon: <User size={'15px'} />,
            name: 'Profile',
            url: '/settings/profile',
            title: 'Accounts'
        },
        {
            id: 2,
            icon: <BookUser size={'15px'} />,
            name: 'Contact',
            url: '/settings/contact',
            title: 'Contact'
        },
        {
            id: 3,
            icon: <LockKeyhole size={'15px'} />,
            name: 'Security',
            url: '/settings/security',
            title: 'Security'
        },
        {
            id: 4,
            icon: <Bell size={'15px'} />,
            name: 'Notification',
            url: '/settings/notification',
            title: 'Notification'
        },
        {
            id: 5,
            icon: <Verified size={'15px'} />,
            name: 'Privacy',
            url: '/settings/privacy',
            title: 'Privacy'
        },
        {
            id: 5,
            icon: <GroupIcon size={'15px'} />,
            name: 'Teams',
            url: '/settings/user',
            title: 'Teams'
        },
    ]


    return (
        <div className="">
            <div className="text-gray-800 text-md md:text-lg mb-4">
                {settingsTitle}
            </div>
            <nav className={`bg-white pt-4 flex-1 overflow-y-auto scrollbar-none`}>
                {
                    sidebarItems.map((item) => (
                        <Link to={item.url} className={`block py-4 ${settingsTitle === item.title ? 'text-priColor border-r-4 border-priColor transition duration-300 bg-priColor bg-opacity-10' : ''}`}>
                            <div className={`flex items-center gap-2 pl-4`}>
                                {item.icon}
                                <div>{item.name}</div>
                            </div>
                        </Link>
                    ))
                }
            </nav>
        </div>
    );
};

export default SettingsSidebar;