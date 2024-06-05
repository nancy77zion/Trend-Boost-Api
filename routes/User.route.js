
const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { updateUser, getUser, deleteUser } = require('../controllers/User.controller.js');

const routerManager = express.Router();

routerManager.get('/:id', verifyToken,getUser)
routerManager.put('/:id', verifyToken, updateUser)
routerManager.delete('/:id', verifyToken, deleteUser)


module.exports = routerManager;