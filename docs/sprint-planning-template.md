# 📋 Template Sprint Planning - MoneyMirror

## Structure Recommandée pour Trello/Notion

### Colonnes à Créer

1. **📚 Backlog** - User Stories en attente
2. **🚀 Sprint 1 (Auth & Setup)** - Semaine 1
3. **🔄 Sprint 2 (CRUD)** - Semaine 2  
4. **📊 Sprint 3 (Charts & UI)** - Semaine 3
5. **🧪 Sprint 4 (Tests & Deploy)** - Semaine 4
6. **⏳ In Progress** - Tâches en cours
7. **👀 Code Review** - Pull Requests
8. **✅ Done** - Terminées

---

## 📋 Cartes Détaillées (Exemples)

### Sprint 1 - Authentication & Setup

#### 🔐 Système d'Authentification (Must Have)
**Labels:** Must Have, Backend, Authentication  
**Assigné:** Vitushan  
**Due:** Fin Semaine 1

**Description:**
Implémenter le système complet d'authentification avec NextAuth.js

**Checklist:**
- [ ] Configurer NextAuth.js
- [ ] Modèle User avec Prisma  
- [ ] Hash password avec bcrypt
- [ ] Route POST /api/auth/register
- [ ] Route POST /api/auth/login
- [ ] Formulaire signup front-end
- [ ] Formulaire login front-end
- [ ] Session management
- [ ] Tests unitaires auth
- [ ] Validation Zod

**Critères d'Acceptation:**
- Utilisateur peut créer un compte
- Utilisateur peut se connecter/déconnecter
- Sessions persistantes
- Passwords hashés en DB

---

#### 🛠️ Setup Initial Projet (Must Have)
**Labels:** Must Have, Setup, Infrastructure  
**Due:** Début Semaine 1

**Checklist:**
- [ ] Initialiser Next.js 14
- [ ] Configurer Tailwind CSS
- [ ] Setup shadcn/ui  
- [ ] Configurer Prisma + PostgreSQL
- [ ] Variables d'environnement
- [ ] Structure dossiers
- [ ] ESLint + Prettier
- [ ] Jest configuration

---

### Sprint 2 - CRUD Transactions

#### 💰 CRUD Transactions Complet (Must Have)
**Labels:** Must Have, Full-Stack, Core Feature  
**Due:** Fin Semaine 2

**Description:**
Système complet de gestion des transactions avec toutes les opérations CRUD

**Checklist Backend:**
- [ ] Modèle Transaction avec Prisma
- [ ] Route POST /api/transactions
- [ ] Route GET /api/transactions (avec pagination)
- [ ] Route PUT /api/transactions/[id]
- [ ] Route DELETE /api/transactions/[id]
- [ ] Validation Zod des données
- [ ] Authorization checks
- [ ] Tests API avec Supertest

**Checklist Frontend:**
- [ ] Composant AddTransactionForm
- [ ] Composant TransactionList
- [ ] Composant EditTransactionModal
- [ ] Filtrage par catégorie
- [ ] Tri par date/montant
- [ ] Pagination
- [ ] Loading states
- [ ] Error handling

---

### Sprint 3 - Dashboard & Charts

#### 📊 Dashboard avec Graphiques (Should Have)
**Labels:** Should Have, Frontend, Data Viz  
**Due:** Fin Semaine 3

**Checklist:**
- [ ] Layout dashboard responsive
- [ ] Résumé financier (balance, revenus, dépenses)
- [ ] Graphique en camembert (dépenses par catégorie)  
- [ ] Graphique linéaire (évolution temporelle)
- [ ] Graphique en barres (comparaison mensuelle)
- [ ] Export PNG avec html2canvas
- [ ] Widgets statistiques
- [ ] Messages motivants aléatoires

---

#### 🎨 Interface Utilisateur Polish (Should Have)  
**Labels:** Should Have, UI/UX, Frontend

**Checklist:**
- [ ] Design system cohérent
- [ ] Responsive mobile/desktop
- [ ] Dark mode (optionnel)
- [ ] Animations transitions
- [ ] Icons cohérents
- [ ] Accessibility (ARIA)
- [ ] Loading skeletons

---

### Sprint 4 - Tests & Deployment

#### 🧪 Suite de Tests Complète (Must Have)
**Labels:** Must Have, Testing, Quality  
**Due:** Semaine 4

**Checklist:**
- [ ] Tests unitaires (>85% coverage)
- [ ] Tests d'intégration API  
- [ ] Tests E2E avec Cypress
- [ ] Tests de performance
- [ ] Reports automatiques
- [ ] CI/CD GitHub Actions

---

#### 🚀 Déploiement Production (Must Have)
**Labels:** Must Have, DevOps, Deployment

**Checklist:**
- [ ] Configuration Vercel
- [ ] Database PostgreSQL production
- [ ] Variables d'environnement sécurisées
- [ ] Monitoring erreurs
- [ ] Logs de production
- [ ] Backup database
- [ ] Documentation déploiement

---

## 🏷️ Système de Labels

### Par Priorité (MoSCoW)
- **🔴 Must Have** - Fonctionnalités essentielles
- **🟡 Should Have** - Important mais pas critique
- **🟢 Could Have** - Nice to have
- **⚪ Won't Have** - Hors scope MVP

### Par Type
- **🛠️ Setup** - Configuration et infrastructure  
- **🔄 Backend** - API et logique serveur
- **🎨 Frontend** - Interface utilisateur
- **🧪 Testing** - Tests et qualité
- **📚 Documentation** - Docs et guides
- **🐛 Bug** - Corrections de bugs
- **✨ Enhancement** - Améliorations

### Par Statut
- **📋 Todo** - À faire
- **⏳ In Progress** - En cours  
- **👀 Review** - En révision
- **✅ Done** - Terminé
- **🚫 Blocked** - Bloqué

---

## 📅 Timeline Exemple

**Semaine 1 (7 jours):** Auth + Setup  
**Semaine 2 (7 jours):** CRUD Transactions  
**Semaine 3 (7 jours):** Dashboard + Charts  
**Semaine 4 (7 jours):** Tests + Deploy  

**Total:** 28 jours pour MVP complet

---

## 🔗 Instructions Création Board

### Pour Trello:
1. Créer board "MoneyMirror - Sprint Planning"
2. Ajouter les 8 colonnes listées ci-dessus
3. Créer les cartes avec templates
4. Assigner les labels et dates
5. Inviter collaborateurs

### Pour Notion:
1. Créer page "MoneyMirror Project"
2. Template "Sprint Planning Database"  
3. Properties: Status, Priority, Assignee, Due Date, Sprint
4. Views: By Sprint, By Status, Calendar
5. Templates pour chaque type de carte

**URL Board Final:** `https://trello.com/b/[board-id]/moneymirror-sprints`