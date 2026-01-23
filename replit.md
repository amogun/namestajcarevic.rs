# Carević Furniture Salon Website

## Overview

This is a full-stack e-commerce website for "Carević" furniture salon based in Kragujevac, Serbia. The application provides a product catalog, order management system, and informational pages about the business. It's built as a monorepo with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme (warm wood tones: brown #6b4f3a, beige #f7f1ea, dark accent #2a1f17)
- **Forms**: React Hook Form with Zod validation
- **Typography**: Playfair Display (serif headings) + Inter (sans-serif body)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Email**: Nodemailer for order confirmation emails
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains products, orders, and order_items tables
- **Migrations**: Drizzle Kit with migrations output to `./migrations` directory

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle schema definitions
│   └── routes.ts     # API contract definitions
```

### Key Design Patterns
- **Monorepo Structure**: Client and server share TypeScript types through the `shared/` directory
- **Type-Safe API**: API contracts defined with Zod schemas in `shared/routes.ts`, used by both client and server
- **Database Seeding**: Automatic seeding of sample products when database is empty
- **Path Aliases**: `@/` maps to client/src, `@shared/` maps to shared directory

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit for TypeScript with PostgreSQL driver (`pg` package)

### Email Service
- **Nodemailer**: Email sending for order confirmations
- Environment variables needed: `EMAIL_SMTP`, `SALON_EMAIL` (for notifications)

### UI Libraries
- **Radix UI**: Headless UI primitives (dialogs, dropdowns, forms, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **class-variance-authority**: Component variant styling

### Development Tools
- **Vite**: Frontend dev server and bundler with HMR
- **esbuild**: Fast server-side bundling for production
- **Drizzle Kit**: Database migration and schema management (`npm run db:push`)

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator