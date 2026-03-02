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
        return "bg-green-900/50 text-green-400 border border-green-800";
      case "processing":
        return "bg-yellow-900/50 text-yellow-400 border border-yellow-800";
      case "inactive":
        return "bg-red-900/50 text-red-400 border border-red-800";
      default:
        return "bg-gray-800 text-gray-400 border border-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder-gray-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
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
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {movies.map((movie) => (
                <tr
                  key={movie.id}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {movie.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {movie.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {movie.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
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
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => handleSetHero(movie.id)}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors"
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
        <div className="bg-gray-900 px-4 py-3 border-t border-gray-800 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">1</span> to{" "}
              <span className="font-medium text-white">5</span> of{" "}
              <span className="font-medium text-white">250</span> results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg shadow-red-600/30">
                1
              </button>
              <button className="px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
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
