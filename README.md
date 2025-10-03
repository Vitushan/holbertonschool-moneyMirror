
# MoneyMirror

## Brief Description

MoneyMirror is a modern web application to manage your personal budget, track your income/expenses, and visualize your finances simply. Project developed for Holberton School.

## Main Objectives

1. Simplified transaction tracking (add, edit, delete)
2. Clear data visualization (interactive charts)
3. Secure authentication and session management
4. Financial tips and user motivation

---

## Git Strategy & Branch Conventions

- **Main branch**: `main` (production, stable)
- **Development branch**: `development` (feature integration before merging to main)
- **Feature branches**: `feature/<name>` (e.g. `feature/login`, `feature/chart`, `feature/dashboard`)
- **Naming convention**: always in English, lowercase, separated by `/` after `feature/`
- **Scratch branch**: you can keep your test or "from scratch" branch to experiment, nothing is deleted!

### Example Workflow

1. Create a new feature

```bash
git checkout development
git checkout -b feature/login
# ... code ...
git add . && git commit -m "login feature"
git push origin feature/login
# Pull request to development, then merge to main when validated
```

### Git Strategy Recap

- `main`: stable, production deployment
- `development`: integration, testing
- `feature/*`: each new feature

---


## Detailed Description

MoneyMirror is a modern web application designed to simplify personal finance management. It allows users to track, organize, and analyze their income and expenses through an intuitive and secure interface. The app provides clear visualizations of spending habits and motivational financial tips to encourage better money management.

This project was developed as part of a portfolio for Holberton School, covering idea development, project charter, technical documentation, and MVP implementation stages.

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

## Environment Configuration Example

Create a `.env` or `.env.local` file at the root of your project with the following content:

```env
DATABASE_URL="mysql://root:@localhost:3306/moneymirror"
NEXTAUTH_SECRET="your_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

## API Usage Examples

### Register a new user


```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name": "John", "email": "john@example.com", "password": "Password123!"}'
```

### Login


```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "john@example.com", "password": "Password123!"}'
```

---

## Manual API & DB Testing


### Register (Success)


```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name": "Alice", "email": "alice@example.com", "password": "Test123!"}'
```

### Register (Missing Field/Error)


```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email": "alice@example.com", "password": "Test123!"}'
# Should return an error (missing name)
```

### Login (Success)


```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "alice@example.com", "password": "Test123!"}'
```

### Login (Wrong Password)


```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "alice@example.com", "password": "WrongPass!"}'
# Should return an error (invalid credentials)
```

### Login (Non-existent User)


```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "notfound@example.com", "password": "Test123!"}'
# Should return an error (user not found)
```

### Check Users in MySQL (Prisma Studio)

```bash
npx prisma studio
# Open http://localhost:5555 and check the User table
```

### Check Users in MySQL (SQL CLI)

```sql
-- In MySQL CLI:
USE moneymirror;
SELECT * FROM User;
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

```text
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

### Frontend Stack

- **React 18 + Next.js 14** (App Router) - Pages & components with SSR/ISR
- **Tailwind CSS + shadcn/ui** - Styling and accessible UI components
- **Chart.js / Recharts** - Interactive data visualization
- **html2canvas** - PNG export functionality

### Backend Stack

- **Next.js API Routes** - Integrated backend with Node.js
- **NextAuth.js + bcrypt** - Authentication and password security
- **Zod** - Input validation and type safety

### Database Layer

- **PostgreSQL + Prisma ORM** - Robust relational database with type-safe queries

### Data Flow

#### Data Flow Diagram

Frontend ↔ API Routes ↔ Prisma ↔ PostgreSQL

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

- **Source Repository:** [https://github.com/Vitushan/holbertonschool-moneyMirror](https://github.com/Vitushan/holbertonschool-moneyMirror)
- **Issues & Bug Tracking:** GitHub Issues
- **Development:** Ready for deployment on Vercel/Railway/Netlify

---

**MoneyMirror** - Personal Budget Management Application  
Developed as part of the Holberton School Portfolio Project
