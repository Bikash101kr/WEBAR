import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiMoreHorizontal } from "react-icons/fi";
import { themeColors } from "../config/theme";

import {
  FaShare,
  FaClone,
  FaCog,
  FaCode,
  FaChartBar,
  FaImage,
  FaTrash,
} from "react-icons/fa";

const dummyProjects = [
  {
    id: 0,
    name: "Structural Blueprint AR",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    date: "2024-10-01",
    views: 123,
  },
  {
    id: 1,
    name: "Interior AR Walkthrough",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    date: "2024-11-20",
    views: 89,
  },
  {
    id: 2,
    name: "Crane Simulation AR",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    date: "2024-01-10",
    views: 64,
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [menuOpen, setMenuOpen] = useState(null);

  const filteredProjects = dummyProjects
    .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date) - new Date(a.date)
        : a.name.localeCompare(b.name)
    );

  return (
    <div className="p-6  min-h-screen" style={{ backgroundColor: themeColors.primaryDark, color: themeColors.textLight }}>
      {/* Filter + Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by project name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700  placeholder-gray-400"style={{ backgroundColor: themeColors.primaryDark, color: themeColors.textLight }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <span>Sort By:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-700" style={{ backgroundColor: themeColors.primaryDark, color: themeColors.textLight }}
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Create New Project */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500 bg-[#1E293B] p-6 rounded-xl hover:bg-[#334155] cursor-pointer transition">
          <div className="text-4xl text-blue-400">+</div>
          <div className="mt-2 font-semibold text-blue-400 text-center">
            Create New Project
          </div>
        </div>

        {/* Project cards */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl shadow-md hover:shadow-lg transition relative " style={{ backgroundColor: themeColors.darkPurple, color: themeColors.textLight }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold text-white">{project.name}</h3>
              {project.views !== undefined && (
                <p className="text-sm text-gray-400">{project.views} views</p>
              )}
            </div>
            <button
              onClick={() =>
                setMenuOpen((prev) => (prev === project.id ? null : project.id))
              }
              className="absolute bottom-4 right-2 p-2 text-gray-400 hover:bg-gray-700 rounded-full"
            >
              <FiMoreHorizontal size={25} />
            </button>

            {/* Dropdown Menu */}
            {menuOpen === project.id && (
              <div className="absolute right-2 top-60 bg-[#1E293B] border border-gray-600 rounded-md shadow-lg w-40 z-50">
                <MenuItem icon={<FaShare />} label="Share" />
                <MenuItem icon={<FaClone />} label="Clone" />
                <MenuItem icon={<FaCog />} label="Settings" />
                <MenuItem icon={<FaCode />} label="Embed" />
                <MenuItem icon={<FaChartBar />} label="Analytics" />
                <MenuItem icon={<FaImage />} label="Edit Cover" />
                <MenuItem icon={<FaTrash />} label="Delete" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 w-full text-sm text-gray-200 hover:bg-[#334155]">
    {icon}
    {label}
  </button>
);

export default Projects;
