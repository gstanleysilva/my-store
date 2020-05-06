const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;