# MemePunks

A cyberpunk-themed meme marketplace with AI-powered meme generation, and social features.

## Overview

MemePunks is a Generative AI full-stack web application. Users can create, bid on, and trade memes in a cyberpunk-styled marketplace. The platform features AI-generated memes using Google's Gemini and Imagen APIs, real-time bidding, social interactions, and self written secure user authentication using bcrypt and jsonwebtoken libraries.

## Features

### Core Functionality

- **AI Meme Generation**: Create memes using text prompts powered by Google Gemini and Imagen models.
- **Meme Marketplace**: Browse, search, and discover memes from the community
- **Bidding System**: Place bids on memes with real-time price tracking
- **User Authentication**: Secure signup/signin with JWT tokens
- **File Upload**: Manual meme upload with image validation and cloud storage using Cloudinary and Multer.
- **Social Features**: Like memes and track community engagement
- **Trending Section**: Discover popular and trending memes

### User Experience

- **Responsive Design**: Mobile-first design with cyberpunk aesthetic
- **Real-time Updates**: Live bid counts and like updates
- **Interactive UI**: Modern animations and hover effects
- **Meme tags**: Memes have tags, price, and popularity by likes
- **User Profiles**: Track created memes and bidding history

### Technical Features

- **Cloud Storage**: Cloudinary integration for image hosting
- **Database**: PostgreSQL with Prisma ORM
- **API Integration**: Google AI services for content generation
- **Type Safety**: Full TypeScript implementation on backend
- **Modern Frontend**: React with Vite and Tailwind CSS

## Tech Stack

### Frontend

- **React 19**: Modern UI library with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls

### Backend

- **Node.js**: Runtime environment
- **Express**: Web application framework
- **TypeScript**: Type-safe JavaScript
- **Prisma**: Database ORM and migration tool
- **PostgreSQL**: Primary database
- **JWT**: Authentication tokens
- **Multer**: File upload handling

### AI & Cloud Services

- **Google Gemini**: Text generation and content creation
- **Google Imagen**: AI image generation
- **Cloudinary**: Image storage and optimization
- **Render**: Production deployment platform

## Architecture

### Database Schema

```
User
├── id (UUID)
├── email (unique)
├── username (unique)
├── password (hashed)
└── relationships: memes, bids, likes

Meme
├── id (UUID)
├── title
├── imageUrl
├── tags (array)
├── startingPrice
├── currentPrice
├── creatorId
└── relationships: bids, likes

Bid
├── id (UUID)
├── amount
├── memeId
├── bidderId
└── timestamp

Like
├── id (UUID)
├── userId
├── memeId
└── timestamp
```

### API Architecture

```
/api
├── /auth
│   ├── POST /signin
│   └── POST /signup
├── /memes
│   ├── GET /
│   ├── POST /
│   ├── GET /trending
│   └── POST /:id/like
├── /bids
│   └── POST /
├── /ai
│   └── POST /generate-meme
└── /upload
    └── POST /create-with-upload
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL and Prisma ORM
- Google AI studio account
- Cloudinary account (for image storage)

### Environment Variables

Create `.env` files in both client and server directories:

**Server (.env)**

```env
DATABASE_URL="postgresql://username:password@localhost:5432/memepunks"
JWT_SECRET="your-jwt-secret-key"
GEMINI_API_KEY="your-google-gemini-api-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
PORT=3000
```

**Client (.env)**

```env
VITE_API_URL="http://localhost:5000/api"
```

### Installation & Development

1. **Clone the repository**

```bash
git clone
cd memepunks
```

2. **Install server dependencies**

```bash
cd server
npm install
```

3. **Setup database**

```bash
# Run Prisma migrations
npm run db:migrate

# Generate Prisma client
npm run db:generate

# (Optional) Open database GUI
npm run studio
```

4. **Install client dependencies**

```bash
cd ../client
npm install
```

5. **Start development servers**

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

6. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Database Studio: http://localhost:5555

### Production Deployment

**Server Deployment (Render/Railway)**

```bash
# Build command
npm install && npm run build

# Start command
npm run deploy
```

**Client Deployment (Vercel)**

```bash
# Build command
npm run build

# Output directory
dist/
```

## Project Structure

```
memepunks/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── api/              # API client services
│   │   └── lib/              # Utility functions
│   ├── public/               # Static assets
│   └── package.json
├── server/                   # Express backend
│   ├── src/
│   │   ├── handlers/         # Route handlers
│   │   ├── services/         # Business logic
│   │   ├── modules/          # Auth & middleware
│   │   └── db.ts            # Database connection
│   ├── prisma/              # Database schema & migrations
│   └── package.json
└── README.md
```

## API Documentation

### Authentication

All protected routes require `Authorization: Bearer <token>` header.

### Endpoints

**POST /api/auth/signup**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password"
}
```

**POST /api/auth/signin**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**GET /api/memes**

- Query params: `page`, `limit`, `tag`
- Returns: Paginated meme list

**POST /api/ai/generate-meme**

```json
{
  "prompt": "A funny cat doing cyberpunk things"
}
```

**POST /api/upload/create-with-upload**

- Content-Type: multipart/form-data
- Fields: `title`, `tags`, `startingPrice`, `image`

**POST /api/bids**

```json
{
  "memeId": "uuid",
  "amount": 100
}
```
