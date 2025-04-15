import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomePage from './homepage';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3005/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, data } = response.data;

      // Save token and user details in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", data.role); // Corrected here
      localStorage.setItem("data", JSON.stringify(data));

      // Redirect based on role
      if (data.role === "admin") { // Using comparison operator here
        navigate("/admindash");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      console.error("Login error:", err);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    // Future: Add Google OAuth integration
  };

  const handleAppleSignIn = () => {
    console.log("Apple Sign-In clicked");
    // Future: Add Apple OAuth integration
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HomePage />
      </div>
      <div className="absolute inset-0 z-0 bg-black opacity-50 backdrop-blur-md mosaic-effect"></div>

      <div className="relative z-10 bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/">
            <button className="text-xl font-bold text-blue-600 hover:text-purple-950">
              NextXR
            </button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Page</h1>

        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
        )}

        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

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

        <div className="text-center mt-6">
          <p className="text-gray-700 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
