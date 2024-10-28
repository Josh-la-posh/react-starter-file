import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import TransactionService from '../../services/api/transactionApi';
import MerchantSelector from '../../components/MerchantSelector';
import TransactionTable from './components/TransactionTable';
import TransactionFilter from './components/TransactionFilter';

function TransactionPage() {
  const { auth } = useAuth();
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(transactions);
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionData, setSelectedTransactionData] = useState({});
  const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);
  const transactionService = new TransactionService(axiosPrivate, auth);
  const pageNumber = 1;
  const pageSize = 40;
  const env = 'Test';

  useEffect(() => {
      setAppTitle('Transaction');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await transactionService.fetchtransactions(merchantCode, env, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, env, pageNumber, pageSize, dispatch]);

  const handleMerchantChange = (selectedMerchant) => {
    setMerchant(selectedMerchant);
  };

  const handleOpenModal = (val) => {
    setSelectedTransactionData(val);
    setIsModalOpen(true);
    console.log(val);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionData(null);
  };

  // const handleFilterChange = (val) => {
  //   setFilteredData(val);
  // }

  return (
    <div>
      <MerchantSelector merchants={merchants} onMerchantChange={handleMerchantChange} />

      <TransactionFilter filteredData={filteredData} setFilteredData={setFilteredData} transactions={transactions}/>

      <TransactionTable isExportPopupOpen={isExportPopupOpen} setIsExportPopupOpen={setIsExportPopupOpen} filteredData={filteredData} handleOpenModal={handleOpenModal} />
    </div>
  )
}

export default TransactionPage;