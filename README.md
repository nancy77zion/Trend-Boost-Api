## Backend API

### Introduction


### Features


### Deployment

This project is deployed on [Render](https://render.com/). You can access the deployed server at [https://trend-boost-api.onrender.com](https://trend-boost-api.onrender.com).

### Dependencies

This project uses the following technologies and libraries:
- Node.js
- Express
- JWT (JSON Web Token)
- Bcrypt
- Cookie-parser
- Nodemailer
- Sequelize ORM

### Usage

#### Client-side Testing Tools

- Postman
- Thunder Client

### Routes

The server exposes the following routes:

#### Authentication Routes: [https://trend-boost-api.onrender.com/auth](https://trend-boost-api.onrender.com/auth)
- **POST** - `/register` (Signup a new user account)
- **POST** - `/login` (Login a user)
- **POST** - `/logout` (Logout a user)
- **POST** - `/forgot-password` (Request password reset)
- **GET** - `/reset-password/:id/:token` (Verify password reset token)
- **POST** - `/reset-password/:id/:token` (Reset password)

#### User Routes: [https://trend-boost-api.onrender.com/users](https://trend-boost-api.onrender.com/users)
- **GET** - `/:id` (Retrieve user information)
- **PUT** - `/:id` (Update user information)
- **DELETE** - `/:id` (Delete user account)

### Testing Registration on Postman

- **Method**: POST
- **URL**: [https://trend-boost-api.onrender.com/auth/register](https://trend-boost-api.onrender.com/auth/register)
- **JSON Body**:
  ```json
  {
    "userName": "username",
    "userEmail": "user-real-email",
    "userPassword": "password",
    "confirmedPassword": "password"
  }
