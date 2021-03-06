var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Bookmark Routes
    var bookmarks = require('../app/controllers/bookmarks', '../app/controllers/personal');
    var personal = require('../app/controllers/personal');

    var mybookmarks = require('../app/controllers/mybookmarks');
    app.get('/mybookmarks', mybookmarks.all);
    app.get('/mybookmarks/:mybookmarkID', mybookmarks.show);


    app.get('/personal', bookmarks.all, personal.all);
    app.get('/bookmarks', bookmarks.all);
    app.post('/bookmarks', auth.requiresLogin, bookmarks.create);
    app.get('/bookmarks/:bookmarkID', bookmarks.show);
    app.put('/bookmarks/:bookmarkID', auth.requiresLogin, auth.bookmark.hasAuthorization, bookmarks.update);
    app.del('/bookmarks/:bookmarkID', auth.requiresLogin, auth.bookmark.hasAuthorization, bookmarks.destroy);


    //Finish with setting up the bookmarkID param
    app.param('bookmarkID', bookmarks.bookmark);

    //Finish with setting up the bookmarkID param
    app.param('mybookmarkID', mybookmarks.mybookmark);



    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
