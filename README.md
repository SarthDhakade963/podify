# Podify 🎧

## Summary
Podify is a personalized podcast platform that recommends curated podcasts based on user-selected topics. It tracks user listening history, fetches relevant podcasts from YouTube, and ensures fresh daily content, enhancing the overall podcast listening experience.

## Tech Stack
- **Frontend:** Next.js, React.js, TypeScript, Sass, NextAuth.js (OAuth)
- **Backend:** Java, Spring Boot, PostgreSQL (User & Topic Management), MongoDB (Podcasts Storage)
- **APIs & Tools:** YouTube Data API v3, REST APIs, Scheduled Tasks, OAuth Authentication

## Features
- Personalized podcast recommendations per user
- Topic-based organization of podcasts
- Daily refresh of podcasts to keep content up-to-date
- Tracks watch history and progress per user
- Embedded video player for each podcast with smooth scroll and progress tracking
- OAuth login via Google for secure authentication

## How It Works
1. Users select topics → preferences saved in PostgreSQL.
2. Backend fetches top podcasts for each topic from MongoDB.
3. If podcasts are missing or outdated, backend fetches new podcasts from YouTube and updates MongoDB.
4. Frontend displays personalized podcast lists dynamically.
5. Each podcast can be played directly via the embedded video player; progress is tracked and synced to backend.
6. Scheduled daily refresh ensures fresh and relevant content while preserving user watch history.
