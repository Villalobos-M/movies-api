const express = require('express');

// Controllers
// import { getAllPosts } from '../controllers/posts.controller'
const {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMoviePatch,
	deleteMovie,
} = require('../controllers/movies.controller');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createMovie);

router.patch('/:id', updateMoviePatch);

router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
// module.exports = router // export default router
