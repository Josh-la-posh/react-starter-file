import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import MerchantSelector from '../../components/MerchantSelector';

function MerchantPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const merchantService = new MerchantService(axiosPrivate, auth);

  useEffect(() => {
      setAppTitle('Merchant');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await merchantService.fetchMercahntDetails(merchantCode, dispatch);
      }
    };
    loadData();
  }, [merchantCode, dispatch, merchantService]);

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

export default MerchantPage;