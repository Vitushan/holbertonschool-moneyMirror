# 🚀 Guide de Déploiement MoneyMirror

## 📋 Prérequis

- Compte Vercel (gratuit)
- Base de données PostgreSQL (Neon/Supabase recommandé)
- Repository GitHub configuré

## 🛠️ Étapes de Déploiement

### 1. Configuration Base de Données

#### Option A: Neon (Recommandé)
```bash
# 1. Aller sur https://neon.tech
# 2. Créer un compte gratuit
# 3. Créer une nouvelle base de données "moneymirror"
# 4. Copier la connection string
```

#### Option B: Supabase
```bash
# 1. Aller sur https://supabase.com
# 2. Créer un projet "MoneyMirror"
# 3. Aller dans Settings > Database
# 4. Copier la connection string PostgreSQL
```

### 2. Variables d'Environnement

```bash
DATABASE_URL="postgresql://user:password@host:5432/moneymirror"
NEXTAUTH_SECRET="votre-secret-ultra-securise-32-chars-minimum"
NEXTAUTH_URL="https://votre-app.vercel.app"
```

### 3. Déploiement Vercel

#### Méthode 1: Interface Web
```
1. Aller sur https://vercel.com
2. Se connecter avec GitHub
3. Cliquer "New Project"
4. Importer "holbertonschool-moneyMirror"
5. Configurer les variables d'environnement
6. Déployer
```

#### Méthode 2: CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel --prod

# Configurer les variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET  
vercel env add NEXTAUTH_URL
```

### 4. Configuration Post-Déploiement

```bash
# 1. Vérifier que l'app se lance
# 2. Tester la connexion DB
# 3. Vérifier l'authentification
# 4. Valider les fonctionnalités CRUD
```

## 🔧 Commands Utiles

```bash
# Build local pour tester
npm run build
npm start

# Vérifier la DB
npm run db:studio

# Tests avant déploiement  
npm test
npm run test:e2e

# Logs Vercel
vercel logs
```

## 🌐 URLs Finales

Après déploiement réussi :

- **Production App**: `https://moneymirror-vitushan.vercel.app`
- **Vercel Dashboard**: `https://vercel.com/vitushan/holbertonschool-moneymirror`
- **Database Console**: `https://console.neon.tech` ou `https://app.supabase.com`

## ⚠️ Troubleshooting

### Build Errors
```bash
# Si erreur Prisma
vercel env add DATABASE_URL production
vercel --prod --force

# Si erreur Next.js
npm run build
# Corriger les erreurs localement puis redéployer
```

### Database Issues
```bash
# Reset DB en production
npx prisma db push --force-reset
npx prisma db seed
```

## ✅ Checklist Déploiement

- [ ] Repository GitHub à jour
- [ ] Variables d'environnement configurées
- [ ] Build local réussi
- [ ] Tests passés
- [ ] Déploiement Vercel réussi
- [ ] App accessible en production
- [ ] Fonctionnalités testées en prod
- [ ] URL ajoutée dans la documentation