# Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://demo:demo@localhost:5432/bookcatalog"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional for development)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Quick Setup Steps

1. **Create .env.local file** with the above variables
2. **Set up Neon Database:**
   - Go to [Neon](https://neon.tech)
   - Create a free account and project
   - Copy the connection string to `DATABASE_URL`
3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Start development server:**
   ```bash
   npm run dev
   ```

## Demo Credentials

For testing, use:
- **Email**: Any valid email format
- **Password**: `password123`

## Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
