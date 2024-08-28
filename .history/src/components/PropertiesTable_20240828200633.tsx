'use client';

import { useState, useEffect } from 'react';
import TenantManagement from './TenantManagement';
import { FaFilter } from 'react-icons/fa'; // Importing React Icons for filter button

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
  const [minRentalCost, setMinRentalCost] = useState<number | ''>('');
  const [maxRentalCost, setMaxRentalCost] = useState<number | ''>('');
  const [minUnits, setMinUnits] = useState<number | ''>('');
  const [maxUnits, setMaxUnits] = useState<number | ''>('');

  useEffect(() => {
    // Fetch properties when component mounts
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  // Filter properties based on search term and filter criteria
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesRentalCost = (minRentalCost === '' || property.rental_cost === null || property.rental_cost >= minRentalCost) &&
                              (maxRentalCost === '' || property.rental_cost === null || property.rental_cost <= maxRentalCost);
    const matchesUnits = (minUnits === '' || property.number_of_units === null || property.number_of_units >= minUnits) &&
                         (maxUnits === '' || property.number_of_units === null || property.number_of_units <= maxUnits);

    return matchesSearch && matchesType && matchesRentalCost && matchesUnits;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">Properties</h2>

      {/* Search Input and Filter Button */}
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-80"
        />
        <button
          onClick={() => setFilterType(filterType === 'all' ? 'apartment' : 'all')}
          className="ml-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <FaFilter className="mr-2" />
          {filterType === 'all' ? 'Filter' : 'Show All'}
        </button>
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="minRentalCost" className="block text-sm font-medium text-black">Min Rental Cost</label>
          <input
            id="minRentalCost"
            type="number"
            value={minRentalCost === '' ? '' : minRentalCost}
            onChange={(e) => setMinRentalCost(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="maxRentalCost" className="block text-sm font-medium text-black">Max Rental Cost</label>
          <input
            id="maxRentalCost"
            type="number"
            value={maxRentalCost === '' ? '' : maxRentalCost}
            onChange={(e) => setMaxRentalCost(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="minUnits" className="block text-sm font-medium text-black">Min Number of Units</label>
          <input
            id="minUnits"
            type="number"
            value={minUnits === '' ? '' : minUnits}
            onChange={(e) => setMinUnits(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 border text-black border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="maxUnits" className="block text-sm font-medium text-black">Max Number of Units</label>
          <input
            id="maxUnits"
            type="number"
            value={maxUnits === '' ? '' : maxUnits}
            onChange={(e) => setMaxUnits(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

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
            <tr key={property.id} className="hover:bg-gray-100">
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
