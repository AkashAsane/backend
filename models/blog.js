const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
