
import React from "react";
import { FiLayers, FiSettings } from "react-icons/fi";
import { themeColors } from "../config/theme";

const ProjectEditorSidebar = ({ selectedTab, openModal }) => {
  return (
    <div className="w-16 flex flex-col items-center py-4 border-r" 
      style={{ 
        backgroundColor: themeColors.primaryDark,
        borderColor: themeColors.primaryPurple + '40'
      }}>
      {/* Content Button */}
      <button
        onClick={() => openModal('content')}
        className={`p-3 rounded-lg mb-4 flex flex-col items-center ${
          selectedTab === 'content' 
            ? 'text-white bg-blue-600' 
            : 'text-gray-400 hover:bg-gray-700'
        }`}
        title="Content"
        style={{
          backgroundColor: selectedTab === 'content' 
            ? themeColors.secondaryCyan 
            : 'transparent',
          color: selectedTab === 'content' 
            ? themeColors.textLight 
            : themeColors.textMuted
        }}
      >
        <FiLayers size={20} />
        <span className="text-xs mt-1">Content</span>
      </button>

      {/* Settings Button */}
      <button
        onClick={() => openModal('settings')}
        className={`p-3 rounded-lg flex flex-col items-center ${
          selectedTab === 'settings' 
            ? 'text-white bg-blue-600' 
            : 'text-gray-400 hover:bg-gray-700'
        }`}
        title="Settings"
        style={{
          backgroundColor: selectedTab === 'settings' 
            ? themeColors.secondaryCyan 
            : 'transparent',
          color: selectedTab === 'settings' 
            ? themeColors.textLight 
            : themeColors.textMuted
        }}
      >
        <FiSettings size={20} />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
};

export default ProjectEditorSidebar;