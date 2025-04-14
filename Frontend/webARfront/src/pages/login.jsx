import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomePage from './homepage';  // Import HomePage

const Login = () => {
  // Define formData with useState
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Update state when inputs change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add further form submission logic here (e.g., API call)
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    // Add Google authentication logic here
  };

  // Handle Apple Sign-In
  const handleAppleSignIn = () => {
    console.log("Apple Sign-In clicked");
    // Add Apple authentication logic here
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
      {/* Render HomePage component in the background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HomePage />
      </div>

      {/* Mosaic effect: Create pixelated blur effect */}
      <div className="absolute inset-0 z-0 bg-black opacity-50 backdrop-blur-md mosaic-effect"></div>

      {/* Apply styles to the form to be positioned on top of the HomePage */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        {/* NextXR Button */}
        <div className="text-center mb-6">
          <Link to="/">
            <button className="text-xl font-bold text-blue-600 hover:text-purple-950">
              NextXR
            </button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Page</h1>

        {/* Login Form */}
        <form className="mb-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Sign-In Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="bg-red-500 text-white font-semibold rounded-lg px-4 py-2 w-full hover:bg-red-600 transition"
          >
            Sign in with Google
          </button>
          <button
            onClick={handleAppleSignIn}
            className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full hover:bg-gray-800 transition"
          >
            Sign in with Apple
          </button>
        </div>

        {/* Sign Up Redirect */}
        <div className="text-center mt-6">
          <p className="text-gray-700 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
