import React from 'react';
import useAuth from '../../services/hooks/useAuth';
import { useSelector } from 'react-redux';
import SettlementBatchTransactionTable from './components/SettlementBatchTransactionTable';

function SettlementBatchTransaction() {
  const { settlement } = useSelector(state => state.settlement);
  const { auth } = useAuth();
  const merchantCode = auth?.merchant.merchantCode;

  return (
    <div className='space-y-4'>
      {/* <SettlementFilter /> */}
      <SettlementBatchTransactionTable filteredData={settlement} merchantCode={merchantCode}/>
    </div>
  )
}

export default SettlementBatchTransaction;