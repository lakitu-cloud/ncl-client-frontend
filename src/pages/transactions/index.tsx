import React from 'react'
import Header from '../../layout/navbar/Header'
import { useApp } from '../../context/ContextProvider';
import TransactionsPage from './TransactionPage';
import { useFetchTxs } from '../../hooks/useTxs';
import { TransactionPayload } from '../../types/tsxTypes';

const Transaction = () => {
  const { accountType } = useApp();
  const { data: transactions = [], isPending, isError } = useFetchTxs(accountType);

  return (
    <section>
        <Header title="Transaction Management" />
        <div>
            <TransactionsPage data={transactions} isLoading={isPending} isError={isError}/>
        </div>
    </section>
  )
}

export default Transaction