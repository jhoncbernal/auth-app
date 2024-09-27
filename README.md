# Technical Assessment - Full Stack Application

## Overview

Welcome to the technical assessment repository! This project has been built to demonstrate my breadth of knowledge, experience, and attention to detail in a real-world development scenario. It includes a user authentication system with login, registration, and a dashboard, built using modern web technologies. The primary focus of this project was on architecture, code quality, security, and maintainability.

### Objective

This application showcases the following:

- A secure user authentication system (login, registration).
- A scalable architecture for future extensibility.
- A UI that handles user sessions and displays contextual content.
- A well-documented codebase that is easy for junior developers to contribute to.
- Best practices for coding standards, security.

### Features

- **Dashboard Page (Home)**
  - If the user is logged in:
    - Displays a welcome message: “Welcome back, [Name]”.
    - Includes a "Log out" button.
  - If the user is not logged in:
    - Automatically redirects to the login page.
- **Login Page**
  - A form that accepts email and password.
  - Includes a link to the registration page.
  - Shows an error message if email or password is incorrect.
  - Redirects to the dashboard upon successful login.
- **Registration Page**
  - A form that accepts name, email, password, and password confirmation.
  - Validates that all fields are required.
  - Ensures the email is formatted correctly.
  - Verifies that passwords match and meet security requirements.
  - Redirects to the login page upon successful registration.

---

## Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [pnpm](https://pnpm.io/) (used as the package manager)

### Cloning the Repository

```bash
git clone https://github.com/jhoncbernal/auth-app
cd auth-app
```

### Running the Application

This project includes a `docker-compose.yml` file to ensure that junior developers can easily set up the development environment and run the app without external help.

1. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

2. Create a Docker network:

   ```bash
   docker network create -d bridge npm
   ```

3. Set up MongoDB:

   ```bash
   docker compose -f "docker-compose-mongo.yml" up -d --build
   ```

4. Run Prisma migrations to set up the database schema:

   ```bash
   pnpm run prisma
   ```

5. Build and start the application with Docker:

   ```bash
   docker compose build && docker compose up -d
   ```

   or

   ```bash
   pnpm run dev
   ```

6. Optionally, clean up Docker images and data to free up space:

   ```bash
   docker builder prune -f && docker image prune -f
   ```

### Application Structure

The application follows a modular design using React, TypeScript, and Prisma for better scalability and maintainability. Each component is organized in an atomic design pattern (atoms, molecules, organisms), ensuring reusability and ease of modification.

---

## Features and Considerations

### 1. **Architecture and Scalability**

- **Atomic Design Pattern**: Components are built using a clear structure (atoms, molecules, organisms), ensuring that UI components are reusable across different parts of the app and in future projects.
- **Security**: Passwords are encrypted, and security practices like validation, error handling, and input sanitization are implemented.Email verification
- **Future Extensibility**: The app is structured in a way that can easily support additional features such as Single Sign-On (SSO) and multi-factor authentication.

### 2. **Security and Authentication**

- **Password Policies**: Passwords are validated for length, complexity, and sequential patterns. Error messages are provided for user guidance.
- **Authentication**: The app includes login and registration flows, with secure password storage using best practices.
- **Authorization**: Only authenticated users can access the dashboard, and users are redirected to the login page if they are not logged in.

### 3. **Testing and Code Quality**

- **Linting**: The project follows strict coding standards using linting and formatting tools to ensure consistency and quality.

  ```bash
  pnpm test
  ```

### 4. **Accessibility and User Experience**

- **Responsive Design**: The UI is fully responsive and adapts to different screen sizes and devices.
- **Accessibility**: The app follows web accessibility guidelines to ensure a seamless experience for all users.

### 5. **Operational Considerations**

- **Logging and Monitoring**: The app can be easily integrated with logging and monitoring tools to track errors and performance in production environments.
- **Error Handling**: Clear error messages are provided in the UI for invalid inputs and failed actions (e.g., incorrect login credentials).

---

## Common Tasks

### Linting and Formatting

To ensure the code follows the required coding standards, use:

```bash
pnpm lint
pnpm format
```

### Stopping the Application

To stop and remove all Docker containers:

```bash
docker compose down
```
local env
```bash
Ctl + c
```
---

### Deployed app

![Pelmorex](http://77.237.232.197:1234/login)


## Conclusion

This project has been structured with scalability, security, and ease of use in mind. The codebase is designed to be easily maintained and extended, allowing junior developers to contribute without requiring much assistance.

For future improvements, we can explore adding features like Single Sign-On (SSO), enhanced security measures like rate limiting, and support for localization.

Should you have any questions or require further clarification, please don't hesitate to reach out!

## Images
![Pelmorex](https://github.com/user-attachments/assets/05a6eae0-6d1b-420c-b2ba-89d9d54876b3)


