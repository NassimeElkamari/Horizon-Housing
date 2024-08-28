'use client';

import { useState, useEffect } from 'react';

// Define the types
interface Tenant {
  id: number;
  name: string;
  contact_details: string;
  section?: string;
  property_id: number;
}

interface TenantManagementProps {
  propertyId: number;
}

const TenantManagement = ({ propertyId }: TenantManagementProps) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [section, setSection] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // Manage form visibility

  useEffect(() => {
    // Fetch tenants when the property ID changes
    const fetchTenants = async () => {
      const response = await fetch(`/api/tenants?property_id=${propertyId}`);
      const data = await response.json();
      setTenants(data);
    };

    fetchTenants();
  }, [propertyId]);

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact_details: contactDetails, section, property_id: propertyId }),
    });

    const data = await response.json();

    if (response.ok) {
      setTenants([...tenants, { id: data.id, name, contact_details: contactDetails, section, property_id: propertyId }]);
      setName('');
      setContactDetails('');
      setSection('');
      setIsFormVisible(false); // Hide the form after adding a tenant
      alert('Tenant added successfully');
    } else {
      setError(data.message || 'Failed to add tenant');
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

  const handleUpdateTenant = async (id: number, updates: Partial<Tenant>) => {
    const response = await fetch(`/api/tenants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      setTenants(tenants.map((tenant) => (tenant.id === id ? { ...tenant, ...updates } : tenant)));
      setSelectedTenant(null); // Clear selected tenant after update
    } else {
      setError('Failed to update tenant');
    }
  };

  const handleEditClick = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setName(tenant.name);
    setContactDetails(tenant.contact_details);
    setSection(tenant.section || '');
    setIsFormVisible(true); // Show form to edit tenant
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Tenant Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <h3 className="text-xl font-semibold mb-2 text-black">Tenants for Selected Property</h3>
     
      <table className="min-w-full bg-white border border-gray-200 mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-black">Name</th>
            <th className="px-4 py-2 border-b text-black">Contact Details</th>
            <th className="px-4 py-2 border-b text-black">Section</th>
            <th className="px-4 py-2 border-b text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td className="px-4 py-2 border-b text-black">{tenant.name}</td>
              <td className="px-4 py-2 border-b text-black">{tenant.contact_details}</td>
              <td className="px-4 py-2 border-b text-black">{tenant.section}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleRemoveTenant(tenant.id)}
                  className="text-red-600 hover:text-red-800 mr-2"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleEditClick(tenant)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          setIsFormVisible(!isFormVisible);
          setSelectedTenant(null); // Clear selected tenant when adding new tenant
        }}
        className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        {isFormVisible ? 'Hide Add Tenant Form' : 'Add Tenant'}
      </button>

      {isFormVisible && (
        <form onSubmit={e => {
          e.preventDefault();
          if (selectedTenant) {
            handleUpdateTenant(selectedTenant.id, { name, contact_details: contactDetails, section });
          } else {
            handleAddTenant(e);
          }
        }} className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="contactDetails" className="block text-sm font-medium text-black">Contact Details</label>
            <input
              id="contactDetails"
              type="text"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-black">Section</label>
            <input
              id="section"
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            {selectedTenant ? 'Update Tenant' : 'Add Tenant'}
          </button>
        </form>
      )}
    </div>
  );
};

export default TenantManagement;
