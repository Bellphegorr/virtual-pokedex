const mongoose = require('mongoose');

module.exports = (app) => {
    const pkmInfoList = mongoose.Schema({});

    return mongoose.model('PkmInfo', pkmInfoList, 'pkmInfo');
}