import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import AggregatorService from '../../services/api/aggregatorApi';
import AggregatorProfile from './component/AggregatorProfile';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Aggregator() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const aggregatorService = new AggregatorService(axiosPrivate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { aggregator } = useSelector((state) => state.aggregator);
  const [aggregatorData, setAggregatorData] = useState(aggregator);

  useEffect(() => {
    setAggregatorData(aggregator);
  }, [aggregator]);

  useEffect(() => {
      setAppTitle('Aggregator');
  }, []);

  useEffect(() => {
    const loadData = async () => {
        await aggregatorService.fetchAggregator(dispatch);
    };
    loadData();
  }, [dispatch]);
  
  return (
    <div>
      <button onClick={() => navigate(-1)} className='text-priColor mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
      <AggregatorProfile  aggregatorData={aggregatorData}/>
    </div>
  )
}

export default Aggregator;