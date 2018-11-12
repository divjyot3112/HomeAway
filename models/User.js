const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Create Schema
const UserSchema = new Schema({
    flag: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    school: {
        type: String,
    },
    hometown: {
        type: String,
    },
    languages: {
        type: String,
    },
    gender: {
        type: String,
    },
    properties: [
        {
            address: {
                type: String,
                required: true
            },
            headline: {
                type: String,
                required: true
            },
            descripn: {
                type: String,
                required: true
            },
            ptype: {
                type: String,
                required: true
            },
            minstay: {
                type: Number,
                required: true
            },
            accom: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
            bookingInfo: {
                type: String,
                required: true
            }
        }
    ]
});

// Save the user's hashed password
UserSchema.pre('save', function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}; 

module.exports = User = mongoose.model('user', UserSchema);