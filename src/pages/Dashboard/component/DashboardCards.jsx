import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCartShopping, faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../components/Spinner';
import Card from '../../../components/Card';

function DashboardCards({ lumpsum }) {

    const totalRevenue = lumpsum && Array.isArray(lumpsum)
      ? lumpsum.filter(data => data.transactionStatus === 'Successful')
        .reduce((sum, data) => sum + data.transactionVolume, 0)
      : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card title="Total Revenue" value={`₦${totalRevenue}`} color="bg-[#EEE8FA]" icon={<FontAwesomeIcon icon={faDollarSign} style={{ color: '#7447C6' }} />} />
      <Card title="Total Transactions" value={lumpsum.reduce((total, current) => total + current.transactionCount, 0)} color="bg-[#FFF8E1]" icon={<FontAwesomeIcon icon={faCartShopping} style={{ color: '#FFC107' }} />} />
      <Card title="Successful Payments" value={lumpsum.find(item => item.transactionStatus === "Successful").transactionCount} color="bg-[#E7F6EC]" icon={<FontAwesomeIcon icon={faCheck} style={{ color: '#40B869' }} />} />
      <Card title="Failed Payments" value={lumpsum.find(item => item.transactionStatus === "Failed").transactionCount} color="bg-red-300" icon={<FontAwesomeIcon icon={faBan} style={{ color: 'red' }} />} />
    </div>
  )
}

export default DashboardCards