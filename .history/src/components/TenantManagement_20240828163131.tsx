// components/TenantManagement.tsx

'use client';

import { useState, useEffect } from 'react';

// Define the Tenant and Property types
interface Tenant {
  id: number;
  name: string;
  contact_details: string;
  section?: string;
  property_id?: number; // optional, for property assignment
}

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  tenants: Tenant[];
}

const TenantManagement = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [section, setSection] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsResponse, propertiesResponse] = await Promise.all([
          fetch('/api/tenants'),
          fetch('/api/properties')
        ]);

        const [tenantsData, propertiesData] = await Promise.all([
          tenantsResponse.json(),
          propertiesResponse.json()
        ]);

        setTenants(tenantsData);
        setProperties(propertiesData.properties || []);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact_details: contact, section, property_id: selectedPropertyId }),
    });

    const data = await response.json();

    if (response.ok) {
      setTenants([...tenants, { id: data.id, name, contact_details: contact, section }]);
      setName('');
      setContact('');
      setSection('');
      setSelectedPropertyId(null);
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

  const handleAddTenantToProperty = async (propertyId: number, tenantId: number) => {
    const response = await fetch(`/api/properties/${propertyId}/tenants/${tenantId}`, {
      method: 'POST',
    });

    if (response.ok) {
      const updatedProperties = properties.map((property) =>
        property.id === propertyId
          ? { ...property, tenants: [...property.tenants, tenants.find(t => t.id === tenantId)!] }
          : property
      );
      setProperties(updatedProperties);
      alert('Tenant added to property successfully');
    } else {
      setError('Failed to add tenant to property');
    }
  };

  const handleRemoveTenantFromProperty = async (propertyId: number, tenantId: number) => {
    const response = await fetch(`/api/properties/${propertyId}/tenants/${tenantId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedProperties = properties.map((property) =>
        property.id === propertyId
          ? { ...property, tenants: property.tenants.filter(t => t.id !== tenantId) }
          : property
      );
      setProperties(updatedProperties);
      alert('Tenant removed from property successfully');
    } else {
      setError('Failed to remove tenant from property');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddTenant} className="space-y-4 mb-6">
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
        <div>
          <label htmlFor="property" className="block text-sm font-medium text-gray-700">Assign to Property</label>
          <select
            id="property"
            value={selectedPropertyId ?? ''}
            onChange={(e) => setSelectedPropertyId(parseInt(e.target.value))}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a Property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Tenant
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Properties and Tenants</h3>
      <div>
        {properties.map((property) => (
          <div key={property.id} className="mb-6 p-4 border rounded-md">
            <h4 className="text-lg font-semibold mb-2">{property.name}</h4>
            <p className="text-gray-600 mb-2">Address: {property.address}</p>
            <p className="text-gray-600 mb-2">Type: {property.type}</p>
            <h5 className="text-md font-semibold mb-2">Tenants</h5>
            <ul className="list-disc ml-5 mb-4">
              {property.tenants.map((tenant) => (
                <li key={tenant.id} className="mb-2">
                  {tenant.name} (Contact: {tenant.contact_details}, Section: {tenant.section})
                  <button
                    onClick={() => handleRemoveTenantFromProperty(property.id, tenant.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Remove from Property
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAddTenantToProperty(property.id, tenants[0]?.id || 0)}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Add Tenant to Property
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantManagement;
