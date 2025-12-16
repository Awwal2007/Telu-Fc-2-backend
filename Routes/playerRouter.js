const express = require("express")
const playerRouter = express.Router()

const {createPlayer, getPlayer} = require("../Controllers/playerController")

playerRouter.post("/", createPlayer)
playerRouter.get("/", getPlayer)



module.exports = playerRouter