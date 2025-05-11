
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-5xl font-bold mb-4 text-artflow-blue">404</h1>
        <p className="text-xl text-gray-600 mb-6">页面未找到</p>
        <p className="text-gray-500 mb-8">
          您访问的页面不存在或者已被移除。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-artflow-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Home size={18} />
            <span>返回首页</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>返回上页</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
