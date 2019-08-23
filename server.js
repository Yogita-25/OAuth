const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const passport = require('passport');

mongoose.connect(keys.mongoDB.dbURI, {
    useMongoClient: true
}, function (error, conn) {
    if (error) { console.log(error); }
    console.log("Connected:", conn);
});


app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 10000,//24 * 60 * 60 * 1000, //for 24hrs
    keys: [keys.session.cookieKey]
}));

//initialze passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
})

app.listen(3000, () => {
    console.log('app listening on port 3000');
});