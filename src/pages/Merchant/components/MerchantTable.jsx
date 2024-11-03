import React, { useState } from 'react';
import ExportPopup from '../../../utils/exportPopup';
import DataTable from '../../../components/Table';
import { dateFormatter, timeFormatter } from '../../../utils/dateFormatter';
import CustomModal from '../../../components/Modal';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';

const MerchantTable = ({filteredData, handleOpenModal, isExportPopupOpen, setIsExportPopupOpen}) => {
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
            header: 'Name',
            accessor: 'accountName',
        },
        // {
        //     header: 'Transaction ID',
        //     accessor: 'paymentReference',
        // },
        // {
        //     header: 'Name',
        //     accessor: 'customerName',
        //     render: (value) => (
        //         <span className='font-medimu text-gray-900'>
        //             {value}
        //         </span>
        //     ),
        // },
        // {
        //     header: 'Amount',
        //     accessor: 'amount',
        // },
        // {
        //     header: 'Status',
        //     accessor: 'transactionStatus',
        //     render: (value) => (
        //         <span className={`${value === 'Successful' ? 'text-green-600' : value === 'Failed' ? 'text-red-600' : 'text-orange-400'}`}>
        //             {value}
        //         </span>
        //     ),
        // },
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

    // const submitDispute = async (e) => {
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

    // const filteredSearchData = transactions.filter((row) => {
    //     const rowValues = Object.values(row).map(val => (val || '').toString().toLowerCase());
    //     const matchesSearch = search
    //         ? rowValues.some(val => val.includes(search.toLowerCase()))
    //         : true;
    //     const matchesStatus = filterStatus
    //         ? row.status === filterStatus
    //         : true;
    //     return matchesSearch && matchesStatus;
    // });

    return (
        <div className="">
            {/* {
                isDispute &&
                <CustomModal
                    handleOpenModal={() => setIsDispute(false)}
                >
                    <h2 className='mb-8'>Description</h2>
                    {errMsg && <p>{errMsg}</p>}
                    <textarea
                        className='border w-full h-[200px] max-x-[500px] text-sm p-3'
                        placeholder='Write something ...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={submitDispute}
                            className='py-2 px-4 bg-priColor text-white rounded-[8px]'
                            disabled={loading}
                        >
                                {loading ? 'Sending...' : 'Submit'}
                            </button>
                    </div>

                </CustomModal>
            } */}

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={true}
                elementId='MerchantTable'
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
                elementId='MerchantTable'
            />
        </div>
    );
};

export default MerchantTable;