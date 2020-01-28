var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        isRequired: true
    },
    password: {
        type: String,
        isRequired: true
    }
});

module.exports = mongoose.model('User', UserSchema);