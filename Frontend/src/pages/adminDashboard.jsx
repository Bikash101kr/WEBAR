
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../layouts/navBar/adminNav";

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("users");
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Colors from nextxrgroup.com.au
    const themeColors = {
        primaryDark: "#0A1A2F",    // Dark blue background
        primaryPurple: "#6C5CE7", // Main purple
        secondaryCyan: "#00C2CB", // Accent cyan
        accentPink: "#FF6B6B",    // Accent pink
        textLight: "#FFFFFF",     // White text
        textMuted: "#A8A8A8"      // Gray text
    };

    // Mock data
    const [users] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", projects: 5 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", projects: 3 },
    ]);

    const [projects] = useState([
        { id: 1, name: "AR Product Demo", owner: "John Doe", created: "2024-03-15" },
        { id: 2, name: "VR Training Module", owner: "Jane Smith", created: "2024-03-14" },
    ]);

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
                            { label: "⚙️ Tools", tab: "tools" },
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
            <main className="flex-1 p-8">
                {/* Admin Header */}
                {/* Content Sections */}
                {selectedTab === "users" && (
                    <section className="rounded-xl p-6 mb-8" style={{ backgroundColor: themeColors.primaryPurple + '15' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">User Management</h2>
                            <button
                                style={{ backgroundColor: themeColors.secondaryCyan }}
                                className="px-4 py-2 rounded-lg font-medium hover:opacity-90"
                            >
                                Add New User
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ backgroundColor: themeColors.primaryPurple + '30' }}>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-left">Projects</th>
                                        <th className="p-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b"
                                            style={{ borderColor: themeColors.primaryPurple + '20' }}
                                        >
                                            <td className="p-3">{user.name}</td>
                                            <td className="p-3" style={{ color: themeColors.textMuted }}>{user.email}</td>
                                            <td className="p-3">{user.projects}</td>
                                            <td className="p-3 flex gap-2">
                                                <button
                                                    style={{ color: themeColors.secondaryCyan }}
                                                    className="hover:opacity-80"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    style={{ color: themeColors.accentPink }}
                                                    className="hover:opacity-80"
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
                )}

                {/* Projects Section */}
                {selectedTab === "projects" && (
                    <section className="rounded-xl p-6" style={{ backgroundColor: themeColors.primaryPurple + '15' }}>
                        <h2 className="text-xl font-semibold mb-6">All Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="p-4 rounded-lg hover:bg-purple-900/10 transition-colors"
                                    style={{ border: `1px solid ${themeColors.primaryPurple}20` }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{project.name}</h3>
                                            <p className="text-sm" style={{ color: themeColors.textMuted }}>{project.owner}</p>
                                        </div>
                                        <span className="text-sm" style={{ color: themeColors.textMuted }}>{project.created}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                            <h2 className="text-2xl font-bold mb-4">Create New AR Project</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    className="w-full p-3 rounded-lg focus:ring-2"
                                    style={{
                                        backgroundColor: themeColors.primaryPurple + '15',
                                        color: themeColors.textLight
                                    }}
                                />
                                <select
                                    className="w-full p-3 rounded-lg focus:ring-2"
                                    style={{
                                        backgroundColor: themeColors.primaryPurple + '15',
                                        color: themeColors.textLight
                                    }}
                                >
                                    <option>Select Project Type</option>
                                    <option>AR Marketing</option>
                                    <option>VR Training</option>
                                    <option>AI Integration</option>
                                </select>
                                <div className="flex gap-4">
                                    <button
                                        style={{ backgroundColor: themeColors.secondaryCyan }}
                                        className="flex-1 p-3 rounded-lg font-medium hover:opacity-90"
                                    >
                                        Create Project
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        style={{ backgroundColor: themeColors.accentPink }}
                                        className="flex-1 p-3 rounded-lg font-medium hover:opacity-90"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;