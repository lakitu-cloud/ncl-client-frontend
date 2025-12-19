import React from 'react'
import Header from '../../layout/navbar/Header'
import { useApp } from '../../context/ContextProvider';
import { Table } from './Table';

const Transaction = () => {
    const { isButtonPress, setIsButtonPress } = useApp();

  return (
    <section>
        <Header title="Transaction Management" />
        <div>
            <Table/>
        </div>
    </section>
  )
}

export default Transaction