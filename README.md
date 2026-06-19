# 🚀 Freelance Job Board API

A RESTful backend API built using **Node.js, Express.js, MongoDB, and Mongoose** that powers a freelance job marketplace. The project demonstrates complete **CRUD operations**, **JWT authentication**, **role-based access control**, and a clean MVC architecture.

---

# 📌 Project Overview

The Freelance Job Board API allows clients to post freelance jobs and freelancers to browse and apply for them. It is designed as a backend-focused project and can be tested entirely using **Postman**.

This project showcases:

* REST API development
* MongoDB database design
* JWT authentication
* CRUD operations
* Input validation
* Secure password hashing
* API testing with Postman

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* bcrypt
* express-validator
* Postman

---

# 📂 Project Structure

```
freelance-job-board-api/

│── app.js
│── package.json
│── .env

├── config/
│      db.js

├── models/
│      User.js
│      Job.js
│      Application.js

├── controllers/
│      user.js
│      job.js
│      application.js

├── routes/
│      user.js
│      job.js
│      application.js

├── middleware/
│      auth.js

├── validators/

└── README.md
```

---

# 👥 User Roles

### Client

* Register and login
* Create job postings
* Update and delete jobs
* View applications
* Accept or reject applicants

### Freelancer

* Register and login
* Browse available jobs
* Apply for jobs
* Update profile
* View submitted applications

---

# 📡 Planned API Endpoints

## Authentication APIs

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| POST   | `/users/register` | Register a new user        |
| POST   | `/users/login`    | Login user                 |
| GET    | `/users/profile`  | Get logged-in user profile |
| PUT    | `/users/profile`  | Update profile             |
| DELETE | `/users/profile`  | Delete account             |

---

## User APIs

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| PUT    | `/users/:id` | Update user    |
| DELETE | `/users/:id` | Delete user    |

---

## Job APIs

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| POST   | `/jobs`     | Create a job  |
| GET    | `/jobs`     | Get all jobs  |
| GET    | `/jobs/:id` | Get job by ID |
| PUT    | `/jobs/:id` | Update job    |
| DELETE | `/jobs/:id` | Delete job    |

---

## Application APIs

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/applications`     | Apply for a job           |
| GET    | `/applications`     | Get all applications      |
| GET    | `/applications/:id` | Get application by ID     |
| PUT    | `/applications/:id` | Update application status |
| DELETE | `/applications/:id` | Delete application        |

---

# 🔍 Additional Features

* Search jobs by title
* Filter jobs by skill
* Filter jobs by budget
* Filter jobs by status
* Sort jobs by budget or date
* Pagination support
* Role-based authorization
* Protected routes using JWT
* Password hashing with bcrypt
* Centralized error handling
* Input validation using express-validator

---

# 🗄️ Database Collections

### Users

```
{
  name,
  email,
  password,
  role
}
```

---

### Jobs

```
{
  title,
  description,
  budget,
  skills,
  clientId,
  status
}
```

---

### Applications

```
{
  jobId,
  freelancerId,
  proposal,
  status
}
```

---

# 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

Protected routes require:

```
Authorization: Bearer <token>
```

Passwords are securely hashed using **bcrypt** before being stored in the database.

---

# 🧪 API Testing

All endpoints are tested using **Postman**.

A Postman collection can be imported to test:

* User authentication
* CRUD operations
* Protected routes
* Search and filtering
* Application management

---

# ▶️ Running the Project

### Install dependencies

```
npm install
```

### Create a `.env` file

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the server

```
npm run dev
```

---

# 🎯 Learning Objectives

This project demonstrates practical knowledge of:

* REST API design
* Express routing
* MongoDB integration
* Mongoose models
* Authentication and authorization
* CRUD operations
* Middleware
* MVC architecture
* Postman API testing
* Backend development best practices

---

# 🚀 Future Enhancements

* Company profiles
* Resume uploads
* Bookmark jobs
* Saved searches
* Email notifications
* Admin dashboard
* Employer analytics
* Freelancer ratings and reviews
* Job categories and tags
* Swagger/OpenAPI documentation

---

# 👩‍💻 Author

Developed as a backend portfolio and academic project to demonstrate full-stack backend development concepts using the MERN ecosystem.
