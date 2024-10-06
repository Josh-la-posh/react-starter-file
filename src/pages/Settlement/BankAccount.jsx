import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';

function SettlementBankAccount() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
      setAppTitle('Settlement Bank Account');
  }, []);
  return (
    <div>Settlement Bank Account Page</div>
  )
}

export default SettlementBankAccount;