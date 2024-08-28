'use client';

import { useState, useEffect } from 'react';

// Define the types
interface Property {
    id: number;
    name: string;
    address: string;
    type: string;
    number_of_units: number | null;
    rental_cost: number | null;
}

interface Tenant {
    id: number;
    name: string;
    contact_details: string;
    section?: string;
    property_id: number;
}

const TenantManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [section, setSection] = useState('');
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // Manage form visibility

  useEffect(() => {
    // Fetch properties when component mounts
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    // Fetch tenants when a property is selected
    if (selectedProperty !== null) {
      const fetchTenants = async () => {
        const response = await fetch(`/api/tenants?property_id=${selectedProperty}`);
        const data = await response.json();
        setTenants(data);
      };

      fetchTenants();
    } else {
      setTenants([]);
    }
  }, [selectedProperty]);

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedProperty === null) {
      setError('Please select a property first.');
      return;
    }

    const response = await fetch('/api/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact_details: contactDetails, section, property_id: selectedProperty }),
    });

    const data = await response.json();

    if (response.ok) {
      setTenants([...tenants, { id: data.id, name, contact_details: contactDetails, section, property_id: selectedProperty }]);
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
    } else {
      setError('Failed to update tenant');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Tenant Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-black">Select Property</h3>
        <select
          onChange={(e) => setSelectedProperty(Number(e.target.value))}
          value={selectedProperty || ''}
          className="p-2 border border-gray-300 text-black rounded-md w-full"
        >
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProperty !== null && (
        <div>
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
                      onClick={() => handleUpdateTenant(tenant.id, { section: 'Updated Section' })}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TenantManagement;
