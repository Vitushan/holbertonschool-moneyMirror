docker-compose up -d
git push origin feature/login
git clone <https://github.com/Vitushan/holbertonschool-moneyMirror.git>
docker-compose up -d

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

## MoneyMirror – Feature: Login

This branch implements and tests the authentication system (login/register) for MoneyMirror.

👉 For full project documentation, see the main [README on the development branch](https://github.com/Vitushan/holbertonschool-moneyMirror/blob/development/README.md).
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
  - If logged in, `/login` propose d’aller au dashboard (à adapter si dashboard existe).
  - Après inscription réussie, message de bienvenue.
  - Déconnexion via NextAuth (session JWT).

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
{ "error": "all fields is required" }
```
400 (invalid email):
```json
{ "error": "Your mail address is wrong." }
```
400 (password too short):
```json
{ "error": "The password must be contain minimum 6 characters" }
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

Après connexion, la session NextAuth ressemble à :
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

## Database & User Flow Schema

**Schéma de la table User (Prisma/MySQL)**

```
┌────────────┬─────────┬────────────┬────────────┬────────────┬────────────┐
│ id (PK)    │ name    │ email (UQ) │ password   │ createdAt  │ updatedAt  │
└────────────┴─────────┴────────────┴────────────┴────────────┴────────────┘
```

**Flow utilisateur**

```
Inscription → POST /api/auth/register → [Validation, Hash, Création User] → Succès/Erreur
Connexion → POST /api/auth/login → [Validation, Check, JWT Session] → Succès/Erreur
Session → NextAuth.js (JWT) → Accès protégé
Déconnexion → NextAuth signOut → Session détruite
```

## Security

- Passwords are hashed with bcryptjs before storage.
- Email must be unique (enforced by DB and API).
- All fields are validated (backend and frontend).
- JWT session via NextAuth.js.

## Testing

- `test_nextauth.sh` : Teste la connexion/déconnexion NextAuth (login/logout/session).
- `test_all_api.sh` : Teste les endpoints API custom (register/login).
- Résultats dans `result_test_nextauth.txt` et `result_all_api.txt`.

**Exemple d’exécution :**

```bash
./test_nextauth.sh
./test_all_api.sh
cat result_test_nextauth.txt
cat result_all_api.txt
```

## Deployment Guide

### Vercel

1. Connecte le repo à Vercel (https://vercel.com/import/git)
2. Ajoute les variables d’environnement dans le dashboard Vercel (voir `.env.example`)
3. Déploie !

### Docker

1. Crée un fichier `Dockerfile` (voir doc Next.js ou exemple ci-dessous)
2. Build et run :
```bash
docker build -t moneymirror .
docker run -p 3000:3000 --env-file .env.local moneymirror
```

### Conseils sécurité production
- Change `NEXTAUTH_SECRET` et ne le commit jamais !
- Utilise une base MySQL sécurisée (pas de root, mot de passe fort)
- Active HTTPS (Vercel le fait par défaut)
- Mets à jour les dépendances régulièrement

## Troubleshooting & Debug

- Vérifiez les réponses API pour les messages d’erreur et les codes HTTP.
- Utilisez Prisma Studio pour inspecter la base de données.
- Consultez les logs du terminal pour les erreurs backend.

## Limitations & FAQ

- Pas de gestion de reset password (à implémenter si besoin)
- Pas d’authentification OAuth (Google, GitHub...) par défaut, mais NextAuth le permet facilement
- Pas de dashboard utilisateur avancé (transactions, graphiques) dans cette version
- Les tests sont basiques (shell scripts), pour du CI/CD, ajouter des tests Jest/Cypress plus poussés

---

Pour toute question ou contribution, ouvre une issue ou un pull request sur le repo GitHub.

MoneyMirror is a personal finance management application. It provides authentication (login/register), transaction tracking, and database integration using Next.js, React, Tailwind CSS, Prisma ORM, MySQL, and NextAuth.js.

## Quick Setup

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your DB credentials

# Start development server
npm run dev
```

## Authentication API Usage & Test Examples

### Register a new user (success)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "password": "Password123!"}'
# Expected: 201 Created, user registered
```

### Register with missing field (error)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "Password123!"}'
# Expected: 400 Bad Request, error: missing name
```

### Register with existing email (error)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "password": "Password123!"}'
# Expected: 409 Conflict, error: email already taken
```

### Login (success)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "Password123!"}'
# Expected: 200 OK, returns user/session
```

### Login with wrong password (error)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "WrongPass!"}'
# Expected: 401 Unauthorized, error: invalid credentials
```

### Login with unknown email (error)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "notfound@example.com", "password": "Password123!"}'
# Expected: 404 Not Found, error: user not found
```

### Login with missing fields (error)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "", "password": ""}'
# Expected: 400 Bad Request, error: missing fields
```

## NextAuth & API Test Scripts

- `test_nextauth.sh` – Tests NextAuth login/logout/session
- `test_all_api.sh` – Tests custom API endpoints (register/login)

Run:

```bash
./test_nextauth.sh
./test_all_api.sh
# Check result_test_nextauth.txt and result_all_api.txt for outputs
```

## Database Testing

To check users in the database:

```bash
npx prisma studio
# Or in MySQL CLI:
USE moneymirror;
SELECT * FROM User;
```

## Example: Check transactions (if seeded)

```sql
SELECT * FROM Transaction;
```

## Error Handling & Debugging

- Check API responses for error messages and status codes
- Use Prisma Studio to inspect DB state
- Check logs in the terminal for backend errors

## Notes

- This README covers the entire project. For feature-specific documentation, see the corresponding branch README files.
