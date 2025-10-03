
# MoneyMirror – Full Project Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Stack & Features](#stack--features)
- [Environment Setup](#environment-setup)
- [Database Schema](#database-schema)
- [Pages & User Flow](#pages--user-flow)
- [API Reference](#api-reference)
- [Security](#security)
- [Testing](#testing)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting & Debug](#troubleshooting--debug)
- [Limitations & FAQ](#limitations--faq)

---

## Project Overview

MoneyMirror is a personal finance management application. It provides authentication (login/register), transaction tracking, and database integration using Next.js, React, Tailwind CSS, Prisma ORM, MySQL, and NextAuth.js.

## Stack & Features

- Next.js 14
- React 18
- Tailwind CSS
- Prisma ORM
- MySQL
- NextAuth.js (authentication)
- bcryptjs (password hashing)
- Zod (validation)
- Docker support
- Jest & Cypress (testing)

## Environment Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
cd holbertonschool-moneyMirror
npm install
```

Copy and configure your environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your DB credentials and secrets
```

**Required variables:**

```env
DATABASE_URL="mysql://username:password@localhost:3306/moneymirror"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

Start the development server:

```bash
npm run dev
```

## Database Schema

Prisma schema for the main user table:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

To inspect or edit the database:

```bash
npx prisma studio
# Or in MySQL CLI:
USE moneymirror;
SELECT * FROM User;
```

## Pages & User Flow

- `/` : **Home** – Project presentation, API status.
- `/login` : **Login** – Form for email/password, error messages, session management. If already logged in, shows user info and dashboard link.
- `/register` : **Register** – Form for name/email/password/confirm, error handling, success message, resets form on success.
- **Redirections** :
  - If logged in, `/login` suggests going to the dashboard (adapt if dashboard exists).
  - After successful registration, welcome message.
  - Logout via NextAuth (JWT session).

## API Reference

### POST `/api/auth/register`

**Payload:**

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Success Response:**

```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John",
    "email": "john@example.com"
  }
}
```

**Error Examples**

400 (missing fields):
```json
{ "error": "All fields are required" }
```
400 (invalid email):
```json
{ "error": "Invalid email address." }
```
400 (password too short):
```json
{ "error": "The password must contain at least 6 characters" }
```
400 (email already used):
```json
{ "error": "This email is already used" }
```

### POST `/api/auth/login`

**Payload:**

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John",
    "email": "john@example.com"
  }
}
```

**Error Examples**

400 (missing fields):
```json
{ "error": "Email and password are required" }
```
401 (invalid credentials):
```json
{ "error": "Invalid email or password" }
```
500 (server error):
```json
{ "error": "Server error: ..." }
```

### `/api/auth/[...nextauth]`

Managed by NextAuth.js (Credentials Provider). Handles session, login, logout, JWT.

#### NextAuth Session Example

```json
{
  "user": {
    "name": "John",
    "email": "john@example.com",
    "id": "clw..."
  },
  "expires": "2025-10-03T12:34:56.789Z"
}
```

## Security

- Passwords are hashed with bcryptjs before storage.
- Email must be unique (enforced by DB and API).
- All fields are validated (backend and frontend).
- JWT session via NextAuth.js.

## Testing

- `test_nextauth.sh`: Tests NextAuth login/logout/session.
- `test_all_api.sh`: Tests custom API endpoints (register/login).
- Results in `result_test_nextauth.txt` and `result_all_api.txt`.

**Example execution:**

```bash
./test_nextauth.sh
./test_all_api.sh
cat result_test_nextauth.txt
cat result_all_api.txt
```

## Deployment Guide

### Vercel

1. Connect the repo to Vercel (https://vercel.com/import/git)
2. Add environment variables in the Vercel dashboard (see `.env.example`)
3. Deploy!

### Docker

1. Create a `Dockerfile` (see Next.js docs or example below)
2. Build and run:
```bash
docker build -t moneymirror .
docker run -p 3000:3000 --env-file .env.local moneymirror
```

### Production Security Tips
- Change `NEXTAUTH_SECRET` and never commit it!
- Use a secure MySQL database (no root, strong password)
- Enable HTTPS (Vercel does this by default)
- Keep dependencies up to date

## Troubleshooting & Debug

- Check API responses for error messages and HTTP codes.
- Use Prisma Studio to inspect the database.
- Check terminal logs for backend errors.

## Limitations & FAQ

- No password reset management (to be implemented if needed)
- No OAuth authentication (Google, GitHub...) by default, but NextAuth supports it easily
- No advanced user dashboard (transactions, charts) in this version
- Tests are basic (shell scripts); for CI/CD, add more advanced Jest/Cypress tests

---

For any questions or contributions, open an issue or pull request on the GitHub repo.
