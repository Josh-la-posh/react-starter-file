import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import InvoiceService from '../../services/api/invoiceApi';

function InvoicesPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const invoiceService = new InvoiceService(axiosPrivate, auth);
  const pageNumber = 1;
  const pageSize = 40;

  useEffect(() => {
      setAppTitle('Invoices');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await invoiceService.fetchInvoices(merchantCode, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, pageNumber, pageSize, dispatch, invoiceService]);

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

export default InvoicesPage;