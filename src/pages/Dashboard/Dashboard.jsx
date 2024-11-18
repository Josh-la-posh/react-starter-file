import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import DashboardService from '../../services/api/dashboardApi';
import { useDispatch, useSelector } from 'react-redux';
import DashboardCards from './component/DashboardCards';
import DashboardChart from './component/DashboardChart';
import DashboardPie from './component/DashboardPie';

function Dashboard() {
    const { setAppTitle } = useTitle();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const [interval, setInterval] = useState('Daily');
    const [transactionMode, setTransactionMode] = useState('Count');

    const user = auth?.data.user;
    const merchant = auth?.merchant;
    const merchantCode = merchant?.merchantCode;
    const dashboardService = new DashboardService(axiosPrivate, auth);
    const { lumpsum, graph } = useSelector((state) => state.dashboard);
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
    }, [merchant, interval, dispatch]);

    const handleIntervalChange = (val) => {
      setInterval(val);
    };
      
  return (
    <div className="space-y-6">
      <div className="">
        <div className='flex justify-between align-center'>
          <h1 className="text-[18px] font-semibold text-gray-800">Welcome back, {user.firstName}</h1>
          <p className={`text-[14px] font-semibold ${merchant?.status === 'Sandbox' ? 'text-red-500' : 'text-green-500'}`}>{merchant?.status === 'Sandbox' ? 'Test Mode' : 'Live'}</p>
        </div>
        <p className="text-gray-600 text-sm">Overview of your payment gateway performance</p>
      </div>
      {/* <div className="mt-8">
        <label htmlFor="interval" className="mr-2 text-sm">Select Interval:</label>
        <select id="interval" value={interval} onChange={handleIntervalChange} className="p-2 border focus:outline-none rounded-md bg-white selection:bg-transparent">
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div> */}

      <div className="flex gap-8">
        <div className="bg-white flex-grow">
          <div className="flex justify-between items-center py-4 px-8 border-b border-b-gray">
            <p className="text-[16px] font-[800]">Transaction {transactionMode}</p>
            <div>
              <button onClick={() => setInterval('Daily')} className={`${interval === 'Daily' ? 'bg-gray-200 shadow-md text-priColor font-[600]' : 'font-[500] text-gray-300'} text-sm px-5 py-2 rounded-md`}>Daily</button>
              <button onClick={() => setInterval('Weekly')} className={`${interval === 'Weekly' ? 'bg-gray-200 shadow-md text-priColor font-[600]' : 'font-[500] text-gray-300'} text-sm px-5 py-2 rounded-md`}>Weekly</button>
              <button onClick={() => setInterval('Monthly')} className={`${interval === 'Monthly' ? 'bg-gray-200 shadow-md text-priColor font-[600]' : 'font-[500] text-gray-300'} text-sm px-5 py-2 rounded-md`}>Monthly</button>
              <button onClick={() => setInterval('Yearly')} className={`${interval === 'Yearly' ? 'bg-gray-200 shadow-md text-priColor font-[600]' : 'font-[500] text-gray-300'} text-sm px-5 py-2 rounded-md`}>Yearly</button>
            </div>
          </div>
          <div className="flex">
            <div className="flex-grow p-4 border-r border-r-gray">
              <DashboardChart graph={graph} type={transactionMode}/>
            </div>
            <div className="md:w-[220px] py-4 px-5">
              <DashboardCards lumpsum={lumpsum} />
            </div>
          </div>
        </div>
        <div className="bg-white  w-[250px] border-b border-b-gray">
          <p className="text-[16px] font-[800] mb-5 py-5 px-6 border-b border-b-gray">Transaction {transactionMode}</p>
            <div className="flex justify-center mb-5">
              <button onClick={() => setTransactionMode('Count')} className={`${transactionMode === 'Count' ? 'bg-gray-200 shadow-md text-priColor font-[600]' : 'font-[500] text-gray-300'} text-sm px-5 py-2 rounded-md`}>Count</button>
              <button onClick={() => setTransactionMode('Volume')} className={`${transactionMode === 'Volume' ? 'bg-gray-200 shadow-md text-priColor font-[600]' : 'font-[500] text-gray-300'} text-sm px-5 py-2 rounded-md`}>Volume</button>
            </div>
          <div className="border-b border-b-gray pb-8">
            <DashboardPie graph={lumpsum} type={transactionMode} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;