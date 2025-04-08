import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./layouts/navbar";
import AdminNavbar from "./layouts/navBar/adminNav";
import MainBody from "./layouts/mainbody";
import Footer from "./layouts/footer";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/adminDashboard";
import Pricing from "./pages/pricing";
import Project from "./pages/project";

function App() {
  const location = useLocation();

  // Properly define routes where Navbar and Footer should not be displayed
  const hideNavbarRoutes = ["/register", "/login"];
  const hideFooterRoutes = ["/register", "/login"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  const showFooter = !hideFooterRoutes.includes(location.pathname);
  let NavbarComponent;
  if (location.pathname.startsWith("/adminDashboard")) {
    NavbarComponent = AdminNavbar;
  } else if (location.pathname.startsWith("/dashboard")) {
    NavbarComponent = DashboardNavbar;
  } else {
    NavbarComponent = Navbar; // Default Navbar for visitors
  }

  return (
    <div className="  min-h-screen">
      {/* Conditionally render Navbar */}
      {showNavbar && (

        <NavbarComponent />

      )}
      {/* Main content area */}
      <div className="mainbody-container flex-grow bg-gray-100 ">
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </div>
      {/* Conditionally render Footer */}
      {showFooter && (
        <div className="footer-container bg-gray-800 text-white p-4 text-center">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;