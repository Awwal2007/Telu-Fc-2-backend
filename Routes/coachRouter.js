const express = require('express')
const coachRouter = express.Router()
const {createCoach, getCoach, approveCoach} = require('../Controllers/coachCountroller')
const { uploadCoachFiles } = require('../Config/multer')

coachRouter.post('/', uploadCoachFiles.fields([
  { name: "cv", maxCount: 1 },
  { name: "applicationLetter", maxCount: 1 },
  { name: "passportPhoto", maxCount: 1 },
  { name: "certificate1", maxCount: 1 },
  { name: "certificate2", maxCount: 1 },
  { name: "certificate3", maxCount: 1 },
  { name: "certificate4", maxCount: 1 },
  { name: "certificate5", maxCount: 1 },
])
, createCoach)

coachRouter.get('/', getCoach)
coachRouter.patch('/approve/:id', approveCoach)


module.exports = coachRouter