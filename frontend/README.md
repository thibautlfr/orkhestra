# ProjectHub

ProjectHub est une application de gestion de projets permettant de gérer plusieurs projets, eux-mêmes composés de tâches. Chaque utilisateur peut s'inscrire, se connecter et manipuler ses propres projets.

## Fonctionnalités

- **Gestion des projets** : création, édition, suppression de projets.
- **Gestion des tâches** : assignation à un projet, édition, changement de statut, suppression de tâches.
- **Système de commentaires** : possibilité d'ajouter des commentaires sur les projets et les tâches.
- **Gestion des utilisateurs** : inscription et connexion pour manipuler ses propres projets.

## Structure du projet

- **src/components** : contient les composants réutilisables de l'application (e.g., `TaskItem`, `ProjectCard`, `Layout`, `CommentList`).
- **src/pages** : contient les différentes pages de l'application (e.g., `LoginPage`, `SignupPage`, `ProjectsPage`, `ProjectDetailsPage`, `NotFoundPage`).
- **src/main.jsx** : point d'entrée principal de l'application.
- **src/index.css** : fichier CSS principal utilisant Tailwind CSS.
- **vite.config.js** : configuration de Vite.
- **tailwind.config.js** : configuration de Tailwind CSS.
- **postcss.config.js** : configuration de PostCSS.
- **eslint.config.js** : configuration d'ESLint.
- **package.json** : fichier de configuration des dépendances et scripts du projet.

## Installation et démarrage

1. Cloner le dépôt :
   ```bash
   git clone <url-du-dépôt>
   cd frontend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Démarrer l'application en mode développement :
   ```bash
   npm run dev
   ```

4. Construire l'application pour la production :
   ```bash
   npm run build
   ```

5. Prévisualiser la build de production :
   ```bash
   npm run preview
   ```

## Évaluation

Cette application sert de base d'évaluation pour implémenter un ensemble de requêtes GraphQL via Apollo.

## Technologies utilisées

- **React** : bibliothèque JavaScript pour construire des interfaces utilisateur.
- **Vite** : outil de build rapide pour les projets front-end.
- **Tailwind CSS** : framework CSS utilitaire.
- **React Router** : bibliothèque pour la gestion des routes dans une application React.
- **Lucide React** : icônes pour React.
- **ESLint** : outil d'analyse de code pour identifier et corriger les problèmes dans le code JavaScript.
- **Apollo Client** : bibliothèque pour gérer les requêtes GraphQL dans une application front-end.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.
