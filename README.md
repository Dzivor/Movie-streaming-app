# Movie Streaming Platform - StreamVibe

A full-stack movie streaming application built with modern technologies. The platform allows users to browse movies, watch streaming content, manage subscriptions, and provides comprehensive admin capabilities for content management.

## 🎯 Project Status

**Current Phase**: Backend Setup & Frontend UI Development

### ✅ Completed Features

#### Backend

- ✅ JWT Authentication with access & refresh tokens
- ✅ User registration and login with password validation
- ✅ Role-based access control (RBAC)
- ✅ Rate limiting middleware (auth, general, API)
- ✅ Request validation with Yup schemas
- ✅ Error handling middleware
- ✅ TypeORM entities setup (User, Role, Movie, Category, MediaFile, Subscription, WatchSession, AdminLog)
- ✅ Database relationships configured
- ✅ Module structure (auth, movies, admin, subscriptions, watch-sessions, stream)

#### Frontend

- ✅ React 19 with TypeScript setup
- ✅ Responsive Navbar with authentication state
- ✅ User authentication UI (Login, Sign up)
- ✅ Homepage with hero section
- ✅ Movie listing pages with carousels
- ✅ Movie detail page
- ✅ Movie playback page
- ✅ Complete Admin Dashboard with:
  - Dashboard home with statistics
  - Movies management table
  - Upload movie form with progress tracking
  - Categories management
  - Activity logs viewer
- ✅ Dark theme (black & red color scheme)
- ✅ Error boundaries for error handling
- ✅ React Router with protected routes

### 🚧 In Progress

- 🔄 Backend API endpoints implementation
- 🔄 API client integration with frontend
- 🔄 WebSocket real-time communication
- 🔄 BullMQ job queue setup

### 📋 Planned Features

- ⏳ Video streaming implementation
- ⏳ Subscription payment integration
- ⏳ Watch session tracking
- ⏳ Cloud storage integration for media files
- ⏳ Video encoding pipeline
- ⏳ Admin activity logging backend
- ⏳ User management for admins

## 🚀 Tech Stack

### Frontend

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **React Router** - Navigation
- **Socket.io Client** - Real-time updates
- **Formik + Yup** - Form handling & validation
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Express** - Web framework
- **Type ORM** - Database ORM
- **PostgreSQL** - Database
- **BullMQ** - Job queue
- **Redis** - Cache & message broker
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security
- **CORS** - Cross-origin resource sharing
- **Circuit Breaker** - Fault tolerance

## ✨ Features

### User Features

- 🔐 User registration and login
- 🎬 Browse trending and new release movies
- 🎞️ Hero banner carousel
- 📺 Movie details with streaming capability
- 💳 Subscription management
- ⏱️ Watch session tracking with resume functionality
- 🔄 Real-time watch progress updates

### Admin Features

- 📤 Movie upload with progress tracking
- 🏷️ Category management
- 📊 Admin dashboard
- 📝 Activity logging

### Technical Features

- 🔒 JWT-based authentication
- 👥 Role-based access control (RBAC)
- ⏳ Rate limiting
- 🛡️ Security middleware (Helmet, CORS)
- 🔌 Circuit breaker pattern
- 📡 WebSocket real-time updates
- 🎬 Background video processing with BullMQ

## 📁 Project Structure

