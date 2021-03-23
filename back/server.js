const app = require('./app/configs/express')(),
      mongoose = require('./app/configs/mongoose')('mongodb://localhost:27017/pkmdb');

app.listen(app.get('port'), () => {
    console.log('App running in: ' + app.get('port'));
});

module.exports = app;