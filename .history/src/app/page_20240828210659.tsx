import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rental House Company</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/login">
                  <a className="hover:bg-blue-700 px-4 py-2 rounded-md">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a className="hover:bg-blue-700 px-4 py-2 rounded-md">Dashboard</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <div className="text-center p-6">
          <h2 className="text-4xl font-bold mb-4">Welcome to Rental House Company</h2>
          <p className="text-lg mb-6">Your trusted partner in managing rental properties with ease and efficiency.</p>
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
