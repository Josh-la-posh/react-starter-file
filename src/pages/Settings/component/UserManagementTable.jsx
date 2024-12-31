import React, { useState } from 'react';
import DataTable from '../../../components/Table';
import useAuth from '../../../services/hooks/useAuth';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import UserService from '../../../services/api/userApi';
import { useDispatch } from 'react-redux';
import { CheckCircle, X } from 'lucide-react';

const UserManagementTable = ({filteredData}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const merchantCode = auth?.merchant?.merchantCode;
    const aggregatorCode = auth?.data?.aggregator?.aggregatorCode;
    const userService = new UserService(axiosPrivate, auth);
    
    const columns = [
        {
            header: 'LASTNAME',
            accessor: 'lastName',
        },
        {
            header: 'FIRSTNAME',
            accessor: 'firstName',
        },
        {
            header: 'EMAIL',
            accessor: 'email',
        },
        {
            header: 'PHONE NUMBER',
            accessor: 'phoneNumber',
        },
        {
            header: 'STATUS',
            accessor: 'isActive',
            render: (value) => (
                <span className={`${value === true ? 'text-green-600' : 'text-red-600'}`}>
                    {value === true ? <CheckCircle size='14px' /> : <X size='14px' />}
                </span>
            )
        },
        {
            header: 'ASSIGN ROLE',
            accessor: 'isAdmin',
            render: (isAdmin, row) => (
                <div className="flex items-center">
                    {
                    isAdmin === true
                        ?
                            <p className='text-xs'>Super Admin</p>
                        :
                            <button
                                onClick={() => handleRole(row)}
                                className='text-priColor text-xs px-2 py-1 rounded-[4px] border border-transparent hover:border-priColor'
                            >
                                User Role
                            </button>
                    }
                </div>
            ),
        },
        {
            header: 'Action',
            accessor: 'isActive',
            render: (isActive, row) => (
                 <button
                    onClick={() => handleAction(row)}
                    className={`${isActive === true ? 'bg-red-700' : 'bg-green-700'} text-white text-xs px-2 py-1 rounded-[4px]`}
                >
                    {isActive === true ? <X size='14px' /> : <CheckCircle size='14px' />}
                </button>
            ),
        },
    ];

    const handleRole = () => {
        
    }

    const activateAccount = async (id) => {
        await userService.activateUser(
            id,
            merchantCode,
            aggregatorCode,
            dispatch
          );
    }

    const deactivateAccount = async (id) => {
        await userService.deactivateUser(
            id,
            merchantCode,
            aggregatorCode,
            dispatch
        );
    }

    const handleAction = (row) => {
        const id = row.id;
        row.isActive === false 
            ? activateAccount(id, merchantCode, dispatch) 
            : deactivateAccount(id, merchantCode, dispatch);
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
            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onIndexChange={handleSelectedRow}
                selectedIndex={selectedIndex}
                displayActionButton={false}
                elementId='UserManagementTable'
            />
        </div>
    );
};

export default UserManagementTable;