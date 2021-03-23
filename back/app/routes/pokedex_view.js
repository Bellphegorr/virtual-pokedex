module.exports = (app) => {
    let controller = app.controllers['pokedex_view'];

    app.get('/', controller.getPkmList);
    app.get('/pokemon/:id', controller.getPkm)
}