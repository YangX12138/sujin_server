var mongoose = require('mongoose');

var CoverSchema = new mongoose.Schema({
    current_time: {
        type: Date,
        default: Date.now
    },
    bg_img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cover', CoverSchema);