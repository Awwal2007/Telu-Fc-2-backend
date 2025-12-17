const playerModel = require('../Models/player')

const createPlayer = async (req, res) => {
    const {email} = req.body
    
  try {
    const excistingPlayer = await playerModel.findOne({email})

    if(excistingPlayer){
      return res.status(402).json({
        status: "error",
        message: "Email already exists"
      })
    }

    const player = await playerModel.create(req.body);

    if(!player){
      return res.status(401).json({
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
    console.log(error);    
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

const changePlayerStatus = async (req, res) => {
    const { id } = req.params;
    const {status, message} = req.body;
    

    try {
        // Find the player by ID and update the status
        const player = await playerModel.findByIdAndUpdate(
            id,
            { status: status }, 
            { new: true } // Return the updated document
        );

        if (!player) {
          return res.status(404).json({ status: "error", message: "Player not found", data: [] });
        }

        const info = await playerModel.findById(id)
        const {fullname, email } = info
        // console.log(info);
        

        const userFirstName = fullname?.split(" ")[0] || "Applicant";

        // await adminApplicationStatusEmailToUser(email, userFirstName, status, message)
        // await adminNotificationEmail(email, userFirstName, status)

        res.status(200).json({
            status: "success",
            message: `Player status updated to ${status}`,
            player
        });
    } catch (error) {
        console.error(error);
    }
};


const deletePlayer = async (req, res) => {
  const { id } = req.params
  
  try {
    const player = await playerModel.findByIdAndDelete(id)

    if(!player){
      return res.status(404).json({
        message: 'Player not found', 
        status: "error" 
      });
    }

    res.status(200).json({
      status: "success",
      message: "Player deleted Successfully"
    })
  } catch (error) {
    console.log(error);        
  }
}


module.exports = {
  createPlayer,
  getPlayer,
  changePlayerStatus,
  deletePlayer
}
