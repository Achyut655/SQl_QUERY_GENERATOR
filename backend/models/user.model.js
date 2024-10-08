const mongoose = require("../configs/db");

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel
};
