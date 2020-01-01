const mongoose  = require('mongoose');

const Schema    = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    firstname: String,
    lastname: String,
    phone: String,
    course: String,
    level:String,
    birthday: String
});

module.exports = mongoose.model('User', userSchema);