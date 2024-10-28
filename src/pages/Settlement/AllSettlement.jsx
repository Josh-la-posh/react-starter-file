import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import SettlementService from '../../services/api/settlementApi';
import MerchantSelector from '../../components/MerchantSelector';

function AllSettlementPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const settlementservice = new SettlementService(axiosPrivate, auth);
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
      setAppTitle('Settlement');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await settlementservice.fetchSettlement(merchantCode, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, pageNumber, pageSize, dispatch, settlementservice]);

  const handleMerchantChange = (selectedMerchant) => {
    setMerchant(selectedMerchant);
  };

  return (
    <div>
      <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />
    </div>
  )
}

export default AllSettlementPage;