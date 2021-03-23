const express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    cors = require('cors');

const initialize = require('../configs/passport')().initialize,
    strategy = require('../configs/passport')().strategy();

module.exports = () => {
    const app = express();

    app.set('port', 3000);

    app.use(bodyParser.json());
    app.use(cors());
    app.use(initialize());

    consign({ cwd: 'app' })
        .include('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}