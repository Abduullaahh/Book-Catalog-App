const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(__dirname, '.env.local');
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envLocalPath)) {
  // Read .env.local
  const envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
  
  // Write to .env
  fs.writeFileSync(envPath, envLocalContent);
  
  console.log('✅ Copied .env.local to .env for Prisma');
  console.log('📝 Now you can run: npx prisma db push');
} else {
  console.log('❌ .env.local file not found');
  console.log('Please create .env.local with your DATABASE_URL first');
}
