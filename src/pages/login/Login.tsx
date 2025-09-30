// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import logo from "../../assets/logo.jpg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="max-h-screen flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-slate-50 border-b border-solid border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* <div className="text-2xl font-bold text-pink-500">dadaBora</div> */}

          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" width={80} className="fit-content" />
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Don't have an account?</span>
            <button className="text-pink-500 hover:text-pink-600 cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to your dadaBora account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400 text-sm"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-solid border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400 text-sm"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-solid border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400 text-sm`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-pink-500 hover:text-pink-600 cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 font-medium text-sm transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{" "}
                </span>
                <button
                  type="button"
                  className="text-sm text-pink-500 hover:text-pink-600 cursor-pointer"
                >
                  Sign up for free
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-6 py-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © 2025 dadaBora. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <button className="hover:text-gray-700 cursor-pointer">
                Privacy Policy
              </button>
              <button className="hover:text-gray-700 cursor-pointer">
                Terms of Service
              </button>
              <button className="hover:text-gray-700 cursor-pointer">
                Contact
              </button>
              <button className="hover:text-gray-700 cursor-pointer">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
