# 📸 Guide pour Capturer les Preuves Visuelles des Tests

## 🎯 Preuves à Capturer pour Task 5

### **1. Screenshots Terminal - Résultats Tests**

**À faire dans ton terminal :**
```bash
# 1. Redémarrer les tests pour capture fraîche
npm test -- --coverage --verbose

# 2. Prendre screenshot du terminal avec :
# - Test Suites: 2 passed, 2 total
# - Tests: 7 passed, 7 total  
# - Time: ~2.3s
# - Coverage table complet
```

**Nommer le screenshot :** `jest-tests-results.png`

---

### **2. Coverage Report HTML - Preuve Visuelle**

**Ouvrir le rapport de coverage :**
```bash
# 1. Le fichier HTML a été généré dans :
open coverage/lcov-report/index.html

# 2. Prendre screenshots de :
# - Page d'accueil avec % coverage global
# - Page détail TransactionForm.jsx
# - Page détail TransactionList.jsx
```

**Screenshots à prendre :**
- `coverage-overview.png` - Vue globale du coverage
- `coverage-transaction-form.png` - Détail TransactionForm  
- `coverage-transaction-list.png` - Détail TransactionList

---

### **3. Structure Projet Tests - Preuve Organisation**

**Dans VS Code ou Finder :**
```
Capturer l'arborescence du projet montrant :
📁 tests/
  📁 __tests__/
    📄 TransactionForm.test.js
    📄 TransactionList.test.js
📁 src/
  📁 components/
    📄 TransactionList.jsx
    📁 forms/
      📄 TransactionForm.jsx
📄 jest.config.js
📄 jest.setup.js
```

**Nommer le screenshot :** `project-structure-tests.png`

---

### **4. Configuration Jest - Preuve Setup**

**Capturer le fichier `jest.config.js` ouvert dans l'éditeur :**
```javascript
// Montrer la configuration complète avec :
// - moduleNameMapper pour @/
// - testEnvironment: jsdom
// - setupFilesAfterEnv
// - collectCoverageFrom
```

**Nommer le screenshot :** `jest-configuration.png`

---

### **5. Tests Code Source - Preuves Implémentation**

**Screenshots des fichiers de tests ouverts :**

**TransactionForm.test.js :**
- Montrer les 3 tests et leurs assertions
- Imports React Testing Library
- Mock props setup

**TransactionList.test.js :**
- Montrer les 4 tests et leurs assertions
- Mock data avec transactions
- Different states testing

**Nommer les screenshots :**
- `transaction-form-tests-code.png`
- `transaction-list-tests-code.png`

---

## 📂 Organisation des Screenshots

### **Créer la structure :**
```
docs/screenshots/
├── 📸 jest-tests-results.png
├── 📸 coverage-overview.png  
├── 📸 coverage-transaction-form.png
├── 📸 coverage-transaction-list.png
├── 📸 project-structure-tests.png
├── 📸 jest-configuration.png
├── 📸 transaction-form-tests-code.png
├── 📸 transaction-list-tests-code.png
└── 📄 README.md (ce fichier)
```

---

## 🎯 Conseils pour de Bonnes Captures

### **Screenshots Terminal :**
- Terminal en plein écran
- Police lisible (taille 14+)
- Theme sombre ou clair contrasté
- Capturer tout l'output des tests

### **Screenshots Coverage :**
- Navigateur en mode incognito (propre)
- Zoom à 100% pour clarté
- Capturer tableaux complets
- Montrer les pourcentages et barres de progression

### **Screenshots Code :**
- VS Code theme professionnel
- Numéros de lignes visibles
- Syntax highlighting activé
- Fichier complet visible si possible

---

## ✅ Checklist Final Preuves

- [ ] `jest-tests-results.png` - Résultats terminal
- [ ] `coverage-overview.png` - Vue globale coverage
- [ ] `coverage-transaction-form.png` - Détail composant 1
- [ ] `coverage-transaction-list.png` - Détail composant 2  
- [ ] `project-structure-tests.png` - Organisation projet
- [ ] `jest-configuration.png` - Config Jest
- [ ] `transaction-form-tests-code.png` - Code tests 1
- [ ] `transaction-list-tests-code.png` - Code tests 2

---

## 🔗 Integration dans Task 5

**Une fois les screenshots pris, mettre à jour :**

1. **TASK5-DELIVERABLES.md :**
   - Ajouter lien vers `docs/screenshots/`
   - Référencer les preuves visuelles

2. **Commit final :**
   ```bash
   git add docs/screenshots/
   git commit -m "docs: Add visual evidence of test results and coverage"
   git push
   ```

**Résultat :** Preuves tangibles et visuelles pour présentation Task 5 ! 📸✅