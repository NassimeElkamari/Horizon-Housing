'use client';

import { useState, useEffect } from 'react';

// Define the Payment type with non-optional fields
interface Payment {
  id: number;
  tenant_id: number;
  amount: number;
  date_paid: string;
  settled: boolean;
}

interface Tenant {
  id: number;
  name: string;
}

const RentalPaymentsMonitoring = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]); // List of tenants
  const [tenantId, setTenantId] = useState<number | ''>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date_paid, setDate] = useState('');
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
      } catch (err) {
        setError('Failed to fetch payments');
      }
    };

    const fetchTenants = async () => {
      try {
        const response = await fetch('/api/tenants');
        const data: Tenant[] = await response.json();
        setTenants(data);
      } catch (err) {
        setError('Failed to fetch tenants');
      }
    };

    fetchPayments();
    fetchTenants();
  }, []);

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tenantId === '' || amount === '' || !date_paid) {
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
          date_paid,
          settled,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPayments([...payments, { id: data.id, tenant_id: Number(tenantId), amount: Number(amount), date_paid, settled }]);
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
            <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">Tenant</label>
            <select
              id="tenantId"
              value={tenantId}
              onChange={(e) => setTenantId(Number(e.target.value))}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
              required
            >
              <option value="">Select a tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="date_paid" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date_paid"
              type="date"
              value={date_paid}
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
          <tr className='text-left'>
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
              <td className="px-4 py-2 border-b text-black">{tenants.find(t => t.id === payment.tenant_id)?.name || 'Loading...'}</td>
              <td className="px-4 py-2 border-b text-black">{payment.amount}</td>
              <td className="px-4 py-2 border-b text-black">{payment.date_paid}</td>
              <td >
                <p className={`px-4 py-2`}></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalPaymentsMonitoring;
