const express = require("express")
const playerRouter = express.Router()
const upload = require("../Middlewares/upload")
const {createPlayer, getPlayer, changePlayerStatus, deletePlayer} = require("../Controllers/playerController")

playerRouter.post("/", upload.single("photo"), createPlayer)
playerRouter.get("/", getPlayer)
playerRouter.put("/change/status/:id", changePlayerStatus)
playerRouter.delete("/delete/:id", deletePlayer)



module.exports = playerRouter