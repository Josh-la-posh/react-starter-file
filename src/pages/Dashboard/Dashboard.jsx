import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import DashboardService from '../../services/api/dashboardApi';
import { useDispatch, useSelector } from 'react-redux';
import MerchantSelector from '../../components/MerchantSelector';
import DashboardCards from './component/DashboardCards';
import DashboardChart from './component/DashboardChart';

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
    const { lumpsum } = useSelector((state) => state.dashboard);
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
          console.log('The lumpsum is: ', lumpsum);
        };
        loadData();
    }, [merchantCode, interval, dispatch]);

    const handleIntervalChange = (e) => {
      setInterval(e.target.value);
    };

    const handleMerchantChange = (selectedMerchant) => {
      setMerchant(selectedMerchant)
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
        <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />

        <DashboardChart lumpsum={lumpsum} />

        <DashboardCards lumpsum={lumpsum} />

      </header>



      <div className="dashboard p-6 space-y-8">
      
      {/* User Summary */}
      <div className="flex justify-between items-center">
        <div className="account-balance p-4 bg-white shadow rounded-md w-1/3">
          <h3 className="text-gray-700 text-lg">Account Balance</h3>
          <p className="text-2xl font-semibold">$12,500</p>
        </div>
        <div className="recent-transactions p-4 bg-white shadow rounded-md w-1/3">
          <h3 className="text-gray-700 text-lg">Recent Transactions</h3>
          <ul className="text-sm">
            <li>Purchase at Store - $120</li>
            <li>Transfer to John - $500</li>
          </ul>
        </div>
        <div className="pending-actions p-4 bg-white shadow rounded-md w-1/3">
          <h3 className="text-gray-700 text-lg">Pending Actions</h3>
          <p>2 pending verifications</p>
        </div>
      </div>

      {/* Financial Overview & Metrics */}
      <div className="financial-overview p-4 bg-white shadow rounded-md">
        <h3 className="text-gray-700 text-lg">Financial Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="income-expense-chart">Income vs. Expense Chart</div>
          <div className="savings-investments">Savings: $2,000</div>
          <div className="outstanding-invoices">Outstanding Invoices: $1,200</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions p-4 bg-white shadow rounded-md flex justify-around">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Transfer Money</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Create Invoice</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Generate Report</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Manage Disputes</button>
      </div>

      {/* Transaction Insights */}
      <div className="transaction-insights p-4 bg-white shadow rounded-md">
        <h3 className="text-gray-700 text-lg">Transaction Insights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="spending-breakdown">Spending Breakdown Chart</div>
          <div className="upcoming-payments">Upcoming Payments List</div>
        </div>
      </div>

      {/* Compliance & Security */}
      <div className="compliance-security p-4 bg-white shadow rounded-md">
        <h3 className="text-gray-700 text-lg">Compliance & Security</h3>
        <p>KYC Status: Pending</p>
        <p>Security Alerts: No recent alerts</p>
      </div>

    </div>
    </div>
  )
}

export default Dashboard;