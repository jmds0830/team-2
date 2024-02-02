# Team Project

Welcome to our Team Project! This guide is designed to help you get started with setting up the project on your local machine. If you encounter any issues along the way, remember that it's all part of the learning process. Let's get started.

## ✅ Prerequisites

Before you begin, make sure you have the following installed on your system:

- [NodeJS](https://nodejs.org/en)
- npm (Node Package Manager) - Comes with NodeJS, for managing dependencies in the project.

## 🛠️ Installation

Our project consists of two (2) main parts: the **frontend** and the **backend**. You'll need to set up both parts to run the application successfully. Follow these steps to install the necessary dependencies for both parts.

### Frontend

The frontend is what you see in your web browser. It's the interface through which users interact with our application.

1. Open a Terminal from this project.
2. Go into the frontend directory by running the following command

```sh
cd frontend
```

3. Install the dependencies needed for the frontend to run. This might take a few minutes.

```sh
npm install
```

### Backend

The backend is the server side of the application. It handles the logic, database interactions, authentication, and more.

1. Open a new terminal from this project
2. Go into the backend directory.

```sh
cd backend
```

3. Install the dependencies for the backend, similar to how you did for the frontend.

```sh
npm install
```

## 🏃‍♂️ Run the App

With the dependencies installed for both frontend and backend, you're now ready to run the application.

1. Reopen the terminal from this project.
2. Ensure you are in correct directory
3. Start the application of both of the application by running:

```sh
npm run dev
```

> ❗ Make sure both the frontend and backend are running simultaneously for the full functionality of your application. Each part should be run in its own Terminal.

## ⚙️ Setting up the Environment

To run properly, our application might need certain environment variables. These can include database URLs, API keys, or other sensitive information that shouldn't be hard-coded into your project's files.

1. Find the `.env.example` file in both the frontend and backend directories. This file contains a template for the environment variables you need to set.
2. Copy the `.env.example` to a new file named `.env` in the same directory. You can do this with a file explorer or by running the following command in both the frontend and backend directories:

```sh
cp .env.example .env
```

3. Edit the `.env` file you just created, replacing the placeholder values with your actual data. For example, if you have a database URL to connect to, this is where you would specify it.

## 🎯 Branching Strategy

Our project uses a specific branching strategy to streamline development and ensure that our main codebase remains stable. Understanding and following this strategy is crucial for all contributors to facilitate smooth collaboration and integration processes.

### Main Branches

- **main** - This is the primary branch of the repository representing the source of truth for production-ready code. All development code is eventually merged into this branch after thorough testing and review.

- **develop** - This branch serves as an integration branch for features, bug fixes, and other development efforts. It's a staging area before changes are merged into **main** branch.

### Supporting Branches

To support our development workflow, we use the following types of branches:

- **Feature Branches (`feature/*`)** - Branch off from `develop` and merge back into `develop`. Each feature branch is dedicated to the development of a specific feature or enhancement. Name these branches in a way that reflects the feature being developed (e.g., `feature/add-login`).
- **Bugfix Branches (`bugfix/*`)** - Branch off from `develop` and merge back into `develop`. Use these branches for fixing bugs in the development version of the project. Prefix branch names with `bugfix/` followed by a brief description of the fix (e.g., `bugfix/login-error`).

### How to Do It

1. When you're ready to start, you'll make a new branch from `develop` if you're adding a feature or fixing something that's not urgent. If something big is broken in the `main` branch, you might need to make a hotfix branch directly from `main`
2. As you write your code, you keep it on your branch. You can make changes and try things out without affecting anyone else.
3. When you're done, you'll ask the team to look at your code with something called a "Pull Request". This is like saying, "I think I'm done. Can you check my work?" The team will look at your code, maybe suggest some changes, and then your code gets added to the project once everything looks good.

### Tips for Success

- **Keep it short** - Don't keep your branch going for too long. It's easier to work with smaller changes that big ones all at once.
- **Stay up to date** - Sometimes, other people's code will get added to `develop` while you're working. Make sure to update your branch with these changes so your code fits in smoothly.
- **Name clearly** - Use names for your branches that makes it easy for everyone to know what you're working on.

## 🚀 Congrats

You've set up the project on your local machine. You're now ready to start exploring and contributing to the project. If you have any questions or run into issues, do not hesitate to ask for help from your team or search online for solutions. Happy coding!
