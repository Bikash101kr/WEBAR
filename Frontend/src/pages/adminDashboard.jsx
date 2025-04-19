import { themeColors } from '../config/theme';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newProject, setNewProject] = useState({
        name: "",
        type: ""
    });
    const navigate = useNavigate();

    // Fetch data based on selected tab
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                if (selectedTab === "users") {
                    const response = await API.get('/users');
                    setUsers(response.data.data);
                } else if (selectedTab === "projects") {
                    const response = await API.get('/projects');
                    setProjects(response.data.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch data');
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTab, navigate]);

    // Handle user deletion
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await API.delete(`/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    // Handle project creation
    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/projects', newProject);
            setProjects([...projects, response.data.data]);
            setIsModalOpen(false);
            setNewProject({ name: "", type: "" });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project');
        }
    };

    // Handle project deletion
    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await API.delete(`/projects/${projectId}`);
                setProjects(projects.filter(project => project._id !== projectId));
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete project');
            }
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await API.get('/auth/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            setError('Failed to logout');
        }
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: themeColors.primaryDark, color: themeColors.textLight }}>
            {/* Sidebar */}
            <aside className="w-64 p-5 flex flex-col border-r" style={{ borderColor: themeColors.primaryPurple + '40' }}>
                

                <nav className="flex-1">
                    <ul className="space-y-3">
                        {[
                            { label: "📊 Dashboard", tab: "dashboard" },
                            { label: "👥 Users", tab: "users" },
                            { label: "📂 Projects", tab: "projects" },
                            { label: "⚙️ Settings", tab: "settings" },
                        ].map((item) => (
                            <li key={item.tab}>
                                <button
                                    onClick={() => setSelectedTab(item.tab)}
                                    style={{
                                        backgroundColor: selectedTab === item.tab ? themeColors.primaryPurple + '30' : 'transparent',
                                        color: selectedTab === item.tab ? themeColors.textLight : themeColors.textMuted
                                    }}
                                    className="w-full text-left p-3 rounded-lg transition-colors hover:bg-purple-900/20"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {error && (
                    <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: themeColors.accentPink + '20' }}>
                        <p style={{ color: themeColors.accentPink }}>{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
                            style={{ borderColor: themeColors.primaryPurple }} />
                    </div>
                ) : selectedTab === "users" ? (
                    <section className="rounded-xl p-6 mb-8" style={{ backgroundColor: themeColors.primaryPurple + '15' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">User Management</h2>
                            <button
                                style={{ backgroundColor: themeColors.secondaryCyan }}
                                className="px-4 py-2 rounded-lg font-medium hover:opacity-90"
                                onClick={() => navigate('/admindash/users/new')}
                            >
                                ➕ Add New User
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ backgroundColor: themeColors.primaryPurple + '30' }}>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-left">Role</th>
                                        <th className="p-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="border-b"
                                            style={{ borderColor: themeColors.primaryPurple + '20' }}
                                        >
                                            <td className="p-3">{user.firstName} {user.lastName}</td>
                                            <td className="p-3" style={{ color: themeColors.textMuted }}>{user.email}</td>
                                            <td className="p-3 capitalize">{user.role}</td>
                                            <td className="p-3 flex gap-2">
                                                <button
                                                    style={{ color: themeColors.secondaryCyan }}
                                                    className="hover:opacity-80"
                                                    onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    style={{ color: themeColors.accentPink }}
                                                    className="hover:opacity-80"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ) : selectedTab === "projects" ? (
                    <section className="rounded-xl p-6" style={{ backgroundColor: themeColors.primaryPurple + '15' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Project Management</h2>
                            <button
                                style={{ backgroundColor: themeColors.secondaryCyan }}
                                className="px-4 py-2 rounded-lg font-medium hover:opacity-90"
                                onClick={() => setIsModalOpen(true)}
                            >
                               ➕ New Project
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((project) => (
                                <div
                                    key={project._id}
                                    className="p-4 rounded-lg hover:bg-purple-900/10 transition-colors relative"
                                    style={{ border: `1px solid ${themeColors.primaryPurple}20` }}
                                >
                                    <button
                                        onClick={() => handleDeleteProject(project._id)}
                                        style={{ color: themeColors.accentPink }}
                                        className="absolute top-2 right-2 hover:opacity-80"
                                    >
                                        ×
                                    </button>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{project.name}</h3>
                                            <p className="text-sm" style={{ color: themeColors.textMuted }}>
                                                {project.type}
                                            </p>
                                        </div>
                                        <span className="text-sm" style={{ color: themeColors.textMuted }}>
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <section className="rounded-xl p-6" style={{ backgroundColor: themeColors.primaryPurple + '15' }}>
                        <h2 className="text-xl font-semibold">Welcome to Admin Dashboard</h2>
                        <p className="mt-4" style={{ color: themeColors.textMuted }}>
                            Select a section from the sidebar to manage users or projects.
                        </p>
                    </section>
                )}

                {/* New Project Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div
                            className="w-full max-w-md p-6 rounded-xl"
                            style={{
                                backgroundColor: themeColors.primaryDark,
                                border: `1px solid ${themeColors.primaryPurple}`
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
                            <form onSubmit={handleCreateProject}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Project Name"
                                    value={newProject.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg focus:ring-2 mb-4"
                                    style={{
                                        backgroundColor: themeColors.primaryPurple + '15',
                                        color: themeColors.textLight
                                    }}
                                    required
                                />
                                <select
                                    name="type"
                                    value={newProject.type}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg focus:ring-2 mb-4"
                                    style={{
                                        backgroundColor: themeColors.primaryPurple + '15',
                                        color: themeColors.textLight
                                    }}
                                    required
                                >
                                    <option value="">Select Project Type</option>
                                    <option value="AR Marketing">AR Marketing</option>
                                    <option value="VR Training">VR Training</option>
                                    <option value="AI Integration">AI Integration</option>
                                </select>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: themeColors.secondaryCyan }}
                                        className="flex-1 p-3 rounded-lg font-medium hover:opacity-90"
                                    >
                                        Create Project
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setNewProject({ name: "", type: "" });
                                        }}
                                        style={{ backgroundColor: themeColors.accentPink }}
                                        className="flex-1 p-3 rounded-lg font-medium hover:opacity-90"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;