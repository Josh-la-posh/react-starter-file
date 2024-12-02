import React, { useState } from 'react';
import ExportPopup from '../../../../utils/exportPopup';
import DataTable from '../../../../components/Table';
import { dateFormatter, timeFormatter } from '../../../../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { Pen } from 'lucide-react';
import CustomModal from '../../../../components/Modal';
import MerchantService from '../../../../services/api/merchantApi';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';

const MerchantTable = ({filteredData, handleOpenModal}) => {
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        userId : '',
        merchantId : ''
    });
    
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
            header: 'Merchant',
            accessor: 'merchantName',
        },
        {
            header: 'Profile',
            accessor: 'merchantCode',
            render: (row) => (
                <Link
                    to={`/merchants/profile/${row}`}
                    className='text-priColor'
                >
                    Profile
                </Link>
            )
        },
        {
            header: 'Domain',
            accessor: 'merchantCode',
            render: (id) => (
                <Link
                    to={`/merchants/domain/${id}`}
                    className='text-priColor'
                >
                    Domain
                </Link>
            )
        },
        {
            header: 'Document',
            accessor: 'merchantCode',
            render: (id) => (
                <Link
                    to={`/merchants/document/${id}`}
                    className='text-priColor'
                >
                    Document
                </Link>
            )
        },
        {
            header: 'Credentials',
            accessor: '',
            render: (id) => (
                <Link
                    to='/merchants/credential'
                    className='text-priColor'
                >
                    Credentials
                </Link>
            )
        },
        {
            header: 'Business Type',
            accessor: 'businessType',
        },
        {
            header: 'Charge Type',
            accessor: 'chargeType',
        },
        {
            header: 'Status',
            accessor: 'status',
        },
        {
            header: 'Action',
            accessor: 'id',
            render: (id) => (
                <button
                    onClick={() => handleModalOpen(id)}
                    className='p-2 rounded-sm border border-gray-200'
                >
                    <Pen size='14px' />
                </button>
            ),
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleModalOpen = (id) => {
        setIsModalOpen(true);
        setFormData((prev) => ({
            ...prev,
            merchantId: id
        }));
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setFormData({
            userId: '',
            merchantId: ''
        });
    }

    const getDataToParent = (id) => {
        handleOpenModal(filteredData[id]);
    }

    const handleSubmit = (e) => {
        const v1 = formData.userId;

        if (v1 === '') {
            toast('User Id cannot be empty');
            return;
        }
        loadData();
    }
    
    const handleSelectedRow = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    };
    
    const loadData = async () => {
        await merchantService.addUserMerchant(formData);
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
            {
                isModalOpen &&
                <CustomModal
                    handleOpenModal={handleModalClose}
                >
                    <h2 className='mb-8'>New User</h2>

                    <div className="flex mt-8 gap-3">
                        <input
                            type="text"
                            name='userId'
                            value={formData.userId}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none text-xs"
                            placeholder="User Id"
                            required
                        />
                        <button
                            className='text-white border border-gray bg-priColor text-xs font-[600] py-2 px-4 rounded-md flex justify-between items-center'
                            onClick={handleSubmit}
                            >
                                Add
                        </button>
                    </div>

                </CustomModal>
            }

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={false}
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
        </div>
    );
};

export default MerchantTable;