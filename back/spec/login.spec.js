const app = require('../server'),
    request = require('request'),
    mongoose = require('mongoose');

const endpointLogin = 'http://localhost:3000/login',
    endpointSingup = 'http://localhost:3000/singup';

const loginController = app.controllers.login;

describe('Authorization', () => {
    const exampleNewUser = {
        email: 'newuser@newuser.com',
        password: '12345',
        name: 'osafhkfsahfsajohfhksfahufsafslafaskjflsajkfasfsafsa'
    };

    let idUser = '';

    it('login user', done => {
        const exampleUser = {
            email: 'example@example.com',
            password: '12345'
        };

        request.post(endpointLogin, { json: true, body: exampleUser }, (err, response) => {
            let body = response.body;

            expect(response.statusCode).toEqual(200);
            expect(body.status).toEqual(true);
            done();
        });
    });


    describe('Create and Delete a New User', () => {
        it('create a new user', done => {
            request.post(endpointSingup, { json: true, body: exampleNewUser }, (err, response) => {
                let body = response.body;
    
                expect(response.statusCode).toEqual(200);
                expect(body.status).toEqual(true);

                loginController.getUserIdByName(exampleNewUser.name)
                    .then(response => {
                        return loginController.deleteUserById(response.id)
                    })
                    .then(response => {
                        expect(response.status).toEqual(true);
                        done();
                    })
            });
        });


        it('email has already register', done => {
            let user = {
                name: 'admin1',
                password: '6438667464',
                email: 'admin@ad.com'
            };

            request.post(endpointSingup, { json: true, body: user }, (err, response) => {
                let body = response.body;

                expect(response.statusCode).toEqual(200);
                expect(body.status).toEqual(false);
                expect(body.mssg).toEqual('E-mail já está sendo utilizado');
                done();
            });
        });


        it('name has already register', done => {
            let user = {
                name: 'admin',
                password: '6438667464',
                email: 'admin1@ad.com'
            };

            request.post(endpointSingup, { json: true, body: user }, (err, response) => {
                let body = response.body;
    
                expect(response.statusCode).toEqual(200);
                expect(body.status).toEqual(false);
                done();
            });
        });
    });
});