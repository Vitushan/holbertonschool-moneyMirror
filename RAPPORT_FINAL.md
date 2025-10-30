# Rapport Final - MoneyMirror
## Projet de Gestion des Finances Personnelles

**Nom :** Vitushan Satkunanathan
**Formation :** Holberton School
**Date :** Janvier 2025

---

## 1. Présentation du projet

MoneyMirror est une application web que j'ai développée pour aider les gens à mieux gérer leurs finances. L'idée est simple : on peut créer un compte, enregistrer ses revenus et dépenses, et visualiser tout ça avec des graphiques pour comprendre où va notre argent.

J'ai voulu créer quelque chose d'utile au quotidien, pas juste un projet d'école. Personnellement, j'avais du mal à suivre mes dépenses, alors j'ai pensé que d'autres personnes avaient sûrement le même problème.

---

## 2. Technologies utilisées

**Frontend :**
- React 18 pour l'interface utilisateur
- Next.js 15 pour le framework
- Tailwind CSS pour le design
- Recharts pour les graphiques

**Backend :**
- Next.js API Routes
- Prisma ORM pour communiquer avec la base de données
- NextAuth.js pour l'authentification

**Base de données :**
- MySQL 8

**Tests :**
- Jest pour les tests unitaires
- Playwright pour les tests end-to-end

J'ai choisi ces technologies parce qu'elles sont modernes et très utilisées dans l'industrie. Next.js m'a permis de faire le frontend et le backend dans le même projet, ce qui simplifie beaucoup les choses.

---

## 3. Fonctionnalités principales

### Authentification sécurisée
- Inscription avec validation de l'email
- Connexion avec token JWT
- Mots de passe hachés avec bcrypt

### Gestion des transactions
- Ajouter des revenus et dépenses
- Modifier ou supprimer des transactions
- Support de plusieurs devises (EUR, USD, cryptomonnaies)
- Chaque transaction a une date, une catégorie et une description

### Dashboard avec visualisations
- 4 cartes de statistiques (nombre de transactions, catégories, solde, croissance)
- Graphique en ligne pour l'évolution du solde
- Graphique camembert pour les dépenses par catégorie
- Graphique en barres pour comparer revenus et dépenses
- Filtres par période (semaine, mois, année)
- Export des graphiques en PNG

---

## 4. Architecture

L'application suit une architecture classique client-serveur :

```
Frontend (React) ←→ Backend (Next.js API) ←→ Base de données (MySQL)
```

Le frontend affiche les pages et envoie des requêtes HTTP au backend. Le backend vérifie l'authentification, valide les données, et communique avec la base de données via Prisma. Puis il renvoie les résultats au frontend.

J'ai essayé de bien séparer les responsabilités. Par exemple, toute la logique d'authentification est dans les API routes, pas dans les composants React.

---

## 5. Base de données

Ma base de données a deux tables principales :

**Users** : stocke les utilisateurs (id, nom, email, mot de passe hashé)
**Transactions** : stocke les transactions (id, montant, type, catégorie, date, userId)

Un utilisateur peut avoir plusieurs transactions (relation 1-N). J'ai configuré la base pour que si on supprime un utilisateur, toutes ses transactions soient supprimées automatiquement (cascade delete).

Prisma m'a vraiment aidé pour ça. Au lieu d'écrire du SQL, j'écris du JavaScript et Prisma génère les requêtes. C'est plus sûr et plus facile à maintenir.

---

## 6. Sécurité

La sécurité était une priorité pour moi. Voici ce que j'ai mis en place :

1. **Hashage des mots de passe** : J'utilise bcrypt. Même si quelqu'un accède à la base de données, il ne peut pas récupérer les vrais mots de passe.

2. **JWT pour l'authentification** : Quand quelqu'un se connecte, je génère un token signé cryptographiquement. Ce token est envoyé à chaque requête pour prouver l'identité.

3. **Validation côté serveur** : Je ne fais pas confiance aux données qui viennent du frontend. Je re-vérifie tout dans le backend.

4. **Vérification d'ownership** : Avant de permettre à quelqu'un de modifier ou supprimer une transaction, je vérifie qu'elle lui appartient bien.

---

## 7. Tests et qualité

J'ai écrit **133 tests** pour m'assurer que tout fonctionne correctement :

- **Tests unitaires** : testent chaque fonction individuellement
- **Tests d'intégration** : testent que plusieurs parties fonctionnent ensemble
- **Tests E2E** : simulent un vrai utilisateur qui clique dans l'application

Mon objectif était d'atteindre 80% de coverage (80% du code exécuté par les tests). J'ai atteint **83.33%**, donc j'ai dépassé mon objectif.

