import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { faGear, faChartLine, faHandshake, faArrowRightFromBracket, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../assets/logo.jpg"

const Sidebar = ({handleSidebar}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="relative h-[100vh] flex flex-col bg-black text-white text-sm lg:text-[16px] shadow-lg">
            <div className='bg-[#f7f7f7] w-full h-16 flex items-center'>
                <img src={Logo} alt="Logo" className="max-h-fit max-w-[85%]" />
            </div>
            <nav className="flex-1 my-2 overflow-y-auto">
                <Link to="/" onClick={() => handleSidebar()} className="block py-2 px-4 hover:bg-priColor">
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faChartLine} size='xs' />
                    Dashboard
                </div>
                </Link>
                <div>
                    <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="w-full text-left py-2 px-4 hover:bg-priColor flex justify-between">
                        <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faHandshake} size='xs' />
                        Dropdown
                        </div>
                        {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {isDropdownOpen && (
                        <div className="ml-4">
                            <Link to="/settlement/all" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Dropdown</Link>
                            <Link to="/settlement/bank-account" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Dropdown 1</Link>
                        </div>
                    )}
                </div>
            </nav>
            <nav className="flex-shrink-0">
                <Link to="/settings" onClick={() => handleSidebar()} className="block py-2 px-4 hover:bg-priColor">
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faGear} size='xs' />
                    Settings
                </div>
                </Link>
                <Link to="/settings" onClick={() => handleSidebar()} className="block py-2 px-4 hover:bg-priColor">
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faHeadphones} size='xs' />
                    Help Center
                </div>
                </Link>
                <Link to="/login" className="block py-2 px-4 hover:bg-priColor">
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size='xs' />
                    Logout
                </div>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;