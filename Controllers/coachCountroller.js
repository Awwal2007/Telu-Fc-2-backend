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
                message: 'application not sent'
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
                message: 'coach application not found'
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

module.exports = {
    createCoach,
    getCoach
}