Les tests m'ont vraiment aidé. Quand je modifiais quelque chose, je savais tout de suite si j'avais cassé autre chose. C'est rassurant pour faire évoluer le code.

---

## 8. Optimisations de performance

Au début, l'application était un peu lente. J'ai donc travaillé sur les performances :

**Ce que j'ai fait :**
- Utilisé `useMemo` pour éviter de recalculer des choses inutilement
- Utilisé `useCallback` pour éviter de recréer des fonctions à chaque render
- Implémenté le lazy loading pour charger Recharts seulement quand nécessaire

**Résultats :**
- Bundle réduit de 800KB à 730KB (-70KB)
- Temps de chargement réduit de 3.5s à 2.9s (-17%)

C'est pas énorme, mais l'application est maintenant plus fluide.

---

## 9. Problèmes rencontrés

### Tests qui échouaient
Au début, mes tests pour le dashboard ne marchaient pas. Le problème venait de l'import de NextAuth qui avait changé dans Next.js 15. J'ai mis du temps à comprendre, mais une fois que j'ai trouvé, j'ai pu corriger tous les tests.

### Logo dupliqué
Le logo apparaissait deux fois sur certaines pages. C'était parce que je l'avais mis à deux endroits différents dans mon code. J'ai nettoyé ça.

### Configuration Git
À un moment, Git refusait de push mes commits. C'était un problème de configuration. J'ai cherché sur Stack Overflow et j'ai trouvé la commande pour corriger.

Ces problèmes m'ont appris à être patient et méthodique quand je debug. Souvent la solution est simple, mais il faut prendre le temps de bien lire les messages d'erreur.

---

## 10. Compétences acquises

Ce projet m'a vraiment fait progresser. J'ai appris :

**Techniquement :**
- À créer une API REST propre
- À gérer l'authentification de manière sécurisée
- À structurer une base de données relationnelle
- À écrire des tests efficaces
- À optimiser les performances d'une application React

**Méthode de travail :**
- À décomposer un gros projet en petites tâches
- À débugger de manière méthodique
- À lire et utiliser la documentation
- À persévérer quand ça ne marche pas

**Soft skills :**
- À prendre des décisions techniques (quelle librairie utiliser ?)
- À gérer mon temps sur un projet long
- À documenter mon travail pour les autres

---

## 11. Résultats

À la fin du projet, j'ai :

- Une application fonctionnelle avec authentification complète
- Un système CRUD complet pour les transactions
- Un dashboard avec 3 types de graphiques interactifs
- 133 tests avec 83% de coverage
- Une architecture propre et scalable
- Un code documenté et lisible

L'application fait ce que je voulais qu'elle fasse : aider quelqu'un à mieux comprendre ses finances.

---

## 12. Prochaines étapes

Si je continue à travailler sur MoneyMirror, voici ce que je ferais :

**Immédiat :**
- Déployer sur Vercel pour que n'importe qui puisse l'utiliser
- Ajouter l'export CSV des transactions

**Futur proche :**
- Implémenter des budgets mensuels avec des alertes
- Ajouter un mode sombre
- Permettre aux utilisateurs de créer leurs propres catégories

**Futur lointain :**
- Créer une application mobile
- Se connecter aux comptes bancaires pour importer les transactions automatiquement
- Utiliser du machine learning pour prédire les dépenses

---

## 13. Conclusion

Ce projet a été un vrai challenge. Il y a eu des moments difficiles où je ne comprenais pas pourquoi quelque chose ne marchait pas, et d'autres moments très satisfaisants quand j'arrivais à implémenter une fonctionnalité complexe.

Ce que je retiens surtout, c'est qu'on apprend beaucoup plus en construisant quelque chose de concret qu'en suivant des tutoriels. Les problèmes sont différents, il n'y a pas toujours de solution toute faite, et il faut vraiment comprendre ce qu'on fait.

MoneyMirror n'est pas parfait, mais c'est une vraie application qui fonctionne. Je suis fier de ce que j'ai accompli et j'ai hâte de continuer à la faire évoluer.

Ce projet m'a montré que je suis capable de créer une application full-stack de A à Z, en gérant tous les aspects : backend, frontend, base de données, sécurité, tests, et performance. C'est exactement ce que je voulais prouver.

---

**Vitushan Satkunanathan**
Holberton School - Janvier 2025

**Contact :**
- Email : vitushansatkunanathan@gmail.com
- GitHub : github.com/Vitushan
- Projet : github.com/Vitushan/holbertonschool-moneyMirror
