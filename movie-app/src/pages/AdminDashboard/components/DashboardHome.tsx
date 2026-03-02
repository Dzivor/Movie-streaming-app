import React from "react";
import { Film, Users, CreditCard, Upload } from "lucide-react";

const DashboardHome: React.FC = () => {
  const stats = [
    { title: "Total Movies", value: "250", icon: Film, color: "bg-red-600" },
    {
      title: "Total Users",
      value: "1,543",
      icon: Users,
      color: "bg-red-700",
    },
    {
      title: "Active Subscriptions",
      value: "892",
      icon: CreditCard,
      color: "bg-red-600",
    },
    {
      title: "Uploads Today",
      value: "12",
      icon: Upload,
      color: "bg-red-700",
    },
  ];

  const recentActivities = [
    {
      action: "Movie uploaded",
      detail: "Inception added to library",
      time: "2 min ago",
    },
    {
      action: "User registered",
      detail: "john.doe@example.com",
      time: "15 min ago",
    },
    {
      action: "Hero movie set",
      detail: "The Matrix set as hero",
      time: "1 hour ago",
    },
    {
      action: "Movie deleted",
      detail: "Old Movie removed",
      time: "2 hours ago",
    },
    {
      action: "Category created",
      detail: "Documentary category added",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg hover:shadow-red-600/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.color} w-14 h-14 rounded-full flex items-center justify-center`}
                >
                  <Icon className="text-white" size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b border-gray-800 last:border-b-0 last:pb-0"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-semibold text-white">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.detail}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg shadow-red-600/30 hover:shadow-red-600/50">
            + Upload Movie
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700">
            + Add Category
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700">
            View All Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
