import React, { useEffect } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import SettlementService from '../../services/api/settlementApi';
import SettlementTable from './components/settlementTable';
import SettlementFilter from './components/AllSettlementFilter';

function AllSettlementPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { settlement } = useSelector(state => state.settlement);
  const { auth } = useAuth();
  const merchantCode = auth?.merchantCode;
  const settlementservice = new SettlementService(axiosPrivate, auth);
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
      <SettlementFilter />
      <SettlementTable filteredData={settlement}/>
    </div>
  )
}

export default AllSettlementPage;