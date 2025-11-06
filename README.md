# MoneyMirror - Application de Gestion Financière Personnelle

![Cover image](./assets/cover.png)

> Un miroir clair de vos finances — visualisez, comprenez et décidez.

Une application web complète de gestion financière construite avec Next.js 15, React 18, Prisma ORM et MySQL.

🔗 [Voir l'application déployée](https://holbertonschool-money-mirror.vercel.app)

---

## 📸 Aperçu des Fonctionnalités

### Connexion sécurisée

![Connexion](./assets/connexion.png)

**Authentification** - Connectez-vous en toute sécurité à votre compte MoneyMirror. Vos données financières sont protégées et accessibles uniquement par vous.

---

### Tableau de bord clair

![Dashboard](./assets/dashBoard3.png)

**Tableau de bord central** - Un tableau de bord synthétique qui affiche vos soldes, tendances et alertes importantes en un coup d'œil. Idéal pour prendre des décisions rapides.

---

### Visualisations graphiques

![Graphique en ligne](./assets/ligne.png)

**Évolution dans le temps** - Suivez l'évolution de vos finances avec un graphique en ligne interactif. Visualisez les tendances de votre solde sur plusieurs mois pour mieux anticiper.

---

![Graphique en barres](./assets/courbe_graphique.png)

**Revenus vs Dépenses** - Comparez vos revenus et dépenses période par période avec un graphique en barres clair. Identifiez rapidement les périodes où vous dépensez plus que vous ne gagnez.

---

![Diagramme en camembert](./assets/cammembert.png)

**Répartition par catégorie** - Visualisez la répartition de vos dépenses par catégorie avec un diagramme en camembert coloré. Découvrez où va réellement votre argent.

---

### Ajout de transactions

![Ajout Transaction](./assets/Add3.png)

**Ajouter une transaction** - Ajoutez facilement vos revenus et dépenses en quelques clics. Interface intuitive pour enregistrer toutes vos transactions financières rapidement.

---

### Piggy Banks (Tirelires)

![Feature 2](./assets/feature2.png)

**Piggy Banks** - Créez plusieurs « tirelires » virtuelles pour vos objectifs (vacances, imprévus, cadeaux). Affectez des montants récurrents ou ponctuels, définissez des priorités et suivez la progression.

---

### Liste des transactions

![Liste des Transactions](./assets/liste_transactions.png)

**Liste des Transactions** - Consultez toutes vos transactions (revenus et dépenses) dans un tableau clair et organisé. Modifiez ou supprimez vos entrées, et visualisez en temps réel vos totaux de revenus, dépenses et solde net.

---

### Message de récompense

![Message de Récompense](./assets/message_revenu.png)

**Félicitations pour vos revenus** - Lorsque vous ajoutez un revenu, MoneyMirror vous félicite et vous encourage ! Un message positif pour célébrer chaque entrée d'argent et vous motiver à continuer sur cette lancée.

---

### Message de prudence

![Message de Prudence](./assets/messagePrudence.png)

**Alertes intelligentes** - MoneyMirror vous avertit quand vos dépenses dépassent vos revenus ou quand des comportements financiers risqués sont détectés. Restez informé pour mieux contrôler votre budget.

---

## Table des Matières

- [📸 Aperçu des Fonctionnalités](#-aperçu-des-fonctionnalités)
- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du Projet](#structure-du-projet)
- [API Documentation](#api-documentation)
- [Impact Social](#impact-social)
- [Sécurité](#sécurité)
- [Déploiement](#déploiement)
- [Auteur](#auteur)

---

## Vue d'ensemble

**MoneyMirror** est une application de gestion financière personnelle moderne avec **impact social** qui permet aux utilisateurs de :

- Créer un compte et s'authentifier de manière sécurisée
- Gérer leurs transactions financières (revenus et dépenses)
- Visualiser leurs finances via des graphiques interactifs
- **Créer des tirelires pour atteindre leurs objectifs d'épargne**
- **Bénéficier d'aide pour vaincre les addictions** (avec stratégie voyage)
- **Soutenir le projet** via donations avec transparence totale
- Recevoir des messages motivationnels à effet Barnum
- Exporter les graphiques en PNG

---

## Fonctionnalités

### Authentification

- Inscription avec validation complète
- Connexion automatique après inscription
- Connexion sécurisée avec NextAuth.js (JWT)
- Hachage des mots de passe avec bcryptjs
- Page d'accueil intelligente : redirection automatique selon l'état de connexion

### Gestion des Transactions

- CRUD complet : Créer, Lire, Modifier, Supprimer
- Types : Revenus / Dépenses
- Support multi-devises (EUR, USD, GBP, CHF, JPY, CAD, AUD)
- Support cryptomonnaies (BTC, ETH, USDT, BNB, SOL, XRP, ADA, DOGE)
- Messages motivationnels contextuels après chaque transaction :
  - Revenus : Messages de félicitations encourageants
  - Dépenses : Messages de prudence et conseils financiers
  - Modal premium avec overlay, animations, auto-close 10s
  - 15 messages uniques par type (effet Barnum)

### Système de Tirelires Innovant

- Création de tirelires illimitées avec objectifs d'épargne
- 9 catégories prédéfinies avec émojis :
  - Voyage
  - **Se libérer d'une addiction** (catégorie phare)
  - Console/Gaming
  - Voiture
  - Logement
  - Mariage
  - Formation/Études
  - Fonds d'urgence
  - Cadeau spécial
  - Autre

- **Messages motivationnels à 5 niveaux** selon progression :
  - 0-25% : Messages d'encouragement pour débuter
  - 25-50% : Messages de persévérance
  - 50-75% : Messages de félicitations
  - 75-100% : Messages de dernière ligne droite
  - 100% : Message de victoire avec confettis

- **Système de récompense psychologique**
  - Messages personnalisés par catégorie encourageant à se récompenser
  - S'affiche automatiquement quand l'objectif est atteint (≥100%)
  - Exemples concrets de récompenses adaptées à chaque objectif
  - Renforce la motivation pour le prochain objectif
  - Prévient le burnout financier

- **Innovation unique : Liaison Addiction → Voyage**
  - Quand un utilisateur crée une tirelire "Se libérer d'une addiction"
  - Le système propose automatiquement de créer une tirelire voyage liée
  - Stratégie psychologique : **Changer d'environnement pour briser le cycle**
  - Message inspirant sur le karma et le nouveau départ
  - Aide concrète pour les personnes en sevrage

- **Deux modes d'alimentation** :
  - **Manuel** : Ajout d'argent à la demande
  - **Automatique** : Pourcentage des revenus versé automatiquement

- **Barre de progression visuelle** avec pourcentage
- **Interface magnifique** avec cochon et émojis de catégories
- **Modals interactifs** pour création et ajout d'argent
- **Navigation unique** : Onglet "Piggy Bank " (en anglais pour effet curiosité)

### Dashboard Interactif

- **4 cartes de statistiques** :
  - Total Transactions (cliquable)
  - Catégories Actives
  - Solde Net (revenus - dépenses)
  - Croissance (% vs période précédente)

- **3 types de graphiques** :
  - **Ligne** : Évolution dans le temps
  - **Camembert** : Répartition par catégories (legend verticale optimisée)
  - **Barres** : Comparaison revenus vs dépenses

- **Filtres avancés** :
  - Temporels : Semaine / Mois / Année
  - Recherche par nom
  - Filtre par catégorie

- **Export PNG** : Dashboard complet ou graphique individuel
- **Section Dernières Transactions** avec actions rapides

### Page Donation & Impact Social

- **Storytelling émotionnel** du créateur (Vithushan)
- **3 types de dons** :
  - **Unique** : 5€, 10€, 25€, 50€ ou personnalisé
  - **Mensuel** : 2€/mois, 5€/mois, 10€/mois (badge "Populaire")
  - **Annuel** : 20€/an, 50€/an, 100€/an (économie de 2 mois, badge "Meilleur choix")

- **Psychologie des prix appliquée** :
  - Économies visibles sur dons annuels (-17%)
  - Badges "Populaire" / "Meilleur choix"
  - Comparaison "Au lieu de X€"

- **Déduction fiscale** :
  - **66% de déduction d'impôts** (France, article 200 du CGI)
  - Exemple concret : Don 100€ → Déduction 66€ → Coût réel 34€
  - Reçu fiscal automatique par email
  - Design professionnel avec calcul visuel

- **Message sur le karma** :
  - *"Le karma n'oublie jamais les bonnes actions. Chaque don est une graine de bonté..."*
  - Dimension spirituelle et humaine

- **Transparence totale** :
  - **15% des dons reversés aux associations** (orphelinats, maisons de retraite)
  - Exemples de versements avec dates et reçus
  - Rapport mensuel envoyé aux donateurs
  - Engagement de publication trimestrielle

- **Email de remerciement personnalisé** après chaque don
- **11 moyens de paiement** : PayPal, Carte Bancaire, USDT, Bitcoin, Ethereum, Wise, Virement, Paysafecard, PCS Mastercard, Western Union, Revolut

### Interface Utilisateur

- Design moderne et responsive (mobile, tablette, desktop)
- Tailwind CSS avec animations personnalisées
- Composants UI shadcn/ui
- Navbar avec navigation fluide
- Footer avec messages motivationnels généraux
- Messages de succès/erreur
- États de chargement
- Modales pour confirmations

### Performance

- **Coverage tests: 82-83%** (133 tests)
- Optimisations React (useMemo, useCallback)
- Lazy loading Recharts
- Code splitting automatique

---

## Technologies Utilisées

| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **Next.js** | 15.5.4 | Framework React avec SSR et App Router |
| **React** | 18 | Bibliothèque UI pour les composants |
| **Tailwind CSS** | Latest | Framework CSS utilitaire + animations personnalisées |
| **Prisma** | Latest | ORM pour MySQL avec type-safety |
| **MySQL** | 8.x | Base de données relationnelle |
| **NextAuth.js** | Latest | Authentification (sessions JWT) |
| **bcryptjs** | Latest | Hachage sécurisé des mots de passe |
| **Recharts** | Latest | Bibliothèque de graphiques React (lazy-loaded) |
| **dom-to-image-more** | Latest | Export PNG |
| **shadcn/ui** | Latest | Composants UI réutilisables |

---

## Installation

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

2 **Installer les dépendances**

```bash
npm install
```

3 **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine du projet :

```env
DATABASE_URL="mysql://username:password@localhost:3306/moneymirror"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-cle-secrete-super-longue-et-aleatoire"
```

**Important** : Générez une vraie clé secrète avec :

```bash
openssl rand -base64 32
```

4 **Créer la base de données MySQL**

```bash
mysql -u root -p
```

```sql
CREATE DATABASE moneymirror;
EXIT;
```

5 **Initialiser Prisma**

```bash
npx prisma generate
npx prisma db push
```

6 **Lancer le serveur de développement**

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
npm run build        # Build de production (Prisma + Next.js)
npm run start        # Démarrer en mode production
npm run lint         # Linter le code
npm test             # Lancer les tests
npx prisma studio    # Interface graphique Prisma
```

---

## Structure du Projet

```fr
holbertonschool-moneyMirror/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.js    # NextAuth config
│   │   │   │   ├── login/route.js            # API Login
│   │   │   │   └── register/route.js         # API Register
│   │   │   ├── dashboard/
│   │   │   │   ├── stats/route.js            # API Stats
│   │   │   │   └── charts/route.js           # API Charts
│   │   │   ├── transactions/
│   │   │   │   ├── route.js                  # API POST/GET
│   │   │   │   └── [id]/route.js             # API GET/PUT/DELETE
│   │   │   └── piggybanks/                   # NEW
│   │   │       ├── route.js                  # API POST/GET tirelires
│   │   │       └── [id]/route.js             # API PUT/DELETE tirelire
│   │   ├── dashboard/page.js                 # Dashboard
│   │   ├── login/page.js                     # Login
│   │   ├── register/page.js                  # Register
│   │   ├── donation/page.js                  # Page Donation (refonte)
│   │   ├── piggybanks/page.js                # Page Tirelires (NEW)
│   │   ├── transactions/
│   │   │   ├── page.js                       # Liste transactions
│   │   │   ├── add/page.js                   # Ajout
│   │   │   └── edit/[id]/page.js             # Édition
│   │   ├── layout.js                         # Layout principal
│   │   └── page.js                           # Homepage intelligente
│   ├── components/
│   │   ├── Navbar.js                         # Navigation (+ Tirelires )
│   │   ├── Footer.js                         # Footer
│   │   ├── MotivationalMessage.js            # Messages Barnum
│   │   ├── MotivationalModal.js              # Modal messages
│   │   └── ui/                               # shadcn/ui
│   ├── data/
│   │   ├── motivationalMessages.json         # Messages transactions
│   │   └── piggybankMessages.json            # Messages tirelires (NEW)
│   └── lib/
│       ├── prisma.js                         # Instance Prisma
│       └── utils.js                          # Utilitaires
├── prisma/
│   ├── schema.prisma                         # Schéma DB (User, Transaction, Piggybank)
│   └── seed.js                               # Script de seed
├── .env.local                                # Variables d'environnement
├── package.json                              # Dépendances
└── README.md                                 # Documentation
```

---

## API Documentation

### Tirelires (Piggybanks)

#### POST `/api/piggybanks`

Créer une nouvelle tirelire.

**Payload :**

```json
{
  "name": "Voyage au Japon",
  "category": "voyage",
  "emoji": "🌴",
  "targetAmount": 3000.00,
  "isAutomatic": true,
  "autoPercentage": 10,
  "linkedPiggybankId": null
}
```

**Réponse succès (201) :**

```json
{
  "success": true,
  "message": "Tirelire créée avec succès !",
  "piggybank": {
    "id": "clw...",
    "userId": "clw...",
    "name": "Voyage au Japon",
    "category": "voyage",
    "emoji": "🌴",
    "targetAmount": 3000.00,
    "currentAmount": 0,
    "isAutomatic": true,
    "autoPercentage": 10,
    "linkedPiggybankId": null,
    "createdAt": "2025-10-23T...",
    "updatedAt": "2025-10-23T..."
  }
}
```

---

#### GET `/api/piggybanks`

Récupérer toutes les tirelires de l'utilisateur.

**Réponse succès (200) :**

```json
{
  "success": true,
  "piggybanks": [
    {
      "id": "clw...",
      "name": "Voyage au Japon",
      "category": "voyage",
      "emoji": "🌴",
      "targetAmount": 3000.00,
      "currentAmount": 450.00,
      "isAutomatic": true,
      "autoPercentage": 10,
      ...
    }
  ]
}
```

---

#### PUT `/api/piggybanks/[id]`

Ajouter de l'argent ou modifier une tirelire.

**Payload (ajouter de l'argent) :**

```json
{
  "amountToAdd": 50.00
}
```

**Payload (modifier paramètres) :**

```json
{
  "name": "Nouveau nom",
  "targetAmount": 3500.00,
  "isAutomatic": false,
  "autoPercentage": null
}
```

---

#### DELETE `/api/piggybanks/[id]`

Supprimer une tirelire.

**Réponse succès (200) :**

```json
{
  "success": true,
  "message": "Tirelire supprimée avec succès !"
}
```

---

## Impact Social

### Aide aux Addictions

MoneyMirror propose une **approche innovante** pour aider les personnes souffrant d'addictions :

**Concept** : **Sevrage par changement d'environnement**

1. L'utilisateur crée une tirelire **"Se libérer d'une addiction"**
2. Le système propose automatiquement de créer une tirelire **"Voyage - Nouveau Départ"** liée
3. **L'argent économisé finance un voyage** loin des déclencheurs habituels
4. **Stratégie psychologique reconnue** : Changer d'environnement pour briser le cycle

**Messages motivationnels à 5 niveaux** selon progression :

- Encouragement initial
- Persévérance
- Félicitations mi-parcours
- Dernière ligne droite
- Message de victoire final

**Système de récompense psychologique** :

- À 100% de l'objectif, un message de récompense personnalisé s'affiche
- Encourage l'utilisateur à célébrer sa victoire (spa, resto, activité)
- Prévient le burnout et maintient la motivation
- Adapté à chaque catégorie (ex: voyage → guide touristique, addiction → massage)

**Ressources d'aide** :

- Drogues Info Service : 0 800 23 13 13
- Tabac Info Service : 39 89

### Transparence des Donations

**15% de chaque don** est reversé à des associations caritatives :
-Orphelinats et aide à l'enfance
-Maisons de retraite et personnes âgées

**Engagement de transparence** :

- Rapport mensuel envoyé à tous les donateurs
- Reçus des associations publiés
- Publication trimestrielle détaillée

**Message sur le karma** :
> *"Le karma n'oublie jamais les bonnes actions. Chaque don est une graine de bonté qui fleurit bien au-delà de ce que vous pouvez imaginer."*

---

## Sécurité

### Mesures de Sécurité Implémentées

1. **Hachage des Mots de Passe**
   - bcryptjs avec salt rounds = 12
   - Aucun mot de passe en clair stocké

2. **Sessions JWT**
   - Tokens signés avec `NEXTAUTH_SECRET`
   - Expiration automatique après 7 jours

3. **Validation des Données**
   - Côté client : React forms
   - Côté serveur : Vérification complète
   - Prisma : Contraintes de schéma

4. **Protection des Routes**
   - Client : `useSession()` + redirection
   - Serveur : `getServerSession()` sur toutes les API

5. **Validation des Transactions**
   - Montant > 0
   - Type 'income' ou 'expense' uniquement
   - Date <= aujourd'hui
   - Vérification ownership

6. **Validation des Tirelires**
   - Montant objectif > 0
   - Pourcentage automatique entre 1-100%
   - Vérification ownership

---

## Déploiement

### Vercel (Recommandé)

**Application déployée** : https:www//holbertonschool-money-mirror.vercel.app/

**Étapes :**

1. Connecter le dépôt GitHub à Vercel
2. Configurer les variables d'environnement
3. Vercel déploie automatiquement à chaque push sur `main`

**Base de données :**

- Utiliser **Railway**, **PlanetScale**, ou **DigitalOcean**
- Ou héberger MySQL sur un VPS

---

## Notes de Version

### v2.1.1 (2025-10-31) - Corrections Build & Favicon ✨

**Corrections Techniques :**

- Correction erreur build : séparation layout serveur/client
- Création composant ClientProviders pour SessionProvider
- Génération automatique favicon.ico depuis SVG
- Ajout favicons multi-tailles (16px, 32px, 512px)
- Apple touch icon pour iOS
- Logo SVG nettoyé (suppression duplications)

**Build & Performance :**

- Build production validé (0 erreurs)
- 18 routes générées correctement
- Optimisations Next.js 15.5.4 appliquées

### v2.1.0 (2025-10-26) - Gamification & Fiscalité 💰

**Système de Récompense Psychologique :**

- Messages de récompense personnalisés par catégorie
- Affichage automatique à 100% de l'objectif
- 9 messages uniques encourageant à se récompenser
- Prévention du burnout financier
- Design spécial avec box jaune/orange

**Déduction Fiscale :**

- Section déduction fiscale 66% (article 200 CGI)
- Calcul visuel : Don 100€ → Coût réel 34€
- Mention reçu fiscal automatique
- Design professionnel avec dégradé vert

**Mise à Jour Donation :**

- Passage de 5% à 15% reversés aux associations
- Ajout PCS Mastercard (11 moyens de paiement)
- Distinction Paysafecard vs PCS Mastercard

**Navigation Unique :**

- Onglet "Piggy Bank " (en anglais pour effet curiosité)

### v2.0.0 (2025-10-23) - Tirelires & Impact Social 💙

**Système de Tirelires Complet :**

- Base de données Prisma avec modèle Piggybank
- Routes API complètes (POST, GET, PUT, DELETE)
- Page frontend magnifique avec modals
- 9 catégories avec émojis et logos de cochon
- 50+ messages motivationnels à effet Barnum (5 niveaux par catégorie)
- **Innovation : Liaison addiction → voyage** (changement d'environnement)
- Mode manuel ET automatique (% des revenus)
- Barre de progression, animations, confettis
- Lien dans la Navbar

**Page Donation Refonte Complète :**

- 3 types de dons (Unique / Mensuel / Annuel)
- Onglets interactifs avec badges
- Psychologie des prix (économies visibles -17%)
- Section transparence avec reçus mockup
- Message sur le karma et bonnes actions
- Email de remerciement personnalisé mentionné
- 9 moyens de paiement initiaux
- Storytelling Vithushan préservé

**Impact :**

- Aide concrète pour vaincre les addictions (stratégie voyage)
- Modèle de donation éthique et transparent
- Gamification de l'épargne
- Dimension spirituelle et humaine

---

### v1.2.0 (2025-10-22) - UX Améliorée & Messages Motivationnels

**Expérience Utilisateur :**

- Page d'accueil intelligente avec redirection automatique
- Connexion automatique après inscription
- Messages motivationnels contextuels (revenus vs dépenses)
- MotivationalModal avec overlay et animations
- Effet Barnum pour engagement maximal

---

### v1.1.0 (2025-10-21) - Tests & Optimisations

**Tests :**

- Coverage 82-83% (133 tests)
- Tests E2E avec Playwright

**Performance :**

- useMemo, useCallback
- Lazy loading Recharts
- Réduction bundle ~50-70KB

---

### v1.0.0 (2025-10-20) - Release Initiale

**Fonctionnalités initiales :**

- Authentification complète
- CRUD transactions
- Dashboard avec 3 graphiques
- Export PNG
- Support multi-devises

---

## Auteur

**Vithushan Satkunanathan**

- GitHub: [@Vitushan](https://github.com/Vitushan)
- Email: vitushan@outlook.fr
- LinkedIn: [Vithushan Satkunanathan](https://linkedin.com/in/vitushan)

---

## Remerciements

- **Vithushan** pour le développement
- **Next.js Team** pour le framework incroyable
- **Prisma Team** pour l'ORM moderne
- **Recharts** pour les graphiques interactifs
- **Communauté open-source** pour les librairies utilisées

---

## Prochaines Étapes

- Notifications push
- Système d'emails (réinitialisation mot de passe)
- Export CSV/PDF des transactions
- Progressive Web App (PWA)
- Rapports mensuels automatiques
- Import de fichiers bancaires (CSV)
- Multi-langue (EN/FR)

---

**Merci d'utiliser MoneyMirror !**

*Une application de gestion financière avec impact social* 💙
