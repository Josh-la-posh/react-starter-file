import React, { useEffect } from 'react';
import useAuth from '../../services/hooks/useAuth';
import { useSelector } from 'react-redux';
import SettlementBatchTransactionTable from './components/SettlementBatchTransactionTable';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SettlementBatchTransaction() {
  const { settlement } = useSelector(state => state.settlement);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const merchantCode = auth?.merchant.merchantCode;

  return (
    <div className='space-y-4'>
      {/* <SettlementFilter /> */}
    
      <button onClick={() => navigate(-1)} className='text-priColor mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
      <SettlementBatchTransactionTable filteredData={settlement} merchantCode={merchantCode}/>
    </div>
  )
}

export default SettlementBatchTransaction;