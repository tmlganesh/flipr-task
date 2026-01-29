# Intern Task Solution: Agency Portfolio and Admin System

This repository contains the complete source code for the intern task. It is a full stack web application built to showcase an agency’s work and provide an admin system to manage all content easily.

## How this was built

The idea was to create something that feels like a real product, not just a demo. The project is split into two clear parts: a frontend for users and a backend for data and management.

### Frontend
The frontend is built using **React** with **Vite** for fast development. **Tailwind CSS** is used to style the entire site. The landing page follows the given reference design and is fully responsive.

The **Projects** and **Clients** sections are dynamic. They automatically adjust based on how much data is in the database. Whether there are two items or twenty, the layout stays clean and balanced.

The UI is divided into small reusable components such as `Hero`, `Navbar`, `Footer` and section blocks. This keeps the code readable and easy to maintain.

### Backend
The backend is built using **Node.js** and **Express**. **MongoDB** is used as the database with **Mongoose** for schema handling.

The server follows a clean structure where each feature is separated into models, controllers and routes. For example, all logic related to clients lives in one place, and the same goes for projects, contacts and subscribers.

File uploads are handled using **Multer** so the admin can upload images directly. Images are stored on the server and linked in the database.

## Features implemented

*   The landing page loads real data from the database for projects and clients.
*   An admin dashboard allows adding and managing projects and clients without touching the code.
*   The contact form and newsletter form are fully functional and store data in the database.
*   Images can be uploaded directly from the admin panel.

## Tech stack

### Frontend
*   React
*   Vite
*   Tailwind CSS
*   Axios
*   React Router

### Backend
*   Node.js
*   Express
*   MongoDB
*   Mongoose
*   Multer
*   Sharp

### Tools
*   Git
*   npm

## Getting started

To run this project locally, make sure Node.js is installed.

1.  **Clone the repository and move into it.**

2.  **Go to the Backend folder and install dependencies.**
    *   Create a `.env` file in the `Backend` folder and add your MongoDB connection string and a port.
    *   Start the backend server. It will run on port 5000 by default.

3.  **Open a new terminal, go to the Frontend folder and install dependencies.**
    *   Start the frontend development server. The app will run on a local port such as 5173.

## Deployment

We have created a specific guide for deploying this application. Please refer to [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on how to deploy to Vercel (Frontend) and Render (Backend).

## Project structure

```text
Intern-task
├── Backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── uploads
│   └── index.js
│
└── Frontend
    ├── public
    └── src
        ├── components
        ├── pages
        └── assets
```

## Final note

This project is built with a focus on clean structure and practical use. The landing page always looks professional, and the admin panel makes content management simple. The goal was to build something that feels like a real-world application, not just an assignment.
