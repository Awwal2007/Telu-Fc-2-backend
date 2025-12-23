const PlayerApplication = require('../Models/playerApplication');
const mongoose = require('mongoose');


/**
 * CREATE PLAYER APPLICATION
 * POST /api/player-application
 */
const createPlayerApplication = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      age,
      phone,
      email,
      address,
      previousClub,
      currentClub,
      competitions,
      managerName,
      managerContact,
      position,
      leg,
      strongestAbility,
      healthConditions,
      joinClub,
      signContract,
      screening,
      nextOfKinName,
      nextOfKinPhone,
      nextOfKinRelationship,
      injury,
      internationalPassport
    } = req.body;

    const playerPhotoUrl = req.file ? req.file.path : null;

    const existingPlayer = await PlayerApplication.findOne({email})

    if(existingPlayer){
        return res.status(500).json({
            status: "error",
            message: "Email already exists"
        })
    }

    const application = await PlayerApplication.create({
      fullName,
      dateOfBirth: dob,
      age,
      phone,
      email,
      address,
      nextOfKinName,
      nextOfKinPhone,
      nextOfKinRelationship,
      injury,
      internationalPassport,
      previousClub,
      currentClub,
      competitions: Array.isArray(competitions)
      ? competitions
      : competitions
      ? [competitions]
      : [],
      managerName,
      managerContact,
      position,
      strongestLeg: leg,
      strongestAbility,
      healthConditions,
      readyToJoin: joinClub === "Yes",
      readyToSignContract: signContract === "Yes",
      readyForScreening: screening === "Yes",
      playerPhotoUrl
    });

    res.status(201).json({
      status: "success",
      message: "Player application submitted successfully",
      data: application
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};


/**
 * GET PLAYER APPLICATIONS
 * GET /api/player-application
 */
const getPlayerApplications = async (req, res) => {
  try {
    const {
      search,
      position,
      leg,
      readyToJoin,
      page = 1,
      limit = 10,
      sort = "-createdAt"
    } = req.query;

    const query = {};

    // 🔍 Search by name, email or phone
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    // 🎯 Filters
    if (position) query.position = position;
    if (leg) query.strongestLeg = leg;
    if (readyToJoin !== undefined) {
      query.readyToJoin = readyToJoin === "true";
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      PlayerApplication.find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      PlayerApplication.countDocuments(query)
    ]);

    res.status(200).json({
      status: "success",
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

/**
 * DELETE PLAYER APPLICATION
 * DELETE /api/player-application/:id
 */
const deletePlayerApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await PlayerApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        status: "error",
        message: "Player application not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Player application deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};



module.exports = {
    getPlayerApplications,
    deletePlayerApplication,
    createPlayerApplication 
};