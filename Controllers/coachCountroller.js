const coachModel = require("../Models/coach");
const sendSuccessfulApplicationEmail = require("../Services/Nodemailer/sendSuccessfulApplicationEmail");
const sendSuccessfullEmailToAdmin = require("../Services/Nodemailer/sendSuccessfullEmailToAdmin");

const createCoach = async (req, res) => {
    const {fullname, email} = req.body
    // const file = req.file

    try {
        const coach = await coachModel.create(req.body);

        if(!coach){
            return res.status(500).json({
                status: 'error',
                message: 'application not sent'
            })
        }

        const userFirstName = fullname.split(' ')[0]

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
        const coach = await coachModel.find().sort({createdAt: -1});

        if(!coach){
            return res.status(500).json({
                status: 'error',
                message: 'coach application not found'
            })
        }

        return res.status(201).json({
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
