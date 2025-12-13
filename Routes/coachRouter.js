const express = require('express')
const coachRouter = express.Router()
const {createCoach, getCoach} = require('../Controllers/coachCountroller')

coachRouter.post('/', createCoach)
coachRouter.get('/', getCoach)


module.exports = coachRouter