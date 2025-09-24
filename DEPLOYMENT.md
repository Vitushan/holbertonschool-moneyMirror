# 🚀 Instructions de Déploiement Vercel

## Étapes Rapides pour Déployer MoneyMirror

### 1. Préparer la Base de Données

**Option Recommandée: Neon (gratuit)**
1. Aller sur https://neon.tech
2. Créer un compte gratuit
3. Créer un nouveau projet "MoneyMirror"
4. Créer une database "moneymirror"
5. Copier la connection string dans Settings > General

### 2. Configurer Vercel

**Via l'interface web:**
1. Aller sur https://vercel.com
2. Se connecter avec GitHub
3. Cliquer "New Project" 
4. Chercher "holbertonschool-moneyMirror"
5. Importer le projet
6. Dans "Environment Variables", ajouter:

```
DATABASE_URL = postgresql://[votre-neon-connection-string]
NEXTAUTH_SECRET = [generer-secret-32-chars]
NEXTAUTH_URL = https://[votre-nom-app].vercel.app
```

### 3. Variables d'Environnement Nécessaires

```bash
# Database (Neon)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/moneymirror?sslmode=require"

# Auth Secret (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET="votre-secret-ultra-securise-de-32-caracteres-minimum"

# Production URL (sera fourni par Vercel)
NEXTAUTH_URL="https://moneymirror-vitushan.vercel.app"
```

### 4. Première Déploiement

1. Cliquer "Deploy" dans Vercel
2. Attendre le build (~2-3 minutes)
3. Vérifier que l'app est accessible
4. Tester l'inscription/connexion

### 5. URLs Finales

Après déploiement réussi, vous aurez :

- **App Production**: https://moneymirror-vitushan.vercel.app
- **Vercel Dashboard**: https://vercel.com/vitushan/holbertonschool-moneymirror  
- **Database**: https://console.neon.tech

### 🔧 Troubleshooting

**Si le build échoue:**
```bash
# Vérifier localement
npm run build

# Si erreur Prisma
# Vérifier DATABASE_URL dans Vercel Environment Variables
```

**Si l'app ne charge pas:**
- Vérifier les variables d'environnement dans Vercel
- Vérifier les logs dans Vercel > Functions > Logs

### ✅ Checklist Post-Déploiement

- [ ] App accessible via URL Vercel
- [ ] Inscription fonctionne
- [ ] Login fonctionne  
- [ ] Ajout de transactions fonctionne
- [ ] Base de données connectée
- [ ] Variables d'environnement configurées