const coachModel = require("../Models/coach");
const adminApplicationStatusEmailToUser = require("../Services/Nodemailer/statusEmail/adminApplicationStatusEmailToUser");
const sendSuccessfulApplicationEmail = require("../Services/Nodemailer/applicationEmail/sendSuccessfulApplicationEmail");
const sendSuccessfullEmailToAdmin = require("../Services/Nodemailer/applicationEmail/sendSuccessfullEmailToAdmin");
const adminNotificationEmail = require("../Services/Nodemailer/statusEmail/adminNotificationEmail");
const uploadToSupabase = require("../Utils/uploadToSupabase");

const createCoach = async (req, res) => {
  const { fullname, email } = req.body;
  const files = req.files;

  try {
    if (!files?.cv || !files?.applicationLetter || !files?.passportPhoto) {
      return res.status(400).json({
        status: "error",
        message: "Required documents missing",
      });
    }

    const cvUrl = await uploadToSupabase(files.cv[0], "cv");
    const letterUrl = await uploadToSupabase(files.applicationLetter[0], "letters");
    const passportUrl = await uploadToSupabase(files.passportPhoto[0], "photos");

    const certificateFiles = [
        files?.certificate1?.[0],
        files?.certificate2?.[0],
        files?.certificate3?.[0],
        files?.certificate4?.[0],
        files?.certificate5?.[0],
    ].filter(Boolean);

    const certificateUrls = await Promise.all(
        certificateFiles.map(file => uploadToSupabase(file, "certificates"))
    );

    const coach = await coachModel.create({
      ...req.body,
      cv: cvUrl,
      applicationLetter: letterUrl,
      passportPhoto: passportUrl,
      certificates: certificateUrls,
    });

    const userFirstName = fullname?.split(" ")[0] || "Applicant";

    await sendSuccessfulApplicationEmail(email, userFirstName);
    await sendSuccessfullEmailToAdmin(userFirstName);

    return res.status(201).json({
      status: "success",
      message: "application sent successfully",
      data: coach,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};



const getCoach = async (req, res) => {
    try {
        const coach = await coachModel.find();

        if (coach.length === 0) {
            return res.status(500).json({
                status: 'error',
                message: 'coach application not found',
                data: []
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'coach application fetch successfully',
            data: coach
        })        

    } catch (error) {
        console.log(error);        
    }
}

const changeCoachStatus = async (req, res) => {
    const { id } = req.params;
    const {status, message} = req.body;
    console.log(`Email message ${message}`);
    

    try {
        // Find the coach by ID and update the status
        const coach = await coachModel.findByIdAndUpdate(
            id,
            { status: status }, 
            { new: true } // Return the updated document
        );

        if (!coach) {
            return res.status(404).json({ message: "Coach not found", data: [] });
        }

        const info = await coachModel.findById(id)
        const {fullname, email } = info
        // console.log(info);
        

        const userFirstName = fullname?.split(" ")[0] || "Applicant";

        await adminApplicationStatusEmailToUser(email, userFirstName, status, message)
        await adminNotificationEmail(email, userFirstName, status)

        res.status(200).json({
            status: "success",
            message: `Coach status updated to ${status}`,
            coach
        });
    } catch (error) {
        console.error(error);
    }
};


const deleteCoach = async (req, res) => {
    const { id } = req.params
    
    try {
        const coach = await coachModel.findByIdAndDelete(id)

        if(!coach){
            return res.status(404).json({
                message: 'Coach not found', 
                status: "error" 
            });
        }

        res.status(200).json({
            status: "success",
            message: "Coach deleted Successfully"
        })
    } catch (error) {
        console.log(error);        
    }
}


module.exports = {
    createCoach,
    getCoach,
    changeCoachStatus,
    deleteCoach
}
