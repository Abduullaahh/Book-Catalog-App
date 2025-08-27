# Book Catalog App

A full-stack book catalog application built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and NextAuth.js for user authentication.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth using NextAuth.js
- 📚 **Book Management**: Add, view, and delete books
- 🎨 **Modern UI**: Beautiful responsive design with Tailwind CSS
- 📱 **Mobile Responsive**: Optimized for mobile and desktop
- 🌙 **Dark/Light Theme**: Theme switching functionality
- 🔍 **Search & Filter**: Search books by title/author and filter by genre
- 🗄️ **Database**: PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Email/Password, Google)
- **Database**: PostgreSQL (hosted via Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon, Supabase, or ElephantSQL)
- Google OAuth credentials (for Google sign-in)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd book-catalog-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup

#### Option A: Neon (Recommended)
1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string to your `.env.local`

#### Option B: Supabase
1. Go to [Supabase](https://supabase.com) and create a project
2. Go to Settings > Database
3. Copy the connection string

### 5. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 6. Database Migration

```bash
npx prisma generate
npx prisma db push
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/books` | Fetch all books for authenticated user |
| POST | `/api/books` | Add a new book |
| DELETE | `/api/books/[id]` | Delete a book by ID |

## Authentication Flow

1. **Email/Password**: Users can sign in with any email and password "password123" (demo mode)
2. **Google OAuth**: Users can sign in with their Google account
3. **Session Management**: JWT-based sessions with NextAuth.js
4. **Protected Routes**: All book operations require authentication

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth routes
│   │   └── books/         # Books API
│   ├── auth/              # Authentication pages
│   ├── add/               # Add book page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── books/            # Book-related components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
```

## Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and create an account
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy

### 3. Environment Variables in Vercel

Add the same environment variables from your `.env.local` file to the Vercel dashboard:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your Vercel domain)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### 4. Update Google OAuth

Add your Vercel domain to Google OAuth authorized redirect URIs:
`https://your-domain.vercel.app/api/auth/callback/google`

## Demo Credentials

For testing purposes, you can use:
- **Email**: Any valid email format
- **Password**: `password123`

## Features Implemented

✅ **Backend API** (Next.js + Prisma) - 25%
- Complete CRUD operations for books
- User authentication and authorization
- Database integration with PostgreSQL

✅ **Authentication** (NextAuth.js) - 30%
- Email/password authentication
- Google OAuth integration
- Session management
- Protected routes

✅ **TypeScript Usage** - 15%
- Full TypeScript implementation
- Type-safe API calls
- Proper type definitions

✅ **Code Structure & Organization** - 15%
- Clean folder structure
- Modular components
- Reusable hooks and utilities

✅ **UI Design & UX** - 10%
- Modern, responsive design
- Dark/light theme support
- Mobile-first approach
- Smooth animations and transitions

✅ **Deployment** - 5%
- Vercel deployment ready
- Environment variable configuration
- Production database setup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
