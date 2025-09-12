# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fzcfiyicptisirrtmgsr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Y2ZpeWljcHRpc2lycnRtZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTI2MDMsImV4cCI6MjA3MzI2ODYwM30.UOy0iXc9USB0ryzPobkvC_WKytIvYomQ21crjMxuMYU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Y2ZpeWljcHRpc2lycnRtZ3NyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzY5MjYwMywiZXhwIjoyMDczMjY4NjAzfQ.Kp-Vxul3iBuP6zEOPjD5SaflH5JTJeQ1-ckhYG8PGa8

# Database (Supabase PostgreSQL)
POSTGRES_URL=postgresql://postgres:Papa$Frita$22@db.fzcfiyicptisirrtmgsr.supabase.co:5432/postgres

# Authentication
# Generate a random secret key for JWT signing
AUTH_SECRET=your-random-secret-key-here-change-this-in-production

# Stripe (if using payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App URL (update with your Vercel domain)
BASE_URL=http://localhost:3000
```

## Vercel Environment Variables

Add these same variables to your Vercel project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate value
5. Make sure to update `BASE_URL` to your actual Vercel domain

## Important Notes

1. **Database Password**: Replace `[YOUR-PASSWORD]` in the `POSTGRES_URL` with your actual Supabase database password
2. **AUTH_SECRET**: Generate a random string for production use
3. **BASE_URL**: Update this to your actual domain when deploying
4. **Stripe Keys**: Add your Stripe keys if you're using payments

## Getting Your Database Password

1. Go to your Supabase dashboard
2. Navigate to Settings → Database
3. Look for the connection string and copy the password from there
4. Replace `[YOUR-PASSWORD]` in the POSTGRES_URL with this password
