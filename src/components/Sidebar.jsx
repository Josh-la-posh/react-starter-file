import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faGear, faChartLine, faHandshake, faArrowRightFromBracket, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTitle from '../services/hooks/useTitle';
import { ArrowLeftRight, Combine, Handshake, Headset, LayoutDashboard, LogOut, MessageSquareX, RefreshCwOff, ScrollText, Settings, User, Warehouse } from 'lucide-react';
import Logo from "../assets/logo.jpg"

const Sidebar = ({handleSidebar, isSidebarTextVisible}) => {
    const { appTitle, setAppTitle } = useTitle();

    return (
        <div className="relative h-[100vh] flex flex-col text-sm lg:text-[14px] bg-white shadow-lg pb-2">
            <div className='bg-[#f7f7f7] w-full h-16 flex items-center'>
                <img src={Logo} alt="Logo" className="max-h-fit max-w-[85%]" />
            </div>
            <nav className={`flex-1 my-2 ${isSidebarTextVisible ? 'pl-6' : ''} overflow-y-auto scrollbar-none`}>
                <Link to="/" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Dashboard' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <LayoutDashboard size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Dashboard</div>
                    </div>
                </Link>
                <Link to="/customers" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Customers' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <User size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Customer</div>
                    </div>
                </Link>
                <Link to="/disputes" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Disputes' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <MessageSquareX size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Dispute</div>
                    </div>
                </Link>
                <Link to="/aggregator/all" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Aggregator' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <Combine size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Aggregator</div>
                    </div>
                </Link>
                <Link to="/merchants" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Merchant' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <Warehouse size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Merchant</div>
                    </div>
                </Link>
                <Link to="/settlement/all" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Settlement' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <Handshake size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Settlement</div>
                    </div>
                </Link>
                <Link to="/invoices" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Invoices' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <ScrollText size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Invoice</div>
                    </div>
                </Link>
                <Link to="/transactions" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Transaction' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <ArrowLeftRight size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Transaction</div>
                    </div>
                </Link>
                <Link to="/settings" onClick={() => handleSidebar(false)} className={`block py-4 ${appTitle === 'Settings' ? 'text-priColor' : ''}`}>
                <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <Settings size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Settings</div>
                    </div>
                </Link>
                <Link to="/help-center" onClick={() => handleSidebar(true)} className={`block py-4 ${appTitle === 'Help Center' ? 'text-priColor' : ''}`}>
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <Headset size={isSidebarTextVisible ? '18' : '22'} />
                        <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Help Center</div>
                    </div>
                </Link>
            </nav>
            <nav className={`flex-shrink-0 ${isSidebarTextVisible ? 'pl-6' : ''}`}>
                <Link to="/login" className="block py-2 hover:bg-priColor">
                    <div className={`flex items-center ${isSidebarTextVisible ? '' : 'justify-center'} gap-2`}>
                        <LogOut size={isSidebarTextVisible ? '18' : '22'} />
                            <div className={isSidebarTextVisible ? 'block' : 'hidden'}>Logout</div>
                    </div>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;