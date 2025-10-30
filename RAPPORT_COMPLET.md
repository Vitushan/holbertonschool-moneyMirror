# Rapport de Projet - MoneyMirror
## Application de Gestion des Finances Personnelles

**Étudiant:** Vitushan Satkunanathan
**Formation:** Holberton School
**Période:** Octobre - Janvier 2025
**Technologies:** Next.js, React, MySQL, Prisma

---

## Introduction

Pour mon projet de fin de formation, j'ai choisi de développer MoneyMirror, une application web qui aide à gérer ses finances personnelles. L'idée m'est venue parce que personnellement, j'avais du mal à suivre mes dépenses et à savoir où partait mon argent chaque mois. J'ai pensé que créer une application pourrait non seulement résoudre mon propre problème, mais aussi me permettre de mettre en pratique tout ce que j'ai appris à Holberton.

Le but de MoneyMirror, c'est simple : permettre à quelqu'un de créer un compte, ajouter ses transactions (revenus et dépenses), et voir tout ça sous forme de graphiques pour mieux comprendre ses habitudes financières.

---

## Vue d'ensemble du projet

### Qu'est-ce que j'ai construit ?

MoneyMirror est une application full-stack qui permet de :
- S'inscrire et se connecter de manière sécurisée
- Ajouter, modifier et supprimer des transactions
- Voir un tableau de bord avec des statistiques et des graphiques
- Exporter les graphiques en images PNG
- Gérer différentes devises (euros, dollars, même des cryptos)

J'ai voulu que l'interface soit simple et claire, sans trop de fonctionnalités compliquées qui pourraient perdre l'utilisateur.

### Pourquoi ces technologies ?

J'ai choisi **Next.js** parce que ça combine React (pour le frontend) et Node.js (pour le backend) dans un seul framework. Ça m'a évité d'avoir à configurer deux projets séparés. En plus, Next.js a plein d'optimisations déjà intégrées.

Pour la base de données, j'ai pris **MySQL** avec **Prisma**. Prisma, c'est vraiment pratique parce qu'on écrit pas directement du SQL, on utilise du JavaScript et Prisma se charge de transformer ça en requêtes SQL. Ça aide aussi à éviter les erreurs.

Pour le style, j'ai utilisé **Tailwind CSS**. Au début j'étais sceptique sur le concept de classes utilitaires partout dans le HTML, mais finalement ça va super vite et c'est très flexible.

---

## Architecture technique

### Comment tout est organisé

Le projet suit l'architecture de Next.js avec le App Router (la nouvelle version) :

```
holbertonschool-moneyMirror/
├── src/
│   ├── app/
│   │   ├── api/               ← Backend (mes API)
│   │   ├── dashboard/         ← Page tableau de bord
│   │   ├── transactions/      ← Pages pour gérer les transactions
│   │   ├── login/            ← Page de connexion
│   │   └── register/         ← Page d'inscription
│   ├── components/           ← Composants réutilisables
│   └── lib/                  ← Code utilitaire
├── prisma/                   ← Schéma de base de données
└── __tests__/                ← Tests
```

J'ai essayé de bien séparer les choses. Tout ce qui est interface utilisateur est dans les composants React, et toute la logique métier est dans les API routes.

### Comment ça marche concrètement

Prenons l'exemple d'un utilisateur qui ajoute une transaction :

1. Il remplit le formulaire sur la page (montant, type, catégorie)
2. Quand il clique sur "Ajouter", le frontend envoie une requête POST à mon API
3. L'API vérifie que l'utilisateur est bien connecté
4. Elle valide les données (montant positif, date valide, etc.)
5. Si tout est bon, elle enregistre la transaction en base de données
6. Elle renvoie une confirmation au frontend
7. La page se recharge avec la nouvelle transaction

C'est un flow assez classique, mais j'ai dû faire attention à bien tout valider pour éviter les problèmes de sécurité.

---

## Fonctionnalités développées

### 1. Authentification

C'était une des parties les plus importantes du projet. Il fallait absolument que ce soit sécurisé.

**Pour l'inscription :**
- Je vérifie que l'email n'est pas déjà utilisé
- Le mot de passe doit faire au moins 6 caractères
- J'utilise bcrypt pour hasher le mot de passe avant de le stocker

J'ai appris qu'on ne doit JAMAIS stocker un mot de passe en clair dans la base de données. Bcrypt transforme le mot de passe en une chaîne incompréhensible. Même si quelqu'un accède à la base, il ne peut pas retrouver les vrais mots de passe.

