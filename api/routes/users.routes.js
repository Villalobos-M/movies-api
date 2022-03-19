const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser
} = require('../controllers/users.controller');

//middleware
const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', createNewUser);

router.post('/login', loginUser);

module.exports = { usersRouter: router };
