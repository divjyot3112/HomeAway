const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const path = require('path');

// Bring in passport strategy
require('../../config/passport')(passport)

// User Model
const User = require('../../models/User');
const Image = require('../../models/Image');

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login'/*, passport.authenticate('jwt', { session: false })*/, (req, res) => {
    console.log('Inside Login Post Request');
    console.log(req.body.email, req.body.password);
    
    User.findOne({ email: req.body.email, password: req.body.password, flag: req.body.flag })
        .then(user => {
            if(user) { 
                res.cookie('cookie', req.body.email, {maxAge: 900000, httpOnly: false, path : '/'});
                res.status(200).json(user); 
                console.log(cookie.load('cookie'));
            }
            else { res.status(404).send(); }
        })
        .catch(err => { console.log(err); res.status(400).send()})
});

// @route   POST api/users/signup
// @desc    Signup User
// @access  Public
router.post('/signup', (req, res) => {
    console.log('Inside Signup Post Request');
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        about: "",
        city: "",
        country: "",
        school: "",
        hometown: "",
        languages: "",
        gender: "",
        flag: req.body.flag
    });
    newUser.save()
        .then(user => { res.status(200).json(user); })
        .catch(err => { console.log(err); res.status(400).send() })
});

// @route   GET api/users/signup
// @desc    Get User
// @access  Public
router.post('/getUser', (req, res) => {
    console.log('Inside Get User Request')
    console.log(req.body.email)
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) { console.log(user); res.json(user) }
            else { console.log('Not found'); res.status(404); }
        })
        .catch(err => console.log(err))
})

// Authenticate the user and get a JWT
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if(err) throw err;
        if(!user) {
            res.status(404).send();
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(isMatch && !err) {
                    //Create Token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 30*24*60*60 //seconds
                    });
                    res.json({success: true, token: 'JWT' + token});
                } else {
                    res.status(400).send();
                }
            });
        }      
    });
});

// @route   POST api/users/profile
// @desc    Update User Profile
// @access  Public
router.post('/postProfile', (req, res) => {
    console.log('Inside Profile Update Request')
    console.log(req.body.email);
    var newValues = { $set: { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        about: req.body.about,
        city: req.body.city,
        country: req.body.country,
        school: req.body.school,
        hometown: req.body.hometown,
        languages: req.body.languages,
        gender: req.body.gender
    } };
    var search = { email: req.body.email };
    User.findOneAndUpdate(search, newValues, {new: true})
        .then(user => { console.log('Profile Updated'); res.status(200).json(user); })
        .catch(err => { console.log(err); res.status(400).send() })
});

router.post('/searchProperties', (req, res) => {
    console.log('Inside Search Property Request');
    console.log(req.body);
    var startDate = this.props.startDate;
    var endDate = this.props.endDate
    User.findMany({'user.properties.address': search, startDate: startDate, endDate: endDate, accom: req.body.accom})
    .then(user => {if(user) {
        res.status(200).json(user).send();
        } else {
            res.json({'message': 'No properties matched your search'})
        }
    })
    .catch(err => { console.log(err); res.status(400) })
});

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// Init upload variable
const upload = multer({
    storage: storage
}).array('images', 5);

// @route   POST api/users/postProperty
// @desc    Post Property
// @access  Public
router.post('/postProperty', (req, res) => {
    console.log('Inside Property Post Request');
    console.log(req.body.email);

    var search = { email: req.body.email };
    var newValues = {
        address: req.body.address,
        headline: req.body.headline,
        descripn: req.body.descripn,
        ptype: req.body.ptype,
        minstay: req.body.minstay,
        accom: req.body.accom,
        price: req.body.price,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        booked: false
    }
    User.findOneAndUpdate(search, { $push: { properties: newValues } })
        .then(user => { 
            console.log('Property has been posted'); 
            res.status(200).json({
                'user': user,
                'userProperties': user.properties
            })
        })
        .catch(err => { console.log(err); res.status(400).send() })
});

// @route   POST api/users/postImages
// @desc    Post Images of property
// @access  Public
router.post('/postImages', (req, res) => {
    console.log('Inside Post Image Request');
    upload(req, res, (err) => {
        if(err) { console.log(err); }
        else {
            console.log(req.files, req.files.length);
                var newValues = [];
                for(let i=0; i< req.files.length; i++) {
                    newValues.push(`${req.files[i].destination}/${req.files[i].filename}`)
                }
                console.log(newValues);

                const newImage = new Image({
                    propertyId: req.body.currentPropertyId,
                    images: newValues
                });

                newImage.save().then(image => res.status(200));

                /*
                User.findOne({email: req.body.email}, (err, user) => {
                    if(err) { console.log(err); res.status(400).send(); }
                    else{
                        var i=0;
                        var property = [];
                        for(i=0; i<user.properties.length;i++){
                            if(user.properties[i]._id=req.body.currentPropertyId){
                                property=user.properties[i];
                                break;
                            }
                        }
                        property.images=newValues;
                        console.log(property);
                        console.log(i);
                        User.findOneAndUpdate({email:req.body.email},
                            { $push: {'User.properties[i].images': newValues } },
                            {new: true})
                    }
                })*/

        }
    });
    
});

// @route   GET api/users/getImages
// @desc    Get Images
// @access  Public
router.get('/getImages', (req, res) => {
    Image.find()
        .then(image => {
            res.json(image).status(200);
        })
});

module.exports = router;