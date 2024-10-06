import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { faGear, faChartLine, faHandshake, faArrowRightFromBracket, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../assets/logo.jpg"

const Sidebar = ({handleSidebar}) => {
    const [isAggregatorDropdown, setIsAggregatorDropdown] = useState(false);
    const [isSettlementDropdown, setIsSettlementDropdown] = useState(false);

    return (
        <div className="relative h-[100vh] flex flex-col bg-black text-white text-sm lg:text-[14px] shadow-lg">
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
                <div>
                    <button onClick={() => setIsAggregatorDropdown(!isAggregatorDropdown)} className="w-full text-left py-4 px-4 hover:bg-priColor flex justify-between">
                        <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faHandshake} size='xs' />
                        Aggregator
                        </div>
                        {isAggregatorDropdown ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {isAggregatorDropdown && (
                        <div className="ml-4">
                            <Link to="/aggregator/all" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Aggregator</Link>
                            <Link to="/aggregator/bank" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Aggregator Bank</Link>
                            <Link to="/aggregator/document" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Aggregator Document</Link>
                        </div>
                    )}
                </div>
                <Link to="/merchants" onClick={() => handleSidebar()} className="block py-4 px-4 hover:bg-priColor">
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChartLine} size='xs' />
                        Merchant
                    </div>
                </Link>
                <div>
                    <button onClick={() => setIsSettlementDropdown(!isSettlementDropdown)} className="w-full text-left py-4 px-4 hover:bg-priColor flex justify-between">
                        <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faHandshake} size='xs' />
                        Settlement
                        </div>
                        {isSettlementDropdown ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {isSettlementDropdown && (
                        <div className="ml-4">
                            <Link to="/settlement/all" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">All Settlements</Link>
                            <Link to="/settlement/bank" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Settlement Bank</Link>
                            <Link to="/settlement/configuration" onClick={() => handleSidebar()} className="block py-2 px-4 text-[12px] lg:text-[14px] hover:bg-priColor">Settlement Configuration</Link>
                        </div>
                    )}
                </div>
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
            </nav>
            <nav className="flex-shrink-0">
                <Link to="/settings" onClick={() => handleSidebar()} className="block py-2 px-4 hover:bg-priColor">
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faGear} size='xs' />
                    Settings
                </div>
                </Link>
                <Link to="/help-center" onClick={() => handleSidebar()} className="block py-2 px-4 hover:bg-priColor">
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