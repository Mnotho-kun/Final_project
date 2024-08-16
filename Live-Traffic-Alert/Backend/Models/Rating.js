const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: Number,
    reasoning: String,
}, { timestamps: true });

module.exports = mongoose.model('Rating', RatingSchema);
