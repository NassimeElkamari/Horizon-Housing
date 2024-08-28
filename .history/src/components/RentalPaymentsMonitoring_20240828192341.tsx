'use client';

import { useState, useEffect } from 'react';

// Define the Payment type with non-optional fields
interface Payment {
  id: number;
  tenant_id: number;
  amount: number;
  <td className="px-4 py-2 border-b text-black">{tenants[payment.tenant_id] || 'Loading...'}</td>
  : string;
  settled: boolean;
}

interface Tenant {
  id: number;
  name: string;
}

const RentalPaymentsMonitoring = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tenants, setTenants] = useState<Record<number, string>>({}); // Map of tenantId to tenantName
  const [tenantId, setTenantId] = useState<number | ''>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [settled, setSettled] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Fetch payments when component mounts
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/payments');
        const data: Payment[] = await response.json();
        setPayments(data);

        // Extract unique tenant IDs
        const tenantIds = new Set<number>(data.map((payment) => payment.tenant_id));

        // Fetch tenant names for each ID
        const tenantsData: Record<number, string> = {};
        await Promise.all(
          Array.from(tenantIds).map(async (id) => {
            const tenantResponse = await fetch(`/api/tenants/${id}`);
            const tenantData: Tenant = await tenantResponse.json();
            tenantsData[id] = tenantData.name;
          })
        );
        setTenants(tenantsData);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchPayments();
  }, []);

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tenantId === '' || amount === '' || !date) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: Number(tenantId),
          amount: Number(amount),
          date,
          settled,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the tenant name after adding a new payment
        const tenantResponse = await fetch(`/api/tenants/${Number(tenantId)}`);
        const tenantData: Tenant = await tenantResponse.json();

        setPayments([...payments, { id: data.id, tenant_id: Number(tenantId), amount: Number(amount), date, settled }]);
        setTenants((prev) => ({ ...prev, [Number(tenantId)]: tenantData.name }));
        setTenantId('');
        setAmount('');
        setDate('');
        setSettled(false);
        setIsFormVisible(false); // Hide the form after adding a payment
        alert('Payment recorded successfully');
      } else {
        setError(data.message || 'Failed to record payment');
      }
    } catch (err) {
      setError('Failed to record payment');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rental Payments Monitoring</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        {isFormVisible ? 'Hide Add Payment Form' : 'Add Payment'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleAddPayment} className="space-y-4 mb-6">
          <div>
            <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">Tenant ID</label>
            <input
              id="tenantId"
              type="number"
              value={tenantId === '' ? '' : tenantId}
              onChange={(e) => setTenantId(e.target.value === '' ? '' : Number(e.target.value))}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              id="amount"
              type="number"
              value={amount === '' ? '' : amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
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
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
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
      )}

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-black">Tenant ID</th>
            <th className="px-4 py-2 border-b text-black">Tenant Name</th>
            <th className="px-4 py-2 border-b text-black">Amount</th>
            <th className="px-4 py-2 border-b text-black">Date</th>
            <th className="px-4 py-2 border-b text-black">Settled</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-4 py-2 border-b text-black">{payment.tenant_id}</td>
              <td className="px-4 py-2 border-b text-black">{tenants[payment.tenant_id] || 'Loading...'}</td>
              <td className="px-4 py-2 border-b text-black">{payment.amount}</td>
              <td className="px-4 py-2 border-b text-black">{payment.date}</td>
              <td className="px-4 py-2 border-b text-black">{payment.settled ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalPaymentsMonitoring;
