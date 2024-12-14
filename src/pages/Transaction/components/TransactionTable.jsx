import React, { useState } from 'react';
import ExportPopup from '../../../utils/exportPopup';
import DataTable from '../../../components/Table';
import { dateFormatter, timeFormatter } from '../../../utils/dateFormatter';
import CustomModal from '../../../components/Modal';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';

const TransactionTable = ({filteredData, handleOpenModal, isExportPopupOpen, setIsExportPopupOpen}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    const columns = [
        {
            header: 'Date',
            accessor: 'modifiedDate',
            render: (value) => (
                <span>
                    {dateFormatter(value)}
                </span>
            ),
        },
        {
            header: 'Time',
            accessor: 'modifiedDate',
            render: (value) => (
                <span>
                    {timeFormatter(value)}
                </span>
            ),
        },
        {
            header: 'Transaction ID',
            accessor: 'paymentReference',
        },
        {
            header: 'Virtual Acct No',
            accessor: 'accountNumber',
            render: (value) => (
                <span className='font-medium text-gray-900'>
                    {value}
                </span>
            ),
        },
        {
            header: 'Amount (₦)',
            accessor: 'amount',
        },
        {
            header: 'Status',
            accessor: 'transactionStatus',
            render: (value) => (
                <span className={`${value === 'Successful' ? 'text-green-600' : value === 'Failed' ? 'text-red-600' : value === 'Pending' ? 'text-orange-400' : 'text-red-500'}`}>
                    {value}
                </span>
            )
        },
        // {
        //     header: 'Action',
        //     accessor: 'transactionStatus',
        //     render: (id, row) => (
        //         row.transactionStatus !== 'Successful' && 
        //         <button
        //             onClick={() => handleDispute(row)}
        //             className='bg-red-700 text-white text-xs px-2 py-1 rounded-[4px]'
        //         >
        //             Dispute
        //         </button>
        //     ),
        // },
    ];
    //     e.preventDefault();
    //     setLoading(true);


    //     try {
    //         const response = await axiosPrivate.post('',
    //             JSON.stringify({paymentReference, description})
    //         );
    //         console.log(response);
    //         const data = response.status;
    //         if (data === 201) {
    //             toast('Sent Successfully');
    //             setPaymentReference('');
    //             setIsDispute(false);
    //         }
    //     } catch (err) {
    //         if (!err.status) {
    //          setErrMsg('No Server Response');   
    //         } else {
    //             setErrMsg('Unable to send request at this time.')
    //         }
    //     } finally {
    //         setLoading(false);
    //     }

    // }

    // const handleDispute = (id) => {
    //     setPaymentReference(id.paymentReference);
    //     setIsDispute(true);
    // };

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
                elementId='transactionTable'
                actionButton={
                    <>
                    {
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10 rounded-[8px] text-xs">
                            <button onClick={() => getDataToParent(selectedIndex)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                View Details
                            </button>
                        </div>
                    }
                    </>
                }
            />
            <ExportPopup
                isOpen={isExportPopupOpen}
                onClose={() => setIsExportPopupOpen(false)}
                data={filteredData}
                elementId='transactionTable'
            />
        </div>
    );
};

export default TransactionTable;