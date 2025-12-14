const coachModel = require("../Models/coach");
const sendSuccessfulApplicationEmail = require("../Services/Nodemailer/sendSuccessfulApplicationEmail");
const sendSuccessfullEmailToAdmin = require("../Services/Nodemailer/sendSuccessfullEmailToAdmin");

const createCoach = async (req, res) => {
    const {fullname, email} = req.body
    const files = req.files;
    
    try {
        if (!req.files?.cv || !req.files?.applicationLetter || !req.files?.passportPhoto) {
            return res.status(400).json({
                status: "error",
                message: "Required documents missing"
            });
        }

        const coach = await coachModel.create({...req.body,
            cv: files?.cv?.[0]?.path,
            applicationLetter: files?.applicationLetter?.[0]?.path,
            passportPhoto: files?.passportPhoto?.[0]?.path,
            certificates: [
                files?.certificate1?.[0]?.path,
                files?.certificate2?.[0]?.path,
                files?.certificate3?.[0]?.path,
                files?.certificate4?.[0]?.path,
                files?.certificate5?.[0]?.path,
            ].filter(Boolean)
        });

        if(!coach){
            return res.status(500).json({
                status: 'error',
                message: 'application not sent',
                data: []
            })
        }

        const userFirstName = fullname?.split(" ")[0] || "Applicant";


        await sendSuccessfulApplicationEmail(email, userFirstName)
        await sendSuccessfullEmailToAdmin(email, userFirstName)

        return res.status(201).json({
            status: 'success',
            message: 'application sent successfully',
            data: coach
        })        

    } catch (error) {
        console.log(error);        
    }
}

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

const approveCoach = async (req, res) => {
    const { id } = req.params; // Destructure the ID from params
    const {status} = req.body; // Expecting the new status from request body


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

        res.status(200).json({
            message: `Coach status updated to ${status}`,
            coach
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    createCoach,
    getCoach,
    approveCoach
}
