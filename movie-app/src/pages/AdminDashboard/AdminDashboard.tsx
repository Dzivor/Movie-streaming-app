import React, { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Home, Film, FolderOpen, Users, Activity, LogOut } from "lucide-react";

// Lazy loading
const DashboardHome = lazy(() => import("./components/DashboardHome"));
const MoviesManagement = lazy(() => import("./components/MoviesManagement"));
const UploadMovie = lazy(() => import("./components/UploadMovie"));
const CategoriesManagement = lazy(
  () => import("./components/CategoriesManagement"),
);
const ActivityLogs = lazy(() => import("./components/ActivityLogs"));

// User Management placeholder component
const UserManagement: React.FC = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white">User Management</h2>
    <p className="text-gray-400 mt-2">Coming soon...</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: Home },
    { path: "/admin/movies", label: "Movies", icon: Film },
    { path: "/admin/upload", label: "Upload Movie", icon: FolderOpen },
    { path: "/admin/categories", label: "Categories", icon: FolderOpen },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/logs", label: "Activity Logs", icon: Activity },
  ];

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar - Fixed */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">StreamVibe</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-l-4 border-red-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-black">
        {/* Header Bar */}
        <header className="bg-gray-900 border-b border-gray-800 shadow-sm px-6 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {menuItems.find((item) => item.path === location.pathname)
                ?.label || "Dashboard"}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Admin User</span>
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/30">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area with Routes */}
        <div className="p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-400">Loading...</div>
              </div>
            }
          >
            <Routes>
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="movies" element={<MoviesManagement />} />
              <Route path="upload" element={<UploadMovie />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="logs" element={<ActivityLogs />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
