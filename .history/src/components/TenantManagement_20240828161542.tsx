import { useState, useEffect } from 'react';

const TenantManagement = () => {
  const [tenants, setTenants] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch existing tenants
    const fetchTenants = async () => {
      const response = await fetch('/api/tenants');
      const data = await response.json();
      setTenants(data.tenants);
    };
    fetchTenants();
  }, []);

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/tenants/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, propertyId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Tenant added successfully!');
      setName('');
      setContact('');
      setPropertyId('');
      setTenants([...tenants, data.tenant]);
    } else {
      setError(data.message || 'Error adding tenant');
    }
  };

  const handleDeleteTenant = async (id: number) => {
    const response = await fetch(`/api/tenants/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Tenant removed successfully!');
      setTenants(tenants.filter((tenant: any) => tenant.id !== id));
    } else {
      setError('Error removing tenant');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddTenant} className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tenant Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter tenant name"
            required
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Details</label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter contact details"
            required
          />
        </div>
        <div>
          <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">Property</label>
          <input
            id="propertyId"
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter property ID"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Tenant
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4">Existing Tenants</h3>
      <ul className="space-y-2">
        {tenants.map((tenant: any) => (
          <li key={tenant.id} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
            <span>{tenant.name} - {tenant.contact}</span>
            <button
              onClick={() => handleDeleteTenant(tenant.id)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantManagement;
