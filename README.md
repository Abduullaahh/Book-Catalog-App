# Book Catalog App

A full-stack book catalog application built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and NextAuth.js for user authentication. Features a modular, scalable architecture with clean separation of concerns.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth using NextAuth.js
- 📚 **Book Management**: Add, view, and delete books with advanced filtering
- 🎨 **Modern UI**: Beautiful responsive design with Tailwind CSS and Radix UI
- 📱 **Mobile Responsive**: Optimized for mobile and desktop devices
- 🌙 **Dark/Light Theme**: Theme switching functionality with persistent state
- 🔍 **Advanced Search & Filter**: Search books by title/author, filter by genre, rating, and year
- 👤 **User Profile**: View user details, book statistics, and account information
- 🗄️ **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- 🏗️ **Modular Architecture**: Clean, maintainable codebase with reusable components
- ⚡ **Performance Optimized**: Server components, code splitting, and efficient rendering

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Email/Password, Google OAuth)
- **Database**: PostgreSQL (hosted via Neon)
- **ORM**: Prisma with type-safe database operations
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: React hooks and context
- **Deployment**: Vercel with automatic builds and type checking

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon, Supabase, or ElephantSQL)
- Google OAuth credentials (for Google sign-in)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Abduullaahh/Book-Catalog-App.git
cd Book-Catalog-App
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

**Note**: The Prisma client is automatically generated during the build process via the `postinstall` script.

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
3. **Registration**: New users can register with email and password
4. **Session Management**: JWT-based sessions with NextAuth.js
5. **Protected Routes**: All book operations require authentication

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth routes
│   │   └── books/         # Books API
│   ├── (protected)/       # Protected route group
│   │   ├── add/           # Add book page
│   │   └── dashboard/     # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (login/register)
├── components/            # React components
│   ├── auth/             # Authentication components
│   │   ├── auth-actions.tsx
│   │   ├── auth-fields.tsx
│   │   ├── auth-form.tsx
│   │   ├── auth-header.tsx
│   │   ├── auth-toggle.tsx
│   │   ├── sign-in-form.tsx
│   │   └── success-message.tsx
│   ├── books/            # Book-related components
│   │   ├── add-book-form.tsx
│   │   ├── book-actions.tsx
│   │   ├── book-card.tsx
│   │   ├── book-cover.tsx
│   │   ├── book-dialog.tsx
│   │   ├── book-grid.tsx
│   │   ├── book-metadata.tsx
│   │   ├── book-table.tsx
│   │   ├── books-grid.tsx
│   │   ├── books-page.tsx
│   │   ├── delete-book-button.tsx
│   │   ├── form-actions.tsx
│   │   ├── form-fields.tsx
│   │   ├── form-section.tsx
│   │   └── rating-display.tsx
│   ├── layout/           # Layout components
│   │   ├── sidebar.tsx
│   │   └── user-details-popup.tsx
│   └── ui/               # Reusable UI components
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       ├── theme-toggle.tsx
│       ├── search-bar.tsx
│       ├── view-toggle.tsx
│       ├── pagination-controls.tsx
│       └── results-count.tsx
├── hooks/                # Custom React hooks
│   ├── use-auth-nextauth.tsx
│   ├── use-books.ts
│   ├── use-mobile.ts
│   └── use-registration.ts
├── lib/                  # Utility functions and configurations
│   ├── auth-config.ts
│   ├── books.ts
│   ├── constants.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── utils/
│       ├── date.ts
│       ├── index.ts
│       └── validation.ts
├── prisma/               # Database schema and migrations
│   └── schema.prisma
└── types/                # TypeScript type definitions
    └── index.ts
```

## Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin master
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
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### 4. Update Google OAuth

Add your Vercel domain to Google OAuth authorized redirect URIs:
`https://your-domain.vercel.app/api/auth/callback/google`

## Demo Credentials

For testing purposes, you can use:
- **Email**: someuser@bookcatalog.com
- **Password**: `123456`