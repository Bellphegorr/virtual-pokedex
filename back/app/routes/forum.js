const passportAuth = require('../configs/passport')();

module.exports = app => {
    let controller = app['controllers']['forum'];

    app.get('/forum', controller.forumList);
    app.get('/forum/:id', controller.getForum);
    app.get('/authorized-creat-forum', passportAuth.authenticate(), controller.authorizedCreateForum);
    app.post('/createForum', passportAuth.authenticate(), controller.createForum);
}