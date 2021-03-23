const mongoose = require('mongoose');


module.exports = app => {
    const PkmListModel = app.models['pkm_list'],
        PkmInfoListModel = app.models['pkm_info_list'];
   
    controller = {
        //Retornar lista
        getPkmList(req, res) {

            PkmListModel.find({}).sort({name: 1}).exec().then(pkm => {
                res.json(pkm);
            });
        },

        getPkm(req, res) {

            let id =  Number(req.params['id']);

            PkmInfoListModel.find({number: id}).exec().then(pkm => {
                res.json(pkm);
            });
        }
    }

    return controller;
}