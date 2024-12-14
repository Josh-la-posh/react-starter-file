import React from 'react';
import { Link } from 'react-router-dom';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';
import { Boxes, File, HomeIcon, Paperclip, User, UserPlus } from 'lucide-react';

const MerchantSidebar = () => {
    const { settingsTitle } = useSettingsTitle();
    const sidebarItems = [
        {
            id: 1,
            icon: <User size={'15px'} />,
            name: 'Profile',
            url: '/merchants/profile',
            title: 'Profile'
        },
        {
            id: 2,
            icon: <UserPlus size={'15px'} />,
            name: 'Add Merchant',
            url: '/merchants/addNew',
            title: 'New'
        },
        {
            id: 3,
            icon: <Boxes size={'15px'} />,
            name: 'Aggregator',
            url: '/merchants/aggregator',
            title: 'Aggregator'
        },
        {
            id: 4,
            icon: <Paperclip size={'15px'} />,
            name: 'Document',
            url: '/merchants/document',
            title: 'Document'
        },
        {
            id: 5,
            icon: <File size={'15px'} />,
            name: 'Credential',
            url: '/merchants/credential',
            title: 'Credential'
        },
    ]


    return (
        <div className="">
            <div className="text-gray-800 text-sm md:text-lg mb-4">
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

export default MerchantSidebar;