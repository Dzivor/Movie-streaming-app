# Backend Workflow

Stack:

- Node Typescript
- Express
- Type ORM
- PostgreSQL
- BullMQ
- Redis
- Socket.io
- Circuit Breaker

---

# USER AUTH FLOW

Register →

POST /auth/register

↓

Create User.

Tables:

users
roles

Default Role:

user.

↓

Password hashed:

bcrypt.

↓

JWT Generated.

↓

Return Token.

---

Login:

POST /auth/login

↓

Verify Email.

↓

Compare Password.

↓

JWT Access Token.

↓

Return user profile.

---

# HOMEPAGE API

GET /movies/trending

Query:

movies

JOIN:

categories
media_files thumbnail.

SQL:

movies.category_id →
categories.id

movies.thumbnail_media_id →
media_files.id

Return:

title
thumbnail url
duration.

---

# HERO BANNER API

GET /movies/hero

Admin selected hero movies.

---

# MOVIE DETAILS

GET /movies/:id

Join:

movies
media_files (video)
categories
users(uploaded_by)

Return.

---

# SUBSCRIPTION CHECK

GET /subscriptions/my-status

Find:

subscriptions.user_id.

status?

active?

YES →

allow stream.

NO →

preview limit.

---

# STREAM REQUEST

GET /stream/token/:movieId

Check:

subscription.

↓

Generate Signed URL.

Cloud Storage.

↓

Return Temporary Stream URL.

---

# WATCH SESSION FLOW

User Starts Watching.

POST:

/watch-sessions/start.

Insert:

watch_sessions:

user_id
movie_id
started_at.

---

Realtime Updates:

Socket:

watch:update.

update:

last_position_seconds.

---

# ADMIN MOVIE UPLOAD

Admin Login.

↓

POST:

/admin/movies/upload.

Step 1:

Validate Admin Role.

users.role_id →
roles.id.

---

Step 2:

Upload Thumbnail.

Store:

media_files:

type:

thumbnail.

---

Step 3:

Upload Movie File.

Heavy Operation.

↓

Push BullMQ Job.

Queue:

video-processing.

---

# BULLMQ JOB

Worker:

Upload File.

↓

Cloud Storage Upload.

↓

Generate Encoding.

↓

Save media_files record.

---

Step 4:

Insert Movie.

movies:

thumbnail_media_id.

video_media_id.

category_id.

uploaded_by.

---

# SOCKET REALTIME

Worker emits:

upload progress.

↓

Socket.

↓

Frontend Dashboard.

---

# ADMIN LOGS

Insert:

admin_logs.

admin_id.

action:

upload_movie.

---

# CIRCUIT BREAKER

External Systems:

Cloud Storage.

Encoding Service.

If Failure Rate > Threshold.

↓

Open Circuit.

↓

Return:

Service Temporarily Unavailable.

---

# CLEANUP JOBS

BullMQ Cron:

expire subscriptions.

update status expired.

---

# SECURITY

JWT Middleware.

Role Middleware.

Rate Limiting.

Helmet.

CORS.

---
