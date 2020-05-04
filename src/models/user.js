const mongoose = require('mongoose');
const validator = require('validator');
const passwordValidator = require('password-validator');

const passSchema = new passwordValidator();
passSchema.is().min(8)     // Minimum length 8
    .is().max(20)          // Maximum length 100
    .has().uppercase()     // Must have uppercase letters
    .has().lowercase()     // Must have lowercase letters
    .has().digits()        // Must have digits
    .has().not().spaces(); // Should not have spaces

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: function (email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email not valid.');
            }
            return email;
        }
    },
    telephone: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: function (phone) {
            if (!validator.isMobilePhone(phone)) {
                throw new Error('The telephone is not valid.');
            }
            return phone;
        }
    },
    password: {
        type: String,
        required: true,
        validate: function (pass) {
            if (!passSchema.validate(pass)) {
                throw new Error('Password invalid');
            }
            return pass;
        }
    },
    picture: String,
    address: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            required: true,
            type: String
        }
    }]
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const user = this;
    //cria objeto apenas com dados do model e nao metodos do mongoose
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;
    return userObject;
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;