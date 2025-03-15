# Real-Time To-Do App

A real-time To-Do list application built with Angular (frontend), Node.js/Express (backend), and MongoDB, featuring real-time data updates using Socket.IO, task locking, JWT-based authentication, and bonus features like task prioritization and due dates.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture & Design Decisions](#architecture--design-decisions)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Real-Time Updates & Task Locking](#real-time-updates--task-locking)
- [Authentication](#authentication)
- [CI/CD Integration](#cicd-integration)
- [Usage](#usage)
- [License](#license)

## Overview

This application is designed to demonstrate a real-time web application with clean separation of concerns and industry best practices. Users can add, edit, delete, and mark tasks as completed. When one user updates the data, all connected clients see the change instantly.

## Features

- **Real-Time Synchronization:** Uses Socket.IO to broadcast CRUD operations across clients.
- **Task Locking:** Only one client can edit a task at a time.
- **Authentication:** JWT-based authentication with login and registration flows.
- **Bonus Features:** Task prioritization (High, Medium, Low) and due dates.
- **Clean Architecture:** Uses design patterns like service pattern (frontend), repository pattern (Mongoose models) and singleton (shared Socket.IO instance).

## Architecture & Design Decisions

### Frontend

- **Service Pattern:**  
  The `TaskService` centralizes all API and Socket.IO communications. This decouples business logic from components.
- **Reactive Programming:**  
  RxJS `BehaviorSubject` is used in `TaskService` to manage the task list and push real-time updates to subscribers.
- **Component-Based UI:**  
  Angular standalone components, with Angular Material for UI components, are used to create a modern, modular user interface.
- **Authentication Flow:**  
  A login and registration flow is provided. An HTTP interceptor automatically attaches JWT tokens to protected API calls.

### Backend

- **Repository Pattern:**  
  Mongoose models (e.g., `Task` and `User`) abstract database interactions, keeping controllers/routes focused on request handling.
- **Singleton for Socket.IO:**  
  A single Socket.IO instance is attached to the Express server and shared via `app.set('io', io)`, ensuring consistent real-time communication.
- **Middleware for Authentication:**  
  Custom middleware protects endpoints by verifying JWT tokens.

## Setup Instructions

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/real-time-todo-app.git
   cd real-time-todo-app/todo-app-backend

**2. Install dependencies:**
   ```bash
   npm install
   ```bash

**3. Create a .env file (at the root of the backend folder) with the following variables:**
```env
MONGO_URI=mongodb://localhost:27017/todo
PORT=3000
JWT_SECRET=your-secret-key
