const withAuth = (req, res, next) => {
    // When user is NOT logged in, REDIRECT the request to the login route
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
    };
    
    module.exports = withAuth;