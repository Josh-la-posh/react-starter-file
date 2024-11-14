import React from 'react';
import DataTable from '../../../components/Table';
import { dateFormatter } from '../../../utils/dateFormatter';

const SettlementTable = ({filteredData}) => {
    
    const columns = [
        {
            header: 'Batch Code',
            accessor: 'batchCode',
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
            header: 'Status',
            accessor: 'status',
        },
    ];

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