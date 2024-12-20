import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import TransactionService from '../../services/api/transactionApi';
import TransactionTable from './components/TransactionTable';
import TransactionFilter from './components/TransactionFilter';
import TransactionForm from './components/TransactionForm';

function TransactionPage() {
  const { auth } = useAuth();
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  const [filteredData, setFilteredData] = useState(transactions);
  const [filteredDataResult, setFilteredDataResult] = useState(filteredData);
  const merchantCode = auth?.merchant.merchantCode;
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
      <TransactionFilter filteredData={filteredData} setFilteredData={setFilteredData} transactions={transactions} filteredDataResult={filteredDataResult} setFilteredDataResult={setFilteredDataResult}/>

      {isModalOpen && 
        (<TransactionForm
            handleCloseModal={handleCloseModal}
            data={selectedTransactionData}
        />
      )}

      <TransactionTable isExportPopupOpen={isExportPopupOpen} setIsExportPopupOpen={setIsExportPopupOpen} filteredData={filteredDataResult} handleOpenModal={handleOpenModal} />
    </div>
  )
}

export default TransactionPage;