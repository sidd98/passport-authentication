// main file, run first when script start

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport  = require('passport');


require('./config/passport')(passport);

// database connection
const db = require('./config/keys').MongoURI;
mongoose.connect(db,{ useNewUrlParser : true},)
    .then(() => {
        console.log('connected successfully');
    }).catch(err=> console.log(err));

const app = express();

// setting view engine ejs
app.use(expressLayouts);
app.set('view engine','ejs');

// body parser
app.use(express.urlencoded({ extended: false}));

//session
app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true,
  }));

// passport session
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// Global vars
app.use((req,res,next) => {
    res.locals.success_msg =  req.flash('success_msg');
    res.locals.error_msg  = req.flash('error_msg');
    res.locals.error = req.flash('error');
     next();
})

// router to routes folder
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server is up and running on PORT: ${PORT}`));