import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import MerchantDocumentTable from './components/merchantDocument/MerchantDocumentTable';
import MerchantDocumentFilter from './components/merchantDocument/MerchantDocumentFilter';
import useAuth from '../../services/hooks/useAuth';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';

function MerchantDocument() {
  const { auth } = useAuth();
  const merchantCode = auth?.merchant?.merchantCode;
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const axiosPrivate = useAxiosPrivate();
  const merchantService = new MerchantService(axiosPrivate);
  const dispatch = useDispatch();
  const { merchantDocument } = useSelector((state) => state.merchant);
  const [filteredData, setFilteredData] = useState(merchantDocument);

  useEffect(() => {
      setAppTitle('Merchant');
      setSettingsTitle('Document');
  }, []);

  useEffect(() => {
    const loadData = async () => {
        await merchantService.fetchMerchantDocument(merchantCode, dispatch);
    };
    loadData();
  }, [merchantCode, dispatch]);

  return (
    <div className=''>
      <MerchantDocumentFilter />
      <MerchantDocumentTable filteredData={merchantDocument} merchantCode={merchantCode} />
    </div>
  )
}

export default MerchantDocument;