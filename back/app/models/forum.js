const mongoose = require('mongoose');

module.exports = app => {
    let forumSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    });

    const Model = mongoose.model('Forums', forumSchema, 'forum');

    const forumModel = {
        async getForum(_id) {
            let forum;

            try {
                forum = await Model.findOne({ _id });
            } catch (exception) {
                return { status: false, mssg: exception.errMessage };
            }

            return { 
                status: true, 
                forum: forum.toObject({ getters: true })
            };
        },


        async getList() {
            return await Model.find({}, 'title author _id');
        },


        async createForum({ title, author, content }) {
            let newDocument = { title, author, content },
                document;

            try {
                document = await Model.create(newDocument);
            } catch (exception) {
                return { status: false, mssg: exception.errMessage };
            }

            return { status: true, document, mssg: 'Fórum adicionado com sucesso.' };
        }
    };

    return forumModel;
};