Real-Time To-Do App
A real-time To-Do list application built with Angular (frontend), Node.js/Express (backend), and MongoDB, featuring real-time data updates using Socket.IO, task locking, JWT-based authentication, and bonus features like task prioritization and due dates.

Table of Contents
Overview
Features
Architecture & Design Decisions
Setup Instructions
Backend Setup
Frontend Setup
Real-Time Updates & Task Locking
Authentication
CI/CD Integration
Usage
License
Overview
This application is designed to demonstrate a real-time web application with clean separation of concerns and industry best practices. Users can add, edit, delete, and mark tasks as completed. When one user updates the data, all connected clients see the change instantly.

Features
Real-Time Synchronization: Uses Socket.IO to broadcast CRUD operations across clients.
Task Locking: Only one client can edit a task at a time.
Authentication: JWT-based authentication with login and registration flows.
Bonus Features: Task prioritization (High, Medium, Low) and due dates.
Clean Architecture: Uses design patterns like service pattern (frontend), repository pattern (Mongoose models) and singleton (shared Socket.IO instance).
Architecture & Design Decisions
Frontend
Service Pattern:
The TaskService centralizes all API and Socket.IO communications. This decouples business logic from components.
Reactive Programming:
RxJS BehaviorSubject is used in TaskService to manage the task list and push real-time updates to subscribers.
Component-Based UI:
Angular standalone components, with Angular Material for UI components, are used to create a modern, modular user interface.
Authentication Flow:
A login and registration flow is provided. An HTTP interceptor automatically attaches JWT tokens to protected API calls.
Backend
Repository Pattern:
Mongoose models (e.g., Task and User) abstract database interactions, keeping controllers/routes focused on request handling.
Singleton for Socket.IO:
A single Socket.IO instance is attached to the Express server and shared via app.set('io', io), ensuring consistent real-time communication.
Middleware for Authentication:
Custom middleware protects endpoints by verifying JWT tokens.
Setup Instructions
Backend Setup
Clone the repository:

bash
Copy
git clone https://github.com/yourusername/real-time-todo-app.git
cd real-time-todo-app/backend
Install dependencies:

bash
Copy
npm install
Create a .env file (at the root of the backend folder) with the following variables:

env
Copy
MONGO_URI=mongodb://localhost:27017/todo
PORT=3000
JWT_SECRET=your-secret-key
Run the server:

bash
Copy
npm run dev
This should start the backend server (using nodemon, if configured) and connect to MongoDB.

Frontend Setup
Navigate to the frontend folder:

bash
Copy
cd ../frontend
Install dependencies:

bash
Copy
npm install
Run the Angular app:

bash
Copy
ng serve
Open the browser:
Go to http://localhost:4200 and log in or register.

Real-Time Updates & Task Locking
Real-Time:
Socket.IO is integrated in the backend and connected via the TaskService in Angular. Any changes (create, update, delete) broadcast updates to all connected clients.

Task Locking:
When a user starts editing a task, it is locked using an isEditing flag and a unique clientId (generated per client). Other users see the task as locked and cannot edit it until the current user saves or cancels.

Authentication
User Registration & Login:
JWT-based authentication is implemented.
The backend provides /auth/register and /auth/login endpoints.
The frontend includes components for both login and registration.
An HTTP interceptor attaches the JWT token to every request for protected routes.
CI/CD Integration
To showcase CI/CD skills, I have included a GitHub Actions workflow in this repository that:

Builds the project:
Runs both the backend and frontend build commands.
Runs Tests:
Executes unit tests (if present) for both the backend and frontend.
Deploys (optional):
Can be configured to deploy the app to a hosting provider.
Sample GitHub Actions Workflow
Create a file at .github/workflows/ci.yml with the following content:

yaml
Copy
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'

    - name: Install Dependencies (Backend)
      working-directory: ./backend
      run: npm install

    - name: Run Backend Tests
      working-directory: ./backend
      run: npm test

    - name: Install Dependencies (Frontend)
      working-directory: ./frontend
      run: npm install

    - name: Run Frontend Tests
      working-directory: ./frontend
      run: npm run test -- --watch=false

    - name: Build Frontend
      working-directory: ./frontend
      run: ng build --prod
This workflow runs on every push and pull request to the main branch, installing dependencies, running tests, and building the project. You can add additional steps for deployment if desired.

Usage
After setup, navigate to http://localhost:4200.

Login or Register:
Use the provided login and registration pages.
Manage Tasks:
Add, edit (with real-time updates and locking), and delete tasks.
Logout:
Click the logout button to clear your token and be redirected to the login page.
License
This project is licensed under the MIT License.
