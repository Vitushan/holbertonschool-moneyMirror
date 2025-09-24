# MoneyMirror - Personal Budget Management

## Description
MoneyMirror is a modern web application designed to simplify personal finance management. It allows users to track, organize, and analyze their income and expenses through an intuitive and secure interface. The app provides clear visualizations of spending habits and motivational financial tips to encourage better money management.

This project was developed as part of a portfolio for the Holberton School, covering idea development, project charter, technical documentation, and MVP implementation stages.

## Main Features

### Budget Management
- Full CRUD for transactions (income & expenses)
- Add, edit, and delete transactions with ease

### Search & Filtering
- Simple navigation through transaction history
- Filter by category, amount, and time period

### Data Visualization
- **Line Chart** → financial evolution over time
- **Pie Chart** → breakdown by categories
- **Bar Chart** → amount comparison by period/category
- **PNG Export** → one-click chart download

### User Engagement
- **Financial Tips** → random display of practical advice
- **Motivational Messages** → subtle personalization to encourage users

### Security
- **Secure Authentication** → account creation, login, session management
- **Data Protection** → encryption and input validation  

## Objectives (SMART)
1. **Simplified Transaction Tracking**: Allow users to add, modify, and view their income and expenses with a fully operational interface by the end of Month 1.  
2. **Visual Data Analysis**: Provide interactive charts (pie, line, histogram) to visualize spending habits and enable report downloads by the end of Month 2.  
3. **User Motivation & Engagement**: Display random financial tips and motivational messages, with a first functional version available by Month 3.  

## Target Users
- Students managing a small monthly budget  
- Young professionals tracking living expenses (rent, subscriptions, bills)  
- Adults looking for a simple and intuitive finance tracking solution  

## Tech Stack

### Core Language
- **JavaScript (ES2023+)** - Unified front-end/back-end for easier development and maintenance

### Frontend
- **React 18** - Library for declarative and modular user interfaces
- **Next.js 14** (App Router) - Framework with SSR/ISR for SEO optimization and performance
- **Tailwind CSS** - Utility-first CSS framework for rapid responsive interfaces
- **shadcn/ui** - Accessible UI components built on Tailwind CSS
- **Recharts / Chart.js** - Interactive charts (line, pie, bar charts)
- **html2canvas / dom-to-image** - PNG export for charts

### Backend
- **Next.js API Routes** - Lightweight integrated backend for authentication and business logic
- **NextAuth.js** - Complete authentication (email, OAuth, secure sessions)
- **bcrypt** - Secure password hashing

### Database
- **PostgreSQL** - Robust and performant relational database
- **Prisma** - Modern ORM with strong typing and query security

### Security & Validation
- **Zod** - Input validation for client/server
- **NextAuth.js + bcrypt** - Secure authentication and encryption

### Tools & DevOps
- **Git + GitHub** - Version control
- **Vercel** - Fast and scalable deployment
- **ESLint + Prettier** - Code quality and consistency
- **Docker** - Containerization (optional)
- **Testing:** Jest + React Testing Library + Supertest + Cypress  

## Installation

### Method 1: Standard Installation

```bash
# Clone the repository
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
cd holbertonschool-moneyMirror

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your settings

# Configure database
npm run db:generate
npm run db:push

# (Optional) Seed test data
npm run db:seed

# Start development server
npm run dev
```

### Method 2: With Docker

```bash
# Clone the repository
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
cd holbertonschool-moneyMirror

# Start with Docker Compose
docker-compose up -d

# Application will be available at http://localhost:3000
```

### Method 3: shadcn/ui Setup (Recommended)

```bash
# After basic installation
npm install

# Initialize shadcn/ui (already configured)
# Add shadcn/ui components
npm run ui:add button
npm run ui:add card
npm run ui:add dialog

# Format code
npm run format
```

## Deployment

The application is configured for deployment on:
- **Vercel** (recommended)
- **Railway** 
- **Netlify**

## Project Management

### Branch Strategy
- `main` → stable production branch
- `development` → ongoing development
- `feature/*` → specific features (auth, CRUD, charts, export)

### Bug Tracking
- GitHub Issues for bug reports and feature requests
- Pull Request templates for code reviews

## Testing

- **Unit tests:** Jest + React Testing Library
- **API tests:** Supertest for backend routes
- **E2E tests:** Cypress for full user flows
- **Coverage:** Run `npm run test:coverage` for detailed reports

## Project Structure

```
holbertonschool-moneyMirror/
├── README.md                    # Project documentation
├── package.json                 # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
├── components.json             # shadcn/ui configuration
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.js                 # Database seeding
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard page
│   │   ├── login/             # Authentication pages
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── charts/           # Chart components
│   │   ├── forms/            # Form components
│   │   └── providers/        # Context providers
│   └── lib/                   # Utilities and configurations
├── tests/                     # Test files
│   ├── __tests__/            # Unit tests
│   └── cypress/              # E2E tests
└── public/                    # Static assets
```

## System Architecture

### Frontend
- **React 18 + Next.js 14** (App Router) - Pages & components with SSR/ISR
- **Tailwind CSS + shadcn/ui** - Styling and accessible UI components
- **Chart.js / Recharts** - Interactive data visualization
- **html2canvas** - PNG export functionality

### Backend
- **Next.js API Routes** - Integrated backend with Node.js
- **NextAuth.js + bcrypt** - Authentication and password security
- **Zod** - Input validation and type safety

### Database
- **PostgreSQL + Prisma ORM** - Robust relational database with type-safe queries

### Data Flow
**Frontend ↔ API Routes ↔ Prisma ↔ PostgreSQL**

Optional integrations: External APIs for enhanced features

## User Stories (Prioritized)

Must Have: Add/Modify/Delete Transactions, View Dashboard, Login/Signup

Should Have: Export charts as PNG, Filter transactions

Could Have: Financial tips & motivational messages, Dark mode

Won’t Have: Mobile-native apps, Automatic bank integration

External and Internal APIs

Internal: /api/auth/*, /api/transactions/*

External (optional): None for MVP

SCM and QA

Source Control: GitHub (main, development, feature/* branches)

Code Reviews: PR required for feature branches

Testing: Jest (unit), Supertest (API), Cypress (E2E)

Deployment: Vercel, PostgreSQL DB, environment variables configured

## Links & Repository

- **Source Repository:** https://github.com/Vitushan/holbertonschool-moneyMirror
- **Issues & Bug Tracking:** GitHub Issues
- **Development:** Ready for deployment on Vercel/Railway/Netlify

---

**MoneyMirror** - Personal Budget Management Application  
Developed as part of the Holberton School Portfolio Project