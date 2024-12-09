import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import AggregatorService from '../../services/api/aggregatorApi';
import MerchantTable from './components/merchant/MerchantTable';
import MerchantFilter from './components/merchant/MerchantFilter';

function MerchantPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const aggregatorService = new AggregatorService(axiosPrivate);
  const dispatch = useDispatch();
  const { aggregatorMerchants } = useSelector((state) => state.aggregator);
  const [filteredData, setFilteredData] = useState(aggregatorMerchants);

  useEffect(() => {
    setFilteredData(aggregatorMerchants);
  }, [aggregatorMerchants]);

  useEffect(() => {
      setAppTitle('Merchant');
  }, []);

  useEffect(() => {
    const loadData = async () => {
        await aggregatorService.fetchAggregatorMerchants(dispatch);
    };
    loadData();
  }, [dispatch]);

  const handleFilteredData = (newData) => {
    setFilteredData(newData);
  }

  return (
    <div className='space-y-6'>
      <MerchantFilter handleFilteredData={handleFilteredData} />
      <MerchantTable filteredData={filteredData} />
    </div>
  )
}

export default MerchantPage;