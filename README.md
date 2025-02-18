# workshop-graphql-dev6

workshop-graphql-dev6 est un projet full-stack comprenant un backend en Python avec FastAPI accompagné de strawberry GraphQL et un frontend en React.

## Installation et exécution du projet

### 1. Cloner le dépôt

```sh
# Cloner le dépôt Git
git clone https://forge.iut-larochelle.fr/tlefranc/workshop-graphql-dev6
cd workshop-graphql-dev6
```

### 2. Lancer le backend

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

### 3. Lancer le frontend

1. Ouvrir un **nouveau terminal** et aller dans le dossier `frontend` :
   ```sh
   cd frontend
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```
3. Lancer le serveur de développement :
   ```sh
   npm run dev
   ```
4. L'application est accessible à : [http://localhost:5173/signup](http://localhost:5173/signup)
   > **Note :** Ouvrir en navigation privée au cas où un autre token serait présent dans le localStorage.

## Fonctionnalités

### Backend

- Implémentation CRUD pour les tables **User, Project et Task**
- Utilisation fonctionnelle d’une **base SQLite**
- **Authentification** basique avec **JWT**
- Possibilité de **signup et login** grâce à des mutations et l’utilisation du **JWT accompagné d’un hachage de mot de passe**
- **Gestion de contexte** par middleware
- **Routes protégées** selon la sensibilité (vérification de l’utilisateur connecté avant récupération ou suppression de projets, par exemple)
- **Dataloader** sur la récupération des tâches dans le resolver `getProjects`
- **Directive `hasRole`** sur les mutations sensibles (création de tâche ou de projet) pour vérifier si l’utilisateur connecté est **ADMIN**
- **Subscriptions GraphQL** (Temps réel) pour l’événement de création de tâche, permettant l’affichage instantané des tâches sur la page de détails d’un projet
- **Pagination, filtrage et autres fonctions avancées** :
  - Resolver `getProject` mis à jour avec **offset** et **limit**
  - Resolver `searchProjects` permettant la **recherche par mots-clés**

### Frontend

- **SignUp**
- **Login**
- **Logout**
- **Lister les projets de façon paginée**
- **Afficher les détails d’un projet**
- **Créer un projet**
- **Supprimer un projet**
- **Rechercher un projet**
- **Protection des routes**
- **Création de tâches dans un projet**
- **Suppression de tâches dans un projet**
- **Client Apollo** pour les requêtes GraphQL

## Contributions

Les contributions sont les bienvenues ! Pour toute suggestion ou amélioration, n'hésitez pas à ouvrir une issue ou une pull request.

---

**Auteur :** [Thibaut Lefrancois](https://github.com/thibautlfr)
