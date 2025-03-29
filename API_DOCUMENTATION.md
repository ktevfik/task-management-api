# API Documentation

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
| GET    | /api/tasks/search | Search tasks with filters (requires authentication) |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/categories | Get all categories (requires authentication) |
| POST   | /api/categories | Create a new category (requires authentication) |
| DELETE | /api/categories/:id | Delete a category (requires authentication) |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tasks/:id/comments | Get all comments for a task (requires authentication) |
| POST   | /api/tasks/:id/comments | Add a comment to a task (requires authentication) |
| PUT    | /api/tasks/:id/comments/:commentId | Update a comment (requires authentication) |
| DELETE | /api/tasks/:id/comments/:commentId | Delete a comment (requires authentication) |

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

#### GET /api/tasks/search
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Query Parameters:
- `title` - Search by title (case-insensitive)
- `description` - Search by description (case-insensitive)
- `status` - Filter by status ('pending', 'in-progress', 'completed')
- `priority` - Filter by priority ('low', 'medium', 'high')
- `startDate` - Start date for due date range (format: YYYY-MM-DD)
- `endDate` - End date for due date range (format: YYYY-MM-DD)

Example: `/api/tasks/search?title=project&status=in-progress&priority=high&startDate=2023-07-01&endDate=2023-07-31`

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
  }
]
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

### Comments

#### POST /api/tasks/:id/comments
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Request:
```json
{
  "text": "This is a comment on the task"
}
```

Response:
```json
{
  "_id": "60f7b0b9e6d3f41a94a3e950",
  "text": "This is a comment on the task",
  "user": {
    "_id": "60f7b0b9e6d3f41a94a3e945",
    "name": "John Doe"
  },
  "task": "60f7b0b9e6d3f41a94a3e943",
  "createdAt": "2023-07-16T15:30:45.678Z",
  "updatedAt": "2023-07-16T15:30:45.678Z"
}
```

#### GET /api/tasks/:id/comments
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
[
  {
    "_id": "60f7b0b9e6d3f41a94a3e950",
    "text": "This is a comment on the task",
    "user": {
      "_id": "60f7b0b9e6d3f41a94a3e945",
      "name": "John Doe"
    },
    "task": "60f7b0b9e6d3f41a94a3e943",
    "createdAt": "2023-07-16T15:30:45.678Z",
    "updatedAt": "2023-07-16T15:30:45.678Z"
  },
  {
    "_id": "60f7b0b9e6d3f41a94a3e951",
    "text": "Another comment on the task",
    "user": {
      "_id": "60f7b0b9e6d3f41a94a3e945",
      "name": "John Doe"
    },
    "task": "60f7b0b9e6d3f41a94a3e943",
    "createdAt": "2023-07-16T15:35:12.345Z",
    "updatedAt": "2023-07-16T15:35:12.345Z"
  }
]
```

#### PUT /api/tasks/:id/comments/:commentId
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Request:
```json
{
  "text": "Updated comment text"
}
```

Response:
```json
{
  "_id": "60f7b0b9e6d3f41a94a3e950",
  "text": "Updated comment text",
  "user": {
    "_id": "60f7b0b9e6d3f41a94a3e945",
    "name": "John Doe"
  },
  "task": "60f7b0b9e6d3f41a94a3e943",
  "createdAt": "2023-07-16T15:30:45.678Z",
  "updatedAt": "2023-07-16T15:40:23.456Z"
}
```

#### DELETE /api/tasks/:id/comments/:commentId
Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
{
  "message": "Comment removed"
}
``` 