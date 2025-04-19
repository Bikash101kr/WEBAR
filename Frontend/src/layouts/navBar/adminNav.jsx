import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { themeColors } from '../../config/theme';

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
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
                    
                }}>
                    WEBAR
                </Link>
                
            </div>

            {/* Actions: New Project Button and Profile Dropdown */}
            <div className="flex items-center gap-6 relative">
            <span className="text-lg font-semibold text-white" style={{
                    background: 'linear-gradient(45deg, #00C2CB, #6C5CE7)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}> 
                   ADMIN PANEL
                </span>
            
                

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
                                className="w-full px-4 py-3 text-left hover:bg-purple-900/60 text-white"
                                style={{ borderBottom: `1px solid ${themeColors.primaryPurple}` }}
                            >
                                ⚙️ Settings
                            </button>
                            
                            <button 
                           className="w-full px-4 py-3 text-left hover:bg-red-800/50 text-white" 
                          
                          
                          // onClick={handleLogout}
                            >
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
