const playerModel = require('../Models/player')

const createPlayer = async (req, res) => {
    console.log(req.body);
    
  try {
    const player = await playerModel.create(req.body);

    if(!player){
        return res.status(420).json({
            status: "error",
            message: "Player not created"
        })
    }

    res.status(201).json({
      status: "success",
      message: 'Player registered successfully',
      data: player,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await playerModel.find();
    if(!player){
        return res.status(404).json({
            status : "error",
            message: "No player found"
        })
    }
    res.status(200).json({
      status: "success",
      message: 'All player fetched',
      data: player,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


module.exports = {
    createPlayer,
    getPlayer
}
