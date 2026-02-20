# Movie Streaming Platform

A full-stack movie streaming application built with modern technologies. The platform allows users to browse movies, watch streaming content, manage subscriptions, and provides admin capabilities for movie uploads.

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
- **Prisma ORM** - Database ORM
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
│   │   │   ├── Homepage/      # Home page
│   │   │   ├── MovieDetailPage/ # Movie details
│   │   │   ├── MoviePage/    # Movie playback
│   │   │   ├── NotFoundPage/ # 404 page
│   │   │   └── Sign-up/      # Signup page
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
├── movie-backend/            # Backend application
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models
│   │   ├── utils/           # Utility functions
│   │   └── config/          # Configuration
│   ├── prisma/              # Database schema
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

```
env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

### Backend (.env)

Create a `.env` file in `movie-backend/` directory:

```
env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/moviedb

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Storage (Cloud storage for video files)
CLOUD_STORAGE_URL=your-storage-url
CLOUD_STORAGE_BUCKET=your-bucket

# External Services
ENCODING_SERVICE_URL=your-encoding-service
```

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

```
bash
# Frontend
cd movie-app
npm run build

# Backend
cd movie-backend
npm run build
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| POST   | `/api/auth/logout`   | Logout user       |
| GET    | `/api/users/me`      | Get current user  |

### Movies

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | `/api/movies/trending`    | Get trending movies    |
| GET    | `/api/movies/new-release` | Get new releases       |
| GET    | `/api/movies/hero`        | Get hero banner movies |
| GET    | `/api/movies/:id`         | Get movie details      |

### Subscriptions

| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/api/subscriptions/my-status` | Get user subscription status |

### Streaming

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/stream/token/:movieId` | Get streaming token |

### Watch Sessions

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| POST   | `/api/watch-sessions/start`  | Start watch session   |
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
| `upload:progress` | `{ jobId, progress }`   | Track upload progress |

### Server Events

| Event             | Payload                 | Description               |
| ----------------- | ----------------------- | ------------------------- |
| `watch:progress`  | `{ movieId, position }` | Broadcast progress update |
| `upload:progress` | `{ jobId, progress }`   | Broadcast upload progress |

## 🔧 Development

### Database Schema

The backend uses Prisma ORM. To set up the database:

```
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
