import passport from "passport";

export const signup = passport.authenticate('local-sing-up', {
    successRedirect: '/auth/sign-in',
    failureRedirect: '/auth/sign-up',
    passReqToCallback: true
})

export const renderSigninForm = (req, res) => {
    res.render('users/login');
}

export const signin = passport.authenticate('local-sing-in', {
    successRedirect: '/',
    failureRedirect: '/auth/sign-in',
    passReqToCallback: true
})

export const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/sign-in');
    });
}
