// Models
const { Movie } = require('../models/movie.model');

// Utils
const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
   const movies = await Movie.findAll({ where: { status: 'active' } });

   res.status(200).json({
      status: 'success',
      data: {
         movies
      }
   });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const movie = await Movie.findOne({
      where: { id: id, status: 'active' }
   });

   if (!movie) {
      return next(new AppError(404, 'No movie found with the given ID'));
   }

   res.status(200).json({
      status: 'success',
      data: {
         movie
      }
   });
});

exports.createActor = catchAsync(async (req, res, next) => {
   const { title, content, userId } = req.body;

   if (!title || !content || !userId) {
      return next(
         new AppError(400, 'Must praaovide a valid title, content and userId')
      );
   }
   const newMovie = await Movie.create({
      title: title, // dbColumn: valueToInsert
      content: content,
      userId: userId
   });

   res.status(201).json({
      status: 'success',
      data: { newMovie }
   });
});

exports.updateMoviePatch = catchAsync(async (req, res) => {
   try {
      const { id } = req.params;
      const data = filterObj(req.body, 'title', 'content', 'author'); // { title } | { title, author } | { content }

      const movie = await Movie.findOne({
         where: { id: id, status: 'active' }
      });

      if (!movie) {
         res.status(404).json({
            status: 'error',
            message: 'Cant update post, invalid ID'
         });
         return;
      }

      await movie.update({ ...data }); // .update({ title, author })

      res.status(204).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
});

exports.deleteMovie =catchAsync(async (req, res) => {
   try {
      const { id } = req.params;

      const movie = await Movie.findOne({
         where: { id: id, status: 'active' }
      });

      if (!movie) {
         res.status(404).json({
            status: 'error',
            message: 'Cant delete post, invalid ID'
         });
         return;
      }
      // Soft delete
      await movie.update({ status: 'deleted' });

      res.status(204).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
});
