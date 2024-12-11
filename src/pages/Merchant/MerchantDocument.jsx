import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import { useNavigate, useParams } from 'react-router-dom';
import MerchantDocumentTable from './components/merchantDocument/MerchantDocumentTable';
import { ArrowLeft } from 'lucide-react';
import MerchantDocumentFilter from './components/merchantDocument/MerchantDocumentFilter';

function MerchantDocument() {
  const { merchantCode } = useParams();
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const merchantService = new MerchantService(axiosPrivate);
  const dispatch = useDispatch();
  const { merchantDocument } = useSelector((state) => state.merchant);
  const [filteredData, setFilteredData] = useState(merchantDocument);

  useEffect(() => {
      setAppTitle('Merchant Document');
  }, []);

  useEffect(() => {
    const loadData = async () => {
        await merchantService.fetchMerchantDocument(merchantCode, dispatch);
    };
    loadData();
  }, [merchantCode, dispatch]);

  return (
    <div>
      <MerchantDocumentFilter />
      <MerchantDocumentTable filteredData={merchantDocument} merchantCode={merchantCode} />
    </div>
  )
}

export default MerchantDocument;