const postsRouter = require('./posts');
const profileRouter = require('./profile');
const usersRouter = require('./users');
const siteRouter = require('./site');
const messageRouter = require('./message');
const connectionRouter = require('./connection');

function route(app) {
    app.use('/', siteRouter);
    app.use('/users', usersRouter);
    app.use('/posts', postsRouter);
    app.use('/profile', profileRouter);
    app.use('/messages', messageRouter);
    app.use('/connection', connectionRouter);
}


module.exports = route;