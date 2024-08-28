'use client';

import AddProperty from '@/components/AddProperty';
import RentalPaymentsMonitoring from '@/components/RentalPaymentsMonitoring';
import TenantManagement from '@/components/TenantManagement';
import { useState } from 'react';

const DashboardPage = () => {
  const [currentSection, setCurrentSection] = useState<'properties' | 'tenants' | 'payments'>('properties');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-xl font-bold">Property Management Dashboard</h1>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-64 p-4 shadow-lg">
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left ${currentSection === 'properties' ? 'font-bold text-indigo-400' : 'text-gray-300'}`}
                  onClick={() => setCurrentSection('properties')}
                >
                  Add Property
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${currentSection === 'tenants' ? 'font-bold text-indigo-400' : 'text-gray-300'}`}
                  onClick={() => setCurrentSection('tenants')}
                >
                  Tenant Management
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left ${currentSection === 'payments' ? 'font-bold text-indigo-400' : 'text-gray-300'}`}
                  onClick={() => setCurrentSection('payments')}
                >
                  Rental Payments Monitoring
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-white shadow-lg rounded-lg">
          {currentSection === 'properties' && <AddProperty />}
          {currentSection === 'tenants' && <TenantManagement />}
          {currentSection === 'payments' && <RentalPaymentsMonitoring />}
        </main>
      </div>
    </div>
  );
};


export default DashboardPage;
