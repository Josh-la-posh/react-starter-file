import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';

function Dashboard() {
    const { setAppTitle } = useTitle();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [isLumpsumLoading, setIsLumpsumLoading] = useState(false);
    const [isGraphLoading, setIsGraphLoading] = useState(false);
    const [interval, setInterval] = useState('Daily');
    const [lumpsumErr, setLumpsumErr] = useState('');
    const [graphErr, setGraphErr] = useState('');
    const user = auth.data.user;
    const merchant = auth.data.merchants[0];

    useEffect(() => {
        setAppTitle('Dashboard');
    }, []);

    // useEffect(() => {
    //     fetchLumpsum();
    //     fetchGraph();
    // }, [interval]);

    const fetchLumpsum = async () => {
        setIsLumpsumLoading(true);
        try {
            const lumpsum = await axiosPrivate.get(
                `api/Dashboard/tnx/lumpsum/${merchant.merchantCode}?interval=${interval}`,
            );
            console.log('This is the lumpsum data ', lumpsum.data);
        } catch (err) {
            if (!err.response) {
                setLumpsumErr('No response from server');
            } else {
                setLumpsumErr('Failed to load dashboard data. Try again.');
            }
        } finally {
            setIsLumpsumLoading(false);
        }
    };

    const fetchGraph = async () => {
        setIsGraphLoading(true);
        try {
            const graph = await axiosPrivate.get(
                `api/Dashboard/tnx/graph/${merchant.merchantCode}?interval=${interval}`,
            );
            console.log('This is the graph data ', graph.data);
        } catch (err) {
            if (!err.response) {
                setLumpsumErr('No response from server');
            } else {
                setLumpsumErr('Failed to load data. Try again.');
            }
        } finally {
            setIsGraphLoading(false);
        }
    };

    const handleIntervalChange = (e) => {
      setInterval(e.target.value);
    };

  return (
    <div>
      <header className="mb-8">
        <div className='flex justify-between align-center'>
          <h1 className="text-[18px] font-semibold text-gray-800">Welcome back, {user.firstName}</h1>
          <p className={`text-[14px] font-semibold ${merchant.status === 'Sandbox' ? 'text-red-500' : 'text-green-500'}`}>{merchant.status === 'Sandbox' ? 'Test Environment' : 'Live Environment'}</p>
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
      </header>
    </div>
  )
}

export default Dashboard;