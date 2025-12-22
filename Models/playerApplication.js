const mongoose = require('mongoose');

const playerApplicationSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 16,
    max: 45
  },
  phone: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  address: {
    type: String,
    required: true
  },
  playerPhotoUrl: {
    type: String
  },
  nextOfKinName: {
    type: String,
    required: true
  },
  nextOfKinPhone: {
    type: Number,
    required: true
  },
  nextOfKinRelationship: {
    type: String,
    required: true
  },

  // Football Background
  previousClub: String,
  currentClub: String,
  competitions: [String],

  // Manager / Coach
  managerName: String,
  managerContact: String,

  // Player Profile
  position: String,
  strongestLeg: {
    type: String,
    enum: ["Left", "Right"]
  },
  strongestAbility: String,
  injury: String,

  // Health
  healthConditions: String,

  // Commitment
  readyToJoin: {
    type: Boolean,
    required: true
  },
  readyForScreening: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

const PlayerApplication = mongoose.model("PlayerApplication", playerApplicationSchema);

module.exports = PlayerApplication;