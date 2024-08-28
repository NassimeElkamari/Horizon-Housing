// components/TenantManagement.tsx

'use client';

import { useState, useEffect } from 'react';

// Define the Tenant type
interface Tenant {
  id: number;
  name: string;
  contact: string;
  section?: string;
}

const TenantManagement = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [section, setSection] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await fetch('/api/tenants');
      const data = await response.json();
      setTenants(data.tenants || []);
    };

    fetchTenants();
  }, []);

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, section }),
    });

    const data = await response.json();

    if (response.ok) {
      setTenants([...tenants, { id: data.id, name, contact, section }]);
      setName('');
      setContact('');
      setSection('');
      alert('Tenant added successfully');
    } else {
      setError(data.message || 'Failed to add tenant');
    }
  };

  const handleUpdateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentTenant) return;

    const response = await fetch(`/api/tenants/${currentTenant.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, section }),
    });

    const data = await response.json();

    if (response.ok) {
      setTenants(tenants.map((tenant) =>
        tenant.id === currentTenant.id
          ? { ...tenant, name, contact, section }
          : tenant
      ));
      setCurrentTenant(null);
      setName('');
      setContact('');
      setSection('');
      alert('Tenant updated successfully');
    } else {
      setError(data.message || 'Failed to update tenant');
    }
  };

  const handleRemoveTenant = async (id: number) => {
    const response = await fetch(`/api/tenants/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTenants(tenants.filter((tenant) => tenant.id !== id));
    } else {
      setError('Failed to remove tenant');
    }
  };

  const handleEditTenant = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    setName(tenant.name);
    setContact(tenant.contact);
    setSection(tenant.section || '');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={currentTenant ? handleUpdateTenant : handleAddTenant} className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
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
            required
          />
        </div>
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
          <input
            id="section"
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          {currentTenant ? 'Update Tenant' : 'Add Tenant'}
        </button>
        {currentTenant && (
          <button
            type="button"
            onClick={() => setCurrentTenant(null)}
            className="w-full mt-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
        )}
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Tenants</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Contact</th>
              <th className="px-4 py-2 border-b">Section</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="px-4 py-2 border-b">{tenant.name}</td>
                <td className="px-4 py-2 border-b">{tenant.contact}</td>
                <td className="px-4 py-2 border-b">{tenant.section}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEditTenant(tenant)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTenant(tenant.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantManagement;
