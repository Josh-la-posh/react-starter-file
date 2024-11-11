import React, { useState } from 'react';
import ExportPopup from '../../../../utils/exportPopup';
import DataTable from '../../../../components/Table';
import { dateFormatter, timeFormatter } from '../../../../utils/dateFormatter';
import CustomModal from '../../../../components/Modal';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';

const MerchantDocumentTable = ({filteredData, handleOpenModal, isExportPopupOpen, setIsExportPopupOpen}) => {
    const axiosPrivate = useAxiosPrivate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    
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
            header: 'Approaved',
            accessor: 'approaved',
            // render: (row) => (
            //     <Link
            //         to={`/merchants/profile/${row}`}
            //         className='text-priColor'
            //     >
            //         Profile
            //     </Link>
            // )
        },
        {
            header: 'Status',
            accessor: 'isActive',
        },
    ];

    const getDataToParent = (id) => {
        handleOpenModal(filteredData[id]);
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
                displayActionButton={true}
                elementId='MerchantDomainTable'
                actionButton={
                    <>
                    {
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10 rounded-[8px] text-xs">
                            <button onClick={() => getDataToParent(selectedIndex)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                View Details
                            </button>
                            {/* <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Change Status
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Delete
                            </button> */}
                        </div>
                    }
                    </>
                }
            />
            <ExportPopup
                isOpen={isExportPopupOpen}
                onClose={() => setIsExportPopupOpen(false)}
                data={filteredData}
                elementId='MerchantDomainTable'
            />
        </div>
    );
};

export default MerchantDocumentTable;