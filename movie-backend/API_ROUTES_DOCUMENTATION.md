# Movie Streaming App - API Routes Documentation

## **Base URL**: `http://localhost:5000`

---

## **1. AUTHENTICATION ROUTES** (`/auth`)

### **POST** `/auth/register`

**Purpose**: Register a new user account with email, name, and password.

- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string (valid email)",
    "first_name": "string (2-50 chars)",
    "last_name": "string (2-50 chars)",
    "password": "string (min 8 chars, must contain uppercase, lowercase, number, special char)"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "Registration successful",
    "user": {
      "id": "uuid",
      "email": "string",
      "firstName": "string",
      "lastName": "string"
    },
    "tokens": {
      "accessToken": "string",
      "refreshToken": "string"
    }
  }
  ```

### **POST** `/auth/login`

**Purpose**: Authenticate user with email and password, returning access and refresh tokens.

- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "uuid",
      "email": "string",
      "firstName": "string",
      "lastName": "string"
    },
    "tokens": {
      "accessToken": "string",
      "refreshToken": "string"
    }
  }
  ```

### **POST** `/auth/refresh`

**Purpose**: Obtain a new access token using a refresh token when the current token expires.

- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "refreshToken": "string"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Token refreshed successfully",
    "tokens": {
      "accessToken": "string",
      "refreshToken": "string"
    }
  }
  ```

### **GET** `/auth/me`

**Purpose**: Retrieve the current authenticated user's profile information.

- **Auth Required**: Yes (Bearer Token)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Response** (200):
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "string",
      "firstName": "string",
      "lastName": "string"
    }
  }
  ```

---

## **2. MOVIE ROUTES** (`/movies`)

### **GET** `/movies`

**Purpose**: Fetch a paginated list of all movies with optional filtering by category.

- **Auth Required**: No
- **Query Params**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 20)
  - `category` (optional, category ID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of movies */
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
  ```

### **GET** `/movies/trending`

**Purpose**: Get trending movies sorted by popularity and watch count.

- **Auth Required**: No
- **Query Params**: `limit` (optional, default: 10)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of trending movies */
    ]
  }
  ```

### **GET** `/movies/hero`

**Purpose**: Get featured hero movies for homepage display and promotional content.

- **Auth Required**: No
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of hero movies */
    ]
  }
  ```

### **GET** `/movies/search`

**Purpose**: Search movies by query string matching title, description, or other metadata.

- **Auth Required**: No
- **Query Params**:
  - `q` (required, search query)
  - `limit` (optional, default: 20)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of matching movies */
    ]
  }
  ```

### **GET** `/movies/category/:categoryId`

**Purpose**: Get all movies within a specific content category.

- **Auth Required**: No
- **Params**: `categoryId` (UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of movies in category */
    ]
  }
  ```

### **GET** `/movies/:id`

**Purpose**: Fetch detailed information about a specific movie including metadata and preview limits.

- **Auth Required**: No
- **Params**: `id` (movie UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "thumbnail_url": "string",
      "video_url": "string",
      "duration_seconds": "number",
      "release_year": "number",
      "age_rating": "string",
      "preview_time_limit": "number",
      "category": {
        /* category object */
      }
    }
  }
  ```

### **PUT** `/movies/:id`

**Purpose**: Update movie metadata such as title, description, ratings, and preview limits (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (movie UUID)
- **Request Body**:
  ```json
  {
    "title": "string (optional)",
    "description": "string (optional)",
    "category_id": "uuid (optional)",
    "duration_seconds": "number (optional)",
    "release_year": "number (optional)",
    "age_rating": "string (optional)",
    "preview_time_limit": "number (optional)"
  }
  ```
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "Movie updated successfully",
    "data": {
      /* updated movie object */
    }
  }
  ```

### **DELETE** `/movies/:id`

**Purpose**: Remove a movie and its associated files from the system (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (movie UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "Movie deleted successfully"
  }
  ```

---

## **3. CATEGORY ROUTES** (`/categories`)

### **GET** `/categories`

**Purpose**: Retrieve all available content categories for browsing and filtering.

- **Auth Required**: No
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "description": "string"
      }
    ]
  }
  ```

### **GET** `/categories/:id`

**Purpose**: Get detailed information about a specific category.

- **Auth Required**: No
- **Params**: `id` (category UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "id": "uuid",
      "name": "string",
      "description": "string"
    }
  }
  ```

---

## **4. STREAM ROUTES** (`/stream`)

### **GET** `/stream/token/:movieId`

**Purpose**: Generate a secure streaming token for video playback authorization.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `movieId` (UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "token": "string",
      "expiresIn": "number"
    }
  }
  ```

### **POST** `/stream/verify`

**Purpose**: Validate a stream token to authorize video playback and prevent unauthorized access.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "token": "string"
  }
  ```
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "Token is valid",
    "data": {
      "movieId": "uuid",
      "userId": "uuid"
    }
  }
  ```

---

## **5. WATCH SESSION ROUTES** (`/watch-sessions`)

### **POST** `/watch-sessions/start`

**Purpose**: Initialize a new watch session for tracking user playback of a movie.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "movie_id": "uuid"
  }
  ```
- **Response** (201):
  ```json
  {
    "status": "success",
    "message": "Watch session started",
    "data": {
      "session_id": "uuid",
      "movie_id": "uuid",
      "user_id": "uuid",
      "position_seconds": 0
    }
  }
  ```

