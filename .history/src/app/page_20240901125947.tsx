'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    
    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className='flex gap-5'>
            <img src="/logo.png" className='w-8 h-8' alt="Horizon Housing Logo" />
            <h1 className="text-2xl font-bold">Omar Arifi</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              {isLoggedIn ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-blue-700 px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link href="/login">
                    <p className="hover:bg-blue-700 px-4 py-2 rounded-md">Login</p>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/dashboard">
                  <p className="hover:bg-blue-700 px-4 py-2 rounded-md">Dashboard</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 bg-cover bg-center" style={{ backgroundImage: "url('/bgg.jpg')" }}>
        <div className="text-center p-6 bg-opacity-75 bg-white rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Welcome to Horizon Housing</h2>
          <p className="text-lg mb-6 text-blue-600">Your trusted partner in managing rental properties with ease and efficiency.</p>
          <Link href="/dashboard">
            <p className="bg-blue-800 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700">Get Started</p>
          </Link>
        </div>
      </main>

      <footer className="bg-blue-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Horizon Housing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
