const mongoose = require('mongoose')

const coachSchema = new mongoose.Schema({
    // SECTION A: Personal Information
    fullname: { type: String, required: true },
    dob: String,
    gender: String,
    maritalStatus: String,
    nationality: String,
    state: String,
    lga: String,
    address: String,
    phone: { type: String, required: true },
    isApproved: { type: String },
    email: { type: String, required: true },
    nextOfKin: String,
    nextOfKinPhone: String,

    // SECTION B: Position Applied For
    position: [String],
    otherPosition: String,

    // SECTION C: Coaching Qualifications
    highestEducation: String,
    otherEducation: String,
    certifications: [String],
    otherCertification: String,
    issuingBody: String,
    yearObtained: String,

    // SECTION D: Coaching Experience
    yearsExperience: Number,
    previousClubs: String,
    achievements: String,

    // SECTION E: Technical & Professional Skills
    preferredFormations: String,
    specialization: [String],
    workWithYouths: String,
    workUnderPressure: String,

    // SECTION F: Availability & Remuneration
    availability: String,
    expectedSalary: Number,
    startDate: Date,

    // SECTION G: Referees
    referee1Name: String,
    referee1Position: String,
    referee1Phone: String,
    referee2Name: String,
    referee2Position: String,
    referee2Phone: String,

    // SECTION H: Declaration
    declaration: { type: Boolean, default: false },

}, { timestamps: true });

const coachModel = mongoose.model('coach', coachSchema)

module.exports = coachModel