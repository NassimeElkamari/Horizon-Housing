
import { useRouter } from 'next/navigation';

const AccessDeniedPage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center " >
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
