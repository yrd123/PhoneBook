const {mongoose} = require('../connection')

const Entry = mongoose.model('Entry', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 12,
        unique:true
    }    
}));


exports.Entry = Entry;