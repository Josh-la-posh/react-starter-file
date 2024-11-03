import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import MerchantSelector from '../../components/MerchantSelector';
import MerchantTable from './components/MerchantTable';
import MerchantFilter from './components/MerchantFilter';

function MerchantPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { merchantAccount } = useSelector((state) => state.merchant); 
  const { auth } = useAuth();
  const [filteredData, setFilteredData] = useState(merchantAccount);
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const merchantService = new MerchantService(axiosPrivate, auth);
  const pageNumber = 1;
  const pageSize = 20;

  useEffect(() => {
      setAppTitle('Merchant');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await merchantService.fetchMerchantAccountByPage(merchantCode, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, dispatch]);

  const handleMerchantChange = (selectedMerchant) => {
    setMerchant(selectedMerchant);
  };

  return (
    <div>
      <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />

      <MerchantFilter />

      {/* <MerchantTable filteredData={filteredData} /> */}
    </div>
  )
}

export default MerchantPage;