const mongoose = require("mongoose")


const playerSchema = new mongoose.Schema(
  {
    /* ======================
       PERSONAL INFORMATION
    ====================== */
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
    //   enum: ['Male', 'Female'],
      required: true,
    },

    nationality: String,
    state: String,
    lga: String,

    address: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    emergencyPhone: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: true
    },

    /* ======================
       PLAYER DETAILS
    ====================== */
    position: {
      type: [String],
    //   enum: [
    //     'Goalkeeper',
    //     'Center Back',
    //     'Right Back',
    //     'Left Back',
    //     'Defensive Midfielder',
    //     'Central Midfielder',
    //     'Attacking Midfielder',
    //     'Right Winger',
    //     'Left Winger',
    //     'Striker',
    //   ],
      required: true,
    },

    preferredPositions: {
      type: [String],
    },

    jerseyNumber: {
      type: Number,
      min: 1,
      max: 99,
    },

    height: {
      type: Number, // cm
      required: true,
    },

    weight: {
      type: Number, // kg
      required: true,
    },

    dominantFoot: {
      type: String,
    //   enum: ['Right', 'Left', 'Both'],
      required: true,
    },

    specialSkills: {
      type: [String],
    //   enum: [
    //     'Dribbling',
    //     'Shooting',
    //     'Passing',
    //     'Heading',
    //     'Tackling',
    //     'Speed',
    //     'Stamina',
    //     'Vision',
    //     'Free Kicks',
    //     'Penalty Taking',
    //   ],
    },

    /* ======================
       FOOTBALL BACKGROUND
    ====================== */
    previousClubs: String,

    yearsOfExperience: {
      type: String,
    //   enum: ['0-1', '1-3', '3-5', '5+'],
      required: true,
    },

    achievements: String,

    /* ======================
       MEDICAL INFORMATION
    ====================== */
    bloodGroup: {
      type: String,
    //   enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      required: true,
    },

    medicalConditions: String,
    allergies: String,

    /* ======================
       GUARDIAN (FOR MINORS)
    ====================== */
    guardianEmail: {
        type: String        
    },
    guardianName: {
        type: String    
    },
    guardianPhone: {
        type: Number        
    },
    guardianRelationship: {
        type: String        
    },

    /* ======================
       AGREEMENTS
    ====================== */
    agreeToTerms: {
      type: Boolean,
      required: true,
    },

    consentForPhotos: {
      type: Boolean,
      default: false,
    },

    consentForData: {
      type: Boolean,
      required: true,
    },

    /* ======================
       SYSTEM FIELDS
    ====================== */
    status: {
      type: String,
    //   enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },

    isMinor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const playerModel =  mongoose.model('player', playerSchema);

module.exports = playerModel
