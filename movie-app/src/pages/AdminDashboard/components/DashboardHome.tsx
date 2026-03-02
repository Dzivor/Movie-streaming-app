import React from "react";
import { Film, Users, CreditCard, Upload } from "lucide-react";

const DashboardHome: React.FC = () => {
  const stats = [
    { title: "Total Movies", value: "250", icon: Film, color: "bg-blue-500" },
    {
      title: "Total Users",
      value: "1,543",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Active Subscriptions",
      value: "892",
      icon: CreditCard,
      color: "bg-purple-500",
    },
    {
      title: "Uploads Today",
      value: "12",
      icon: Upload,
      color: "bg-orange-500",
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
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0"
            >
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.detail}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            + Upload Movie
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            + Add Category
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View All Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
