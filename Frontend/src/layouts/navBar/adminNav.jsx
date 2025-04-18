import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/NextXR.png';  // Import the logo from assets folder

// Define theme colors
const themeColors = {
    primaryDark: "#0A1A2F",    // Dark blue background
    darkPurple: "#2B1A5D",
    primaryPurple: "#6C5CE7", // Main purple
    secondaryCyan: "#00C2CB", // Accent cyan
    accentPink: "#FF6B6B",    // Accent pink
    textLight: "#FFFFFF",     // White text
    textMuted: "#A8A8A8"      // Gray text
};

const AdminNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header
            className="flex justify-between items-center px-6 py-4"
            style={{ backgroundColor: themeColors.darkPurple }}
        >
            {/* Logo and Admin Panel */}
            <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-extrabold" style={{
                    background: 'linear-gradient(45deg, #00C2CB, #6C5CE7)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                    marginBottom: '-5px' // Moves "WEBAR" up slightly
                }}>
                    WEBAR
                </Link>
                <span className="text-lg font-semibold text-white" style={{ marginTop: '12px' }}> {/* Increased marginTop for Admin Panel */}
                    Admin Panel
                </span>
            </div>

            {/* Actions: New Project Button and Profile Dropdown */}
            <div className="flex items-center gap-6 relative">
                {/* New Project Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ backgroundColor: themeColors.secondaryCyan }}
                    className="px-6 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                >
                    ➕ New Project
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: themeColors.accentPink }}
                        >
                            <span className="text-white font-semibold">A</span>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div
                            className="absolute right-0 top-12 w-48 py-2 rounded-lg shadow-xl"
                            style={{
                                backgroundColor: themeColors.primaryDark,
                                border: `1px solid ${themeColors.primaryPurple}`,
                            }}
                        >
                            <button
                                className="w-full px-4 py-3 text-left hover:bg-purple-900/20 text-white"
                                style={{ borderBottom: `1px solid ${themeColors.primaryPurple}` }}
                            >
                                ⚙️ Settings
                            </button>
                            <button className="w-full px-4 py-3 text-left hover:bg-purple-900/20 text-white">
                                👋 Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
