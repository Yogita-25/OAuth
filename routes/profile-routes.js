const router = require('express').Router();

//function
const authcheck = (req, res, next) => {
    if (!req.user)
        res.redirect('/auth/login');
    else
        next();
};

//middleware used as coma seprated
//function injected as middleware
router.get('/', authcheck, (req, res) => {
    // res.send('you are logged in as: ' + req.user.username);
    res.render('profile', { user: req.user });
});

module.exports = router;