import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src="/logo.jpg" className='w-8 h-8' />
          <h1 className="text-2xl font-bold">Horizon Housing</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/login">
                  <p className="hover:bg-blue-700 px-4 py-2 rounded-md">Login</p>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <p className="hover:bg-blue-700 px-4 py-2 rounded-md">Dashboard</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <div className="text-center p-6">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Welcome to Rental House Company</h2>
          <p className="text-lg mb-6 text-blue-600">Your trusted partner in managing rental properties with ease and efficiency.</p>
          <Link href="/dashboard">
            <p className="bg-blue-800 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700">Get Started</p>
          </Link>
        </div>
      </main>

      <footer className="bg-blue-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Rental House Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
