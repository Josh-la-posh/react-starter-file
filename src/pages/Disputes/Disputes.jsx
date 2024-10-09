import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import DisputeService from '../../services/api/disputeApi';
import { useDispatch } from 'react-redux';

function DisputesPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const disputeService = new DisputeService(axiosPrivate, auth);
  const env = merchant.status;
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
      setAppTitle('Disputes');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await disputeService.fetchDisputes(merchantCode, pageNumber, pageSize, env, dispatch);
      }
    };
    loadData();
  }, [merchantCode, pageNumber, pageSize, env, dispatch, disputeService]);

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
    </div>
  )
}

export default DisputesPage;