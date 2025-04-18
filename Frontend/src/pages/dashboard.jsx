import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Dashboard = () => {
  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <div className="text-xl font-bold text-gray-700">NextXR</div>
        <nav className="mt-5">
          <ul>
            {[
              { label: "🏠 Home", href: "#", active: true },
              { label: "📁 My Projects", href: "#" },
              { label: "📦 Storage", href: "#" },
            ].map((item, index) => (
              <li key={index} className="mb-3">
                <a
                  href={item.href}
                  className={`flex items-center ${
                    item.active ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="mt-auto bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
          Upgrade
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Home</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={openModal}
          >
            Create New Project
          </button>
        </header>

        {/* Modal Section */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Create New Project
              </h2>
              <p className="text-gray-600 mb-4">
                Choose an option below to proceed with your project.
              </p>
              <div className="space-y-4">
                {/* Corrected Link to Project Page */}
                <Link to="/project">
                  <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition">
                    Choose Your AR Project
                  </button>
                </Link>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 w-full rounded-lg hover:bg-gray-300 transition">
                  Browse Existing Projects
                </button>
              </div>
              <button
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* AI Assistant Section */}
        <section className="mt-8 p-6 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
          <p className="text-gray-600">
            Do you want to know more about augmented reality
          </p>
          <input
            type="text"
            placeholder="For example, how can I use AR in product packaging?"
            className="mt-4 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </section>

        {/* AR Achievements Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            What Can Be Achieved with AR?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {[
              { title: "AR & Marketing: 15 Ideas", img: "https://via.placeholder.com/150" },
              { title: "AR & Food: 15 Ideas", img: "https://via.placeholder.com/150" },
              { title: "AR & Books: 5 Ideas", img: "https://via.placeholder.com/150" },
              { title: "10 Businesses Perfect for AR", img: "https://via.placeholder.com/150" },
              { title: "AR & Packaging: 20 Tips", img: "https://via.placeholder.com/150" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition">
                <img src={item.img} alt={item.title} className="w-full rounded-lg" />
                <h2 className="mt-2 font-medium text-gray-800">{item.title}</h2>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;