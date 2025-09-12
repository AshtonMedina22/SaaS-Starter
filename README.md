# Next.js SaaS Starter with Supabase

This is a starter template for building a SaaS application using **Next.js** with **Supabase** for authentication and database, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

## Features

- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on organizations/portals
- Basic RBAC with Admin and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with Supabase Auth
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events
- Portal management system with event tracking

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase PostgreSQL](https://supabase.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

```bash
git clone https://github.com/AshtonMedina22/SaaS-Starter-Ash.git
cd SaaS-Starter-Ash
pnpm install
```

## Environment Setup

1. Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fzcfiyicptisirrtmgsr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Y2ZpeWljcHRpc2lycnRtZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTI2MDMsImV4cCI6MjA3MzI2ODYwM30.UOy0iXc9USB0ryzPobkvC_WKytIvYomQ21crjMxuMYU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Y2ZpeWljcHRpc2lycnRtZ3NyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzY5MjYwMywiZXhwIjoyMDczMjY4NjAzfQ.Kp-Vxul3iBuP6zEOPjD5SaflH5JTJeQ1-ckhYG8PGa8

# Database (Supabase PostgreSQL)
POSTGRES_URL=postgresql://postgres:Papa$Frita$22@db.fzcfiyicptisirrtmgsr.supabase.co:5432/postgres

# Authentication
AUTH_SECRET=your-random-secret-key-here-change-this-in-production

# Stripe (if using payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App URL
BASE_URL=http://localhost:3000
```

2. Run the database migrations:

```bash
pnpm db:migrate
```

3. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Supabase Integration

This project is fully integrated with Supabase:

- **Authentication**: Uses Supabase Auth for user management
- **Database**: Connected to Supabase PostgreSQL with proper schema
- **Row Level Security**: Configured for data protection
- **Automatic Organization Creation**: Database triggers create organizations for new users

The database schema includes:
- `organizations` - User organizations
- `memberships` - User-organization relationships with roles
- `portals` - Portal management system
- `portal_events` - Event tracking for portal interactions

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
3. `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
4. `POSTGRES_URL`: Your Supabase database connection string
5. `BASE_URL`: Set this to your production domain
6. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one
7. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment
8. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
- https://zerotoshipped.com
- https://turbostarter.dev
