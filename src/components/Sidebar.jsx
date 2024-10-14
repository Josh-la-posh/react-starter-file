import React from 'react';
import { Link } from 'react-router-dom';
import { faGear, faChartLine, faHandshake, faArrowRightFromBracket, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../assets/logo.jpg"

const Sidebar = ({handleSidebar}) => {

    return (
        <div className="relative h-[100vh] flex flex-col bg-black text-white text-sm lg:text-[14px] shadow-lg pb-2">
            <div className='bg-[#f7f7f7] w-full h-16 flex items-center'>
                <img src={Logo} alt="Logo" className="max-h-fit max-w-[85%]" />
            </div>
            <nav className="flex-1 my-2 overflow-y-auto">
                <Link to="/" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Dashboard
                    </div>
                </Link>
                <Link to="/customers" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Customer
                    </div>
                </Link>
                <Link to="/disputes" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Dispute
                    </div>
                </Link>
                <Link to="/aggregator/all" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Aggregator
                    </div>
                </Link>
                <Link to="/merchants" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Merchant
                    </div>
                </Link>
                <Link to="/settlement/all" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faHandshake} size='xs' />
                        Settlement
                    </div>
                </Link>
                <Link to="/invoices" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Invoice
                    </div>
                </Link>
                <Link to="/transactions" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Transaction
                    </div>
                </Link>
                <Link to="/settings" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faGear} size='xs' />
                        Settings
                    </div>
                </Link>
                <Link to="/help-center" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faHeadphones} size='xs' />
                        Help Center
                    </div>
                </Link>
            </nav>
            <nav className="flex-shrink-0">
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