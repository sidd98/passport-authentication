const express = require('express');
// to encrypt password before saving to database
const bcrypt  = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

const User  = require('../models/User');


// Login page
router.get('/login', (req,res) => {

    res.render('login');
});

// Register page
router.get('/register', (req,res) => {
    res.render('register');
});

// Register handle
router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];
    if( !name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all the details'});
    }

    if(password !== password2) {
        errors.push({ msg: 'password do not match'});
    }

    if(password.length < 8) {
        errors.push({ msg: 'Password should be at least 8 character'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
        });

    } else {
        User.findOne({ email, })
            .then( user => {
                if(user) {
                    errors.push({ msg: 'Email already exist'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                    });

                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                    });
                    // encypt password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;

                            newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered, Please login');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                        })

                    })
                }
            })
    }

});

// Login
router.post('/login', (req,res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req,res,next);

});

//logout
router.get('/logout', (req,res,next) => {
    req.logout();
    req.flash('success_msg', 'You are logout');
    res.redirect('/users/login');

});


module.exports = router;

