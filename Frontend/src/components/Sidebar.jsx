import React from "react";
import { themeColors } from "../config/theme";

const Sidebar = ({ selectedTab, setSelectedTab, openModal }) => {
  const tabs = [
    { label: "🏠 Home", tab: "home" },
    { label: "📁 My Projects", tab: "projects" },
    { label: "🎨 Media", tab: "media" },
    { label: "⚙️ Settings", tab: "settings" },
    { label: "📊 Analytics", tab: "analytics" }
  ];

  return (
    <aside className="w-64 p-5 flex flex-col border-r" style={{ borderColor: themeColors.primaryPurple + '40' }}>
      <nav className="flex-1">
        <ul className="space-y-3">
          {tabs.map((item) => (
            <li key={item.tab}>
              <button
              className="w-full text-left p-3 rounded-lg transition-colors hover:bg-purple-700/30"
                onClick={() => {
                  setSelectedTab(item.tab);
                  openModal(item.tab);
                }}
                style={{ 
                  //backgroundColor: selectedTab === item.tab ? themeColors.primaryPurple + '30' : 'transparent',
                  
                  color: selectedTab === item.tab ? themeColors.textLight : themeColors.textMuted 
                }}
               
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;