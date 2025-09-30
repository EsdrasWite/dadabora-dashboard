import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

function NotFound() {
  return (
    <div className="max-h-screen flex flex-col min-h-screen">
      <header className="w-full px-6 py-4 bg-slate-50 border-b border-solid border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" width={80} className="fit-content" />
          </div>
        </div>
      </header>
      {/* Not Found Page Content */}
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-pink-500">404</h1>
          <p className="mt-4 text-2xl text-[#323232]">Page non trouvéé</p>
          <p className="mt-2 text-gray-800">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded transition duration-300"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
