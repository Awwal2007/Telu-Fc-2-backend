const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  personalInformation: {
    fullname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    maritalStatus: { type: String, enum: ['Single', 'Married', 'Other'] },
    nationality: { type: String },
    stateOfOrigin: { type: String },
    localGovernmentArea: { type: String },
    residentialAddress: { type: String },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    nextOfKinName: { type: String },
    nextOfKinPhoneNumber: { type: String }
  },
  positionAppliedFor: {
    headCoach: { type: Boolean, default: false },
    assistantCoach: { type: Boolean, default: false },
    goalkeeperTrainer: { type: Boolean, default: false },
    fitnessTrainer: { type: Boolean, default: false },
    youthDevelopmentCoach: { type: Boolean, default: false },
    technicalAdviser: { type: Boolean, default: false },
    other: { type: String }
  },
  coachingQualifications: {
    highestEducationalQualification: { type: String },
    coachingCertifications: {
      nffDLicense: { type: Boolean, default: false },
      nffCLicense: { type: Boolean, default: false },
      nffBLicense: { type: Boolean, default: false },
      cafLicense: { type: Boolean, default: false },
      fifaLicense: { type: Boolean, default: false },
      other: { type: String }
    },
    issuingBody: { type: String },
    yearObtained: { type: String }
  },
  coachingExperience: {
    yearsOfExperience: { type: Number },
    previousClubs: [
      {
        club: { type: String },
        positionHeld: { type: String },
        period: { type: String }
      }
    ],
    majorAchievements: { type: String }
  },
  technicalSkills: {
    preferredFormations: { type: String },
    specialization: {
      tactics: { type: Boolean, default: false },
      playerDevelopment: { type: Boolean, default: false },
      youthCoaching: { type: Boolean, default: false },
      fitnessConditioning: { type: Boolean, default: false },
      matchAnalysis: { type: Boolean, default: false },
      disciplineTeamManagement: { type: Boolean, default: false }
    },
    abilityToWorkWithYouths: { type: Boolean, default: false },
    abilityToWorkUnderPressure: { type: Boolean, default: false }
  },
  availabilityAndRemuneration: {
    availability: { type: String },
    expectedMonthlySalary: { type: Number },
    dateAvailableToResume: { type: Date }
  },
  referees: [
    {
      name: { type: String },
      position: { type: String },
      phoneNumber: { type: String }
    }
  ],
  declaration: {
    applicantSignature: { type: String },
    date: { type: Date }
  },
  officialUseOnly: {
    applicationReceivedBy: { type: String },
    date: { type: Date },
    remarks: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('coach', CoachSchema);
