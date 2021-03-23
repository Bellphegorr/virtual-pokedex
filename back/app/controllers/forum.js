module.exports = app => {
    let forumModel = app['models']['forum'],
        userModel = app['models']['users'];

    let controller = {
        async forumList(req, res) {
            let forumList = await forumModel.getList(),
                forumListObj = forumList.map(forum => forum.toObject({ getters: true }));

            for (let forum of forumListObj) {
                let user = await userModel.getUserById(forum.author);
                forum.authorName = user.name;
            }
               
            res.json(forumListObj);
        },

        async getForum(req, res) {
            let id = req.params['id'],
                forumDoc = await forumModel.getForum(id),
                user = await userModel.getUserById(forumDoc.forum.author);

            if (!forumDoc.status || !user.status) {
                let response = {
                    mssg: 'Erro ao tentar acessar fóruns. Tente novamente mais tarde',
                    status: falses
                };

                res.json(response);
                return false;
            }

            //Add author name to forum
            forumDoc.forum.authorName = user.name;

            res.json(forumDoc.forum);
        },

        async createForum(req, res) {
            let body = req.body,
                userDoc = req.user,
                forumDoc;

            if (userDoc.type != 1) {
                let response = {
                    status: false,
                    mssg: 'Você não tem permissão para publicar um fórum.'
                };

                return res.json(response);
            }

            body.author = userDoc.id;
            forumDoc = await forumModel.createForum(body);

            if (!forumDoc.status) {
                let response = {
                    status: false,
                    mssg: 'Não foi possível criar o fórum. Tente novamente mais tarde'
                };

                return res.json(response);
            }

            res.json(forumDoc.document);
        },

        async authorizedCreateForum(req, res) {
            let user = req.user;

            if (user.type != 1) {
                let response = {
                    status: false,
                    mssg: 'você não tem autorização.'
                }

                return res.json(response);
            }

            let response = {
                status: true,
                mssg: 'você tem autorização.'
            }

            res.json(response);
        }
    }

    return controller;
}