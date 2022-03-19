// Models
const { Actor } = require('../models/actor.model');

// Utils
const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');


exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, 'No post found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      actor
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
  const newActor = await Actor.create({
    title: title, // dbColumn: valueToInsert
    content: content,
    userId: userId
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});

exports.updateActorPatch = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'title', 'content', 'author'); // { title } | { title, author } | { content }

    const actor = await Actor.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    await actor.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});

exports.deleteActor = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const actor = await Actor.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete post, invalid ID'
      });
      return;
    }
    // Soft delete
    await actor.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
});
