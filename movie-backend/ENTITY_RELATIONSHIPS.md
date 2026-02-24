# Entity Implementations and Relationships

This document describes the TypeORM entities, their columns, and their relationships as implemented in the backend.

## Roles

Table: roles

Columns:

- id (uuid, primary key)
- name (text, unique)
- description (text, required)
- created_at (timestamp, auto)
- updated_at (timestamp, auto)

Relationships:

- One role has many users (Role.users -> User.role)

## Users

Table: users

Columns:

- id (uuid, primary key)
- email (text, unique)
- first_name (text)
- last_name (text)
- password_hash (text)
- is_active (boolean, default true)
- created_at (timestamp, auto)
- updated_at (timestamp, auto)

Relationships:

- Many users belong to one role (User.role -> Role.users)
- One user has many subscriptions (User.subscriptions -> Subscription.user)
- One user has many watch sessions (User.watch_sessions -> WatchSession.user)
- One user has many admin logs (User.admin_logs -> AdminLog.admin)
- One user has many uploaded movies (User.uploaded_movies -> Movie.uploaded_by)

## Admin Logs

Table: admin_logs

Columns:

- id (uuid, primary key)
- action (text)
- entity_type (text)
- entity_id (uuid)
- created_at (timestamp, auto)

Relationships:

- Many logs belong to one admin user (AdminLog.admin -> User.admin_logs)

## Subscriptions

Table: subscriptions

Columns:

- id (uuid, primary key)
- status (text; allowed values: active, expired, cancelled)
- plan_name (text)
- start_date (timestamp)
- end_date (timestamp, nullable)
- created_at (timestamp, auto)
- updated_at (timestamp, auto)

Relationships:

- Many subscriptions belong to one user (Subscription.user -> User.subscriptions)

## Watch Sessions

Table: watch_sessions

Columns:

- id (uuid, primary key)
- started_at (timestamp)
- last_position_seconds (int)
- is_completed (boolean, default false)
- created_at (timestamp, auto)
- updated_at (timestamp, auto)

Relationships:

- Many watch sessions belong to one user (WatchSession.user -> User.watch_sessions)
- Many watch sessions belong to one movie (WatchSession.movie -> Movie.watch_sessions)

## Movies

Table: movies

Columns:

- id (uuid, primary key)
- title (text)
- description (text, nullable)
- duration_seconds (int)
- release_year (int)
- age_rating (text, nullable)
- preview_time_limit (int, nullable)
- created_at (timestamp, auto)
- updated_at (timestamp, auto)

Relationships:

- Many movies belong to one uploader (Movie.uploaded_by -> User.uploaded_movies)
- Many movies belong to one thumbnail media file (Movie.thumbnail_media -> MediaFile.thumbnail_movies)
- Many movies belong to one video media file (Movie.video_media -> MediaFile.video_movies)
- Many movies belong to one category (Movie.category -> Category.movies)
- One movie has many watch sessions (Movie.watch_sessions -> WatchSession.movie)

## Categories

Table: categories

Columns:

- id (uuid, primary key)
- name (text, unique)
- description (text, nullable)
- created_at (timestamp, auto)

Relationships:

- One category has many movies (Category.movies -> Movie.category)

## Media Files

Table: media_files

Columns:

- id (uuid, primary key)
- url (text)
- type (text)
- created_at (timestamp, auto)
- updated_at (timestamp, auto)

Relationships:

- One media file can be used as a thumbnail for many movies (MediaFile.thumbnail_movies -> Movie.thumbnail_media)
- One media file can be used as a video for many movies (MediaFile.video_movies -> Movie.video_media)
