# 🗄️ Guide Configuration Base de Données

## Création PostgreSQL avec Neon (Gratuit)

### Étapes :
1. Aller sur https://neon.tech
2. Créer un compte gratuit
3. Cliquer "Create Project"
4. Nom du projet : "MoneyMirror"
5. Région : Europe (recommandé)
6. Copier la "Connection String"

### Format de l'URL :
```
postgresql://username:password@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### Pour Vercel :
- Remplacer "neondb" par "moneymirror" si nécessaire
- Garder "?sslmode=require" à la fin

---

## Alternative : Supabase

1. Aller sur https://supabase.com  
2. Créer projet "MoneyMirror"
3. Aller dans Settings → Database
4. Copier "Connection string" (URI)
5. Utiliser cette URL dans Vercel

---

## Variables Vercel Finales

```bash
DATABASE_URL=postgresql://[ta-connection-string-neon-ou-supabase]
NEXTAUTH_URL=https://[nom-de-ton-app].vercel.app
NEXTAUTH_SECRET=super-secret-key-minimum-32-characters-abc123def456
```