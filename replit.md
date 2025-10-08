# NFTrillions - Debt Slice NFT Platform

## Overview

NFTrillions is a satirical, educational NFT marketplace built on Solana that chronicles the rise of U.S. national debt. The platform creates 1,000 unique NFTs, each representing a $100 billion debt milestone. The application features real-time debt tracking, tiered pricing, and historical context for each debt slice.

This is a full-stack web application with a React frontend and Express backend, designed to provide an engaging way to visualize and understand the scale of national debt through blockchain technology.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing (lightweight alternative to React Router).

**State Management**: TanStack Query (React Query) for server state management with aggressive caching strategies (staleTime: Infinity, no refetch on window focus).

**UI Components**: Shadcn UI component library built on Radix UI primitives with Tailwind CSS for styling. The design system uses a glassmorphic aesthetic with custom CSS variables for theming.

**Styling Strategy**: 
- Tailwind CSS with custom configuration for dark theme
- Custom CSS animations for floating background orbs and glassmorphic effects
- Font stack: Inter, Space Grotesk, and JetBrains Mono from Google Fonts
- Design emphasizes visual hierarchy with gradient text, glass morphism, and animated elements

**Key Design Patterns**:
- Component composition with separate page components and reusable UI elements
- Custom hooks for shared logic (useDebtCounter, useIsMobile, useToast)
- Client-side debt counter that simulates real-time debt increases
- Modal system using React portals for overlay management

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**API Structure**: RESTful API with routes organized in `/api/*` namespace:
- `/api/slices` - Get all slices
- `/api/slices/:number` - Get specific slice by number
- `/api/slices/tier/:tier` - Get slices by tier
- `/api/slices/search` - Search slices
- `/api/slices/filter` - Filter slices by criteria
- `/api/debt-stats` - Get current debt statistics

**Development vs Production**:
- Development: Vite middleware integrated for HMR and fast refresh
- Production: Serves pre-built static assets from dist/public
- Custom request logging middleware for API endpoints with JSON response capture

**Storage Layer**: In-memory storage implementation (MemStorage class) that implements IStorage interface. This allows for easy migration to database-backed storage by implementing the same interface.

**Data Models**:
- Slices: Individual $100B debt milestones with metadata (tier, unlock status, historical context)
- DebtStats: Global statistics (current debt, unlocked slices count, next unlock milestone)
- Users: Basic user model for future authentication features

### Database Schema

**ORM**: Drizzle ORM with PostgreSQL dialect configured for Neon Database (@neondatabase/serverless).

**Tables**:

1. **slices**: Core NFT data
   - id (UUID primary key)
   - number (unique integer for slice number)
   - debtAmount (text representation of dollar amount)
   - mintPrice (integer price in SOL or USD)
   - tier (integer 1-10 for tiered pricing)
   - isUnlocked (boolean flag)
   - unlockedAt (timestamp)
   - dateReached (text date when debt milestone hit)
   - cpiRate, interestRate (economic indicators)
   - historicalContext, president, headlines (text fields for context)
   - solanaAddress (blockchain address)

2. **debtStats**: Global application state
   - currentDebt (text formatted debt amount)
   - unlockedSlices (integer count)
   - nextUnlockAt (text date)
   - lastUpdated (timestamp with auto-update)

3. **users**: Authentication/ownership
   - id (UUID primary key)
   - username (unique text)
   - password (hashed text)

**Migration Strategy**: Drizzle Kit configured with migrations in ./migrations directory, schema defined in shared/schema.ts for type safety across frontend and backend.

### External Dependencies

**Database**: 
- PostgreSQL via Neon Database serverless driver
- Connection string from DATABASE_URL environment variable
- Drizzle ORM for type-safe database queries

**UI Libraries**:
- Radix UI primitives for accessible component foundation
- Embla Carousel for slice browsing
- Lucide React for icons
- date-fns for date formatting

**Development Tools**:
- Replit-specific plugins for dev banner and cartographer (code navigation)
- Runtime error overlay for better debugging experience
- TSX for TypeScript execution in development

**Build & Bundling**:
- Vite for frontend bundling and development server
- esbuild for backend bundling (production builds)
- Path aliases configured (@/ for client/src, @shared/ for shared, @assets/ for attached_assets)

**Blockchain Integration** (Planned):
- Solana web3.js integration for NFT minting and wallet connections
- Treasury wallet system for controlled NFT releases
- On-chain verification of debt milestones

**Form Handling**:
- React Hook Form with Zod resolvers for type-safe form validation
- Drizzle-Zod integration for schema-based validation matching database models

**Session Management**:
- connect-pg-simple for PostgreSQL-backed sessions (when authentication is implemented)

### Application Flow

1. User visits home page with live debt counter
2. Real-time debt updates every second via client-side simulation
3. Collections browser shows slices grouped by tier with filtering/search
4. Slice detail pages show historical context, economic data, and NFT metadata
5. Future: Wallet connection enables minting/purchasing of unlocked slices

### Key Architectural Decisions

**Monorepo Structure**: Client, server, and shared code in single repository with path aliases for clean imports.

**Type Safety**: Shared schema definitions between frontend and backend using Drizzle's inference capabilities and Zod for runtime validation.

**Progressive Enhancement**: Application works without JavaScript for basic content, enhanced with React for interactivity.

**Performance**: Aggressive caching strategy with React Query, lazy loading of routes, optimized Vite builds with code splitting.

**Scalability Considerations**: Interface-based storage layer allows migration from in-memory to database without changing business logic. Stateless backend enables horizontal scaling.