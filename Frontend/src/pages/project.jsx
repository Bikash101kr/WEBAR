import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiChevronDown, FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  FaShare,
  FaClone,
  FaCog,
  FaCode,
  FaChartBar,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CreateProjectModal from "../modal/CreateProjectModal";
import { themeColors } from "../config/theme";

const Projects = () => {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [menuOpen, setMenuOpen] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const createButtonRef = useRef(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.id) {
      const fetchProjects = async () => {
        setLoading(true);
        try {
          const response = await API.get("/projects", {
            params: { owner: user.id },
          });
          if (response?.data?.data) {
            setProjects(response.data.data);
          } else {
            console.warn("No project data received.");
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
          setError("Error fetching projects. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }
  }, [user]);

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      setMenuOpen(null);
    } catch (error) {
      console.error("Failed to delete project", error);
      alert("Failed to delete project");
    }
  };

  const filteredProjects = projects
    .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : a.name.localeCompare(b.name)
    );

  const openEditor = (projectId) => {
    navigate(`/project/projectEditor/${projectId}`);
  };

  return (
    <div
      className="relative p-6 min-h-screen"
      style={{
        backgroundColor: themeColors.primaryDark,
        color: themeColors.textLight,
      }}
    >
      {/* Filter + Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        {/* Add your filter and sort UI here */}
      </div>

      {loading && <div className="text-center text-white">Loading projects...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          ref={createButtonRef}
          className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500 bg-[#1E293B] p-6 rounded-xl hover:bg-[#334155] cursor-pointer transition"
          onClick={() => setShowCreateModal(true)}
        >
          <div className="text-4xl text-blue-400">+</div>
          <div className="mt-2 font-semibold text-blue-400 text-center">
            Create New Project
          </div>
        </div>

        {filteredProjects.length === 0 && !loading && !error ? (
          <div className="col-span-full text-center text-gray-400">
            No projects found.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              className="relative rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              style={{
                backgroundColor: themeColors.darkPurple,
                color: themeColors.textLight,
              }}
              onClick={() => openEditor(project._id)} // ✅ Full card is clickable
            >
              <img
                src={project.thumbnail || "/default-thumbnail.jpg"}
                alt={project.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.views} views</p>
              </div>

              {/* Menu button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  setMenuOpen((prev) => (prev === project._id ? null : project._id));
                }}
                className="absolute bottom-4 right-2 p-2 text-gray-400 hover:bg-gray-700 rounded-full"
              >
                <FiMoreHorizontal size={25} />
              </button>

              {/* Menu options */}
              {menuOpen === project._id && (
                <div className="absolute right-2 top-60 bg-[#1E293B] border border-gray-600 rounded-md shadow-lg w-40 z-50">
                  <MenuItem icon={<FaShare />} label="Share" />
                  <MenuItem icon={<FaClone />} label="Clone" />
                  <MenuItem icon={<FaCog />} label="Settings" />
                  <MenuItem icon={<FaCode />} label="Embed" />
                  <MenuItem icon={<FaChartBar />} label="Analytics" />
                  <MenuItem icon={<FaImage />} label="Edit Cover" />
                  <MenuItem
                    icon={<FaTrash />}
                    label="Delete"
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ Prevent card navigation
                      handleDelete(project._id);
                    }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="relative inset-0 z-50">
          <CreateProjectModal onClose={() => setShowCreateModal(false)} />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 w-full text-sm text-gray-200 hover:bg-[#334155]"
  >
    {icon}
    {label}
  </button>
);

export default Projects;
