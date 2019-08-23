const router = require('express').Router();
const passport = require('passport');
// auth login
router.get('/login', (req, res) => {
    res.render('login', {user:req.user});
});


//auth logout
router.get('/logout', (req, res) =>{
req.logOut();
res.redirect('/');
});

// //auth google login
// router.get('/google', passport.authenticate('google', {
//     scope:['profile']
// }));

// router.get('/google/redirect',  passport.authenticate('google'),(req, res) =>{
// console.log('$$$$$$$$: '+req.user.username);

//auth google login
router.get('/google',passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  }));

router.get('/google/redirect',   passport.authenticate('windowslive', { failureRedirect: '/profile' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
  
module.exports = router;

