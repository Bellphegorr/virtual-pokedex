module.exports = app => {
    const userModel = app.models['users'],

        controller = {
            async login(req, res) {
                let credentials = req.body,
                    user = await userModel.getUser(credentials);

                if (!user) {
                    res.json({ status: false, mssg: 'Erro ao fazer login. Verifique suas credenciais.' });
                    return;
                }

                res.json({ status: true, token: user.token, mssg: 'Login efetuado com sucesso.', name: user.name });
            },


            async createUser(req, res) {
                let credentials = req.body,
                    newUser = await userModel.createUser(credentials);

                if (newUser.duplicate) {
                    res.json({ mssg: `${newUser.field} já está sendo utilizado`, duplicate: true, status: false });
                    return;
                } else if (newUser.error) {
                    res.json({ mssg: 'Error inesperado', error: newUser.error, status: false });
                    return;
                }

                res.json({ mssg: newUser.successMssg, user: newUser.user, status: true });
            },


            async deleteUserById(_id) {
                return await userModel.deleteUserById(_id);
            },


            async getUserIdByName(name) {
                return await userModel.getUserIdByName(name);
            }
        };

    return controller;
}