# Frontend Workflow — Movie Streaming Platform

Stack:

- React + Typescript
- TailwindCSS
- React Query
- React Router
- Socket.io Client

---

# USER FLOW

Landing Page →

Navbar Rendered
|
|-- Fetch Trending Movies
| GET /api/movies/trending
|
|-- Fetch New Releases
| GET /api/movies/new-release
|
|-- Fetch Hero Banner Movies
GET /api/movies/hero

↓

Homepage Rendered

Components:

App Layout
├── Navbar
├── HeroSection Carousel
├── MovieSection (Trending)
├── MovieSection (New Release)
└── Footer

---

# NAVBAR FLOW

User clicks:

Sign In →
Open Modal

POST /api/auth/login

success?

YES →
Save JWT Access Token
Fetch Profile:

GET /api/users/me

redirect Homepage

NO →
show error message

---

User clicks Sign Up →

Open Signup Modal

POST /api/auth/register

success?

YES →

auto login OR redirect login.

---

# HOMEPAGE DATA LOADING

React Query triggers:

1.

GET /movies/trending

returns:

Movies +
Thumbnail Media +
Category

Example:

movie.thumbnail_media_id →
join media_files.url

2.

GET /movies/new-release

---

# HERO SECTION

Auto Carousel Timer

8 seconds:

setInterval()

↓

Next Movie Banner

User clicks Indicator →

change slide.

---

# MOVIE CARD DISPLAY

MoviePosterCard receives:

title
thumbnail
duration
views

thumbnail loaded from:

media_files.url

---

# USER CLICK MOVIE

User clicks movie card →

Navigate:

/movie/:id

Router:

MovieDetailsPage

---

# MOVIE DETAILS PAGE

Fetch:

GET /movies/:id

Backend returns:

movie
category
video_media
thumbnail
uploaded_by

Display:

Title
Description
Category
Duration
Age Rating.

---

# PLAY BUTTON FLOW

User clicks PLAY.

↓

Check Subscription.

GET:

/subscriptions/my-status

response?

active?

YES →

Open Player Page.

NO →

Show Subscribe Modal.

---

# PLAYER PAGE

Fetch secure stream:

GET /stream/token/:movieId

backend generates:

temporary signed URL.

↓

Video Player loads:

Cloud Storage Stream.

---

# WATCH SESSION

Video started →

POST /watch-sessions/start

Create watch session.

While Watching:

Socket connection updates:

last_position_seconds.

Every 20 seconds:

emit:

watch-progress.

---

# SOCKET EVENTS

Frontend emits:

watch:update

Backend updates:

watch_sessions.last_position_seconds.

---

# ADMIN FLOW (FRONTEND)

Admin Login.

↓

Dashboard.

Upload Movie Form.

Fields:

Title
Description
Category Select
Thumbnail Upload
Movie Upload.

Submit →

POST /admin/movies/upload

Progress Bar:

Socket Updates.

---

# REALTIME EVENTS

BullMQ Upload Progress →

Socket →

Frontend Progress Bar.

---

# LOGOUT

POST:

/auth/logout

clear token.

redirect homepage.
