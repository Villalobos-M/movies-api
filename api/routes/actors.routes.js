const express = require('express');

const {
   createActor,
   getAllActors,
   getActorById,
   deleteActor,
   updateActorPatch
} = require('../controllers/actors.controller');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.post('/', createActor);

module.exports = { actorsRouter: router };
