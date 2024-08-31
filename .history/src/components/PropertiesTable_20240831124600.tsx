'use client';

import { useState, useEffect } from 'react';
import TenantManagement from './TenantManagement';
import { MdEdit } from "react-icons/md";
import { GrNext, GrPrevious } from "react-icons/gr";

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
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | 'all'>('all');
  const [minRentalCost, setMinRentalCost] = useState<number | ''>('');
  const [maxRentalCost, setMaxRentalCost] = useState<number | ''>('');
  const [minUnits, setMinUnits] = useState<number | ''>('');
  const [maxUnits, setMaxUnits] = useState<number | ''>('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProperties = async () => {
      const response = await fetch('/api/properties', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

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

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleUpdateProperty = async (e: React.FormEvent, property: Property) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/properties/${property.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(property),
    });

    if (response.ok) {
      setProperties((prev) =>
        prev.map((p) => (p.id === property.id ? property : p))
      );
      setEditingProperty(null);
    }
  };

  const handleDeleteProperty = async (propertyId: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      setEditingProperty(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {selectedProperty === null && editingProperty === null ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">Properties</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="filterType" className="block text-sm font-medium text-black">Filter by Type</label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              >
                <option value="all">All</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>
            <div>
              <label htmlFor="minRentalCost" className="block text-sm font-medium text-black">Min Rental Cost</label>
              <input
                id="minRentalCost"
                type="number"
                value={minRentalCost === '' ? '' : minRentalCost}
                onChange={(e) => setMinRentalCost(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div>
              <label htmlFor="maxRentalCost" className="block text-sm font-medium text-black">Max Rental Cost</label>
              <input
                id="maxRentalCost"
                type="number"
                value={maxRentalCost === '' ? '' : maxRentalCost}
                onChange={(e) => setMaxRentalCost(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div>
              <label htmlFor="minUnits" className="block text-sm font-medium text-black">Min Number of Units</label>
              <input
                id="minUnits"
                type="number"
                value={minUnits === '' ? '' : minUnits}
                onChange={(e) => setMinUnits(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div>
              <label htmlFor="maxUnits" className="block text-sm font-medium text-black">Max Number of Units</label>
              <input
                id="maxUnits"
                type="number"
                value={maxUnits === '' ? '' : maxUnits}
                onChange={(e) => setMaxUnits(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
          </div>

          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 border-b text-black">Name</th>
                <th className="px-4 py-2 border-b text-black">Address</th>
                <th className="px-4 py-2 border-b text-black">Type</th>
                <th className="px-4 py-2 border-b text-black text-center">Number of Units</th>
                <th className="px-4 py-2 border-b text-black">Rental Cost</th>
                <th className="px-4 py-2 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-black">{property.name}</td>
                  <td className="px-4 py-2 border-b text-black">{property.address}</td>
                  <td className="px-4 py-2 border-b text-black">{property.type}</td>
                  <td className="px-4 py-2 border-b text-black text-center">{property.number_of_units || 'N/A'}</td>
                  <td className="px-4 py-2 border-b text-black">{property.rental_cost ? `$${property.rental_cost}` : 'N/A'}</td>
                  <td className="px-4 py-2 border-b flex">
                    <button
                      onClick={() => setEditingProperty(property)}
                      className="ml-4 text-red-600 hover:text-blue-800"
                    >
                      <MdEdit width={15} height={15} color='red'/>
                    </button>
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="text-blue-600 font-thin hover:text-blue-800"
                    >
                      View Tenants
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              <GrPrevious width={10} height={10}/>
            </button>
            <span className="text-black">Page {currentPage} / {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              <GrNext width={10} height={10}/>
            </button>
          </div>
        </>
      ) : editingProperty !== null ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">Edit Property</h2>
          <form onSubmit={(e) => handleUpdateProperty(e, editingProperty)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
              <input
                id="name"
                type="text"
                value={editingProperty.name}
                onChange={(e) =>
                  setEditingProperty({ ...editingProperty, name: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-black">Address</label>
              <input
                id="address"
                type="text"
                value={editingProperty.address}
                onChange={(e) =>
                  setEditingProperty({ ...editingProperty, address: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-black">Type</label>
              <input
                id="type"
                type="text"
                value={editingProperty.type}
                onChange={(e) =>
                  setEditingProperty({ ...editingProperty, type: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number_of_units" className="block text-sm font-medium text-black">Number of Units</label>
              <input
                id="number_of_units"
                type="number"
                value={editingProperty.number_of_units || ''}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    number_of_units: Number(e.target.value) || null,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rental_cost" className="block text-sm font-medium text-black">Rental Cost</label>
              <input
                id="rental_cost"
                type="number"
                value={editingProperty.rental_cost || ''}
                onChange={(e) =>
                  setEditingProperty({
                    ...editingProperty,
                    rental_cost: Number(e.target.value) || null,
                  })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Update Property
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProperty(editingProperty.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete Property
              </button>
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <TenantManagement
        propertyId={selectedProperty!.id} propertyName={selectedProperty!.name}
                  onBack={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default PropertiesTable;
