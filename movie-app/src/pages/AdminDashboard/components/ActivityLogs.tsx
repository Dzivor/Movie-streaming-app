import React, { useState } from "react";
import { Filter, Calendar } from "lucide-react";

interface ActivityLog {
  id: string;
  admin: string;
  action: string;
  entityType: string;
  entityName: string;
  timestamp: string;
  details: string;
}

const ActivityLogs: React.FC = () => {
  const [filterAdmin, setFilterAdmin] = useState("all");
  const [filterAction, setFilterAction] = useState("all");

  const logs: ActivityLog[] = [
    {
      id: "1",
      admin: "John Doe",
      action: "Upload Movie",
      entityType: "Movie",
      entityName: "Inception",
      timestamp: "2024-03-02 14:30:00",
      details: "Uploaded new movie with thumbnail and video",
    },
    {
      id: "2",
      admin: "Jane Smith",
      action: "Delete Movie",
      entityType: "Movie",
      entityName: "Old Movie",
      timestamp: "2024-03-02 13:15:00",
      details: "Removed outdated content",
    },
    {
      id: "3",
      admin: "John Doe",
      action: "Set Hero",
      entityType: "Movie",
      entityName: "The Matrix",
      timestamp: "2024-03-02 12:00:00",
      details: "Set as hero banner movie",
    },
    {
      id: "4",
      admin: "Jane Smith",
      action: "Create Category",
      entityType: "Category",
      entityName: "Documentary",
      timestamp: "2024-03-02 11:45:00",
      details: "Added new category for documentaries",
    },
    {
      id: "5",
      admin: "John Doe",
      action: "Edit Movie",
      entityType: "Movie",
      entityName: "Interstellar",
      timestamp: "2024-03-02 10:30:00",
      details: "Updated movie description and metadata",
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "Upload Movie":
        return "bg-blue-100 text-blue-800";
      case "Delete Movie":
        return "bg-red-100 text-red-800";
      case "Edit Movie":
        return "bg-yellow-100 text-yellow-800";
      case "Set Hero":
        return "bg-purple-100 text-purple-800";
      case "Create Category":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Filter size={20} />
            <span className="font-medium">Filter:</span>
          </div>

          <select
            value={filterAdmin}
            onChange={(e) => setFilterAdmin(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
            aria-label="Filter logs by admin"
          >
            <option value="all">All Admins</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
          </select>

          <select
            aria-label="select"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
          >
            <option value="all">All Actions</option>
            <option value="upload">Upload Movie</option>
            <option value="delete">Delete Movie</option>
            <option value="edit">Edit Movie</option>
            <option value="hero">Set Hero</option>
            <option value="category">Create Category</option>
          </select>

          <div className="flex items-center gap-2 flex-1">
            <Calendar size={20} className="text-gray-400" />
            <input
              aria-label="input"
              type="date"
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
            />
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 border border-gray-800 divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {log.admin.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-white">
                        {log.admin}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {log.entityType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {log.entityName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{log.timestamp}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="text-sm text-gray-400 max-w-xs truncate"
                      title={log.details}
                    >
                      {log.details}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-900 border border-gray-800 px-4 py-3 border-t border-gray-800 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">48</span> results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                3
              </button>
              <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
