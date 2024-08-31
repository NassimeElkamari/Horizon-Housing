'use client';

import { useState } from 'react';

const AddProperty = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('apartment');
  const [units, setUnits] = useState<number | ''>('');
  const [rentalCost, setRentalCost] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Ensure units and rentalCost are converted to numbers before sending the request
    const parsedUnits = units === '' ? null : parseInt(units.toString());
    const parsedRentalCost = rentalCost === '' ? null : parseFloat(rentalCost.toString());

    if (parsedUnits === null || parsedRentalCost === null) {
      setError('Please provide valid numbers for units and rental cost.');
      return;
    }

    const token = localStorage.getItem('token');

    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        address,
        type,
        number_of_units: parsedUnits,
        rental_cost: parsedRentalCost,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success('Property Added S')
      setName('');
      setAddress('');
      setType('apartment');
      setUnits('');
      setRentalCost('');
    } else {
      setError(data.message || 'Error adding property');
    }
  };

  return (
    <div className='bg-gray-100 p-6'>
      <h2 className="text-2xl text-black font-bold mb-4">Add Property</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter property name"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 text-black rounded-md"
            placeholder="Enter address"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 text-black rounded-md"
            required
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>
        <div>
          <label htmlFor="units" className="block text-sm font-medium text-gray-700">Number of Units</label>
          <input
            id="units"
            type="number"
            value={units === '' ? '' : units}
            onChange={(e) => setUnits(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 w-full p-2 border text-black border-gray-300 rounded-md"
            placeholder="Enter number of units"
            required
          />
        </div>
        <div>
          <label htmlFor="rentalCost" className="block text-sm font-medium text-gray-700">Rental Cost</label>
          <input
            id="rentalCost"
            type="number"
            value={rentalCost === '' ? '' : rentalCost}
            onChange={(e) => setRentalCost(e.target.value === '' ? '' : Number(e.target.value))}
            className="mt-1 w-full p-2 border text-black border-gray-300 rounded-md"
            placeholder="Enter rental cost"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