```
Movie-streaming-app/
├── movie-app/                 # Frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Auth-forms/   # Login & Signup forms
│   │   │   ├── ErrorBoundary/# Error handling
│   │   │   ├── hero/         # Hero section components
│   │   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   │   └── movies/       # Movie-related components
│   │   ├── pages/            # Page components
│   │   │   ├── Homepage/      # Home page with hero & movies
│   │   │   ├── MovieDetailPage/ # Movie details view
│   │   │   ├── MoviePage/    # Movies listing page
│   │   │   ├── PlayMoviePage/ # Video player page
│   │   │   ├── AdminDashboard/ # Admin control panel
│   │   │   ├── NotFoundPage/ # 404 error page
│   │   │   └── Sign-up/      # User registration page
│   │   ├── routing/          # Route definitions
│   │   ├── services/         # API services
│   │   ├── store/            # State management
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utility functions
│   │   ├── validation/       # Form validation schemas
│   │   ├── context/          # React context
│   │   ├── hooks/            # Custom hooks
│   │   ├── Data/             # Static data
│   │   ├── assets/           # Static assets
│   │   ├── fonts/            # Font files
│   │   ├── layout/           # Layout definitions
│   │   ├── lib/              # Library configurations
│   │   └── styles/           # Global styles
│   ├── public/               # Public assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── movie-backefig/          # Database & JWT configuration
│   │   ├── entities/        # TypeORM entities (User, Movie, etc.)
│   │   ├── middlewares/     # Auth, validation, rate limiting, error handling
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/       # Authentication & authorization
│   │   │   ├── movies/     # Movie management
│   │   │   ├── admin/      # Admin operations
│   │   │   ├── subscriptions/ # Subscription handling
│   │   │   ├── watch-sessions/ # Watch progress tracking
│   │   │   └── stream/     # Video streaming
│   │   ├── validation/      # Yup validation schemas
│   │   ├── utils/           # Utility functions
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── backendWorkflow.md        # Backend architecture docs
├── frontendWorkflow.md       # Frontend architecture docs
└── README.md                 # This file
```

## 🛠️ Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL
- Redis

## 📦 Installation

### Clone the repository

```
bash
cd Movie-streaming-app
```

### Install frontend dependencies

```
bash
cd movie-app
npm install
```

### Install backend dependencies

```
bash
cd movie-backend
npm install
```

## ⚙️ Environment Variables

### Frontend (.env)

Create a `.env` file in `movie-app/` directory:

````
env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```env
# Server
PORT=3000
NODE_ENV=development

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=movie_app

# JWT Configuration
JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Redis (for BullMQ and caching)
REDIS_HOST=localhost
REDIS_PORT=6379

# Cloud Storage (for video files) - To be configured
CLOUD_STORAGE_URL=your-storage-url
CLOUD_STORAGE_BUCKET=your-bucket

# External Services - To be configured

# Storage (Cloud storage for video files)
CLOUD_STORAGE_URL=your-storage-url
CLOUD_STORAGE_BUCKET=your-bucket

# External Services
ENCODING_SERVICE_URL=your-encoding-service
````

## 🚀 Running the Application

### Start the backend

```
bash
cd movie-backend
npm run dev
```

The backend will run on `http://localhost:3000`

### Start the frontend

