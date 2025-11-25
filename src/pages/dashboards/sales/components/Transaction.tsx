import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../../config/urls';

interface TransactionType {
  reference: string;
  units: number;
  serial: string;
}

const Transaction: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/transaction/all`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      // Handle error if the response is not OK
      console.error('Error fetching transactions');
      return;
    }

    const result = await response.json();
    const data = result.transactions;

    // Get top 5 transactions
    const top5 = data.slice(0, 5);
    setTransactions(top5);
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures it runs once after the first render

  return (
    <div className="col-start-5 row-start-1 col-span-2 row-span-2 border-[1px] rounded-lg px-2">
    <header className="mt-4 mb-4 flex justify-between items-center">
      <div className="space-y-2">
        <h3 className="font-oswald text-xl">Recent Transactions</h3>
        <p className="text-gray-600 text-sm">View recent transactions</p>
      </div>
      <button type="button" className="text-sm bg-gray-300 px-2 py-1 rounded-lg">
        <span>View more</span>
      </button>
    </header>

    <div className="gap-y-2">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.reference} className="flex justify-between items-center border-[1px] px-2 py-2 rounded-lg mb-2">
            <p className="font-semibold">{transaction.reference}</p>
            <p>{transaction.units} Units</p>
            <p>{transaction.serial}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 justify-center mt-12">No transactions found</p>
      )}
    </div>
  </div>
  );
};

export default Transaction;
