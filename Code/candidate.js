const mongoose = require('mongoose');

// Create the Schema for a Candidate
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // This field is mandatory
        trim: true       // Trims whitespace from the ends
    },
    email: {
        type: String,
        required: true,
        unique: true,   // Ensures email addresses are unique in the database
        trim: true,
        lowercase: true // Converts email to lowercase to avoid case-sensitive issues
    },
    rating: {
        type: Number,
        default: 0,     // Default rating when none is provided
        min: 0,         // Minimum rating value
        max: 5          // Maximum rating value
    },
    skills: {
        type: [String], // An array of strings to hold skills
        default: []     // Default to an empty array
    },
    interviewDate: {
        type: Date,
        default: Date.now // Default to the current date and time
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'interviewed', 'hired', 'rejected'], // Enum to restrict the values of status
        default: 'pending'
    }
});

// Create the model from the schema
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
