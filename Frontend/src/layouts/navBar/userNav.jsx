import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { themeColors } from '../../config/theme';

const UserNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header
            className="flex justify-between items-center px-10 py-4 shadow-md"
            style={{ backgroundColor: themeColors.darkPurple }}
        >
            {/* Left: Logo + Navigation */}
            <div className="flex items-center gap-12">
                <Link
                    to="/"
                    className="text-3xl font-bold tracking-tight"
                    style={{
                        background: 'linear-gradient(45deg, #00C2CB, #6C5CE7)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    WEBAR
                </Link>

                <nav className="flex items-center gap-10 ml-12 text-lg font-medium">
                    <Link
                        to="/user/projects"
                        className="text-[#E0E0E0] hover:text-cyan-300 transition-colors duration-200"
                    >
                        My Projects
                    </Link>
                    <Link
                        to="/user/media"
                        className="text-[#E0E0E0] hover:text-indigo-300 transition-colors duration-200"
                    >
                        Media
                    </Link>
                </nav>
            </div>

            {/* Right: Panel Info + Settings + Profile */}
            <div className="flex items-center gap-8">
                <span
                    className="text-xl font-semibold tracking-wide"
                    style={{
                        background: 'linear-gradient(45deg, #00C2CB, #6C5CE7)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    USER PANEL
                </span>

                <Link
                    to="/user/settings"
                    className="text-[#E0E0E0] text-lg font-medium hover:text-purple-300 transition-colors duration-200"
                >
                    Settings
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: themeColors.accentPink }}
                        >
                            <span className="text-white font-semibold">A</span>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div
                            className="absolute right-0 top-12 w-48 py-2 rounded-lg shadow-xl z-10"
                            style={{
                                backgroundColor: themeColors.primaryDark,
                                border: `1px solid ${themeColors.primaryPurple}`,
                            }}
                        >
                            <button
                                className="w-full px-4 py-3 text-left hover:bg-purple-900/60 text-white"
                                style={{ borderBottom: `1px solid ${themeColors.primaryPurple}` }}
                            >
                                Settings
                            </button>
                            <button
                                className="w-full px-4 py-3 text-left hover:bg-red-800/50 text-white"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default UserNavbar;