**Pour la connexion :**
- J'utilise NextAuth.js qui est une librairie spécialisée pour l'authentification
- Ça génère un token JWT (JSON Web Token) qui identifie l'utilisateur
- Ce token est stocké dans un cookie sécurisé

Le truc avec les JWT, c'est qu'ils sont signés cryptographiquement. Donc on ne peut pas les falsifier. Ça permet de vérifier que l'utilisateur est bien celui qu'il prétend être.

### 2. Gestion des transactions

C'est le cœur de l'application. J'ai développé un CRUD complet (Create, Read, Update, Delete).

**Créer une transaction :**
```javascript
// Exemple de code simplifié
const transaction = await prisma.transaction.create({
  data: {
    amount: 150,
    type: 'expense',
    category: 'Alimentation',
    date: new Date(),
    userId: session.user.id
  }
})
```

J'ai ajouté pas mal de validations :
- Le montant doit être positif
- Le type doit être soit "income" soit "expense"
- La date ne peut pas être dans le futur (logique, on peut pas dépenser de l'argent demain)
- Chaque transaction est liée à l'utilisateur connecté

**Lire les transactions :**
L'API renvoie toutes les transactions de l'utilisateur, triées par date (les plus récentes en premier).

**Modifier une transaction :**
Avant de permettre la modification, je vérifie que la transaction appartient bien à l'utilisateur connecté. Sinon, quelqu'un pourrait modifier les transactions d'un autre utilisateur en changeant l'ID dans l'URL.

**Supprimer une transaction :**
Pareil, je vérifie l'ownership avant de supprimer.

### 3. Dashboard avec graphiques

Le dashboard, c'est ce qui rend l'application vraiment utile. J'affiche plusieurs choses :

**4 cartes de statistiques :**
1. Nombre total de transactions
2. Nombre de catégories utilisées
3. Solde net (revenus - dépenses)
4. Pourcentage de croissance par rapport au mois précédent

**3 types de graphiques :**
1. **Graphique en ligne** : montre l'évolution du solde dans le temps
2. **Graphique camembert** : répartition des dépenses par catégorie
3. **Graphique en barres** : comparaison revenus vs dépenses

Pour les graphiques, j'utilise Recharts qui est une librairie React super pratique. Elle génère des graphiques interactifs automatiquement à partir de mes données.

**Filtres :**
L'utilisateur peut filtrer par semaine, mois ou année. Ça modifie les graphiques en temps réel. J'ai aussi ajouté une barre de recherche pour filtrer par mots-clés.

**Export PNG :**
Une fonctionnalité dont je suis assez fier : on peut exporter n'importe quel graphique en image PNG. J'utilise une librairie qui s'appelle dom-to-image-more qui capture le graphique et le transforme en image téléchargeable.

---

## Base de données

### Structure

J'ai deux tables principales :

**Table Users :**
- id (identifiant unique)
- name (nom)
- email (unique)
- password (hashé)
- createdAt (date de création)

**Table Transactions :**
- id (identifiant unique)
- amount (montant)
- type (income ou expense)
- category (catégorie)
- description (optionnel)
- currency (devise)
- date (date de la transaction)
- userId (référence vers l'utilisateur)
- createdAt (date de création)

**La relation :**
Un utilisateur peut avoir plusieurs transactions, mais une transaction appartient à un seul utilisateur. C'est ce qu'on appelle une relation "1 vers N" (one-to-many).

J'ai configuré un `onDelete: Cascade`, ce qui signifie que si on supprime un utilisateur, toutes ses transactions sont automatiquement supprimées aussi. C'est logique, on ne veut pas garder des transactions orphelines.

### Utilisation de Prisma

Prisma m'a vraiment simplifié la vie. Voici un exemple de requête :

```javascript
// Trouver toutes les transactions d'un utilisateur
const transactions = await prisma.transaction.findMany({
  where: { userId: user.id },
  orderBy: { date: 'desc' }
})
```

C'est beaucoup plus lisible que du SQL brut. Et surtout, si je fais une erreur de syntaxe, mon éditeur de code me le signale tout de suite.

---

## Sécurité

J'ai vraiment fait attention à la sécurité, parce que c'est un point crucial pour une application qui gère des données financières.

### Ce que j'ai mis en place :

1. **Hashage des mots de passe** : Avec bcrypt, aucun mot de passe n'est stocké en clair
2. **JWT signés** : Les tokens d'authentification ne peuvent pas être falsifiés
3. **Validation serveur** : Même si quelqu'un contourne le frontend, le backend vérifie tout
4. **Vérification d'ownership** : Un utilisateur ne peut voir/modifier que ses propres données
5. **Contraintes en base** : L'email doit être unique, les relations sont bien définies

### Ce qui pourrait être amélioré en production :

- Ajouter du rate limiting pour éviter les attaques par force brute
- Forcer HTTPS
- Ajouter un CAPTCHA sur le login/register
- Implémenter l'authentification à deux facteurs (2FA)
- Logger les tentatives de connexion suspectes

---

## Tests

C'était ma première fois que je faisais autant de tests sur un projet. Au début je trouvais ça fastidieux, mais j'ai vite compris l'intérêt quand j'ai modifié une fonction et que les tests m'ont immédiatement dit ce que j'avais cassé.

### Les résultats

J'ai écrit **133 tests** au total, et 127 passent. Mon objectif était d'atteindre 80% de "coverage" (c'est-à-dire que 80% du code soit exécuté par les tests), et j'ai atteint 82-83% au final.

```
Statements: 82.08%
Branches:   74.57%
Functions:  78.04%
Lines:      83.33% ✓
```

### Les différents types de tests

**Tests unitaires :**
Je teste chaque fonction individuellement. Par exemple, je teste que la fonction qui calcule le solde retourne bien la différence entre revenus et dépenses.

**Tests d'intégration :**
Je teste que plusieurs parties du code fonctionnent ensemble. Par exemple, je teste qu'un utilisateur peut se connecter ET récupérer ses transactions.

**Tests E2E (End-to-End) :**
Avec Playwright, je simule un vrai utilisateur qui clique dans l'application. Par exemple :
1. Aller sur la page de login
2. Entrer email et mot de passe
3. Cliquer sur "Se connecter"
4. Vérifier qu'on arrive bien sur le dashboard

### Exemple concret

Voici un exemple de test pour l'API de login :

```javascript
it('devrait connecter un utilisateur avec de bons identifiants', async () => {
  // 1. Je simule un utilisateur en base de données
  mockUser.findUnique.mockResolvedValue({
    id: 'user-1',
    email: 'test@example.com',
    password: 'motDePasseHashé'
  })

  // 2. Je simule que bcrypt dit que le mot de passe est bon
  bcrypt.compare.mockResolvedValue(true)

  // 3. J'appelle mon API
  const response = await POST(mockRequest)

  // 4. Je vérifie que ça a marché
  expect(response.status).toBe(200)
  expect(data.token).toBeDefined()
})
```

---

## Optimisations de performance

Au début, l'application fonctionnait bien, mais elle était un peu lente. J'ai remarqué que certaines pages mettaient 3-4 secondes à charger. J'ai donc travaillé sur les performances.

### Ce que j'ai optimisé

**1. useMemo pour les calculs**

Le problème c'est que React re-calcule des choses même quand elles n'ont pas changé. Par exemple, si j'ai une liste de 100 transactions et que je dois les filtrer, React refaisait ce calcul à chaque fois que le composant se mettait à jour, même si la liste n'avait pas changé.

La solution : `useMemo`

```javascript
const transactionsFiltrees = useMemo(() => {
  return transactions.filter(t => t.category === 'Alimentation')
}, [transactions]) // Ne recalcule que si transactions change
```

**2. useCallback pour les fonctions**

Même principe, mais pour les fonctions. Sans ça, une fonction est recréée à chaque render, ce qui fait que les composants enfants se mettent à jour inutilement.

```javascript
const handleDelete = useCallback(async (id) => {
  await deleteTransaction(id)
}, []) // La fonction reste la même
```

**3. Lazy loading**

Les librairies de graphiques comme Recharts sont assez lourdes (~200KB). Avant, elles étaient chargées dès l'ouverture de l'application, même si l'utilisateur n'allait pas sur le dashboard.

J'ai utilisé le lazy loading pour charger Recharts uniquement quand on arrive sur la page dashboard :

```javascript
const LineChart = dynamic(() =>
  import('recharts').then(mod => mod.LineChart),
  { ssr: false }
)
```

### Résultats

Avant ces optimisations :
- Taille du bundle : ~800KB
- Temps de chargement : ~3.5s

Après :
- Taille du bundle : ~730KB (-70KB)
- Temps de chargement : ~2.9s (-17%)

C'est pas spectaculaire, mais on sent la différence.

---

## Problèmes rencontrés et solutions

### 1. Bannières dupliquées

**Problème :** Le logo apparaissait deux fois sur certaines pages.

**Cause :** Je l'avais mis dans le layout.js (qui s'affiche sur toutes les pages) ET dans certaines pages individuellement.

**Solution :** J'ai gardé le logo uniquement dans le Navbar du layout.

### 2. Tests qui échouaient

**Problème :** Mes tests pour le dashboard échouaient avec l'erreur "getServerSession is not a function".

**Cause :** Next.js 15 a changé où se trouve cette fonction. Elle n'est plus dans `next-auth` mais dans `next-auth/next`.

**Solution :** J'ai mis à jour mes imports :
```javascript
jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn()
}))
```

### 3. Messages d'erreur en français

**Problème :** Mon API renvoyait des messages en français, mais mes tests attendaient de l'anglais.

**Solution :** J'ai mis à jour tous les tests pour correspondre aux messages en français. J'aurais pu faire l'inverse (tout mettre en anglais), mais j'ai préféré garder le français pour l'utilisateur final.

### 4. Problème de git push

**Problème :** Git refusait de push avec une erreur de configuration.

**Solution :** J'ai corrigé la config git :
```bash
git config --global push.autosetupremote true
```

---

## Ce que j'ai appris

Ce projet m'a vraiment fait progresser. Voici les principales compétences que j'ai acquises ou renforcées :

**Backend :**
- Créer des API REST propres avec Next.js
- Utiliser un ORM (Prisma) efficacement
- Gérer l'authentification avec JWT
- Valider les données côté serveur
- Structurer une base de données relationnelle

**Frontend :**
- Utiliser React de manière avancée (hooks comme useMemo, useCallback)
- Intégrer des graphiques interactifs
- Gérer l'état d'une application complexe
- Créer une interface responsive avec Tailwind

**Tests :**
- Écrire des tests unitaires avec Jest
- Tester des composants React avec Testing Library
- Faire des tests E2E avec Playwright
- Comprendre l'importance du coverage

**Performance :**
- Identifier les goulots d'étranglement
- Optimiser avec mémoïsation et lazy loading
- Mesurer les performances avec les bons outils

**Soft skills :**
- Décomposer un gros projet en petites tâches
- Débugger méthodiquement
- Lire et comprendre la documentation
- Persévérer quand quelque chose ne marche pas

---

## Améliorations futures

Si j'avais plus de temps, voici ce que j'aimerais ajouter :

**Court terme :**
- Déployer sur Vercel
- Ajouter l'export en CSV/PDF
- Améliorer le design mobile

**Moyen terme :**
- Budgets mensuels avec alertes
- Catégories personnalisables
- Mode sombre
- Notifications par email

**Long terme :**
- Application mobile (React Native)
- Synchronisation avec les comptes bancaires
- Prédictions de dépenses avec du machine learning
- Gestion de factures (upload PDF)

---

## Déploiement (prévu)

Pour le déploiement, j'ai prévu d'utiliser Vercel parce que :
- C'est gratuit pour les petits projets
- Ça s'intègre parfaitement avec Next.js (même équipe)
- Le déploiement est automatique à chaque push sur GitHub
- Ça inclut HTTPS et CDN

Pour la base de données en production, je vais probablement utiliser PlanetScale (MySQL serverless) ou Railway.

Les étapes seront :
1. Créer un compte Vercel
2. Connecter mon repo GitHub
3. Configurer les variables d'environnement (DATABASE_URL, NEXTAUTH_SECRET)
4. Déployer en un clic

---

## Conclusion

Ce projet a été un vrai défi pour moi. Il y a eu des moments où j'étais bloqué pendant des heures sur un bug, et d'autres où j'étais super content d'avoir réussi à implémenter une fonctionnalité complexe.

Ce que je retiens surtout, c'est que faire une vraie application de A à Z, c'est très différent de suivre des tutoriels. Il faut prendre des décisions (Quelle architecture ? Quelle librairie ?), gérer la complexité, et surtout ne pas abandonner quand ça ne marche pas du premier coup.

Je pense que MoneyMirror est une bonne démonstration de ce que j'ai appris pendant ma formation à Holberton. C'est une application fonctionnelle, sécurisée, testée, et optimisée. Elle n'est pas parfaite, mais elle fait bien ce qu'elle est censée faire.

Si je devais refaire ce projet, je commencerais par :
1. Faire un prototype très simple d'abord
2. Écrire les tests en même temps que le code (pas après)
3. Ne pas essayer d'optimiser trop tôt
4. Demander des retours utilisateurs régulièrement

Merci d'avoir pris le temps de lire ce rapport !

---

**Contact :**
- Email : vitushansatkunanathan@gmail.com
- GitHub : github.com/Vitushan
