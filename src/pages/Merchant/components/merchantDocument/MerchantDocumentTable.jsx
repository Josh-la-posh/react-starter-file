import React, { useState } from 'react';
import DataTable from '../../../../components/Table';
import { dateFormatter } from '../../../../utils/dateFormatter';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import MerchantService from '../../../../services/api/merchantApi';
import { useDispatch } from 'react-redux';

const MerchantDocumentTable = ({filteredData, merchantCode}) => {
    const axiosPrivate = useAxiosPrivate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const merchantService = new MerchantService(axiosPrivate);
    const dispatch = useDispatch();
    
    const columns = [
        {
            header: 'Date',
            accessor: 'createdDate',
            render: (value) => (
                <span>
                    {dateFormatter(value)}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: 'isActive',
            render: (value) => (
                <span 
                    className={value === true ? 'text-priColor' : 'text-red-600'}
                >
                    {value === true ? 'True' : 'False'}
                </span>
            )
        },
        {
            header: 'Action',
            accessor: 'documentId',
            render: (row) => (
                <button
                    onClick={() => handleDelete(row)}
                    className='bg-red-700 text-white text-xs px-2 py-1 rounded-[4px]'
                >
                    Delete
                </button>
            ),
        },
    ];

    const handleDelete = async (id) => {
        await merchantService.deleteMerchantDocument(id, merchantCode, dispatch);
    }
    
    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };

    return (
        <div className="">

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={false}
                elementId='MerchantDocumentTable'
            />
        </div>
    );
};

export default MerchantDocumentTable;