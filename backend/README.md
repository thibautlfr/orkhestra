# workshop-graphql-dev6 - Backend

Ce dossier contient le backend du projet workshop-graphql-dev6, développé avec **FastAPI** et **GraphQL (Strawberry)**, utilisant **SQLite** comme base de données.

## Installation et exécution du backend

1. Ouvrir un terminal et aller dans le dossier `backend` :
   ```sh
   cd backend
   ```
2. Créer et activer un environnement virtuel :
   ```sh
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Installer les dépendances :
   ```sh
   pip install -r requirements.txt
   ```
4. Initialiser la base de données :
   ```sh
   python -m database.init_db
   ```
5. Lancer le serveur :
   ```sh
   uvicorn main:app --reload
   ```
6. L'API est maintenant accessible à : [http://localhost:8000/graphql](http://localhost:8000/graphql)

---

## Structure du backend

Le backend est organisé comme suit :

```
├── api
│   ├── graphql
│   │   ├── dataloaders
│   │   │   └── task_loader.py  # Chargement efficace des tâches
│   │   ├── directives
│   │   │   └── auth.py  # Directive @hasRole pour la gestion des permissions
│   │   ├── middlewares
│   │   │   └── auth.py  # Middleware pour l'authentification JWT
│   │   ├── resolvers
│   │   │   ├── project.py  # Résolveurs liés aux projets
│   │   │   ├── task.py  # Résolveurs liés aux tâches
│   │   │   └── user.py  # Résolveurs liés aux utilisateurs
│   │   ├── schemas
│   │   │   ├── mutation.py  # Définitions des mutations GraphQL
│   │   │   ├── query.py  # Définitions des requêtes GraphQL
│   │   │   └── subscription.py  # Définitions des subscriptions GraphQL
│   │   └── types
│   │       ├── project.py  # Type GraphQL pour les projets
│   │       ├── task.py  # Type GraphQL pour les tâches
│   │       └── user.py  # Type GraphQL pour les utilisateurs
│   └── utils
│       ├── auth.py  # Gestion de l'authentification JWT
│       └── config.py  # Configuration globale du projet
├── database
│   ├── db.py  # Connexion à la base de données
│   ├── init_db.py  # Script d'initialisation de la base de données
│   └── models.py  # Définition des modèles SQLAlchemy
├── database.db  # Base de données SQLite
├── main.py  # Point d'entrée de l'application
└── requirements.txt  # Dépendances Python
```

---

## Fonctionnalités principales

- **CRUD** complet pour les **Users, Projects et Tasks**
- **Authentification JWT** avec hachage des mots de passe
- **Middleware d’authentification** pour protéger les routes
- **Gestion des permissions** avec la directive `@hasRole`
- **Dataloader** pour optimiser la récupération des tâches
- **GraphQL Subscriptions** en temps réel pour l'ajout de tâches
- **Pagination et filtrage** des projets via les résolveurs GraphQL
