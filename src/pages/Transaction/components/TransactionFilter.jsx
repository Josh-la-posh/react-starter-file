import React, { useState, useEffect } from 'react'
import { ArrowDownWideNarrow, ArrowLeft, CalendarDays, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function TransactionFilter({filteredData, setFilteredData, transactions, filteredDataResult, setFilteredDataResult}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchMode, setSearchMode] = useState('All');
    const [searchFilterType, setSearchFilterType] = useState('Name');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        setFilterStatus('All');
        setSearchMode('All');
    }, []);

    const handleFilter = () => {
        if (searchMode === 'Date') {
            setSearch('');
            const filteredTransactions = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.modifiedDate);
                const isAfterStartDate = startDate ? transactionDate >= new Date(startDate) : true;
                const isBeforeEndDate = endDate ? transactionDate <= new Date(endDate) : true;
                return isAfterStartDate && isBeforeEndDate;
            });
            setFilteredData(filteredTransactions);
            // setFilteredDataResult(filteredTransactions);
        }
    };

    useEffect(() => {
        if (searchMode === 'All') {
            setFilteredData(transactions);
        }
    }, [searchMode])

    useEffect(() => {
        setEndDate(null);
        setStartDate(null);
        const filteredTransactions = transactions.filter((row) => {
            const rowValues = Object.values(row).map(val => (val || '').toString().toLowerCase());
            const matchSearch = search
                ? rowValues.some(val => val.includes(search.toLowerCase()))
                : true;

            return matchSearch;
        });
        setFilteredData(filteredTransactions);
    }, [transactions, search]);

    useEffect(() => {
        const filteredTransactions = filteredData.filter((row) => {
            const matchFilter = filterStatus !== 'All' 
                ? row.transactionStatus === filterStatus 
                : true;

            return matchFilter;
        });
        setFilteredDataResult(filteredTransactions);
    }, [filterStatus, filteredData]);

    const handleFilteredDataChange = (val) => {
        setFilterStatus(val);
    }

    const handleSearchMode = (e) => {
        setSearchFilterType(e.target.value);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    
  return (
    <div className='mb-4'>
        <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className='text-priColor flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
            <div className="flex">
                <button onClick={() => setSearchMode('All')}
                    className={`${searchMode === 'All' ? 'text-white bg-priColor font-[600]' : 'text-gray-400 border border-gray bg-white'} text-xs w-20 py-2 px-2 rounded-sm`}>
                        All
                </button>
                {
                    searchMode !== 'Date' && 
                    <button onClick={() => setSearchMode('Date')}
                        className={`${searchMode === 'Date' ? 'text-white bg-priColor font-[600]' : 'text-gray-400 border border-gray bg-white'} text-xs w-20 py-2 px-2 rounded-sm flex justify-between items-center gap-2`}>
                            <CalendarDays size='14' />
                            Date
                    </button>
                }
                { searchMode !== 'Filter' &&
                    <button onClick={() => setSearchMode('Filter')}
                        className={`${searchMode === 'Filter' ? 'text-white bg-priColor' : 'text-gray-400 border border-gray bg-white'} text-xs w-20 py-2 px-2 rounded-sm flex justify-between items-center`}>
                            <ArrowDownWideNarrow size='14' />
                            Filter
                    </button>
                }
                { searchMode === 'Filter' &&
                    <div className ="ml-5 flex items-center justify-center gap-2">
                        <select id="searchFilterType" value={searchFilterType} onChange={handleSearchMode} className="p-2 border focus:outline-none rounded-sm bg-white text-gray-400 selection:bg-transparent text-xs">
                            <option value="Name">Name</option>
                            <option value="Email">Email</option>
                            <option value="TransactionId">Transaction ID</option>
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                className="p-2 pl-8 border border-gray-300 rounded-sm focus:outline-none text-xs"
                                placeholder="Search transactions..."
                            />
                            <Search
                                size='14'
                                className='absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400' />
                        </div>
                        <button onClick={handleFilter}
                            className='text-white bg-priColor text-xs w-20 py-2 px-2 rounded-sm flex justify-center items-center'>
                                Filter
                        </button>
                    </div>
                }
                {
                    searchMode === 'Date' &&
                    <div className="flex space-x-3 ml-5">
                        <DatePicker 
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText='Start Date'
                            className='text-gray-400 border border-gray bg-white text-xs w-20 py-2 px-2 rounded-sm flex justify-between items-center'
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText='End Date'
                            className='text-gray-400 border border-gray bg-white text-xs w-20 py-2 px-2 rounded-sm flex justify-between items-center'
                        />
                        <button onClick={handleFilter}
                            className='text-white bg-priColor text-xs w-20 py-2 px-2 rounded-sm flex justify-center items-center'>
                                Search
                        </button>
                        
                    </div>
                }
            </div>
        </div>
        <div className="h-32 bg-[#F0F2F5] my-4 p-4">
            <div className="bg-white h-full w-full flex justify-center items-center">
                
            </div>
        </div>
        <div className="flex py-2">
            <button onClick={() => handleFilteredDataChange('All')}
                className={`${filterStatus === 'All' ? 'text-white bg-priColor' : 'text-gray-400 border border-gray bg-white'} text-xs w-24 py-2 rounded-sm`}>
                    All
            </button>
            <button onClick={() => handleFilteredDataChange('Successful')}
                className={`${filterStatus === 'Successful' ? 'text-white bg-priColor' : 'text-gray-400 border border-gray bg-white'} text-xs w-24 py-2 rounded-sm`}>
                    Successful
            </button>
            <button onClick={() => handleFilteredDataChange('Pending')}
                className={`${filterStatus === 'Pending' ? 'text-white bg-priColor' : 'text-gray-400 border border-gray bg-white'} text-xs w-24 py-2 rounded-sm`}>
                    Pending
            </button>
            <button onClick={() => handleFilteredDataChange('Failed')}
                className={`${filterStatus === 'Failed' ? 'text-white bg-priColor' : 'text-gray-400 border border-gray bg-white'} text-xs w-24 py-2 rounded-sm`}>
                    Failed
            </button>
        </div>
    </div>
  )
}

export default TransactionFilter