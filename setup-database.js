const fs = require('fs');
const path = require('path');

const envContent = `# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
`;

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
  console.log('');
  console.log('📝 Please update the following in your .env.local file:');
  console.log('');
  console.log('1. DATABASE_URL: Your Neon PostgreSQL connection string');
  console.log('   Format: postgresql://username:password@host:port/database?sslmode=require');
  console.log('');
  console.log('2. NEXTAUTH_SECRET: Generate a random secret key');
  console.log('   You can use: openssl rand -base64 32');
  console.log('');
  console.log('3. Google OAuth (optional):');
  console.log('   - GOOGLE_CLIENT_ID: From Google Cloud Console');
  console.log('   - GOOGLE_CLIENT_SECRET: From Google Cloud Console');
  console.log('');
  console.log('🔗 Get your Neon database URL from: https://console.neon.tech');
  console.log('');
} else {
  console.log('⚠️  .env.local file already exists');
  console.log('Please check if DATABASE_URL is set correctly');
}
