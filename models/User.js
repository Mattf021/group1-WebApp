const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});

//Hashing the password before saving it
userSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password') || user.isNew) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    }
    next();
})
const User = mongoose.model('User', userSchema);
module.exports = User;