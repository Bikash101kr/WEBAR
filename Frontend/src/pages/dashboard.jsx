import React, { useState } from "react";
import { themeColors } from "../config/theme";
import Sidebar from "../components/Sidebar";
import HomeModal from "../modal/homeModal";
import Project from "./project";
import MediaModal from "../modal/mediaModal";
import SettingsModal from "../modal/settingsModal";
import AnalyticsModal from "../modal/analyticsModal";

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState("home");
  const [selectedTab, setSelectedTab] = useState("home");

  const openModal = (modalName) => {
    setActiveModal(modalName);
    setSelectedTab(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'home':
        return <HomeModal onClose={closeModal} />;
      case 'projects':
        return <Project onClose={closeModal} />;
      case 'media':
        return <MediaModal onClose={closeModal} />;
      case 'settings':
        return <SettingsModal onClose={closeModal} />;
      case 'analytics':
        return <AnalyticsModal onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: themeColors.primaryDark, color: themeColors.textLight }}>
      <Sidebar 
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        openModal={openModal}
      /> 
      <main className="flex-1 pb-8 overflow-auto">
        {/* Dashboard content when no modal is open */}
        {!activeModal && (
          <section className="rounded-xl p-6" style={{ backgroundColor: themeColors.primaryPurple + '15' }}>
                <h2 className="text-xl font-semibold">Welcome to User Dashboard</h2>
                  <p className="mt-4" style={{ color: themeColors.textMuted }}>Select a section from the sidebar to navigate more features.</p>
            </section>
        )}

        {/* Render the active modal */}
        {renderModal()}
      </main>
    </div>
  );
};

export default Dashboard;