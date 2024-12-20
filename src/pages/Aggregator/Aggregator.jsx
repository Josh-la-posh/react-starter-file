import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import AggregatorService from '../../services/api/aggregatorApi';
import AggregatorProfile from './component/AggregatorProfile';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';

function Aggregator() {
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const axiosPrivate = useAxiosPrivate();
  const aggregatorService = new AggregatorService(axiosPrivate);
  const dispatch = useDispatch();
  const { aggregator } = useSelector((state) => state.aggregator);
  const [aggregatorData, setAggregatorData] = useState(aggregator);

  useEffect(() => {
    setAggregatorData(aggregator);
  }, [aggregator]);

  useEffect(() => {
      setAppTitle('Merchant');
      setSettingsTitle('Aggregator');
  }, []);

  useEffect(() => {
    const loadData = async () => {
        await aggregatorService.fetchAggregator(dispatch);
    };
    loadData();
  }, [dispatch]);
  
  return (
    <div>
      <AggregatorProfile  aggregatorData={aggregatorData}/>
    </div>
  )
}

export default Aggregator;