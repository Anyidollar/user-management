# User Management System

This is a **RESTful API** built with **Node.js**, **TypeScript**, and **SQLite** for managing users, posts, and addresses. It follows best practices for backend development, including **validation**, **error handling**, and **modularization**.

---

## Features

- **User Management**:

  - Create, retrieve, update, and delete users.
  - Paginated listing of users.
  - Retrieve user details, including their address.

- **Address Management**:

  - Each user can have only one address.
  - Create, retrieve, and update user addresses.

- **Post Management**:

  - Create and retrieve posts for a specific user.
  - Delete posts by their ID.

- **Database**:

  - Uses **SQLite** with **Sequelize** as the ORM for database interactions.

- **Validation**:

  - Proper input validation for all API endpoints.

- **Error Handling**:

  - Robust error handling with appropriate HTTP status codes and user-friendly messages.

- **Testing**:
  - Comprehensive API testing using **Jest** and **Supertest**.

---

## Technologies Used

- **Backend**: Node.js, TypeScript
- **Web Framework**: Express.js
- **Database**: SQLite
- **ORM**: Sequelize
- **Testing**: Jest, Supertest
- **Validation**: Express Validator
- **Environment Management**: Dotenv

---

## Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js** (v16 or higher)
2. **npm** (Node Package Manager)
3. **SQLite** (for the database)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management.git
   cd user-management
   ```

## Live Deployed API

🔗 **Base URL:** [https://user-management-b5gt.onrender.com]

## Postman Documentation:
[https://lunar-capsule-136069.postman.co/workspace/New-Team-Workspace~bcfb6f56-283b-49ed-9b93-bbe4a1396f0f/collection/29787712-923b18e0-3ca5-4302-ae73-6c5d8d8d9691?action=share&creator=29787712]

