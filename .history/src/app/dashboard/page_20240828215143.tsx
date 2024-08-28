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




'use client';

import { useRouter } from 'next/navigation';

const AccessDeniedPage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Access Denied</h1>
        <p className="text-lg mb-6 text-gray-700">You are not allowed to access this page.</p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
