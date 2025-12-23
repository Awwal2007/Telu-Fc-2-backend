const express = require('express');
const playerApplicationRouter = express.Router();
const {
  createPlayerApplication,
  getPlayerApplications,
  deletePlayerApplication,
  changePlayerStatus
} = require('../Controllers/playerApplicationController');
const { uploadNewsImages } = require('../Config/multer');

// Public routes
playerApplicationRouter.post('/', uploadNewsImages.single("playerPhoto"), createPlayerApplication);

playerApplicationRouter.get('/', getPlayerApplications);
playerApplicationRouter.delete('/:id', deletePlayerApplication);
playerApplicationRouter.put('/:id', changePlayerStatus);

module.exports = playerApplicationRouter;