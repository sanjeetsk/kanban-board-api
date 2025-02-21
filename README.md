# Kanban Board Backend

## Overview
This is the backend service for the Kanban Board application. It provides API endpoints to manage users, sections, and tasks.

## Features

- **User Authentication**: Users can sign up, log in, and stay authenticated using JWT tokens.
- **Task Management**:
  - Create, update, move, and delete tasks.
  - Assign tasks to users.
  - Set task due dates and descriptions.
- **Section Management**:
  - Predefined sections: Todo, In Progress, Done.
  - Add custom sections.
- **Drag & Drop Support**: Update task status by moving tasks between sections.

## Installation & Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

3. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate and receive a token.

### Users
- `GET /api/auth/count` - Number of members.
- `GET /api/auth/me` - Get a specific user.

### Sections
- `POST /api/section` - Create a new section.
- `GET /api/section` - Get all sections.
- `PUT /api/section/:id` - Update a section.
- `DELETE /api/section/:id` - Delete a section.

### Tasks
- `POST /api/task` - Create a new task.
- `GET /api/task/:section` - Get all tasks according to sectionId.
- `PUT /api/task/:id` - Update a task.
- `DELETE /api/task/:id` - Delete a task.
- `PATCH /api/task/move` - Move task from one to another section.

## Technologies Used
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based authentication
