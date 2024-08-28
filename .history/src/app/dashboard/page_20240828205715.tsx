'use client';

import AddProperty from '@/components/AddProperty';
import PropertiesTable from '@/components/PropertiesTable';
import RentalPaymentsMonitoring from '@/components/RentalPaymentsMonitoring';
import TenantManagement from '@/components/TenantManagement';
import { useState } from 'react';

const DashboardPage = () => {
  const [currentSection, setCurrentSection] = useState<'properties' | 'tenants' | 'payments'>('properties');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-teal-600 text-white p-4 shadow-md fixed w-full top-0 left-0 z-10">
        <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="bg-teal-800 text-white w-72 p-4 shadow-md">
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left text-lg ${currentSection === 'properties' ? 'font-semibold text-teal-200' : 'text-gray-300'}`}
                  onClick={() => setCurrentSection('properties')}
                >
                  Add Property
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left text-lg ${currentSection === 'tenants' ? 'font-semibold text-teal-200' : 'text-gray-300'}`}
                  onClick={() => setCurrentSection('tenants')}
                >
                  Tenant Management
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left text-lg ${currentSection === 'payments' ? 'font-semibold text-teal-200' : 'text-gray-300'}`}
                  onClick={() => setCurrentSection('payments')}
                >
                  Rental Payments Monitoring
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-white shadow-md rounded-lg ml-4 mr-4">
          {currentSection === 'properties' && <AddProperty />}
          {currentSection === 'tenants' && <TenantManagement />}
          {currentSection === 'payments' && <RentalPaymentsMonitoring />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
