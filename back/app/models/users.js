const mongoose = require('mongoose'),
    generateToken = require('../configs/passport')().generateToken

module.exports = (app) => {
    const userSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: Number,
            required: true,
            unique: false
        }
    });

    const Model = mongoose.model('User', userSchema, 'users');

    let userModel = {
        async createUser({ email, password, name }) {
            const TYPE = 3;

            let newUser = new Model({ email, password, name, type: TYPE });

            try {
                let a = await newUser.save();
            } catch (error) {
                let duplicateErrorRegex = /duplicate/;

                if (duplicateErrorRegex.test(error.errmsg)) {
                    let duplicateRegex = /index:\s(\w+)_/,
                        errMsg = duplicateRegex.exec(error.errmsg),
                        field = '';

                    switch (errMsg[1]) {
                        case 'email':
                            field = 'E-mail';
                            break;
                        case 'name':
                            field = 'Nome de Usuário';
                            break;
                        default:
                            field = "Campo Não Necessário"
                    }

                    return { duplicate: true, field };
                }

                return { error };
            }

            return { successMssg: "Usuário Criado com Sucesso", user: newUser.name };
        },


        async getUser({ email, password }) {
            let doc = await Model.findOne({ email, password });

            if (!doc) {
                return false;
            }

            return {token: generateToken(doc._id), name: doc.name};
        },


        async getUserById(_id) {
            let user;

            try {
                user = await Model.findOne({ _id });
            } catch (exception) {
                return { status: false, mssg: exception.errMessage };
            }

            return {
                status: true,
                name: user.name,
                email: user.email,
                type: user.type
            };
        },


        async deleteUserById(_id) {
            try {
                await Model.deleteOne({ _id });
            } catch (exception) {
                return { status: false, mssg: exception.errMessage };
            }

            return { status: true, mssg: 'usuário deletado com sucesso.' };
        },


        async getUserIdByName(name) {
            let user;

            try {
                user = await Model.findOne({ name });
                user.toObject({ getters: true });
            } catch (exception) {
                return { status: false, mssg: exception.errMessage };
            }

            return { status: true, id: user.id };
        }
    }

    return userModel;
}