# Task Management API

A RESTful API for managing tasks, built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete tasks
- Filter tasks by status, priority, and due date
- User authentication and authorization
- Password reset functionality
- Categorize tasks for better organization
- Simple and intuitive API endpoints

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Docker

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Docker and Docker Compose (for Docker setup)

## Installation

### Standard Setup

1. Clone the repository:
```
git clone <repository-url>
cd task-management-api
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```
Note: Update the MONGO_URI with your MongoDB connection string and use a strong JWT_SECRET.

### Docker Setup

1. Clone the repository:
```
git clone <repository-url>
cd task-management-api
```

2. Create a `.env` file in the root directory with your environment variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret
```

3. Run the application using Docker Compose:
```
docker-compose up
```

This will start both the API server and MongoDB. The API will be available at http://localhost:5000.

> **Security Note**: The docker-compose.yml file uses environment variables from your local `.env` file. Never commit the `.env` file or any file containing secrets to version control.

## Running the API

### Development mode (standard setup)
```
npm run dev
```

### Production mode (standard setup)
```
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/users | Register a new user |
| POST   | /api/auth/login | Login a user |
| GET    | /api/users/me | Get user profile (requires authentication) |
| POST   | /api/auth/forgotpassword | Request password reset |
| PUT    | /api/auth/resetpassword/:resettoken | Reset password |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tasks | Get all tasks (requires authentication) |
| POST   | /api/tasks | Create a new task (requires authentication) |
| GET    | /api/tasks/:id | Get a task by ID (requires authentication) |
| PUT    | /api/tasks/:id | Update a task (requires authentication) |
| DELETE | /api/tasks/:id | Delete a task (requires authentication) |
| GET    | /api/tasks/category/:categoryId | Get tasks by category (requires authentication) |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/categories | Get all categories (requires authentication) |
| POST   | /api/categories | Create a new category (requires authentication) |
| DELETE | /api/categories/:id | Delete a category (requires authentication) |

## Request & Response Examples

### Authentication

#### Register User (POST /api/users)
Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "_id": "60f7b0b9e6d3f41a94a3e945",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User (POST /api/auth/login)
Request:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "_id": "60f7b0b9e6d3f41a94a3e945",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tasks

#### GET /api/tasks
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
[
  {
    "_id": "60f7b0b9e6d3f41a94a3e943",
    "title": "Complete project",
    "description": "Finish the task management API project",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2023-07-20T00:00:00.000Z",
    "createdAt": "2023-07-15T12:34:56.789Z",
    "updatedAt": "2023-07-16T09:12:34.567Z",
    "user": "60f7b0b9e6d3f41a94a3e945",
    "category": {
      "_id": "60f7b0b9e6d3f41a94a3e946",
      "name": "Work",
      "color": "#0275d8"
    }
  },
  ...
]
```

#### POST /api/tasks
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Request:
```json
{
  "title": "Read documentation",
  "description": "Read Express.js documentation",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2023-07-25",
  "category": "60f7b0b9e6d3f41a94a3e946"
}
```

Response:
```json
{
  "_id": "60f7b0b9e6d3f41a94a3e944",
  "title": "Read documentation",
  "description": "Read Express.js documentation",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2023-07-25T00:00:00.000Z",
  "createdAt": "2023-07-15T13:45:12.345Z",
  "updatedAt": "2023-07-15T13:45:12.345Z",
  "user": "60f7b0b9e6d3f41a94a3e945",
  "category": {
    "_id": "60f7b0b9e6d3f41a94a3e946",
    "name": "Work",
    "color": "#0275d8"
  }
}
```

### Categories

#### GET /api/categories
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
[
  {
    "_id": "60f7b0b9e6d3f41a94a3e946",
    "name": "Work",
    "color": "#0275d8",
    "user": "60f7b0b9e6d3f41a94a3e945",
    "createdAt": "2023-07-15T10:24:56.789Z",
    "updatedAt": "2023-07-15T10:24:56.789Z"
  },
  {
    "_id": "60f7b0b9e6d3f41a94a3e947",
    "name": "Personal",
    "color": "#5cb85c",
    "user": "60f7b0b9e6d3f41a94a3e945",
    "createdAt": "2023-07-15T10:25:36.789Z",
    "updatedAt": "2023-07-15T10:25:36.789Z"
  }
]
```

#### POST /api/categories
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Request:
```json
{
  "name": "Study",
  "color": "#f0ad4e"
}
```

Response:
```json
{
  "_id": "60f7b0b9e6d3f41a94a3e948",
  "name": "Study",
  "color": "#f0ad4e",
  "user": "60f7b0b9e6d3f41a94a3e945",
  "createdAt": "2023-07-15T13:50:45.678Z",
  "updatedAt": "2023-07-15T13:50:45.678Z"
}
```

#### GET /api/tasks/category/:categoryId
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
[
  {
    "_id": "60f7b0b9e6d3f41a94a3e949",
    "title": "Learn MongoDB",
    "description": "Study MongoDB aggregation",
    "status": "pending",
    "priority": "high",
    "createdAt": "2023-07-15T14:15:32.123Z",
    "updatedAt": "2023-07-15T14:15:32.123Z",
    "user": "60f7b0b9e6d3f41a94a3e945",
    "category": {
      "_id": "60f7b0b9e6d3f41a94a3e948",
      "name": "Study",
      "color": "#f0ad4e"
    }
  },
  ...
]
``` 