```
bash
cd movie-app
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for production

````
bash
# Frontend
cd movie-app
npm run build (✅ Implemented)

| Method | Endpoint          | Description                | Auth Required |
| ------ | ----------------- | -------------------------- | ------------- |
| POST   | `/auth/register`  | Register new user          | No            |
| POST   | `/auth/login`     | Login user                 | No            |
| POST   | `/auth/refresh`   | Refresh access token       | No            |
| GET    | `/auth/me`        | Get current user           | Yes

### Authen (🚧 Planned)

| Method | Endpoint                  | Description            | Auth Required |
| ------ | ------------------------- | ---------------------- | ------------- |
| GET    | `/api/movies/trending`    | Get trending movies    | No            |
| GET    | `/api/movies/new-release` | Get new releases       | No            |
| GET    | `/api/movies/hero`        | Get hero banner movies | No            |
| GET    | `/api/movies/:id`         | Get movie details      | No            |
| GET    | `/api/movies`             | Get all movies         | No            |

### Subscriptions (🚧 Planned)

| Method | Endpoint                       | Description                  | Auth Required |
| ------ | ------------------------------ | ---------------------------- | ------------- |
| GET    | `/api/subscriptions/my-status` | Get user subscription status | Yes           |
| POST   | `/api/subscriptions/create`    | Create subscription          | Yes           |

### Streaming (🚧 Planned)

| Method | Endpoint                     | Description         | Auth Required |
| ------ | ---------------------------- | ------------------- | ------------- |
| GET    | `/api/stream/token/:movieId` | Get streaming token | Yes           |
| GET    | `/api/stream/:movieId`       | Stream video        | Yes           |

### Watch Sessions (🚧 Planned)

| Method | Endpoint                     | Description           | Auth Required |
| ------ | ---------------------------- | --------------------- | ------------- |
| POST   | `/api/watch-sessions/start`  | Start watch session   | Yes           |
| PUT    | `/api/watch-sessions/update` | Update watch progress | Yes           |
| GET    | `/api/watch-sessions/my`     | Get user sessions     | Yes           |

### Admin (🚧 Planned)

| Method | Endpoint                   | Description           | Auth Required  |
| ------ | -------------------------- | --------------------- | -------------- |
| POST   | `/api/admin/movies/upload` | Upload new movie      | Yes (Admin)    |
| GET    | `/api/admin/movies`        | List all movies       | Yes (Admin)    |
| PUT    | `/api/admin/movies/:id`    | Update movie          | Yes (Admin)    |
| DELETE | `/api/admin/movies/:id`    | Delete movie          | Yes (Admin)    |
| POST   | `/api/admin/categories`    | Create category       | Yes (Admin)    |
| GET    | `/api/admin/logs`          | Get activity logs     | Yes (Admin)    |
| GET    | `/api/admin/users`         | Get all users         | Yes (Admin) session   |
| PUT    | `/api/watch-sessions/update` | Update watch progress |

### Admin

| Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| POST   | `/api/admin/movies/upload` | Upload new movie |
| GET    | `/api/admin/movies`        | List all movies  |
| DELETE | `/api/admin/movies/:id`    | Delete movie     |

## 🔌 Socket Events

### Client Events

| Event             | Payload                 | Description           |
| ----------------- | ----------------------- | --------------------- |
| `watch:update`    | `{ movieId, position }` | Update watch progress |
| `upload:progresTypeORM with PostgreSQL. Entities include:
- **Users** - User accounts with roles
- **Roles** - User roles (admin, user)
- **Movies** - Movie metadata
- **Categories** - Movie categories
- **MediaFiles** - Thumbnails and video files
- **Subscriptions** - User subscription data
- **WatchSessions** - Watch progress tracking
- **AdminLogs** - Admin activity logging
Authentication System

The app implements a dual-token JWT system:
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

**Rate Limiting:**
- Auth endpoints: 5 requests per 15 minutes
- General endpoints: 100 requests per 15 minutes
- API endpoints: 200 requests per 15 minutes

### Development Tools

```bash
# Run frontend with hot reload
cd 🗺️ Roadmap

### Phase 1: Foundation (✅ Completed)
- [x] Project setup and structure
- [x] Backend authentication system
- [x] Frontend UI components
- [x] Admin dashboard UI
- [x] Database schema design

### Phase 2: Core Features (🚧 In Progress)
- [ ] Complete movie API endpoints
- [ ] Integrate frontend with backend APIs
- [ ] Implement video streaming
- [ ] Watch session tracking
- [ ] Real-time updates with WebSocket

### Phase 3: Advanced Features (📋 Planned)
- [ ] Subscription system with payments
- [ ] Cloud storage integration
- [ ] Video encoding pipeline with BullMQ
- [ ] Admin activity logging
- [ ] User management for admins
- [ ] Search and filtering
- [ ] Recommendations engine

### Phase 4: Optimization (📋 Planned)
- [ ] Performance optimization
- [ ] Caching strategies
- [ ] CDN integration
- [ ] Testing suite
- [ ] Deployment setup

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Development Notes

- The backend uses a modular architecture for scalability
- Frontend follows component-based design with React best practices
- All API endpoints will require authentication except public movie browsing
- Admin routes are protected with role-based middleware
- The app uses a dark theme with black background and red accent colors
# Type checking
npm run type-check

# Linting
npm run linw movies with progress tracking
- Category management
- Activity logs viewer
- User management (planned)upload:progress` | `{ jobId, progress }`   | Broadcast upload progress |

## 🔧 Development

### Database Schema

The backend uses Prisma ORM. To set up the database:

````

bash
cd movie-backend
npx prisma migrate dev
npx prisma generate

```

### Running Tests

```

bash

# Backend tests

cd movie-backend
npm run test

# Frontend tests

cd movie-app
npm run test

```

## 📄 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
```
