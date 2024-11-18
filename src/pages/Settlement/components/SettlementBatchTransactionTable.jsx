import React from 'react';
import DataTable from '../../../components/Table';
import { dateFormatter } from '../../../utils/dateFormatter';
import { Edit } from 'lucide-react';
import SettlementService from '../../../services/api/settlementApi';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { render } from '@testing-library/react';
    
const columns = [
    {
        header: 'Transaction Date',
        accessor: 'createdDate',
        render: (value) => (
            <span>
                {dateFormatter(value)}
            </span>
        ),
    },
    {
        header: 'Amount',
        accessor: 'amountCollected',
    },
    {
        header: 'Transaction Fee',
        accessor: 'merchantCharge',
    },
    {
        header: 'Amount Payable',
        accessor: 'amountPayable',
    },
    {
        header: 'Payment Reference',
        accessor: 'paymentReference',
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: 'Status',
        accessor: 'transactionStatus',
        render: (value) => (
            <span 
                className={value === true ? 'text-priColor' : 'text-red-600'}
            >
                {value === true ? 'True' : 'False'}
            </span>
        )
    }
];

const SettlementBatchTransactionTable = ({filteredData, merchantCode}) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const settlementservice = new SettlementService(axiosPrivate);
    const pageNumber = 1;
    const pageSize = 40;

    const processedData = filteredData.map(row => ({
        ...row,
        amountPayable: `${row.amountCollected - (row.merchantCharge + row.customerCharge)}`,
    }));

    const handleClick = async (id) => {
        await settlementservice.getSettlementBatchTransaction(merchantCode, pageNumber, pageSize, id, dispatch);
    }

    return (
        <div className="">

            <DataTable
                columns={columns}
                data={processedData}
                rowsPerPageOptions={[5, 10, 20, 50]}
                displayActionButton={false}
                elementId='SettlementBatchTransactionTable'
            />
        </div>
    );
};

export default SettlementBatchTransactionTable;