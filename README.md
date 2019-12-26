# passport-authentication
Simple passport-authentication using Nodejs.
mongodb for database.

# Directory Layout
├── app.js
├── config
│   ├── auth.js           # for authorisation to login
│   ├── keys.js           # mongodb connection url
│   └── passport.js       # email and password auth
├── models
│   └── User.js           # User model
├── package.json          # List of project dependencies
├── package-lock.json
├── routes
│   ├── index.js         # welcome and dashbaord routes
│   └── users.js         # login, logout, registered routes
└── views                # front-end views
    ├── dashboard.ejs    
    ├── layout.ejs
    ├── login.ejs
    ├── partials
    │   └── messages.ejs
    ├── register.ejs
    └── welcome.ejs
   
* Run
    ```bash
    npm run start   # to run the app in node server
    npm run dev     # to run the app using nodemon

