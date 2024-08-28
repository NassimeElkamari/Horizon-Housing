'use client';

import AddProperty from '@/components/AddProperty';
import PropertiesTable from '@/components/PropertiesTable';
import RentalPaymentsMonitoring from '@/components/RentalPaymentsMonitoring';
import TenantManagement from '@/components/TenantManagement';
import router from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFillHousesFill } from "react-icons/bs";


const DashboardPage = () => {
  const [currentSection, setCurrentSection] = useState<'properties' | 'tenants' | 'payments'>('properties');
  
  const [currentSection, setCurrentSection] = useState<'properties' | 'tenants' | 'payments'>('properties');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/notAllowed'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null; // Render nothing if not authenticated

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white p-4 shadow-md flex justify-center items-center gap-5">
        <BsFillHousesFill color='white' className='w-8 h-8'/>
        <h1 className="text-2xl font-semibold text-center">Welcome to Your Dashboard</h1>
      </header>

      <div className="flex flex-1">
        <aside className="bg-white w-64 p-4 shadow-md border-r border-gray-200">
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors ${currentSection === 'properties' ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-blue-50 text-gray-700'}`}
                  onClick={() => setCurrentSection('properties')}
                >
                  Add Property
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors ${currentSection === 'tenants' ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-blue-50 text-gray-700'}`}
                  onClick={() => setCurrentSection('tenants')}
                >
                  Tenant Management
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded-md transition-colors ${currentSection === 'payments' ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-blue-50 text-gray-700'}`}
                  onClick={() => setCurrentSection('payments')}
                >
                  Rental Payments Monitoring
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-white">
          {currentSection === 'properties' && <AddProperty />}
          {currentSection === 'tenants' && <PropertiesTable />}
          {currentSection === 'payments' && <RentalPaymentsMonitoring />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

