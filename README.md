# Events Management API

This is a backend service for managing events built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

> **University Project**: This project is developed as part of a coursework for Tekup University.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete events.
- **User Authentication**: JWT-based authentication for securing the API.
- **Event Management**: Manage events with details like date, time, description, location, etc.
- **User Roles**: Different roles such as Admin and User with varying access control.
- **Event Registration**: Users can register for events.
- **Search and Filtering**: Search events by title, date, and other filters.
- **Notifications**: Notify users about upcoming events.

## Tech Stack

- **NestJS**: Backend framework.
- **TypeORM**: For interacting with the database.
- **PostgreSQL**: Database for storing event and user data.
- **Passport**: For authentication and JWT token management.
- **Swagger**: API documentation.
- **Docker**: Containerization for development and deployment.

## Getting Started

### Prerequisites

Make sure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/) (v14 or above)
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- [PostgreSQL](https://www.postgresql.org/) (or any other SQL database)
- [Docker](https://www.docker.com/) (Optional, but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/events-management-api.git
   cd events-management-api

   ```

2. Run docker compose:

```bash
  docker compose up --build --detach

```

3. Run migration:

```bash
  npm run migration:generate -- db/migrations/init
  npm run migration:run

```
