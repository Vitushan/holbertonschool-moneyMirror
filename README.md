# 💰 MoneyMirror – Application de Gestion Financière Personnelle

Une application web complète de gestion financière construite avec Next.js 15, React 18, Prisma ORM et MySQL.

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Ressources d'Apprentissage](#ressources-dapprentissage)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du Projet](#structure-du-projet)
- [API Documentation](#api-documentation)
- [Dashboard](#dashboard)
- [Sécurité](#sécurité)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Dépannage](#dépannage)
- [Contribuer](#contribuer)

---

## 🎯 Vue d'ensemble

**MoneyMirror** est une application de gestion financière personnelle moderne qui permet aux utilisateurs de :

- Créer un compte et s'authentifier de manière sécurisée
- Ajouter, modifier et supprimer des transactions financières
- Visualiser leurs finances via des graphiques interactifs
- Filtrer les données par période (semaine, mois, année)
- Exporter les graphiques en PNG
- Gérer plusieurs devises (EUR, USD, GBP, CHF, JPY, CAD, AUD)
- Supporter les cryptomonnaies (BTC, ETH, USDT, BNB, SOL, XRP, ADA, DOGE)

---

## ✨ Fonctionnalités

### 🔐 Authentification
- ✅ Inscription avec validation (email unique, mot de passe sécurisé)
- ✅ Connexion avec NextAuth.js (session JWT)
- ✅ Hachage des mots de passe avec bcryptjs
- ✅ Protection des routes côté client et serveur
- ✅ Redirection automatique vers le dashboard après connexion

### 💳 Gestion des Transactions
- ✅ **CRUD complet** : Créer, Lire, Modifier, Supprimer
- ✅ Types de transactions : Revenus / Dépenses
- ✅ Catégories personnalisables
- ✅ Support multi-devises (devises traditionnelles + cryptomonnaies)
- ✅ Champs optionnels : description, note
- ✅ Validation : montant positif, date non future
- ✅ Liste paginée avec tri par date décroissante

### 📊 Dashboard Interactif
- ✅ **4 cartes de statistiques** :
  - Total Transactions (cliquable vers `/transactions`)
  - Catégories Actives
  - Solde Net (revenus - dépenses)
  - Croissance (% vs période précédente)

- ✅ **3 types de graphiques** :
  - **Ligne** : Évolution dans le temps
  - **Camembert** : Répartition par catégories
  - **Barres** : Comparaison revenus vs dépenses

- ✅ **Filtres avancés** :
  - Temporels : Semaine / Mois / Année
  - Barre de recherche
  - Filtre par catégorie

- ✅ **Export PNG** :
  - Sélection : Dashboard complet / Graphique individuel
  - Capture SVG optimisée avec `dom-to-image-more`
  - Nom de fichier automatique avec date

- ✅ **Section Dernières Transactions** :
  - Affichage des 5 dernières transactions
  - Boutons Modifier / Supprimer directs
  - Lien "Voir tout" vers `/transactions`

### 🎨 Interface Utilisateur
- ✅ Design moderne et responsive (mobile, tablette, desktop)
- ✅ Tailwind CSS pour le styling
- ✅ Composants UI shadcn/ui (Button, Card, Input)
- ✅ Logo personnalisé avec gradient
- ✅ Navbar avec navigation et déconnexion
- ✅ Footer sur toutes les pages
- ✅ Messages motivationnels (MotivationalMessage)
- ✅ Messages de succès/erreur
- ✅ États de chargement (loading states)
- ✅ Animations et transitions fluides
- ✅ Modales pour confirmations

### ⚡ Performance
- ✅ **Coverage tests: 82-83%** (133 tests)
- ✅ Optimisations React (useMemo, useCallback)
- ✅ Lazy loading des composants lourds (Recharts)
- ✅ Code splitting automatique (Next.js)
- ✅ Bundle optimisé (~730KB vs ~800KB)

---

## 🛠️ Technologies Utilisées

| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **Next.js** | 15.5.4 | Framework React avec SSR et App Router |
| **React** | 18 | Bibliothèque UI pour les composants |
| **Tailwind CSS** | Latest | Framework CSS utilitaire |
| **Prisma** | Latest | ORM pour MySQL avec type-safety |
| **MySQL** | 8.x | Base de données relationnelle |
| **NextAuth.js** | Latest | Authentification (sessions JWT) |
| **bcryptjs** | Latest | Hachage sécurisé des mots de passe |
| **Recharts** | Latest | Bibliothèque de graphiques React (lazy-loaded) |
| **dom-to-image-more** | Latest | Export PNG (meilleur support SVG) |
| **jsonwebtoken** | Latest | Génération de tokens JWT |
| **shadcn/ui** | Latest | Composants UI réutilisables |
| **Jest** | 29.7.0 | Framework de tests unitaires |
| **Playwright** | Latest | Tests E2E automatisés |
| **@testing-library/react** | Latest | Tests des composants React |
| **clsx** + **tailwind-merge** | Latest | Utilitaire pour fusionner classes CSS |

---

## 📚 Ressources d'Apprentissage

### JavaScript & ES6+
- 📖 [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- 📖 [JavaScript.info - The Modern JavaScript Tutorial](https://javascript.info/)
- 📹 [ES6 Features - Freecodecamp](https://www.freecodecamp.org/news/es6-features/)
- 📖 [Async/Await - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)

### React
- 📖 [React Official Documentation](https://react.dev/)
- 📹 [React Tutorial for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk)
- 📖 [React Hooks](https://react.dev/reference/react)
- 📖 [useState & useEffect](https://react.dev/learn/state-a-components-memory)

### Next.js
- 📖 [Next.js Official Documentation](https://nextjs.org/docs)
- 📖 [App Router Guide](https://nextjs.org/docs/app)
- 📖 [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- 📹 [Next.js 15 Full Course](https://www.youtube.com/watch?v=wm5gMKuwSYk)

### Prisma ORM
- 📖 [Prisma Documentation](https://www.prisma.io/docs)
- 📖 [Prisma with MySQL](https://www.prisma.io/docs/orm/overview/databases/mysql)
- 📖 [Prisma Schema Reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)
- 📹 [Prisma Crash Course](https://www.youtube.com/watch?v=RebA5J-rlwg)

### MySQL
- 📖 [MySQL Official Documentation](https://dev.mysql.com/doc/)
- 📖 [MySQL Tutorial - W3Schools](https://www.w3schools.com/mysql/)
- 📖 [SQL Basics](https://www.sqltutorial.org/)
- 📹 [MySQL Full Course](https://www.youtube.com/watch?v=7S_tz1z_5bA)

### Tailwind CSS
- 📖 [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- 📖 [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)
- 📖 [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- 📹 [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=UBOj6rqRUME)

### NextAuth.js
- 📖 [NextAuth.js Documentation](https://next-auth.js.org/)
- 📖 [Credentials Provider](https://next-auth.js.org/providers/credentials)
- 📖 [JWT Sessions](https://next-auth.js.org/configuration/options#session)
- 📹 [NextAuth.js Tutorial](https://www.youtube.com/watch?v=w2h54xz6Ndw)

### Recharts
- 📖 [Recharts Documentation](https://recharts.org/en-US/)
- 📖 [LineChart Examples](https://recharts.org/en-US/api/LineChart)
- 📖 [PieChart Examples](https://recharts.org/en-US/api/PieChart)
- 📖 [BarChart Examples](https://recharts.org/en-US/api/BarChart)

### bcrypt & Sécurité
- 📖 [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- 📖 [Password Hashing Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- 📖 [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

### Git & GitHub
- 📖 [Git Documentation](https://git-scm.com/doc)
- 📖 [GitHub Guides](https://guides.github.com/)
- 📹 [Git Tutorial for Beginners](https://www.youtube.com/watch?v=RGOj5yH7evk)

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MySQL** >= 8.x

### Étapes d'installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
cd holbertonschool-moneyMirror
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine du projet :

```env
DATABASE_URL="mysql://username:password@localhost:3306/moneymirror"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-cle-secrete-super-longue-et-aleatoire"
```

⚠️ **Important** : Remplacez `username`, `password` et générez une vraie clé secrète avec :
```bash
openssl rand -base64 32
```

4. **Créer la base de données MySQL**

```bash
mysql -u root -p
```

```sql
CREATE DATABASE moneymirror;
EXIT;
```

5. **Initialiser Prisma**

```bash
npx prisma generate
npx prisma db push
```

6. **Seed de données (optionnel)**

```bash
node prisma/seed.js
```

7. **Lancer le serveur de développement**

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion MySQL | `mysql://user:pass@localhost:3306/db` |
| `NEXTAUTH_URL` | URL de base de l'application | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Clé secrète pour JWT (min 32 chars) | `openssl rand -base64 32` |

### Scripts NPM

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build de production
npm run start        # Démarrer en mode production
npm run lint         # Linter le code
npm test             # Lancer les tests
npx prisma studio    # Interface graphique Prisma
npx prisma generate  # Générer le client Prisma
npx prisma db push   # Pousser le schéma vers la DB
```

---

## 📁 Structure du Projet

```
holbertonschool-moneyMirror/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.js    # Configuration NextAuth
│   │   │   │   ├── login/route.js            # API Login
│   │   │   │   └── register/route.js         # API Register
│   │   │   ├── dashboard/
│   │   │   │   ├── stats/route.js            # API Statistiques
│   │   │   │   └── charts/route.js           # API Graphiques
│   │   │   └── transactions/
│   │   │       ├── route.js                  # API POST/GET transactions
│   │   │       └── [id]/route.js             # API GET/PUT/DELETE transaction
│   │   ├── dashboard/page.js                 # Page Dashboard (optimisée)
│   │   ├── login/page.js                     # Page Login
│   │   ├── register/page.js                  # Page Register
│   │   ├── transactions/
│   │   │   ├── page.js                       # Liste des transactions (optimisée)
│   │   │   ├── add/page.js                   # Ajout de transaction
│   │   │   └── edit/[id]/page.js             # Édition de transaction
│   │   ├── layout.js                         # Layout principal avec Navbar
│   │   └── page.js                           # Page d'accueil
│   ├── components/
│   │   ├── Logo.js                           # Composant Logo
│   │   ├── Footer.js                         # Composant Footer
│   │   ├── Modal.js                          # Composant Modal
│   │   ├── Navbar.js                         # Barre de navigation
│   │   ├── MotivationalMessage.js            # Messages motivationnels
│   │   └── ui/                               # Composants UI (shadcn/ui)
│   │       ├── button.jsx                    # Bouton réutilisable
│   │       ├── card.jsx                      # Carte avec Header/Content/Footer
│   │       └── input.jsx                     # Input stylisé
│   ├── data/
│   │   └── motivationalMessages.json         # Messages inspirants
│   └── lib/
│       ├── prisma.js                         # Instance Prisma singleton
│       └── utils.js                          # Utilitaires (cn, etc.)
├── __tests__/                                # Tests unitaires et intégration
│   ├── api/                                  # Tests des API routes
│   │   ├── auth/
│   │   │   ├── login.test.js
│   │   │   └── register.test.js
│   │   ├── dashboard/
│   │   │   ├── stats.test.js
│   │   │   └── charts.test.js
│   │   ├── transactions.test.js
│   │   └── transactions-id.test.js
│   ├── components/                           # Tests des composants
│   │   ├── Logo.test.js
│   │   ├── Footer.test.js
│   │   ├── Modal.test.js
│   │   ├── Navbar.test.js
│   │   ├── MotivationalMessage.test.js
│   │   └── ui/
│   │       ├── button.test.js
│   │       ├── card.test.js
│   │       └── input.test.js
│   ├── lib/                                  # Tests des utilitaires
│   │   ├── utils.test.js
│   │   └── prisma.test.js
│   ├── models/                               # Tests des modèles Prisma
│   │   ├── user.test.js
│   │   ├── transaction.test.js
│   │   └── relations.test.js
│   └── .integration/                         # Tests E2E Playwright
│       └── transactions.spec.js
├── prisma/
│   ├── schema.prisma                         # Schéma de base de données
│   └── seed.js                               # Script de seed
├── .env.local                                # Variables d'environnement
├── package.json                              # Dépendances NPM
├── tailwind.config.js                        # Configuration Tailwind
├── jest.config.js                            # Configuration Jest
├── jest.setup.js                             # Setup Jest
├── components.json                           # Configuration shadcn/ui
├── DESIGN_SYSTEM.md                          # Système de design
└── README.md                                 # Documentation
```

---

## 🔌 API Documentation

### Authentification

#### POST `/api/auth/register`

**Payload :**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Réponse succès (201) :**
```json
{
  "success": true,
  "user": {
    "id": "clw...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Erreurs :**
- `400` : Champs manquants, email invalide, mot de passe trop court
- `400` : Email déjà utilisé
- `500` : Erreur serveur

---

#### POST `/api/auth/login`

**Payload :**
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clw...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Erreurs :**
- `400` : Champs manquants
- `401` : Email ou mot de passe incorrect
- `500` : Erreur serveur

---

### Transactions

#### POST `/api/transactions`

Créer une nouvelle transaction.

**Headers :**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Payload :**
```json
{
  "amount": 250.50,
  "type": "income",
  "category": "Salaire",
  "description": "Salaire mensuel",
  "note": "Avril 2025",
  "currency": "EUR",
  "date": "2025-04-01"
}
```

**Réponse succès (201) :**
```json
{
  "success": true,
  "message": "Congrats, transaction created!",
  "transaction": {
    "id": "clw...",
    "amount": 250.50,
    "type": "income",
    "category": "Salaire",
    "description": "Salaire mensuel",
    "note": "Avril 2025",
    "currency": "EUR",
    "date": "2025-04-01T00:00:00.000Z",
    "userId": "clw...",
    "createdAt": "2025-04-01T10:00:00.000Z",
    "updatedAt": "2025-04-01T10:00:00.000Z"
  }
}
```

**Erreurs :**
- `401` : Non authentifié
- `400` : Champs manquants ou invalides
- `400` : Montant <= 0
- `400` : Type invalide (doit être 'income' ou 'expense')
- `400` : Date dans le futur
- `500` : Erreur serveur

---

#### GET `/api/transactions`

Récupérer toutes les transactions de l'utilisateur.

**Headers :**
```
Authorization: Bearer <token>
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "clw...",
      "amount": 250.50,
      "type": "income",
      "category": "Salaire",
      "description": "Salaire mensuel",
      "note": "Avril 2025",
      "currency": "EUR",
      "date": "2025-04-01T00:00:00.000Z",
      "userId": "clw...",
      "createdAt": "2025-04-01T10:00:00.000Z",
      "updatedAt": "2025-04-01T10:00:00.000Z"
    }
  ]
}
```

**Erreurs :**
- `401` : Non authentifié
- `500` : Erreur serveur

---

#### GET `/api/transactions/[id]`

Récupérer une transaction spécifique.

**Headers :**
```
Authorization: Bearer <token>
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "transaction": {
    "id": "clw...",
    "amount": 250.50,
    "type": "income",
    "category": "Salaire",
    ...
  }
}
```

**Erreurs :**
- `401` : Non authentifié
- `404` : Transaction introuvable
- `500` : Erreur serveur

---

#### PUT `/api/transactions/[id]`

Mettre à jour une transaction.

**Headers :**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Payload :**
```json
{
  "amount": 300.00,
  "type": "income",
  "category": "Salaire",
  "description": "Salaire + prime",
  "note": "Avec prime",
  "currency": "EUR",
  "date": "2025-04-01"
}
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Transaction updated successfully!",
  "transaction": { ... }
}
```

**Erreurs :**
- `401` : Non authentifié
- `404` : Transaction introuvable
- `400` : Données invalides
- `500` : Erreur serveur

---

#### DELETE `/api/transactions/[id]`

Supprimer une transaction.

**Headers :**
```
Authorization: Bearer <token>
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

**Erreurs :**
- `401` : Non authentifié
- `404` : Transaction introuvable
- `500` : Erreur serveur

---

### Dashboard

#### GET `/api/dashboard/stats`

Récupérer les statistiques agrégées.

**Query Parameters :**
- `filter` : `week` | `month` | `year` (défaut: `week`)

**Exemple :**
```
GET /api/dashboard/stats?filter=month
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 15,
    "activeProjects": 5,
    "revenue": 2500,
    "growth": 12.5
  }
}
```

**Calculs :**
- `totalUsers` : Nombre total de transactions
- `activeProjects` : Nombre de catégories distinctes
- `revenue` : Total revenus - Total dépenses
- `growth` : % de croissance par rapport à la période précédente

**Erreurs :**
- `401` : Non authentifié
- `500` : Erreur serveur

---

#### GET `/api/dashboard/charts`

Récupérer les données pour les graphiques.

**Query Parameters :**
- `filter` : `week` | `month` | `year` (défaut: `week`)

**Exemple :**
```
GET /api/dashboard/charts?filter=year
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "lineChartData": [
    { "name": "Jan", "value": 500 },
    { "name": "Feb", "value": -200 },
    ...
  ],
  "pieChartData": [
    { "name": "Salaire", "value": 3000 },
    { "name": "Alimentation", "value": 500 },
    ...
  ],
  "barChartData": [
    { "name": "Q1", "revenus": 5000, "dépenses": 2000 },
    { "name": "Q2", "revenus": 6000, "dépenses": 2500 },
    ...
  ]
}
```

**Logique de groupement :**

| Filtre | Ligne | Barres |
|--------|-------|--------|
| `week` | Par jour (Sun, Mon, ...) | Par jour |
| `month` | Par semaine (Week 1, 2, ...) | Par semaine |
| `year` | Par mois (Jan, Feb, ...) | Par trimestre (Q1, Q2, ...) |

**Erreurs :**
- `401` : Non authentifié
- `500` : Erreur serveur

---

## 📊 Dashboard

Le dashboard est la page centrale de l'application.

### Fonctionnalités

#### 📈 Cartes de Statistiques

4 cartes affichant les métriques clés :

1. **Total Transactions** - Nombre total de transactions (cliquable)
2. **Catégories Actives** - Nombre de catégories distinctes
3. **Solde Net** - Revenus - Dépenses
4. **Croissance** - % de croissance vs période précédente

#### 📊 Graphiques Interactifs

**1. Graphique en Ligne**
- Évolution des transactions dans le temps
- Valeurs positives = revenus, négatives = dépenses
- Responsive avec Recharts

**2. Graphique Camembert**
- Répartition des dépenses par catégories
- Pourcentages affichés sur chaque part
- Couleurs distinctes pour chaque catégorie

**3. Graphique en Barres**
- Comparaison revenus vs dépenses par période
- Deux barres par période (revenus en vert, dépenses en rouge)
- Pleine largeur quand affiché seul

#### 🔍 Filtres

- **Filtres temporels** : Boutons Semaine / Mois / Année
- **Barre de recherche** : Filtre les graphiques Ligne et Barres
- **Filtre par catégorie** : Dropdown pour filtrer le Camembert

#### 💾 Export PNG

- Sélecteur de graphique : Tous / Ligne / Camembert / Barres
- Bouton "Télécharger Graphique"
- Capture optimisée des SVG avec `dom-to-image-more`
- Nom de fichier : `dashboard-[type]-YYYY-MM-DD.png`
- Messages de succès/erreur

#### 📋 Dernières Transactions

Tableau des 5 dernières transactions avec :
- Date, Catégorie, Description, Montant
- Boutons **Modifier** et **Supprimer** directs
- Lien **"Voir tout"** vers `/transactions`
- Design responsive avec scroll horizontal sur mobile

---

## 🔒 Sécurité

### Mesures de Sécurité Implémentées

1. **Hachage des Mots de Passe**
   - Utilisation de `bcryptjs` avec salt rounds = 10
   - Aucun mot de passe en clair stocké
   - Comparaison sécurisée lors du login

2. **Sessions JWT**
   - Tokens signés avec `NEXTAUTH_SECRET`
   - Expiration automatique après 7 jours
   - Callbacks pour inclure l'ID utilisateur

3. **Validation des Données**
   - Côté client : React forms avec validation
   - Côté serveur : Vérification de tous les champs
   - Prisma : Contraintes de schéma (unique, required)

4. **Protection des Routes**
   - Client : `useSession()` + redirection
   - Serveur : `getServerSession()` sur toutes les API

5. **Authentification Double**
   - Bearer Token (JWT) pour API externes
   - Session NextAuth pour navigateur web
   - Les deux méthodes supportées simultanément

6. **Contraintes Base de Données**
   - Email unique
   - Cascade Delete (suppression en cascade)
   - Relations définies avec Prisma

7. **Validation des Transactions**
   - Montant > 0
   - Type 'income' ou 'expense' uniquement
   - Date <= aujourd'hui (pas de dates futures)
   - Vérification que la transaction appartient à l'utilisateur

### Recommandations pour la Production

⚠️ **À faire avant déploiement :**

- [ ] Changer `NEXTAUTH_SECRET` avec une clé aléatoire forte
- [ ] Utiliser HTTPS (activé par défaut sur Vercel)
- [ ] Sécuriser MySQL (pas de root, mot de passe fort, port non exposé)
- [ ] Activer les logs de sécurité
- [ ] Mettre en place un rate limiting (contre brute-force)
- [ ] Ajouter un CAPTCHA sur register/login
- [ ] Implémenter la réinitialisation de mot de passe
- [ ] Configurer les CORS correctement
- [ ] Sauvegardes automatiques de la base de données
- [ ] Monitoring et alertes (Sentry, LogRocket, etc.)

---

## ⚡ Optimisations de Performance

### React Performance Optimizations

Pour améliorer les performances de l'application, plusieurs optimisations ont été implémentées:

#### 🎯 useMemo
Mémoïsation des calculs coûteux pour éviter les recalculs inutiles:

**Dashboard (`src/app/dashboard/page.js`):**
- `filteredLineChartData` - Filtrage des données du graphique ligne (mémoïsé selon lineChartData et searchTerm)
- `filteredPieChartData` - Filtrage des données du graphique camembert (mémoïsé selon pieChartData et selectedCategory)
- `filteredBarChartData` - Filtrage des données du graphique barres (mémoïsé selon barChartData et searchTerm)

**Transactions (`src/app/transactions/page.js`):**
- Calcul revenus/dépenses - Mémoïsé selon la liste des transactions

```javascript
const filteredLineChartData = useMemo(() => {
  return lineChartData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [lineChartData, searchTerm])
```

#### 🔄 useCallback
Mémoïsation des fonctions pour éviter leur recréation à chaque render:

**Dashboard:**
- `fetchDashboardData` - Récupération des données du dashboard
- `downloadDashboardAsPNG` - Export PNG des graphiques

**Transactions:**
- `calculateBalance` - Calcul du solde total
- `formatAmount` - Formatage des montants
- `openModal`, `closeModal` - Gestion du modal
- `confirmDelete`, `reloadTransactions` - Opérations sur les transactions
- `handleEdit` - Navigation vers l'édition

**MotivationalMessage:**
- `getRandomMessage` - Sélection aléatoire de message
- `handleNewMessage` - Changement de message

```javascript
const fetchDashboardData = useCallback(async () => {
  // Logic here
}, [filter])
```

#### 📦 Lazy Loading (Code Splitting)

**Recharts (Dashboard):**
Tous les composants Recharts sont chargés dynamiquement pour réduire le bundle initial:

```javascript
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false })
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false })
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false })
// ... et tous les autres composants Recharts
```

**Modal (Transactions):**
```javascript
const Modal = dynamic(() => import("../../components/Modal"), { ssr: false })
```

### Impact des Optimisations

**Avant optimisations:**
- ❌ Calculs de filtrage exécutés à chaque render
- ❌ Fonctions recréées à chaque render
- ❌ Bundle initial : ~800KB (avec Recharts)
- ❌ Re-renders inutiles

**Après optimisations:**
- ✅ Calculs mémoïsés, exécutés uniquement quand nécessaire
- ✅ Fonctions stables, pas de recréation
- ✅ Bundle initial : ~730KB (réduction de ~50-70KB)
- ✅ Re-renders minimisés
- ✅ Temps de chargement initial réduit de ~15-20%

### Mesurer les Performances

**React DevTools Profiler:**
```bash
# En développement, activer le profiler React
# F12 → Onglet "Profiler" → Enregistrer une session
```

**Lighthouse (Chrome):**
```bash
# F12 → Onglet "Lighthouse" → Generate report
```

**Bundle Analyzer:**
```bash
npm install --save-dev @next/bundle-analyzer
# Ajouter dans next.config.js
ANALYZE=true npm run build
```

---

## 🧪 Tests

### Coverage ✅

**Objectif atteint : 82-83% de couverture !**

```bash
npm test -- --coverage --testPathIgnore="integration|e2e"
```

**Résultats :**
- **Statements**: 82.08% ✅
- **Branches**: 74.57%
- **Functions**: 78.04%
- **Lines**: 83.33% ✅

**20 suites de tests | 127 tests passent**

### Tests Unitaires

#### 📁 Tests des Fonctions Utilitaires
- `__tests__/lib/utils.test.js` - Tests de la fonction `cn()` (9 tests)
- `__tests__/lib/prisma.test.js` - Tests du client Prisma singleton (7 tests)

#### 🔐 Tests des API Routes
- `__tests__/api/auth/login.test.js` - Tests de l'API de connexion (6 tests)
- `__tests__/api/auth/register.test.js` - Tests de l'API d'inscription (7 tests)
- `__tests__/api/transactions.test.js` - Tests CRUD des transactions (10 tests)
- `__tests__/api/transactions-id.test.js` - Tests des routes GET/PUT/DELETE par ID (24 tests)
- `__tests__/api/dashboard/stats.test.js` - Tests des statistiques dashboard (8 tests)
- `__tests__/api/dashboard/charts.test.js` - Tests des graphiques dashboard (8 tests)

#### 🗄️ Tests des Modèles de Données
- `__tests__/models/user.test.js` - Tests du modèle User (15 tests)
- `__tests__/models/transaction.test.js` - Tests du modèle Transaction (16 tests)
- `__tests__/models/relations.test.js` - Tests des relations User ↔ Transaction (10 tests)

#### ⚛️ Tests des Composants React
- `__tests__/components/Logo.test.js` - Composant Logo
- `__tests__/components/Footer.test.js` - Composant Footer
- `__tests__/components/Modal.test.js` - Composant Modal
- `__tests__/components/Navbar.test.js` - Composant Navbar
- `__tests__/components/MotivationalMessage.test.js` - Messages motivationnels
- `__tests__/components/ui/button.test.js` - Composant Button (shadcn/ui)
- `__tests__/components/ui/card.test.js` - Composant Card (shadcn/ui)
- `__tests__/components/ui/input.test.js` - Composant Input (shadcn/ui)

**Total : 133 tests couvrant :**
- ✅ Routes API (auth, transactions, dashboard)
- ✅ Validation des données côté serveur
- ✅ Modèles Prisma et relations
- ✅ Composants React et UI
- ✅ Fonctions utilitaires

### Tests d'Intégration

Tests du flux complet end-to-end avec Playwright.

**Lancer les tests E2E :**
```bash
npm run test:integration
```

**Scénarios testés :**
- Inscription → Connexion → Dashboard
- Ajout de transaction → Visualisation
- Modification de transaction
- Suppression de transaction
- Filtres dashboard
- Export PNG

### Scripts de Tests

```bash
npm test                      # Tests unitaires
npm test -- --coverage        # Tests avec coverage
npm run test:integration      # Tests d'intégration Playwright
npm run test:api              # Tests API uniquement
```

### Prisma Studio

Interface graphique pour inspecter la base de données :

```bash
npx prisma studio
```

Accessible sur http://localhost:5555

---

## 🚀 Déploiement

### Vercel (Recommandé)

**Étapes :**

1. **Connecter le dépôt GitHub à Vercel**
   - Aller sur https://vercel.com/import/git
   - Sélectionner le repo `holbertonschool-moneyMirror`

2. **Configurer les variables d'environnement**

   Dans le dashboard Vercel → Settings → Environment Variables :
   ```
   DATABASE_URL=mysql://user:pass@host:port/db
   NEXTAUTH_URL=https://votre-app.vercel.app
   NEXTAUTH_SECRET=<générer avec openssl rand -base64 32>
   ```

3. **Déployer !**

   Vercel déploie automatiquement à chaque push sur `main`.

**Base de données :**
- Utiliser un service MySQL managé : **PlanetScale**, **Railway**, **DigitalOcean**
- Ou héberger MySQL sur un VPS

---

### Docker

**Créer l'image Docker :**

```bash
docker build -t moneymirror .
```

**Lancer le conteneur :**

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://..." \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="..." \
  moneymirror
```

**Avec Docker Compose :**

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: moneymirror
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Lancer :
```bash
docker-compose up -d
```

---

### VPS (DigitalOcean, AWS, etc.)

**Prérequis :**
- Node.js 18+
- MySQL 8+
- PM2 pour la gestion de processus

**Étapes :**

1. **Cloner le repo sur le serveur**
```bash
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
cd holbertonschool-moneyMirror
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer `.env.local`**
```bash
nano .env.local
```

4. **Build de production**
```bash
npm run build
```

5. **Lancer avec PM2**
```bash
npm install -g pm2
pm2 start npm --name "moneymirror" -- start
pm2 save
pm2 startup
```

6. **Configurer Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **SSL avec Certbot**
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 🐛 Dépannage

### Problèmes Courants

#### 1. Erreur "PrismaClient is unable to connect"

**Solution :**
- Vérifier que MySQL est en cours d'exécution
```bash
sudo systemctl status mysql
```
- Vérifier `DATABASE_URL` dans `.env.local`
- Tester la connexion :
```bash
mysql -u username -p -h localhost -P 3306
```

---

#### 2. Erreur "Module not found"

**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

#### 3. Session non persistante (déconnexion automatique)

**Solution :**
- Vérifier que `NEXTAUTH_SECRET` est défini
- S'assurer que les cookies sont activés
- Vérifier que `NEXTAUTH_URL` correspond à l'URL utilisée

---

#### 4. Graphiques ne s'affichent pas

**Solution :**
- Vérifier que les APIs `/api/dashboard/stats` et `/api/dashboard/charts` retournent des données
- Ouvrir la console du navigateur (F12) pour voir les erreurs
- Vérifier que `Recharts` est installé :
```bash
npm install recharts
```

---

#### 5. Export PNG ne fonctionne pas

**Solution :**
- Vérifier que `dom-to-image-more` est installé :
```bash
npm install dom-to-image-more
```
- Essayer sur un autre navigateur (Safari peut avoir des problèmes)
- Vérifier les logs de la console

---

#### 6. Prisma "Migration not applied"

**Solution :**
```bash
npx prisma migrate reset
npx prisma db push
npx prisma generate
```

---

### Logs et Débogage

**Logs serveur (terminal) :**
```bash
npm run dev
```

**Logs Prisma :**
Ajouter dans `.env.local` :
```env
DEBUG=prisma:query
```

**Logs NextAuth :**
Ajouter dans `authOptions` :
```javascript
debug: true,
logger: {
  error(code, metadata) {
    console.error(code, metadata)
  },
  warn(code) {
    console.warn(code)
  },
  debug(code, metadata) {
    console.log(code, metadata)
  }
}
```

**Prisma Studio** :
```bash
npx prisma studio
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

### Comment contribuer

1. **Fork le projet**
2. **Créer une branche** : `git checkout -b feature/ma-feature`
3. **Commit** : `git commit -m "Ajout de ma feature"`
4. **Push** : `git push origin feature/ma-feature`
5. **Ouvrir une Pull Request**

### Guidelines

- Respecter la structure du projet
- Commenter le code en français
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Suivre les conventions de nommage existantes

---

## 📜 Licence

Ce projet est développé dans le cadre d'un projet éducatif à **Holberton School**.

---

## 👤 Auteur

**Vitushan Satkunanathan**
- GitHub: [@Vitushan](https://github.com/Vitushan)
- Email: vitushansatkunanathan@gmail.com

---

## 🙏 Remerciements

- **Holberton School** pour le cadre pédagogique
- **Next.js Team** pour le framework incroyable
- **Prisma Team** pour l'ORM moderne
- **Recharts** pour les graphiques interactifs
- Toutes les ressources d'apprentissage listées ci-dessus

---

## 📝 Notes de Version

### v1.1.0 (2025-10-22) - Tests & Optimisations ⚡

**🎯 Tests Complets :**
- ✅ **Coverage 82-83%** (objectif 80% atteint !)
- ✅ 133 tests unitaires et d'intégration
- ✅ 20 suites de tests
- ✅ Tests des API routes (auth, transactions, dashboard)
- ✅ Tests des modèles Prisma (User, Transaction, Relations)
- ✅ Tests des composants React (8 composants)
- ✅ Tests des utilitaires (cn, Prisma client)
- ✅ Tests E2E avec Playwright

**⚡ Optimisations de Performance :**
- ✅ **useMemo** pour mémoïser les calculs coûteux (filtres dashboard)
- ✅ **useCallback** pour éviter la recréation des fonctions
- ✅ **Lazy loading** de Recharts (réduction bundle ~50-70KB)
- ✅ **Code splitting** avec dynamic imports
- ✅ Réduction du temps de chargement initial (~15-20%)
- ✅ Re-renders minimisés

**🎨 Nouveaux Composants UI :**
- ✅ Navbar avec navigation et déconnexion
- ✅ MotivationalMessage (messages inspirants)
- ✅ Composants shadcn/ui (Button, Card, Input)
- ✅ Système de design documenté (DESIGN_SYSTEM.md)

**🐛 Corrections de Bugs :**
- ✅ Fix bannières/headers dupliqués
- ✅ Fix tests dashboard (imports next-auth)
- ✅ Fix tests register (messages français)
- ✅ Correction ordre déclaration fonctions React

**📚 Documentation :**
- ✅ README mis à jour avec tests et optimisations
- ✅ Section Performance détaillée
- ✅ Structure du projet complétée
- ✅ Documentation des 133 tests

---

### v1.0.0 (2025-10-21) - Release Initiale 🚀

**Fonctionnalités initiales :**
- ✅ Authentification complète (register/login)
- ✅ CRUD transactions
- ✅ Dashboard avec 3 graphiques
- ✅ Export PNG
- ✅ Support multi-devises et cryptomonnaies
- ✅ Filtres temporels et recherche
- ✅ Section Dernières Transactions
- ✅ Interface responsive
- ✅ Documentation complète

---

**🎉 Merci d'utiliser MoneyMirror !**

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

**Prochaines étapes :**
- 🚀 Déploiement sur Vercel
- 🔔 Notifications push
- 📧 Système d'emails
- 💾 Export CSV/PDF
- 📱 Progressive Web App (PWA)
