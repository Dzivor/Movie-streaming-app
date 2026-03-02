import React, { useState } from "react";
import { Upload, Film, Image } from "lucide-react";

const UploadMovie: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    ageRating: "",
    releaseYear: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          alert("Movie uploaded successfully!");
        }, 500);
      }
    }, 500);
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Upload New Movie
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Movie Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter movie title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter movie description"
            />
          </div>

          {/* Category and Duration Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="category"
              >
                <option value="">Select category</option>
                <option value="action">Action</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="crime">Crime</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                <option value="horror">Horror</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="120"
              />
            </div>
          </div>

          {/* Age Rating and Release Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Rating *
              </label>
              <select
                name="ageRating"
                value={formData.ageRating}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Select age rating"
              >
                <option value="">Select rating</option>
                <option value="G">G - General Audiences</option>
                <option value="PG">PG - Parental Guidance</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R - Restricted</option>
                <option value="NC-17">NC-17</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Release Year *
              </label>
              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Release year"
                placeholder="2024"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors">
              <div className="flex flex-col items-center">
                <Image className="text-gray-400 mb-2" size={48} />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-4"
                  aria-label="Upload thumbnail image"
                />
              </div>
            </div>
          </div>

          {/* Video File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video File *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors">
              <div className="flex flex-col items-center">
                <Film className="text-gray-400 mb-2" size={48} />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">MP4, MKV up to 5GB</p>
                <input
                  type="file"
                  accept="video/*"
                  className="mt-4"
                  aria-label="Upload video file"
                />
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">
                  Upload Progress
                </span>
                <span className="text-sm font-bold text-green-800">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-green-700 mt-2">
                {uploadProgress < 30 && "Uploading files..."}
                {uploadProgress >= 30 &&
                  uploadProgress < 60 &&
                  "Processing video..."}
                {uploadProgress >= 60 &&
                  uploadProgress < 90 &&
                  "Encoding video..."}
                {uploadProgress >= 90 && "Finalizing..."}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              <Upload size={20} />
              {isUploading ? "Uploading..." : "Upload Movie"}
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMovie;
