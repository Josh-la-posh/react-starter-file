import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';

function MerchantCredential() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const merchantService = new MerchantService(axiosPrivate);
  const dispatch = useDispatch();
  const { merchantCredential } = useSelector((state) => state.merchant);
  const [filteredData, setFilteredData] = useState(merchantCredential);

  useEffect(() => {
      setAppTitle('Merchant Credential');
  }, []);

//   useEffect(() => {
//     const loadData = async () => {
//         await merchantService.fetchMerchantCre(merchantCode, dispatch);
//     };
//     loadData();
//   }, [merchantCode, dispatch]);

  return (
    <div>
      {/* <MerchantTable filteredData={filteredData} /> */}
    </div>
  )
}

export default MerchantCredential;