import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import CustomerService from '../../services/api/customerApi';
import MerchantSelector from '../../components/MerchantSelector';

function CustomersPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const customerService = new CustomerService(axiosPrivate, auth);
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
      setAppTitle('Customers');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await customerService.fetchAllCustomer(merchantCode, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, pageNumber, pageSize, dispatch, customerService]);

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
      <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />
    </div>
  )
}

export default CustomersPage;