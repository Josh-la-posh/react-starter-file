import React, { useState } from 'react';
import ExportPopup from '../../../../utils/exportPopup';
import DataTable from '../../../../components/Table';
import { dateFormatter, timeFormatter } from '../../../../utils/dateFormatter';
import CustomModal from '../../../../components/Modal';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';

const MerchantDomainTable = ({filteredData, handleOpenModal, isExportPopupOpen, setIsExportPopupOpen}) => {
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
            header: 'Domain',
            accessor: 'domainName',
        },
        {
            header: 'Approaved',
            accessor: 'approaved',
            render: (value) => (
                <span 
                    className={value === true ? 'text-priColor' : 'text-red-600'}
                >
                    {value === true ? 'True' : 'False'}
                </span>
            )
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
                displayActionButton={false}
                elementId='MerchantDomainTable'
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

export default MerchantDomainTable;