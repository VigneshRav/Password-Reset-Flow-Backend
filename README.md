# 🔐 Password Reset Flow (Backend)

This backend implements a **complete authentication system** with a secure **password reset flow** and **email notifications** using Nodemailer.It exposes REST APIs for:

- **Register** (new user signup)  
- **Login** (JWT-based authentication)  
- **Forgot Password** (request reset link via email)  
- **Reset Password** (set new password with token validation)

---

## ✨ Features:-

- ✅ User Registration with **bcrypt password hashing**

- ✅ User Login with **JWT authentication**

- ✅ **Forgot Password** endpoint to request reset link

- ✅ **Reset Password** endpoint with secure token validation

- ✅ **Nodemailer** integration for email notifications

- ✅ **MongoDB with Mongoose** for persistence schema-based modeling.

- ✅Structured using the **MVC architecture**

- ✅Input validation and error handling

- ✅RESTful API design with clear endpoints

- ✅API tested and documented via **Postman**

- ✅Environment-based configuration

---

## 📦 Technologies Used:

- **Node.js** – JavaScript runtime environment

- **Express.js** – Web Application framework for Node.js

- **MongoDB** – NoSQL database for data storage

- **Mongoose** – ODM for MongoDB

- **Postman** – API testing and documentation

- **dotenv** – For managing environment variables

- **JWT** - For generating a Json Web Token(JWT) upon successful login.

- **bcrypt** - To hash(encrypt) & compare(decrypt) the password.

- **Nodemailer** - For email service.

---

## 🔒 Security Notes:-

- Passwords are hashed using bcrypt.

- Reset tokens are hashed in DB (never stored in plain text).

- Reset tokens expire in 1 hour.

- Old tokens are invalidated when a new reset is requested.

---

## API Endpoints:

| **Method** |           **Endpoint**              |         **Description**           |
| ---------- | ------------------------------------| --------------------------------- |
| POST       | /api/auth/register                  | For Register or Sign Up user      |
| POST       | /api/auth/login                     | For Login or Sign In user         |
| POST       | /api/auth/forgot-password           | For forgot password               |
| POST       | /api/auth/reset-password/:id/:token | For reset password                |

---

## Packages Installed:

- express

- cors

- dotenv

- mongoose

- nodemon

- bcrypt

- jsonwebtoken

- nodemailer

---

## Error Handling & Validation:

- 401 Invalid Credentials ---> When user enters invalid password

- 404 Not Found --–> When user not found

- 500 Internal Server Error --–> For server-side issues.

- Validations are included to ensure data integrity (e.g., required fields, data types).

---

## Postman API Documentation:

- API tested and documented via Postman

- Documentation link: 

---

## 🙋‍♂️ Author & Contact

- Developed by: Vignesh R

- GitHub: @VigneshRav

- Email: vignesh212000@gmail.com

---