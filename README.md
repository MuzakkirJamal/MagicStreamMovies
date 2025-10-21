# MagicStream 🎬✨

A modern, AI-powered movie streaming platform built with cutting-edge web technologies.

## 🌐 Live Demo

**🎬 Live Website:** [https://magic-stream-movies-plum.vercel.app/](https://magic-stream-movies-plum.vercel.app/)

## 🚀 About The Project

MagicStream is a full-stack movie streaming platform that combines modern web development with artificial intelligence to deliver a personalized viewing experience. The platform features a React-based frontend, high-performance Go backend, and AI-powered recommendation engine.

## ✨ Features

### 🎥 Streaming & Content
- **Seamless Movie Streaming** with React-Player integration
- **YouTube Integration** for direct content streaming
- **Responsive Design** across all devices
- **Real-time Playback Controls**

### 🤖 AI-Powered Intelligence
- **Smart Recommendations** using LangChainGo and OpenAI
- **Sentiment Analysis** for automated review ranking
- **Personalized Content** curation

### 🔐 Authentication & Security
- **JWT Token Authentication**
- **Role-Based Access Control**
- **Protected Routes** for secure content access

### 👥 User Management
- **Public Users** - Browse without login
- **Registered Users** - Full streaming access
- **Admin Users** - Complete content control

## 🛠 Tech Stack

**Frontend:** JavaScript, React, React Player, Vercel  
**Backend:** Go, gin-gonic, JWT, Render  
**AI:** LangChainGo, OpenAI, Sentiment Analysis  
**Database:** MongoDB, MongoDB Atlas

## 🔧 API Endpoints

### 🎬 Movies Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/movies` | Get all movies | Public |
| `GET` | `/movies/:id` | Get specific movie details | Public |
| `POST` | `/movies` | Add new movie | Admin |
| `PUT` | `/movies/:id` | Update movie details | Admin |
| `DELETE` | `/movies/:id` | Delete movie | Admin |

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/auth/register` | User registration | Public |
| `POST` | `/auth/login` | User login | Public |
| `POST` | `/auth/logout` | User logout | Authenticated |
| `GET` | `/auth/verify` | Verify token | Authenticated |

### 📝 Reviews Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/reviews` | Get all reviews | Public |
| `GET` | `/reviews/movie/:id` | Get reviews for specific movie | Public |
| `POST` | `/reviews` | Add new review | Authenticated |
| `PUT` | `/reviews/:id` | Update review | Admin |
| `DELETE` | `/reviews/:id` | Delete review | Admin |

### 🎯 Streaming Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/stream/:id` | Get streaming URL | Authenticated |
| `GET` | `/stream/info/:id` | Get streaming information | Authenticated |

### 🤖 AI Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/ai/recommend` | Get AI recommendations | Authenticated |
| `POST` | `/ai/analyze-sentiment` | Analyze review sentiment | Admin |
| `GET` | `/ai/user-preferences` | Get user preferences | Authenticated |

### 👤 User Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/users/profile` | Get user profile | Authenticated |
| `PUT` | `/users/profile` | Update user profile | Authenticated |
| `GET` | `/users/watch-history` | Get watch history | Authenticated |
| `POST` | `/users/watch-history` | Add to watch history | Authenticated |

### ⚡ Admin Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/admin/analytics` | Get platform analytics | Admin |
| `GET` | `/admin/users` | Get all users | Admin |
| `PUT` | `/admin/users/:id` | Update user role | Admin |
| `GET` | `/admin/statistics` | Get platform statistics | Admin |

## 🌐 Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

### 🙏 Acknowledgments 
Special thanks to GavinLonDigital for the foundational tutorials and guidance that helped shape this project.








