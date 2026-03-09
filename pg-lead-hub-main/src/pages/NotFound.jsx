import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="text-6xl font-bold text-slate-200">404</h1>
      <p className="mt-3 text-lg font-semibold text-slate-800">Page Not Found</p>
      <p className="mt-1 text-sm text-slate-500">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
