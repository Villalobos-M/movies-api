// Models
const { User } = require('../models/user.model');

// Utils
const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllUser = catchAsync(async (req, res, next) => {
   const user = await User.findAll({ where: { status: 'active' } });

   res.status(200).json({
      status: 'success',
      data: {
         user
      }
   });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const user = await User.findOne({
      where: { id: id, status: 'active' }
   });

   if (!user) {
      return next(new AppError(404, 'No user found with the given ID'));
   }

   res.status(200).json({
      status: 'success',
      data: {
         user
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
   const newUser = await User.create({
      title: title, // dbColumn: valueToInsert
      content: content,
      userId: userId
   });

   res.status(201).json({
      status: 'success',
      data: { newUser }
   });
});

exports.updateMoviePatch =  catchAsync(async (req, res) => {
   try {
      const { id } = req.params;
      const data = filterObj(req.body, 'title', 'content', 'author'); // { title } | { title, author } | { content }

      const user = await User.findOne({
         where: { id: id, status: 'active' }
      });

      if (!user) {
         res.status(404).json({
            status: 'error',
            message: 'Cant update post, invalid ID'
         });
         return;
      }

      await user.update({ ...data }); // .update({ title, author })

      res.status(204).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
});

exports.deleteMovie = catchAsync(async (req, res) => {
   try {
      const { id } = req.params;

      const user = await User.findOne({
         where: { id: id, status: 'active' }
      });

      if (!user) {
         res.status(404).json({
            status: 'error',
            message: 'Cant delete post, invalid ID'
         });
         return;
      }
      // Soft delete
      await user.update({ status: 'deleted' });

      res.status(204).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
});
