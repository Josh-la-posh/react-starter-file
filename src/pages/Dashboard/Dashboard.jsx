import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import DashboardService from '../../services/api/dashboardApi';
import { useDispatch } from 'react-redux';

function Dashboard() {
    const { setAppTitle } = useTitle();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const [interval, setInterval] = useState('Daily');

    const user = auth?.data.user;
    const merchants = auth?.data?.merchants || [];
    const [merchant, setMerchant] = useState(merchants[0] || {});
    const merchantCode = merchant.merchantCode;
    const dashboardService = new DashboardService(axiosPrivate, auth);
    const env = 'Test';

    useEffect(() => {
        setAppTitle('Dashboard');
    }, []);

    useEffect(() => {
        const loadData = async () => {
          if (merchantCode) {
            await dashboardService.fetchLumpsum(merchantCode, env, interval, dispatch);
            await dashboardService.fetchGraph(merchantCode, interval, dispatch);
          }
        };
        loadData();
    }, [merchantCode, interval, dashboardService, dispatch]);

    const handleIntervalChange = (e) => {
      setInterval(e.target.value);
      console.log(e.target.value, interval);
    };

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
      <header className="mb-8">
        <div className='flex justify-between align-center'>
          <h1 className="text-[18px] font-semibold text-gray-800">Welcome back, {user.firstName}</h1>
          <p className={`text-[14px] font-semibold ${merchant.status === 'Sandbox' ? 'text-red-500' : 'text-green-500'}`}>{merchant.status === 'Sandbox' ? 'Test Mode' : 'Live'}</p>
        </div>
        <p className="text-gray-600 text-sm">Overview of your payment gateway performance</p>
        <div className="mt-8">
          <label htmlFor="interval" className="mr-2 text-sm">Select Interval:</label>
          <select id="interval" value={interval} onChange={handleIntervalChange} className="p-2 border focus:outline-none rounded-md bg-white selection:bg-transparent">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <div className="mt-8">
          <label htmlFor="merchant" className="mr-2 text-sm">Merchant:</label>
          <select
            id="merchant"
            value={merchant?.id || ''}
            onChange={handleMerchantChange}
            className="p-2 border focus:outline-none rounded-md"
          >
            {merchants.map((merchant) => (
              <option value={merchant.id} key={merchant.id}>
                {merchant.merchantName}
              </option>
            ))}
          </select>
        </div>
      </header>
    </div>
  )
}

export default Dashboard;