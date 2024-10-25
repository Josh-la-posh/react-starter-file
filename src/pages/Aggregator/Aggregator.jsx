import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import AggregatorService from '../../services/api/aggregatorApi';
import { useDispatch } from 'react-redux';
import MerchantSelector from '../../components/MerchantSelector';

function Aggregator() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const aggregatorService = new AggregatorService(axiosPrivate, auth);

  useEffect(() => {
      setAppTitle('Aggregator');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await aggregatorService.fetchAggregator(dispatch);
      }
    };
    loadData();
  }, [dispatch, aggregatorService]);

  const handleMerchantChange = (e) => {
    const selectedMerchantId = e.target.value;
    const selectedMerchant = merchants.find((m) => m.id.toString() === selectedMerchantId);
    if (selectedMerchant) {
      setMerchant(selectedMerchant);
      console.log(merchantCode);
    }
  };
  
  return (
    <div>
      <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />
    </div>
  )
}

export default Aggregator;