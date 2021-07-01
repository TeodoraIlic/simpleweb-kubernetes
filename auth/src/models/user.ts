import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        requied: true
    }
});

module.exports = mongoose.model('User', userSchema);