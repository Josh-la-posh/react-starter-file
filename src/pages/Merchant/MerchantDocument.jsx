import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import MerchantFilter from './components/merchant/MerchantFilter';
import MerchantDocumentTable from './components/merchantDocument/MerchantDocumentTable';
import MerchantDomainFilter from './components/merchantDomain/merchantDomainFilter';

function MerchantDocument() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const merchantService = new MerchantService(axiosPrivate);
  const dispatch = useDispatch();
  const { merchantDocument } = useSelector((state) => state.merchant);
  const [filteredData, setFilteredData] = useState(merchantDocument);

  useEffect(() => {
      setAppTitle('Merchant Document');
  }, []);

  // useEffect(() => {
  //   const loadData = async () => {
  //       await merchantService.fetchMerchantDocument(merchantCode, dispatch);
  //   };
  //   loadData();
  // }, [merchantCode, dispatch]);

  return (
    <div>
      <MerchantDomainFilter />
      <MerchantDocumentTable filteredData={filteredData} />
    </div>
  )
}

export default MerchantDocument;