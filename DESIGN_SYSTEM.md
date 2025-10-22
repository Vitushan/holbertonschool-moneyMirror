# Design System - MoneyMirror

Documentation complète du système de design de l'application MoneyMirror.

## Table des matières
1. [Palette de couleurs](#palette-de-couleurs)
2. [Typographie](#typographie)
3. [Espacement](#espacement)
4. [Composants](#composants)
5. [Animations](#animations)
6. [Responsive Design](#responsive-design)

---

## Palette de couleurs

### Couleurs principales

```css
/* Bleu principal - Actions principales, liens */
--primary: 221.2 83.2% 53.3%        /* #3b82f6 - Blue 500 */
--primary-foreground: 210 40% 98%   /* Texte sur fond bleu */

/* Vert - Revenus, succès */
--success: Équivalent à green-600   /* #16a34a */

/* Rouge - Dépenses, erreurs, actions destructives */
--destructive: 0 84.2% 60.2%        /* #ef4444 - Red 500 */
--destructive-foreground: 210 40% 98%
```

### Couleurs secondaires

```css
/* Gris - Texte secondaire, bordures */
--secondary: 210 40% 96%             /* #f8fafc - Slate 50 */
--secondary-foreground: 222.2 47.4% 11.2%

/* Accent */
--accent: 210 40% 96%
--accent-foreground: 222.2 47.4% 11.2%

/* Mutée (désactivé) */
--muted: 210 40% 96%
--muted-foreground: 215.4 16.3% 46.9%  /* #64748b - Slate 500 */
```

### Couleurs de fond et bordures

```css
--background: 0 0% 100%              /* Blanc */
--foreground: 222.2 84% 4.9%         /* Texte principal - Presque noir */

--card: 0 0% 100%                    /* Fond des cartes */
--card-foreground: 222.2 84% 4.9%

--border: 214.3 31.8% 91.4%          /* #e2e8f0 - Slate 200 */
--input: 214.3 31.8% 91.4%           /* Bordure des inputs */
--ring: 221.2 83.2% 53.3%            /* Focus ring - Bleu */
```

### Utilisation des couleurs

- **Revenus** : Toujours en vert (`text-green-600`, `bg-green-50`)
- **Dépenses** : Toujours en rouge (`text-red-600`, `bg-red-50`)
- **Solde positif** : Bleu (`text-blue-600`)
- **Solde négatif** : Rouge (`text-red-600`)
- **Actions principales** : Bleu primary
- **Actions destructives** : Rouge destructive
- **Texte désactivé** : Gris muted-foreground

---

## Typographie

### Police principale

```css
font-family: 'Inter', system-ui, sans-serif;
```

Inter est utilisée pour tout le texte de l'application.

### Hiérarchie des tailles

```css
/* Titres */
text-3xl      /* 30px - H1 principaux */
text-2xl      /* 24px - H2 sections (CardTitle) */
text-xl       /* 20px - H3 sous-sections */
text-lg       /* 18px - Grands labels */

/* Corps de texte */
text-base     /* 16px - Texte principal */
text-sm       /* 14px - Texte secondaire, labels (Input, Button) */
text-xs       /* 12px - Petits détails */
```

### Poids de police

```css
font-bold         /* 700 - Titres importants, labels */
font-semibold     /* 600 - Boutons, titres secondaires */
font-medium       /* 500 - Labels, navigation */
font-normal       /* 400 - Texte courant */
```

### Exemples d'utilisation

- **Logo** : `text-xl font-bold`
- **Titre de page** : `text-3xl font-bold`
- **Titre de carte** : `text-2xl font-semibold` (CardTitle)
- **Boutons** : `text-sm font-medium`
- **Labels de formulaire** : `text-sm font-medium`
- **Texte de description** : `text-sm text-gray-500` (CardDescription)

---

## Espacement

### Système d'espacement Tailwind

L'application utilise l'échelle d'espacement standard de Tailwind :

```
0.5 → 2px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
```

### Règles d'espacement

#### Padding des composants

```css
/* Cartes */
Card : p-6                  /* 24px de padding */
CardHeader : p-6            /* 24px de padding */
CardContent : p-6 pt-0      /* 24px sauf en haut */

/* Conteneurs principaux */
Container : px-4 sm:px-6 lg:px-8 py-8

/* Navbar */
Navbar height : h-16        /* 64px de hauteur */
```

#### Marges et espaces

```css
/* Entre les éléments de liste */
space-y-4        /* 16px entre éléments verticaux */
space-x-4        /* 16px entre éléments horizontaux */

/* Gaps dans flex/grid */
gap-4            /* 16px de gap */
gap-6            /* 24px de gap */
```

#### Breakpoints responsive

```css
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## Composants

### Button

**Fichier** : `src/components/ui/button.js`

#### Variantes

```jsx
<Button variant="default">     {/* Bleu primary */}
<Button variant="destructive"> {/* Rouge */}
<Button variant="outline">     {/* Bordure grise */}
<Button variant="secondary">   {/* Fond gris */}
<Button variant="ghost">       {/* Transparent */}
<Button variant="link">        {/* Lien souligné */}
<Button variant="success">     {/* Vert */}
```

#### Tailles

```jsx
<Button size="sm">      {/* h-9 px-3 text-sm */}
<Button size="default"> {/* h-10 px-4 py-2 */}
<Button size="lg">      {/* h-11 px-8 text-lg */}
<Button size="icon">    {/* h-10 w-10 */}
```

### Input

**Fichier** : `src/components/ui/input.js`

```jsx
<Input type="text" placeholder="Entrez..." />
<Input type="email" placeholder="Email" />
<Input type="number" />
```

**Styles** : Bordure grise, focus ring bleu, transitions douces

### Card

**Fichier** : `src/components/ui/card.js`

```jsx
<Card>
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description secondaire</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenu principal */}
  </CardContent>
  <CardFooter>
    {/* Actions ou informations supplémentaires */}
  </CardFooter>
</Card>
```

### Navbar

**Fichier** : `src/components/Navbar.js`

**Fonctionnalités** :
- Navigation desktop avec icônes
- Menu hamburger mobile avec animation slide-down
- Highlight de la page active
- Affichage conditionnel (uniquement pour utilisateurs connectés)
- Sticky top

**Navigation items** :
- 📊 Tableau de bord → `/dashboard`
- 💳 Transactions → `/transactions`
- ➕ Ajouter Transaction → `/transactions/add`

---

## Animations

### Animations disponibles

**Fichier** : `src/app/globals.css`

#### Classes d'animation

```css
.animate-fade-in           /* Apparition en fondu (0.5s) */
.animate-slide-in-top      /* Glissement depuis le haut (0.6s) */
.animate-slide-in-bottom   /* Glissement depuis le bas (0.6s) */
.animate-slide-in-left     /* Glissement depuis la gauche (0.6s) */
.animate-slide-in-right    /* Glissement depuis la droite (0.6s) */
.animate-scale-in          /* Zoom progressif (0.4s) */
.animate-pulse-slow        /* Pulsation lente (2s infini) */
```

#### Effets hover

```css
.hover-lift          /* Soulève l'élément au hover (-translate-y-1) */
.hover-glow          /* Ajoute une ombre au hover */
```

### Transitions globales

```css
/* Tous les éléments */
transition-colors duration-200

/* Éléments interactifs */
button, a, input, select, textarea
  → transition-all duration-200 ease-in-out
```

### Utilisation recommandée

- **Cards** : `hover:shadow-md` pour un effet de profondeur
- **Buttons** : Transition automatique incluse dans le composant
- **Navigation** : `transition-all` pour les changements d'état
- **Modal/Menu** : `animate-scale-in` pour l'apparition
- **Loading states** : `animate-pulse-slow`

---

## Responsive Design

### Stratégie Mobile-First

L'application utilise une approche mobile-first avec Tailwind.

#### Breakpoints principaux

```css
/* Mobile par défaut */
base: < 640px

/* Tablette */
sm: ≥ 640px
md: ≥ 768px

/* Desktop */
lg: ≥ 1024px
xl: ≥ 1280px
```

### Patterns responsive

#### Navigation

```jsx
/* Mobile : Hamburger menu */
<div className="md:hidden">
  {/* Menu hamburger */}
</div>

/* Desktop : Navigation horizontale */
<div className="hidden md:flex">
  {/* Navigation links */}
</div>
```

#### Grid layouts

```jsx
/* 1 colonne mobile, 2 colonnes tablette, 3 colonnes desktop */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### Texte responsive

```jsx
/* Logo */
<span className="hidden sm:block">MoneyMirror</span>

/* Boutons */
<span className="hidden sm:inline">Déconnexion</span>
<span className="sm:hidden">Déco</span>
```

#### Containers

```jsx
/* Padding responsive */
<div className="px-4 sm:px-6 lg:px-8">

/* Max width centré */
<div className="max-w-7xl mx-auto">
```

### Tests responsive recommandés

Tester l'application sur :
- Mobile : 375px (iPhone SE)
- Mobile large : 414px (iPhone Pro Max)
- Tablette : 768px (iPad)
- Desktop : 1280px, 1920px

---

## Conventions de code

### Nommage des classes

- Utiliser `cn()` de `src/lib/utils.js` pour fusionner les classes
- Ordre des classes : layout → spacing → couleurs → typographie → autres
- Classes responsives en dernier

### Exemple de bon usage

```jsx
<div className={cn(
  "flex items-center gap-2",        // Layout
  "px-4 py-2",                       // Spacing
  "bg-white border border-gray-200", // Couleurs
  "text-sm font-medium",             // Typographie
  "rounded-md shadow-sm",            // Autres
  "hover:bg-gray-50 transition-all", // États
  "sm:px-6 md:text-base",           // Responsive
  className                          // Props custom
)}>
```

---

## Notes importantes

1. **Cohérence des couleurs** : Toujours utiliser les classes Tailwind standards (green-600, red-600, blue-600) pour maintenir la cohérence.

2. **Accessibilité** :
   - Contraste minimum WCAG AA
   - Focus rings visibles sur tous les éléments interactifs
   - Labels explicites pour les formulaires

3. **Performance** :
   - Animations légères (<0.6s)
   - Transitions GPU-accelerated (transform, opacity)
   - Lazy loading des images

4. **Maintenance** :
   - Utiliser les composants UI réutilisables (`Button`, `Input`, `Card`)
   - Éviter les styles inline
   - Documenter les nouveaux composants
