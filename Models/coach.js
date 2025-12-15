const mongoose = require('mongoose')

const coachSchema = new mongoose.Schema({
    /* =========================
       SECTION A: Personal Info
    ========================== */
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    //   enum: ["Male", "Female"],
        default: "Male"
    },
    maritalStatus: {
      type: String,
    //   enum: ["Single", "Married", "Other"],
      default: "Single"
    },
    otherMaritalStatus: {
      type: String,
    //   enum: ["Single", "Married", "Other"],
      default: "Single"
    },
    nationality: String,
    state: String,
    lga: String,
    address: String,
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    nextOfKin: String,
    nextOfKinPhone: String,
    nextOfKinRelationship: String,

    /* =========================
       SECTION B: Position
    ========================== */
    position: {
      type: [String], // multiple checkboxes
      required: true,
    },
    otherPosition: String,

    /* =========================
       SECTION C: Qualifications
    ========================== */
    highestEducation: String,
    otherEducation: String,
    certifications: {
      type: [String],
    },
    otherCertification: String,
    institutionAttended: String,
    courseOfStudy: String,
    yearObtained: String,

    /* =========================
       SECTION D: Experience
    ========================== */
    yearsExperience: {
      type: Number,
      min: 0,
      default: 0
    },
    previousClubs: String,
    achievements: String,

    /* =========================
       SECTION E: Skills
    ========================== */
    preferredFormations: String,
    specialization: {
      type: [String],
    },
    workWithYouths: {
      type: String,
    //   enum: ["Yes", "No"],
      default: "No"
    },
    workUnderPressure: {
      type: String,
    //   enum: ["Yes", "No"],
      default: "No"
    },

    /* =========================
       SECTION F: Availability
    ========================== */
    availability: {
      type: String,
    //   enum: ["Full Time", "Part Time"],

    },
    expectedSalary: {type: Number, default: 0},
    startDate: Date,

    /* =========================
       SECTION G: Referees
    ========================== */
    referees: [
      {
        name: String,
        position: String,
        phone: String,
      },
    ],

    /* =========================
       FILE UPLOADS
    ========================== */
    cv: {
      type: String, // file path or URL
      required: true,
    },
    applicationLetter: {
      type: String,
      required: true,
    },
    passportPhoto: {
      type: String,
      required: true,
    },
    certificates: {
      type: [String], // up to 5 files
      validate: [arr => arr.length <= 5, "Max 5 certificates allowed"],
    },

    // functionality

    status:{
        type: String,
        // enum: ["pending", "approved", "rejected"],
        default: "pending"
    },  


    /* =========================
       DECLARATION
    ========================== */
    declaration: {
      type: Boolean,
      required: true,
      validate: {
        validator: v => v === true,
        message: "Declaration must be accepted",
      },
    },
  },
  {
    timestamps: true,
  });

const coachModel = mongoose.model('coach', coachSchema)

module.exports = coachModel