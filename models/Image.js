const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
    propertyId: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
});

module.exports = Image = mongoose.model('image', ImageSchema);