import React, { useState } from "react";
import { Search, Edit2, Trash2, Star } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  category: string;
  duration: string;
  uploadDate: string;
  status: "active" | "processing" | "inactive";
}

const MoviesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const movies: Movie[] = [
    {
      id: "1",
      title: "Inception",
      category: "Sci-Fi",
      duration: "2h 28m",
      uploadDate: "2024-03-01",
      status: "active",
    },
    {
      id: "2",
      title: "The Matrix",
      category: "Sci-Fi",
      duration: "2h 16m",
      uploadDate: "2024-02-28",
      status: "active",
    },
    {
      id: "3",
      title: "Interstellar",
      category: "Sci-Fi",
      duration: "2h 49m",
      uploadDate: "2024-02-27",
      status: "active",
    },
    {
      id: "4",
      title: "The Dark Knight",
      category: "Action",
      duration: "2h 32m",
      uploadDate: "2024-02-26",
      status: "active",
    },
    {
      id: "5",
      title: "Pulp Fiction",
      category: "Crime",
      duration: "2h 34m",
      uploadDate: "2024-02-25",
      status: "processing",
    },
  ];

  const handleEdit = (movieId: string) => {
    console.log("Edit movie:", movieId);
  };

  const handleDelete = (movieId: string) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      console.log("Delete movie:", movieId);
    }
  };

  const handleSetHero = (movieId: string) => {
    console.log("Set as hero movie:", movieId);
  };

  const getStatusColor = (status: Movie["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Filter movies by category"
          >
            <option value="all">All Categories</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="action">Action</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      </div>

      {/* Movies Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr
                  key={movie.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {movie.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {movie.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {movie.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {movie.uploadDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(movie.status)}`}
                    >
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(movie.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => handleSetHero(movie.id)}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors"
                        title="Set as Hero"
                      >
                        <Star size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">250</span> results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesManagement;
