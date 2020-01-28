var mongoose = require('mongoose')

/**
 * const data = {
    id: '123',
    date: '八月 15, 2015',
    title: '人总有认怂的时候',
    summary: '1、 唐大柱，将近一米八的大个，身体敦实得很，虽然生在南方，却浓眉大眼，一副北方人的身段和相貌。 ...',
    letter_count: 152,
    view_count: 100,
    likes_count: 211 ,
    content: ''
}
 */

var ArticleSchema = new mongoose.Schema({
    currentTime: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    view_count: {
        type: Number,
        default: 0
    },
    likes_count: {
        type: Number,
        default: 0
    },
    letter_count: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        isRequired: true
    },
    thumb: {
        type: String,
        isRequired: true
    },
    music: {
        type: String,
        isRequired: true
    },
    tags: {
        type: Array,
        default: []
    },
    music_name: {
        type: String,
        isRequired: true
    }
})

module.exports =  mongoose.model('Article', ArticleSchema)
