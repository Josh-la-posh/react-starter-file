import React from 'react';
import DataTable from '../../../components/Table';
import { dateFormatter, timeFormatter } from '../../../utils/dateFormatter';
import { Edit } from 'lucide-react';
import SettlementService from '../../../services/api/settlementApi';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SettlementTable = ({filteredData, merchantCode}) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const settlementservice = new SettlementService(axiosPrivate);
    const pageNumber = 1;
    const pageSize = 40;
    
    const columns = [
        {
            header: 'Batch Code',
            accessor: 'id',
        },
        {
            header: 'Settlement Date',
            accessor: 'createdDate',
            render: (value) => (
                <span>
                    {dateFormatter(value)}
                </span>
            ),
        },
        {
            header: 'Settlement Time',
            accessor: 'createdDate',
            render: (value) => (
                <span>
                    {timeFormatter(value)}
                </span>
            ),
        },
        {
            header: 'Approaved',
            accessor: 'isApproved',
            render: (value) => (
                <span 
                    className={value === true ? 'text-priColor' : 'text-red-600'}
                >
                    {value === true ? 'True' : 'False'}
                </span>
            )
        },
        {
            header: 'Completed',
            accessor: 'isCompleted',
            render: (value) => (
                <span 
                    className={value === true ? 'text-priColor' : 'text-red-600'}
                >
                    {value === true ? 'True' : 'False'}
                </span>
            )
        },
        {
            header: '',
            accessor: 'id',
            render: (id) => (
                <Link to='/settlement/batch/transaction'>
                    <button onClick={() => handleClick(id)}>
                        <Edit size={14} color='green'/>
                    </button>
                </Link>
            )
        },
    ];

    const handleClick = async (id) => {
        console.log('The id is: ', id);
        await settlementservice.getSettlementBatchTransaction(merchantCode, pageNumber, pageSize, id, dispatch);
    }

    return (
        <div className="">

            <DataTable
                columns={columns}
                data={filteredData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                displayActionButton={false}
                elementId='SettlementTable'
            />
        </div>
    );
};

export default SettlementTable;