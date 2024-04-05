const postsRouter = require('./posts');
const profileRouter = require('./profile');
const usersRouter = require('./users');
const siteRouter = require('./site');

function route(app) {
    app.use('/', siteRouter);
    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
    app.use('/profile', profileRouter);
}


module.exports = route;