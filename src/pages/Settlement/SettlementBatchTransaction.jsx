import React, { useEffect } from 'react';
import useAuth from '../../services/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import SettlementBatchTransactionTable from './components/SettlementBatchTransactionTable';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import SettlementService from '../../services/api/settlementApi';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';

function SettlementBatchTransaction() {
  const { transactionId } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const settlementService = new SettlementService(axiosPrivate);
  const { settlement } = useSelector(state => state.settlement);
  const navigate = useNavigate();
  const merchantCode = auth?.merchant.merchantCode;
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
    loadSettlementTransaction();
  }, [])

  const loadSettlementTransaction = async () => {
    await settlementService.getSettlementBatchTransaction(merchantCode, pageNumber, pageSize, transactionId, dispatch);
  }

  return (
    <div className='space-y-4'>
      {/* <SettlementFilter /> */}
    
      <button onClick={() => navigate(-1)} className='text-priColor mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
      <SettlementBatchTransactionTable filteredData={settlement} merchantCode={merchantCode}/>
    </div>
  )
}

export default SettlementBatchTransaction;