const mongoose = require('mongoose');

module.exports = (app) => {
    const pkmList = mongoose.Schema({});

    return mongoose.model('Pkm', pkmList, 'pkm');
}
