import React, { useState } from "react";
import { Plus, Edit2, Trash2, FolderOpen } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  movieCount: number;
  createdAt: string;
}

const CategoriesManagement: React.FC = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const categories: Category[] = [
    {
      id: "1",
      name: "Action",
      description: "High-energy movies with thrilling sequences",
      movieCount: 45,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sci-Fi",
      description: "Science fiction and futuristic movies",
      movieCount: 38,
      createdAt: "2024-01-20",
    },
    {
      id: "3",
      name: "Drama",
      description: "Emotional and character-driven stories",
      movieCount: 52,
      createdAt: "2024-01-22",
    },
    {
      id: "4",
      name: "Comedy",
      description: "Light-hearted and humorous content",
      movieCount: 31,
      createdAt: "2024-01-25",
    },
    {
      id: "5",
      name: "Horror",
      description: "Scary and suspenseful movies",
      movieCount: 24,
      createdAt: "2024-02-01",
    },
  ];

  const handleAddCategory = () => {
    console.log("Adding category:", newCategory);
    setNewCategory({ name: "", description: "" });
    setIsAddingCategory(false);
  };

  const handleEdit = (categoryId: string) => {
    console.log("Edit category:", categoryId);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      console.log("Delete category:", categoryId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Categories</h3>
          <p className="text-gray-400 mt-1">
            Manage movie categories and classifications
          </p>
        </div>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors font-medium flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-md p-6">
          <h4 className="text-lg font-bold text-white mb-4">
            Add New Category
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                placeholder="e.g., Thriller"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                placeholder="Brief description of the category"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors font-medium"
              >
                Save Category
              </button>
              <button
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategory({ name: "", description: "" });
                }}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-900 border border-gray-800 rounded-lg shadow-md hover:shadow-lg hover:shadow-red-600/20 transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <FolderOpen className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {category.movieCount} movies
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="text-xs text-gray-400">
                  Created: {category.createdAt}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;
