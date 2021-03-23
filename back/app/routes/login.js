module.exports = (app) => {
    let controller = app.controllers['login'];

    app.post('/login', controller.login);
    app.post('/singup', controller.createUser);
    // app.post('/delete', controller.getUserFullDocByName);
}