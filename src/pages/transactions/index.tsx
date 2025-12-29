import React from 'react'
import Header from '../../layout/navbar/Header'
import { useApp } from '../../context/ContextProvider';
import TransactionsPage from './TransactionPage';

const Transaction = () => {
    const { isButtonPress, setIsButtonPress } = useApp();

  return (
    <section>
        <Header title="Transaction Management" />
        <div>
            <TransactionsPage/>
        </div>
    </section>
  )
}

export default Transaction