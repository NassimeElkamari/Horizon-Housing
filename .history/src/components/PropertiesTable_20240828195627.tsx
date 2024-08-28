'use client';

import { useState, useEffect } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | 'all'>('all');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Fetch properties when component mounts
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  // Filter properties based on search term and filter type
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Properties</h2>

      {/* Search and Filter Section */}
      <div className="flex items-center mb-4 space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-10 border border-gray-300 rounded-md w-full text-black"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
        >
          <FaFilter />
          <span>{showFilter ? 'Hide Filter' : 'Show Filter'}</span>
        </button>
      </div>

      {/* Conditional Filter Dropdown */}
      {showFilter && (
        <div className="mb-4">
          <label htmlFor="filterType" className="block text-sm font-medium text-black">Filter by Type</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="all">All</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            {/* Add more options as needed */}
          </select>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-200 mb-6 rounded-lg shadow-md">
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
          {filteredProperties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-100 transition-colors">
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
