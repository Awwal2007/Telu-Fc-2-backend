const express = require("express")
const playerRouter = express.Router()

const {createPlayer, getPlayer, changePlayerStatus, deletePlayer} = require("../Controllers/playerController")

playerRouter.post("/", createPlayer)
playerRouter.get("/", getPlayer)
playerRouter.put("/change/status/:id", changePlayerStatus)
playerRouter.delete("/delete/:id", deletePlayer)



module.exports = playerRouter