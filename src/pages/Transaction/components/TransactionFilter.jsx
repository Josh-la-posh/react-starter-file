import { ArrowDownWideNarrow, CalendarDays, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react'

function TransactionFilter({filteredData, setFilteredData, transactions}) {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchMode, setSearchMode] = useState('All');
    const [searchFilterType, setSearchFilterType] = useState('Name');

    useEffect(() => {
        setFilterStatus('All');
        setSearchMode('All');
    }, []);

    useEffect(() => {
        const filteredTransactions = transactions.filter((row) => {
            const rowValues = Object.values(row).map(val => (val || '').toString().toLowerCase());
            const matchSearch = search
                ? rowValues.some(val => val.includes(search.toLowerCase()))
                : true;
            const matchFilter = filterStatus !== 'All' 
                ? row.transactionStatus === filterStatus 
                : true;

            return matchSearch && matchFilter;
        });
        setFilteredData(filteredTransactions);
    }, [filterStatus, transactions, search]);

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
        <div className="flex justify-end">
            <button onClick={() => setSearchMode('All')}
                className={`${searchMode === 'All' ? 'text-white bg-priColor font-[600]' : 'text-gray-400 border border-gray bg-white'} text-xs w-20 py-2 px-2 rounded-sm`}>
                    All
            </button>
            <button onClick={() => setSearchMode('Date')}
                className={`${searchMode === 'Date' ? 'text-white bg-priColor font-[600]' : 'text-gray-400 border border-gray bg-white'} text-xs w-20 py-2 px-2 rounded-sm flex justify-between items-center gap-2`}>
                    <CalendarDays size='14' />
                    Date
            </button>
            { searchMode !== 'Filter' &&
                <button onClick={() => setSearchMode('Filter')}
                    className={`${searchMode === 'Filter' ? 'text-white bg-priColor' : 'text-gray-400 border border-gray bg-white'} text-xs w-20 py-2 px-2 rounded-sm flex justify-between items-center`}>
                        <ArrowDownWideNarrow size='14' />
                        Filter
                </button>
            }
            { searchMode === 'Filter' &&
                <div className ="flex items-center justify-center gap-2">
                    <select id="searchFilterType" value={searchFilterType} onChange={handleSearchMode} className="p-2 border focus:outline-none rounded-md bg-white text-gray-400 selection:bg-transparent text-xs">
                        <option value="Name">Name</option>
                        <option value="Email">Email</option>
                        <option value="TransactionId">Transaction ID</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none text-xs"
                            placeholder="Search transactions..."
                        />
                        <Search
                            size='14'
                            className='absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400' />
                    </div>
                </div>
            }
        </div>
        <div className="h-32 bg-[#F0F2F5] my-4 p-4">
            <div className="bg-white h-full w-full flex justify-center items-center">
                redfjckvljk ykjhj;ok ytglim;l bnlkjbvgc uygbiuhoho fdtrfchvjb
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