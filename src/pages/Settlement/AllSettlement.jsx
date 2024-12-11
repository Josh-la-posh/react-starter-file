import React, { useEffect } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import SettlementService from '../../services/api/settlementApi';
import SettlementTable from './components/settlementTable';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AllSettlementPage() {
  const { setAppTitle } = useTitle();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { settlement } = useSelector(state => state.settlement);
  const merchantCode = auth?.merchant.merchantCode;
  const settlementservice = new SettlementService(axiosPrivate);
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
      setAppTitle('Settlement History');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await settlementservice.fetchSettlement(merchantCode, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, pageNumber, pageSize, dispatch]);

  return (
    <div className='space-y-4'>
      {/* <SettlementFilter /> */}
      
      <button onClick={() => navigate(-1)} className='text-priColor mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
      <SettlementTable filteredData={settlement} merchantCode={merchantCode}/>
    </div>
  )
}

export default AllSettlementPage;