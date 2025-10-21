# 💰 MoneyMirror – Documentation Complète du Projet

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Technologies & Fonctionnalités](#technologies--fonctionnalités)
- [Configuration](#configuration)
- [Schéma de Base de Données](#schéma-de-base-de-données)
- [Pages & Flux Utilisateur](#pages--flux-utilisateur)
- [Référence API](#référence-api)
- [Dashboard](#dashboard)
- [Sécurité](#sécurité)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Dépannage](#dépannage)
- [FAQ & Limitations](#faq--limitations)

---

## Vue d'ensemble

MoneyMirror est une application complète de gestion financière personnelle. Elle permet l'authentification (connexion/inscription), le suivi des transactions, la visualisation de données via des graphiques interactifs et l'export PNG, le tout avec une intégration base de données MySQL via Prisma ORM.

**Fonctionnalités principales :**

- ✅ Authentification sécurisée avec NextAuth.js
- ✅ Gestion complète des transactions (CRUD)
- ✅ Dashboard avec 3 types de graphiques (Ligne, Camembert, Barres)
- ✅ Filtres temporels (Semaine, Mois, Année)
- ✅ Export PNG des graphiques
- ✅ Interface responsive et moderne
- ✅ Logo et footer personnalisés sur toutes les pages

## Technologies & Fonctionnalités

**Stack Technique :**

- **Next.js 15.5.4** - Framework React pour le rendu côté serveur
- **React 18** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS utilitaire
- **Prisma ORM** - ORM pour MySQL
- **MySQL** - Base de données relationnelle
- **NextAuth.js** - Gestion de l'authentification
- **bcryptjs** - Hachage des mots de passe
- **Recharts** - Bibliothèque de visualisation de données
- **html2canvas** - Export PNG des graphiques
- **Jest & Cypress** - Tests unitaires et d'intégration

## Configuration

**Cloner le dépôt et installer les dépendances :**

```bash
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
cd holbertonschool-moneyMirror
npm install
```

**Configurer les variables d'environnement :**

```bash
cp .env.example .env.local
```

**Variables requises dans `.env.local` :**

```env
DATABASE_URL="mysql://username:password@localhost:3306/moneymirror"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-clé-secrète-ici"
```

**Initialiser la base de données :**

```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

**Démarrer le serveur de développement :**

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Schéma de Base de Données

**Modèles Prisma :**

```prisma
model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  password     String
  transactions Transaction[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Transaction {
  id          String   @id @default(cuid())
  amount      Float
  type        String
  category    String
  description String?
  note        String?
  currency    String   @default("EUR")
  date        DateTime
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Inspecter la base de données :**

```bash
npx prisma studio
```

## Pages & Flux Utilisateur

### Pages principales

- **`/`** - Page d'accueil avec présentation du projet
- **`/login`** - Formulaire de connexion avec gestion des sessions
- **`/register`** - Formulaire d'inscription avec validation
- **`/dashboard`** - Tableau de bord avec statistiques et graphiques
- **`/transactions`** - Liste de toutes les transactions
- **`/transactions/add`** - Formulaire d'ajout de transaction
- **`/transactions/edit/[id]`** - Formulaire de modification de transaction

### Flux de navigation

1. **Connexion** → Redirection automatique vers `/dashboard`
2. **Ajout de transaction** → Redirection vers `/dashboard` après succès
3. **Dashboard** → Boutons vers `/transactions` et `/transactions/add`
4. **Transactions** → Bouton vers `/dashboard`

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

## Error Examples**

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

## error Examples**

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

Géré par NextAuth.js (Credentials Provider). Gère la session, la connexion, la déconnexion et le JWT.

#### Exemple de session NextAuth

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

## Dashboard

Le dashboard est la page centrale de l'application offrant une vue d'ensemble complète des finances de l'utilisateur.

### Fonctionnalités du Dashboard

#### 📊 Statistiques en temps réel

Quatre cartes affichent les métriques clés :

- **Total Transactions** - Nombre total de transactions (cliquable → redirige vers `/transactions`)
- **Projets Actifs** - Nombre de catégories distinctes
- **Revenu** - Différence entre revenus et dépenses
- **Croissance** - Pourcentage de croissance par rapport à la période précédente

#### 📈 Trois types de graphiques interactifs

1. **Graphique en Ligne** - Évolution des transactions dans le temps
2. **Graphique Camembert** - Répartition par catégories
3. **Graphique en Barres** - Comparaison revenus vs dépenses

#### 🔍 Filtres et recherche

- **Filtres temporels** : Semaine / Mois / Année
- **Barre de recherche** : Filtrer les données des graphiques
- **Filtre par catégorie** : Afficher uniquement une catégorie spécifique

#### 💾 Export PNG

- Sélecteur de graphique : Dashboard complet / Ligne / Camembert / Barres
- Téléchargement en haute qualité (scale 2x)
- Nom de fichier automatique avec date

#### 🎨 Interface utilisateur

- Logo MoneyMirror stylé avec gradient en haut à gauche
- Titre "Dashboard" encadré avec bordure élégante
- Boutons de navigation vers Transactions et Ajout de transaction
- Design responsive et moderne
- Footer avec copyright

### API du Dashboard

#### GET `/api/dashboard/stats`

Récupère les statistiques agrégées.

**Query Parameters :**

- `filter` : `week` | `month` | `year`

**Réponse :**

```json
{
  "success": true,
  "stats": {
    "totalUsers": 10,
    "activeProjects": 8,
    "revenue": 2500,
    "growth": 15.5
  }
}
```

#### GET `/api/dashboard/charts`

Récupère les données des graphiques.

**Query Parameters :**

- `filter` : `week` | `month` | `year`

**Réponse :**

```json
{
  "success": true,
  "lineChartData": [
    { "name": "Lun", "value": 500 },
    { "name": "Mar", "value": 750 }
  ],
  "pieChartData": [
    { "name": "Salary", "value": 3000 },
    { "name": "Food", "value": 500 }
  ],
  "barChartData": [
    { "name": "Lun", "revenus": 500, "dépenses": 150 }
  ]
}
```

## Sécurité

- **Hachage des mots de passe** : Utilisation de bcryptjs avant le stockage
- **Email unique** : Validation côté base de données et API
- **Validation complète** : Tous les champs validés côté frontend et backend
- **Sessions JWT** : Gestion sécurisée via NextAuth.js
- **Protection des routes** : Authentification requise pour toutes les routes protégées
- **Cascade Delete** : Suppression automatique des transactions associées lors de la suppression d'un utilisateur

## Tests

Le projet inclut des tests unitaires et d'intégration :

- **Tests Unitaires** : Routes API, opérations CRUD sur les transactions
- **Tests d'Intégration** : Fonctionnalité end-to-end entre frontend et backend

**Lancer les tests :**

```bash
npm test
```

## Déploiement

### Vercel

1. Connecter le dépôt à Vercel : [https://vercel.com/import/git](https://vercel.com/import/git)
2. Ajouter les variables d'environnement dans le dashboard Vercel
3. Déployer !

### Docker

**Créer et exécuter l'image Docker :**

```bash
docker build -t moneymirror .
docker run -p 3000:3000 --env-file .env.local moneymirror
```

### Conseils de sécurité pour la production

- ⚠️ **Modifier `NEXTAUTH_SECRET`** et ne jamais le commiter !
- 🔒 Utiliser une base de données MySQL sécurisée (pas de root, mot de passe fort)
- 🔐 Activer HTTPS (Vercel le fait par défaut)
- 🔄 Maintenir les dépendances à jour

## Dépannage

**Problèmes communs :**

- Vérifier les réponses API pour les messages d'erreur et codes HTTP
- Utiliser Prisma Studio pour inspecter la base de données : `npx prisma studio`
- Consulter les logs du terminal pour les erreurs backend
- Vérifier que MySQL est en cours d'exécution
- S'assurer que les variables d'environnement sont correctement configurées

## Transactions (CRUD)

### API Endpoints

#### POST `/api/transactions`

Creates a new transaction for the authenticated user.

**Payload:**

```json
{
  "amount": 25.5,
  "type": "income",
  "category": "salary",
  "description": "Monthly bonus",
  "note": "Bonus",
  "currency": "EUR",
  "date": "2025-10-13"
}
```

**Success response:**

```json
{
  "success": true,
  "message": "Congrats, transaction created!",
  "transaction": { ... }
}
```

#### GET `/api/transactions`

Fetches all transactions for the authenticated user.

**Success response:**

```json
{
  "success": true,
  "transactions": [ ... ]
}
```

#### DELETE `/api/transactions/[id]`

Deletes a transaction by its ID (authentication required).

**Success response:**

```json
{ "success": true, "message": "Transaction deleted" }
```

---

### Pages & UI

- `/transactions/add`: Transaction creation form (amount, type, category, description, note, currency, date).
- `/transactions`: List of the user's transactions, sorted by descending date.

---

### Validation & Security

- All fields are validated on both frontend and backend (positive amount, valid type, no future date, etc.).
- Access to transactions is protected by NextAuth (JWT/session).

---

## Limitations & FAQ

- No password reset management (to be implemented if needed)
- No OAuth authentication (Google, GitHub...) by default, but NextAuth supports it easily
- No advanced user dashboard (transactions, charts) in this version
- Tests are basic (shell scripts); for CI/CD, add more advanced Jest/Cypress tests

---

For any questions or contributions, open an issue or pull request on the GitHub repo.
