// components/RentalPaymentsMonitoring.tsx

'use client';

import { useState } from 'react';

const RentalPaymentsMonitoring = () => {
  const [tenantId, setTenantId] = useState<number | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [date, setDate] = useState('');
  const [settled, setSettled] = useState(false);
  const [error, setError] = useState('');

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId, amount, date, settled }),
    });

    const data = await response.json();

    if (response.ok) {
      setTenantId(undefined);
      setAmount(undefined);
      setDate('');
      setSettled(false);
      alert('Payment recorded successfully');
    } else {
      setError(data.message || 'Failed to record payment');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rental Payments Monitoring</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddPayment} className="space-y-4">
        <div>
          <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">Tenant ID</label>
          <input
            id="tenantId"
            type="number"
            value={tenantId || ''}
            onChange={(e) => setTenantId(Number(e.target.value))}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="settled" className="block text-sm font-medium text-gray-700">Settled</label>
          <input
            id="settled"
            type="checkbox"
            checked={settled}
            onChange={(e) => setSettled(e.target.checked)}
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Record Payment
        </button>
      </form>
    </div>
  );
};

export default RentalPaymentsMonitoring;
