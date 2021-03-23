const app = require('../server'),
    request = require('request');

const endpointList = 'http://localhost:3000/',
    endpointInfo = 'http://localhost:3000/pokemon/460';

describe('PokeDexView', () => {
    it('list of pokemons', done => {
        request.get(endpointList, (err, response) => {
            expect(response.statusCode).toEqual(200);
            //Start
            expect(response.body).toContain('{"_id":"5e87f4629088bd3014339fb1","name":"abomasnow","resource_uri":"api/v1/pokemon/460/"}');
            //End
            expect(response.body).toContain('{"_id":"5e87f4629088bd301433a097","name":"zygarde","resource_uri":"api/v1/pokemon/718/"}');
            done();
        });
    });


    it('info of pokemon', done => {
        request.get(endpointInfo, (err, response) => {
            expect(response.statusCode).toEqual(200);
            expect(response.body).toContain('{"_id":"5eb34556fbf0d0331518cfb2","name":"Abomasnow","attack":92,"defense":75,"hp":90,"sp_atk":92,"sp_def":85,"speed":60,"types":[{"name":"grass"},{"name":"ice"}],"number":460}');
            done();
        });
    });
});