import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import DisputeService from '../../services/api/disputeApi';
import { useDispatch } from 'react-redux';
import MerchantSelector from '../../components/MerchantSelector';

function DisputesPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const disputeService = new DisputeService(axiosPrivate, auth);
  const env = merchant.status;
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
      setAppTitle('Disputes');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await disputeService.fetchDisputes(
          merchantCode,
          pageNumber,
          pageSize,
          env,
          dispatch
        );
      }
    };
    loadData();
  }, [merchantCode, pageNumber, pageSize, env, dispatch, disputeService]);

  const handleMerchantChange = (selectedMerchant) => {
    setMerchant(selectedMerchant)
    };

  return (
    <div>
      <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />
    </div>
  )
}

export default DisputesPage;