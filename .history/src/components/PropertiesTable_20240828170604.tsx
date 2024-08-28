'use client';

import { useState, useEffect } from 'react';
import TenantManagement from './TenantManagement';

// Define the Property type
interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  number_of_units: number | null;
  rental_cost: number | null;
}

const PropertiesTable = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  useEffect(() => {
    // Fetch properties when component mounts
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Properties</h2>
      
      <table className="min-w-full bg-white border border-gray-200 mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-black">Name</th>
            <th className="px-4 py-2 border-b text-black">Address</th>
            <th className="px-4 py-2 border-b text-black">Type</th>
            <th className="px-4 py-2 border-b text-black">Number of Units</th>
            <th className="px-4 py-2 border-b text-black">Rental Cost</th>
            <th className="px-4 py-2 border-b text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="px-4 py-2 border-b text-black">{property.name}</td>
              <td className="px-4 py-2 border-b text-black">{property.address}</td>
              <td className="px-4 py-2 border-b text-black">{property.type}</td>
              <td className="px-4 py-2 border-b text-black">{property.number_of_units || 'N/A'}</td>
              <td className="px-4 py-2 border-b text-black">{property.rental_cost ? `$${property.rental_cost}` : 'N/A'}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => setSelectedProperty(property.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Tenants
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProperty && <TenantManagement propertyId={selectedProperty} />}
    </div>
  );
};

export default PropertiesTable;
