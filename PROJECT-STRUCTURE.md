# 📁 Structure du Projet MoneyMirror

```
holbertonschool-moneyMirror/
├── 📄 README.md
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 next.config.js
├── 📄 tailwind.config.js
├── 📄 jest.config.js
├── 📄 jest.setup.js
├── 📄 vercel.json
├── 📄 TASK5-DELIVERABLES.md
├── 📄 DEPLOYMENT.md
├── 📄 cypress.config.js
├── 📄 docker-compose.yml
├── 📄 Dockerfile.dev
├── 📄 .env.example
├── 📄 .env.local
├── 📄 .eslintrc.js
├── 📄 .gitignore
├── 📄 .prettierrc.json
├── 📄 components.json
├── 📄 postcss.config.js
│
├── 📁 prisma/
│   ├── 📄 schema.prisma
│   └── 📄 seed.js
│
├── 📁 src/
│   ├── 📁 app/
│   ├── 📁 components/
│   │   ├── 📁 forms/
│   │   │   └── 📄 TransactionForm.jsx
│   │   └── 📄 TransactionList.jsx
│   └── 📁 lib/
│
├── 📁 tests/
│   ├── 📁 __tests__/
│   │   ├── 📄 TransactionForm.test.js ✅
│   │   └── 📄 TransactionList.test.js ✅
│   └── 📁 cypress/
│       ├── 📁 e2e/
│       └── 📁 support/
│
├── 📁 docs/
│   ├── 📄 test-report.md
│   ├── 📄 deployment-guide.md
│   ├── 📄 database-setup.md
│   ├── 📄 trello-board-setup.md
│   ├── 📄 sprint-planning-template.md
│   ├── 📄 vercel-env-setup.md
│   └── 📁 screenshots/
│       ├── 📄 README.md
│       └── 📄 test-results-evidence.md
│
├── 📁 coverage/ 
│   └── 📁 lcov-report/
│       └── 📄 index.html
│
├── 📁 .github/
│   └── 📁 ISSUE_TEMPLATE/
│
├── 📁 public/
└── 📁 node_modules/ (ignoré)
```

## 🧪 **Tests Status**
- ✅ **7 tests Jest passés** (TransactionForm: 3, TransactionList: 4)
- ✅ **Coverage: 61.53% statements, 83.33% branches**
- ✅ **Preuves visuelles complètes**