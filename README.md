
#  Backend API


# Introduction



# Features


# Deployment

This project is deployed on [Render](https://render.com/). You can access the deployed server at [https://trend-boost-api.onrender.com](https://trend-boost-api.onrender.com).

# Dependencies

This project uses Node.js, Express, JWT, Bcrypt, Cookie-parser, Nodemailer and Sequelize ORM

# Usage

# clientside testing tool 

- Postman
- Thunder Client


# Routes [https://trend-boost-api.onrender.com](https://trend-boost-api.onrender.com).


The server exposes the following routes:

# https://trend-boost-api.onrender.com/auth
-  post - /register (signup a new user account)
-  post - /login    (login a user)
-  post - /logout   (logout a user)
- post - /forgot-password (forgot password )
- get - /reset-password/:id/:token  (reset password token) 
- post - /reset-password/:id/:token (reset password email)

# https://trend-boost-api.onrender.com/users
-  get - /:id
-  put - /:id
-  delete - /:id