### **PATCH** `/watch-sessions/update-position`

**Purpose**: Update the current playback position for resuming movies from where user left off.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "movie_id": "uuid",
    "position_seconds": "number"
  }
  ```
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "position_seconds": "number",
      "updated_at": "timestamp"
    }
  }
  ```

### **GET** `/watch-sessions/:movie_id`

**Purpose**: Retrieve the viewing progress and last watched position for a specific movie.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `movie_id` (UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "position_seconds": "number",
      "last_watched": "timestamp"
    }
  }
  ```

---

## **6. ADMIN ROUTES** (`/admin`)

### **POST** `/admin/upload`

**Purpose**: Upload a new movie with thumbnail image and video file to cloud storage (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `thumbnail` (file: image - jpeg, png, gif)
  - `video` (file: video - mp4, mkv, mov, max 2GB)
  - `title` (string, required)
  - `description` (string)
  - `category_id` (uuid, required)
  - `duration_seconds` (number, required)
  - `release_year` (number, required)
  - `age_rating` (string)
  - `preview_time_limit` (number)
- **Response** (201):
  ```json
  {
    "status": "success",
    "message": "Movie uploaded successfully",
    "data": {
      /* movie object */
    }
  }
  ```

### **GET** `/admin/logs`

**Purpose**: Retrieve admin activity logs for monitoring administrative actions and changes.

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Query Params**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 50)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of admin log entries */
    ],
    "pagination": {
      /* pagination info */
    }
  }
  ```

### **GET** `/admin/stats`

**Purpose**: Get system statistics including total users, movies, categories, and watch sessions.

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      "totalUsers": "number",
      "totalMovies": "number",
      "totalCategories": "number",
      "totalWatchSessions": "number"
    }
  }
  ```

### **POST** `/admin/categories`

**Purpose**: Create a new content category for organizing movies (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Request Body**:
  ```json
  {
    "name": "string (2-50 chars, required)",
    "description": "string (max 500 chars, optional)"
  }
  ```
- **Response** (201):
  ```json
  {
    "status": "success",
    "message": "Category created successfully",
    "data": {
      /* category object */
    }
  }
  ```

### **GET** `/admin/categories`

**Purpose**: List all categories from admin perspective with full details (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of categories */
    ]
  }
  ```

### **GET** `/admin/categories/:id`

**Purpose**: Get detailed information about a specific category for admin management (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (category UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      /* category object */
    }
  }
  ```

### **PUT** `/admin/categories/:id`

**Purpose**: Update category information including name and description (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (category UUID)
- **Request Body**:
  ```json
  {
    "name": "string (2-50 chars)",
    "description": "string (max 500 chars)"
  }
  ```
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "Category updated successfully",
    "data": {
      /* updated category */
    }
  }
  ```

### **DELETE** `/admin/categories/:id`

**Purpose**: Delete a content category from the system (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (category UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "Category deleted successfully"
  }
  ```

---

## **7. USER MANAGEMENT ROUTES** (`/admin/users`)

### **GET** `/admin/users`

**Purpose**: List all users with pagination for user management and monitoring (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Query Params**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 20)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": [
      /* array of users */
    ],
    "pagination": {
      /* pagination info */
    }
  }
  ```

### **GET** `/admin/users/:id`

**Purpose**: Get detailed information about a specific user for admin review (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (user UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "data": {
      /* user object */
    }
  }
  ```

### **PUT** `/admin/users/:id/role`

**Purpose**: Change user's role between regular user and admin (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (user UUID)
- **Request Body**:
  ```json
  {
    "role": "string (user/admin)"
  }
  ```
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "User role updated successfully"
  }
  ```

### **DELETE** `/admin/users/:id`

**Purpose**: Deactivate a user account preventing further access (admin only).

- **Auth Required**: Yes (Admin only)
- **Headers**: `Authorization: Bearer <accessToken>`
- **Params**: `id` (user UUID)
- **Response** (200):
  ```json
  {
    "status": "success",
    "message": "User deactivated successfully"
  }
  ```

---

## **8. HEALTH CHECK**

### **GET** `/health`

**Purpose**: Check if the server is running and responsive, used for health monitoring.

- **Auth Required**: No
- **Response** (200):
  ```json
  {
    "status": "OK"
  }
  ```

---

## **Authentication Notes**:

- For protected routes, add the header: `Authorization: Bearer <accessToken>`
- Access tokens expire, use the `/auth/refresh` endpoint with your refresh token to get new tokens
- Admin routes require a user with admin role

## **Testing Order Suggestion**:

1. Start with `/health` to verify server is running
2. Test `/auth/register` and `/auth/login` to get tokens
3. Test public routes (categories, movies)
4. Test authenticated routes (watch sessions, streams)
5. Test admin routes (if you have admin access)

## **Common Error Responses**:

- **400 Bad Request**: Invalid input data or missing required fields
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: User does not have required permissions (e.g., not an admin)
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

## **Data Type Reference**:

### Movie Object

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "thumbnail_url": "string (R2 public URL)",
  "video_url": "string (R2 public URL)",
  "duration_seconds": "number",
  "release_year": "number",
  "age_rating": "string",
  "preview_time_limit": "number (seconds)",
  "category_id": "uuid",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Category Object

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### User Object

```json
{
  "id": "uuid",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "role": "string (user/admin)",
  "is_active": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Watch Session Object

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "movie_id": "uuid",
  "position_seconds": "number",
  "completed": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```
