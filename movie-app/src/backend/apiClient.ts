import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

//Auth Types

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string | null;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface TokenResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

//Axios instance

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token helpers

function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}

function storeTokens(tokens: { accessToken: string; refreshToken: string }) {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

// Axios Interceptors

// Attaching  access  requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 responses with automatic token refresh
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue requests while a refresh is in progress
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<TokenResponse>(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
        );
        storeTokens(data.tokens);
        processQueue(null, data.tokens.accessToken);
        originalRequest.headers["Authorization"] =
          `Bearer ${data.tokens.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// Response Types

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  pagination: PaginationInfo;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

// Movie Types

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface MovieDetail {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration_seconds: number;
  release_year: number;
  age_rating: string;
  preview_time_limit: number;
  category: Category;
}

//Stream Types

export interface StreamToken {
  token: string;
  expiresIn: number;
}

//Watch Session Types

export interface WatchSession {
  session_id: string;
  movie_id: string;
  user_id: string;
  position_seconds: number;
}

export interface WatchProgress {
  position_seconds: number;
  last_watched: string;
}

//Admin Types

export interface AdminStats {
  totalUsers: number;
  totalMovies: number;
  totalCategories: number;
  totalWatchSessions: number;
}

//API Client

export const apiClient = {
  // request helper
  async request<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  // AUTH

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials,
    );
    storeTokens(data.tokens);
    return data;
  },

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/register", {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
    });
    storeTokens(data.tokens);
    return data;
  },

  logout() {
    clearTokens();
  },

  async getMe() {
    const { data } = await axiosInstance.get<{ user: AuthResponse["user"] }>(
      "/auth/me",
    );
    return data;
  },

  // MOVIES

  async getMovies(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }) {
    const { data } = await axiosInstance.get<PaginatedResponse<MovieDetail>>(
      "/movies",
      { params },
    );
    return data;
  },

  async getTrendingMovies(limit?: number) {
    const { data } = await axiosInstance.get<ApiResponse<MovieDetail[]>>(
      "/movies/trending",
      { params: { limit } },
    );
    return data;
  },

  async getHeroMovies() {
    const { data } =
      await axiosInstance.get<ApiResponse<MovieDetail[]>>("/movies/hero");
    return data;
  },

  async searchMovies(q: string, limit?: number) {
    const { data } = await axiosInstance.get<ApiResponse<MovieDetail[]>>(
      "/movies/search",
      { params: { q, limit } },
    );
    return data;
  },

  async getMoviesByCategory(categoryId: string) {
    const { data } = await axiosInstance.get<ApiResponse<MovieDetail[]>>(
      `/movies/category/${categoryId}`,
    );
    return data;
  },

  async getMovie(id: string) {
    const { data } = await axiosInstance.get<ApiResponse<MovieDetail>>(
      `/movies/${id}`,
    );
    return data;
  },

  async updateMovie(id: string, movieData: Partial<MovieDetail>) {
    const { data } = await axiosInstance.put<ApiResponse<MovieDetail>>(
      `/movies/${id}`,
      movieData,
    );
    return data;
  },

  async deleteMovie(id: string) {
    const { data } = await axiosInstance.delete(`/movies/${id}`);
    return data;
  },

  // CATEGORIES

  async getCategories() {
    const { data } =
      await axiosInstance.get<ApiResponse<Category[]>>("/categories");
    return data;
  },

  async getCategory(id: string) {
    const { data } = await axiosInstance.get<ApiResponse<Category>>(
      `/categories/${id}`,
    );
    return data;
  },

  // STREAMING

  async getStreamToken(movieId: string) {
    const { data } = await axiosInstance.get<ApiResponse<StreamToken>>(
      `/stream/token/${movieId}`,
    );
    return data;
  },

  async verifyStreamToken(token: string) {
    const { data } = await axiosInstance.post<
      ApiResponse<{ movieId: string; userId: string }>
    >("/stream/verify", { token });
    return data;
  },

  // WATCH SESSIONS

  async startWatchSession(movieId: string) {
    const { data } = await axiosInstance.post<ApiResponse<WatchSession>>(
      "/watch-sessions/start",
      { movie_id: movieId },
    );
    return data;
  },

  async updateWatchPosition(movieId: string, positionSeconds: number) {
    const { data } = await axiosInstance.patch<
      ApiResponse<{ position_seconds: number; updated_at: string }>
    >("/watch-sessions/update-position", {
      movie_id: movieId,
      position_seconds: positionSeconds,
    });
    return data;
  },

  async getWatchProgress(movieId: string) {
    const { data } = await axiosInstance.get<ApiResponse<WatchProgress>>(
      `/watch-sessions/${movieId}`,
    );
    return data;
  },

  //  ADMIN

  async uploadMovie(formData: FormData) {
    const { data } = await axiosInstance.post<ApiResponse<MovieDetail>>(
      "/admin/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data;
  },

  async getAdminLogs(params?: { page?: number; limit?: number }) {
    const { data } = await axiosInstance.get("/admin/logs", { params });
    return data;
  },

  async getAdminStats() {
    const { data } =
      await axiosInstance.get<ApiResponse<AdminStats>>("/admin/stats");
    return data;
  },

  async createCategory(categoryData: { name: string; description?: string }) {
    const { data } = await axiosInstance.post<ApiResponse<Category>>(
      "/admin/categories",
      categoryData,
    );
    return data;
  },

  async getAdminCategories() {
    const { data } =
      await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories");
    return data;
  },

  async getAdminCategory(id: string) {
    const { data } = await axiosInstance.get<ApiResponse<Category>>(
      `/admin/categories/${id}`,
    );
    return data;
  },

  async updateCategory(
    id: string,
    categoryData: { name?: string; description?: string },
  ) {
    const { data } = await axiosInstance.put<ApiResponse<Category>>(
      `/admin/categories/${id}`,
      categoryData,
    );
    return data;
  },

  async deleteCategory(id: string) {
    const { data } = await axiosInstance.delete(`/admin/categories/${id}`);
    return data;
  },

  async getUsers(params?: { page?: number; limit?: number }) {
    const { data } = await axiosInstance.get("/admin/users", { params });
    return data;
  },

  async getUser(id: string) {
    const { data } = await axiosInstance.get(`/admin/users/${id}`);
    return data;
  },

  async updateUserRole(id: string, role: "user" | "admin") {
    const { data } = await axiosInstance.put(`/admin/users/${id}/role`, {
      role,
    });
    return data;
  },

  async deactivateUser(id: string) {
    const { data } = await axiosInstance.delete(`/admin/users/${id}`);
    return data;
  },

  // HEALTH

  /* async healthCheck() {
    const { data } = await axiosInstance.get("/health");
    return data;
  },
  */
};

export default apiClient;
