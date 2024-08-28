import { useState } from 'react';

const AddProperty = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('apartment');
  const [units, setUnits] = useState('');
  const [rentalCost, setRentalCost] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address, type, units: parseInt(units), rentalCost: parseFloat(rentalCost) }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Property added successfully!');
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md "
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
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
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
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
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
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter number of units"
            required
          />
        </div>
        <div>
          <label htmlFor="rentalCost" className="block text-sm font-medium text-gray-700">Rental Cost</label>
          <input
            id="rentalCost"
            type="number"
            value={rentalCost}
            onChange={(e) => setRentalCost(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
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
