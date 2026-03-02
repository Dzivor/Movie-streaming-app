import React, { useState } from "react";
import { Home, Film, FolderOpen, Users, Activity, LogOut } from "lucide-react";
import DashboardHome from "./components/DashboardHome";
import MoviesManagement from "./components/MoviesManagement";
import UploadMovie from "./components/UploadMovie";
import ActivityLogs from "./components/ActivityLogs";
import CategoriesManagement from "./components/CategoriesManagement";

type SectionType =
  | "dashboard"
  | "movies"
  | "upload"
  | "categories"
  | "users"
  | "logs";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("dashboard");

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
  };

  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "movies":
        return <MoviesManagement />;
      case "upload":
        return <UploadMovie />;
      case "categories":
        return <CategoriesManagement />;
      case "users":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600 mt-2">Coming soon...</p>
          </div>
        );
      case "logs":
        return <ActivityLogs />;
      default:
        return <DashboardHome />;
    }
  };

  const menuItems = [
    { id: "dashboard" as SectionType, label: "Dashboard", icon: Home },
    { id: "movies" as SectionType, label: "Movies", icon: Film },
    { id: "upload" as SectionType, label: "Upload Movie", icon: FolderOpen },
    { id: "categories" as SectionType, label: "Categories", icon: FolderOpen },
    { id: "users" as SectionType, label: "Users", icon: Users },
    { id: "logs" as SectionType, label: "Activity Logs", icon: Activity },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed, doesn't change */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Movie Streaming</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white border-l-4 border-indigo-400"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - Changes based on active section */}
      <main className="flex-1 overflow-y-auto">
        {/* Header Bar */}
        <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find((item) => item.id === activeSection)?.label}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Admin User</span>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area - This is what changes */}
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
