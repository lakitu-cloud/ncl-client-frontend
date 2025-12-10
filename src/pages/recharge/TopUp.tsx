import React from 'react';
import Header from '../../layout/navbar/Header';
import TokenTopUp from './TokenTopUp';
import { useApp } from '../../context/ContextProvider';

interface TableItem {
  serialNumber: string;
  units: string;
  type: string;
  card: number;
  token: string | null;
  amount: number;
  referenceID: string;
  createdAt: string;
}

const TopUp = () => {
  const { showTokenTopUpIU } = useApp()

  return (
    <div className='h-screen'>
      <Header title="Topup & Clear Temper " />
      <TokenTopUp/>     
    </div>
  );
};

export default TopUp;