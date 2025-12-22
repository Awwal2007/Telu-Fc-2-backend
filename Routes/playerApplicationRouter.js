const express = require('express');
const playerApplicationRouter = express.Router();
const {
  createPlayerApplication,
  getPlayerApplications,
  deletePlayerApplication
} = require('../Controllers/playerApplicationController');
const { uploadNewsImages } = require('../Config/multer');

// Public routes
playerApplicationRouter.post('/', uploadNewsImages.single("playerPhoto"), createPlayerApplication);

playerApplicationRouter.get('/', getPlayerApplications);
playerApplicationRouter.delete('/:id', deletePlayerApplication);

module.exports = playerApplicationRouter;