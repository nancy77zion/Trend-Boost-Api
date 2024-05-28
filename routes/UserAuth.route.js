const express = require("express");
const { login, register, logout, forgotPassword, resetPassword, resetPasswordPost } = require("../controllers/UserAuth.controller");
const routerManager = express.Router();

routerManager.post('/login', login)
routerManager.post('/register', register)
routerManager.post('/logout', logout)
routerManager.post('/forgot-password', forgotPassword);
routerManager.get('/reset-password/:id/:token', resetPassword);
routerManager.post('/reset-password/:id/:token', resetPasswordPost);

module.exports = routerManager