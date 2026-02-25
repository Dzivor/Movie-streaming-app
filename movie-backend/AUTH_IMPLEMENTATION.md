# Authentication & Authorization Implementation Guide

## Overview

This implementation provides a comprehensive authentication and authorization system with JWT tokens, password validation, rate limiting, and error handling middleware.

## Features Implemented

### 1. **Password Validation with Yup**

The password validation follows industry-standard security practices:

- **Minimum 8 characters**
- **At least one uppercase letter** (A-Z)
- **At least one lowercase letter** (a-z)
- **At least one number** (0-9)
- **At least one special character** (@$!%\*?&)

Example valid password: `Secur3P@ssw0rd`

**Schema File**: [src/validation/auth.validation.ts](src/validation/auth.validation.ts)

### 2. **JWT Authentication**

Dual token system for enhanced security:

- **Access Token**: Short-lived (default: 15 minutes)
  - Used for authenticating regular API requests
  - Included in Authorization header: `Bearer <token>`

- **Refresh Token**: Long-lived (default: 7 days)
  - Used to obtain new access tokens
  - Sent to `/auth/refresh` endpoint

**Configuration**: [src/config/jwt.config.ts](src/config/jwt.config.ts)

### 3. **Validation Middleware**

Automatic request validation using Yup schemas:

- **Registration**: email, first_name, last_name, password
- **Login**: email, password
- **Refresh**: refreshToken

**Middleware File**: [src/middlewares/validation.middleware.ts](src/middlewares/validation.middleware.ts)

### 4. **Rate Limiting Middleware**

Three different rate limiters for various scenarios:

- **General Limiter**: 100 requests per 15 minutes (all routes)
- **Auth Limiter**: 5 requests per 15 minutes (login/register)
- **API Limiter**: 200 requests per 15 minutes (authenticated endpoints)

**Middleware File**: [src/middlewares/rateLimit.middleware.ts](src/middlewares/rateLimit.middleware.ts)

### 5. **Error Handling Middleware**

Centralized error handling with proper HTTP status codes:

- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

**Middleware File**: [src/middlewares/error.middleware.ts](src/middlewares/error.middleware.ts)

### 6. **Authentication Middleware**

JWT verification middleware for route protection:

- **authenticateToken**: Validates access token from Authorization header
- **requireRole**: Ensures user has required role(s)

**Middleware File**: [src/middlewares/auth.middleware.ts](src/middlewares/auth.middleware.ts)

## API Endpoints

### Authentication Routes

Base path: `/auth`

#### 1. Register

**POST** `/auth/register`

```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "SecureP@ss123"
}
```

Response (201):

```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "user",
    "is_active": true,
    "created_at": "2024-02-25T...",
    "updated_at": "2024-02-25T..."
  },
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### 2. Login

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

Response (200):

```json
{
  "message": "Login successful",
  "user": { ... },
  "tokens": { ... }
}
```

#### 3. Refresh Token

**POST** `/auth/refresh`

```json
{
  "refreshToken": "eyJhbGc..."
}
```

Response (200):

```json
{
  "message": "Token refreshed successfully",
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# JWT Configuration
JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=movie_app

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Usage Examples

### Using Access Tokens

Include the access token in the Authorization header:

```bash
curl -H "Authorization: Bearer eyJhbGc..." http://localhost:3000/api/protected-route
```

### Refreshing Tokens

When access token expires, use refresh token to get new tokens:

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "eyJhbGc..."}'
```

### Protecting Routes (Frontend)

```typescript
import { authenticateToken, requireRole } from "./middlewares/auth.middleware";

// Protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json(req.user);
});

// Role-based protected route
router.delete(
  "/admin/users/:id",
  authenticateToken,
  requireRole("admin"),
  deleteUserHandler,
);
```

## Security Considerations

1. **Store tokens securely**:
   - Access tokens: Short-lived, safe in memory or localStorage
   - Refresh tokens: Long-lived, store in httpOnly cookies or secure storage

2. **Use HTTPS** in production for all API communications

3. **Rotate secrets**: Change JWT secrets regularly in production

4. **Password requirements**: Enforce minimum strength standards

5. **Rate limiting**: Prevents brute-force attacks on login/register

6. **CORS**: Configure appropriately for your frontend domain

## Dependencies Added

```json
{
  "yup": "^1.0.0",
  "jsonwebtoken": "^9.0.0",
  "express-rate-limit": "^6.0.0",
  "@types/jsonwebtoken": "^9.0.0"
}
```

## Files Created/Modified

### Created:

- `src/config/jwt.config.ts` - JWT configuration
- `src/validation/auth.validation.ts` - Validation schemas
- `src/middlewares/validation.middleware.ts` - Validation middleware
- `src/middlewares/error.middleware.ts` - Error handling middleware
- `src/middlewares/rateLimit.middleware.ts` - Rate limiting middleware
- `src/middlewares/auth.middleware.ts` - JWT authentication middleware
- `.env.example` - Environment variables template

### Modified:

- `src/modules/auth/auth.service.ts` - Added JWT token generation
- `src/modules/auth/auth.controller.ts` - Updated to use validation & tokens
- `src/modules/auth/auth.routes.ts` - Added validation & rate limiting
- `src/app.ts` - Integrated all middlewares

## Testing the Implementation

1. **Register a new user**:

   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "first_name": "Test",
       "last_name": "User",
       "password": "SecureP@ss123"
     }'
   ```

2. **Login**:

   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "SecureP@ss123"
     }'
   ```

3. **Use access token**:
   - Copy the accessToken from the response
   - Use it in protected routes

4. **Test rate limiting**:
   - Make 6 requests to `/auth/login` within 15 minutes
   - The 6th request should be blocked

## Next Steps

1. Update frontend to handle token refresh mechanism
2. Add token storage strategy (localStorage/cookies)
3. Implement logout endpoint (token blacklisting if needed)
4. Add 2FA (Two-Factor Authentication) for enhanced security
5. Add CORS configuration for frontend domains
6. Implement audit logging for authentication events
