import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import HomePage from './homepage';  // Import HomePage (or replace with desired background component)

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    password: "",
    passwordConfirmation: "",
    rememberMe: false,
    agreeToPolicies: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for policies checkbox
    if (!formData.agreeToPolicies) {
      alert("You must agree to the Privacy Policy and Terms of Service!");
      return;
    }
    // Password matching validation
    if (formData.password !== formData.passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration Form Data Submitted:", formData);
    // Add further form submission logic here (e.g., API call)
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
      {/* Render HomePage component in the background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HomePage />
      </div>

      {/* Mosaic effect: Create pixelated blur effect */}
      <div className="absolute inset-0 z-0 bg-black opacity-50 backdrop-blur-md mosaic-effect"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        {/* NextXR Button */}
        <div className="text-center mb-6">
          <Link to="/">
            <button className="text-xl font-bold text-blue-600 hover:text-purple-950">
              NextXR
            </button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>

        {/* Registration Form */}
        <form className="mb-6" onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Work Email Field */}
          <div className="mb-4">
            <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Work Email
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              placeholder="Enter your work email"
              value={formData.workEmail}
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

          {/* Password Confirmation Field */}
          <div className="mb-4">
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Confirm your password"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Privacy Policy and Terms of Service */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreeToPolicies"
              name="agreeToPolicies"
              checked={formData.agreeToPolicies}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="agreeToPolicies" className="ml-2 text-sm text-gray-700">
              I agree to the <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</a>.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 w-full hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already Have an Account? */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
