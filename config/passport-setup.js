const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const OutlookStrategy = require('passport-outlook');
const keys = require('./keys')
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user)=>{
        done(null, user);
    });
});


passport.use(new OutlookStrategy({
    clientID: '12e6e3de-612e-4d3b-9eb4-73efe5f7443a',
    clientSecret: 'xvneBKUV119{;dueMDI87$#',
    callbackURL: 'http://localhost:3000/auth/google/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {
      outlookId: profile.id,
      username: profile.DisplayName,
      email: profile.EmailAddress,
      accessToken:  accessToken
    };
    if (refreshToken)
      user.refreshToken = refreshToken;
    if (profile.MailboxGuid)
      user.mailboxGuid = profile.MailboxGuid;
    if (profile.Alias)
      user.alias = profile.Alias;
    // User.findOrCreate(user, function (err, user) {
    //     console.log(chalk.red.bgGreen(user));
    //   return done(err, user);
    // });
    User.findOne({ outlookId: profile.id }).then((currentUser) => {
        //If user already exists
        if (currentUser) {
            console.log("User alredy exists with Userid: " + profile.id);
            done(null, currentUser);
        }
        else {
            //create new user if user does not exists
            new User({
                username: profile.displayName,
                outlookId: profile.id
                // thumbnail: profile._json.picture
            }).save().then((newUser) => {
                console.log('New user created: ' + newUser);
                done(null, newUser);
            });
        }
    })
  }
));


// passport.use(
//     new GoogleStrategy({
//         //options for the google strat
//         callbackURL: 'http://localhost:3000/auth/google/redirect',
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret
//     }, (accessToken, refreshToken, profile, done) => {
//         console.log(profile);
//         User.findOne({ googleId: profile.id }).then((currentUser) => {
//             //If user already exists
//             if (currentUser) {
//                 console.log("User alredy exists with Userid: " + profile.id);
//                 done(null, currentUser);
//             }
//             else {
//                 //create new user if user does not exists
//                 new User({
//                     username: profile.displayName,
//                     googleId: profile.id,
//                     thumbnail: profile._json.picture
//                 }).save().then((newUser) => {
//                     console.log('New user created: ' + newUser);
//                     done(null, newUser);
//                 });
//             }
//         })
//     })
// )


// passport.use(new OutlookStrategy({
//     clientID: OUTLOOK_CLIENT_ID,
//     clientSecret: OUTLOOK_CLIENT_SECRET,
//     callbackURL: 'http://www.example.com/auth/outlook/callback'
//   },
//   function(accessToken, refreshToken, profile, done) {
//     var user = {
//       outlookId: profile.id,
//       name: profile.DisplayName,
//       email: profile.EmailAddress,
//       accessToken:  accessToken
//     };
//     if (refreshToken)
//       user.refreshToken = refreshToken;
//     if (profile.MailboxGuid)
//       user.mailboxGuid = profile.MailboxGuid;
//     if (profile.Alias)
//       user.alias = profile.Alias;
//     User.findOrCreate(user, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));