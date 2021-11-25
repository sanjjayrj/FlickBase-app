const mongoose = require('mongoose');
require('dotenv').config();

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 100,
        required: [true, 'You need a category name']
    },
    data: {
        type: Date,
        dafault: Date.now
    }
})

const Category = mongoose.model('Category', categoriesSchema);
module.exports = { Category };