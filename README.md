# YPIT: The Artificial Future - Hackathon Registration

A modern hackathon registration system for YPIT's AI-focused event in Lagos, Nigeria.

## Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** NestJS 10, TypeScript
- **Database:** Supabase (PostgreSQL)
- **Email:** Brevo (Transactional Emails)
- **Queue:** BullMQ (Redis)
- **Monorepo:** Turborepo

## Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   └── shared/       # Shared types and validation
└── supabase/
    └── schema.sql    # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+
- Supabase account
- Brevo account
- Redis (running locally or remotely)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run the contents of `supabase/schema.sql` to create the registrations table

### 3. Configure Environment Variables

Create a `.env` file in `apps/api/`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Brevo Email Configuration
BREVO_API_KEY=your-brevo-api-key
SENDER_EMAIL=hello@ypit.org

# Application
PORT=3001
FRONTEND_URL=http://localhost:3000

# Redis/BullMQ Configuration
REDIS_URL=redis://localhost:6379
```

Create a `.env.local` file in `apps/web/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Run Development Servers

Run both frontend and backend:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend only (port 3000)
npm run dev:web

# Backend only (port 3001)
npm run dev:api
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/registration/health

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registration` | Submit a new registration |
| GET | `/api/registration/stats` | Get registration statistics |
| GET | `/api/registration/health` | Health check |

## Registration Form Sections

### Step 1: Basic Information
- Full Name
- Email Address
- Age Range
- Gender
- City & Country

### Step 2: Project Idea
- Problem Statement
- Proposed Solution
- Hackathon Track (Health Tech, Fintech, AI/Emerging Tech, EduTech, Climate/Sustainability)
- Unique Impact

### Step 3: Skills & Background
- Primary Skill
- Hackathon Experience
- Tools & Technologies
- Team Size (1-7)
- Team Members

## Design System

### Colors
- **Deep Navy:** `#0a1628` - Primary background
- **Mid Navy:** `#1e3a5f` - Cards, sections
- **Electric Cyan:** `#06b6d4` - Primary accent
- **Teal:** `#14b8a6` - Secondary accent

### Typography
- **Headings:** Outfit
- **Body:** DM Sans
- **Code:** JetBrains Mono

## Deployment

### Frontend (Vercel)

```bash
cd apps/web
vercel
```

### Backend (Railway/Render)

1. Set environment variables
2. Deploy the `apps/api` directory
3. Update `NEXT_PUBLIC_API_URL` in frontend

## License

MIT License - YPIT 2025
