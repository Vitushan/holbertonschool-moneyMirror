# 🔑 Variables d'Environnement Vercel - MoneyMirror

## Variables à configurer dans Vercel Settings → Environment Variables

### 1. DATABASE_URL
**Source:** Neon.tech ou Supabase (gratuit)

**Format Neon:**
```
postgresql://username:password@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Format Supabase:**
```
postgresql://postgres.xxxxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

### 2. NEXTAUTH_SECRET  
**Générateur:** https://generate-secret.vercel.app/32

**Exemple:**
```
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

### 3. NEXTAUTH_URL
**Format:** URL de ton app Vercel

**Exemples:**
```
https://moneymirror-vitushan.vercel.app
https://holbertonschool-moneymirror.vercel.app
https://moneymirror-tau.vercel.app
```

---

## 🚀 Instructions Vercel

### Méthode 1: Interface Web
1. Va sur https://vercel.com
2. Connecte-toi avec GitHub
3. Clique "Import Project"
4. Sélectionne "holbertonschool-moneyMirror"
5. Dans "Environment Variables", ajoute les 3 variables
6. Clique "Deploy"

### Méthode 2: CLI (si tu l'as installé)
```bash
vercel login
vercel --prod
# Puis configure les variables dans l'interface
```

---

## 💡 Notes Importantes

- **Pas de '@' devant les valeurs** (c'était le problème)
- **Environment: Production** pour toutes les variables
- **Redéployer** après avoir ajouté les variables
- **Tester** l'URL finale une fois déployé

---

## 🔍 Vérification Finale

Une fois déployé, ton app sera disponible à :
**https://[nom-généré-par-vercel].vercel.app**

Test à faire :
- [ ] Page d'accueil charge ✅
- [ ] Base de données se connecte ✅  
- [ ] Authentification fonctionne ✅
- [ ] CRUD transactions opérationnel ✅